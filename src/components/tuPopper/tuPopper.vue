<template>
	<div 
		class="flex self-center" 
		:class="{
			'cursor-pointer': cursorPointer
		}" 
		v-bind="$attrs" 
		v-click-away="clickAway ? hide : () => { }"
	>
		<div 
			ref="triggerNode" 
			v-on="listeners" 
			:class="{
				'w-full': fitPopperContainer
			}"
		>
			<!-- The default slot to trigger the popper  -->
			<slot />
		</div>
		<Transition name="fade">
			<div 
				v-if="isOpen" 
				class="popper inline-block z-popover rounded-md shadow-md" 
				:style="borderRadius ? { 'border-radius': `${borderRadius} !important` } : undefined"
				ref="popperNode"
			>
				<div v-if="arrow" class="popper-arrow" data-popper-arrow></div>
				<!-- A slot for the popper content -->
				<div class="popper-content">
					<slot name="content" />
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, provide, watch, toRefs, useSlots, type InjectionKey } from "vue";
import usePopper from "./composables/usePopper";

defineOptions({
	name: "TuPopper"
});

/**
 * The Popper component with comprehensive type safety.
 */

// Strictly typed placement options
const PLACEMENT_OPTIONS = [
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

export type PlacementType = typeof PLACEMENT_OPTIONS[number];

/**
 * Re-export Props interface for external use
 */
export type TuPopperProps = Props;

/**
 * Event emit types for TuPopper component
 */
export interface TuPopperEmits {
	"show:popper": [];
	"hide:popper": [];
}

// Injection keys for type safety
const BorderRadiusKey: InjectionKey<string | null> = Symbol("borderRadius");
const CloseParentKey: InjectionKey<() => void> = Symbol("closeParent");

// Numeric string type for offsets
type NumericString = `${number}` | string;

// Timeout type (positive number or -1 for no timeout)
type TimeoutValue = number;

interface Props {
	/**
	 * Preferred [placement](https://popper.js.org/docs/v2/constructors/#options)
	 * @default "auto"
	 */
	placement?: PlacementType;
	/**
	 * Customize the [offset](https://popper.js.org/docs/v2/modifiers/offset/) of the popper
	 * @default "0"
	 */
	offsetX?: NumericString;
	/**
	 * Vertical offset from the trigger element
	 * @default "12"
	 */
	offsetY?: NumericString;
	/**
	 * Show the popper on hover instead of click
	 * @default false
	 */
	hover?: boolean;
	/**
	 * Auto-hide timeout in milliseconds. Use -1 to disable auto-hide
	 * @default -1
	 */
	timeout?: TimeoutValue;
	/**
	 * Add an arrow pointing to the trigger element
	 * @default true
	 */
	arrow?: boolean;
	/**
	 * Stop arrow from reaching the edge of the Popper
	 * @default "0"
	 */
	arrowPadding?: NumericString;
	/**
	 * Custom border radius for the popper
	 * @default null
	 */
	borderRadius?: string | null;
	/**
	 * Show pointer cursor on hover
	 * @default true
	 */
	cursorPointer?: boolean;
	/**
	 * Make popper container take full width
	 * @default false
	 */
	fitPopperContainer?: boolean;
	/**
	 * Enable dismissing the popper when clicking anywhere on the page
	 * @default true
	 */
	clickAway?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	placement: "auto",
	offsetX: "0",
	offsetY: "12",
	hover: false,
	timeout: -1,
	arrow: true,
	arrowPadding: "0",
	borderRadius: null,
	cursorPointer: true,
	fitPopperContainer: false,
	clickAway: true
});

const emit = defineEmits<{
	/**
	 * Emitted when the popper is shown
	 */
	"show:popper": [];
	/**
	 * Emitted when the popper is hidden
	 */
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

// Runtime validation for placement prop
if (!PLACEMENT_OPTIONS.includes(props.placement as PlacementType)) {
	console.warn(
		`[TuPopper]: Invalid placement "${props.placement}". Valid options are: ${PLACEMENT_OPTIONS.join(", ")}`
	);
}

// Runtime validation for timeout prop
if (props.timeout !== -1 && props.timeout < 0) {
	console.warn(
		`[TuPopper]: Invalid timeout "${props.timeout}". Use -1 to disable auto-hide or a positive number for timeout in milliseconds.`
	);
}

const {
	isOpen,
	hide,
	show,
	toggle,
	popperInstance,
	popperNode,
	triggerNode
} = usePopper({ offsetX, offsetY, arrowPadding, placement });

// Provide values for child components with type safety
provide(BorderRadiusKey, props.borderRadius);
provide(CloseParentKey, () => {
	hide();
});

const listeners = computed<Record<string, () => void>>(() => {
	const hoverEvents = {
		mouseover: show,
		mouseleave: hide
	};

	const clickEvents = {
		click: toggle
	};

	return {
		...((props.hover && hoverEvents) || clickEvents),
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
	const instance = popperInstance.value as { destroy?: () => void } | null;
	if (instance && typeof instance.destroy === "function")
		instance.destroy();
});
</script>


<style scoped>
/* Width utility for responsive container */
.w-full {
	width: 100%;
}

/* Popper content styling */
.popper {
	background: var(--popper-theme-background-color);
	color: var(--popper-theme-text-color);
	border-radius: var(--popper-theme-border-radius);
	border: var(--popper-theme-border);
	box-shadow: var(--popper-theme-shadow);
}

/* Arrow styling - diamond positioned behind popup */
.popper-arrow {
	position: absolute;
	width: 8px;
	height: 8px;
	visibility: hidden;
	z-index: 0;
}

.popper-arrow::before {
	position: absolute;
	width: 8px;
	height: 8px;
	content: "";
	background: var(--popper-theme-background-color, #ffffff);
	transform: rotate(45deg);
	visibility: visible;
	z-index: 0;
}

/* Ensure popper content is above the arrow */
.popper {
	position: relative;
	z-index: 100;
}

/* Arrow positioning - diamond behind popup creates seamless triangle effect */
.popper[data-popper-placement^="top"] > .popper-arrow {
	bottom: -4px;
}

.popper[data-popper-placement^="bottom"] > .popper-arrow {
	top: -4px;
}

.popper[data-popper-placement^="left"] > .popper-arrow {
	right: -4px;
}

.popper[data-popper-placement^="right"] > .popper-arrow {
	left: -4px;
}

/* Modern fade transition using design tokens */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
