<template>
	<div>
		<color-picker style="box-sizing:content-box;" :color="color" :sucker-hide="true" @changeColor="changeColor" />
	</div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import colorPicker from "@caohenghu/vue-colorpicker";
import { Router } from "vue-router";
import { getColor } from "../../utils";

interface Props {
	modelValue?: string;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: "#59c7f9",
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

const emit = defineEmits<{
	"update:modelValue": [value: string];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const getColorSecondary = ref<string>("");

onMounted(() => {
	getColorSecondary.value = getColor(props.colorSecondary);
});

const color = ref("#59c7f9");

const changeColor = (colorData: any) => {
	const { rgba } = colorData;
	const { r, g, b, a } = rgba;
	color.value = `rgba(${r},${g},${b},${a})`;
	emit("update:modelValue", color.value);
};
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.content-box {
	box-sizing: content-box !important;
}

.hu-color-picker {
	background-color: -getColor("gray-2");
}
</style>
