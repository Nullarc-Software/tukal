<template>
	<div class="popper-contatiner" :class="{
		'pointer-hand': cursorPointer
	}" v-bind="$attrs" v-click-away="hide">
		<div ref="triggerNode" v-on="listeners" :style="{
			width: fitPopperContainer ? '100%' : 'unset'
		}">
			<!-- The default slot to trigger the popper  -->
			<slot />
		</div>
		<Transition name="fade">
			<div v-if="isOpen" :class="['popper', isOpen ? 'inline-block' : null]" :style="{
				'border-radius': borderRadius
					? `${borderRadius} !important`
					: null
			}" ref="popperNode">
				<!-- A slot for the popper content -->
				<slot name="content" />
				<div v-if="arrow" class="popper-arrow" data-popper-arrow></div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, provide, watch, toRefs, useSlots } from "vue";
import usePopper from "./composables/userPopper";

/**
 * The Popper component.
 */

const Placement = [
	"auto",
	"auto-start",
	"auto-end",
	"top",
	"top-start",
	"top-end",
	"bottom",
	"bottom-start",
	"bottom-end",
	"right",
	"right-start",
	"right-end",
	"left",
	"left-start",
	"left-end"
] as const;

export type PlacementType = typeof Placement[number];

interface Props {
	/**
	 * Preferred [placement](https://popper.js.org/docs/v2/constructors/#options)
	 */
	placement?: string;
	/**
	 * Customize the [offset](https://popper.js.org/docs/v2/modifiers/offset/) of the popper
	 */
	offsetX?: string;
	offsetY?: string;
	/**
	 * Show the popper on hover
	 */
	hover?: boolean;
	timeout?: number;
	/**
	 * Add an arrow to the popper
	 */
	arrow?: boolean;
	/**
	 * Stop arrow from reaching the edge of the Popper
	 */
	arrowPadding?: string;
	borderRadius?: string | null;
	cursorPointer?: boolean;
	fitPopperContainer?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	placement: "auto",
	offsetX: "0",
	offsetY: "12",
	hover: false,
	timeout: -1,
	arrow: false,
	arrowPadding: "0",
	borderRadius: null,
	cursorPointer: true,
	fitPopperContainer: false
});

const emit = defineEmits<{
	"show:popper": [];
	"hide:popper": [];
}>();

const slots = useSlots();

const children = slots.default?.();

if (children && children.length > 1) {
	console.error(
		`[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`
	);
}

const { offsetX, offsetY, arrowPadding, placement } = toRefs(props);

const {
	isOpen,
	hide,
	show,
	toggle,
	popperInstance,
	popperNode,
	triggerNode
} = usePopper({ offsetX, offsetY, arrowPadding, placement });

// Provide values for child components
provide("borderRadius", props.borderRadius);
provide("closeParent", () => {
	hide();
});

const listeners = computed(() => {
	const hover = {
		mouseover: show,
		mouseleave: hide
	};

	const onClick = {
		click: toggle
	};

	return {
		...((props.hover && hover) || onClick),
		focus: () => {
			show();
		},
		blur: () => {
			hide();
		}
	};
});

watch(isOpen, (isOpen) => {
	if (isOpen) {
		emit("show:popper");

		if (props.timeout > 0) {
			setTimeout(() => {
				hide();
			}, props.timeout);
		}
	}
	else emit("hide:popper");
});

onBeforeUnmount(() => {
	if (popperInstance.value && typeof (popperInstance.value as any).destroy === "function") {
		(popperInstance.value as any).destroy();
	}
});
</script>


<style scoped>
.pointer-hand {
	cursor: pointer;
}

.popper-contatiner {
	display: flex;
	align-self: center;
}

.popper-arrow,
.popper-arrow::before {
	position: absolute;
	width: 8px;
	height: 8px;
	background: var(--popper-theme-background-color);
}

.popper-arrow {
	visibility: hidden;
	z-index: -1;
}

.popper-arrow::before {
	visibility: visible;
	content: "";
	transform: rotate(45deg);
}

.popper[data-popper-placement^="top"]>.popper-arrow {
	bottom: -4px;
}

.popper[data-popper-placement^="bottom"]>.popper-arrow {
	top: -4px;
}

.popper[data-popper-placement^="left"]>.popper-arrow {
	right: -4px;
}

.popper[data-popper-placement^="right"]>.popper-arrow {
	left: -4px;
}

.popper {
	background: var(--popper-theme-background-color);
	color: var(--popper-theme-text-color);
	border-radius: var(--popper-theme-border-radius);
	border: var(--popper-theme-border);
	box-shadow: var(--popper-theme-shadow);
	z-index: 90000;
}

.inline-block {
	display: inline-block;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
