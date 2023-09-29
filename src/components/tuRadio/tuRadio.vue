<template>
	<div class="tu-radio-content" :class="[
		{
			disabled: disabled,
			loading: loading,
			active: isChecked
		},
		// colors
		{ [`tu-component--${color}`]: color }
	]">
		<label v-if="labelBefore" class="tu-radio__label" :for="`${uid}`">
			<slot />
		</label>
		<div class="tu-radio">
			<input type="radio" :id="`${uid}`" :value="val" :name="name || modelValue as string" :checked="isChecked"
				@input="onInput" @click="onInput" />
			<span class="tu-radio__effect">
				<span class="tu-radio__effect__icon">
					<slot name="icon" />
				</span>
				<span class="tu-radio__effect__loading"> </span>
			</span>
		</div>
		<label v-if="!labelBefore" class="tu-radio__label" :for="`${uid}`">
			<slot />
		</label>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import tuComponent from "../tuComponent";

class RadioUid {
	public static uid = 0;
}

export default defineComponent({
	name: "TuRadio",
	extends: tuComponent,
	props: {
		modelValue: {
			type: [Object, String, Number]
		},
		val: {
			type: [Object, String, Number]
		},
		name: { type: String, default: null },
		disabled: { type: Boolean, default: false },
		loading: { type: Boolean, default: false },
		labelBefore: { type: Boolean, default: false }
	},
	emits: ["update:modelValue"],
	setup(props, context) {
		const onInput = function () {
			context.emit("update:modelValue", props.val);
		};

		const isChecked = computed(() => {
			return props.modelValue === props.val;
		});

		return {
			isChecked,
			uid: ++RadioUid.uid,
			onInput
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.tu-radio-content {
	position: relative;
	display: flex;
	align-items: center;

	&.active {
		::v-deep(.tu-radio__effect__icon) {
			opacity: 0;
			transition: all 0.25s ease;
			transform: scale(1.3);
		}

		::v-deep(.tu-radio__effect) {
			&:after {
				border: 7px solid -getColor("color");
				box-shadow: 0px 3px 12px 0px -getColorAlpha("color", 0.3);
			}
		}
	}

	&:not(.active) {
		::v-deep(.tu-radio) {
			::v-deep(input) {
				&:hover {
					~.tu-radio__effect {
						::v-deep(.tu-radio__effect__icon) {
							opacity: 0.7;
						}

						&::after {
							border: 2px solid -getColorAlpha("text", 0.2);
						}
					}
				}
			}
		}
	}

	&.loading {
		pointer-events: none;
		user-select: none;

		.tu-radio {
			&__effect {
				&:after {
					opacity: 0.1;
				}

				&__loading {
					position: absolute;
					width: 100%;
					height: 100%;
					border-radius: inherit;

					&:after {
						content: "";
						position: absolute;
						width: 100%;
						height: 100%;
						border-radius: inherit;
						border: 2px solid -getColorAlpha("text", 0.4);
						border-top: 2px solid -getColorAlpha("text", 0);
						border-left: 2px solid -getColorAlpha("text", 0);
						border-bottom: 2px solid -getColorAlpha("text", 0);
						box-sizing: border-box;
						transition: all 0.25s ease;
						display: block;
						box-shadow: 0px 0px 0px 0px -getColorAlpha("color", 0.4);
						animation: loadingRadio 0.6s ease infinite;
					}

					&:before {
						content: "";
						position: absolute;
						width: 100%;
						height: 100%;
						border-radius: inherit;
						border: 2px dashed -getColorAlpha("text", 0.4);
						border-top: 2px solid -getColorAlpha("text", 0);
						border-left: 2px solid -getColorAlpha("text", 0);
						border-bottom: 2px solid -getColorAlpha("text", 0);
						box-sizing: border-box;
						transition: all 0.25s ease;
						display: block;
						box-shadow: 0px 0px 0px 0px -getColorAlpha("color", 0.4);
						animation: loadingRadio 0.6s linear infinite;
					}
				}
			}
		}
	}

	::v-deep(label) {
		cursor: pointer;
	}

	&.disabled {
		opacity: 0.5;
		pointer-events: none;

		.tu-radio {
			&__effect {
				background: -getColor("gray-3");
			}
		}

		::v-deep(label) {
			pointer-events: none;
		}
	}
}

.tu-radio {
	width: 20px;
	height: 20px;
	min-width: 20px;
	min-height: 20px;
	margin: 0px;
	padding: 0px;
	border-radius: 50%;
	position: relative;
	z-index: 10;

	&__label {
		margin: 0px 6px;
	}

	&__effect {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		left: 0px;
		top: 0px;
		transition: all 0.25s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		z-index: 10;

		&__icon {
			transition: all 0.25s ease;

			i {
				font-size: 0.75rem;
			}
		}

		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			border: 2px solid -getColorAlpha("text", 0.4);
			box-sizing: border-box;
			transition: all 0.25s ease;
			display: block;
			box-shadow: 0px 0px 0px 0px -getColorAlpha("color", 0.4);
		}
	}

	::v-deep(input) {
		margin: 0px;
		padding: 0px;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 100;
		opacity: 0;
		cursor: pointer;

		&:active {
			~.tu-radio__effect {
				&:after {
					transform: scale(0.9);
				}
			}
		}
	}
}
</style>
