<template>
	<div class="tu-checkbox flex items-center" v-bind="$attrs" :class="[
		{ 'tu-checkbox--checked': isChecked },
		{ 'tu-checkbox--disabled': disabled },
		{ 'tu-checkbox--loading': loading },
		{ 'tu-checkbox--label-before': labelBefore },
		// colors
		{ [`tu-component--${color}`]: !!color },
	]">
		<div class="tu-checkbox__container relative">
			<input 
				:id="`input-${uid}`"
				class="tu-checkbox__input absolute inset-0 opacity-0 cursor-pointer" 
				type="checkbox" 
				v-on="listeners"
				:checked="checkedForce || isChecked" 
			/>
			<div class="tu-checkbox__indicator flex items-center justify-center" :indeterminate="indeterminate">
				<slot v-if="$slots.icon" name="icon" />
				<tu-icon v-else-if="!indeterminate">check</tu-icon>
				<tu-icon v-else>horizontal_rule</tu-icon>
			</div>
		</div>
		<label v-if="$slots.default" :for="`input-${uid}`" :class="['tu-checkbox__label flex items-center cursor-pointer select-none text-sm', { 'tu-checkbox__label--line-through': lineThrough }]">
			<slot />
		</label>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted } from "vue";
import tuIcon from "../tuIcon";
import { Router } from "vue-router";
import { getColor } from "../../utils";
import { invert } from "lodash";

defineOptions({
	name: "TuCheckBox"
});

// Generate a random UID for each checkbox instance
const generateRandomUID = () => {
	return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

interface Props {
	// Model and value props
	modelValue?: Array<unknown> | string | boolean;
	val?: unknown;
	notValue?: unknown;
	
	// State props
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	loading?: boolean;
	checkedForce?: boolean;
	
	// Behavior props
	eventBubble?: boolean;
	
	// Appearance props
	lineThrough?: boolean;
	labelBefore?: boolean;
	
	// Color and theming props
	color?: string;
	colorSecondary?: string;
	textColor?: string;

	// Legacy/unused props (consider removing)
	active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	// Model and value defaults
	modelValue: () => "",
	val: undefined,
	notValue: undefined,
	
	// State defaults
	checked: false,
	indeterminate: false,
	disabled: false,
	loading: false,
	checkedForce: false,
	
	// Behavior defaults
	eventBubble: false,
	
	// Appearance defaults
	lineThrough: false,
	labelBefore: false,
	
	// Color and theming defaults
	color: "primary",
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff",
	
	// Legacy defaults
	active: false
});

const emit = defineEmits<{
	"update:modelValue": [value: Array<unknown> | string | boolean | unknown];
	change: [value: Array<unknown> | string | boolean | unknown];
	click: [event: Event];
	blur: [event: EventTarget];
	"update:checked": [value: boolean];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const getColorSecondary = ref<string>("");

onMounted(() => {
	getColorSecondary.value = getColor(props.colorSecondary);
});

const uid = generateRandomUID();

const listeners = computed(() => {
	return {
		input: (evt: Event) => {
			if (typeof props.modelValue === "boolean")
				emit("update:modelValue", !props.modelValue);
			else if (
				typeof props.modelValue === "object" &&
				props.modelValue !== null
			) {
				const array = props.modelValue as Array<unknown>;
				const containValue =
					array.indexOf(props.val) === -1 &&
					JSON.stringify(array).indexOf(
						JSON.stringify(props.val)
					) === -1;
				let indexVal = 0;

				array.forEach((item: unknown, index: number) => {
					if (
						JSON.stringify(item) ===
						JSON.stringify(props.val)
					)
						indexVal = index;
				});

				if (containValue) array.push(props.val);
				else array.splice(indexVal, 1);

				emit("update:modelValue", array);
			}
			else {
				if (props.val !== props.modelValue)
					emit("update:modelValue", props.val);
				else {
					emit(
						"update:modelValue",
						props.notValue || null
					);
				}
			}

			emit("update:checked", !props.checked);
			if (props.eventBubble) emit("click", evt);
			else {
				evt.stopPropagation();
				evt.preventDefault();
			}
		},
		blur: (evt: EventTarget) => {
			emit("blur", evt);
		}
	};
});

const isChecked = computed(() => {
	if (props.modelValue) {
		if (typeof props.modelValue === "boolean")
			return props.modelValue;
		
		if (Array.isArray(props.modelValue)) {
			const array = props.modelValue as Array<unknown>;
			// Check if the value exists in the array
			return array.some(item => JSON.stringify(item) === JSON.stringify(props.val));
		}
	}
	
	// Fallback to checked or indeterminate props
	return props.checked || props.indeterminate || false;
});

onMounted(() => {
	if (props.checked && typeof props.modelValue === "boolean")
		emit("update:modelValue", true);
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_functions";
@import "../../style/sass/root";

// =============================================================================
// TU-CHECKBOX COMPONENT (BEM)
// =============================================================================

.tu-checkbox {
	// Container styles are handled by utility classes (flex items-center)
	
	&__container {
		width: 23px;
		height: 23px;
		border-radius: 9px;
		// relative position handled by utility class
		z-index: 1;
	}

	&__input {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		margin: 0px;
		padding: 0px;
		opacity: 0;
		z-index: 100;
		cursor: pointer;
		
		&:disabled {
			opacity: 0;
			pointer-events: none;
		}

		&:active ~ .tu-checkbox__indicator {
			background: getColor("gray-4") !important;
		}

		&:hover ~ .tu-checkbox__indicator {
			background: getColor("gray-3");
		}

		&:checked {
			&:hover ~ .tu-checkbox__indicator {
				box-shadow: 0px 3px 15px 0px getColorAlpha("color", 0.35);
			}

			~ .tu-checkbox__indicator {
				&::before {
					opacity: 0;
					transform: scale(1.2);
				}

				&::after {
					opacity: 1;
					transform: scale(1);
				}

				:deep(i:not(.tu-icon-check)) {
					opacity: 1;
					transform: scale(1);
					transition: all 0.25s ease 0.15s;
				}

				:deep(.tu-icon-check) {
					opacity: 1;

					span {
						.line1::after {
							width: 100%;
							transition: all 0.25s ease 0.1s;
						}

						.line2::after {
							transition: all 0.2s ease 0.3s;
							height: 100%;
						}
					}
				}
			}
		}
	}

	&__indicator {
		border-radius: 32%;
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 50;
		cursor: pointer;
		pointer-events: none;
		box-sizing: border-box;
		transition: all 0.25s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: -1;

		:deep(i:not(.tu-icon-check)) {
			opacity: 0;
			transition: all 0.25s ease;
			color: #fff;
			font-size: 1.1em;
			transform: scale(0.5);
		}

		.tu-icon-check {
			opacity: 0;
			z-index: 200;
		}

		// Indeterminate state - show background and dash when indeterminate="true"
		&[indeterminate="true"] {
			&::after {
				opacity: 1;
				transform: scale(1);
			}

			&::before {
				opacity: 0;
				transform: scale(1.2);
			}

			:deep(i) {
				opacity: 1;
				transform: scale(1);
				transition: all 0.25s ease 0.15s;
			}
		}

		&::before {
			content: "";
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			transition: all 0.25s ease;
			z-index: -1;
			border: 2px solid getColor("text");
			box-sizing: border-box;
		}

		&::after {
			content: "";
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			background: getColor("color");
			transform: scale(0.5);
			border-radius: inherit;
			opacity: 0;
			transition: all 0.25s ease;
			z-index: -1;
		}
	}

	&__label {
		// Styled with utility classes: flex items-center cursor-pointer select-none text-sm
		padding: 7px;
		transition: all 0.25s ease;
		position: relative;
		font-size: 0.9rem;

		&::before {
			position: absolute;
			width: 0px;
			height: 2px;
			background: getColorAlpha("text", 0.6);
			content: "";
			transition: all 0.25s ease;
		}

		&--line-through::before {
			width: calc(100% - 10px);
		}
	}

	// =============================================================================
	// MODIFIERS
	// =============================================================================

	&--disabled {
		pointer-events: none;

		.tu-checkbox__label {
			opacity: 0.5;
		}

		.tu-checkbox__indicator {
			opacity: 0.6;
			background: transparent !important;
		}
	}

	&--checked {
		.tu-checkbox__label--line-through {
			opacity: 0.4;
		}
	}

	&--loading {
		pointer-events: none;

		.tu-checkbox__indicator {
			background: transparent !important;

			&::before {
				border-radius: 50%;
				border: 2px solid getColor("gray-4") !important;
				border-top: 2px solid transparent !important;
				animation: tu-checkbox-loading 0.6s linear infinite;
			}
		}

		&.tu-checkbox--checked .tu-checkbox__indicator {
			&::before {
				border: 2px solid getColor("color") !important;
				border-top: 2px solid transparent !important;
				opacity: 1 !important;
			}

			&::after {
				opacity: 0;
				transform: scale(0.5);
			}
		}
	}

	&--label-before {
		.tu-checkbox__label {
			order: -1;
		}
	}
}

// =============================================================================
// ANIMATIONS
// =============================================================================

@keyframes tu-checkbox-loading {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>

