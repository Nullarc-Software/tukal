<template>
	<a :href="href" class="tu-sidebar__a">
		<button class="tu-sidebar__item" :class="{
			active: isActive,
			hasIcon: !!$slots.icon,
			reduced: reduced

		}" @click="onClick">
			<div v-if="$slots.icon" class="tu-sidebar__item__icon">
				<slot name="icon" />
			</div>
			<div class="tu-sidebar__item__text" :class="{ reduced: reduced }" :title="tooltip">
				<slot />
			</div>
		</button>
	</a>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref, watch, type Ref } from "vue";

defineOptions({
	name: "TuSidebarItem"
});
import { useTukal } from "../../composables/useTukal";
import * as _ from "lodash";
import * as pathRegex from "path-to-regexp";
import { TuIcon } from "../tuIcon";
import TuPopper from "../tuPopper/tuPopper.vue";

interface RouteObject {
	name?: string;
	path?: string;
}

interface Props {
	to?: RouteObject | string | null;
	href?: string;
	target?: string;
	value?: string;
	id?: string;
	tooltip?: string;
}

const props = withDefaults(defineProps<Props>(), {
	to: null,
	href: undefined,
	target: "_blank",
	value: undefined,
	id: undefined,
	tooltip: ""
});

const parentValue = inject<Ref<string | null>>("parentValue");
const handleClickItem = inject<((id: string) => void) | undefined>("handleClickItem");
const reduced = inject<Ref<boolean>>("reduced");
const internalActive = ref(false);
const tooltipVisible = ref(false);
const { router } = useTukal();


const isActive = computed(() => {
	if (parentValue?.value && props.id)
		return parentValue?.value === props.id || internalActive.value;
	return internalActive.value;
});

const handleClick = function () {
	if (props.to && router) {
		if (typeof props.to === "string") {
			router.push(props.to);
		} else if (typeof props.to === "object" && props.to.path) {
			router.push({ path: props.to.path });
		}
	}
	else if (props.href)
		window.open(props.href as string, props.target);
};

const onClick = () => {
	if (props.id)
		handleClickItem?.(props.id);
	handleClick();
};

const showTooltip = () => {
	if (reduced?.value)
		tooltipVisible.value = true;
};

const hideTooltip = () => {
	tooltipVisible.value = false;
};

const handleRouteChange = function () {
	if (router) {
		if (
			_.some(router.currentRoute.value.matched, (route) => {
				if (typeof props.to === "string") {
					return pathRegex
						.pathToRegexp(route.path)
						.regexp.test(props.to as string) || pathRegex.pathToRegexp(route.path).regexp.test(props.href || "");
				}
				else if (props.to && typeof props.to === "object") {
					const routeObj = props.to as RouteObject;
					if (
						routeObj.name === router.currentRoute.value.name
					)
						return true;
					else {
						return pathRegex
							.pathToRegexp(
								router.currentRoute.value.path
							)
							.regexp.test(routeObj.path || "") || pathRegex.pathToRegexp(router.currentRoute.value.path).regexp.test(props.href || "");
					}
				}
				else return false;
			})
		) {
			internalActive.value = true;
			if (props.id)
				handleClickItem?.(props.id);
		}
		else internalActive.value = false;
	}
};

if (router) {
	watch(router.currentRoute, () => {
		handleRouteChange();
	});
}

onMounted(() => {
	// Need to handle route when component mounted not just on route change
	handleRouteChange();
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";

// Variables
$transition-ease: all 0.25s ease;
$active-padding: 10px;
$icon-padding: 8px;

// Mixins
@mixin flex-center {
	display: flex;
	align-items: center;
	justify-content: center;
}

@mixin text-ellipsis {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.tu-sidebar__a {
	display: flex;
	justify-content: start;
	align-items: center;
	width: 100%;
	text-decoration: none;
	color: inherit;
	
	&:hover,
	&:visited,
	&:active {
		text-decoration: none;
		color: inherit;
	}
}

.tu-sidebar__item {
	width: 100%;
	padding: 5px;
	text-align: left;
	background: transparent;
	font-size: 1rem;
	font-weight: bold;
	opacity: 0.7;
	transition: $transition-ease;
	@include flex-center;
	justify-content: flex-start;
	position: relative;
	left: 0;
	
	color: getColor("text");
	border: 0;

	// Active indicator line (base state)
	&:after {
		opacity: 0;
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 5px;
		height: 100%;
		background: getColor("color");
		border-radius: 0 20px 20px 0;
		transform: translateX(-10px);
		transition: $transition-ease;
		z-index: 60;
	}

	// Base hover and active states
	&:hover:not(.hasIcon),
	&.active:not(.hasIcon) {
		opacity: 1;
		padding-left: $active-padding;
	}

	&.reduced { 
		justify-content: space-around;
	}
	
	&:hover.hasIcon,
	&.active.hasIcon {
		opacity: 1;
		padding-left: $icon-padding;
	}

	&.active {
		color: getColor("color");
		&:after { 
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	// Child elements
	&__icon {
		padding: 5px 5px;
		@include flex-center;
		font-size: 1.2rem;
		z-index: 50;
		background: transparent;
	}

	&__text {
		
		@include text-ellipsis;
		padding: 5px 5px;
		z-index: 10;
		transition: $transition-ease;
		font-size: 0.9rem;
		opacity: 1;
		margin-right: 10px;

		&.reduced { display: none; }
	}
}
</style>

