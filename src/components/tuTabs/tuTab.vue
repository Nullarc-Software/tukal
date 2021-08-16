<template>
    <transition
        v-if="!noTransitions"
        :name="
            invert
                ? vertical
                    ? 'fade-tab-vertical-invert'
                    : 'fade-tab-invert'
                : vertical
                ? 'fade-tab-vertical'
                : 'fade-tab'
        "
    >
        <div v-if="active" class="con-tab tu-tabs--content">
            <slot />
        </div>
    </transition>
    <div v-else-if="active" class="con-tab tu-tabs--content">
            <slot />
    </div>

</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted, reactive, Ref, toRefs, VNode } from "vue";
import { TabId } from ".";

export default defineComponent({
	name: "TuTab",
	inheritAttrs: false,
	props: {
		label: {
			default: "Label",
			type: String
		},
		name: {
			default: null,
			type: String
		},
		icon: {
			default: "",
			type: String
		},
		tag: {
			default: "",
			type: String
		},
		iconPack: {
			type: String,
			default: "material-icons"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		noTransitions: {
			type: Boolean,
			default: false
		}
	},
	setup (props, context) {
		const reactiveData = reactive({
			vertical: false,
			active: false,
			id: null,
			invert: false
		});

		const setActive = function (value : boolean) {
			reactiveData.active = value;
		};

		const setInvert = function (value : boolean) {
			reactiveData.invert = value;
		};

		const setVertical = function (value : boolean) {
			reactiveData.vertical = value;
		};

		const addChild = inject<Function>("addChild");
		const updateChild = inject<Function>("updateChild");
		const noTransitions = inject<Ref<Boolean>>("noTransitions");
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
			attrs: context.attrs,
			disabled: props.disabled,
			name: props.name
		});

		onMounted(() => {
			addChild?.call(null, data);
		});

		return {
			...toRefs(reactiveData),
			noTransitions
		};
	}
});
</script>

<style lang="scss" scoped>

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
