<template>
	<div class="tu-input-parent" v-bind="$attrs" :style="{
		['--tu-color']: color ? getColor(color) : ''
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

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import tuIcon from "../tuIcon";
import tuComponent from "../tuComponent";

class InputConstants {
	public static id = 0;
}

export default defineComponent({
	name: "TuInput",
	extends: tuComponent,
	components: {
		tuIcon
	},
	props: {
		modelValue: { type: [Object, String, Number, Object as any], default: "" },
		labelPlaceholder: { default: "" },
		label: { default: "" },
		block: { type: Boolean, default: false },
		iconAfter: { type: Boolean, default: false },
		visiblePassword: { type: Boolean, default: false },
		loading: { type: Boolean, default: false },
		state: { type: String, default: null },
		progress: { type: Number, default: 0 },
		border: { type: Boolean, default: false },
		shadow: { type: Boolean, default: false },
		transparent: { type: Boolean, default: false },
		textWhite: { type: Boolean, default: false },
		square: { type: Boolean, default: false },
		id: { type: String, default: null },
		placeholder: { type: String, default: null },
		type: { type: String, default: null },
		inline: { type: Boolean, default: false },
		disable: { type: Boolean, default: false },
		editableStatic: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: "unset"
		}
	},
	emits: ["update:modelValue", "click-icon", "onEnter"],
	setup(props, context) {
		const getId = computed(() => {
			return `tu-input--${props.id || ++InputConstants.id}`;
		});

		const editableStaticInternal = ref(props.editableStatic);

		const hasColor = computed(() => {
			return (
				props.color
			);
		});

		const beforeEnter = function (el: any) {
			el.style.height = 0;
		};

		const enter = function (el: any, done: any) {
			const h = el.scrollHeight;
			el.style.height = h - 1 + "px";
			done();
		};

		const leave = function (el: any, done: any) {
			el.style.minHeight = "0px";
			el.style.height = "0px";
		};

		const onInput = function (evt) {
			if (props.type === "number") {
				context.emit("update:modelValue", evt.target.valueAsNumber);
			}
			else {
				context.emit("update:modelValue", evt.target.value);
			}
		};

		const onEnter = function () {
			context.emit("onEnter");
		}

		const iconClick = function (evt) {
			context.emit("click-icon", evt.target.value);
		};

		function editable(event: any) {
			if (!event.target.closest(".tu-input-parent"))
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

		return {
			editableStaticInternal,
			enter,
			beforeEnter,
			leave,
			onInput,
			iconClick,
			hasColor,
			getId,
			onEnter
		};
	}
});
</script>
<style lang="scss" scoped>
@import "../../style/sass/_mixins";

@mixin state($color) {
	.tu-input {
		background: rgba(-getColor($color), 0.1) !important;
		color: -getColor($color);
	}

	.tu-input__label {
		color: -getColor($color);
	}

	.tu-input__icon {
		color: -getColor($color);
		background: rgba(-getColor($color), 0.1);
		box-shadow: (-15px) 10px 10px -10px rgba(-getColor($color), 0.1);
	}
}

.tu-input-parent {
	--tu-color: var(--tu-primary);
	display: flex;
	flex-direction: column;
	max-width: max-content;

	&.inline {
		display: inline-flex;
		justify-content: center;
	}

	position: relative;
	margin: 5px;
	padding: 5px;

	&.square {
		.tu-input-content {
			border-radius: 0px !important;
		}
	}

	&.textWhite {
		.tu-input {
			color: #fff;
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
		margin-top: 20px !important;
	}

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

.tu-input-content {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	border-radius: 12px;
	border: 1px solid -getColorAlpha("text", 0.09);

	+.tu-input__message {
		padding-top: 2px;
		display: flex;
	}

	&--has-getColor {
		.tu-input {

			// box-shadow: 0px 10px 20px -5px -getColor('color',.3)
			&:focus {
				border-bottom: 2px solid -getColor("color");

				~.tu-input__icon {
					color: -getColor("color");
				}

				~.tu-input__label {
					color: -getColor("color");
				}

				~.tu-input__label--placeholder {
					color: -getColor("color");
				}
			}
		}
	}
}

.tu-input {
	border: 2px solid transparent;
	background: -getColor("gray-2");
	color: -getColor("text");
	padding: 7px 13px;
	border-radius: inherit;
	transition: all 0.25s ease;
	padding-left: 10px;

	&:focus {
		background: -getColor("gray-3");
		padding-left: 15px;

		&.tu-input--has-icon:not(.tu-input--has-icon--after) {
			padding-left: 40px;

			~.tu-input__icon {
				box-shadow: 15px 10px 10px -10px rgba(0, 0, 0, -var(shadow-opacity));
			}

			~.tu-input__label:not(.tu-input__label--placeholder):not(.tu-input__label--label) {
				left: 44px;
			}
		}

		~.tu-input__icon {
			box-shadow: (-15px) 10px 10px -10px rgba(0, 0, 0, -var(shadow-opacity));
			transform: translate(-6px, -6px);
			background: -getColor("gray-1");

			&--after {
				transform: translate(6px, -6px);
			}
		}

		~.tu-input__label:not(.tu-input__label--placeholder):not(.tu-input__label--label) {
			opacity: 0;
			left: 20px;
		}

		~.tu-input__label--placeholder {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			transform: translate(-0.5%, -77%);
			font-size: 0.8rem;
		}
	}

	&__label {
		position: absolute;
		left: 13px;
		font-size: 0.8rem;
		transition: all 0.25s ease;
		cursor: text;
		user-select: none;
		pointer-events: none;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		opacity: 0.4;

		&--hidden {
			opacity: 0;
			visibility: hidden;

			&.tu-input__label--placeholder {
				opacity: 1;
				visibility: visible;
				pointer-events: auto;
				transform: translate(-3px, -80%);
				font-size: 0.8rem;
			}
		}

		&--label {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;
			transform: translate(-2px, -77%);
			font-size: 0.8rem;
		}
	}

	&--has-icon {
		padding-left: 38px;

		~.tu-input__label {
			left: 44px;
		}

		&--after {
			padding-left: 7px;
			padding-right: 38px;

			~.tu-input__label {
				left: 13px;
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
						transform: translate(calc(-3px - 22px),
								-20%) !important;
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
		box-shadow: 12px 0px 10px -10px rgba(0, 0, 0, -var(shadow-opacity));
		transition: all 0.25s ease;
		border-radius: inherit;
		background: -getColor("gray-2");
		pointer-events: none;
		left: 0px;

		&--after {
			left: auto;
			right: 0px;
			box-shadow: (-12px) 0px 10px -10px rgba(0, 0, 0, -var(shadow-opacity));
		}

		&--click {
			pointer-events: auto !important;
			cursor: pointer;

			&:hover {
				box-shadow: (-15px) 10px 10px -10px rgba(0, 0, 0, -var(shadow-opacity));
				transform: translate(-6px, -6px);
				background: -getColor("gray-1");

				&.tu-input__icon--after {
					transform: translate(6px, -6px);
				}
			}
		}
	}

	&__message {
		font-size: 0.7rem;
		position: relative;
		padding: 0px 7px;
		transition: all 0.25s ease;
		overflow: hidden;

		&--success {
			color: -getColor("success");
		}

		&--danger {
			color: -getColor("danger");
		}

		&--warn {
			color: -getColor("warn");
		}

		&--dark {
			color: -getColor("dark");
		}

		&--primary {
			color: -getColor("primary");
		}
	}

	&__progress {
		width: 95%;
		left: 2.5%;
		position: relative;
		height: 2px;
		background: -getColor("gray-2");
		margin-top: 5px;
		overflow: hidden;
		border-radius: 5px;

		&--danger {
			.tu-input__progress__bar {
				background: -getColor("danger");
			}
		}

		&--warn {
			.tu-input__progress__bar {
				background: -getColor("warn");
			}
		}

		&--success {
			.tu-input__progress__bar {
				background: -getColor("success");
			}
		}

		&__bar {
			width: 32%;
			height: 2px;
			max-width: 100%;
			transition: all 0.25s ease;
			border-radius: 5px;
		}
	}

	&__loading {
		position: absolute;
		width: 22px;
		height: 22px;
		right: 7px;
		pointer-events: none;
		border-radius: 50%;
		box-sizing: border-box;
		background: inherit;
		cursor: default;

		&:after {
			box-sizing: border-box;
			position: absolute;
			width: 100%;
			height: 100%;
			border: 2px solid -getColor("primary");
			border-radius: inherit;
			border-top: 2px solid transparent;
			border-left: 2px solid transparent;
			border-right: 2px solid transparent;
			animation: rotateInputLoading 0.8s ease infinite;
			top: 0px;
			content: "";
		}

		&:before {
			box-sizing: border-box;
			top: 0px;
			position: absolute;
			width: 100%;
			height: 100%;
			border: 2px dashed -getColor("primary");
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

.tu-input-parent {
	&--border {
		.tu-input__icon {
			background: transparent !important;
			box-shadow: none !important;
		}

		.tu-input-content {
			border-radius: 0px;
			border: none !important;

			.tu-input__affects {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0px;
				left: 0px;
				pointer-events: none;

				&__1 {
					border-bottom: 2px solid -getColorAlpha("text", 0.3);
					width: 100%;
					height: 2px;
					position: absolute;
					bottom: 0px;
					transition: all 0.25s ease;
				}

				&__2 {
					border-bottom: 2px solid -getColor("color");
					width: 0%;
					height: 2px;
					position: absolute;
					bottom: 0px;
					transition: all 0.25s ease;
					left: 50%;
					transform: translate(-50%);
				}
			}

			.tu-input {
				background: transparent;
				border-radius: 0px;
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

	&--shadow {
		.tu-input__icon {
			background: transparent;
			z-index: 100;

			// box-shadow: none !important
		}

		.tu-input-content {
			.tu-input__affects {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0px;
				left: 0px;
				border-radius: inherit;
				pointer-events: none;
				z-index: 10;

				&__1 {
					box-shadow: 0px 6px 25px -6px rgba(0, 0, 0, -var(shadow-opacity));
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0px;
					transition: all 0.25s ease;
					z-index: 200;
					border-radius: inherit;
				}
			}

			.tu-input {
				background: transparent;
				border-radius: 0px;
				border: 2px solid transparent;

				&:focus {
					transform: translate(0, 3px);

					~.tu-input__icon {
						background: -getColor("background") !important;
						opacity: 1;
						box-shadow: 0px 10px 20px -5px rgba(0, 0, 0, -var(shadow-opacity)) !important;
					}

					~.tu-input__affects {
						.tu-input__affects__1 {
							transform: translate(0, 3px);
							box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, -var(shadow-opacity));
						}
					}
				}
			}
		}
	}
}

@keyframes rotateInputLoading {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.tu-input-parent.tu-component-static-editable {
	::v-deep(.tu-input-content) {
		border: none !important;
	}

	::v-deep(.tu-input) {
		cursor: text;
		//pointer-events: none;
		background-color: transparent;
	}

	::v-deep(.tu-input__icon__editable) {
		i {
			font-size: 16px;
		}
	}
}
</style>
