<template>
	<transition v-if="!noTransitions" :name="
	invert
		? vertical
			? 'fade-tab-vertical-invert'
			: 'fade-tab-invert'
		: vertical
			? 'fade-tab-vertical'
			: 'fade-tab'
">
		<div v-if="active" class="con-tab tu-tabs--content" v-bind="$attrs">
			<slot />
		</div>
	</transition>
	<div v-else-if="active" class="con-tab tu-tabs--content" v-bind="$attrs">
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
	icon?: string;
	tag?: string;
	iconPack?: string;
	disabled?: boolean;
	noTransitions?: boolean;
	to?: string;
}

const props = withDefaults(defineProps<Props>(), {
	label: "Label",
	icon: "",
	tag: "",
	iconPack: "material-icons",
	disabled: false,
	noTransitions: false
});

const reactiveData = reactive({
	vertical: false,
	active: false,
	id: null,
	invert: false
});

const setActive = function (value: boolean) {
	reactiveData.active = value;
};

const setInvert = function (value: boolean) {
	reactiveData.invert = value;
};

const setVertical = function (value: boolean) {
	reactiveData.vertical = value;
};

const addChild = inject<(data: Record<string, unknown>) => void>("addChild");
const noTransitions = inject<Ref<boolean>>("noTransitions");
const nextId = inject<Ref<TabId>>("tabIdInstance");

const currentId = nextId?.value ? nextId.value.tabId++ : 0;
const data = Object.assign({}, {
	vnode: (getCurrentInstance()?.vnode as VNode),
	setActive,
	setInvert,
	setVertical
}, {
	label: props.label,
	icon: props.icon,
	iconPack: props.iconPack,
	tag: props.tag,
	id: currentId,
	attrs: useAttrs(),
	disabled: props.disabled,
	name: props.name,
	to: props.to
});

onMounted(() => {
	addChild?.call(null, data);
});

const { vertical, active, invert } = toRefs(reactiveData);
</script>

<style lang="scss">
.tabs-fixed-height {
	overflow: auto !important;

	.con-tab {
		height: inherit;
	}
}

.fade-tab-enter-active,
.fade-tab-leave-active {
	transition: all 0.3s;
}

.fade-tab-enter,
.fade-tab-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(-100%, 0, 0);
}

.fade-tab-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(100%, 0, 0);
}

.fade-tab-invert-enter-active,
.fade-tab-invert-leave-active {
	transition: all 0.3s;
}

.fade-tab-invert-enter,
.fade-tab-invert-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(100%, 0, 0);
}

.fade-tab-invert-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(-100%, 0, 0);
}

.fade-tab-vertical-enter-active,
.fade-tab-vertical-leave-active {
	transition: all 0.3s;
}

.fade-tab-vertical-enter {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(0, 100%, 0);
}

.fade-tab-vertical-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(0, -100%, 0);
}

.fade-tab-vertical-invert-enter-active,
.fade-tab-vertical-invert-leave-active {
	transition: all 0.3s;
}

.fade-tab-vertical-invert-enter {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(0, -100%, 0);
}

.fade-tab-vertical-invert-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(0, 100%, 0) !important;
}
</style>
