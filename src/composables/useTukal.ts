import { inject, ref, computed, onMounted, type Ref, type InjectionKey } from "vue";
import { Router } from "vue-router";
import { getColor, getColorAsRgb } from "../utils";

// Injection keys for type safety
export const TUKAL_ROUTER_KEY: InjectionKey<Router> = Symbol("tukal-router");
export const TUKAL_ICON_PACK_KEY: InjectionKey<string> = Symbol("tukal-icon-pack");

// Composable for accessing Tukal utilities
export function useTukal() {
	const router = inject(TUKAL_ROUTER_KEY, null) || inject<Router | null>("appRouter", null);
	const iconPackGlobal = inject(TUKAL_ICON_PACK_KEY, null) || inject<string | null>("iconPackGlobal", null);

	return {
		router,
		iconPackGlobal,
		getColor,
		getColorAsRgb
	};
}

// Composable for components with color props
export function useTukalColor(props: { 
	color?: string; 
	colorSecondary?: string;
	textColor?: string;
	active?: boolean;
}) {
	const componentColor = ref("");
	const colorSecondary = computed(() => props.colorSecondary || "rgb(130, 207, 23)");

	const isColorDark = computed(() => {
		return props.color === "dark" || componentColor.value === "dark";
	});

	const isColor = computed(() => {
		return !!props.color;
	});

	const getColorSecondary = ref<string>("");

	onMounted(() => {
		if (props.colorSecondary) {
			getColorSecondary.value = getColor(props.colorSecondary);
		}
	});

	return {
		componentColor,
		isColorDark,
		isColor,
		getColorSecondary,
		getColor,
		getColorAsRgb
	};
}
