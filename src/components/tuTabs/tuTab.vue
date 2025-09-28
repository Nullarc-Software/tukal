<template>
	<div v-if="active" class="con-tab tu-tabs--content" v-bind="$attrs">
		<slot />
	</div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, onMounted, reactive, Ref, toRefs, VNode, useAttrs } from "vue";
import { TabId } from ".";

defineOptions({
	name: "TuTab"
});

interface Props {
	label?: string;
	name?: string;
	value?: string;
	icon?: string;
	tag?: string;
	iconPack?: string;
	disabled?: boolean;
	to?: string;
}

const props = withDefaults(defineProps<Props>(), {
	label: "Label",
	icon: "",
	tag: "",
	iconPack: "material-icons",
	disabled: false,
	value: ""
});

const reactiveData = reactive({
	active: false,
	id: null
});

const setActive = function (value: boolean) {
	reactiveData.active = value;
};

const addChild = inject<(data: Record<string, unknown>) => void>("addChild");
const nextId = inject<Ref<TabId>>("tabIdInstance");

const currentId = nextId?.value ? nextId.value.tabId++ : 0;
const data = Object.assign({}, {
	vnode: (getCurrentInstance()?.vnode as VNode),
	setActive
}, {
	label: props.label,
	icon: props.icon,
	iconPack: props.iconPack,
	tag: props.tag,
	id: currentId,
	attrs: useAttrs(),
	disabled: props.disabled,
	name: props.name,
	value: props.value,
	to: props.to
});

onMounted(() => {
	addChild?.call(null, data);
});

const { active } = toRefs(reactiveData);
</script>

<style lang="scss">
.tabs-fixed-height {
	overflow: auto !important;

	.con-tab {
		height: inherit;
	}
}
</style>
