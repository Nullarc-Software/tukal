<template>
	<div class="tu-calendar" :class="colorTheme">
		<calendar-view 
			:show-date="showDate" 
			:items="events" 
			:show-times="true" 
			:displayWeekNumbers="true"
			:categories="categories" 
			:displayPeriodUom="periodUOM" 
			:components="components" 
			@click-date="handleClickDay" 
			@updateItems="handleUpdateEvent"
			@deleteItem="handleDeleteEvent"
		>
			<template #header="{ headerProps }">
				<calendar-view-header 
					:header-props="headerProps" 
					@input="handleSetShowDate" 
					@updatePeriod="handleUpdatePeriod"
					@updateTheme="handleUpdateTheme" 
					@updateCategory="handleUpdateCategory" 
				/>
			</template>
		</calendar-view>

		<tu-calendar-dialog
			v-model="activateDialog"
			:categories="categories"
			:initial-data="dialogInitialData"
			:is-editing="isEditingEvent"
			@submit="handleSubmitEvent"
			@close="handleCloseDialog"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import CalendarView from "./CalendarView.vue";
import CalendarViewHeader from "./CalendarViewHeader.vue";
import TuCalendarDialog from "./TuCalendarDialog.vue";
import { ICalendarItem, TuCalendarServerModel, CalendarCategory } from "./ICalendarItem";
import { useCalendarApi } from "./composables/useCalendarApi";
import { useCalendarState } from "./composables/useCalendarState";
import dayjs from "dayjs";

import "./css/calendar-modern.scss";
import "./css/light-fixed.scss";

interface Props {
	modelValue?: ICalendarItem[];
	items?: ICalendarItem[];
	categories?: CalendarCategory[];
	model?: "local" | "server";
	serverSideConfig?: TuCalendarServerModel;
	components?: unknown;
	theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => [],
	items: () => [],
	categories: () => [],
	model: "local",
	serverSideConfig: () => ({} as TuCalendarServerModel),
	components: undefined,
	theme: "theme-default"
});

const emit = defineEmits<{
	onClickDay: [date?: Date];
	"update:modelValue": [value: ICalendarItem[]];
	categoriesUpdated: [category: CalendarCategory];
}>();

defineOptions({
	name: "TuCalendar"
});

// Initialize composables
const { loading, error, fetchEvents } = useCalendarApi();
const {
	events,
	categories,
	showDate,
	periodUOM,
	colorTheme,
	addEvent,
	updateEvent,
	deleteEvent,
	addCategory,
	setShowDate,
	setPeriod,
	setTheme
} = useCalendarState(props.items, props.categories);

// Dialog state - manage locally to avoid readonly issues
const activateDialog = ref(false);
const dialogInitialData = ref<Record<string, unknown>>({});
const isEditingEvent = ref(false);

// Initialize data based on model type
onMounted(async () => {
	if (props.model === "server" && props.serverSideConfig.ajaxUrl) {
		try {
			const serverEvents = await fetchEvents(props.serverSideConfig);
			// Update events through the composable
			serverEvents.forEach(event => addEvent(event));
		}
		catch (err) {
			console.error("Failed to fetch calendar events:", err);
			if (props.serverSideConfig.ajaxErrorFn) 
				props.serverSideConfig.ajaxErrorFn(err as Error);
			
		}
	}
});

// Set initial theme
setTheme(props.theme);

// Watch for prop changes
watch(() => props.items, (newItems) => {
	if (props.model === "local") {
		// Clear existing events and add new ones
		// Note: In a real implementation, you might want to implement
		// a more sophisticated sync mechanism
		newItems.forEach(item => {
			const exists = events.value.find(e => e.id === item.id);
			if (!exists) addEvent(item);
		});
	}
}, { deep: true });

watch(() => props.theme, (newTheme) => {
	setTheme(newTheme);
});

watch(events, (newEvents) => {
	emit("update:modelValue", newEvents);
}, { deep: true });

// Event handlers
const handleClickDay = (date: Date) => {
	emit("onClickDay", date);
	dialogInitialData.value = {
		startDate: dayjs(date).format("YYYY-MM-DD")
	};
	isEditingEvent.value = false;
	activateDialog.value = true; // Open dialog manually instead of using composable
};

const handleUpdateEvent = (eventData: ICalendarItem) => {
	const updatedEvent = updateEvent(eventData.id, eventData);
	if (updatedEvent) 
		emit("update:modelValue", events.value);
	
};

const handleDeleteEvent = (eventId: string) => {
	const deletedEvent = deleteEvent(eventId);
	if (deletedEvent) 
		emit("update:modelValue", events.value);
	
};

const handleSetShowDate = (date: Date) => {
	setShowDate(date);
};

const handleUpdatePeriod = (period: string) => {
	setPeriod(period);
};

const handleUpdateTheme = (theme: string) => {
	setTheme(theme);
};

const handleUpdateCategory = ([color, name]: [string, string]) => {
	const newCategory = addCategory(name, color);
	emit("categoriesUpdated", newCategory);
};

const handleSubmitEvent = (eventData: {
	title: string;
	startDate: string;
	endDate?: string;
	startTime?: string;
	endTime?: string;
	category?: string;
	isAllDay?: boolean;
}) => {
	try {
		if (isEditingEvent.value) {
			// Handle editing existing event
			// Implementation would depend on how editing is triggered
		}
		else {
			// Create new event
			let startDateTime: Date;
			let endDateTime: Date;
			
			if (eventData.isAllDay) {
				// For all-day events, ensure single-day events have identical start and end dates
				const targetDate = dayjs(eventData.startDate).startOf("day");
				startDateTime = targetDate.toDate();
				
				// If no explicit end date or same as start date, make it a true single-day event
				if (!eventData.endDate || eventData.endDate === eventData.startDate) 
					endDateTime = startDateTime; // Exact same date and time
				else 
					endDateTime = dayjs(eventData.endDate).startOf("day").toDate();
			} 
			else {
				// For timed events, use specific times
				startDateTime = dayjs(`${eventData.startDate} ${eventData.startTime || "09:00"}`).toDate();
				
				// For single-day timed events, ensure end is on same day
				const endDate = eventData.endDate || eventData.startDate;
				endDateTime = dayjs(`${endDate} ${eventData.endTime || "10:00"}`).toDate();
			}
			
			console.log("Creating event:", {
				title: eventData.title,
				startDate: startDateTime,
				endDate: endDateTime,
				sameDay: dayjs(startDateTime).format("YYYY-MM-DD") === dayjs(endDateTime).format("YYYY-MM-DD")
			});
			
			addEvent({
				title: eventData.title,
				startDate: startDateTime,
				endDate: endDateTime,
				category: eventData.category || undefined
			});
		}
		
		// Close the dialog after successful submission
		activateDialog.value = false;
		dialogInitialData.value = {};
		isEditingEvent.value = false;
		
		emit("update:modelValue", events.value);
	}
	catch (err) {
		console.error("Failed to submit event:", err);
	}
};

const handleCloseDialog = () => {
	activateDialog.value = false;
	dialogInitialData.value = {};
	isEditingEvent.value = false;
};
</script>

<style scoped>
.tu-calendar {
	/* Modern container with design system consistency */
	border-radius: var(--tu-radius, 12px);
	overflow: hidden;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
	background: var(--tu-background);
	border: 1px solid var(--tu-gray-4);
	box-shadow: var(--tu-elevated-2);
	transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
	
	/* Focus states for accessibility */
	&:focus-within {
		outline: 2px solid var(--tu-primary);
		outline-offset: 2px;
		box-shadow: var(--tu-elevated-3), 0 0 0 4px rgba(var(--tu-primary-rgb), 0.1);
	}
	
	/* Hover effects for better interactivity */
	&:hover {
		border-color: var(--tu-gray-3);
		box-shadow: var(--tu-elevated-3);
	}
	
	/* Theme variants */
	&.theme-default {
		--calendar-primary: var(--tu-primary);
		--calendar-text: var(--tu-text);
		--calendar-bg: var(--tu-background);
		--calendar-surface: var(--tu-component-background);
		--calendar-border: var(--tu-gray-4);
	}
	
	&.theme-dark {
		--calendar-primary: var(--tu-primary);
		--calendar-text: var(--tu-text-100);
		--calendar-bg: var(--tu-dark-3);
		--calendar-surface: var(--tu-dark-2);
		--calendar-border: var(--tu-dark-1);
		
		background: var(--calendar-bg);
		border-color: var(--calendar-border);
		color: var(--calendar-text);
	}
	
	&.theme-minimal {
		box-shadow: none;
		border: 1px solid var(--tu-gray-3);
		border-radius: var(--tu-radius, 8px);
	}
}

/* Loading state */
.tu-calendar[data-loading="true"] {
	opacity: 0.7;
	pointer-events: none;
	
	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 2rem;
		height: 2rem;
		border: 2px solid var(--tu-gray-4);
		border-top-color: var(--tu-primary);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}
}

/* Error state */
.tu-calendar[data-error="true"] {
	border-color: var(--tu-danger);
	
	&::before {
		content: '⚠️ Error loading calendar';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: var(--tu-danger);
		font-weight: 500;
		text-align: center;
		z-index: 10;
		background: var(--tu-background);
		padding: 1rem;
		border-radius: var(--tu-radius, 6px);
		box-shadow: var(--tu-elevated-2);
	}
}

/* Animations */
@keyframes spin {
	to {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.tu-calendar {
		border-radius: 0;
		border-left: none;
		border-right: none;
		box-shadow: none;
		
		&:focus-within {
			outline: none;
			box-shadow: inset 0 2px 0 var(--tu-primary);
		}
	}
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.tu-calendar {
		border-width: 2px;
		
		&:focus-within {
			outline-width: 3px;
		}
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.tu-calendar,
	.tu-calendar * {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
	}
}

/* Print styles */
@media print {
	.tu-calendar {
		box-shadow: none;
		border: 1px solid #000;
		background: white;
		color: black;
		
		/* Hide interactive elements in print */
		button,
		[role="button"] {
			display: none;
		}
	}
}
</style>
