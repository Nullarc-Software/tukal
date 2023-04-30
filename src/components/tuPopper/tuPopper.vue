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

<script lang="ts">
import { defineComponent, computed, onBeforeUnmount, watch, toRefs, PropType } from "vue";
import usePopper from "./composables/userPopper";
import clickAway from "./directives/click-away";
import tuComponent from "../tuComponent";
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
export default defineComponent({
	name: "TuPopper",
	emits: ["show:popper", "hide:popper"],
	directives: {
		clickAway
	},
	extends: tuComponent,
	provide() {
		return {
			borderRadius: this.borderRadius,
			closeParent: () => {
				this.hide();
			}
		};
	},
	props: {
		placement: {  //placement prop: Describes the preferred placement of the popper. Modifiers like flip may change the placement of the popper to make it fit better.
			type: String,
			default: "auto"
		},
		offsetX: {  //offsetX prop: The offset modifier lets you displace a popper element from its reference element in the x direction.
			type: String,
			default: "0"
		},
		offsetY: { //offsetY prop: The offset modifier lets you displace a popper element from its reference element in the y direction.
			type: String,
			default: "12"
		},
		hover: {  //hover porp: shows the popper on hover
			type: Boolean,
			default: false
		},
		timeout: {  //timeout prop: timeout for the popper
			type: Number,
			default: -1
		},
		arrow: {  //arrow porp: adds an arrow to the popper
			type: Boolean,
			default: false
		},
		arrowPadding: {  //arrowPadding prop: Stop arrow from reaching the edge of the Popper
			type: String,
			default: "0"
		},
		borderRadius: {  //borderRadius prop: sets the border radius for the popper
			type: String,
			default: null
		},
		cursorPointer: {  //cursorPointer prop: sets the cursor to pointer for the popper container
			type: Boolean,
			default: true
		},
		fitPopperContainer: {  //firPopperContainer porp: width of the popper container to be 100% if booleanis true else unset
			type: Boolean,
			default: false
		}
	},
	setup(props, { slots, emit }) {
		const children = slots.default?.();

		if (children && children.length > 1) {
			return console.error(
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
			if (popperInstance.value) (popperInstance.value as any).destroy();
		});

		return {
			hideFn: hide,
			isOpen,
			popperNode,
			triggerNode,
			toggle,
			hide,
			listeners
		};
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
