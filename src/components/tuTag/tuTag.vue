<template>
	<div class="tu-tag" @click="onTagClicked" :style="{
		['--tu-color']: color ? getColor(color) : '',
		['--tu-color-rgb']: color ? getColorAsRgb(color) : '',
		['--tu-text-color']: textColor
	}" :class="{
	['tu-tag--flat']: flat
}">
		<div class="tu-tag__key">
			{{ name }}
		</div>
		<div class="tu-tag__separator">
			:
		</div>
		<div class="tu-tag__value">
			{{ value }}
		</div>
	</div>
</template>
<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import { Router } from "vue-router";
import { getColor, getColorAsRgb } from "../../utils";

interface Props {
	flat?: boolean;
	name?: string;
	value?: string;
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

const emit = defineEmits<{
	onTagClicked: [];
}>();

// tuComponent functionality
const componentColor = ref("");
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const getColorSecondary = ref<string>("");

onMounted(() => {
	getColorSecondary.value = getColor(props.colorSecondary || "rgb(130, 207, 23)");
});

function onTagClicked() {
	emit("onTagClicked");
}
</script>

<style lang="scss">
@import "../../style/sass/_mixins";


.tu-tag {
	--tu-tag-text-color: #ffffff;
	--tu-tag-text-color-rgb: 255, 255, 255;
	display: inline-flex;
	background: -getColor('color');
	color: -getColor("tag-text-color");
	padding: 8px;
	border-radius: 20px;
	margin-left: 2px;
	margin-right: 2px;
	cursor: pointer;

	&.tu-tag--flat {
		background: -getColorAlpha('color', 0.15);
		color: -getColor("color");
	}
}


.tu-tag__value {
	font-weight: bold;
}

.tu-tag__separator {
	margin-left: 5px;
	margin-right: 5px;
}
</style>