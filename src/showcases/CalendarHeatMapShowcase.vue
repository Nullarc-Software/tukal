<!--
/**
 * @fileoverview CalendarHeatMapShowcase - Comprehensive showcase for TuCalendarHeatMap component
 * @component CalendarHeatMapShowcase
 * @author Tukal UI Library
 * @since 1.0.0
 */
-->
<template>
	<div class="showcase-component">
		<h3>Calendar HeatMap Showcase</h3>
		<hr />
		
		<!-- Basic HeatMap -->
		<div class="showcase-section">
			<h4>Basic Calendar HeatMap</h4>
			<p>A simple calendar heatmap displaying activity data over time periods.</p>
			<div class="demo-container">
				<TuCalendarHeatMap :values="basicData" :year="2024" />
			</div>
		</div>

		<!-- Different Color Themes -->
		<div class="showcase-section">
			<h4>Color Themes</h4>
			<p>Explore different color schemes for various visual preferences.</p>
			
			<div class="demo-container">
				<div class="theme-selector">
					<TuButton 
						v-for="theme in colorThemes" 
						:key="theme.name"
						@click="selectedTheme = theme.name" 
						:active="selectedTheme === theme.name" 
						size="sm"
					>
						{{ theme.label }}
					</TuButton>
				</div>
				<TuCalendarHeatMap 
					:values="basicData" 
					:year="2024"
					:range-color="getCurrentThemeColors()" 
				/>
			</div>
		</div>

		<!-- Interactive Configuration -->
		<div class="showcase-section">
			<h4>Interactive Configuration</h4>
			<p>Adjust maximum values and date ranges to see how the heatmap adapts.</p>
			
			<div class="demo-container">
				<div class="config-row">
					<div class="config-group">
						<label>Max Value:</label>
						<div class="button-group">
							<TuButton 
								v-for="max in maxOptions" 
								:key="max"
								@click="maxValue = max" 
								:active="maxValue === max" 
								size="sm"
							>
								{{ max }}
							</TuButton>
						</div>
					</div>
					
					<div class="config-group">
						<label>Date Range:</label>
						<div class="button-group">
							<TuButton 
								v-for="range in dateRangeOptions" 
								:key="range.value"
								@click="dateRange = range.value" 
								:active="dateRange === range.value" 
								size="sm"
							>
								{{ range.label }}
							</TuButton>
						</div>
					</div>
				</div>
				
				<TuCalendarHeatMap 
					:values="getFilteredData()" 
					:max="maxValue"
					:year="2024" 
				/>
				
				<div class="stats">
					<p><strong>Total Data Points:</strong> {{ getFilteredData().length }}</p>
					<p><strong>Date Range:</strong> {{ getDateRangeDescription() }}</p>
				</div>
			</div>
		</div>

		<!-- Vertical Layout -->
		<div class="showcase-section">
			<h4>Vertical Orientation</h4>
			<p>Display the heatmap in vertical orientation for different layout needs.</p>
			<div class="demo-container">
				<TuCalendarHeatMap 
					:values="basicData" 
					:year="2024"
					vertical 
				/>
			</div>
		</div>

		<!-- Custom Tooltips -->
		<div class="showcase-section">
			<h4>Custom Tooltips & Interactions</h4>
			<p>Click on cells to see custom tooltip functionality and event handling.</p>
			<div class="demo-container">
				<TuCalendarHeatMap 
					:values="tooltipData" 
					:year="2024"
					:tooltip="true"
					:tooltip-unit="'activities'"
					:tooltip-formatter="customTooltipFormatter"
					@day-click="handleDayClick"
				/>
				<div v-if="lastClickedDay" class="click-info">
					<p><strong>Last clicked:</strong> {{ formatClickedDay(lastClickedDay) }}</p>
				</div>
			</div>
		</div>

		<!-- Interactive Data Management -->
		<div class="showcase-section">
			<h4>Interactive Data Management</h4>
			<p>Dynamically modify the heatmap data and see real-time updates.</p>
			<div class="demo-container">
				<div class="action-buttons">
					<TuButton @click="generateRandomData" color="success" size="sm">
						Generate Random Data
					</TuButton>
					<TuButton @click="addTodayData" color="primary" size="sm">
						Add Random Activity
					</TuButton>
					<TuButton @click="clearData" color="danger" size="sm">
						Clear All Data
					</TuButton>
				</div>
				
				<TuCalendarHeatMap 
					:values="interactiveData" 
					:year="2024"
					@day-click="handleInteractiveClick"
					tooltip-unit="deployments"
				/>
				
				<div class="stats">
					<p><strong>Total Days with Data:</strong> {{ interactiveData.length }}</p>
					<p><strong>Total Activities:</strong> {{ getTotalActivities(interactiveData) }}</p>
				</div>
			</div>
		</div>

		<!-- Multi-Year Navigation -->
		<div class="showcase-section">
			<h4>Multi-Year Navigation</h4>
			<p>When data spans multiple years, navigation arrows appear to browse between years.</p>
			<div class="demo-container">
				<TuCalendarHeatMap 
					:values="multiYearData" 
					:tooltip-unit="'activities'"
				/>
				<div class="stats">
					<p><strong>Data Range:</strong> 2022 - 2024</p>
					<p><strong>Total Activities:</strong> {{ getTotalActivities(multiYearData) }}</p>
					<p style="margin-top: 0.5rem; font-style: italic;">Use the arrows next to the legend to navigate between years.</p>
				</div>
			</div>
		</div>

		<!-- GitHub-style Contribution Chart -->
		<div class="showcase-section">
			<h4>GitHub-style Contribution Chart</h4>
			<p>Simulate a developer's contribution activity with realistic patterns.</p>
			<div class="demo-container">
				<TuCalendarHeatMap 
					:values="commitActivityData" 
					:year="2024"
					:range-color="githubColors"
					:tooltip-unit="'contributions'"
				/>
				<div class="github-legend">
					<span class="legend-label">Less</span>
					<div class="color-squares">
						<span 
							v-for="(color, index) in githubColors" 
							:key="index"
							class="color-square"
							:style="{ backgroundColor: color }"
						></span>
					</div>
					<span class="legend-label">More</span>
				</div>
			</div>
		</div>

		<!-- Styling Options -->
		<div class="showcase-section">
			<h4>Styling Options</h4>
			<p>Explore different visual styling options available.</p>
			<div class="demo-container">
				<div class="style-options">
					<div class="option-group">
						<label>
							<input 
								type="checkbox" 
								v-model="stylingOptions.rounded" 
							/>
							Rounded corners
						</label>
					</div>
					<div class="option-group">
						<label>
							<input 
								type="checkbox" 
								v-model="stylingOptions.darkTheme" 
							/>
							Dark theme
						</label>
					</div>
				</div>
				
				<TuCalendarHeatMap 
					:values="basicData"
					:year="2024" 
					:round="stylingOptions.rounded ? 3 : 0"
					:dark="stylingOptions.darkTheme"
					:class="{ 'tu-dark-theme': stylingOptions.darkTheme }"
				/>
			</div>
		</div>

		<!-- API Reference -->
		<div class="showcase-section">
			<h4>Component API</h4>
			<div class="api-table">
				<table>
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>values</code></td>
							<td>Array</td>
							<td>Required</td>
							<td>Array of data objects with date and count</td>
						</tr>
						<tr>
							<td><code>year</code></td>
							<td>Number</td>
							<td>Optional</td>
							<td>Year to display (auto-detects most recent year from data if not provided)</td>
						</tr>
						<tr>
							<td><code>max</code></td>
							<td>Number</td>
							<td>Auto-calculated</td>
							<td>Maximum value for color intensity</td>
						</tr>
						<tr>
							<td><code>rangeColor</code></td>
							<td>Array</td>
							<td>Theme colors</td>
							<td>Array of colors for intensity scale</td>
						</tr>
						<tr>
							<td><code>vertical</code></td>
							<td>Boolean</td>
							<td>false</td>
							<td>Display in vertical orientation</td>
						</tr>
						<tr>
							<td><code>tooltip</code></td>
							<td>Boolean</td>
							<td>true</td>
							<td>Enable tooltip functionality</td>
						</tr>
						<tr>
							<td><code>round</code></td>
							<td>Number</td>
							<td>0</td>
							<td>Border radius for squares</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { tuButton as TuButton } from "../components/tuButton";
import TuCalendarHeatMap from "../components/tuCalendarHeatMap";
import type { TuHeatmapValue, TuHeatmapCalendarItem } from "../components/tuCalendarHeatMap";

defineOptions({
	name: "CalendarHeatMapShowcase"
});

// Reactive state
const selectedTheme = ref<string>("default");
const maxValue = ref<number>(10);
const dateRange = ref<string>("year");
const lastClickedDay = ref<TuHeatmapCalendarItem | null>(null);

// Styling options
const stylingOptions = ref({
	rounded: false,
	darkTheme: false
});

// Color themes configuration
const colorThemes = [
	{ 
		name: "default", 
		label: "Default", 
		colors: ["var(--tu-gray-2)", "#195bff1a", "#195bff4d", "#195bff99", "#195bffcc", "#195bff"] 
	},
	{ 
		name: "github", 
		label: "GitHub", 
		colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"] 
	},
	{ 
		name: "blue", 
		label: "Blue", 
		colors: ["#f0f8ff", "#87ceeb", "#4682b4", "#1e90ff", "#0000cd"] 
	},
	{ 
		name: "red", 
		label: "Red", 
		colors: ["#ffe0e0", "#ffb3b3", "#ff8080", "#ff4d4d", "#cc0000"] 
	}
];

const maxOptions = [5, 10, 15, 20];
const dateRangeOptions = [
	{ value: "year", label: "Full Year" },
	{ value: "halfYear", label: "6 Months" },
	{ value: "quarter", label: "3 Months" }
];

const githubColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

// Sample data
const basicData = ref<TuHeatmapValue[]>([
	{ date: "2024-01-01", count: 3 },
	{ date: "2024-01-02", count: 7 },
	{ date: "2024-01-03", count: 2 },
	{ date: "2024-01-15", count: 5 },
	{ date: "2024-02-01", count: 8 },
	{ date: "2024-02-14", count: 32 },
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

// Tooltip data with enhanced information
const tooltipData = ref<TuHeatmapValue[]>([
	{ date: "2024-01-01", count: 3 },
	{ date: "2024-02-14", count: 8 },
	{ date: "2024-07-04", count: 11 },
	{ date: "2024-10-31", count: 15 },
	{ date: "2024-12-25", count: 10 }
]);

// Interactive data
const interactiveData = ref<TuHeatmapValue[]>([...basicData.value]);

// Commit activity data
const commitActivityData = ref<TuHeatmapValue[]>(generateCommitActivity());

// Multi-year data for testing year navigation
const multiYearData = ref<TuHeatmapValue[]>(generateMultiYearData());

// Computed properties
const getCurrentThemeColors = computed(() => (): string[] => {
	const theme = colorThemes.find(t => t.name === selectedTheme.value);
	return theme ? theme.colors : colorThemes[0].colors;
});

// Methods
/**
 * Generate realistic commit activity data
 */
function generateCommitActivity(): TuHeatmapValue[] {
	const data: TuHeatmapValue[] = [];
	const startDate = new Date(2024, 0, 1);
	const endDate = new Date(2024, 11, 31);
	
	for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
		// Simulate realistic commit patterns
		const isWeekend = d.getDay() === 0 || d.getDay() === 6;
		const isHoliday = (d.getMonth() === 11 && d.getDate() === 25) || (d.getMonth() === 0 && d.getDate() === 1);
		
		let probability = 0.3; // Base probability
		if (isWeekend) 
			probability *= 0.3; // Less commits on weekends
		if (isHoliday) 
			probability *= 0.1; // Very few commits on holidays
		
		if (Math.random() < probability) {
			const count = Math.floor(Math.random() * 10) + 1;
			data.push({
				date: d.toISOString().split("T")[0],
				count
			});
		}
	}
	
	return data;
}

/**
 * Generate multi-year data for testing year navigation
 */
function generateMultiYearData(): TuHeatmapValue[] {
	const data: TuHeatmapValue[] = [];
	const startYear = 2022;
	const endYear = 2024;
	
	for (let year = startYear; year <= endYear; year++) {
		const yearStart = new Date(year, 0, 1);
		const yearEnd = new Date(year, 11, 31);
		
		for (let d = new Date(yearStart); d <= yearEnd; d.setDate(d.getDate() + 1)) {
			const isWeekend = d.getDay() === 0 || d.getDay() === 6;
			
			let probability = 0.25;
			if (isWeekend) 
				probability *= 0.4;
			
			if (Math.random() < probability) {
				const count = Math.floor(Math.random() * 15) + 1;
				data.push({
					date: d.toISOString().split("T")[0],
					count
				});
			}
		}
	}
	
	return data;
}

/**
 * Get filtered data based on current date range selection
 */
function getFilteredData(): TuHeatmapValue[] {
	const endOfYear = new Date("2024-12-31");
	let startDate: Date;
	
	switch (dateRange.value) {
	case "halfYear":
		startDate = new Date(2024, 5, 1); // June 1, 2024
		break;
	case "quarter":
		startDate = new Date(2024, 8, 1); // September 1, 2024
		break;
	default:
		startDate = new Date(2024, 0, 1); // January 1, 2024
	}
	
	return basicData.value.filter(item => {
		const itemDate = new Date(item.date);
		return itemDate >= startDate && itemDate <= endOfYear;
	});
}

/**
 * Get description of current date range
 */
function getDateRangeDescription(): string {
	const ranges: Record<string, string> = {
		year: "Full Year (January - December)",
		halfYear: "Last 6 Months",
		quarter: "Last 3 Months"
	};
	return ranges[dateRange.value] || "Full Year";
}

/**
 * Calculate total activities from data array
 */
function getTotalActivities(data: TuHeatmapValue[]): number {
	return data.reduce((total, item) => total + item.count, 0);
}

/**
 * Custom tooltip formatter
 */
function customTooltipFormatter(item: TuHeatmapCalendarItem, unit: string): string {
	const date = item.date.toLocaleDateString("en-US", { 
		weekday: "long", 
		year: "numeric", 
		month: "long", 
		day: "numeric" 
	});
	return `<div style="font-weight: bold;">${item.count || 0} ${unit}</div><div>${date}</div>`;
}

/**
 * Handle day click events
 */
function handleDayClick(day: TuHeatmapCalendarItem): void {
	lastClickedDay.value = day;
	console.log("Day clicked:", day);
}

/**
 * Handle interactive day clicks
 */
function handleInteractiveClick(day: TuHeatmapCalendarItem): void {
	console.log("Interactive click:", day);
}

/**
 * Format clicked day information
 */
function formatClickedDay(day: TuHeatmapCalendarItem): string {
	const date = day.date.toLocaleDateString("en-US", { 
		year: "numeric", 
		month: "short", 
		day: "numeric" 
	});
	return `${date} - ${day.count || 0} activities`;
}

/**
 * Generate random activity data
 */
function generateRandomData(): void {
	const data: TuHeatmapValue[] = [];
	const startDate = new Date(2024, 0, 1);
	const endDate = new Date(2024, 11, 31); // Use December 31, 2024
	
	// Generate random data for 50-100 days
	const numberOfDays = Math.floor(Math.random() * 50) + 50;
	
	for (let i = 0; i < numberOfDays; i++) {
		const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
		const count = Math.floor(Math.random() * 15) + 1;
		
		data.push({
			date: randomDate.toISOString().split("T")[0],
			count
		});
	}
	
	interactiveData.value = data;
}

/**
 * Clear all interactive data
 */
function clearData(): void {
	interactiveData.value = [];
}

/**
 * Add activity for a random day in 2024
 */
function addTodayData(): void {
	// Generate a random date in 2024
	const startDate = new Date(2024, 0, 1);
	const endDate = new Date(2024, 11, 31);
	const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
	const randomDate = new Date(randomTime).toISOString().split("T")[0];
	
	const existingIndex = interactiveData.value.findIndex(item => item.date === randomDate);
	
	if (existingIndex >= 0) 
		interactiveData.value[existingIndex].count += 1;
	else {
		interactiveData.value.push({
			date: randomDate,
			count: 1
		});
	}
}
</script>

<style scoped>
/**
 * CalendarHeatMapShowcase Component Styles
 */
.showcase-component {
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
	font-family: var(--tu-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
}

.showcase-section {
	margin-bottom: 3rem;
	border: 1px solid var(--tu-border-color, #e1e5e9);
	border-radius: 8px;
	overflow: hidden;
	background: var(--tu-surface, #ffffff);
}

.showcase-section h4 {
	margin: 0;
	padding: 1.5rem 2rem 0.5rem;
	color: var(--tu-text-primary, #2c3e50);
	font-size: 1.25rem;
	font-weight: 600;
}

.showcase-section p {
	margin: 0;
	padding: 0 2rem 1rem;
	color: var(--tu-text-secondary, #6c757d);
	line-height: 1.6;
}

.demo-container {
	padding: 2rem;
	background: var(--tu-background, #f8f9fa);
	border-top: 1px solid var(--tu-border-color, #e1e5e9);
}

/* Configuration Controls */
.config-row {
	display: flex;
	gap: 2rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;
}

.config-group {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	min-width: 200px;
}

.config-group label {
	font-weight: 600;
	color: var(--tu-text-primary, #2c3e50);
	font-size: 0.9rem;
}

.button-group,
.theme-selector,
.action-buttons {
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-bottom: 1.5rem;
}

/* Stats and Information */
.stats {
	margin-top: 1.5rem;
	padding: 1rem;
	background: var(--tu-surface, #ffffff);
	border-radius: 6px;
	border: 1px solid var(--tu-border-color, #e1e5e9);
}

.stats p {
	margin: 0.5rem 0;
	padding: 0;
	font-size: 0.9rem;
	color: var(--tu-text-primary, #2c3e50);
}

.click-info {
	margin-top: 1rem;
	padding: 0.75rem 1rem;
	background: var(--tu-info-light, #d1ecf1);
	border: 1px solid var(--tu-info, #bee5eb);
	border-radius: 4px;
	font-size: 0.9rem;
	color: var(--tu-info-dark, #0c5460);
}

/* GitHub Legend */
.github-legend {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	margin-top: 1rem;
	font-size: 0.75rem;
	color: var(--tu-text-secondary, #6c757d);
}

.legend-label {
	font-weight: 500;
}

.color-squares {
	display: flex;
	gap: 2px;
}

.color-square {
	width: 10px;
	height: 10px;
	border-radius: 2px;
	border: 1px solid var(--tu-border-color, #e1e5e9);
}

/* Style Options */
.style-options {
	display: flex;
	gap: 2rem;
	margin-bottom: 1.5rem;
	flex-wrap: wrap;
}

.option-group {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.option-group label {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 500;
	color: var(--tu-text-primary, #2c3e50);
	cursor: pointer;
}

.option-group input[type="checkbox"] {
	width: 16px;
	height: 16px;
	margin: 0;
}

/* API Table */
.api-table {
	overflow-x: auto;
}

.api-table table {
	width: 100%;
	border-collapse: collapse;
	font-size: 0.9rem;
}

.api-table th,
.api-table td {
	padding: 0.75rem 1rem;
	text-align: left;
	border-bottom: 1px solid var(--tu-border-color, #e1e5e9);
}

.api-table th {
	background: var(--tu-background, #f8f9fa);
	font-weight: 600;
	color: var(--tu-text-primary, #2c3e50);
}

.api-table td {
	color: var(--tu-text-secondary, #6c757d);
}

.api-table code {
	padding: 0.2rem 0.4rem;
	background: var(--tu-code-background, #f1f3f4);
	border-radius: 3px;
	font-family: 'Monaco', 'Consolas', monospace;
	font-size: 0.85em;
	color: var(--tu-code-color, #e83e8c);
}

/* Responsive Design */
@media (max-width: 768px) {
	.showcase-component {
		padding: 1rem;
	}
	
	.showcase-section h4 {
		padding: 1rem 1.5rem 0.5rem;
		font-size: 1.1rem;
	}
	
	.showcase-section p {
		padding: 0 1.5rem 1rem;
	}
	
	.demo-container {
		padding: 1.5rem;
	}
	
	.config-row {
		flex-direction: column;
		gap: 1.5rem;
	}
	
	.config-group {
		min-width: unset;
	}
	
	.style-options {
		flex-direction: column;
		gap: 1rem;
	}
}

/* Dark theme support */
.tu-dark-theme .showcase-component {
	--tu-surface: #2d3748;
	--tu-background: #1a202c;
	--tu-text-primary: #f7fafc;
	--tu-text-secondary: #a0aec0;
	--tu-border-color: #4a5568;
	--tu-info-light: #2d3748;
	--tu-info: #4a5568;
	--tu-info-dark: #e2e8f0;
	--tu-code-background: #4a5568;
	--tu-code-color: #f56565;
}
</style>
