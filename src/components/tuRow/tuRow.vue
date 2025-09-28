<template>
	<div :style="{
		justifyContent: justify,
		alignItems: align,
		flexDirection: direction
	}" class="tu-row">
		<slot />
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: "TuRow"
});

interface Props {
	w?: number;
	justify?: string;
	align?: string;
	direction?: "unset" | "column" | "column-reverse" | "row" | "row-reverse";
}

withDefaults(defineProps<Props>(), {
	w: 12,
	justify: "flex-start",
	align: "flex-start",
	direction: "row"
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
