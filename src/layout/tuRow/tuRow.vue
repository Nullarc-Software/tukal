<template>
	<div :style="{
		justifyContent: justify,
		alignItems: align,
		flexDirection: direction
	}" class="tu-row">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
	name: "TuRow",
	props: {
		w: { type: Number, default: 12 },
		justify: { type: String, default: "flex-start" },
		align: { type: String, default: "flex-start" },
		//"unset" | "column" | "column-reverse" | "row" | "row-reverse"
		direction: { type: String, default: "row" }
	}
});
</script>

<style lang="scss">
.tu-row {
	width: 100%;
	position: relative;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-wrap: wrap;
}
</style>
