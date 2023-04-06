<template>
	<button :class="[
		'tu-button',
		// `tu-button--${color.replace('#', '')}`,
		`tu-button--${componentColor}`,
		`tu-button--size-${size}`,
		{ [`tu-button--fff`]: color === '#fff' },
		{ [`tu-button--active`]: !!active },
		{ [`tu-button--active-disabled`]: !!activeDisabled },
		{ [`tu-button--icon`]: !!icon },
		{ [`tu-button--circle`]: !!circle },
		{ [`tu-button--square`]: !!square },
		{ [`tu-button--loading`]: !!loading },
		{ [`tu-button--upload`]: !!upload },
		{ [`tu-button--block`]: !!block },
		{ [`tu-button--animate`]: !!$slots.animate },
		{ [`tu-button--animate-${animationType}`]: !!animationType },
		{ [`tu-button--animate-inactive`]: !!animateInactive },
		{ [`inline`]: !!inline },

		// colors
		{
			[`tu-button--primary`]:
				!danger && !success && !warn && !dark && !'color'
		},
		{ [`tu-button--danger`]: !!danger },
		{ [`tu-button--warn`]: !!warn },
		{ [`tu-button--success`]: !!success },
		{ [`tu-button--dark`]: !!dark },

		{
			[`tu-button--default`]:
				!flat &&
				!border &&
				!gradient &&
				!relief &&
				!transparent &&
				!shadow &&
				!floating
		},
		{ [`tu-button--flat`]: !!flat },
		{ [`tu-button--border`]: !!border },
		{ [`tu-button--gradient`]: !!gradient },
		{ [`tu-button--relief`]: !!relief },
		{ [`tu-button--transparent`]: !!transparent },
		{ [`tu-button--shadow`]: !!shadow },
		{ [`tu-button--floating`]: !!floating }
	]" :style="{
	['--tu-color']: color ? getColor(color) : '', ['--tu-color-secondary']: colorSecondary ?
		getColor(colorSecondary) : '', ['--tu-button-text-color']: textColor ? getColor(textColor) : '', width: width,
	['--tu-color-rgb']: color ? getColorAsRgb(color) : '',
	height: height
}" v-bind="$attrs" v-on="listeners" ref="button">
		<div class="tu-button__content">
			<slot />
		</div>
		<div v-if="$slots.animate" :class="[
			'tu-button__animate',
			`tu-button__animate--${animationType}`
		]">
			<slot name="animate" />
		</div>
		<div v-if="loading" class="tu-button__loading"></div>
	</button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import tuComponent, { ComponentConstants } from "../tuComponent";

import ripple, { rippleCut, rippleReverse } from "../../utils/ripple";

export default defineComponent({
	name: "TuButton",
	extends: tuComponent,
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
		to: { type: [Object, String], default: () => null },
		href: { type: String, default: null },
		blank: { type: Boolean, default: false },
		inline: { type: Boolean, default: false },
		width: { type: String, default: null },
		height: { type: String, default: null }
	},
	emits: ["routeErr", "mouseover", "mouseout", "blur", "click"],
	setup: function (props, context) {
		const rippleDir = ref("");
		const componentColor = null;
		const button = ref<HTMLButtonElement>();

		const clickButton = function (event) {
			if (props.to) ComponentConstants.router.push(props.to);
			else if (props.href)
				window.open(props.href, (props.blank && "_blank") || "_self");
			// console.log(this.blank && '_self')
	
			context.emit("click", event);
		};

		const mousedown = (event) => {
			if (rippleDir.value === "reverse") rippleReverse(event);
			else if (rippleDir.value === "cut") rippleCut(event);
			else {
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
				}
				else ripple(event, null, false);
			}
		};

		const listeners = computed(() => {
			return {
				click: (event) => clickButton(event),
				mousedown: (event) => mousedown(event)
			};
		});

		return {
			clickButton,
			listeners
		};
	}
});
</script>

<style lang="scss">
@use "sass:color";
@import "../../style/sass/_mixins";
@import "../../style/sass/root";

.tu-button {
	--tu-color-rotate: -var(--tu-primary);
	--tu-color-darken: -var(--tu-primary);
	--tu-button-padding: 8px 12px;
	--tu-button-margin: 5px;
	--tu-button-border-radius: 12px;
	--tu-button-text-color: 255, 255, 255;
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
	color: rgba(255, 255, 255);

	&.tu-component-dark {
		&.tu-button--transparent {
			@if variable-exists("--tu-color") {
				color: -getColor("color") !important;
			}

			@else {
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

	&.tu-button--animate:not(.tu-button--animate-inactive) {
		.tu-button__content {
			i {
				font-size: 1.15rem;
			}
		}

		&:hover {
			.tu-button__content {
				transform: translate(-100%);
			}

			.tu-button__animate {
				transform: translate(0%);
			}
		}

		&.tu-button--animate-vertical {
			&:hover {
				.tu-button__content {
					transform: translate(0, -100%) !important;
					opacity: 0;
				}

				.tu-button__animate {
					transform: translate(0%) !important;
				}
			}
		}

		&.tu-button--animate-scale {
			&:hover {
				.tu-button__content {
					transform: scale(1.4) !important;
					opacity: 0;
				}

				.tu-button__animate {
					opacity: 1;
					transform: scale(1);
				}
			}
		}

		&.tu-button--animate-rotate {
			&:hover {
				.tu-button__content {
					transform: rotate(180deg) !important;
					opacity: 0;
				}

				.tu-button__animate {
					opacity: 1;
					transform: rotate(0);
				}
			}
		}

		.tu-button__content {
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
			background: -getColorAlpha("color", 0.4);
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

	.tu-button__loading {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: -getColorAlpha("color", 0.8);
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

		.tu-button__content {
			padding: 15px 20px;
			font-size: 1.1rem;
		}
	}

	&--size-large {
		font-size: 1rem;
		border-radius: 15px;

		.tu-button__content {
			padding: 10px 15px;
		}
	}

	&--size-small {
		font-size: 0.75rem;
		border-radius: 9px;

		.tu-button__content {
			padding: 5px 10px;
		}
	}

	&--size-mini {
		font-size: 0.6rem;
		border-radius: 7px;

		.tu-button__content {
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

		.tu-button__content {
			padding: 8px 8px;
		}

		i {
			font-size: 1.15rem;
		}
	}
}

// Type Button Style

.tu-button--default {
	@debug "divider offset: #{color}";

	background: -getColor("color");
	color: white;

	&.tu-button--active {
		box-shadow: 0px 10px 20px -10px -getColor("color");
		transform: translate(0, -3px);
	}

	&:hover,
	&:focus {
		box-shadow: 0px 10px 20px -10px -getColor("color");
		transform: translate(0, -3px);
	}
}

.tu-button--flat {
	background: -getColorAlpha("color", 0.15);
	color: -getColor("color");

	&.tu-button--dark {
		color: -getColor(text);
	}

	&:hover {
		background: -getColorAlpha("color", 0.25);
	}



	&.tu-button--active {
		background: -getColor("color");
		color: #fff;
	}
}

.tu-button--floating {
	background: -getColor("color");
	color: #fff;
	box-shadow: 0px 8px 20px -6px -getColor("color");
	transform: translate(0, -3px);

	&:hover {
		box-shadow: 0px 8px 20px -6px -getColor("color");
		transform: translate(0, -6px);
	}

	&:focus {
		transform: translate(0, 0px);
		box-shadow: 0px 0px 0px 0px -getColor("color");
	}

	&.tu-button--active {
		transform: translate(0, 0px);
		box-shadow: 0px 0px 0px 0px -getColor("color");
	}
}

.tu-button--border {
	background: -getColorAlpha("color", 0);
	color: -getColor("color");


	&:before {
		content: "";
		border: 2px solid -getColor("color");
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background: transparent;
		pointer-events: none;
		transition: all .15s ease;
		box-sizing: border-box;
	}

	&:hover {
		&:before {
			border: 2px solid -getColorAlpha("color", 0.5);
		}
	}

	&:focus {
		color: #fff;
		background: -getColor("color");
	}

	&.tu-button--active {
		background: -getColor("color");
		color: #fff;
	}
}

.tu-button--gradient {
	background: -getColor("color");
	color: #fff;
	overflow: hidden;

	&.tu-button--primary,
	&.tu-button--success {
		&::before {
			filter: hue-rotate(40deg);
		}
	}

	&::before {
		content: "";
		background: linear-gradient(30deg,
				-getColor("color") 0%,
				-getColorAlpha("color-secondary", 0.6) 100%);
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
		box-shadow: 0px 10px 20px -10px -getColorAlpha("color", 0.7);

		&::before {
			opacity: 0;

			// transform: translate(50%, -50%)
		}
	}

	&.tu-button--active {
		transform: translate(0, -3px);
		box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.35);
	}
}

.tu-button--relief {
	background: -getColor("color");
	color: #fff;
	overflow: hidden;
	transform: translate(0) scale(1, 1);

	.tu-button__content {
		transition: all 0.25s ease;
	}

	&.tu-button--icon {
		&.tu-button--active {
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

		.tu-button__content {
			padding-bottom: 6px;
		}

		&::before {
			border-bottom: 0px solid -getColor("color");
		}
	}

	&.tu-button--active {
		transform: translate(0, 1px);

		.tu-button__content {
			padding-bottom: 6px;
		}

		&::before {
			border-bottom: 0px solid -getColor("color");
		}
	}
}

.tu-button--transparent {
	background: transparent;
	color: -getColor("text");
	overflow: hidden;

	&::before {
		content: "";
		background: -getColorAlpha("color", 0.1);

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

	&:active:not(.tu-button--active) {
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

	&.tu-button--active {
		&::before {
			background: -getColorAlpha("color", 0.2);
			opacity: 1;
			transform: scale(1);
		}
	}
}

.tu-button--shadow {
	background: -getColor("background");
	color: -getColor("text");
	overflow: hidden;
	box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, -var(shadow-opacity));

	&:active:not(.tu-button--active) {
		transform: translate(0, -1px);
		box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, -var(shadow-opacity)) !important;
	}

	&:hover {
		transform: translate(0, -3px);
		box-shadow: 0px 8px 25px 0px rgba(0, 0, 0, -var(shadow-opacity));
	}

	&.tu-button--active {
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
