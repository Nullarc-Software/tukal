<template>
	<button
		:class="[
			'vs-button',
			// `vs-button--${color.replace('#', '')}`,
			`vs-button--${componentColor}`,
			`vs-button--size-${size}`,
			{ [`vs-button--fff`]: color === '#fff' },
			{ [`vs-button--active`]: !!active },
			{ [`vs-button--active-disabled`]: !!activeDisabled },
			{ [`vs-button--icon`]: !!icon },
			{ [`vs-button--circle`]: !!circle },
			{ [`vs-button--square`]: !!square },
			{ [`vs-button--loading`]: !!loading },
			{ [`vs-button--upload`]: !!upload },
			{ [`vs-button--block`]: !!block },
			{ [`vs-button--animate`]: !!$slots.animate },
			{ [`vs-button--animate-${animationType}`]: !!animationType },
			{ [`vs-button--animate-inactive`]: !!animateInactive },
			{ [`inline`]: !!inline },

			// colors
			{
				[`vs-button--primary`]:
					!danger && !success && !warn && !dark && !'color'
			},
			{ [`vs-button--danger`]: !!danger },
			{ [`vs-button--warn`]: !!warn },
			{ [`vs-button--success`]: !!success },
			{ [`vs-button--dark`]: !!dark },

			{
				[`vs-button--default`]:
					!flat &&
					!border &&
					!gradient &&
					!relief &&
					!transparent &&
					!shadow &&
					!floating
			},
			{ [`vs-button--flat`]: !!flat },
			{ [`vs-button--border`]: !!border },
			{ [`vs-button--gradient`]: !!gradient },
			{ [`vs-button--relief`]: !!relief },
			{ [`vs-button--transparent`]: !!transparent },
			{ [`vs-button--shadow`]: !!shadow },
			{ [`vs-button--floating`]: !!floating }
		]"
		:style="{
			['--vs-color']: color ? getColor(color) : '',
			['--vs-color-secondary']: colorSecondary
				? getColor(colorSecondary)
				: '',
			['--vs-button-text-color']: textColor ? getColor(textColor) : '',
			width: width,
			height: height
		}"
		v-bind="$attrs"
		v-on="listeners"
		ref="button"
	>
		<div class="vs-button__content">
			<slot />
		</div>
		<div
			v-if="$slots.animate"
			:class="[
				'vs-button__animate',
				`vs-button__animate--${animationType}`
			]"
		>
			<slot name="animate" />
		</div>
		<div v-if="loading" class="vs-button__loading"></div>
	</button>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	nextTick,
	ref
} from "vue";
import _color from "../../utils/color";
import { useRouter } from "vue-router";
import vsIcon from "../vsIcon";
import vsComponent from "../vsComponent";

import ripple, { rippleCut, rippleReverse } from "../../utils/ripple";

export default defineComponent({
	name: "VsButton",
	extends: vsComponent,
	inheritAttrs: false,
	props: {
		ripple: { type: String, default: "" },
		activeDisabled: { type: Boolean, default: false },
		flat: { type: Boolean, default: false },
		border: { type: Boolean, default: false },
		gradient: { type: Boolean, default: false },
		relief: { type: Boolean, default: false },
		transparent: { type: Boolean, default: false },
		shadow: { type: Boolean, default: false },
		floating: { type: Boolean, default: false },
		icon: { type: Boolean, default: false },
		circle: { type: Boolean, default: false },
		square: { type: Boolean, default: false },
		size: { type: String, default: null },
		loading: { type: Boolean, default: false },
		upload: { type: Boolean, default: false },
		block: { type: Boolean, default: false },
		animationType: { type: String, default: "" },
		animateInactive: { type: Boolean, default: false },
		to: { type: String, default: null },
		href: { type: String, default: null },
		blank: { type: Boolean, default: false },
		inline: { type: Boolean, default: false },
		width: { type: String, default: null },
		height: { type: String, default: null },
	
	},
	emits: ["routeErr", "mouseover", "mouseout", "blur", "click"],
	setup: function(props, context) {
		let rippleDir = ref("");
		let componentColor = null;
		let button = ref<HTMLButtonElement>();

		const clickButton = function(event) {
			if (props.to) {
				useRouter().push(props.to);
			} else if (props.href) {
				window.open(props.href, (props.blank && "_blank") || "_self");
				// console.log(this.blank && '_self')
			}
			context.emit("click", event);
		};

		const mousedown = event => {
			if (rippleDir.value === "reverse") {
				rippleReverse(event);
			} else if (rippleDir.value === "cut") {
				rippleCut(event);
			} else {
				if (props.flat) {
					ripple(
						event,
						(componentColor || props.color || "primary") &&
							!props.active &&
							document.activeElement !== button.value
							? "inherit"
							: null,
						props.flat &&
							!props.active &&
							document.activeElement !== button.value
					);
				} else {
					ripple(event, null, false);
				}
			}
		};

		let listeners = computed(() => {
			return {
				click: event => clickButton(event),
				mousedown: event => mousedown(event)
			};
		});

		return {
			clickButton,
			listeners
		};
	},
	components: {
		vsIcon
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";
@import "../../style/sass/root";

.vs-button {
	--vs-color-rotate: -var(--vs-primary);
	--vs-color-darken: -var(--vs-primary);
	--vs-button-padding: 8px 12px;
	--vs-button-margin: 5px;
	--vs-button-border-radius: 12px;
	--vs-button-text-color: 255, 255, 255;
	border: 0px;
	margin: 5px;
	border-radius: -var(button-border-radius);
	transition: all 0.25s ease;
	position: relative;
	user-select: none;
	z-index: 1;
	overflow: hidden;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0px;
	outline: none;
	font-size: 0.8rem;
	box-sizing: border-box;
	color: -getColor("button-text-color");

	&.vs-component-dark {
		&.vs-button--transparent {

			@if variable-exists("--vs-color"){
				color: -getColor("color") !important;
			} @else {
				color: -getColor("text") !important;
			}			
		}
	}

	&--fff {
		&:focus {
			color: rgba(30, 30, 30, 1) !important;
		}
	}

	&__content {
		padding: -var(button-padding);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&--active-disabled {
		pointer-events: none;
		opacity: 0.6;
	}

	&:disabled {
		pointer-events: none;
		opacity: 0.35;
	}

	&.vs-button--animate:not(.vs-button--animate-inactive) {
		.vs-button__content {
			i {
				font-size: 1.15rem;
			}
		}

		&:hover {
			.vs-button__content {
				transform: translate(-100%);
			}

			.vs-button__animate {
				transform: translate(0%);
			}
		}

		&.vs-button--animate-vertical {
			&:hover {
				.vs-button__content {
					transform: translate(0, -100%) !important;
					opacity: 0;
				}

				.vs-button__animate {
					transform: translate(0%) !important;
				}
			}
		}

		&.vs-button--animate-scale {
			&:hover {
				.vs-button__content {
					transform: scale(1.4) !important;
					opacity: 0;
				}

				.vs-button__animate {
					opacity: 1;
					transform: scale(1);
				}
			}
		}

		&.vs-button--animate-rotate {
			&:hover {
				.vs-button__content {
					transform: rotate(180deg) !important;
					opacity: 0;
				}

				.vs-button__animate {
					opacity: 1;
					transform: rotate(0);
				}
			}
		}

		.vs-button__content {
			transition: transform 0.25s ease;
		}
	}

	&__animate {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0px;
		left: 0px;
		transition: transform 0.25s ease;
		transform: translate(100%);
		pointer-events: none;

		&--vertical {
			transform: translate(0, 100%);
		}

		&--scale {
			transform: scale(0.5);
			opacity: 0;
		}

		&--rotate {
			transform: rotate(-180deg);
			opacity: 0;
		}
	}

	&--block {
		width: 100%;
		display: block;
	}

	&--upload {
		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			background: -getColor("color", 0.4);
			top: 0px;
			left: 0px;
			z-index: 1200;
			animation: btnupload 0.7s ease infinite;
			box-sizing: border-box;
		}
	}

	&--loading {
		pointer-events: none;
		user-select: none;
	}

	.vs-button__loading {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: -getColor("color", 0.8);
		border-radius: inherit;

		&:after {
			content: "";
			width: 17px;
			height: 17px;
			border: 2px dotted rgba(255, 255, 255, 0.6);
			border-top: 2px solid rgba(255, 255, 255, 0);
			border-bottom: 2px solid rgba(255, 255, 255, 0);
			border-right: 2px solid rgba(255, 255, 255, 0);
			border-radius: 50%;
			position: absolute;
			animation: btnload 0.6s linear infinite;
			box-sizing: border-box;
		}

		&:before {
			position: absolute;
			content: "";
			width: 17px;
			height: 17px;
			border: 2px solid rgb(255, 255, 255);
			border-top: 2px solid rgba(255, 255, 255, 0);
			border-bottom: 2px solid rgba(255, 255, 255, 0);
			border-right: 2px solid rgba(255, 255, 255, 0);
			border-radius: 50%;
			animation: btnload 0.6s ease infinite;
			box-sizing: border-box;
		}
	}

	&--size-xl {
		border-radius: 20px;
		.vs-button__content {
			padding: 15px 20px;
			font-size: 1.1rem;
		}
		
	}

	&--size-large {
		font-size: 1rem;
		border-radius: 15px;

			.vs-button__content {
				padding: 10px 15px;
			}
		
	}

	&--size-small {
		font-size: 0.75rem;
		border-radius: 9px;
		
			.vs-button__content {
				padding: 5px 10px;
			}
		
	}

	&--size-mini {
		font-size: 0.6rem;
		border-radius: 7px;
		
			.vs-button__content {
				padding: 3px 8px;
			}
		
	}

	&--circle {
		border-radius: 25px;
	}

	&--square {
		border-radius: 0px;
	}

	&--icon {
		display: flex;
		align-items: center;
		justify-content: center;
		
			.vs-button__content {
				padding: 8px 8px;
			}

			i {
				font-size: 1.15rem;
			}
		
	}
}

// Type Button Style

.vs-button--default {
	@debug "divider offset: #{color}";

	background: -getColor("color", 1);
	color: -getColor("button-text-color", 1);

	&.vs-button--active {
		box-shadow: 0px 10px 20px -10px -getColor("color", 1);
		transform: translate(0, -3px);
	}

	&:hover,&:focus {
		box-shadow: 0px 10px 20px -10px -getColor("color", 1);
		transform: translate(0, -3px);
	}
}

.vs-button--flat {
	background: -getColor("color", 0.15);
	color: -getColor("color", 1);

	&.vs-button--dark {
		color: -getColor(text, 1);
	}

	&:hover {
		background: -getColor("color", 0.25);
	}

	&:focus {
		color: #fff;
		background: -getColor("color", 1);
		transition: all 0.25s ease, background 0.25s ease 0.25s;
	}

	&.vs-button--active {
		background: -getColor("color", 1);
		color: #fff;
	}
}

.vs-button--floating {
	background: -getColor("color", 1);
	color: #fff;
	box-shadow: 0px 8px 20px -6px -getColor("color", 1);
	transform: translate(0, -3px);

	&:hover {
		box-shadow: 0px 8px 20px -6px -getColor("color", 1);
		transform: translate(0, -6px);
	}

	&:focus {
		transform: translate(0, 0px);
		box-shadow: 0px 0px 0px 0px -getColor("color", 1);
	}

	&.vs-button--active {
		transform: translate(0, 0px);
		box-shadow: 0px 0px 0px 0px -getColor("color", 1);
	}
}

.vs-button--border {
	background: -getColor("color", 0);
	color: -getColor("color", 1);

	&:before {
		content: "";
		border: 2px solid -getColor("color", 1);
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background: transparent;
		pointer-events: none;
		transition: all 0.25s ease;
		box-sizing: border-box;
	}

	&:hover {
		&:before {
			border: 2px solid -getColor("color", 0.5);
		}
	}

	&:focus {
		color: #fff;
		background: -getColor("color", 1);
	}

	&.vs-button--active {
		background: -getColor("color", 1);
		color: #fff;
	}
}

.vs-button--gradient {
	background: -getColor("color");
	color: #fff;
	overflow: hidden;

	&.vs-button--primary,
	&.vs-button--success {
		&::before {
			filter: hue-rotate(40deg);
		}
	}

	&::before {
		content: "";
		background: linear-gradient(
			30deg,
			-getColor("color", 1) 0%,
			-getColor("color-secondary", 0.6) 100%
		);
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		pointer-events: none;
		transition: all 0.4s ease;
		z-index: -1;
		filter: hue-rotate(-40deg);
		box-sizing: border-box;
	}

	&:hover {
		transform: translate(0, -3px);
		box-shadow: 0px 10px 20px -10px -getColor("color", 0.7);

		&::before {
			opacity: 0;

			// transform: translate(50%, -50%)
		}
	}

	&.vs-button--active {
		transform: translate(0, -3px);
		box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.35);
	}
}

.vs-button--relief {
	background: -getColor("color");
	color: #fff;
	overflow: hidden;
	transform: translate(0) scale(1, 1);

	.vs-button__content {
		transition: all 0.25s ease;
	}

	&.vs-button--icon {
		&.vs-button--active {
			height: auto;
		}
	}

	&::before {
		content: "";
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: calc(100% - 3px);
		border-radius: inherit;
		pointer-events: none;
		transition: all 0.4s ease;
		z-index: -1;
		filter: contrast(2) grayscale(0.4);
		border-bottom: 3px solid -getColor("color");
		box-sizing: border-box;
	}

	&:active {
		transform: translate(0, 1px);

		.vs-button__content {
			padding-bottom: 6px;
		}

		&::before {
			border-bottom: 0px solid -getColor("color");
		}
	}

	&.vs-button--active {
		transform: translate(0, 1px);

		.vs-button__content {
			padding-bottom: 6px;
		}

		&::before {
			border-bottom: 0px solid -getColor("color");
		}
	}
}

.vs-button--transparent {
	background: transparent;
	color: -getColor("text");
	overflow: hidden;

	&::before {
		content: "";
		background: -getColor("color", 0.1);

		// background: -getColor('color', -var('background-opacity'))
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		pointer-events: none;
		transition: all 0.25s ease;
		z-index: -1;
		transform: scale(0.5);
		opacity: 0;
		box-sizing: border-box;
	}

	&:active:not(.vs-button--active) {
		&::before {
			transform: scale(0.9) !important;
		}
	}

	&:hover {
		&::before {
			opacity: 1;
			transform: scale(1);
		}
	}

	&.vs-button--active {
		&::before {
			background: -getColor("color", 0.2);
			opacity: 1;
			transform: scale(1);
		}
	}
}

.vs-button--shadow {
	background: -getColor("background");
	color: -getColor("text");
	overflow: hidden;
	box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, -var(shadow-opacity));

	&:active:not(.vs-button--active) {
		transform: translate(0, -1px);
		box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, -var(shadow-opacity)) !important;
	}

	&:hover {
		transform: translate(0, -3px);
		box-shadow: 0px 8px 25px 0px rgba(0, 0, 0, -var(shadow-opacity));
	}

	&.vs-button--active {
		transform: translate(0, -3px);
		box-shadow: 0px 8px 25px 0px rgba(0, 0, 0, -var(shadow-opacity));
	}
}

@keyframes btnload {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes btnupload {
	0% {
		transform: translate(0, 110%);
	}

	100% {
		transform: translate(0, -110%);
	}
}
</style>
