import { ref, computed, watch, readonly } from "vue";
import { ICalendarItem } from "../ICalendarItem";
import dayjs from "dayjs";

interface NewEventForm {
	title: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	category: string;
	isAllDay: boolean;
}

export interface Category {
	name: string;
	color: string;
}

export function useCalendarState(initialEvents: ICalendarItem[] = [], initialCategories: Category[] = []) {
	const events = ref<ICalendarItem[]>([...initialEvents]);
	const categories = ref<Category[]>([...initialCategories]);
	const showDate = ref(new Date());
	const periodUOM = ref("month");
	const colorTheme = ref("theme-default");
	const activateDialog = ref(false);

	// Form state
	const newEventForm = ref<NewEventForm>({
		title: "",
		startDate: "",
		endDate: "",
		startTime: "09:00",
		endTime: "10:00",
		category: "",
		isAllDay: false
	});

	// Computed properties
	const hasEvents = computed(() => events.value.length > 0);
	const hasCategories = computed(() => categories.value.length > 0);

	// Form validation
	const isFormValid = computed(() => {
		return newEventForm.value.title.trim() !== "" &&
			newEventForm.value.startDate !== "" &&
			newEventForm.value.startTime !== "" &&
			newEventForm.value.endTime !== "";
	});

	// Watchers
	watch(() => newEventForm.value.isAllDay, (isAllDay) => {
		if (isAllDay) {
			newEventForm.value.startTime = "00:00";
			newEventForm.value.endTime = "23:59";
			if (!newEventForm.value.endDate)
				newEventForm.value.endDate = newEventForm.value.startDate;
		}
	});

	// Event management methods
	const addEvent = (eventData: Partial<ICalendarItem>) => {
		const newEvent: ICalendarItem = {
			id: generateEventId(),
			title: eventData.title || "",
			startDate: eventData.startDate || new Date(),
			endDate: eventData.endDate || eventData.startDate || new Date(),
			category: eventData.category || undefined,
			...eventData
		};
		events.value.push(newEvent);
		return newEvent;
	};

	const updateEvent = (eventId: string, updates: Partial<ICalendarItem>) => {
		const index = events.value.findIndex(event => event.id === eventId);
		if (index !== -1) {
			events.value[index] = { ...events.value[index], ...updates };
			return events.value[index];
		}
		return null;
	};

	const deleteEvent = (eventId: string) => {
		const index = events.value.findIndex(event => event.id === eventId);
		if (index !== -1) {
			const deletedEvent = events.value[index];
			events.value.splice(index, 1);
			return deletedEvent;
		}
		return null;
	};

	// Category management
	const addCategory = (name: string, color: string) => {
		const newCategory: Category = { name, color };
		categories.value.push(newCategory);
		return newCategory;
	};

	// Form handling
	const resetForm = () => {
		newEventForm.value = {
			title: "",
			startDate: "",
			endDate: "",
			startTime: "09:00",
			endTime: "10:00",
			category: "",
			isAllDay: false
		};
	};

	const submitForm = () => {
		if (!isFormValid.value) {
			throw new Error("Form validation failed");
		}

		const form = newEventForm.value;
		const startDateTime = dayjs(`${form.startDate} ${form.startTime}`).toDate();
		const endDateTime = dayjs(`${form.endDate || form.startDate} ${form.endTime}`).toDate();

		const newEvent = addEvent({
			title: form.title.trim(),
			startDate: startDateTime,
			endDate: endDateTime,
			category: form.category || undefined
		});

		resetForm();
		activateDialog.value = false;
		return newEvent;
	};

	const openCreateDialog = (date?: Date) => {
		resetForm();
		if (date) {
			newEventForm.value.startDate = dayjs(date).format("YYYY-MM-DD");
		}
		activateDialog.value = true;
	};

	const closeDialog = () => {
		activateDialog.value = false;
		resetForm();
	};

	// Date management
	const setShowDate = (date: Date) => {
		showDate.value = date;
	};

	const setPeriod = (period: string) => {
		periodUOM.value = period;
	};

	const setTheme = (theme: string) => {
		colorTheme.value = theme;
	};

	// Helper functions
	const generateEventId = (): string => {
		return "e" + Math.random().toString(36).substring(2, 11);
	};

	return {
		// State - return direct refs for mutability where needed
		events,
		categories,
		showDate: readonly(showDate),
		periodUOM: readonly(periodUOM),
		colorTheme: readonly(colorTheme),
		activateDialog, // Make this writable so it can be controlled by parent
		newEventForm: readonly(newEventForm),

		// Computed
		hasEvents,
		hasCategories,
		isFormValid,

		// Methods
		addEvent,
		updateEvent,
		deleteEvent,
		addCategory,
		resetForm,
		submitForm,
		openCreateDialog,
		closeDialog,
		setShowDate,
		setPeriod,
		setTheme
	};
}
