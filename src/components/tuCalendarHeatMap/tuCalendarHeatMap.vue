<template>
	<div class='vch__container' v-bind="$attrs">
		<svg class="vch__wrapper" ref="svg" :viewBox="viewbox">
			<g class="vch__months__labels__wrapper" :transform="monthsLabelWrapperTransform">
				<text class="vch__month__label" v-for="(month, index) in heatmap.firstFullWeekOfMonths" :key="index"
					:x="getMonthLabelPosition(month).x" :y="getMonthLabelPosition(month).y" >
					{{ lo.months[month['value']] }}
				</text>
			</g>

			<g class="vch__days__labels__wrapper" :transform="daysLabelWrapperTransform">
				<text class="vch__day__label" :x="vertical ? SQUARE_SIZE : 0"
					:y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 20">
					{{ lo.days[1] }}
				</text>
				<text class="vch__day__label" :x="vertical ? SQUARE_SIZE * 3 : 0"
					:y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 44">
					{{ lo.days[3] }}
				</text>
				<text class="vch__day__label" :x="vertical ? SQUARE_SIZE * 5 : 0"
					:y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : 69">
					{{ lo.days[5] }}
				</text>
			</g>

			<g v-if="vertical" class="vch__legend__wrapper" :transform="legendWrapperTransform">
				<text :x="SQUARE_SIZE * 1.25" y="8">{{ lo.less }}</text>
				<rect v-for="(color, index) in curRangeColor" :key="index" :rx="round" :ry="round"
					:class="`tu-heatmap-color-${color}`" :width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
					:height="SQUARE_SIZE - SQUARE_BORDER_SIZE" :x="SQUARE_SIZE * 1.75" :y="SQUARE_SIZE * (index + 1)" />
				<text :x="SQUARE_SIZE * 1.25" :y="SQUARE_SIZE * (curRangeColor.length + 2) - SQUARE_BORDER_SIZE">
					{{ lo.more }}
				</text>
			</g>

			<g class="vch__year__wrapper" :transform="yearWrapperTransform">
				<g class="vch__month__wrapper" v-for="(week, weekIndex) in heatmap.calendar" :key="weekIndex"
					:transform="getWeekPosition(weekIndex)">
					<template v-for="(day, dayIndex) in week" :key="dayIndex">
						<rect class="vch__day__square" v-if="day.date < now" :rx="round" :ry="round"
							:transform="getDayPosition(dayIndex)" :style="{ fill: rangeColor[day.colorIndex] }"
							:class="`tu-heatmap-color-${day.colorIndex}`" :width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
							:height="SQUARE_SIZE - SQUARE_BORDER_SIZE" :data-tippy-content="tooltipOptions(day)"
							@click="emit('dayClick', day)" />
					</template>
				</g>
			</g>
		</svg>
		<div class="vch__legend">
			<slot name="legend">
				<div class="vch__legend-left">
					<slot name="vch__legend-left"></slot>
				</div>
				<div class="vch__legend-right">
					<slot name="legend-right">
						<div class="vch__legend">
							<div>{{ lo.less }}</div>
							<svg v-if="!vertical" class="vch__external-legend-wrapper" :viewBox="legendViewbox"
								:height="SQUARE_SIZE - SQUARE_BORDER_SIZE">
								<g class="vch__legend__wrapper">
									<rect v-for="(color, index) in curRangeColor" :key="index" :rx="round" :ry="round"
										:style="{ fill: color }" :width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
										:height="SQUARE_SIZE - SQUARE_BORDER_SIZE" :x="SQUARE_SIZE * index" />
								</g>
							</svg>
							<div>{{ lo.more }}</div>
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

// Define props
interface Props {
	endDate: Date;
	max?: number;
	rangeColor?: string[];
	values: TuHeatmapValue[];
	locale?: Partial<TuHeatmapLocale>;
	tooltip?: boolean;
	tooltipUnit?: string;
	tooltipFormatter?: TuHeatmapTooltipFormatter;
	vertical?: boolean;
	noDataText?: boolean | string | null;
	round?: number;
	dark?: boolean;
	color?: string;
}

const props = withDefaults(defineProps<Props>(), {
	rangeColor: () => ["var(--tu-gray-2)", "#195bff1a", "#195bff4d", "#195bff99", "#195bffcc", "#195bff"],
	tooltip: true,
	tooltipUnit: () => Heatmap.DEFAULT_TOOLTIP_UNIT,
	vertical: false,
	noDataText: null,
	round: 0,
	dark: false
});

// Define emits
const emit = defineEmits<{
	dayClick: [day: TuHeatmapCalendarItem];
}>();

// Define component name
defineOptions({
	name: "CalendarHeatmap",
	inheritAttrs: false
});

// Constants and reactive variables
const SQUARE_BORDER_SIZE = Heatmap.SQUARE_SIZE / 5;
const SQUARE_SIZE = Heatmap.SQUARE_SIZE + SQUARE_BORDER_SIZE;
const LEFT_SECTION_WIDTH = Math.ceil(Heatmap.SQUARE_SIZE * 2.5);
const RIGHT_SECTION_WIDTH = SQUARE_SIZE * 3;
const TOP_SECTION_HEIGHT = Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2);
const BOTTOM_SECTION_HEIGHT = Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2);
const yearWrapperTransform = `translate(${LEFT_SECTION_WIDTH}, ${TOP_SECTION_HEIGHT})`;

const svg = ref<null | SVGElement>(null);
const now = ref(new Date());
const heatmap = ref(new Heatmap(props.endDate as Date, props.values, props.max));

const width = ref(0);
const height = ref(0);
const viewbox = ref("0 0 0 0");
const legendViewbox = ref("0 0 0 0");
const daysLabelWrapperTransform = ref("");
const monthsLabelWrapperTransform = ref("");
const legendWrapperTransform = ref("");
const lo = ref<TuHeatmapLocale>({} as TuHeatmapLocale);
const rangeColor = ref<string[]>(props.rangeColor || (props.dark ? Heatmap.DEFAULT_RANGE_COLOR_DARK : Heatmap.DEFAULT_RANGE_COLOR_LIGHT));

// Get destructured props for watchers
const { values, tooltipUnit, tooltipFormatter, noDataText, max, vertical } = toRefs(props);

// Computed property for curRangeColor to replace the old return value
const curRangeColor = computed(() => rangeColor.value);

let tippyInstances: Instance[];
let tippySingleton: CreateSingletonInstance;

function initTippy() {
	if (svg.value) {
		tippyInstances = tippy(Array.from(svg.value.querySelectorAll(".vch__day__square[data-tippy-content]")));
		if (tippySingleton) 
			tippySingleton.setInstances(tippyInstances);
		else {
			tippySingleton = createSingleton(tippyInstances, {
				moveTransition: "transform 0.1s ease-out",
				allowHTML: true
			});
		}
	}
}

function tooltipOptions(day: TuHeatmapCalendarItem) {
	if (typeof (day.date) === "string") 
		day.date = new Date(`${day.date}`);
	
	if (props.tooltip) {
		if (day.count !== undefined) {
			if (props.tooltipFormatter) 
				return props.tooltipFormatter(day, props.tooltipUnit);
			
			return `<b>${day.count} ${props.tooltipUnit}</b> ${lo.value.on} ${lo.value.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
		}
		else if (props.noDataText) 
			return `<b>${props.noDataText}</b> ${lo.value.on} ${lo.value.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
		else if (props.noDataText !== false) 
			return `<b>No ${props.tooltipUnit}</b> ${lo.value.on} ${lo.value.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
		
	}
	return undefined;
}

function getWeekPosition(index: number): string {
	if (props.vertical) 
		return `translate(0, ${(SQUARE_SIZE * heatmap.value.weekCount) - ((index + 1) * SQUARE_SIZE)})`;
	
	return `translate(${index * SQUARE_SIZE}, 0)`;
}

function getDayPosition(index: number) {
	if (props.vertical) 
		return `translate(${index * SQUARE_SIZE}, 0)`;
	
	return `translate(0, ${index * SQUARE_SIZE})`;
}

function getMonthLabelPosition(month: TuHeatmapMonth) {
	if (props.vertical) 
		return { x: 3, y: (SQUARE_SIZE * heatmap.value.weekCount) - (SQUARE_SIZE * (month.index)) - (SQUARE_SIZE / 4) };
	
	return { x: SQUARE_SIZE * month.index, y: SQUARE_SIZE - SQUARE_BORDER_SIZE };
}

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
		heatmap.value = new Heatmap(props.endDate as Date, props.values, props.max);
		tippyInstances?.map(i => i.destroy());
		nextTick(initTippy);
	}
);

// Lifecycle hooks
onMounted(initTippy);

onBeforeUnmount(() => {
	tippySingleton?.destroy();
	tippyInstances?.map(i => i.destroy());
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";
@import "../../style/sass/root";

.vch__container {
	.vch__legend {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.vch__external-legend-wrapper {
		margin: 0 8px;
	}
}

svg.vch__wrapper {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	line-height: 10px;
	width: 100%;

	.vch__months__labels__wrapper text.vch__month__label {
		font-size: 10px;
	}

	.vch__days__labels__wrapper text.vch__day__label,
	.vch__legend__wrapper text {
		font-size: 9px;
	}

	text.vch__month__label,
	text.vch__day__label,
	.vch__legend__wrapper text {
		fill: #767676;
	}

	rect.vch__day__square:hover {
		stroke: #555;
		stroke-width: 2px;
		paint-order: stroke;
	}

	rect.vch__day__square:focus {
		outline: none;
	}

	&.tu-dark-theme {

		text.vch__month__label,
		text.vch__day__label,
		.vch__legend__wrapper text {
			fill: var(--tu-primary) !important;
		}
	}
}

.svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label {
	color: red !important;
}
</style>