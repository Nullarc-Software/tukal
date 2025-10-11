<!--
/**
 * @fileoverview TuCalendarHeatMap - A Vue 3 calendar heatmap component
 * @component TuCalendarHeatMap
 * @author Tukal UI Library
 * @since 1.0.0
 * 
 * @description
 * A comprehensive calendar heatmap component that visualizes data over time periods.
 * Similar to GitHub's contribution chart, it displays data density using color intensity
 * across calendar days, supporting various orientations, themes, and customizations.
 * 
 * @example
 * <TuCalendarHeatMap 
 *   :values="activityData"
 *   :endDate="new Date()"
 *   :rangeColor="['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']"
 *   :max="20"
 *   @dayClick="handleDayClick"
 *   vertical
 * />
 * 
 * @features
 * - Interactive calendar heatmap visualization
 * - Customizable color ranges and themes
 * - Vertical and horizontal orientations
 * - Tooltip support with custom formatters
 * - Responsive design with accessibility support
 * - Dark theme compatibility
 * - Internationalization support
 */
-->
<template>
	<div class="tu-calendar-hmap" v-bind="$attrs">
		<svg class="tu-calendar-hmap__wrapper" ref="svg" :viewBox="viewbox">
			<g class="tu-calendar-hmap__months-labels" :transform="monthsLabelWrapperTransform">
				<text 
					class="tu-calendar-hmap__month-label" 
					v-for="(month, index) in heatmap.firstFullWeekOfMonths" 
					:key="index"
					:x="getMonthLabelPosition(month).x" 
					:y="getMonthLabelPosition(month).y"
				>
					{{ lo.months[month['value']] }}
				</text>
			</g>

			<g class="tu-calendar-hmap__days-labels" :transform="daysLabelWrapperTransform">
				<text 
					class="tu-calendar-hmap__day-label" 
					:x="vertical ? SQUARE_SIZE : 0"
					:y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 20"
				>
					{{ lo.days[1] }}
				</text>
				<text 
					class="tu-calendar-hmap__day-label" 
					:x="vertical ? SQUARE_SIZE * 3 : 0"
					:y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 44"
				>
					{{ lo.days[3] }}
				</text>
				<text 
					class="tu-calendar-hmap__day-label" 
					:x="vertical ? SQUARE_SIZE * 5 : 0"
					:y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 69"
				>
					{{ lo.days[5] }}
				</text>
			</g>

			<g v-if="vertical" class="tu-calendar-hmap__legend-wrapper" :transform="legendWrapperTransform">
				<text :x="SQUARE_SIZE * 1.25" y="8">{{ lo.less }}</text>
				<rect 
					v-for="(color, index) in curRangeColor" 
					:key="index" 
					:rx="round" 
					:ry="round"
					:class="`tu-calendar-hmap__legend-rect tu-calendar-hmap__color-${index}`" 
					:width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
					:height="SQUARE_SIZE - SQUARE_BORDER_SIZE" 
					:x="SQUARE_SIZE * 1.75" 
					:y="SQUARE_SIZE * (index + 1)" 
				/>
				<text 
					:x="SQUARE_SIZE * 1.25" 
					:y="SQUARE_SIZE * (curRangeColor.length + 2) - SQUARE_BORDER_SIZE"
				>
					{{ lo.more }}
				</text>
			</g>

			<g class="tu-calendar-hmap__year" :transform="yearWrapperTransform">
				<g 
					class="tu-calendar-hmap__month" 
					v-for="(week, weekIndex) in heatmap.calendar" 
					:key="weekIndex"
					:transform="getWeekPosition(weekIndex)"
				>
					<template v-for="(day, dayIndex) in week" :key="dayIndex">
						<rect 
							class="tu-calendar-hmap__day-square" 
							v-if="day.date < now && !day.isEmpty" 
							:rx="round" 
							:ry="round"
							:transform="getDayPosition(dayIndex)" 
							:style="{ fill: rangeColor[day.colorIndex] }"
							:class="`tu-calendar-hmap__color-${day.colorIndex}`" 
							:width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
							:height="SQUARE_SIZE - SQUARE_BORDER_SIZE" 
							:data-tippy-content="tooltipOptions(day)"
							@click.prevent.stop="emit('dayClick', day)" 
							focusable="false"
						/>
					</template>
				</g>
			</g>
		</svg>
		
		<div class="tu-calendar-hmap__legend">
			<slot name="legend">
				<div class="tu-calendar-hmap__legend-left">
					<slot name="tu-calendar-hmap__legend-left"></slot>
				</div>
				<div class="tu-calendar-hmap__legend-right">
					<slot name="legend-right">
						<div class="tu-calendar-hmap__legend-content">
							<!-- Year Navigation -->
							<div v-if="showYearNavigation" class="tu-calendar-hmap__year-navigation">
								<button 
									class="tu-calendar-hmap__year-btn"
									:class="{ 'tu-calendar-hmap__year-btn--disabled': !canGoPrevious }"
									:disabled="!canGoPrevious"
									@click="previousYear"
									aria-label="Previous year"
								>
									<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
										<path d="M8 2L4 6l4 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</button>
								<span class="tu-calendar-hmap__year-label">{{ currentYear }}</span>
								<button 
									class="tu-calendar-hmap__year-btn"
									:class="{ 'tu-calendar-hmap__year-btn--disabled': !canGoNext }"
									:disabled="!canGoNext"
									@click="nextYear"
									aria-label="Next year"
								>
									<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
										<path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</button>
							</div>
							<div class="tu-calendar-hmap__legend-text">{{ lo.less }}</div>
							<svg 
								v-if="!vertical" 
								class="tu-calendar-hmap__external-legend" 
								:viewBox="legendViewbox"
								:height="SQUARE_SIZE - SQUARE_BORDER_SIZE"
							>
								<g class="tu-calendar-hmap__legend-wrapper">
									<rect 
										v-for="(color, index) in curRangeColor" 
										:key="index" 
										:rx="round" 
										:ry="round"
										:style="{ fill: color }" 
										:width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
										:height="SQUARE_SIZE - SQUARE_BORDER_SIZE" 
										:x="SQUARE_SIZE * index" 
									/>
								</g>
							</svg>
							<div class="tu-calendar-hmap__legend-text">{{ lo.more }}</div>
						</div>
					</slot>
				</div>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch, computed } from "vue";
import { Heatmap, TuHeatmapCalendarItem, TuHeatmapLocale, TuHeatmapMonth, TuHeatmapTooltipFormatter, TuHeatmapValue } from "./Heatmap";
import tippy, { createSingleton, CreateSingletonInstance, Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";

defineOptions({
	name: "TuCalendarHeatMap",
	inheritAttrs: false
});

/**
 * Props interface for TuCalendarHeatMap component
 */
interface Props {
	/**
	 * Year to display (optional)
	 * If not provided, will use the most recent year from the data
	 * @default undefined (auto-detected from data)
	 */
	year?: number;
	
	/**
	 * Maximum value for color intensity calculation
	 * If not provided, will be calculated from the data
	 * @default undefined (auto-calculated)
	 */
	max?: number;
	
	/**
	 * Array of color values for the heatmap intensity scale
	 * @default Light theme colors
	 */
	rangeColor?: string[];
	
	/**
	 * Array of data values to display on the heatmap
	 * @required
	 */
	values: TuHeatmapValue[];
	
	/**
	 * Localization settings for months, days, and text
	 * @default English locale
	 */
	locale?: Partial<TuHeatmapLocale>;
	
	/**
	 * Enable/disable tooltip functionality
	 * @default true
	 */
	tooltip?: boolean;
	
	/**
	 * Unit text displayed in tooltips
	 * @default "contributions"
	 */
	tooltipUnit?: string;
	
	/**
	 * Custom tooltip formatter function
	 * @default undefined
	 */
	tooltipFormatter?: TuHeatmapTooltipFormatter;
	
	/**
	 * Display heatmap in vertical orientation
	 * @default false
	 */
	vertical?: boolean;
	
	/**
	 * Text to display when no data is available
	 * @default null
	 */
	noDataText?: boolean | string | null;
	
	/**
	 * Border radius for heatmap squares
	 * @default 0
	 */
	round?: number;
	
	/**
	 * Enable dark theme styling
	 * @default false
	 */
	dark?: boolean;
	
	/**
	 * Primary color theme (reserved for future use)
	 * @default undefined
	 */
	color?: string;
}

/**
 * Default properties with proper typing
 */
const props = withDefaults(defineProps<Props>(), {
	rangeColor: () => [
		"var(--tu-gray-2)", 
		"#195bff1a", 
		"#195bff4d", 
		"#195bff99", 
		"#195bffcc", 
		"#195bff"
	],
	tooltip: true,
	tooltipUnit: () => Heatmap.DEFAULT_TOOLTIP_UNIT,
	vertical: false,
	noDataText: null,
	round: 0,
	dark: false
});

/**
 * Component events
 */
const emit = defineEmits<{
	/**
	 * Emitted when a day cell is clicked
	 */
	dayClick: [day: TuHeatmapCalendarItem];
}>();

// Constants and reactive variables
const SQUARE_BORDER_SIZE: number = Heatmap.SQUARE_SIZE / 5;
const SQUARE_SIZE: number = Heatmap.SQUARE_SIZE + SQUARE_BORDER_SIZE;
const LEFT_SECTION_WIDTH: number = Math.ceil(Heatmap.SQUARE_SIZE * 2.5);
const RIGHT_SECTION_WIDTH: number = SQUARE_SIZE * 3;
const TOP_SECTION_HEIGHT: number = Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2);
const BOTTOM_SECTION_HEIGHT: number = Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2);
const yearWrapperTransform = `translate(${LEFT_SECTION_WIDTH}, ${TOP_SECTION_HEIGHT})`;

// Reactive state
const svg = ref<SVGElement | null>(null);
const now = ref<Date>(new Date());

// Year navigation state
const currentYear = ref<number>(props.year || new Date().getFullYear());
const availableYears = ref<number[]>([]);
const showYearNavigation = ref<boolean>(false);

// Calculate initial end date (Dec 31 of current year)
const getYearEndDate = (year: number): Date => new Date(year, 11, 31);

const heatmap = ref<Heatmap>(new Heatmap(getYearEndDate(currentYear.value), props.values, props.max));

const width = ref<number>(0);
const height = ref<number>(0);
const viewbox = ref<string>("0 0 0 0");
const legendViewbox = ref<string>("0 0 0 0");
const daysLabelWrapperTransform = ref<string>("");
const monthsLabelWrapperTransform = ref<string>("");
const legendWrapperTransform = ref<string>("");
const lo = ref<TuHeatmapLocale>({} as TuHeatmapLocale);
const rangeColor = ref<string[]>(
	props.rangeColor || (props.dark ? Heatmap.DEFAULT_RANGE_COLOR_DARK : Heatmap.DEFAULT_RANGE_COLOR_LIGHT)
);

// Get destructured props for watchers
const { values, tooltipUnit, tooltipFormatter, noDataText, max, vertical } = toRefs(props);

/**
 * Computed property for current range color
 */
const curRangeColor = computed<string[]>(() => rangeColor.value);

// Tippy.js instances for tooltips
let tippyInstances: Instance[];
let tippySingleton: CreateSingletonInstance;

/**
 * Initialize Tippy.js tooltips for heatmap squares
 */
function initTippy(): void {
	if (!svg.value) 
		return;
	
	const elements = Array.from(svg.value.querySelectorAll(".tu-calendar-hmap__day-square[data-tippy-content]"));
	tippyInstances = tippy(elements);
	
	if (tippySingleton) 
		tippySingleton.setInstances(tippyInstances);
	else {
		tippySingleton = createSingleton(tippyInstances, {
			moveTransition: "transform 0.1s ease-out",
			allowHTML: true
		});
	}
}

/**
 * Generate tooltip content for a day cell
 * @param day - The day data object
 * @returns Tooltip HTML string or undefined
 */
function tooltipOptions(day: TuHeatmapCalendarItem): string | undefined {
	if (typeof day.date === "string") 
		day.date = new Date(`${day.date}`);
	
	
	if (!props.tooltip) 
		return undefined;
	
	
	const dateString = `${lo.value.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
	
	if (day.count !== undefined) {
		if (props.tooltipFormatter) 
			return props.tooltipFormatter(day, props.tooltipUnit);
		
		return `${day.count} ${props.tooltipUnit} ${lo.value.on} ${dateString}`;
	}
	
	if (props.noDataText) 
		return `${props.noDataText} ${lo.value.on} ${dateString}`;
	
	
	if (props.noDataText !== false) 
		return `No ${props.tooltipUnit} ${lo.value.on} ${dateString}`;
	
	
	return undefined;
}

/**
 * Calculate week position transform for SVG
 * @param index - Week index
 * @returns Transform string
 */
function getWeekPosition(index: number): string {
	if (props.vertical) 
		return `translate(0, ${(SQUARE_SIZE * heatmap.value.weekCount) - ((index + 1) * SQUARE_SIZE)})`;
	
	return `translate(${index * SQUARE_SIZE}, 0)`;
}

/**
 * Calculate day position transform for SVG
 * @param index - Day index
 * @returns Transform string
 */
function getDayPosition(index: number): string {
	if (props.vertical) 
		return `translate(${index * SQUARE_SIZE}, 0)`;
	
	return `translate(0, ${index * SQUARE_SIZE})`;
}

/**
 * Calculate month label position for SVG (centered over the month's weeks)
 * @param month - Month data object
 * @returns Position object with x and y coordinates
 */
function getMonthLabelPosition(month: TuHeatmapMonth): { x: number; y: number } {
	if (props.vertical) 
		return { x: 3, y: (SQUARE_SIZE * heatmap.value.weekCount) - (SQUARE_SIZE * (month.index)) - (SQUARE_SIZE / 4) };
	
	// Calculate the span of weeks for this month to center the label
	const months = heatmap.value.firstFullWeekOfMonths;
	const currentMonthIndex = months.findIndex(m => m.value === month.value && m.index === month.index);
	const nextMonth = months[currentMonthIndex + 1];
	
	// Calculate start and end week indices for this month
	const startWeek = month.index;
	const endWeek = nextMonth ? nextMonth.index : heatmap.value.weekCount;
	
	// Center the label between start and end weeks
	const centerWeek = startWeek + ((endWeek - startWeek) / 2);
	
	return { x: SQUARE_SIZE * centerWeek, y: SQUARE_SIZE - SQUARE_BORDER_SIZE };
}

/**
 * Calculate available years from the data
 */
function calculateAvailableYears(): void {
	if (!props.values || props.values.length === 0) {
		availableYears.value = [currentYear.value];
		showYearNavigation.value = false;
		return;
	}

	const years = new Set<number>();
	props.values.forEach(item => {
		const date = typeof item.date === "string" ? new Date(item.date) : item.date;
		years.add(date.getFullYear());
	});

	availableYears.value = Array.from(years).sort((a, b) => a - b);
	showYearNavigation.value = availableYears.value.length > 1;
	
	// If year prop is not provided, use the most recent year from data
	if (!props.year && availableYears.value.length > 0)
		currentYear.value = availableYears.value[availableYears.value.length - 1];
}

/**
 * Navigate to previous year
 */
function previousYear(): void {
	const currentIndex = availableYears.value.indexOf(currentYear.value);
	if (currentIndex > 0) {
		currentYear.value = availableYears.value[currentIndex - 1];
		updateHeatmapForYear();
	}
}

/**
 * Navigate to next year
 */
function nextYear(): void {
	const currentIndex = availableYears.value.indexOf(currentYear.value);
	if (currentIndex < availableYears.value.length - 1) {
		currentYear.value = availableYears.value[currentIndex + 1];
		updateHeatmapForYear();
	}
}

/**
 * Update heatmap to show data for the current year
 */
function updateHeatmapForYear(): void {
	// Filter values for the current year
	const yearValues = props.values.filter(item => {
		const date = typeof item.date === "string" ? new Date(item.date) : item.date;
		return date.getFullYear() === currentYear.value;
	});

	// Create new end date for December 31 of current year
	const yearEndDate = new Date(currentYear.value, 11, 31);
	
	// Update heatmap with filtered data
	heatmap.value = new Heatmap(yearEndDate, yearValues, props.max);
	
	// Reinitialize tooltips
	nextTick(() => {
		if (svg.value && props.tooltip) 
			initTippy();
	});
}

/**
 * Check if previous year button should be disabled
 */
const canGoPrevious = computed(() => {
	const currentIndex = availableYears.value.indexOf(currentYear.value);
	return currentIndex > 0;
});

/**
 * Check if next year button should be disabled
 */
const canGoNext = computed(() => {
	const currentIndex = availableYears.value.indexOf(currentYear.value);
	return currentIndex < availableYears.value.length - 1;
});

// Watchers
watch(vertical, v => {
	if (v) {
		width.value = LEFT_SECTION_WIDTH + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK) + RIGHT_SECTION_WIDTH;
		height.value = TOP_SECTION_HEIGHT + (SQUARE_SIZE * heatmap.value.weekCount) + SQUARE_BORDER_SIZE;
		daysLabelWrapperTransform.value = `translate(${LEFT_SECTION_WIDTH}, 0)`;
		monthsLabelWrapperTransform.value = `translate(0, ${TOP_SECTION_HEIGHT})`;
	}
	else {
		width.value = LEFT_SECTION_WIDTH + (SQUARE_SIZE * heatmap.value.weekCount) + SQUARE_BORDER_SIZE;
		height.value = TOP_SECTION_HEIGHT + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK);
		daysLabelWrapperTransform.value = `translate(0, ${TOP_SECTION_HEIGHT})`;
		monthsLabelWrapperTransform.value = `translate(${LEFT_SECTION_WIDTH - 10}, 0)`;
	}
}, { immediate: true });

watch([width, height], ([w, h]) => (viewbox.value = ` 0 0 ${w} ${h}`), { immediate: true });

watch([width, height, rangeColor], ([w, h, rc]) => {
	legendWrapperTransform.value = vertical.value
		? `translate(${LEFT_SECTION_WIDTH + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK)}, ${TOP_SECTION_HEIGHT})`
		: `translate(${w - (SQUARE_SIZE * rc.length) - 30}, ${h - BOTTOM_SECTION_HEIGHT})`;
}, { immediate: true });

watch(() => props.locale, (l: Partial<TuHeatmapLocale> | undefined) => (lo.value = l ? { ...Heatmap.DEFAULT_LOCALE, ...l } : Heatmap.DEFAULT_LOCALE), { immediate: true });

watch(rangeColor, rc => (legendViewbox.value = `0 0 ${Heatmap.SQUARE_SIZE * (rc.length + 1)} ${Heatmap.SQUARE_SIZE}`), { immediate: true });

watch(
	[values, tooltipUnit, tooltipFormatter, noDataText, max, rangeColor],
	() => {
		calculateAvailableYears();
		// If we have multi-year data, filter for current year; otherwise use all values
		if (showYearNavigation.value)
			updateHeatmapForYear();
		else
			heatmap.value = new Heatmap(getYearEndDate(currentYear.value), props.values, props.max);
		
		tippyInstances?.map(i => i.destroy());
		nextTick(initTippy);
	}
);

// Lifecycle hooks
onMounted(() => {
	calculateAvailableYears();
	// If we have multi-year data, update to show only current year's data
	if (showYearNavigation.value)
		updateHeatmapForYear();
	
	initTippy();
});

onBeforeUnmount(() => {
	tippySingleton?.destroy();
	tippyInstances?.map(i => i.destroy());
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";
@import "../../style/sass/root";

/**
 * TuCalendarHeatMap Component Styles
 * Modern BEM methodology with CSS custom properties
 */

/* Main container */
.tu-calendar-hmap {
	--tu-calendar-hmap-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	--tu-calendar-hmap-text-color: #767676;
	--tu-calendar-hmap-stroke-color: #555;
	--tu-calendar-hmap-stroke-width: 2px;
	--tu-calendar-hmap-line-height: 10px;
	
	/* Dark theme variables */
	&.tu-dark-theme {
		--tu-calendar-hmap-text-color: var(--tu-primary);
	}
	
	/* Legend container */
	&__legend {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
		gap: 1rem;
		
		&-left {
			flex: 1;
		}
		
		&-right {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
		
		&-content {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
		
		&-text {
			font-size: 0.75rem;
			color: var(--tu-calendar-hmap-text-color);
			white-space: nowrap;
		}
	}
	
	/* Year navigation */
	&__year-navigation {
		display: flex;
		align-items: center;
		gap: 0.1rem;
		margin-right: 15px;
	}
	
	&__year-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--tu-calendar-hmap-text-color);
		min-width: 3rem;
		text-align: center;
	}
	
	&__year-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.25rem;
		height: 1.25rem;
		padding: 0;
		border: 1px solid var(--tu-calendar-hmap-stroke-color, var(--tu-border-color, #e1e5e9));
		border-radius: 3px;
		background-color: transparent;
		color: var(--tu-calendar-hmap-text-color);
		cursor: pointer;
		transition: opacity 0.2s ease, filter 0.2s ease;
		
		&:hover:not(&--disabled) {
			opacity: 0.7;
			filter: brightness(1.1);
		}
		
		&:active:not(&--disabled) {
			transform: scale(0.95);
		}
		
		&--disabled {
			opacity: 0.3;
			cursor: not-allowed;
		}
		
		svg {
			width: 10px;
			height: 10px;
		}
	}
	
	/* External legend SVG */
	&__external-legend {
		margin: 0 0.5rem;
		height: auto;
		width: auto;
		max-width: 200px;
	}
	
	/* SVG wrapper */
	&__wrapper {
		font-family: var(--tu-calendar-hmap-font-family);
		line-height: var(--tu-calendar-hmap-line-height);
		width: 100%;
		height: auto;
		overflow: visible;
		
		/* Month labels */
		.tu-calendar-hmap__months-labels {
			.tu-calendar-hmap__month-label {
				font-size: 0.625rem; // 10px
				font-weight: 500;
				fill: var(--tu-calendar-hmap-text-color);
				text-anchor: middle; // Center the text horizontally
				user-select: none;
			}
		}
		
		/* Day labels */
		.tu-calendar-hmap__days-labels {
			.tu-calendar-hmap__day-label {
				font-size: 0.5625rem; // 9px
				font-weight: 500;
				fill: var(--tu-calendar-hmap-text-color);
				user-select: none;
			}
		}
		
		/* Legend wrapper */
		.tu-calendar-hmap__legend-wrapper {
			text {
				font-size: 0.5625rem; // 9px
				font-weight: 500;
				fill: var(--tu-calendar-hmap-text-color);
				user-select: none;
			}
			
			.tu-calendar-hmap__legend-rect {
				cursor: default;
			}
		}
		
		/* Year container */
		.tu-calendar-hmap__year {
			.tu-calendar-hmap__month {
				.tu-calendar-hmap__day-square {
					cursor: pointer;
					transition: stroke 0.15s ease-in-out, stroke-width 0.15s ease-in-out, filter 0.15s ease-in-out, opacity 0.15s ease-in-out;
					stroke-width: 0;
					
					&:hover {
						stroke: var(--tu-calendar-hmap-stroke-color);
						stroke-width: var(--tu-calendar-hmap-stroke-width);
						paint-order: stroke;
						filter: brightness(1.1);
					}
					
					&:focus {
						outline: none;
						stroke: var(--tu-primary, var(--tu-calendar-hmap-stroke-color));
						stroke-width: var(--tu-calendar-hmap-stroke-width);
						paint-order: stroke;
					}
					
					
				}
			}
		}
	}
	
	/* Color intensity classes */
	&__color-0 { opacity: 0.3; }
	&__color-1 { opacity: 0.5; }
	&__color-2 { opacity: 0.7; }
	&__color-3 { opacity: 0.85; }
	&__color-4 { opacity: 1; }
	&__color-5 { opacity: 1; }
}

/* Responsive design */
@media (max-width: 768px) {
	.tu-calendar-hmap {
		&__legend {
			flex-direction: column;
			align-items: stretch;
			gap: 0.75rem;
			
			&-right {
				justify-content: center;
			}
			
			&-content {
				justify-content: center;
			}
		}
		
		&__wrapper {
			.tu-calendar-hmap__month-label {
				font-size: 0.5rem; // 8px
			}
			
			.tu-calendar-hmap__day-label {
				font-size: 0.4375rem; // 7px
			}
		}
	}
}

/* Dark theme overrides */
.tu-dark-theme .tu-calendar-hmap {
	--tu-calendar-hmap-text-color: var(--tu-primary);
	--tu-calendar-hmap-stroke-color: var(--tu-primary);
	
	&__legend-text {
		color: var(--tu-primary);
	}
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.tu-calendar-hmap {
		--tu-calendar-hmap-stroke-width: 3px;
		
		&__day-square {
			&:hover,
			&:focus {
				stroke-width: 4px !important;
			}
		}
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.tu-calendar-hmap {
		&__day-square {
			transition: none !important;
			
			&:active {
				transform: none !important;
			}
		}
	}
}
</style>