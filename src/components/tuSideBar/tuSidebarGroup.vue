<template>
<div class="tu-sidebar__group" :class="{ open: openState }" ref="sidebarGroup">
		<div class="tu-sidebar__group__header" @click="openState = !openState">
			<slot name="header" />
		</div>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div class="tu-sidebar__group__content" ref="content" name="show" v-if="openState">
				<slot />
			</div>
		</transition>
	</div>
</template>
<script lang="ts" setup>
import { inject, nextTick, onMounted, provide, ref, watch } from "vue";

defineOptions({
	name: "TuSidebarGroup"
});

interface Props {
	open?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	open: false
});

const group = ref(true);
const openState = ref(false);
const sidebarGroup = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const parentHandleClickItem = inject<((id: string) => void) | undefined>("handleClickItem");

const handleClickItem = function (id: string) {
	parentHandleClickItem?.(id);
};

// Provide for child components
provide("handleClickItem", handleClickItem);

const beforeEnter = function (el: Element) {
	(el as HTMLElement).style.height = "0";
};

const enter = function (el: Element, done: () => void) {
	const h = (el as HTMLElement).scrollHeight;
	(el as HTMLElement).style.height = h - 1 + "px";
	done();
};

const leave = function (el: Element) {
	(el as HTMLElement).style.minHeight = "0px";
	(el as HTMLElement).style.height = "0px";
};

onMounted(() => {
	if (sidebarGroup.value?.querySelector(".active") || props.open)
		openState.value = true;
});

watch(
	() => props.open,
	(val: boolean) => {
		nextTick(() => {
			if (group.value) {
				if (val) {
					// parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight + h -1}px`;
				}
				else {
					// parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight -h +1}px`;
				}
			}
		});
	}
);
</script>

<style lang="scss">
@import "../../style/sass/_functions";

.tu-sidebar__group {
	padding: 0px;
	position: relative;
	outline: none;
	border: none;
	
	// Group containers should never have pseudo-elements or active states
	&:after,
	&:before {
		display: none !important;
	}
	
	// Ensure no unwanted selection styling
	&:focus,
	&:focus-visible,
	&:active,
	&.active {
		outline: none !important;
		border: none !important;
		background: transparent !important;
		
		&:after,
		&:before {
			display: none !important;
		}
	}
	
	// Prevent any inherited active states
	&.tu-sidebar__item {
		&:after,
		&:before {
			display: none !important;
		}
		
		&.active {
			background: transparent !important;
			color: inherit !important;
		}
	}

	&.open {
		.tu-sidebar__group__content {
			&:after {
				opacity: 1; // Show the faded blue line when expanded
			}
		}

		>.tu-sidebar__group__header {
			border: 1px solid getColor("color") !important; // Primary border when expanded
			background: getColorAlpha("color", 0.1) !important; // Very subtle background when expanded
			
			::v-deep(.tu-sidebar__item) {
				opacity: 1;
				color: getColor("color") !important; // Primary color text instead of white
				
				&:hover {
					color: getColor("color") !important; // Keep primary color text on hover
					opacity: 1;
				}
				
				&:focus,
				&:focus-visible,
				&.active {
					color: getColor("color") !important; // Keep primary color text in all states
				}
			}
		}
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: center;
		outline: none;
		border: 1px solid getColorAlpha("color", 0.2) !important; // Subtle border when collapsed
		background: transparent !important;
		border-radius: 8px;
		margin: 4px 8px;
		transition: all 0.25s ease;
		cursor: pointer;
		
		&:focus,
		&:focus-visible {
			outline: none;
			border: 1px solid getColorAlpha("color", 0.3) !important;
		}
		
		&:hover {
			border: 1px solid getColorAlpha("color", 0.4) !important;
			background: getColorAlpha("color", 0.05) !important;
		}
	}

	&__content {
		overflow: hidden;
		transition: all 0.25s ease;
		position: relative;

		// Faded blue line across all sub-options
		
		::v-deep(.tu-sidebar__item) {
			background: getColor("background");
			
			// Just make text slightly smaller and less prominent for sub-items
			font-size: 0.9rem;
			opacity: 0.7; // Default opacity for non-active items
			
			// Ensure consistent positioning starting from left edge
			position: relative !important;
			left: 0 !important;
			
			// Base styling for the active indicator line
			&:after {
				content: "" !important;
				position: absolute !important;
				left: 0 !important;
				top: 0 !important;
				width: 10px !important;
				height: 100% !important;
				border-radius: 0 20px 20px 0 !important;
				transform: translateX(-10px) !important;
				transition: all 0.25s ease !important;
				z-index: 60 !important;
				// Dull/muted blue for non-active items
				background: getColorAlpha("color", 0.3) !important;
			}
			
			// Hover state for non-active items
			&:hover:not(.active) {
				opacity: 0.85;
				&:after {
					background: getColorAlpha("color", 0.5) !important;
					transform: translateX(-5px) !important; // Slightly show the line on hover
				}
			}
			
			// Active state - bright blue accent
			&.active {
				opacity: 1;
				color: getColor("color") !important;
				
				&:after {
					background: getColor("color") !important; // Bright blue for active item
					transform: translateX(0) !important; // Fully visible
				}
			}
		}
	}

	>.tu-sidebar__group__header {
		::v-deep(.tu-sidebar__item) {
			// Group headers should never have active states or pseudo-elements
			&:after,
			&:before {
				display: none !important; // Completely remove any pseudo-elements
			}
			
			// Remove arrow from group headers
			.tu-sidebar__item__arrow {
				display: none !important;
			}
			
			// Override any inherited active styling
			color: getColor("text") !important;
			opacity: 0.9;
			background: transparent !important;
			transition: all 0.25s ease;
			
			&:hover {
				opacity: 1;
				color: getColor("text") !important;
				background: transparent !important;
				
				&:not(.hasIcon) {
					padding-left: 20px;
				}
				
				&.hasIcon {
					padding-left: 5px;
				}
				
				// Ensure no pseudo-elements on hover
				&:after,
				&:before {
					display: none !important;
				}
			}
			
			// Group headers should NEVER have active state styling
			&.active {
				color: getColor("text") !important;
				background: transparent !important;
				opacity: 0.9;
				
				&:after,
				&:before {
					display: none !important;
				}
			}
			
			// Prevent any focus states that might add styling
			&:focus,
			&:focus-visible {
				outline: none !important;
				color: getColor("text") !important;
				background: transparent !important;
				
				&:after,
				&:before {
					display: none !important;
				}
			}
		}
	}
}
</style>

