<template>
	<div class="showcase-component">
		<h3>Calendar:</h3>
		<hr />
		
		<!-- Basic Calendar -->
		<div style="margin: 20px 0;">
			<h4>Basic Calendar:</h4>
			<tu-calendar />
		</div>

		<!-- Calendar with Events -->
		<div style="margin: 20px 0;">
			<h4>Calendar with Events:</h4>
			<tu-calendar 
				:events="sampleEvents" 
				:event-categories="eventCategories"
				@create-event="handleCreateEvent"
				@edit-event="handleEditEvent"
				@delete-event="handleDeleteEvent" 
			/>
		</div>

		<!-- Different Views -->
		<div style="margin: 20px 0;">
			<h4>Different Calendar Views:</h4>
			<div style="display: flex; gap: 10px; margin-bottom: 10px;">
				<TuButton 
					@click="calendarView = 'month'" 
					:active="calendarView === 'month'"
					size="sm"
				>
					Month
				</TuButton>
				<TuButton 
					@click="calendarView = 'week'" 
					:active="calendarView === 'week'"
					size="sm"
				>
					Week
				</TuButton>
				<TuButton 
					@click="calendarView = 'day'" 
					:active="calendarView === 'day'"
					size="sm"
				>
					Day
				</TuButton>
			</div>
			<tu-calendar 
				:period-uom="calendarView" 
				:events="sampleEvents"
				:event-categories="eventCategories"
			/>
		</div>

		<!-- Themed Calendar -->
		<div style="margin: 20px 0;">
			<h4>Themed Calendar:</h4>
			<div style="display: flex; gap: 10px; margin-bottom: 10px;">
				<TuButton 
					@click="theme = 'light'" 
					:active="theme === 'light'"
					size="sm"
				>
					Light
				</TuButton>
				<TuButton 
					@click="theme = 'dark'" 
					:active="theme === 'dark'"
					size="sm"
				>
					Dark
				</TuButton>
			</div>
			<tu-calendar 
				:color-theme="theme"
				:events="sampleEvents"
				:event-categories="eventCategories"
			/>
		</div>

		<!-- Custom Event Categories -->
		<div style="margin: 20px 0;">
			<h4>Custom Event Categories:</h4>
			<div style="margin-bottom: 10px;">
				<strong>Categories:</strong>
				<span v-for="category in eventCategories" :key="category.name" 
					style="margin-left: 10px; padding: 2px 8px; border-radius: 4px; font-size: 12px;"
					:style="{ backgroundColor: category.color, color: 'white' }">
					{{ category.name }}
				</span>
			</div>
			<tu-calendar 
				:events="categorizedEvents"
				:event-categories="eventCategories"
			/>
		</div>

		<!-- Calendar with Custom Dialog Content -->
		<div style="margin: 20px 0;">
			<h4>Calendar with Custom Dialog:</h4>
			<tu-calendar :events="sampleEvents">
				<template #dialogHeader>
					<h3 style="color: #7d33ff;">🎉 Create New Event</h3>
				</template>
				<template #dialogContent>
					<div style="padding: 20px;">
						<TuInput 
							v-model="customEventTitle" 
							placeholder="Event Title" 
							label="Title"
							style="margin-bottom: 15px;"
						/>
						<TuInput 
							v-model="customEventDescription" 
							placeholder="Event Description" 
							label="Description"
							style="margin-bottom: 15px;"
						/>
						<TuSelect 
							v-model="customEventCategory"
							placeholder="Select Category"
							label="Category"
							:select-items="categoryOptions"
						/>
					</div>
				</template>
			</tu-calendar>
		</div>

		<!-- Event Creation Demo -->
		<div style="margin: 20px 0;">
			<h4>Event Management Demo:</h4>
			<div style="margin-bottom: 10px;">
				<TuButton @click="addRandomEvent" success size="sm">
					Add Random Event
				</TuButton>
				<TuButton @click="clearEvents" danger size="sm" style="margin-left: 10px;">
					Clear All Events
				</TuButton>
			</div>
			<p><strong>Events Count:</strong> {{ demoEvents.length }}</p>
			<tu-calendar 
				:events="demoEvents"
				:event-categories="eventCategories"
				@create-event="addDemoEvent"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { TuButton } from "../components/tuButton";
import { TuInput } from "../components/tuInput";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Calendar view and theme
const calendarView = ref("month");
const theme = ref("light");

// Event categories
const eventCategories = ref([
	{ name: "Work", color: "#3788d8" },
	{ name: "Personal", color: "#ff6b6b" },
	{ name: "Meeting", color: "#4ecdc4" },
	{ name: "Holiday", color: "#ffa726" },
	{ name: "Important", color: "#e74c3c" }
]);

// Sample events
const sampleEvents = ref([
	{
		id: 1,
		title: "Team Meeting",
		startDate: new Date(2024, 2, 15, 9, 0),
		endDate: new Date(2024, 2, 15, 10, 30),
		category: "Meeting"
	},
	{
		id: 2,
		title: "Project Deadline",
		startDate: new Date(2024, 2, 20, 17, 0),
		endDate: new Date(2024, 2, 20, 18, 0),
		category: "Work"
	},
	{
		id: 3,
		title: "Birthday Party",
		startDate: new Date(2024, 2, 25, 19, 0),
		endDate: new Date(2024, 2, 25, 22, 0),
		category: "Personal"
	}
]);

// Categorized events
const categorizedEvents = ref([
	{
		id: 1,
		title: "Sprint Planning",
		startDate: new Date(2024, 2, 10, 10, 0),
		endDate: new Date(2024, 2, 10, 12, 0),
		category: "Work"
	},
	{
		id: 2,
		title: "Doctor Appointment",
		startDate: new Date(2024, 2, 12, 14, 0),
		endDate: new Date(2024, 2, 12, 15, 0),
		category: "Personal"
	},
	{
		id: 3,
		title: "Client Meeting",
		startDate: new Date(2024, 2, 14, 11, 0),
		endDate: new Date(2024, 2, 14, 12, 30),
		category: "Meeting"
	},
	{
		id: 4,
		title: "Christmas",
		startDate: new Date(2024, 11, 25),
		endDate: new Date(2024, 11, 25),
		category: "Holiday"
	},
	{
		id: 5,
		title: "Project Review",
		startDate: new Date(2024, 2, 28, 15, 0),
		endDate: new Date(2024, 2, 28, 17, 0),
		category: "Important"
	}
]);

// Custom dialog form
const customEventTitle = ref("");
const customEventDescription = ref("");
const customEventCategory = ref("");

const categoryOptions = ref(
	eventCategories.value.map(cat => ({ 
		label: cat.name, 
		value: cat.name 
	}))
);

// Demo events management
const demoEvents = ref([...sampleEvents.value]);

// Event handlers
const handleCreateEvent = (eventData: Record<string, unknown>) => {
	console.log("Creating event:", eventData);
};

const handleEditEvent = (eventData: Record<string, unknown>) => {
	console.log("Editing event:", eventData);
};

const handleDeleteEvent = (eventId: string | number) => {
	console.log("Deleting event:", eventId);
	const index = demoEvents.value.findIndex(event => event.id === eventId);
	if (index > -1) 
		demoEvents.value.splice(index, 1);
};

const addDemoEvent = (eventData: Record<string, unknown>) => {
	const newEvent = {
		id: Date.now(),
		title: (eventData.title as string) || "New Event",
		startDate: (eventData.startDate as Date) || new Date(),
		endDate: (eventData.endDate as Date) || new Date(),
		category: (eventData.category as string) || "Work"
	};
	demoEvents.value.push(newEvent);
};

const addRandomEvent = () => {
	const titles = ["Conference Call", "Code Review", "Lunch Break", "Training", "Workshop"];
	const categories = eventCategories.value.map(cat => cat.name);
	const randomDate = new Date();
	randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30));
	
	const newEvent = {
		id: Date.now(),
		title: titles[Math.floor(Math.random() * titles.length)],
		startDate: randomDate,
		endDate: new Date(randomDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
		category: categories[Math.floor(Math.random() * categories.length)]
	};
	
	demoEvents.value.push(newEvent);
};

const clearEvents = () => {
	demoEvents.value = [];
};
</script>
