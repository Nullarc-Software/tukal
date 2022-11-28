<!-- eslint-disable func-call-spacing -->
<template>
	<div aria-label="Calendar" :class="[
		'cv-wrapper',
		`locale-${CalendarMath.languageCode(displayLocale)}`,
		`locale-${displayLocale}`,
		`y${periodStart.getFullYear()}`,
		`m${CalendarMath.paddedMonth(periodStart)}`,
		`period-${displayPeriodUom}`,
		`periodCount-${displayPeriodCount}`,
		{
			past: CalendarMath.isPastMonth(periodStart),
			future: CalendarMath.isFutureMonth(periodStart),
			noIntl: !CalendarMath.supportsIntl
		}
	]">
		<slot :headerProps="headerProps" name="header" />
		<div class="cv-header-days">
			<div v-if="displayWeekNumbers" class="cv-weeknumber" />
			<template v-for="(label, index) in weekdayNames">
				<slot :index="getColumnDOWClass(index)" :label="label" name="dayHeader">
					<div :key="getColumnDOWClass(index)" :class="getColumnDOWClass(index)" class="cv-header-day">
						{{ label }}
					</div>
				</slot>
			</template>
		</div>
		<div :aria-multiselectable="enableDateSelection" class="cv-weeks">
			<div v-for="(weekStart, weekIndex) in weeksOfPeriod" :key="`${weekIndex}-week`" :class="[
				'cv-week',
				`week${weekIndex + 1}`,
				`ws${CalendarMath.isoYearMonthDay(weekStart)}`
			]">
				<div v-if="displayWeekNumbers" class="cv-weeknumber">
					<slot name="weekNumber" :date="weekStart" :numberInYear="periodStartCalendarWeek + weekIndex"
						:numberInPeriod="weekIndex + 1"><span>{{
								periodStartCalendarWeek + weekIndex
						}}</span></slot>
				</div>
				<div class="cv-weekdays">
					<div v-for="(day, dayIndex) in CalendarMath.daysOfWeek(
						weekStart
					)" :key="getColumnDOWClass(dayIndex)" :draggable="enableDateSelection" :class="[
	'cv-day',
	getColumnDOWClass(dayIndex),
	`d${CalendarMath.isoYearMonthDay(day)}`,
	`d${CalendarMath.isoMonthDay(day)}`,
	`d${CalendarMath.paddedDay(day)}`,
	`instance${CalendarMath.instanceOfMonth(day)}`,
	{
		today: CalendarMath.isSameDate(
			day,
			CalendarMath.today()
		),
		outsideOfMonth: !CalendarMath.isSameMonth(
			day,
			defaultedShowDate
		),
		past: CalendarMath.isInPast(day),
		future: CalendarMath.isInFuture(day),
		last: CalendarMath.isLastDayOfMonth(day),
		lastInstance:
			CalendarMath.isLastInstanceOfMonth(day),
		hasItems: dayHasItems(day),
		selectionStart: CalendarMath.isSameDate(
			day,
			selectionStart
		),
		selectionEnd: CalendarMath.isSameDate(
			day,
			selectionEnd
		)
	},
	...((dateClasses &&
		dateClasses[
		CalendarMath.isoYearMonthDay(day)
		]) ||
		[])
]" :aria-grabbed="
	enableDateSelection ? dayIsSelected(day) : undefined
" :aria-label="day.getDate().toString()" :aria-selected="dayIsSelected(day)" :aria-dropeffect="
	enableDragDrop && state.currentDragItem
		? 'move'
		: enableDateSelection &&
			state.dateSelectionOrigin
			? 'execute'
			: 'none'
" @click="onClickDay(day, $event)" @dragstart="onDragDateStart(day, $event)" @drop.prevent="onDrop(day, $event)"
						@dragover.prevent="onDragOver(day, $event)" @dragenter.prevent="onDragEnter(day, $event)"
						@dragleave.prevent="onDragLeave(day, $event)">
						<div class="cv-day-number">{{ day.getDate() }}</div>
						<slot :day="day" name="dayContent" />
						<span class="tu-count" v-if="
							getEventsCount(day, weekStart) > 0 &&
							props.displayPeriodUom === 'month'
						" @click.stop="getSelectedDayEvents(day, weekStart)">
							+ {{ getEventsCount(day, weekStart) }} more event
						</span>
					</div>
					<template v-for="i in getWeekItems(weekStart)">
						<slot :value="i" :weekStartDate="weekStart" :top="getItemTop(i)" name="item">
							<div :key="i.id" :draggable="enableDragDrop" :aria-grabbed="
								enableDragDrop
									? i == state.currentDragItem
									: undefined
							" :class="i.classes" :title="i.tooltip || i.title" :style="`background:${_color.getApplyColor(
	getItemCategoryColor(i),
	0.2
)};top:${getItemTop(
	i
)};border: 2px solid ${getItemBorderColor(i)};`" class="cv-item" @dragstart="onDragItemStart(i, $event)"
								@mouseenter="onMouseEnterItem(i, $event)" @mouseleave="onMouseLeaveItem(i, $event)"
								@click.stop="
	onClickItem(i, $event);
openEventDialog(i);
								" v-if="
									i.itemRow < 3 ||
									props.displayPeriodUom === 'week'
								">
								<span class="event-dot" :style="`background: ${_color.getApplyColor(
									getItemCategoryColor(i),
									0.9
								)}`"></span>
								{{ getItemTitle(i) }}
							</div>
						</slot>
					</template>
				</div>
			</div>
		</div>
		<tu-dialog width="550px" v-model="activateDialog" @close="closeDialog">
			<header>
				<div class="dialog-date">
					{{
							selectedDay.getDate() +
							" " +
							monthNames[selectedDay.getMonth()] +
							" " +
							selectedDay.getFullYear()
					}}
				</div>
			</header>
			<div class="header">Events</div>
			<div class="dialog-content overflow-auto">
				<div type="1" v-for="event in selectedDayEvents" :key="event.originalItem.id">
					<div class="text-wrapper" @click="openEventDialog(event)" :style="`background:${_color.getApplyColor(
						getItemCategoryColor(event),
						0.2
					)}`">
						<div class="event-title">
							{{ event.originalItem.title }}
						</div>
						<div class="event-date">
							Date:
							{{
									event.originalItem.startDate.getDate() +
									" " +
									monthNames[
										event.originalItem.startDate.getMonth()
									].slice(0, 3) +
									" " +
									event.originalItem.startDate.getFullYear() +
									" " +
									getFormattedTimeRange(event)[0] +
									" - "
							}}
							{{
									event.originalItem.endDate.getDate() +
									" " +
									monthNames[
										event.originalItem.endDate.getMonth()
									].slice(0, 3) +
									" " +
									event.originalItem.endDate.getFullYear() +
									" " +
									getFormattedTimeRange(event)[1]
							}}
						</div>
						<div class="event-category">
							Category: {{ event.originalItem.category }}
						</div>
					</div>
				</div>
			</div>
		</tu-dialog>
		<tu-dialog width="550px" v-model="confirmationDialog">
			<header>
				<div>Are you sure you want to delete the event ?</div>
			</header>
			<template v-slot:footer>
				<tu-button success @click.stop="deleteItem()"> Yes </tu-button>
				<tu-button danger @click="confirmationDialog = false">
					cancel
				</tu-button>
			</template>
		</tu-dialog>
		<tu-dialog width="550px" v-model="selectedEventDIalog" @close="selectedEventClose"
			v-if="props.components === null">
			<header>
				<h2 class="dialog-header" v-if="!isEditEvent">
					{{ selectedEvent.Title }}
				</h2>
				<h2 v-else class="dialog-header">Edit</h2>
			</header>
			<div class="center">
				<div>
					<table>
						<tr>
							<td>
								<span title="Label">Title</span>
							</td>
							<td>
								<tu-input primary v-model="selectedEvent.Title" state="primary" placeholder="Title"
									:disable="!isEditEvent" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Start Date</span>
							</td>
							<td>
								<tu-input type="date" v-model="selectedEvent.StartDate" :disable="!isEditEvent" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Start Time</span>
							</td>
							<td>
								<tu-input type="time" v-model="selectedEvent.StartTime" :disable="!isEditEvent" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">End Date</span>
							</td>
							<td>
								<tu-input type="date" v-model="selectedEvent.EndDate" :disable="!isEditEvent" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">End Time</span>
							</td>
							<td>
								<tu-input type="time" v-model="selectedEvent.EndTime" :disable="!isEditEvent" />
							</td>
						</tr>
						<tr>
							<td>
								<span title="Label">Category</span>
							</td>
							<td>
								<tu-select inline :disabled="!isEditEvent" v-model="selectedEvent.Category">
									<tu-select-option v-for="category in categories" :key="category"
										:label="category.name" :value="category.name">
										<span class="dot" :style="`background: ${_color.getApplyColor(
											category.color,
											0.6
										)}`"></span>
										{{ category.name }}
									</tu-select-option>
								</tu-select>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<template v-slot:footer>
				<div v-if="!isEditEvent">
					<tu-button success @click.stop="isEditEvent = true">
						Edit
					</tu-button>
					<tu-button danger @click="
						selectedEventDIalog = false;
					confirmationDialog = true;
					">
						delete
					</tu-button>
				</div>
				<div v-else>
					<tu-button success @click.stop="editItem()">
						Save
					</tu-button>
				</div>
			</template>
		</tu-dialog>
		<tu-dialog width="550px" v-model="selectedEventDIalog" @close="selectedEventClose" v-else>
			<component :is="components.eventDetail" :selectedEvent="selectedEvent" :categories="categories"
				@editItem="editItem()" @deleteItem="deleteItem()" />
		</tu-dialog>
	</div>
</template>
<script lang="ts" setup>
import CalendarMath from "./CalendarMath";
import CalendarViewState from "./CalendarViewState";
import {
	computed,
	reactive,
	watch,
	withDefaults,
	ref,
	Ref,
	defineProps,
	defineEmits
} from "vue";
import {
	ICalendarItem,
	INormalizedCalendarItem,
	DateTimeFormatOption
} from "./ICalendarItem";
import { IHeaderProps } from "./IHeaderProps";
import * as _color from "../../utils";

type TCategory = {
	name: string;
	color: string;
};

const props = withDefaults(
	defineProps<{
		showDate?: Date;
		displayPeriodUom?: string;
		displayPeriodCount?: number;
		displayWeekNumbers?: boolean;
		locale?: string;
		monthNameFormat?: DateTimeFormatOption;
		weekdayNameFormat?: DateTimeFormatOption;
		showTimes?: boolean;
		timeFormatOptions?: object;
		disablePast?: boolean;
		disableFuture?: boolean;
		enableDateSelection?: boolean;
		selectionStart?: Date;
		selectionEnd?: Date;
		enableDragDrop?: boolean;
		startingDayOfWeek?: number;
		items?: ICalendarItem[];
		dateClasses?: Record<string, string[]>;
		itemTop?: string;
		itemContentHeight?: string;
		itemBorderHeight?: string;
		periodChangedCallback?: Function;
		currentPeriodLabel?: string;
		currentPeriodLabelIcons?: string;
		doEmitItemMouseEvents?: boolean;
		categories?: Array<TCategory>;
		components?: any;
		theme?: String;
	}>(),
	{
		showDate: undefined,
		displayPeriodUom: "month",
		displayPeriodCount: 1,
		displayWeekNumbers: false,
		locale: undefined,
		monthNameFormat: "long",
		weekdayNameFormat: "short",
		showTimes: false,
		timeFormatOptions: () => ({}),
		disablePast: false,
		disableFuture: false,
		enableDateSelection: false,
		selectionStart: undefined,
		selectionEnd: undefined,
		enableDragDrop: false,
		startingDayOfWeek: 0,
		items: () => [],
		dateClasses: () => ({}),
		itemTop: "1.4em",
		itemContentHeight: "1.4em",
		itemBorderHeight: "2px",
		periodChangedCallback: undefined,
		currentPeriodLabel: "",
		categories: null,
		currentPeriodLabelIcons: "⇤-⇥",
		doEmitItemMouseEvents: false,
		components: null,
		theme: null
	}
);
const emit = defineEmits<{
	(e: "period-changed"): void;
	(
		e: "click-date",
		day: Date,
		itemsInRange: INormalizedCalendarItem[],
		windowEvent: Event
	): void;
	(e: "click-item", item: ICalendarItem, windowEvent: Event): void;
	(e: "item-mouseenter", item: ICalendarItem, windowEvent: Event): void;
	(e: "item-mouseleave", item: ICalendarItem, windowEvent: Event): void;
	(e: "drag-start", item: ICalendarItem, windowEvent: Event): void;
	(
		e: "drag-over-date",
		currentDragItem: INormalizedCalendarItem,
		day: Date,
		windowEvent: Event
	): void;
	(
		e: "drag-enter-date",
		currentDragItem: INormalizedCalendarItem,
		day: Date,
		windowEvent: Event
	): void;
	(
		e: "drag-leave-date",
		currentDragItem: INormalizedCalendarItem,
		day: Date,
		windowEvent: Event
	): void;
	(
		e: "drop-on-date",
		currentDragItem: INormalizedCalendarItem,
		day: Date,
		windowEvent: Event
	): void;
	(
		e: "date-selection",
		selectedDateRange: [Date, Date],
		windowEvent: Event
	): void;
	(
		e: "date-selection-start",
		selectedDateRange: [Date, Date],
		windowEvent: Event
	): void;
	(
		e: "date-selection-finish",
		selectedDateRange: [Date, Date],
		windowEvent: Event
	): void;
	(e: "updateItems", selectedEvent: ICalendarItem): void;
	(e: "deleteItem", id: String): void;
}>();

interface ISelectedEvent {
	Title: string;
	StartDate: string;
	EndDate: string;
	StartTime: string;
	EndTime: string;
	Category: string;
	id: string;
}

const state = reactive(new CalendarViewState());
const selectedDayEvents: Ref<INormalizedCalendarItem[]> = ref([]);
let selectedEvent: ISelectedEvent = reactive({
	Title: "",
	StartDate: null,
	EndDate: null,
	StartTime: null,
	EndTime: null,
	Category: null,
	id: null
});
const selectedDay: Ref<Date> = ref(new Date());
const selectedEventDIalog = ref(false);
const activateDialog = ref(false);
const isEditEvent = ref(false);
const confirmationDialog = ref(false);
// Props cannot default to computed/method returns, so create defaulted version of this
// property and use it rather than the bare prop (Vue Issue #6013).
const displayLocale = computed(
	(): string => props.locale || CalendarMath.getDefaultBrowserLocale()
);
/*
ShowDate, but defaulted to today. Needed both for periodStart below and for the
"outside of month" class. Any time component passed as part of showDate is discarded.
*/
const defaultedShowDate = computed(
	(): Date =>
		props.showDate
			? CalendarMath.dateOnly(props.showDate)
			: CalendarMath.today()
);
// Given the showDate, defaulted to today, computes the beginning and end of the period
// that the date falls within.
const periodStart = computed(
	(): Date =>
		CalendarMath.beginningOfPeriod(
			defaultedShowDate.value,
			props.displayPeriodUom,
			props.startingDayOfWeek
		)
);
const periodEnd = computed(
	(): Date =>
		CalendarMath.addDays(
			CalendarMath.incrementPeriod(
				periodStart.value,
				props.displayPeriodUom,
				props.displayPeriodCount
			),
			-1
		)
);
const periodStartCalendarWeek = computed((): number => {
	const firstWeekStarts = CalendarMath.beginningOfWeek(
		CalendarMath.beginningOfPeriod(periodStart.value, "year", 0),
		props.startingDayOfWeek
	);
	const periodWeekStarts = CalendarMath.beginningOfWeek(
		periodStart.value,
		props.startingDayOfWeek
	);
	return (
		1 +
		Math.floor(CalendarMath.dayDiff(firstWeekStarts, periodWeekStarts) / 7)
	);
});
// For month and year views, the first and last dates displayed in the grid may not
// be the same as the intended period, since the period may not start and stop evenly
// on the starting day of the week.
const displayFirstDate = computed(
	(): Date =>
		CalendarMath.beginningOfWeek(periodStart.value, props.startingDayOfWeek)
);
const displayLastDate = computed(
	(): Date => CalendarMath.endOfWeek(periodEnd.value, props.startingDayOfWeek)
);
// Create an array of dates, where each date represents the beginning of a week that
// should be rendered in the view for the current period.
const weeksOfPeriod = computed((): Date[] => {
	const numWeeks = Math.floor(
		(CalendarMath.dayDiff(displayFirstDate.value, displayLastDate.value) +
			1) /
		7
	);
	return [...Array(numWeeks)].map((_, i) =>
		CalendarMath.addDays(displayFirstDate.value, i * 7)
	);
});
// Cache the names based on current locale and format settings
const monthNames = computed((): string[] =>
	CalendarMath.getFormattedMonthNames(
		displayLocale.value,
		props.monthNameFormat
	)
);
const weekdayNames = computed((): string[] =>
	CalendarMath.getFormattedWeekdayNames(
		displayLocale.value,
		props.weekdayNameFormat,
		props.startingDayOfWeek
	)
);
// Ensure all item properties have suitable default
const fixedItems = computed((): INormalizedCalendarItem[] => {
	if (!props.items) return [];
	return props.items.map((item) =>
		CalendarMath.normalizeItem(item, item.id === state.currentHoveredItemId)
	);
});
// Period that today's date sits within
const currentPeriodStart = computed(
	(): Date =>
		CalendarMath.beginningOfPeriod(
			CalendarMath.today(),
			props.displayPeriodUom,
			props.startingDayOfWeek
		)
);
const currentPeriodEnd = computed(
	(): Date =>
		CalendarMath.addDays(
			CalendarMath.incrementPeriod(
				currentPeriodStart.value,
				props.displayPeriodUom,
				props.displayPeriodCount
			),
			-1
		)
);
// Creates the HTML to render the date range for the calendar header.
const periodLabel = computed((): string =>
	CalendarMath.formattedPeriod(
		periodStart.value,
		periodEnd.value,
		props.displayPeriodUom,
		monthNames.value
	)
);
const currentPeriodLabelFinal = computed((): string => {
	const c = currentPeriodStart.value;
	const s = periodStart.value;
	if (!props.currentPeriodLabel) {
		return CalendarMath.formattedPeriod(
			c,
			currentPeriodEnd.value,
			props.displayPeriodUom,
			monthNames.value
		);
	}
	if (props.currentPeriodLabel === "icons") {
		return props.currentPeriodLabelIcons[
			Math.sign(c.getTime() - s.getTime()) + 1
		];
	}
	return props.currentPeriodLabel;
});
const headerProps = computed(
	(): IHeaderProps => ({
		// Dates for UI navigation
		previousYear: getIncrementedPeriod(-12),
		previousPeriod: getIncrementedPeriod(-1),
		nextPeriod: getIncrementedPeriod(1),
		previousFullPeriod: getIncrementedPeriod(-props.displayPeriodCount),
		nextFullPeriod: getIncrementedPeriod(props.displayPeriodCount),
		nextYear: getIncrementedPeriod(12),
		currentPeriod: currentPeriodStart.value,
		currentPeriodLabel: currentPeriodLabelFinal.value,
		// Dates for header display
		periodStart: periodStart.value,
		periodEnd: periodEnd.value,
		// Extra information that could be useful to a custom header
		displayLocale: displayLocale.value,
		displayFirstDate: displayFirstDate.value,
		displayLastDate: displayLastDate.value,
		monthNames: monthNames.value,
		fixedItems: fixedItems.value,
		periodLabel: periodLabel.value
	})
);
const periodRange = computed(() => ({
	periodStart: periodStart,
	periodEnd: periodEnd,
	displayFirstDate: displayFirstDate,
	displayLastDate: displayLastDate
}));
watch(
	() => periodRange,
	(newVal) => {
		if (props.periodChangedCallback) {
			emit("period-changed");
			props.periodChangedCallback(newVal, "watch");
		}
	},
	{ immediate: true, deep: true }
);
// ******************************
// UI Events
// ******************************
const onClickDay = (day: Date, windowEvent: Event): void => {
	if (props.disablePast && CalendarMath.isInPast(day)) return;
	if (props.disableFuture && CalendarMath.isInFuture(day)) return;
	emit("click-date", day, findAndSortItemsInDateRange(day, day), windowEvent);
};
const onClickItem = (calendarItem: ICalendarItem, windowEvent: Event): void =>
	emit("click-item", calendarItem, windowEvent);
// The day name header needs to know the dow for class assignment, and this value should
// not change based on startingDayOfWeek (i.e., Sunday is always 0). This function
// computes the dow for a given day index.
const getColumnDOWClass = (dayIndex: number): string =>
	"dow" + ((dayIndex + props.startingDayOfWeek) % 7);
// ******************************
// Date Periods
// ******************************
// Returns a date for the current display date moved forward or backward by a given
// number of the current display units. Returns null if said move would result in a
// disallowed display period.
const getIncrementedPeriod = (count: number): Date | null => {
	const newStartDate = CalendarMath.incrementPeriod(
		periodStart.value,
		props.displayPeriodUom,
		count
	);
	const newEndDate = CalendarMath.incrementPeriod(
		newStartDate,
		props.displayPeriodUom,
		props.displayPeriodCount
	);
	if (props.disablePast && newEndDate <= CalendarMath.today()) return null;
	if (props.disableFuture && newStartDate > CalendarMath.today()) return null;
	return newStartDate;
};
// ******************************
// Hover items (#95, #136)
// ******************************
const onMouseEnterItem = (
	calendarItem: ICalendarItem,
	windowEvent: Event
): void => {
	state.currentHoveredItemId = calendarItem.id;
	if (props.doEmitItemMouseEvents)
		emit("item-mouseenter", calendarItem, windowEvent);
};
const onMouseLeaveItem = (
	calendarItem: ICalendarItem,
	windowEvent: Event
): void => {
	state.currentHoveredItemId = "";
	if (props.doEmitItemMouseEvents)
		emit("item-mouseleave", calendarItem, windowEvent);
};
// ******************************
// Dragging across days (selection)
// ******************************
const onDragDateStart = (day: Date, windowEvent: DragEvent): boolean => {
	if (!props.enableDateSelection) return false;
	// Push the date where the selection started into dataTransfer. This is not used by this component, but
	// a value required in Firefox and possibly other browsers.
	windowEvent.dataTransfer?.setData("text", day.toString());
	const img = new Image();
	img.src =
		"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
	windowEvent.dataTransfer?.setDragImage(img, 10, 10);
	state.dateSelectionOrigin = day;
	emit("date-selection-start", getSelectedDateRange(day), windowEvent);
	return true;
};
// ******************************
// Drag and drop items
// ******************************
const onDragItemStart = (
	calendarItem: INormalizedCalendarItem,
	windowEvent: DragEvent
): boolean => {
	if (!props.enableDragDrop) return false;
	// Firefox and possibly other browsers require dataTransfer to be set, even if the value is not used. IE11
	// requires that the first argument be exactly "text" (not "text/plain", etc.). The calendar item's ID is
	// passed, allowing calling applications to receive items dragged outside the component.
	windowEvent.dataTransfer?.setData("text", calendarItem.id);
	// However, we don't use dataTransfer within the component. Instead, we just keep a handled on the item
	// currently being dragged. This avoids having to look it up later.
	state.currentDragItem = calendarItem;
	// Reset date selection origin so the onenter events aren't confused
	state.dateSelectionOrigin = undefined;
	// Allow the calling application to add additional functionality.
	emit("drag-start", calendarItem, windowEvent);
	return true;
};
// If the user drags an item FROM this calendar TO this calendar, currentDragItem will be initialized to the
// most recent item with a dragStart event. If not, we still emit the event, and the caller will need to
// determine what to do based on the third argument (windowEvent, which gives them access to `dataTransfer`).
// This allows developers to create custom calendars where things can be dragged in from the outside. This
// also allows developers using scoped slots for items to handle the drag and drop themselves.
// Non-null assertion used because the selection origin is pre-checked in all use cases
const getSelectedDateRange = (d: Date): [Date, Date] =>
	d <= state.dateSelectionOrigin!
		? [d, state.dateSelectionOrigin!]
		: [state.dateSelectionOrigin!, d];
const onDragOver = (day: Date, windowEvent: Event): void => {
	if (!props.enableDragDrop) return;
	emit("drag-over-date", state.currentDragItem!, day, windowEvent);
};
const onDragEnter = (day: Date, windowEvent: Event) => {
	if (props.enableDateSelection && state.dateSelectionOrigin) {
		// User is selecting dates, not items.
		emit("date-selection", getSelectedDateRange(day), windowEvent);
	}
	if (!props.enableDragDrop) return;
	emit("drag-enter-date", state.currentDragItem!, day, windowEvent);
	const el = windowEvent.target as HTMLElement;
	el.classList.add("draghover");
};
const onDragLeave = (day: Date, windowEvent: Event): void => {
	// User is selecting dates, not items. No emit.
	if (props.enableDateSelection && props.selectionStart) return;
	if (!props.enableDragDrop) return;
	emit("drag-leave-date", state.currentDragItem!, day, windowEvent);
	const el = windowEvent.target as HTMLElement;
	el.classList.remove("draghover");
};
const onDrop = (day: Date, windowEvent: Event): void => {
	if (props.enableDateSelection && state.dateSelectionOrigin) {
		// User is selecting dates, not items.
		emit("date-selection-finish", getSelectedDateRange(day), windowEvent);
		return;
	}
	if (!props.enableDragDrop) return;
	emit("drop-on-date", state.currentDragItem!, day, windowEvent);
	const el = windowEvent.target as HTMLElement;
	el.classList.remove("draghover");
};
// ******************************
// Calendar Items
// ******************************
const itemComparer = (
	a: INormalizedCalendarItem,
	b: INormalizedCalendarItem
) => {
	if (a.startDate < b.startDate) return -1;
	if (b.startDate < a.startDate) return 1;
	if (a.endDate > b.endDate) return -1;
	if (b.endDate > a.endDate) return 1;
	return a.id < b.id ? -1 : 1;
};
// Return a list of items that INCLUDE any portion of a given week.
const findAndSortItemsInWeek = (weekStart: Date): INormalizedCalendarItem[] =>
	findAndSortItemsInDateRange(weekStart, CalendarMath.addDays(weekStart, 6));
// Return a list of items that INCLUDE any day within the date range,
// inclusive, sorted so items that start earlier are returned first.
const findAndSortItemsInDateRange = (
	startDate: Date,
	endDate: Date
): INormalizedCalendarItem[] =>
	fixedItems.value
		.filter(
			(item) =>
				item.endDate >= startDate &&
				CalendarMath.dateOnly(item.startDate) <= endDate,
			this
		)
		.sort(itemComparer);
const dayHasItems = (day: Date): boolean =>
	!!fixedItems.value.find(
		(d) => d.endDate >= day && CalendarMath.dateOnly(d.startDate) <= day
	);
const dayIsSelected = (day: Date): boolean => {
	if (!props.selectionStart || !props.selectionEnd) return false;
	if (day < CalendarMath.dateOnly(props.selectionStart)) return false;
	if (day > CalendarMath.dateOnly(props.selectionEnd)) return false;
	return true;
};
// Return a list of items that CONTAIN the week starting on a day.
// Sorted so the items that start earlier are always shown first.
const getWeekItems = (weekStart: Date): INormalizedCalendarItem[] => {
	const items = findAndSortItemsInWeek(weekStart);
	const results = [] as INormalizedCalendarItem[];
	const itemRows: boolean[][] = [[], [], [], [], [], [], []];
	if (!items) return results;
	for (let i = 0; i < items.length; i++) {
		const ep = Object.assign({}, items[i], {
			classes: [...items[i].classes],
			itemRow: 0
		});
		const continued = ep.startDate < weekStart;
		const startOffset = continued
			? 0
			: CalendarMath.dayDiff(weekStart, ep.startDate);
		const span = Math.min(
			7 - startOffset,
			CalendarMath.dayDiff(
				CalendarMath.addDays(weekStart, startOffset),
				ep.endDate
			) + 1
		);
		if (continued) ep.classes.push("continued");
		if (CalendarMath.dayDiff(weekStart, ep.endDate) > 6)
			ep.classes.push("toBeContinued");
		if (CalendarMath.isInPast(ep.endDate)) ep.classes.push("past");
		if (ep.originalItem.url) ep.classes.push("hasUrl");
		for (let d = 0; d < 7; d++) {
			if (d === startOffset) {
				let s = 0;
				while (itemRows[d][s]) s++;
				ep.itemRow = s;
				itemRows[d][s] = true;
			}
			else if (d < startOffset + span) itemRows[d][ep.itemRow] = true;
		}
		ep.classes.push(`offset${startOffset}`);
		ep.classes.push(`span${span}`);
		results.push(ep);
	}
	return results;
};

const dateRange = (startDate: Date, endDate: Date, steps = 1): Date[] => {
	const dateArray = [];
	const currentDate = new Date(startDate);

	while (currentDate <= new Date(endDate)) {
		dateArray.push(new Date(currentDate));
		currentDate.setUTCDate(currentDate.getUTCDate() + steps);
	}
	dateArray.push(endDate);
	return dateArray;
};

const getEventsCount = (day: Date, weekStart: Date): number => {
	let count: number = 0;
	const items = findAndSortItemsInWeek(weekStart);
	for (let i = 0; i < items.length; i++) {
		const arr2 = dateRange(items[i].startDate, items[i].endDate);
		for (let i = 0; i < arr2.length; i++) {
			if (
				arr2[i].getDate() === day.getDate() &&
				arr2[i].getMonth() === day.getMonth()
			) {
				count++;
				break;
			}
		}
	}
	if (count > 3) return count - 3;
};

const getItemTitle = (item: INormalizedCalendarItem): string => {
	return item.title;
};
// Compute the top position of the item based on its assigned row within the given week.
const getItemTop = (item: INormalizedCalendarItem): string => {
	const r = item.itemRow;
	const top = 20 + Number(r) * 28;
	return `${top}px`;
};

const getSelectedDayEvents = (day: Date, weekStart: Date) => {
	const items = findAndSortItemsInWeek(weekStart);
	for (let i = 0; i < items.length; i++) {
		const arr2 = dateRange(items[i].startDate, items[i].endDate);
		for (let j = 0; j < arr2.length; j++) {
			if (
				arr2[j].getDate() === day.getDate() &&
				arr2[j].getMonth() === day.getMonth()
			) {
				selectedDayEvents.value.push(items[i]);
				break;
			}
		}
	}
	selectedDay.value = day;
	activateDialog.value = true;
};

const closeDialog = () => {
	selectedDay.value = null;
	selectedDayEvents.value = [];
};

const getItemCategoryColor = (item: INormalizedCalendarItem) => {
	const category = item.originalItem.category;
	let categoryColor;
	for (let i = 0; i < props.categories.length; i++) {
		if (props.categories[i].name === category) {
			categoryColor = props.categories[i].color;
			break;
		}
	}
	return categoryColor;
};

const openEventDialog = (item: INormalizedCalendarItem) => {
	selectedEvent.Title = item.originalItem.title;
	selectedEvent.StartDate = convertDateToString(item.originalItem.startDate);
	selectedEvent.StartTime = convertDateToTime(item.originalItem.startDate);
	selectedEvent.EndDate = convertDateToString(item.originalItem.endDate);
	selectedEvent.EndTime = convertDateToTime(item.originalItem.endDate);
	selectedEvent.Category = item.originalItem.category;
	selectedEvent.id = item.originalItem.id;
	selectedEventDIalog.value = true;
};

const convertDateToString = (date: Date) => {
	const months = {
		Jan: "01",
		Feb: "02",
		Mar: "03",
		Apr: "04",
		May: "05",
		Jun: "06",
		Jul: "07",
		Aug: "08",
		Sep: "09",
		Oct: "10",
		Nov: "11",
		Dec: "12"
	};
	return (
		date.toString().split(" ")[3] +
		"-" +
		months[date.toString().split(" ")[1]] +
		"-" +
		date.toString().split(" ")[2]
	);
};

const convertDateToTime = (date: Date) => {
	let minutes = date.getMinutes().toString();
	let hours = date.getHours().toString();
	if (minutes[0] === "0") minutes = minutes + "0";
	if (hours[0] === "0") hours = hours + "0";
	if (hours.length === 1) hours = "0" + hours;
	if (minutes.length === 1) minutes = "0" + minutes;

	return hours + ":" + minutes;
};

const editItem = (item?: ISelectedEvent) => {
	if (item !== undefined) selectedEvent = item;

	const event = {
		startDate: new Date(
			selectedEvent.StartDate + " " + selectedEvent.StartTime
		),
		endDate: new Date(selectedEvent.EndDate + " " + selectedEvent.EndTime),
		category: selectedEvent.Category,
		title: selectedEvent.Title,
		id: selectedEvent.id
	};
	emit("updateItems", event);
	isEditEvent.value = false;
};

const deleteItem = (item?: ISelectedEvent) => {
	if (item !== undefined) selectedEvent = item;
	emit("deleteItem", selectedEvent.id);
	selectedEventDIalog.value = false;
	confirmationDialog.value = false;
};

const getItemBorderColor = (item: INormalizedCalendarItem) => {
	if (item.classes.includes("isHovered"))
		return _color.getApplyColor(getItemCategoryColor(item), 1);
};

const selectedEventClose = () => {
	isEditEvent.value = false;
};

const getFormattedTimeRange = (
	item: INormalizedCalendarItem
): Array<string> => {
	let startTime = CalendarMath.formattedTime(
		item.startDate,
		displayLocale.value,
		props.timeFormatOptions
	);
	if (startTime === "") startTime = "12:00:00 AM";
	let endTime = "";
	if (!CalendarMath.isSameDateTime(item.startDate, item.endDate)) {
		endTime = CalendarMath.formattedTime(
			item.endDate,
			displayLocale.value,
			props.timeFormatOptions
		);
		if (endTime === "") endTime = "12:00:00 AM";
	}
	return [startTime, endTime];
};
</script>
<!--
The CSS below represents only the CSS required for proper rendering (positioning, etc.) and
minimalist default borders and colors. Special-day colors, holiday emoji, item colors,
and decorations like border-radius should be part of a theme. Styles related to the default
header are in the CalendarViewHeader component.
-->
<style>
.tu-count {
	position: absolute;
	font-size: 14px;
	top: 7.4em;
	background: none;
	border-color: none;
}
</style>
