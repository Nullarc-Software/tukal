<template>
	<div :class="[type]" class="tu-collapse" ref="collapse">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { provide, ref, reactive } from "vue";

defineOptions({
	name: "TuCollapse"
});

interface Props {
	accordion?: boolean;
	type?: string;
	openHover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	accordion: false,
	type: "default",
	openHover: false
});

const emit = defineEmits<{
	change: [];
}>();

const collapse = ref<HTMLDivElement>();

// State management for accordion mode
const itemsState = reactive(new Map<symbol, { isOpen: boolean; toggle: () => void }>());

const emitChange = function () {
	emit("change");
};

const registerItem = function (itemId: symbol, toggleFn: () => void) {
	itemsState.set(itemId, { isOpen: false, toggle: toggleFn });
};

const unregisterItem = function (itemId: symbol) {
	itemsState.delete(itemId);
};

const updateItemState = function (itemId: symbol, isOpen: boolean) {
	const item = itemsState.get(itemId);
	if (item)
		item.isOpen = isOpen;
};

const closeOtherItems = function (currentItemId: symbol) {
	if (props.accordion) {
		for (const [itemId, item] of itemsState) {
			if (itemId !== currentItemId && item.isOpen)
				item.toggle();
		}
	}
};

provide("accordion", props.accordion);
provide("openHover", props.openHover);
provide("emitChange", emitChange);
provide("registerItem", registerItem);
provide("unregisterItem", unregisterItem);
provide("updateItemState", updateItemState);
provide("closeOtherItems", closeOtherItems);
</script>

<style lang="scss" scoped>
.tu-collapse {
	transition: all 0.3s ease;
	border-radius: 8px;
	padding: 10px;

	&.shadow {
		.open-item {
			transform: scale(1.01);
			box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.05);
			margin-top: 5px;
			border-bottom: 0px solid rgba(0, 0, 0, 0);
			margin-bottom: 10px;
			border-radius: 6px;

			.con-content-item {
				opacity: 1;
			}
		}
	}

	&.margin {
		.tu-collapse-item {
			margin-top: 10px;
			margin-bottom: 10px;
			box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.05);
			border-radius: 5px;
			border-bottom: 0px solid rgba(0, 0, 0, 0);
		}

		.open-item {
			.con-content-item {
				opacity: 1;
			}
		}
	}

	&.border {
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 0px;

		.tu-collapse-item {
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		}

		.open-item {
			.con-content-item {
				opacity: 1;
			}
		}
	}

	&.default {
		.open-item {
			.con-content--item {
				opacity: 1;
			}
		}
	}
}
</style>
