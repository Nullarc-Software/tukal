<template>
	<button class="tu-navbar__item" :class="{ active: active || internalActive }" v-on="listeners" ref="item">
		<slot></slot>
	</button>
</template> 
<script setup lang="ts">
import {
	computed,
	getCurrentInstance,
	inject,
	nextTick,
	onMounted,
	ref,
	watch
} from "vue";
import { Router } from "vue-router";
import { ComponentConstants } from "../tuComponent";
import { getColor } from "../../utils";

defineOptions({
	name: "TuNavbarItem"
});

interface Props {
	active?: boolean;
	to?: any;
	id?: any;
	href?: any;
	target?: string;
	// tuComponent props
	color?: string;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	active: false,
	target: "_blank",
	color: "primary",
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

const emit = defineEmits<{
	click: [event: Event];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const getColorSecondary = ref<string>("");

onMounted(() => {
	getColorSecondary.value = getColor(props.colorSecondary);
});

// Component logic
const setLeftLine = inject<Function>("setLeftLine");
const setWidthLine = inject<Function>("setWidthLine");
const setModel = inject<Function>("setModel");
const item = ref<HTMLButtonElement>();
const instance = getCurrentInstance();
const internalActive = ref(false);
const router = ComponentConstants.router;
const parentName = instance?.parent?.type.name;

const handleLine = function () {
	nextTick(() => {
		if (props.active || internalActive.value) {
			if (parentName == "TuNavbarGroup") {
				const left = instance?.parent?.vnode.el?.offsetLeft;
				setLeftLine?.call(null, left);
				const width = instance?.parent?.vnode.el?.offsetWidth;
				setWidthLine?.call(null, width);
			}
			else {
				const left = item.value?.offsetLeft;
				setLeftLine?.call(null, left);
				const width = item.value?.scrollWidth;
				setWidthLine?.call(null, width);
			}
		}
	});
};

watch(() => props.active, (val: boolean) => {
	if (!val)
		internalActive.value = false;
});

const handleClick = function () {
	if (props.to) 
		router.push(props.to as any);
	else if (props.href) 
		window.open(props.href as string, props.target);
	
};

const handleActive = function () {
	setModel?.call(null, props.id, handleLine);
	handleLine();
};

const listeners = computed(() => {
	return {
		click: function (event: Event) {
			emit("click", event);
			internalActive.value = true;
			handleLine();
			handleClick();
			handleActive();
		}
	};
});

const handleRouteChange = function () {
	if (router.currentRoute.value.path === props.to) {
		internalActive.value = true;
		handleLine();
	}
	else
		internalActive.value = false;
};

const handleResize = function () {
	if (internalActive.value)
		handleLine();
};

onMounted(() => {
	setTimeout(() => {
		if (props.active || internalActive.value) 
			handleLine();
		
	}, 150);
});

if (router) {
	watch(router.currentRoute, () => {
		handleRouteChange();
	});
}
</script>

<style lang="scss">
@import "../../style/sass/_functions";

.tu-navbar__item {
	padding: 10px 15px;
	margin: 0px;
	border: 0px;
	background: transparent;
	font-size: 0.85rem;
	opacity: 0.7;
	transition: all 0.25s ease, color 0s;
	font-weight: bold;
	color: inherit;

	&.active {
		opacity: 1;
	}

	&:hover {
		opacity: 1;
	}
}
</style>
