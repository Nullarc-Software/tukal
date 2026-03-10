<template>
	<div class="tu-component tu-divider">
		<span :class="borderClass" :style="afterStyle" class="tu-divider-border after" />
		<span v-if="icon || $slots.default" :style="{
			color: textColor,
			background: backgroundColor,
		}" :class="textAndBackgroundClass" class="tu-divider--text">
			<template v-if="!icon">
				<slot />
			</template>

			<tu-icon v-else :icon-pack="iconPack" :icon="icon" class="icon-divider notranslate tu-divider--icon">
			</tu-icon>
		</span>
		<span :style="beforeStyle" :class="borderClass" class="tu-divider-border before" />
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isColor as checkIsColor, getColor } from "../../utils";

defineOptions({
	name: "TuDivider"
});

interface Props {
	color?: string;
	background?: string;
	icon?: string | null;
	borderStyle?: string;
	borderHeight?: string;
	position?: string;
	iconPack?: string;
}

const props = withDefaults(defineProps<Props>(), {
	color: "rgba(0, 0, 0,.1)",
	background: "transparent",
	icon: null,
	borderStyle: "solid",
	borderHeight: "1px",
	position: "center",
	iconPack: "material-icons"
});

const getWidthAfter = computed(() => {
	let widthx = "100%";
	if (props.position === "left")
		widthx = "0%";
	else if (props.position === "left-center")
		widthx = "25%";
	else if (props.position === "right-center")
		widthx = "75%";
	else if (props.position === "right")
		widthx = "100%";
	return widthx;
});

const getWidthBefore = computed(() => {
	let widthx = "100%";
	if (props.position === "left")
		widthx = "100%";
	else if (props.position === "left-center")
		widthx = "75%";
	else if (props.position === "right-center")
		widthx = "25%";
	else if (props.position === "right")
		widthx = "0%";
	return widthx;
});

const borderColor = computed(() => {
	if (!checkIsColor(props.color))
		return getColor(props.color);
	return "";
});

const afterStyle = computed(() => {
	const classes: Record<string, string> = {
		width: getWidthAfter.value,
		"border-top-width": props.borderHeight,
		"border-top-style": props.borderStyle,
	};
	if (!checkIsColor(props.color))
		classes["border-top-color"] = borderColor.value;
	return classes;
});

const beforeStyle = computed(() => {
	const classes: Record<string, any> = {
		width: getWidthBefore.value,
		"border-top-width": props.borderHeight,
		"border-top-style": props.borderStyle,
	};
	if (!checkIsColor(props.color))
		classes["border-top-color"] = borderColor;
	return classes;
});

const borderClass = computed(() => {
	const classes = {};
	let borderColor = checkIsColor(props.color) ? props.color : "default";
	classes[`tu-divider-border-${borderColor}`] = true;
	return classes;
});

const textColor = computed(() => {
	if (!checkIsColor(props.color)) {
		return getColor(
			props.color !== "rgba(0, 0, 0,.1)" ? props.color : ""
		);
	}
	return "";
});

const backgroundColor = computed(() => {
	if (!checkIsColor(props.background)) {
		return getColor(props.background);
	}
	return "";
});

const textAndBackgroundClass = computed(() => {
	const classes = {};

	let textColor = checkIsColor(props.color) ? props.color : "default";
	classes[`tu-divider-text-${textColor}`] = true;

	let backgroundColor = checkIsColor(props.background)
		? props.background
		: "default";
	classes[`tu-divider-background-${backgroundColor}`] = true;

	return classes;
});
</script>
