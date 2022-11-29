<template>
	<div>
		<color-picker
			style="box-sizing:content-box;"
			:color="color"
			:sucker-hide="true"
			@changeColor="changeColor"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import colorPicker from "@caohenghu/vue-colorpicker";
import tuComponent from "../tuComponent"

export default defineComponent({
	name: "TuColorPicker",
	extends: tuComponent,
	components: {
		colorPicker
	},
	props: {
		modelValue: {
			type: String,
			default: "#59c7f9"
		}
	},
	emits: ["update:modelValue"],
	setup (props, context) {
		const color = ref("#59c7f9");
		const changeColor = (color) => {
			const {
				rgba
			} = color;
			const { r, g, b, a } = rgba;
			color.value = `rgba(${r},${g},${b},${a})`;
			context.emit("update:modelValue", color.value);
		};
		return { changeColor, color };
	}
});
</script>

<style>
.content-box {
	box-sizing: content-box !important;
}
</style>
