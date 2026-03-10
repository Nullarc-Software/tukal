<template>
	<div v-if="open" class="tu-navbar-content" :style="{
		['--tu-color']: color ? getColor(color) : '',
		'z-index': zIndex,
	}" :class="[
	{
		fixed: fixed,
		sticky: sticky,
		shadow: shadow,
		hidden: hidden,
		shadowActive: shadowActive,
		textWhite: textWhite,
		paddingScroll: paddingScroll,
		paddingScrollActive: paddingScrollActive,
		tuNavbarSquare: square,
		leftAligned: leftAligned,
	},
	// colors
	{ [`tu-component--${color}`]: !!color },
	{ [`tu-component--is-color`]: !!isColor },
]" ref="navbarContent">
		<div class="tu-navbar">
			<div v-if="leftCollapsed ? !collapsedForced : true" class="tu-navbar__left" ref="left">
				<slot name="left" />
			</div>
			<div v-if="centerCollapsed ? !collapsedForced : true" class="tu-navbar__center" ref="center">
				<slot />
			</div>
			<div v-if="rightCollapsed ? !collapsedForced : true" class="tu-navbar__right" ref="right">
				<slot name="right" />
			</div>
		</div>
		<div :class="['tu-navbar__line', { notTransition: lineNotTransition }]" :style="{
			left: `${leftLine}px`,
			width: `${widthLine}px`,
		}"></div>
	</div>
</template>

<script lang="ts" setup>
import {
	nextTick,
	onMounted,
	onBeforeUnmount,
	provide,
	ref,
	watch,
	inject,
} from "vue";

defineOptions({
	name: "TuNavbar"
});

interface Props {
	fixed?: boolean;
	sticky?: boolean;
	leftAligned?: boolean;
	open?: boolean;
	shadow?: boolean;
	shadowScroll?: boolean;
	hideScroll?: boolean;
	textWhite?: boolean;
	square?: boolean;
	paddingScroll?: boolean;
	notLine?: boolean;
	leftCollapsed?: boolean;
	centerCollapsed?: boolean;
	rightCollapsed?: boolean;
	targetScroll?: string | null;
	color?: string;
}

const props = withDefaults(defineProps<Props>(), {
	fixed: false,
	sticky: false,
	leftAligned: false,
	open: true,
	shadow: false,
	shadowScroll: false,
	hideScroll: false,
	textWhite: false,
	square: false,
	paddingScroll: false,
	notLine: false,
	leftCollapsed: false,
	centerCollapsed: false,
	rightCollapsed: false,
	targetScroll: null,
});

const emit = defineEmits<{
	collapsed: [value: boolean];
	"update:modelValue": [value: string];
}>();

// tuComponent functionality
const getColor = inject<(color: string) => string>("getColor", () => "");
const isColor = inject<boolean>("isColor", false);

class NavbarConstants {
	public static zIndex = 9000;
}

const leftLine = ref(0);
const widthLine = ref(0);
const scrollTop = ref(0);
const collapsedWidth = ref(0);
const hidden = ref(false);
const shadowActive = ref(false);
const paddingScrollActive = ref(false);
const lineNotTransition = ref(false);
const collapsedForced = ref(false);

const navbarContent = ref<HTMLDivElement>();
const left = ref<HTMLDivElement>();
const right = ref<HTMLDivElement>();
const center = ref<HTMLDivElement>();
const zIndex = NavbarConstants.zIndex--;

const idToLineHandler: Record<string, () => void> = {};
let activeId = "";

const setModel = function (id: string, handleFunc: () => void) {
	emit("update:modelValue", id);
	idToLineHandler[id] = handleFunc;
	activeId = id;
};

watch(
	[
		() => props.hideScroll,
		() => props.paddingScroll,
		() => props.shadowScroll,
	],
	() => {
		handleScroll();
	}
);

const setLeftLine = function (left: number, transition = true) {
	if (!transition)
		lineNotTransition.value = true;
	else
		lineNotTransition.value = false;
	nextTick(() => {
		leftLine.value = left;
	});
};

const setWidthLine = function (width: number) {
	nextTick(() => {
		widthLine.value = width;
	});
};

// Provide values for child components
provide("setLeftLine", setLeftLine);
provide("setWidthLine", setWidthLine);
provide("setModel", setModel);

const scroll = function () {
	const scrollTopTemp = props.targetScroll
		? document.querySelector(props.targetScroll)?.scrollTop
		: window.pageYOffset;
	if (props.hideScroll) {
		if (
			Math.sign((scrollTopTemp as number) - scrollTop.value) === 1
		)
			hidden.value = true;
		else
			hidden.value = false;
	}

	if (props.shadowScroll) {
		if ((scrollTopTemp as number) > 0)
			shadowActive.value = true;
		else
			shadowActive.value = false;
	}

	if (props.paddingScroll) {
		if ((scrollTopTemp as number) > 0)
			paddingScrollActive.value = true;
		else
			paddingScrollActive.value = false;
	}
	scrollTop.value = scrollTopTemp as number;
};

const handleScroll = function () {
	if (props.hideScroll || props.shadowScroll || props.paddingScroll) {
		if (props.targetScroll) {
			const scrollElement = document.querySelector(
				props.targetScroll
			);
			scrollElement?.addEventListener("scroll", scroll);
		}
		else
			window.addEventListener("scroll", scroll);
	}
};

const handleResize = function () {
	const active: HTMLElement = navbarContent.value?.querySelector(
		".tu-navbar__item.active"
	) as HTMLElement;

	if (active)
		idToLineHandler[activeId]?.();
	else
		widthLine.value = 0;
	const navbar = navbarContent.value;

	if (
		props.leftCollapsed ||
		props.centerCollapsed ||
		props.rightCollapsed
	) {
		if (navbar && navbar.offsetWidth < collapsedWidth.value)
			collapsedForced.value = true;
	}

	if (collapsedForced.value)
		emit("collapsed", true);
	else
		emit("collapsed", false);

	if (navbar && navbar.offsetWidth < collapsedWidth.value)
		emit("collapsed", true);
	else {
		emit("collapsed", false);
		collapsedForced.value = false;
	}
};

onMounted(() => {
	setTimeout(() => {
		try {
			const leftEl = left.value;
			const centerEl = center.value;
			const rightEl = right.value;
			if (leftEl && centerEl && rightEl) {
				collapsedWidth.value =
					leftEl.offsetWidth +
					centerEl.offsetWidth +
					rightEl.offsetWidth +
					150;
				const navbar = navbarContent.value;
				if (navbar && navbar.offsetWidth < collapsedWidth.value) {
					collapsedForced.value = true;
					emit("collapsed", true);
					widthLine.value = 0;
					handleResize();
				}
			}
		}
		catch (_) {
			// Layout measurement failed — non-critical, ignore
		}
	}, 150);

	handleScroll();
	window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleResize);
	if (props.targetScroll) {
		const scrollElement = document.querySelector(props.targetScroll);
		scrollElement?.removeEventListener("scroll", scroll);
	}
	else
		window.removeEventListener("scroll", scroll);
});
</script>
<style lang="scss">
@import "../../style/sass/_functions";

.tu-navbar-content {
	--tu-color: var(--tu-gray-2);
	width: 100%;
	position: relative;
	top: 0px;
	left: 0px;
	width: 100%;
	border-radius: 0px 0px 15px 15px;
	background: getColor("color");
	transition: all 0.25s ease;
	color: getColor("text");

	&.paddingScroll:not(.paddingScrollActive) {
		padding-top: 20px;
		padding-bottom: 20px;

		.tu-navbar__group__items {
			margin-bottom: -30px;
		}
	}

	&.tuNavbarSquare {
		border-radius: 0px;
	}

	&.textWhite {
		color: #fff;

		.tu-navbar__line {
			background: #fff;
		}

		.tu-navbar__item {
			&:before {
				background: #fff;
			}
		}
	}

	&.leftAligned {
		.tu-navbar {
			justify-content: left !important;

			&__right {
				margin-left: auto;
			}

			&__center {
				margin-left: 2%;
			}
		}
	}

	&.fixed {
		position: absolute !important;
	}

	&.sticky {
		position: sticky !important;
	}

	&.shadow,
	&.shadowActive {
		box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));
	}

	&.hidden {
		transform: translate(0, -100%);
	}
}

.tu-navbar {
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 15px;
	box-sizing: border-box;
	min-height: 44px;

	&__left {
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		padding: 5px;

		img {
			width: 100px;
		}
	}

	&__right {
		display: inline-flex;
		align-items: center;
		justify-content: flex-end;
	}

	&__center {
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
	}

	&__line {
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 100px;
		background: getColor("text");
		height: 3px;
		transition: all 0.25s ease;

		&.notTransition {
			transition: none !important;
		}
	}
}
</style>
