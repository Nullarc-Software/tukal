<template>
	<div
		:class="[
			`tu-textarea-${color}`,
			{
				'textarea-danger': counter
					? localValue && localValue.length > counter
					: false,
				focusx: isFocus
			}
		]"
		class="tu-component tu-con-textarea"
		:style="{
			'--tu-color': color ? getColor(color) : '',
			height: height,
			width: width
		}"
		ref="parent"
	>
		<div v-if="label" ref="labelElem" class="tu-textarea-label">
			{{ label }}
		</div>

		<textarea
			:value="localValue"
			v-bind="$attrs"
			class="tu-textarea"
			ref="textarea"
			v-on="listeners"
			:style="{
				'min-width': getMinWidth,
				'min-height': getMinHeight,
				...maxSize
			}"
		>
		</textarea>

		<div v-if="counter" class="count tu-textarea--count">
			{{ localValue ? localValue.length : 0 }} / {{ counter }}
		</div>
	</div>
</template>

<script lang="ts">
import { getApplyColor } from "@/utils";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuTextarea",
	extends: tuComponent,
	props: {
		maxSize: {
			type: Object,
			default: () => {
				return {
					"max-width": null,
					"max-height": null
				};
			}
		},
		minWidth: {
			type: String,
			default: "200px"
		},
		minHeight: {
			type: String,
			default: "75px"
		},
		minSizeToParent: {
			type: Boolean,
			default: true
		},
		modelValue: {
			type: [String, Object],
			default: ""
		},
		label: {
			default: null,
			type: String
		},
		color: {
			default: "primary",
			type: String
		},
		counter: {
			default: null,
			type: [Number, String]
		},
		counterDanger: {
			default: false,
			type: Boolean
		},
		height: {
			default: null,
			type: String
		},
		width: {
			default: null,
			type: String
		}
	},
	setup (props, context) {
		const isFocus = ref(false);
		const textarea = ref<HTMLTextAreaElement>();
		const localValue = ref(props.modelValue);
		const labelElem = ref<HTMLDivElement>();
		const parent = ref<HTMLDivElement>();
		const styleComputed = computed(() => {
			const style: any = {};

			style.border = `1px solid ${
				isFocus.value
					? getApplyColor(props.color, 1)
					: "rgba(0, 0, 0,.08)"
			}`;
			style.height = props.height;
			style.width = props.width;

			return style;
		});

		const parentWidth = ref(0);
		const parentHeight = ref(0);

		function focus () {
			isFocus.value = true;
			context.emit("focus");
		}

		function blur () {
			isFocus.value = false;
			context.emit("blur");
		}

		onMounted(() => {
			if (parent.value) {
				parentWidth.value = parent.value.clientWidth;
				parentHeight.value = parent.value.clientHeight;
			}
		});

		const getMinWidth = computed(() => {
			if (labelElem.value) return `${labelElem.value.clientWidth}px`;
			else if (props.minSizeToParent) return `${parentWidth.value}px`;
			else return props.minWidth;
		});

		const getMinHeight = computed(() => {
			if (props.minSizeToParent) return `${parentHeight.value}px`;
			else return props.minHeight;
		});

		const listeners = computed(() => {
			return {
				...context.attrs,
				input: (evt) => {
					localValue.value = evt.target.value;
					context.emit("update:modelValue", evt.target.value);
				},
				focus: () => {
					focus();
				},
				blur: () => {
					blur();
				}
			};
		});

		watch(localValue, () => {
			if (localValue.value.length > props.counter)
				context.emit("update:counterDanger", true);
			else context.emit("update:counterDanger", false);
		});

		return {
			isFocus,
			listeners,
			styleComputed,
			localValue,
			labelElem,
			getMinWidth,
			getMinHeight,
			parent
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.tu-con-textarea {
	width: fit-content;
	position: relative;
	border: 1px solid rgba(0, 0, 0, 0.08);
	box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
	border-radius: 10px;
	transition: boxShadow 0.25s ease, border 0.25s ease, transform 0.25s ease;
	transform: translate(0, 0px);
	max-width: 100%;
	background: -getColor("gray-2");
	&.focusx {
		::v-deep(.tu-textarea-label) {
			background: #fcfcfc;
			padding-top: 4px;
			padding-bottom: 4px;
		}
	}
	::v-deep(.tu-textarea-label) {
		font-size: 0.7rem;
		padding: 8px;
		padding-bottom: 0px;
		cursor: default;
		transition: all 0.25s ease;
		border-radius: 10px 10px 0px 0px;
	}
}
.tu-textarea {
	resize: none;
	border-radius: 6px;
	border: 0px solid rgba(0, 0, 0, 0);
	display: block;
	padding: 9px;
	color: rgba(0, 0, 0, 0.8);
	font-size: 0.8rem;
	width: 100%;
	max-width: 100%;
	background: transparent;
	&:focus {
		resize: auto !important;
		& ~ .count {
			opacity: 1;
		}
	}
}
.textarea-danger {
	border: 1px solid -getColor("danger", 0.4);
	box-shadow: 0px 4px 20px 0px -getColor("danger", 0.1);
	.tu-textarea {
		color: -getColor("danger", 0.8);
	}
	.count {
		background: -getColor("danger", 1);
	}
}
.tu-textarea--count {
	position: absolute;
	right: 14px;
	bottom: 0px;
	transform: translate(0, 100%);
	padding: 1px 6px;
	font-size: 0.6rem;
	border-radius: 0px 0px 5px 5px;
	font-weight: bold;
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
	cursor: default;
	background: -getColor("primary", 1);
	color: #fff;
	opacity: 0.3;
	transition: all 0.25s ease;
}

.focusx.tu-con-textarea {
	border: 1px solid -getColor("color", 1) !important;
}

.tu-textarea-label {
	border-bottom: 1px solid -getColor("color", 0.2);
}
</style>
