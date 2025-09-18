<template>
	<i :style="iconStyle" :class="[
		getIconPack,
		icon,
		iconClass,
		getBg,
		getBgSize,
		{ round: round },
		{ outlined: outlined }
	]" v-bind="$attrs" class="tu-icon notranslate icon-scale unselectable">
		{{
			getIconPack.includes("material-icons") && icon !== null ? icon : ""
		}}
		<slot v-if="$slots.default"></slot>
	</i>
</template>
<script setup lang="ts">
import { computed, inject } from "vue";
import { Router } from "vue-router";
import { isColor as checkIsColor } from "../../utils";
import { ComponentConstants } from "../tuComponent";


defineOptions({
	name: "TuIcon"
});

interface Props {
	icon?: string | null;
	iconPack?: string | null;
	color?: string | null;
	bg?: string | null;
	size?: string | null;
	round?: boolean;
	outlined?: boolean;
	// tuComponent props
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	icon: null,
	iconPack: null,
	color: null,
	bg: null,
	size: null,
	round: false,
	outlined: false,
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

// tuComponent functionality
inject<Router | null>("appRouter", null);
const iconPackGlobal = inject<string | null>("iconPackGlobal", null) || ComponentConstants.iconPackGlobal;

const getIconPack = computed(() => {
	if (props.iconPack) return props.iconPack;
	else if (iconPackGlobal) return iconPackGlobal;
	else return "material-icons";
});

const iconClass = computed(() => {
	const classes: Record<string, boolean> = {};
	if (props.size) classes[props.size] = true;
	if (props.color && checkIsColor(props.color))
		classes[`tu-icon-${props.color}`] = true;
	if (getIconPack.value.includes("material-icons") && props.outlined)
		classes["material-icons-outlined"] = true;
	return classes;
});

const iconStyle = computed(() => {
	const style: Record<string, string | undefined> = {
		width: /(px)/.test(props.size || "")
			? props.size || undefined
			: /(em)/.test(props.size || "")
				? props.size || undefined
				: undefined,
		height: /(px)/.test(props.size || "")
			? props.size || undefined
			: /(em)/.test(props.size || "")
				? props.size || undefined
				: undefined,
		"font-size": /(px)/.test(props.size || "")
			? props.size || undefined
			: /(em)/.test(props.size || "")
				? props.size || undefined
				: undefined,
		color: getColor.value || undefined,
		background: getBgColor.value || undefined,
		cursor: "pointer"
	};
	return style;
});

const getBg = computed(() => {
	const classes: Record<string, boolean> = {};

	if (props.bg && checkIsColor(props.bg))
		classes[`con-tu-icon-bg-${props.bg}`] = true;

	return classes;
});

const getBgSize = computed(() => {
	const classes: Record<string, boolean> = {};
	if (["small", "medium", "large"].includes(props.size || "")) {
		classes[`bg-${props.size}`] = true;
		classes["tu-icon-bg"] = true;
	}

	return classes;
});

const getColor = computed(() => {
	return props.color && checkIsColor(props.color) ? props.color : props.color;
});

const getBgColor = computed(() => {
	return props.bg && checkIsColor(props.bg) ? props.bg : props.bg;
});
</script>
