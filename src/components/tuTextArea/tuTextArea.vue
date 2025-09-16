<template>
	<div :class="[
		`tu-textarea-${color}`,
		{
			'textarea-danger': counter
				? localValue && (localValue as string).length > Number(counter)
				: false,
			focusx: isFocus
		}
	]" class="tu-component tu-con-textarea" :style="{
	'--tu-color': color ? getColor(color) : '',
	height: height || undefined,
	width: width || undefined
}" ref="parent">
		<div v-if="label" ref="labelElem" class="tu-textarea-label">
			{{ label }}
		</div>

		<textarea :value="localValue as string" v-bind="$attrs" class="tu-textarea" ref="textarea" v-on="listeners"
			:style="{
				'min-width': getMinWidth,
				'min-height': getMinHeight,
				...(maxSize as Record<string, string | null>)
			}">
		</textarea>

		<div v-if="counter" class="count tu-textarea--count">
			{{ localValue ? (localValue as string).length : 0 }} / {{ counter }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, inject } from "vue";

interface Props {
	maxSize?: {
		"max-width"?: string | null;
		"max-height"?: string | null;
	};
	minWidth?: string;
	minHeight?: string;
	minSizeToParent?: boolean;
	modelValue?: string | object;
	label?: string | null;
	color?: string;
	counter?: number | string | null;
	counterDanger?: boolean;
	height?: string | null;
	width?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
	maxSize: () => ({
		"max-width": null,
		"max-height": null
	}),
	minWidth: "200px",
	minHeight: "75px",
	minSizeToParent: true,
	modelValue: "",
	label: null,
	color: "primary",
	counter: null,
	counterDanger: false,
	height: null,
	width: null
});

const emit = defineEmits<{
	"update:modelValue": [value: string];
	"update:counterDanger": [value: boolean];
	"focus": [];
	"blur": [];
}>();

// Inject tuComponent functionality
const getColor = inject("getColor", (color: string) => color);

const isFocus = ref(false);
const textarea = ref<HTMLTextAreaElement>();
const localValue = ref(props.modelValue);
const labelElem = ref<HTMLDivElement>();
const parent = ref<HTMLDivElement>();

const parentWidth = ref(0);
const parentHeight = ref(0);

function focus() {
	isFocus.value = true;
	emit("focus");
}

function blur() {
	isFocus.value = false;
	emit("blur");
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
		input: (evt: Event) => {
			const target = evt.target as HTMLTextAreaElement;
			localValue.value = target.value;
			emit("update:modelValue", target.value);
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
	if (props.counter && localValue.value && (localValue.value as string).length > Number(props.counter))
		emit("update:counterDanger", true);
	else emit("update:counterDanger", false);
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
			background: -getColor("gray-1");
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
	color: -getColorAlpha("text", 0.8);
	font-size: 0.8rem;
	width: 100%;
	max-width: 100%;
	background: transparent;

	&:focus {
		resize: auto !important;

		&~.count {
			opacity: 1;
		}
	}
}

.textarea-danger {
	border: 1px solid -getColorAlpha("danger", 0.4);
	box-shadow: 0px 4px 20px 0px -getColorAlpha("danger", 0.1);

	.tu-textarea {
		color: -getColorAlpha("danger", 0.8);
	}

	.count {
		background: -getColor("danger");
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
	background: -getColor("primary");
	color: -getColor("text") !important;
	opacity: 0.3;
	transition: all 0.25s ease;
}

.focusx.tu-con-textarea {
	border: 1px solid -getColor("color") !important;
}

.tu-textarea-label {
	border-bottom: 1px solid -getColorAlpha("color", 0.2);
}
</style>
