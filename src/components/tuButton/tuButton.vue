<template>
	<button :class="[
		'tu-button',
		// `tu-button--${color.replace('#', '')}`,
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

<script setup lang="ts">
import { computed, ref } from "vue";
import { ComponentConstants } from "../tuComponent";
import { getColor, getColorAsRgb } from "../../utils";
import ripple, { rippleCut, rippleReverse } from "../../utils/ripple";

interface Props {
	ripple?: string;
	activeDisabled?: boolean;
	flat?: boolean;
	border?: boolean;
	gradient?: boolean;
	relief?: boolean;
	transparent?: boolean;
	shadow?: boolean;
	floating?: boolean;
	icon?: boolean;
	circle?: boolean;
	square?: boolean;
	size?: string | null;
	loading?: boolean;
	upload?: boolean;
	block?: boolean;
	animationType?: string;
	animateInactive?: boolean;
	to?: Record<string, unknown> | string | null;
	href?: string | null;
	blank?: boolean;
	inline?: boolean;
	width?: string | null;
	height?: string | null;
	color?: string;
	colorSecondary?: string;
	textColor?: string;
	active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	ripple: "",
	activeDisabled: false,
	flat: false,
	border: false,
	gradient: false,
	relief: false,
	transparent: false,
	shadow: false,
	floating: false,
	icon: false,
	circle: false,
	square: false,
	size: null,
	loading: false,
	upload: false,
	block: false,
	animationType: "scale",
	animateInactive: true,
	to: null,
	href: null,
	blank: false,
	inline: false,
	width: null,
	height: null,
	color: "primary",
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff",
	active: false
});

const emit = defineEmits<{
	routeErr: [error: Error];
	mouseover: [event: MouseEvent];
	mouseout: [event: MouseEvent];
	blur: [event: FocusEvent];
	click: [event: MouseEvent];
}>();

const rippleDir = ref("");
const button = ref<HTMLButtonElement>();

const clickButton = function (event: MouseEvent) {
	if (props.to)
		ComponentConstants.router.push(props.to);
	else if (props.href)
		window.open(props.href, (props.blank && "_blank") || "_self");
	emit("click", event);
};

const mousedown = (event: MouseEvent) => {
	if (rippleDir.value === "reverse") rippleReverse(event);
	else if (rippleDir.value === "cut") rippleCut(event);
	else {
		if (props.flat) {
			ripple(
				event,
				props.color,
				props.flat &&
				!props.active &&
				document.activeElement !== button.value
			);
		}
		else if (props.border)
			ripple(event, props.color, true);
		else ripple(event, null, false);
	}
};

const listeners = computed(() => {
	return {
		click: (event: MouseEvent) => clickButton(event),
		mousedown: (event: MouseEvent) => mousedown(event)
	};
});

defineOptions({
	inheritAttrs: false
});
</script>

<style lang="scss">
@use "sass:color";
@import "../../style/sass/_mixins";
@import "../../style/sass/root";

$tu-button-padding: 8px 12px;
$tu-button-margin: 5px;
$tu-button-border-radius: 12px;
$tu-button-text-color: 255 255 255;
$tu-color-primary: -getColor("color");
$tu-color-primary-faded: -getColorAlpha("color", 0.15);
$tu-color-text: -getColor("text");

// Mixin for common button styles
@mixin tu-button-style($background, $color, $hover-background, $hover-color) {
	background: $background;
	color: $color;

	&.ripple-anim {
		color: rgb($tu-button-text-color);

	}

	&.tu-button--active {
		background: $background;
		color: $hover-color;
	}

	&.tu-button--transparent {
		background: transparent;
		color: $tu-color-primary !important;

		&:hover {
			background-color: $tu-color-primary-faded !important;
		}
	}
}

.tu-button {
	--tu-color-rotate: -$tu-color-primary;
	--tu-color-darken: -$tu-color-primary;
	--tu-button-padding: $tu-button-padding;
	--tu-button-margin: $tu-button-margin;
	--tu-button-border-radius: $tu-button-border-radius;
	--tu-button-text-color: $tu-button-text-color;
	border: 0;
	margin: $tu-button-margin;
	border-radius: $tu-button-border-radius;
	transition: all 0.25s ease;
	position: relative;
	user-select: none;
	z-index: 1;
	overflow: hidden;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: $tu-button-padding;
	outline: none;
	font-size: 0.8rem;
	box-sizing: border-box;
	color: rgba(255, 255, 255);

	&.tu-component-dark {
		&.tu-button--transparent {
			color: $tu-color-primary !important;
		}
	}
}

.tu-button__content {
	display: flex;
	align-items: center;
}

.tu-button__loading {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: -getColorAlpha("color", 0.8);
	border-radius: inherit;
	width: 100%;
	height: 100%;

	&:before,
	&:after {
		content: "";
		position: absolute;
		width: 17px;
		height: 17px;
		border-radius: 50%;
		box-sizing: border-box;
	}

	&:after {
		border: 2px dotted rgba(255, 255, 255, 0.6);
		border-top: 2px solid transparent;
		border-bottom: 2px solid transparent;
		border-right: 2px solid transparent;
		animation: btnload 0.6s linear infinite;
	}

	&:before {
		border: 2px solid rgb(255, 255, 255);
		border-top: 2px solid transparent;
		border-bottom: 2px solid transparent;
		border-right: 2px solid transparent;
		animation: btnload 0.6s ease infinite;
	}
}

.tu-button--gradient {
	@include tu-button-style($tu-color-primary, #fff, $tu-color-primary, #fff);
	overflow: hidden;

	&::before {
		content: "";
		background: linear-gradient(30deg,
				$tu-color-primary 0%,
				rgba($tu-color-primary, 0.6) 100%);
		position: absolute;
		top: 0;
		left: 0;
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
		box-shadow: 0px 10px 20px -10px rgba($tu-color-primary, 0.7);

		&::before {
			opacity: 0;
		}
	}

	&.tu-button--active {
		transform: translate(0, -3px);
		box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.35);
	}
}

.tu-button--relief {
	@include tu-button-style($tu-color-primary, #fff, $tu-color-primary, #fff);
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
		bottom: 0;
		left: 0;
		width: 100%;
		height: calc(100% - 3px);
		border-radius: inherit;
		pointer-events: none;
		transition: all 0.4s ease;
		z-index: -1;
		filter: contrast(2) grayscale(0.4);
		border-bottom: 3px solid $tu-color-primary;
		box-sizing: border-box;
	}

	&:active {
		transform: translate(0, 1px);

		.tu-button__content {
			padding-bottom: 1px;
		}

		&::before {
			border-bottom: 0;
		}
	}

	&.tu-button--active {
		transform: translate(0, 1px);

		.tu-button__content {
			padding-bottom: 6px;
		}

		&::before {
			border-bottom: 0;
		}
	}
}

.tu-button--transparent {
	@include tu-button-style(transparent, $tu-color-text, transparent, rgba($tu-color-primary, 0.1));
	overflow: hidden;

	&::before {
		content: "";
		background: rgba($tu-color-primary, 0.1);
		position: absolute;
		bottom: 0;
		left: 0;
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
			background: rgba($tu-color-primary, 0.2);
			opacity: 1;
			transform: scale(1);
		}
	}
}

.tu-button--shadow {
	@include tu-button-style($tu-color-text, transparent, transparent, transparent);
	overflow: hidden;
	box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

	&:active:not(.tu-button--active) {
		transform: translate(0, -1px);
		box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0) !important;
	}

	&:hover {
		transform: translate(0, -3px);
		box-shadow: 0 8px 25px 0 rgba(0, 0, 0, 0);
	}

	&.tu-button--active {
		transform: translate(0, -3px);
		box-shadow: 0 8px 25px 0 rgba(0, 0, 0, 0);
	}
}


.tu-button--default {
	@include tu-button-style($tu-color-primary, white, $tu-color-primary, white);
}

.tu-button--flat {
	@include tu-button-style($tu-color-primary-faded, $tu-color-primary, $tu-color-primary, white);

	&.tu-button--active {
		background: $tu-color-primary;
		color: white;
	}

	&.tu-button--dark {
		color: $tu-color-text;
	}
}

.tu-button--floating {
	@include tu-button-style($tu-color-primary, #fff, $tu-color-primary, #fff);
	box-shadow: 0px 8px 20px -6px $tu-color-primary;

	&:hover {
		box-shadow: 0px 8px 20px -6px $tu-color-primary;
		transform: translate(0, -6px);
	}

	&:focus {
		transform: translate(0);
		box-shadow: 0px 0px 0px 0px $tu-color-primary;
	}

	&.tu-button--active {
		transform: translate(0);
		box-shadow: 0px 0px 0px 0px $tu-color-primary;
	}
}

.tu-button--border {
	@include tu-button-style(transparent, $tu-color-primary, $tu-color-primary, #fff);

	&:before {
		content: "";
		border: 2px solid $tu-color-primary;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background: transparent;
		pointer-events: none;
		transition: all 0.15s ease;
		box-sizing: border-box;
	}



	&.tu-button--active {
		background: -getColor("color");
		color: -getColor("light");
	}

	// Add other button variations here...
}

.tu-button--size-xl {
	border-radius: 20px;

	.tu-button__content {
		padding: 15px 20px;
		font-size: 1.1rem;
	}
}

.tu-button--size-large {
	font-size: 1rem;
	border-radius: 15px;

	.tu-button__content {
		padding: 10px 15px;
	}
}

.tu-button--size-small {
	font-size: 0.75rem;
	border-radius: 9px;
	margin: 0;
	padding: 5px;

	.tu-button__content {
		padding: 5px 10px;
	}
}

.tu-button--size-mini {
	font-size: 0.6rem;
	border-radius: 7px;
	margin: 0;
	padding: 2px;

	.tu-button__content {
		padding: 3px 8px;
	}
}

.tu-button--circle {
	border-radius: 25px;
}

.tu-button--square {
	@include tu-button-style($tu-color-primary, white, $tu-color-primary, white);
	border-radius: 0;
}

.tu-button--icon {
	i {
		font-size: 1.15rem;
	}
}

.tu-button--upload {
	&:after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background: -getColorAlpha("color", 0.6);
		top: 0px;
		left: 0px;
		z-index: 1200;
		animation: btnupload 0.7s ease infinite;
		box-sizing: border-box;
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
