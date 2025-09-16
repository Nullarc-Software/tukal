<template>
	<div :class="[type]" class="tu-collapse" ref="collapse">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { provide, ref } from "vue";

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

const emitChange = function () {
	emit("change");
};

const closeAllItems = function (el: any, maxHeight: any) {
	const children = collapse.value?.children;

	if (children) {
		for (let item of children) {
			item = item as HTMLElement;
			if (item !== el.value.parentElement) {
				const ex = item.querySelector(".tu-collapse-item--content") as HTMLElement;
				ex.style.maxHeight = "0px";
				maxHeight.value = "0px";
			}
		}
	}
};

provide("closeAllItems", closeAllItems);
provide("accordion", props.accordion);
provide("openHover", props.openHover);
provide("emitChange", emitChange);
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
