<template>
	<div class="tu-input-parent" v-bind="$attrs" :style="{
		['--tu-color']: tuColor
	}" :class="[
		`tu-input-parent--state-${state}`,
		{ 'tu-input-parent--border': !!border },
		{ 'tu-input-parent--shadow': !!shadow },
		{ [`tu-input-content--has-label`]: label || labelPlaceholder },
		{ block: block },
		{ transparent: transparent },
		{ textWhite: textWhite },
		{ square: square },
		{ inline: inline },
		// colors
		{ [`tu-component--${color}`]: color },
		{ [`tu-component--is-color`]: !!isColor },
		{ [`tu-component-static-editable`]: !!editableStaticInternal }
	]">
		<div class="tu-input-content" :class="[
			{ [`tu-input-content--has-color`]: hasColor },
			{
				[`tu-input-content--has-label`]: label || labelPlaceholder
			}
		]">
			<input v-bind="$attrs" :type="type" class="tu-input" :value="modelValue" :class="[
				{ ['tu-input--has-icon']: !!$slots.icon },
				{ ['tu-input--has-icon--after']: !!iconAfter }
			]" @input="onInput" @keyup.enter="onEnter" :id="getId" :disabled="editableStaticInternal || disable" />
			<label v-if="label" :for="getId" :class="[
				'tu-input__label',
				{ 'tu-input__label--hidden': modelValue !== '' }
			]">
				{{ placeholder }}
			</label>
			<label :for="getId" :class="[
				'tu-input__label',
				{ 'tu-input__label--placeholder': labelPlaceholder },
				{
					'tu-input__label--hidden':
						modelValue !== '' ||
						$attrs.type == 'date' ||
						$attrs.type == 'time'
				},
				{ 'tu-input__label--label': label }
			]">
				{{ label || placeholder || labelPlaceholder }}
			</label>
			<span v-if="$slots.icon" class="tu-input__icon" :class="[
				{ 'tu-input__icon--after': iconAfter },
				{ 'tu-input__icon--click': !!$attrs['click-icon'] }
			]" @click="iconClick">
				<slot name="icon" />
			</span>

			<span v-if="editableStaticInternal" class="tu-input__icon__editable" :class="[
				{ 'tu-input__icon--after': true },
				{ 'tu-input__icon--click': !!$attrs['click-icon'] }
			]">
				<tu-icon icon-pack="material-icons" @click="editableStaticInternal = false">mode_edit</tu-icon>
			</span>
			<div v-if="editableStaticInternal"></div>
			<div v-if="loading" class="tu-input__loading" />
			<div class="tu-input__affects">
				<div class="tu-input__affects__1" />
				<div class="tu-input__affects__2" />
				<div class="tu-input__affects__3" />
				<div class="tu-input__affects__4" />
			</div>
		</div>
		<div v-if="progress > 0" class="tu-input__progress" :class="[
			{ 'tu-input__progress--danger': progress < 33 },
			{
				'tu-input__progress--warn': progress < 66 && progress > 33
			},
			{ 'tu-input__progress--success': progress > 66 }
		]">
			<div class="tu-input__progress_bar" :style="{ width: `${progress}%` }" />
		</div>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div v-if="$slots[`message-success`]" class="tu-input__message tu-input__message--success">
				<slot name="message-success" />
			</div>
		</transition>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div v-if="$slots['message-danger']" class="tu-input__message tu-input__message--danger">
				<slot name="message-danger" />
			</div>
		</transition>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div v-if="$slots[`message-warn`]" class="tu-input__message tu-input__message--warn">
				<slot name="message-warn" />
			</div>
		</transition>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div v-if="$slots[`message-primary`]" class="tu-input__message tu-input__message--primary">
				<slot name="message-primary" />
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import tuIcon from "../tuIcon";
import { getColor, isColor } from "@/utils";

defineOptions({
	name: "TuInput"
});

interface Props {
	modelValue?: string | number | object;
	labelPlaceholder?: string;
	label?: string;
	block?: boolean;
	iconAfter?: boolean;
	visiblePassword?: boolean;
	loading?: boolean;
	state?: string | null;
	progress?: number;
	border?: boolean;
	shadow?: boolean;
	transparent?: boolean;
	textWhite?: boolean;
	square?: boolean;
	id?: string | null;
	placeholder?: string | null;
	type?: string;
	inline?: boolean;
	disable?: boolean;
	editableStatic?: boolean;
	width?: string;
	color?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: "",
	labelPlaceholder: "",
	label: "",
	block: false,
	iconAfter: false,
	visiblePassword: false,
	loading: false,
	state: null,
	progress: 0,
	border: false,
	shadow: false,
	transparent: false,
	textWhite: false,
	square: false,
	id: null,
	placeholder: null,
	type: undefined,
	inline: false,
	disable: false,
	editableStatic: false,
	width: "unset"
});

const emit = defineEmits<{
	"update:modelValue": [value: string | number];
	"click-icon": [value: string];
	"onEnter": [];
}>();

class InputConstants {
	public static id = 0;
}

// Generate ID outside of computed to avoid side effects
const inputId = props.id || `input-${++InputConstants.id}`;

const getId = computed(() => {
	return `tu-input--${inputId}`;
});

const editableStaticInternal = ref(props.editableStatic);

const hasColor = computed(() => {
	return props.color;
});

const tuColor = computed(() => {
	if (props.state)
		return getColor(props.state);
	else if (props.color)
		return getColor(props.color);
	return "var(--tu-primary)";
});

const beforeEnter = function (el: Element) {
	(el as HTMLElement).style.height = "0";
};

const enter = function (el: Element, done: () => void) {
	const h = (el as HTMLElement).scrollHeight;
	(el as HTMLElement).style.height = h - 1 + "px";
	done();
};

const leave = function (el: Element) {
	(el as HTMLElement).style.minHeight = "0px";
	(el as HTMLElement).style.height = "0px";
};

const onInput = function (evt: Event) {
	const target = evt.target as HTMLInputElement;
	if (props.type === "number")
		emit("update:modelValue", target.valueAsNumber);
	else
		emit("update:modelValue", target.value);
};

const onEnter = function () {
	emit("onEnter");
};

const iconClick = function (evt: Event) {
	const target = evt.target as HTMLInputElement;
	emit("click-icon", target.value);
};

function editable(event: Event) {
	const target = event.target as Element;
	if (!target.closest(".tu-input-parent"))
		editableStaticInternal.value = true;
}

if (props.editableStatic) {
	watch(editableStaticInternal, (value) => {
		setTimeout(() => {
			if (value === false)
				document.addEventListener("click", editable);
			else document.removeEventListener("click", editable);
		}, 200);
	});
}
</script>
<style lang="scss" scoped>
@import "../../style/sass/_functions";
@import "../../style/sass/_tokens";

// Enhanced state mixin using design tokens
@mixin state($color) {
	.tu-input {
		background: getColorAlpha($color, 0.1) !important;
		color: getColor($color);
		border-color: getColorAlpha($color, 0.3);

		&:focus {
			background: getColorAlpha($color, 0.15) !important;
			border-color: getColor($color);
			box-shadow: 0 0 0 2px getColorAlpha($color, 0.2);
		}
	}

	.tu-input__label {
		color: getColor($color);
	}

	.tu-input__icon {
		color: getColor($color);
		background: getColorAlpha($color, 0.1);
		box-shadow: map-get($shadow, 'sm');
	}
}

// Enhanced input parent component using design tokens
.tu-input-parent {
	display: flex;
	flex-direction: column;
	max-width: max-content;
	position: relative;
	margin: map-get($spacing, 'xs');
	padding: map-get($spacing, 'xs');

	&.inline {
		display: inline-flex;
		justify-content: center;
	}

	&.square {
		.tu-input-content {
			border-radius: 0 !important;
		}
	}

	&.textWhite {
		.tu-input {
			color: white;
		}
	}

	&.transparent {
		.tu-input {
			background: transparent !important;
		}
	}

	&.block {
		width: 100%;
		max-width: unset;

		.tu-input {
			width: 100%;
		}
	}

	&--has-label {
		margin-top: map-get($spacing, 'lg') !important;
	}

	// State variants using enhanced mixin
	&--state-success {
		@include state("success");
	}

	&--state-danger {
		@include state("danger");
	}

	&--state-warn {
		@include state("warn");
	}

	&--state-dark {
		@include state("dark");
	}

	&--state-primary {
		@include state("primary");
	}
}

// Enhanced input content container
.tu-input-content {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	border-radius: map-get($border-radius, 'lg');
	border: 1px solid getColorAlpha("text", 0.15);
	transition: all map-get($transition, 'fast');

	// Enhanced focus-within for accessibility

	+.tu-input__message {
		padding-top: map-get($spacing, 'xs');
		display: flex;
	}

	&--has-color {
		.tu-input {
			&:focus {
				border-bottom: 2px solid getColor("color");

				~.tu-input__icon {
					color: getColor("color");
				}

				~.tu-input__label {
					color: getColor("color");
				}

				~.tu-input__label--placeholder {
					color: getColor("color");
				}
			}
		}
	}
}

// Enhanced input field using design tokens
.tu-input {
	border: 2px solid transparent;
	background: getColor("component-background");
	color: getColor("text");
	padding: map-get($spacing, 'sm') map-get($spacing, 'md');
	border-radius: inherit;
	transition: all map-get($transition, 'fast');
	padding-left: map-get($spacing, 'sm');
	font-size: map-get($font-size, 'base');
	min-height: map-get(map-get($component-size, 'md'), 'height');
	outline: none;

	// Enhanced accessibility and focus states
	&:focus {
		background: getColor("gray-1");
		padding-left: map-get($spacing, 'md');

		box-shadow: map-get($shadow, 'sm');

		&.tu-input--has-icon:not(.tu-input--has-icon--after) {
			padding-left: 40px;

			~.tu-input__icon {
				box-shadow: map-get($shadow, 'md');
				transform: translate(-6px, -6px);
			}

			~.tu-input__label:not(.tu-input__label--placeholder):not(.tu-input__label--label) {
				left: 44px;
			}
		}

		~.tu-input__icon {
			box-shadow: map-get($shadow, 'md');
			transform: translate(-6px, -6px);
			background: getColor("component-background");

			&--after {
				transform: translate(6px, -6px);
			}
		}

		~.tu-input__label:not(.tu-input__label--placeholder):not(.tu-input__label--label) {
			opacity: 0;
			left: map-get($spacing, 'lg');
		}

		~.tu-input__label--placeholder {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			transform: translate(-0.5%, -77%);
			font-size: map-get($font-size, 'sm');
		}
	}

	// Enhanced hover states
	&:hover:not(:focus) {
		background: getColor("gray-2");
		transform: translateY(-1px);
	}

	// Placeholder styling
	&::placeholder {
		color: getColorAlpha("text", 0.5);
		transition: all map-get($transition, 'fast');
	}

	&:focus::placeholder {
		color: getColorAlpha("text", 0.3);
	}

	// Label styling with design tokens
	&__label {
		position: absolute;
		left: map-get($spacing, 'md');
		font-size: map-get($font-size, 'sm');
		transition: all map-get($transition, 'fast');
		cursor: text;
		user-select: none;
		pointer-events: none;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		opacity: 0.6;
		color: getColorAlpha("text", 0.7);

		&--hidden {
			opacity: 0;
			visibility: hidden;

			&.tu-input__label--placeholder {
				opacity: 1;
				visibility: visible;
				pointer-events: auto;
				transform: translate(-3px, -80%);
				font-size: map-get($font-size, 'sm');
			}
		}

		&--label {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			transform: translate(-2px, -77%);
			font-size: map-get($font-size, 'sm');
		}
	}

	// Icon styling with design tokens
	&--has-icon {
		padding-left: 38px;

		~.tu-input__label {
			left: 44px;
		}

		&--after {
			padding-left: map-get($spacing, 'sm');
			padding-right: 38px;

			~.tu-input__label {
				left: map-get($spacing, 'md');
			}

			&.tu-input__label--label {
				transform: translate(calc(-3px - 22px), -80%) !important;
			}
		}

		&:focus {
			&--has-icon {
				&--after {
					~.tu-input__label {
						left: 44px;
					}

					~.tu-input__label--placeholder {
						transform: translate(calc(-3px - 22px), -20%) !important;
					}

					~.tu-input__label {
						left: 44px;
					}
				}
			}
		}
	}

	&__icon {
		position: absolute;
		right: auto;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: map-get($shadow, 'sm');
		transition: all map-get($transition, 'fast');
		border-radius: inherit;
		background: getColor("component-background");
		pointer-events: none;
		left: 0;
		color: getColorAlpha("text", 0.6);

		&--after {
			left: auto;
			right: 0;
			box-shadow: map-get($shadow, 'sm');
		}

		&--click {
			pointer-events: auto !important;
			cursor: pointer;

			&:hover {
				box-shadow: map-get($shadow, 'md');
				transform: translate(-6px, -6px);
				background: getColor("gray-1");
				color: getColor("primary");

				&.tu-input__icon--after {
					transform: translate(6px, -6px);
				}
			}
		}
	}

	// Message styling with design tokens
	&__message {
		font-size: map-get($font-size, 'xs');
		position: relative;
		padding: 0 map-get($spacing, 'sm');
		transition: all map-get($transition, 'fast');
		overflow: hidden;

		// State colors
		&--success {
			color: getColor("success");
		}

		&--danger {
			color: getColor("danger");
		}

		&--warn {
			color: getColor("warn");
		}

		&--dark {
			color: getColor("dark");
		}

		&--primary {
			color: getColor("primary");
		}
	}

	// Progress indicator using design tokens
	&__progress {
		width: 95%;
		left: 2.5%;
		position: relative;
		height: 2px;
		background: getColor("gray-2");
		margin-top: map-get($spacing, 'xs');
		overflow: hidden;
		border-radius: map-get($border-radius, 'sm');

		&--danger .tu-input__progress__bar {
			background: getColor("danger");
		}

		&--warn .tu-input__progress__bar {
			background: getColor("warn");
		}

		&--success .tu-input__progress__bar {
			background: getColor("success");
		}

		&__bar {
			width: 32%;
			height: 2px;
			max-width: 100%;
			transition: all map-get($transition, 'fast');
			border-radius: map-get($border-radius, 'sm');
			background: getColor("primary");
		}
	}

	// Loading indicator using design tokens
	&__loading {
		position: absolute;
		width: 22px;
		height: 22px;
		right: map-get($spacing, 'sm');
		pointer-events: none;
		border-radius: map-get($border-radius, 'full');
		box-sizing: border-box;
		background: inherit;
		cursor: default;

		&:after {
			box-sizing: border-box;
			position: absolute;
			width: 100%;
			height: 100%;
			border: 2px solid getColor("primary");
			border-radius: inherit;
			border-top: 2px solid transparent;
			border-left: 2px solid transparent;
			border-right: 2px solid transparent;
			animation: rotateInputLoading 0.8s ease infinite;
			top: 0;
			content: "";
		}

		&:before {
			box-sizing: border-box;
			top: 0;
			position: absolute;
			width: 100%;
			height: 100%;
			border: 2px dashed getColor("primary");
			border-radius: inherit;
			border-top: 2px solid transparent;
			border-left: 2px solid transparent;
			border-right: 2px solid transparent;
			animation: rotateInputLoading 0.8s linear infinite;
			opacity: 0.2;
			content: "";
		}
	}
}

// Border variant styles using design tokens
.tu-input-parent {
	&--border {
		.tu-input__icon {
			background: transparent !important;
			box-shadow: none !important;
		}

		.tu-input-content {
			border-radius: 0;
			border: none !important;

			.tu-input__affects {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				pointer-events: none;

				&__1 {
					border-bottom: 2px solid getColorAlpha("text", 0.3);
					width: 100%;
					height: 2px;
					position: absolute;
					bottom: 0;
					transition: all map-get($transition, 'fast');
				}

				&__2 {
					border-bottom: 2px solid getColor("color");
					width: 0%;
					height: 2px;
					position: absolute;
					bottom: 0;
					transition: all map-get($transition, 'fast');
					left: 50%;
					transform: translate(-50%);
				}
			}

			.tu-input {
				background: transparent;
				border-radius: 0;
				border: none !important;

				&:focus {
					~.tu-input__affects {
						.tu-input__affects__2 {
							width: 100%;
						}
					}
				}
			}
		}
	}

	// Shadow variant styles using design tokens
	&--shadow {
		.tu-input__icon {
			background: transparent;
			z-index: map-get($z-index, 'elevated');
		}

		.tu-input-content {
			.tu-input__affects {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				border-radius: inherit;
				pointer-events: none;
				z-index: map-get($z-index, 'base');

				&__1 {
					box-shadow: map-get($shadow, 'lg');
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					transition: all map-get($transition, 'fast');
					z-index: map-get($z-index, 'elevated');
					border-radius: inherit;
				}
			}

			.tu-input {
				background: transparent;
				border-radius: 0;
				border: 2px solid transparent;

				&:focus {
					transform: translate(0, 3px);

					~.tu-input__icon {
						background: getColor("component-background") !important;
						opacity: 1;
						box-shadow: map-get($shadow, 'lg') !important;
					}

					~.tu-input__affects {
						.tu-input__affects__1 {
							transform: translate(0, 3px);
							box-shadow: map-get($shadow, 'sm');
						}
					}
				}
			}
		}
	}
}

// Enhanced loading animation
@keyframes rotateInputLoading {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

// Static editable variant
.tu-input-parent.tu-component-static-editable {
	::v-deep(.tu-input-content) {
		border: none !important;
	}

	::v-deep(.tu-input) {
		cursor: text;
		background-color: transparent;
	}

	::v-deep(.tu-input__icon__editable) {
		i {
			font-size: map-get($font-size, 'base');
		}
	}
}

// Motion preference support
@media (prefers-reduced-motion: reduce) {

	.tu-input,
	.tu-input *,
	.tu-input-content,
	.tu-input-content * {
		transition: none !important;
		animation: none !important;
		transform: none !important;
	}
}

// High contrast mode support
@media (prefers-contrast: high) {}
</style>
