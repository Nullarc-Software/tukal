<template>
	<div class="tu-checkbox-content" :class="[
		{ 'tu-checkbox--checked': isChecked },
		{ 'tu-checkbox--disabled': disabled },
		{ 'tu-checkbox--loading': loading },
		{ 'tu-checkbox--label-before': labelBefore },

		// colors
		{ [`tu-component--${color}`]: color },
	]">
		<div class="tu-checkbox-con">
			<input class="tu-checkbox" type="checkbox" v-bind="$attrs" :id="`input-${uid}`" v-on="listeners"
				:checked="checkedForce || isChecked" />
			<div class="tu-checkbox-mask" :indeterminate="indeterminate">
				<slot v-if="$slots.icon" name="icon" />
				<tu-icon v-else-if="!indeterminate">check</tu-icon>
				<tu-icon v-else>horizontal_rule</tu-icon>
			</div>
		</div>
		<label v-if="$slots.default" :for="`input-${uid}`" :class="['tu-checkbox-label', { ['lineThrough']: lineThrough }]">
			<slot />
		</label>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted } from "vue";
import tuIcon from "../tuIcon";
import { Router } from "vue-router";
import { getColor } from "../../utils";

let uid_ = 0;

interface Props {
	modelValue?: Array<any> | string | boolean;
	val?: any;
	notValue?: any;
	indeterminate?: boolean;
	lineThrough?: boolean;
	checked?: boolean;
	disabled?: boolean;
	checkedForce?: boolean;
	loading?: boolean;
	labelBefore?: boolean;
	eventBubble?: boolean;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: "",
	val: "",
	notValue: "",
	indeterminate: false,
	lineThrough: false,
	checked: false,
	disabled: false,
	checkedForce: false,
	loading: false,
	labelBefore: false,
	eventBubble: false,
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

const emit = defineEmits<{
	"update:modelValue": [value: any];
	change: [value: any];
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

const uid = uid_++;

const listeners = computed(() => {
	return {
		input: (evt: Event) => {
			if (typeof props.modelValue === "boolean")
				emit("update:modelValue", !props.modelValue);
			else if (
				typeof props.modelValue === "object" &&
				props.modelValue !== null
			) {
				const array = props.modelValue as Array<any>;
				const containValue =
					array.indexOf(props.val) === -1 &&
					JSON.stringify(array).indexOf(
						JSON.stringify(props.val)
					) === -1;
				let indexVal = 0;

				array.forEach((item: any, index: number) => {
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
	let checked = false;

	if (props.modelValue) {
		if (typeof props.modelValue === "boolean")
			checked = props.modelValue;
		else if (
			typeof props.modelValue === "object" &&
			props.modelValue !== null
		) {
			const array = props.modelValue as Array<any>;
			const containValue =
				array.indexOf(props.val) === -1 &&
				JSON.stringify(array).indexOf(
					JSON.stringify(props.val)
				) === -1;
			let indexVal = 0;

			array.forEach((item: any, index: number) => {
				if (JSON.stringify(item) === JSON.stringify(props.val))
					indexVal = index;
			});

			if (containValue) return false;
			else return true;
		}
	}
	else if (props.checked || props.indeterminate) checked = true;
	else checked = false;

	return checked;
});

onMounted(() => {
	if (props.checked && typeof props.modelValue === "boolean")
		emit("update:modelValue", true);
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";
@import "../../style/sass/root";

.tu-checkbox-content {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.tu-checkbox-con {
	width: 23px;
	height: 23px;
	border-radius: 9px;
	position: relative;
	z-index: 1;
}

.tu-checkbox-mask {
	border-radius: 32%;
	width: 100%;
	height: 100%;
	position: absolute;

	// border: 2px solid transparent
	z-index: 50;
	cursor: pointer;
	pointer-events: none;
	box-sizing: border-box;
	transition: all 0.25s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: -1;
	box-sizing: border-box;

	::v-deep(i:not(.tu-icon-check)) {
		opacity: 0;
		transition: all 0.25s ease;
		color: #fff;
		font-size: 1.1em;
		transform: scale(0.5);
	}

	&:after {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: -getColor("color");
		transform: scale(0.5);
		border-radius: inherit;
		opacity: 0;
		transition: all 0.25s ease;
		z-index: -1;
	}

	&:before {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		transition: all 0.25s ease;
		z-index: -1;
		border: 2px solid -getColor("text");
		box-sizing: border-box;
	}

	.tu-icon-check {
		opacity: 0;
		z-index: 200;
	}
}

.tu-checkbox {
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

	&:active {
		~.tu-checkbox-mask {
			background: -getColor("gray-4") !important;
		}
	}

	&:hover {
		~.tu-checkbox-mask {
			background: -getColor("gray-3");
		}
	}

	&:checked {
		&:hover {
			~.tu-checkbox-mask {
				box-shadow: 0px 3px 15px 0px -getColorAlpha("color", 0.35);
			}
		}

		~.tu-checkbox-mask {
			// border: 2px solid -getColor('color') !important
			box-shadow: 0px 0px 0px 0px -getColorAlpha("color", 0.35);

			::v-deep(i:not(.tu-icon-check)) {
				opacity: 1;
				transform: scale(1);
				transition: all 0.25s ease 0.15s;
			}

			::v-deep(.tu-icon-check) {
				opacity: 1;

				span {
					.line1 {
						&:after {
							width: 100%;
							transition: all 0.25s ease 0.1s;
						}
					}

					.line2 {
						&:after {
							transition: all 0.2s ease 0.3s;
							height: 100%;
						}
					}
				}
			}

			&:after {
				opacity: 1;
				transform: scale(1);
			}

			&:before {
				opacity: 0;
				transform: scale(1.2);
			}
		}
	}
}

.tu-checkbox-label {
	user-select: none;
	cursor: pointer;
	padding: 7px;
	transition: all 0.25s ease;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.9rem;

	&:before {
		position: absolute;
		width: 0px;
		height: 2px;
		background: -getColorAlpha("text", 0.6);
		content: "";
		transition: all 0.25s ease;
	}
}

.tu-checkbox--disabled {
	pointer-events: none;

	::v-deep(.tu-checkbox-label) {
		opacity: 0.5;
	}

	::v-deep(.tu-checkbox-mask) {
		opacity: 0.6;
		background: transparent !important;
	}
}

.tu-checkbox--checked {
	::v-deep(.lineThrough) {
		opacity: 0.4;

		&:before {
			width: calc(100% - 10px);
		}
	}
}

.tu-checkbox--loading {
	pointer-events: none;

	&.tu-checkbox--checked {
		::v-deep(.tu-checkbox-mask) {
			background: transparent !important;

			&:before {
				border-radius: 50%;
				border: 2px solid -getColor("color") !important;
				border-top: 2px solid transparent !important;
				animation: rotateCheckboxLoading 0.6s linear infinite;
				opacity: 1 !important;
			}

			&:after {
				opacity: 0;
				transform: scale(0.5);
			}
		}
	}

	::v-deep(.tu-checkbox-mask) {
		background: transparent !important;

		&:before {
			border-radius: 50%;
			border: 2px solid -getColor("gray-4") !important;
			border-top: 2px solid transparent !important;
			animation: rotateCheckboxLoading 0.6s linear infinite;
		}
	}
}

@keyframes rotateCheckboxLoading {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.tu-checkbox--label-before {
	::v-deep(.tu-checkbox-label) {
		order: -1;
	}
}
</style>
