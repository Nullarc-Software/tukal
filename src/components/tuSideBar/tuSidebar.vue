<template>
	<div :style="{
		['--tu-color']: color ? getColor(color) : '',
		['--tu-sidebar-width']: sidebarWidth,
		['--tu-sidebar-reduced-width']: reducedWidth,
		['--tu-sidebar-padding']: '5px'
	}" :class="[
	'tu-sidebar-content',
	{
		reduce: reduceInternal,
		open: open,
		notLineActive: notLineActive,
		square: square,
		notShadow: notShadow,
		textWhite: textWhite,
		relative: relative,
		absolute: absolute,
		right: right,
		'hover-expand': hoverExpand,
		'tu-component-dark': color === 'dark' || theme === 'dark'
	},
	// colors
	{ [`tu-component--${color}`]: color },
	{ [`tu-component--is-color`]: !!isColor }
]" v-on="listeners" ref="sidebar" v-bind="$attrs">
		
		<!-- Top section: Logo and Header (always on top) -->
		<div class="tu-sidebar__top">
			<div v-if="$slots.logo" class="tu-sidebar__logo">
				<slot name="logo" />
			</div>
			<div v-if="$slots.header && !reduceInternal" class="tu-sidebar__header">
				<slot name="header" />
			</div>
		</div>

		<!-- Middle section: Scrollable items -->
		<div class="tu-sidebar__content">
			<div class="tu-sidebar">
				<slot />
			</div>
			<div v-if="$slots.footer" class="tu-sidebar__footer">
				<slot name="footer" />
			</div>
		</div>

		<!-- Bottom section: Menu toggle -->
		<div class="tu-sidebar__bottom">
			<div class="tu-sidebar__toggle" v-if="reduce" @click="toggleReduce">
				<TuIcon>{{ getArrowDirection }}</TuIcon>
			</div>
		</div>
		
	</div>
</template>
<script lang="ts" setup>
import { setColor } from "@/utils";
import { computed, inject, onMounted, provide, ref, watch } from "vue";
import TuIcon from "../tuIcon/tuIcon.vue";

defineOptions({
	name: "TuSidebar"
});

interface Props {
	// === Core Behavior ===
	/** 
	 * The currently active/selected item ID. Use with v-model for two-way binding.
	 * @example v-model="selectedItem"
	 */
	modelValue?: string | number | null;

	/** 
	 * Controls whether the sidebar starts in reduced/collapsed state (icon-only mode).
	 * @default false
	 */
	reduce?: boolean;

	/** 
	 * Controls whether the sidebar is visible or hidden. Used for overlay/mobile scenarios.
	 * @default false
	 */
	open?: boolean;

	/** 
	 * Controls whether the sidebar is expanded or collapsed. Use with .sync for two-way binding.
	 * @default false
	 */
	expanded?: boolean;

	// === Hover Behavior ===
	/** 
	 * When true, sidebar expands on hover and collapses on mouse leave (only when reduce=true).
	 * @default false
	 */
	hoverExpand?: boolean;

	// === Layout & Positioning ===
	/** 
	 * Positions the sidebar on the right side instead of left.
	 * @default false
	 */
	right?: boolean;

	/** 
	 * Uses relative positioning instead of absolute. Sidebar becomes part of document flow.
	 * @default false
	 */
	relative?: boolean;

	/** 
	 * Uses absolute positioning. Sidebar overlays content.
	 * @default false
	 */
	absolute?: boolean;

	/** 
	 * Fixed width in pixels for expanded state. If not set, uses default 250px.
	 * @example :fixed-expand-width="300"
	 */
	fixedExpandWidth?: number | null;

	// === Styling ===
	/** 
	 * Primary color theme for active states and indicators.
	 * @example color="primary" color="success" color="#ff0000"
	 */
	color?: string;

	/** 
	 * Background color of the sidebar.
	 * @default "background"
	 */
	background?: string;

	/** 
	 * Color theme variant.
	 * @default "light"
	 */
	theme?: "light" | "dark";

	// === Visual Modifiers ===
	/** 
	 * Removes border radius for sharp corners.
	 * @default false
	 */
	square?: boolean;

	/** 
	 * Removes drop shadow from sidebar.
	 * @default false
	 */
	notShadow?: boolean;

	/** 
	 * Uses white text color theme.
	 * @default false
	 */
	textWhite?: boolean;

	/** 
	 * Hides the active line indicator on sidebar items.
	 * @default false
	 */
	notLineActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	// Core Behavior
	modelValue: undefined,
	reduce: false,
	open: false,
	expanded: false,
	
	// Hover Behavior
	hoverExpand: false,
	
	// Layout & Positioning
	right: false,
	relative: false,
	absolute: false,
	fixedExpandWidth: null,
	
	// Styling
	color: undefined,
	background: "background",
	theme: "light",
	
	// Visual Modifiers
	square: false,
	notShadow: false,
	textWhite: false,
	notLineActive: false,
});

/**
 * Events emitted by the TuSidebar component
 */
const emit = defineEmits<{
	/** 
	 * Emitted when open state changes (for v-model:open binding)
	 * @param value - New open state
	 */
	"update:open": [value: boolean];
	
	/** 
	 * Emitted when active item changes (for v-model binding)
	 * @param value - ID of the newly selected item
	 */
	"update:modelValue": [value: string | number | null];
	
	/** 
	 * Emitted when expanded state changes (for .sync binding)
	 * @param value - New expanded state
	 */
	"update:expanded": [value: boolean];
}>();

// tuComponent functionality
const getColor = inject<(color: string) => string>("getColor", () => "");
const isColor = inject<boolean>("isColor", false);

const reduceInternal = ref(props.reduce);

const sidebar = ref<HTMLDivElement>();

// Computed properties for CSS custom properties - content-based sizing
const sidebarWidth = computed(() => {
	// For reduced state, use minimal width for icons only
	if (reduceInternal.value) return "60px";
	// For expanded state, use fixed width or default
	return props.fixedExpandWidth ? `${props.fixedExpandWidth}px` : "150px";
});

const reducedWidth = computed(() => "60px");

const toggleReduce = () => {
	reduceInternal.value = !reduceInternal.value;
	emit("update:expanded", !reduceInternal.value);
};

// Watch for changes to reduce prop
watch(() => props.reduce, (newVal) => {
	reduceInternal.value = newVal;
});

const clickCloseSidebar = function (evt: Event) {
	const target = evt.target as Element;
	if (!target.closest(".tu-sidebar-content"))
		emit("update:open", false);
};

const handleClickItem = function (id: string) {
	emit("update:modelValue", id);
};

const getArrowDirection = computed(() => {
	if (props.right) return reduceInternal.value ? "chevron_left" : "chevron_right";
	return reduceInternal.value ? "chevron_right" : "chevron_left";
});

// Provide values for child components
provide("parentValue", computed(() => props.modelValue));
provide("handleClickItem", handleClickItem);
provide("reduced", computed(() => reduceInternal.value));
provide("toggleReduce", toggleReduce);
provide("sidebarTheme", computed(() => props.theme));
provide("sidebarTextWhite", computed(() => props.textWhite));

const listeners = computed(() => {
	return {
		mouseenter: function () {
			if (props.hoverExpand && reduceInternal.value) {
				reduceInternal.value = false;
				emit("update:expanded", true);
			}
		},
		mouseleave: function () {
			if (props.hoverExpand && !props.reduce) {
				reduceInternal.value = props.reduce;
				emit("update:expanded", false);
			}
		}
	};
});

watch(
	() => props.open,
	(val: boolean) => {
		if (val) {
			setTimeout(() => {
				window.addEventListener("click", clickCloseSidebar);
			}, 200);
		}
		else window.removeEventListener("click", clickCloseSidebar);
	}
);

watch(
	() => props.reduce,
	(val: boolean) => {
		reduceInternal.value = val;
		emit("update:expanded", !val);
	}
);

watch(reduceInternal, (newVal) => {
	emit("update:expanded", !newVal);
});

watch(
	() => props.expanded,
	(val: boolean) => {
		if (!props.hoverExpand)
			reduceInternal.value = !val;
	}
);

watch(
	() => props.background,
	() => {
		setColor("background", props.background, sidebar.value, true);
	}
);

watch(
	() => props.theme,
	(newTheme) => {
		// Apply dark theme using global utilities
		if (sidebar.value) {
			if (newTheme === "dark")
				setColor("color", "dark", sidebar.value, true);
			sidebar.value.setAttribute("data-theme", newTheme);
		}
	}
);

watch(
	() => props.color,
	(newColor) => {
		// Apply dark color theme using global utilities
		if (newColor === "dark" && sidebar.value)
			setColor("color", "dark", sidebar.value, true);
	}
);

onMounted(() => {
	// Initialize reduce state
	reduceInternal.value = props.reduce;
	emit("update:expanded", !props.reduce);

	// Apply background color if not default
	if (props.background !== "background")
		setColor("background", props.background, sidebar.value, true);

	// Apply dark theme using global utilities
	if (props.theme === "dark" || props.color === "dark")
		setColor("color", "dark", sidebar.value, true);

	// Apply text color for white theme
	if (props.textWhite)
		setColor("text", "#fff", sidebar.value, true);

	// Set theme attribute for CSS targeting
	if (sidebar.value)
		sidebar.value.setAttribute("data-theme", props.theme);

	// Only set max-width if fixedExpandWidth is provided and not in reduced state
	if (props.fixedExpandWidth && sidebar.value && !reduceInternal.value)
		sidebar.value.style.setProperty("--tu-sidebar-width", `${props.fixedExpandWidth}px`);
});

// Expose methods and properties for template refs and child components
defineExpose({
	toggleReduce,
	reduceInternal,
	sidebarWidth,
	reducedWidth
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";

// Variables
$duration: 0.35s;
$timing: cubic-bezier(0.4, 0, 0.2, 1);
$width-timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
$reduced-width: 60px;

// Mixins
@mixin flex-center($direction: row) {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: $direction;
}

@mixin transition($props: all, $duration: $duration, $timing: $timing, $delay: 0s) {
	transition: $props $duration $timing $delay;
}

@mixin size($width: auto, $height: auto) {
	width: $width;
	height: $height;
}

.tu-sidebar-content {
	--tu-color: var(--tu-primary);
	position: relative;
	@include size(auto, unset);
	min-width: var(--tu-sidebar-reduced-width, #{$reduced-width});
	max-width: var(--tu-sidebar-width, none);
	border-radius: 0 30px 0px 0;
	color: getColor("text");
	box-shadow: 0 0 25px rgba(0, 0, 0, var("shadow-opacity"));
	@include flex-center(column);
	align-items: stretch;
	justify-content: flex-start;
	background: getColor("gray-2");
	padding: var(--tu-sidebar-padding, 15px) 0px;
	overflow: hidden;
	transform: translateX(-100%);
	transition: min-width 0.4s $width-timing,
				max-width 0.4s $width-timing,
				width 0.4s $width-timing,
				background $duration $timing,
				border-radius $duration $timing,
				box-shadow $duration $timing,
				padding $duration $timing,
				transform 0.3s $timing;

	// Base styles for all elements
	%flex-base {
		@include flex-center(column);
		@include size(100%);
	}

	&.absolute { 
		position: absolute !important; 
		left: 0;
		top: 0;
		bottom: 0;
	}

	// Modifier classes
	&.right {
		right: 0;
		left: auto;
		transform: translateX(100%);
		border-radius: 30px 0 0 0px;
		
		&.open { transform: translateX(0); }
	}

	&.relative { 
		position: relative !important; 
		transform: translateX(0) !important; // Relative sidebars are always visible
	}
	&.notShadow { box-shadow: none !important; }
	&.square { border-radius: 0; }
	&.open { transform: translateX(0); }
	
	&.notLineActive .tu-sidebar__item:after { display: none; }

	&.textWhite {
		.tu-sidebar__group__content:after { background: rgba(255, 255, 255, 0.4); }
		.tu-sidebar__item {
			color: #ffffffaa !important;
			&:after { background: #fff !important; }
			&.active { color: #fff !important; }
		}
	}

	// Dark Theme Integration
	&.tu-component-dark {
		background: getColor("dark");
		color: rgba(255, 255, 255, 0.87);
		box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);

		.tu-sidebar__header {
			color: rgba(255, 255, 255, 0.87);
		}

		.tu-sidebar__toggle {
			background: rgba(255, 255, 255, 0.1);
			color: rgba(255, 255, 255, 0.87);

			&:hover {
				background: rgba(255, 255, 255, 0.2);
			}

			&::before {
				background: rgba(255, 255, 255, 0.1);
			}
		}

		.tu-sidebar {
			&::-webkit-scrollbar-thumb {
				background: rgba(255, 255, 255, 0.3);
				&:hover { 
					background: rgba(255, 255, 255, 0.5); 
				}
			}
		}

		// Dark theme for sidebar items (if not using separate component)
		.tu-sidebar__item {
			color: rgba(255, 255, 255, 0.7);

			&:hover {
				color: rgba(255, 255, 255, 0.9);
				background: rgba(255, 255, 255, 0.05);
			}

			&.active {
				color: getColor("primary");
				background: rgba(255, 255, 255, 0.1);
			}

			&:after {
				background: getColor("primary");
			}
		}
	}

	// Common elements
	.tu-sidebar__header { @extend %flex-base; padding: 8px 8px 8px; }
	.tu-sidebar__logo { @extend %flex-base; min-height: 30px; }

	// Layout sections
	.tu-sidebar__top { @extend %flex-base; flex-shrink: 0; }
	.tu-sidebar__bottom { @extend %flex-base; flex-shrink: 0; }
	
	.tu-sidebar__content {
		
		margin-top: 30px;
		display: flex;
		align-items: self-start;		
		flex: 1;
		overflow: auto;
		min-height: 0;
		transform-origin: top;
		will-change: transform, opacity;

		/* Ultra-thin scrollbar for Firefox */
		scrollbar-width: thin; /* Completely hidden */
		/* Alternative: scrollbar-width: auto; with custom colors for minimal visibility */
		scrollbar-color: rgba(0, 0, 0, 0.1) transparent;

		/* Webkit browsers - ultra-thin 1px scrollbar */
		&::-webkit-scrollbar {
			width: 1px;
		}
		
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		
		&::-webkit-scrollbar-thumb {
			background: rgba(0, 0, 0, 0.15);
			border-radius: 0; /* Sharp edges for minimal look */
			
			&:hover {
				background: rgba(0, 0, 0, 0.25);
				width: 2px; /* Slightly wider on hover for usability */
			}
		}
		
		&::-webkit-scrollbar-corner {
			background: transparent;
		}

		/* Show scrollbar only on hover for ultra-minimal approach */
		&::-webkit-scrollbar {
			opacity: 0;
			transition: opacity 0.3s ease;
		}
		
		&:hover::-webkit-scrollbar {
			opacity: 1;
		}
	}

	/* Dark theme scrollbar override */
	&.tu-component-dark .tu-sidebar__content {
		scrollbar-color: rgba(255, 255, 255, 0.1) transparent; /* Even more subtle for dark theme */
		
		&::-webkit-scrollbar-thumb {
			background: rgba(255, 255, 255, 0.2);
			
			&:hover {
				background: rgba(255, 255, 255, 0.35);
			}
		}
	}

	// Scrollable area
	.tu-sidebar {
		@extend %flex-base;
		flex: 1;
		min-width: inherit;
		overflow-y: auto;
		overflow-x: hidden;
		

		&__footer {
			@extend %flex-base;
			flex-shrink: 0;
			padding: 10px 15px;
			margin-top: auto;
		}

		&__top {
			margin-top: 10px;
		}
	}

	// Expanded state
	&:not(.reduce) {
		width: var(--tu-sidebar-width, 150px);
		min-width: var(--tu-sidebar-width, 150px);
		max-width: var(--tu-sidebar-width, 150px);
		
		.tu-sidebar { 
			min-width: inherit; 
		}
		.tu-sidebar__header { 
			opacity: 1; 
			transform: translateY(0) scale(1); 
			pointer-events: auto;
			transition: opacity $duration $timing 0.2s,
						transform $duration $timing 0.2s,
						padding $duration $timing;
		}
		.tu-sidebar__logo img { 
			transform: scale(1);
			transition: all $duration $timing;
		}
	}

	// Reduced state
	&.reduce {
		min-width: #{$reduced-width};
		max-width: #{$reduced-width};
		width: #{$reduced-width};

		.tu-sidebar {
			&::-webkit-scrollbar { width: 2px; }
			&::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.3); }
			&__footer { padding: 10px 5px; }
		}

		.tu-sidebar__header {
			opacity: 0;
			transform: translateY(-10px) scale(0.9);
			font-size: 0.9rem;
			padding: 10px 5px;
			pointer-events: none;
			transition: opacity 0.2s $timing 0.1s,
						transform $duration $timing 0.1s,
						padding $duration $timing;
			
			.tu-avatar-content { @include size(44px, 44px); }
		}

		.tu-sidebar__logo img { 
			width: 80%;
			transition: all $duration $timing;
		}
		.tu-sidebar__toggle { 
			padding: 3px;
			transition: all $duration $timing;
		}
	}

	// Toggle button
	.tu-sidebar__toggle {
		@include flex-center();
		cursor: pointer;
		padding: 6px;
		border-radius: 6px;
		
		position: relative;
		overflow: hidden;
		@include transition(all, 0.3s);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.1);
			border-radius: 6px;
			transform: scale(0);
			@include transition(transform, 0.3s);
		}

		&:hover {
			transform: scale(1.05);
			&::before { transform: scale(1); }
		}

		&:active {
			transform: scale(0.95);
			transition-duration: 0.1s;
		}
	}

	// Logo styling
	.tu-sidebar__logo img {
		max-width: 100px;
		max-height: 28px;
		@include size(auto, auto);
	}
}

.tu-sidebar__sticky_head { position: sticky; top: 0; }
.tu-sidebar__sticky_tail { position: sticky; bottom: 0; }

@keyframes delayOpacity {
	from { opacity: 0; transform: scale(0.8); }
	to { opacity: 1; transform: scale(1); }
}
</style>

