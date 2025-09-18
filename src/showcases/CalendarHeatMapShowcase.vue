<template>
	<div class="showcase-component">
		<h3>Calendar HeatMap:</h3>
		<hr />
		
		<!-- Basic HeatMap -->
		<div style="margin: 20px 0;">
			<h4>Basic HeatMap:</h4>
			<tu-calendar-heat-map :values="basicData" />
		</div>

		<!-- Different Color Ranges -->
		<div style="margin: 20px 0;">
			<h4>Different Color Ranges:</h4>
			<p>GitHub Style (Green):</p>
			<tu-calendar-heat-map :values="basicData" :range-color="['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']" />
			<br />
			<p>Blue Theme:</p>
			<tu-calendar-heat-map :values="basicData" :range-color="['#f0f8ff', '#87ceeb', '#4682b4', '#1e90ff', '#0000cd']" />
			<br />
			<p>Red Theme:</p>
			<tu-calendar-heat-map :values="basicData" :range-color="['#ffe0e0', '#ffb3b3', '#ff8080', '#ff4d4d', '#cc0000']" />
		</div>

		<!-- Different Max Values -->
		<div style="margin: 20px 0;">
			<h4>Different Max Values:</h4>
			<div style="display: flex; gap: 10px; margin-bottom: 10px;">
				<TuButton @click="maxValue = 5" :active="maxValue === 5" size="sm">Max 5</TuButton>
				<TuButton @click="maxValue = 10" :active="maxValue === 10" size="sm">Max 10</TuButton>
				<TuButton @click="maxValue = 20" :active="maxValue === 20" size="sm">Max 20</TuButton>
			</div>
			<tu-calendar-heat-map :values="dynamicData" :max="maxValue" />
		</div>

		<!-- Different Date Ranges -->
		<div style="margin: 20px 0;">
			<h4>Different Date Ranges:</h4>
			<div style="display: flex; gap: 10px; margin-bottom: 10px;">
				<TuButton @click="dateRange = 'year'" :active="dateRange === 'year'" size="sm">Full Year</TuButton>
				<TuButton @click="dateRange = 'halfYear'" :active="dateRange === 'halfYear'" size="sm">6 Months</TuButton>
				<TuButton @click="dateRange = 'quarter'" :active="dateRange === 'quarter'" size="sm">3 Months</TuButton>
			</div>
			<tu-calendar-heat-map 
				:values="getDateRangeData()" 
				:end-date="getEndDate()" 
				:start-date="getStartDate()" 
			/>
		</div>

		<!-- Vertical Layout -->
		<div style="margin: 20px 0;">
			<h4>Vertical Layout:</h4>
			<tu-calendar-heat-map :values="basicData" vertical />
		</div>

		<!-- With Tooltips -->
		<div style="margin: 20px 0;">
			<h4>With Custom Tooltips:</h4>
			<tu-calendar-heat-map 
				:values="tooltipData" 
				@click="handleCellClick"
				:tooltip-enabled="true"
			/>
		</div>

		<!-- Interactive Demo -->
		<div style="margin: 20px 0;">
			<h4>Interactive Demo:</h4>
			<div style="margin-bottom: 10px;">
				<TuButton @click="generateRandomData" success size="sm">Generate Random Data</TuButton>
				<TuButton @click="clearData" danger size="sm" style="margin-left: 10px;">Clear Data</TuButton>
				<TuButton @click="addTodayData" primary size="sm" style="margin-left: 10px;">Add Today</TuButton>
			</div>
			<p><strong>Total Days with Data:</strong> {{ interactiveData.length }}</p>
			<tu-calendar-heat-map 
				:values="interactiveData" 
				@click="handleInteractiveClick"
			/>
		</div>

		<!-- Rounded Squares -->
		<div style="margin: 20px 0;">
			<h4>Rounded Squares:</h4>
			<tu-calendar-heat-map :values="basicData" :round="3" />
		</div>

		<!-- No Border -->
		<div style="margin: 20px 0;">
			<h4>No Border:</h4>
			<tu-calendar-heat-map :values="basicData" :no-border="true" />
		</div>

		<!-- Commit Activity Simulation -->
		<div style="margin: 20px 0;">
			<h4>GitHub-like Commit Activity:</h4>
			<p style="margin-bottom: 10px;">Simulating a developer's commit activity over the year</p>
			<tu-calendar-heat-map 
				:values="commitActivityData" 
				:range-color="['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']"
				:max="10"
			/>
			<div style="margin-top: 10px; font-size: 12px; color: #666;">
				<span>Less</span>
				<span v-for="i in 5" :key="i" 
					  style="display: inline-block; width: 10px; height: 10px; margin: 0 2px; border-radius: 2px;"
					  :style="{ backgroundColor: getCommitColor(i-1) }"></span>
				<span>More</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { tuButton as TuButton } from "../components/tuButton";
// Basic configuration
const maxValue = ref(10);
const dateRange = ref("year");

// Sample data
const basicData = ref([
	{ date: "2024-01-01", count: 3 },
	{ date: "2024-01-02", count: 7 },
	{ date: "2024-01-03", count: 2 },
	{ date: "2024-01-15", count: 5 },
	{ date: "2024-02-01", count: 8 },
	{ date: "2024-02-14", count: 12 },
	{ date: "2024-03-01", count: 4 },
	{ date: "2024-03-17", count: 6 },
	{ date: "2024-04-01", count: 9 },
	{ date: "2024-05-01", count: 3 },
	{ date: "2024-06-01", count: 7 },
	{ date: "2024-07-04", count: 11 },
	{ date: "2024-08-01", count: 5 },
	{ date: "2024-09-01", count: 8 },
	{ date: "2024-10-31", count: 15 },
	{ date: "2024-11-01", count: 6 },
	{ date: "2024-12-25", count: 10 }
]);

// Dynamic data based on max value
const dynamicData = computed(() => {
	return basicData.value.map(item => ({
		...item,
		count: Math.min(item.count, maxValue.value)
	}));
});

// Tooltip data
const tooltipData = ref([
	{ date: "2024-01-01", count: 3, tooltip: "New Year: 3 activities" },
	{ date: "2024-02-14", count: 8, tooltip: "Valentine's Day: 8 activities" },
	{ date: "2024-07-04", count: 11, tooltip: "Independence Day: 11 activities" },
	{ date: "2024-10-31", count: 15, tooltip: "Halloween: 15 activities" },
	{ date: "2024-12-25", count: 10, tooltip: "Christmas: 10 activities" }
]);

// Interactive data
const interactiveData = ref([...basicData.value]);

// Commit activity data (GitHub-like)
const commitActivityData = ref(generateCommitActivity());

// Methods
function generateCommitActivity() {
	const data = [];
	const startDate = new Date(2024, 0, 1);
	const endDate = new Date(2024, 11, 31);
	
	for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
		// Simulate realistic commit patterns
		const isWeekend = d.getDay() === 0 || d.getDay() === 6;
		const isHoliday = (d.getMonth() === 11 && d.getDate() === 25) || (d.getMonth() === 0 && d.getDate() === 1);
		
		let probability = 0.3; // Base probability
		if (isWeekend) probability *= 0.3; // Less commits on weekends
		if (isHoliday) probability *= 0.1; // Very few commits on holidays
		
		if (Math.random() < probability) {
			const count = Math.floor(Math.random() * 10) + 1;
			data.push({
				date: d.toISOString().split('T')[0],
				count: count
			});
		}
	}
	
	return data;
}

function getCommitColor(index: number): string {
	const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
	return colors[index] || colors[0];
}

function getDateRangeData() {
	const now = new Date();
	let startDate: Date;
	
	switch (dateRange.value) {
		case 'halfYear':
			startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
			break;
		case 'quarter':
			startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
			break;
		default:
			startDate = new Date(now.getFullYear(), 0, 1);
	}
	
	return basicData.value.filter(item => {
		const itemDate = new Date(item.date);
		return itemDate >= startDate && itemDate <= now;
	});
}

function getStartDate(): Date {
	const now = new Date();
	switch (dateRange.value) {
		case 'halfYear':
			return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
		case 'quarter':
			return new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
		default:
			return new Date(now.getFullYear(), 0, 1);
	}
}

function getEndDate(): Date {
	return new Date();
}

function handleCellClick(data: { date: string; count: number }) {
	alert(`Clicked on ${data.date} with ${data.count} activities`);
}

function handleInteractiveClick(data: { date: string; count: number }) {
	console.log("Interactive click:", data);
}

function generateRandomData() {
	const data = [];
	const startDate = new Date(2024, 0, 1);
	const endDate = new Date();
	
	// Generate random data for 50-100 days
	const numberOfDays = Math.floor(Math.random() * 50) + 50;
	
	for (let i = 0; i < numberOfDays; i++) {
		const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
		const count = Math.floor(Math.random() * 15) + 1;
		
		data.push({
			date: randomDate.toISOString().split('T')[0],
			count: count
		});
	}
	
	interactiveData.value = data;
}

function clearData() {
	interactiveData.value = [];
}

function addTodayData() {
	const today = new Date().toISOString().split('T')[0];
	const existingIndex = interactiveData.value.findIndex(item => item.date === today);
	
	if (existingIndex >= 0) {
		interactiveData.value[existingIndex].count += 1;
	} else {
		interactiveData.value.push({
			date: today,
			count: 1
		});
	}
}
</script>
