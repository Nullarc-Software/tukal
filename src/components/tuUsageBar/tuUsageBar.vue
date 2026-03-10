<template>
	<div class="tu-usagebar">
		<!-- Usage Bar -->
		<div 
			ref="usagebarParent"
			class="tu-usagebar__bar"
			:class="{ 'tu-usagebar__bar--animating': !hasAnimated }"
			:style="{ height: height }"
		>
			<!-- Bar Segment -->
			<tu-popper 
				v-for="(item, index) in displayItems" 
				:key="index" 
				arrow 
				hover 
				placement="top"
				:style="{ width: `${item.width}px`, flex: `0 0 ${item.width}px` }"
				fit-popper-container
			>
				<div 
					class="tu-usagebar__segment"
					:class="getSegmentClass(index)"
					:style="getSegmentStyle(item, index)"
				/>
				
				<!-- Tooltip Content -->
				<template #content>
					<div class="tu-usagebar__tooltip">
						<!-- Single Item -->
						<div v-if="item.name !== 'Others'" class="tu-usagebar__tooltip-row">
							<span class="tu-usagebar__tooltip-label">{{ item.name }}:</span>
							<span class="tu-usagebar__tooltip-value">{{ formatPercentage(item.percentage) }}%</span>
						</div>
						
						<!-- Others Group -->
						<div v-else>
							<strong v-if="othersGroup.length > 1" class="tu-usagebar__tooltip-total">
								Total: {{ formatPercentage(item.percentage) }}%
							</strong>
							<div 
								v-for="(otherItem, itemIndex) in othersGroup" 
								:key="itemIndex"
								class="tu-usagebar__tooltip-row"
							>
								<span class="tu-usagebar__tooltip-label">{{ otherItem.name }}:</span>
								<span class="tu-usagebar__tooltip-value">{{ formatPercentage(otherItem.percentage) }}%</span>
							</div>
						</div>
					</div>
				</template>
			</tu-popper>
		</div>

		<!-- Legend -->
		<div 
			class="tu-usagebar__legend"
			:style="{ fontSize: fontSize }"
		>
			<div 
				v-for="(item, index) in displayItems" 
				:key="index" 
				class="tu-usagebar__legend-item"
			>
				<span 
					class="tu-usagebar__legend-dot"
					:style="getLegendDotStyle(item.color || '', index)"
				></span>
				<span class="tu-usagebar__legend-text">{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
//====================================
// Imports
//====================================
import { ref, watch, onMounted } from "vue";
import { TuPopper } from "../tuPopper";
import { getColorAsRgb } from "../../utils";
import type { UsageBarItem } from "./types";

//====================================
// Component Options
//====================================
defineOptions({
	name: "TuUsageBar"
});

//====================================
// Types
//====================================

interface UsageBarItemPercentage {
	name: string;
	percentage: number;
	width?: number; // Width in pixels
	color?: string;
}

//====================================
// Props
//====================================

/**
 * @description Usage bar component that displays data distribution with percentages
 * @example 
 * <tu-usage-bar 
 *   :items="usageData" 
 *   :bar-colors="['primary', 'success', 'warning']"
 *   height="8px"
 * />
 */
interface Props {
	/**
	 * Array of colors for bar segments
	 * Can use color names or hex values
	 * @default []
	 */
	barColors?: string[];
	
	/**
	 * Array of usage items to display
	 * Each item should have name, time, and optional color properties
	 * @default []
	 */
	items?: UsageBarItem[];
	
	/**
	 * Height of the usage bar
	 * @default '5px'
	 */
	height?: string;
	
	/**
	 * Font size for legend text
	 * @default '14px'
	 */
	fontSize?: string;
}

const props = withDefaults(defineProps<Props>(), {
	barColors: () => [
		"#5e64ff", "#28a745", "#feef72", "#98d85b",
		"#ffa00a", "#ff5858", "#7cd6fd", "#743ee2",
		"#0000ff", "#003366", "#800000", "#800080",
		"#00ff00", "#20b2aa", "#f08080", "#ffc3a0",
		"#ff6666", "#008000", "#660066", "#8b0000", "#794044"
	],
	items: () => [],
	height: "20px",
	fontSize: "12px"
});

//====================================
// Template Refs
//====================================

const usagebarParent = ref<HTMLDivElement>();

//====================================
// State
//====================================

const colors = ref(props.barColors);
const displayItems = ref<UsageBarItemPercentage[]>([]);
const othersGroup = ref<UsageBarItemPercentage[]>([]);
const hasAnimated = ref(false);
const containerWidth = ref(0);

//====================================
// Computed Properties
//====================================

/**
 * Computes the percentage for each item and groups small items into "Others"
 */
const computeNewItems = (): UsageBarItemPercentage[] => {
	let othersCount = 0;
	const processedItems: UsageBarItemPercentage[] = [];
	
	if (!props.items || props.items.length === 0)
		return [];

	// Calculate total time
	const total = props.items.reduce((sum, item) => sum + item.time, 0);
	
	// Group small items (< 5%) into "Others"
	const smallItems: UsageBarItemPercentage[] = [];

	props.items.forEach((item) => {
		const percentage = (item.time / total) * 100;
		
		if (percentage <= 5 && percentage >= 0) {
			othersCount++;
			smallItems.push({
				name: item.name,
				color: item.color,
				percentage
			});
		}
		else {
			processedItems.push({
				name: item.name,
				color: item.color,
				percentage
			});
		}
	});

	// Sort by percentage (descending)
	processedItems.sort((a, b) => b.percentage - a.percentage);

	// Handle "Others" group
	if (othersCount > 1) {
		const othersPercentage = smallItems.reduce((sum, item) => sum + item.percentage, 0);
		processedItems.push({
			name: "Others",
			percentage: othersPercentage
		});
		othersGroup.value = smallItems;
	}
	else if (othersCount === 1) {
		processedItems.push({
			name: smallItems[0].name,
			color: smallItems[0].color,
			percentage: smallItems[0].percentage
		});
	}

	return processedItems;
};

//====================================
// Methods
//====================================

/**
 * Updates the pixel widths of items based on container width
 */
const updateItemWidths = () => {
	const items = computeNewItems();
	
	if (!usagebarParent.value) {
		displayItems.value = items;
		return;
	}
	
	const width = usagebarParent.value.clientWidth;
	containerWidth.value = width;
	
	// Calculate pixel widths based on percentages
	displayItems.value = items.map(item => ({
		...item,
		width: Math.round((item.percentage / 100) * width)
	}));
};

//====================================
// Watchers
//====================================

watch(() => props.items, () => {
	updateItemWidths();
}, { deep: true, immediate: true });

// Watch for container resize
watch(containerWidth, () => {
	updateItemWidths();
});

/**
 * Returns the style object for a bar segment
 */
const getSegmentStyle = (item: UsageBarItemPercentage, index: number): Record<string, string> => {
	let background: string;
	
	if (item.color)
		background = `rgba(${getColorAsRgb(item.color)})`;
	else {
		item.color = colors.value[index % colors.value.length];
		background = colors.value[index % colors.value.length];
	}

	const baseStyle: Record<string, string> = {
		background,
		width: "100%",
		height: props.height || "20px"
	};

	// Add border radius for first and last segments
	if (index === 0) {
		baseStyle["border-top-left-radius"] = "5px";
		baseStyle["border-bottom-left-radius"] = "5px";
	}
	
	if (index === displayItems.value.length - 1) {
		baseStyle["border-top-right-radius"] = "5px";
		baseStyle["border-bottom-right-radius"] = "5px";
	}

	return baseStyle;
};

/**
 * Returns CSS class for a segment based on its position
 */
const getSegmentClass = (index: number): string => {
	const classes = [];
	
	if (index === 0)
		classes.push("tu-usagebar__segment--first");
	
	if (index === displayItems.value.length - 1)
		classes.push("tu-usagebar__segment--last");
	
	return classes.join(" ");
};

/**
 * Returns the style object for a legend dot
 */
const getLegendDotStyle = (color: string, index: number): Record<string, string> => {
	let background: string;
	
	if (color)
		background = `rgba(${getColorAsRgb(color)})`;
	else
		background = colors.value[index % colors.value.length];
	
	return {
		background,
		width: props.fontSize || "12px",
		height: props.fontSize || "12px",
		"border-radius": props.fontSize || "12px"
	};
};

/**
 * Formats percentage to 2 decimal places
 */
const formatPercentage = (value: number): string => {
	return value.toFixed(2);
};

//====================================
// Lifecycle Hooks
//====================================

/**
 * Initialize items on component mount
 */
onMounted(() => {
	// Wait for DOM to be ready
	setTimeout(() => {
		updateItemWidths();
		
		// Setup resize observer
		if (usagebarParent.value) {
			const resizeObserver = new ResizeObserver(() => {
				if (usagebarParent.value)
					containerWidth.value = usagebarParent.value.clientWidth;
			});
			resizeObserver.observe(usagebarParent.value);
		}
	}, 0);
	
	// Mark as animated after the initial animation completes
	setTimeout(() => {
		hasAnimated.value = true;
	}, 850); // 0.8s animation + 50ms buffer
});
</script>

<style scoped lang="scss">
//====================================
// Usage Bar Component Styles (BEM)
//====================================

// Main container
.tu-usagebar {
	display: flex;
	flex-direction: column;

	//====================================
	// Usage Bar
	//====================================
	
	&__bar {
		display: flex;
		margin: 0;
		position: relative;
		width: 100%;
		transform-origin: left center;

		// Initial animation only
		&--animating {
			animation: tu-usagebar-scale-animation 0.8s ease-out forwards;
		}

		// Style for tu-popper wrapper - animate on data changes
		> * {
			transition: width 0.6s ease-out, flex-basis 0.6s ease-out;
			flex-shrink: 0;
		}
	}

	//====================================
	// Bar Segment
	//====================================
	
	&__segment {
		cursor: pointer;
		height: inherit;
		display: block;
		text-align: end;
		padding-right: 5px;
		width: 100%;

		// First segment styling
		&--first {
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
		}

		// Last segment styling
		&--last {
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}

	//====================================
	// Tooltip
	//====================================
	
	&__tooltip {
		margin: 10px;

		// Tooltip row (label + value)
		&-row {
			display: flex;
			margin: 3px 0;
			justify-content: space-between;
			gap: 15px;
		}

		// Tooltip label
		&-label {
			font-weight: 500;
			white-space: nowrap;
		}

		// Tooltip value
		&-value {
			padding-left: 5px;
			font-weight: 600;
		}

		// Total text for "Others" group
		&-total {
			display: block;
			margin-bottom: 5px;
			font-size: 0.95em;
		}
	}

	//====================================
	// Legend
	//====================================
	
	&__legend {
		display: flex;
		flex-wrap: wrap;
		margin-top: 5px;

		// Legend item (dot + text)
		&-item {
			display: inline-flex;
			align-items: center;
			margin-left: 10px;
			margin-top: 5px;

			&:first-child {
				margin-left: 0;
			}
		}

		// Legend color dot
		&-dot {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			display: inline-flex;
			flex-shrink: 0;
		}

		// Legend text
		&-text {
			padding-left: 5px;
			white-space: nowrap;
		}
	}
}

//====================================
// Animations
//====================================

@keyframes tu-usagebar-scale-animation {
	0% {
		transform: scaleX(0);
	}

	100% {
		transform: scaleX(1);
	}
}
</style>