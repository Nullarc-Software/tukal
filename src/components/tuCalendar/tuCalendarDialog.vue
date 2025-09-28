<template>
	<tu-dialog width="550px" v-model="isOpen" @close="handleClose">
		<header v-if="$slots.dialogHeader">
			<slot name="dialogHeader" />
		</header>
		<header v-else>
			<h2 class="dialog-header">{{ isEditing ? 'Edit Event' : 'Create Event' }}</h2>
		</header>

		<div v-if="$slots.dialogContent" class="dialog-content">
			<slot name="dialogContent" />
		</div>
		<div v-else class="form-container">
			<form @submit.prevent="handleSubmit" class="event-form" novalidate>
				<div class="form-group">
					<label for="event-title" class="form-label">Title*</label>
					<tu-input 
						id="event-title"
						v-model="formData.title"
						:state="titleError ? 'danger' : 'primary'"
						placeholder="Event title"
						class="form-input"
						@blur="validateTitle"
						aria-required="true"
					/>
					<span v-if="titleError" class="error-message" role="alert">{{ titleError }}</span>
				</div>

				<div class="form-group">
					<tu-check-box v-model="formData.isAllDay" class="all-day-checkbox">
						All Day Event
					</tu-check-box>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="start-date" class="form-label">Start Date*</label>
						<tu-input 
							id="start-date"
							type="date" 
							v-model="formData.startDate"
							:state="startDateError ? 'danger' : 'primary'"
							class="form-input"
							@blur="validateStartDate"
							aria-required="true"
						/>
						<span v-if="startDateError" class="error-message" role="alert">{{ startDateError }}</span>
					</div>

					<div class="form-group" v-if="!formData.isAllDay">
						<label for="start-time" class="form-label">Start Time*</label>
						<tu-input 
							id="start-time"
							type="time" 
							v-model="formData.startTime"
							:state="startTimeError ? 'danger' : 'primary'"
							class="form-input"
							@blur="validateStartTime"
							aria-required="true"
						/>
						<span v-if="startTimeError" class="error-message" role="alert">{{ startTimeError }}</span>
					</div>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="end-date" class="form-label">End Date</label>
						<tu-input 
							id="end-date"
							type="date" 
							v-model="formData.endDate"
							class="form-input"
						/>
					</div>

					<div class="form-group" v-if="!formData.isAllDay">
						<label for="end-time" class="form-label">End Time*</label>
						<tu-input 
							id="end-time"
							type="time" 
							v-model="formData.endTime"
							:state="endTimeError ? 'danger' : 'primary'"
							class="form-input"
							@blur="validateEndTime"
							aria-required="true"
						/>
						<span v-if="endTimeError" class="error-message" role="alert">{{ endTimeError }}</span>
					</div>
				</div>

				<div class="form-group" v-if="categories.length > 0">
					<label for="event-category" class="form-label">Category</label>
					<tu-select id="event-category" v-model="formData.category" inline class="form-input">
						<tu-select-option value="" label="No Category">
							No Category
						</tu-select-option>
						<tu-select-option 
							v-for="category in categories" 
							:key="category.name" 
							:label="category.name"
							:value="category.name"
						>
							<span class="category-dot" :style="getCategoryStyle(category.color)"></span>
							{{ category.name }}
						</tu-select-option>
					</tu-select>
				</div>
			</form>
		</div>

		<template #footer>
			<div class="dialog-actions">
				<tu-button @click="handleClose" class="cancel-btn">
					Cancel
				</tu-button>
				<tu-button 
					success 
					@click="handleSubmit" 
					:disabled="!isFormValid || isSubmitting"
					class="submit-btn"
				>
					{{ isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
				</tu-button>
			</div>
		</template>
	</tu-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { isColor as checkIsColor, getColor } from "../../utils";
import dayjs from "dayjs";

interface Category {
	name: string;
	color: string;
}

interface EventFormData {
	title: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	category: string;
	isAllDay: boolean;
}

interface Props {
	modelValue: boolean;
	categories?: Category[];
	initialData?: Partial<EventFormData>;
	isEditing?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	categories: () => [],
	initialData: () => ({}),
	isEditing: false
});

defineOptions({
	name: "TuCalendarDialog"
});


const emit = defineEmits<{
	"update:modelValue": [value: boolean];
	submit: [data: EventFormData];
	close: [];
}>();

// Form state
const formData = ref<EventFormData>({
	title: "",
	startDate: "",
	endDate: "",
	startTime: "09:00",
	endTime: "10:00",
	category: "",
	isAllDay: false
});

const isSubmitting = ref(false);

// Validation state
const titleError = ref("");
const startDateError = ref("");
const startTimeError = ref("");
const endTimeError = ref("");

// Computed properties
const isOpen = computed({
	get: () => props.modelValue,
	set: (value: boolean) => emit("update:modelValue", value)
});

const isFormValid = computed(() => {
	return formData.value.title.trim() !== "" &&
		formData.value.startDate !== "" &&
		(!formData.value.isAllDay ? formData.value.startTime !== "" && formData.value.endTime !== "" : true) &&
		!titleError.value &&
		!startDateError.value &&
		!startTimeError.value &&
		!endTimeError.value;
});

// Watchers
watch(() => props.modelValue, (isOpen) => {
	if (isOpen) {
		resetForm();
		if (props.initialData) 
			Object.assign(formData.value, props.initialData);
		
		clearErrors();
		nextTick(() => {
			const titleInput = document.getElementById("event-title");
			if (titleInput) titleInput.focus();
		});
	}
});

watch(() => formData.value.isAllDay, (isAllDay) => {
	if (isAllDay) {
		formData.value.startTime = "00:00";
		formData.value.endTime = "23:59";
		if (!formData.value.endDate) 
			formData.value.endDate = formData.value.startDate;
		
		clearTimeErrors();
	}
});

watch(() => formData.value.startDate, (newStartDate) => {
	if (!formData.value.endDate || formData.value.isAllDay) 
		formData.value.endDate = newStartDate;
	
});

// Validation methods
const validateTitle = () => {
	titleError.value = formData.value.title.trim() === "" ? "Title is required" : "";
};

const validateStartDate = () => {
	if (formData.value.startDate === "") 
		startDateError.value = "Start date is required";
	 else {
		const today = dayjs().startOf("day");
		const selectedDate = dayjs(formData.value.startDate);
		if (selectedDate.isBefore(today)) 
			startDateError.value = "Start date cannot be in the past";
		 else 
			startDateError.value = "";
		
	}
};

const validateStartTime = () => {
	if (!formData.value.isAllDay && formData.value.startTime === "") 
		startTimeError.value = "Start time is required";
	 else {
		startTimeError.value = "";
		validateEndTime(); // Re-validate end time when start time changes
	}
};

const validateEndTime = () => {
	if (formData.value.isAllDay) {
		endTimeError.value = "";
		return;
	}

	if (formData.value.endTime === "") {
		endTimeError.value = "End time is required";
		return;
	}

	// Check if end time is after start time on the same day
	if (formData.value.startDate === formData.value.endDate) {
		const startTime = dayjs(`${formData.value.startDate} ${formData.value.startTime}`);
		const endTime = dayjs(`${formData.value.endDate || formData.value.startDate} ${formData.value.endTime}`);
		
		if (endTime.isBefore(startTime) || endTime.isSame(startTime)) {
			endTimeError.value = "End time must be after start time";
			return;
		}
	}

	endTimeError.value = "";
};

const clearErrors = () => {
	titleError.value = "";
	startDateError.value = "";
	startTimeError.value = "";
	endTimeError.value = "";
};

const clearTimeErrors = () => {
	startTimeError.value = "";
	endTimeError.value = "";
};

// Form handling
const resetForm = () => {
	formData.value = {
		title: "",
		startDate: dayjs().format("YYYY-MM-DD"),
		endDate: "",
		startTime: "09:00",
		endTime: "10:00",
		category: "",
		isAllDay: false
	};
};

const handleSubmit = async () => {
	// Validate all fields
	validateTitle();
	validateStartDate();
	if (!formData.value.isAllDay) {
		validateStartTime();
		validateEndTime();
	}

	if (!isFormValid.value) return;

	isSubmitting.value = true;

	try {
		emit("submit", { ...formData.value });
		// Close dialog after successful submission
		await nextTick(); // Wait for the event to be processed
		handleClose();
	}
	catch (error) {
		console.error("Error submitting form:", error);
	}
	finally {
		isSubmitting.value = false;
	}
};

const handleClose = () => {
	// Clear form data when closing
	resetForm();
	emit("close");
	emit("update:modelValue", false);
};

// Utility methods
const getCategoryStyle = (categoryColor: string) => {
	let background;
	if (/^(rgb|rgba)/.test(categoryColor)) 
		background = categoryColor;
	else 
		background = `rgba(${getColor(categoryColor, 0.6)})`;
	
	return { background };
};
</script>

<style scoped>
.dialog-header {
	text-align: center;
	margin: 0 0 1.5rem 0;
	color: var(--tu-text);
	font-size: 1.25rem;
	font-weight: 600;
}

.form-container {
	padding: 0;
}

.event-form {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.form-row {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	align-items: start;
}

.form-label {
	font-weight: 600;
	color: var(--tu-text);
	font-size: 0.875rem;
	margin-bottom: 0.25rem;
}

.form-input {
	width: 100%;
	transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.all-day-checkbox {
	align-self: flex-start;
	margin: 0.5rem 0;
}

.error-message {
	color: var(--tu-danger);
	font-size: 0.75rem;
	font-weight: 500;
	margin-top: 0.25rem;
	display: flex;
	align-items: center;
	gap: 0.25rem;
	
	&::before {
		content: '⚠️';
		font-size: 0.75rem;
	}
}

.category-dot {
	display: inline-block;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	margin-right: 0.5rem;
	vertical-align: middle;
	border: 1px solid rgba(var(--tu-text-rgb), 0.2);
}

.dialog-actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
	padding-top: 1.5rem;
	border-top: 1px solid var(--tu-gray-4);
	margin-top: 1rem;
}

.cancel-btn {
	background: var(--tu-gray-2);
	color: var(--tu-text);
	border: 1px solid var(--tu-gray-4);
	transition: all 0.2s ease;
	
	&:hover {
		background: var(--tu-gray-3);
		border-color: var(--tu-gray-3);
	}
}

.submit-btn {
	transition: all 0.2s ease;
	
	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}
	
	&:not(:disabled):hover {
		transform: translateY(-1px);
		box-shadow: var(--tu-elevated-2);
	}
}

/* Enhanced form validation styling */
.form-group.has-error .form-input {
	border-color: var(--tu-danger);
	box-shadow: 0 0 0 3px rgba(var(--tu-danger-rgb), 0.1);
}

.form-group.has-success .form-input {
	border-color: var(--tu-success);
}

/* Loading state for submit button */
.submit-btn[data-loading="true"] {
	position: relative;
	
	&::after {
		content: '';
		position: absolute;
		width: 1rem;
		height: 1rem;
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
		margin-left: 0.5rem;
	}
}

/* Responsive design */
@media (max-width: 600px) {
	.form-row {
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	
	.dialog-actions {
		flex-direction: column-reverse;
		gap: 0.5rem;
		
		button {
			width: 100%;
		}
	}
	
	.dialog-header {
		font-size: 1.125rem;
	}
}

/* Focus management for better accessibility */
.form-input:focus {
	outline: 2px solid var(--tu-primary);
	outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.form-label {
		font-weight: 700;
	}
	
	.error-message {
		border-left: 3px solid var(--tu-danger);
		padding-left: 0.5rem;
	}
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
	.dialog-header {
		color: var(--tu-text-100);
	}
	
	.form-label {
		color: var(--tu-text-100);
	}
	
	.cancel-btn {
		background: var(--tu-dark-2);
		color: var(--tu-text-100);
		border-color: var(--tu-dark-1);
		
		&:hover {
			background: var(--tu-dark-1);
		}
	}
	
	.dialog-actions {
		border-color: var(--tu-dark-1);
	}
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
