<template>
	<div class="showcase-component">
		<h3>Usage Bar Component:</h3>
		<hr />
		
		<!-- Basic Usage Bar -->
		<div style="margin: 20px 0;">
			<h4>Basic Usage Bar:</h4>
			<p>Display time distribution across different applications</p>
			<tu-usage-bar :items="applicationUsage" />
		</div>

		<!-- Custom Height -->
		<div style="margin: 20px 0;">
			<h4>Custom Height:</h4>
			<p>Different bar heights</p>
			<tu-usage-bar :items="applicationUsage" height="8px" />
			<tu-usage-bar :items="applicationUsage" height="15px" style="margin-top: 15px;" />
			<tu-usage-bar :items="applicationUsage" height="25px" style="margin-top: 15px;" />
		</div>

		<!-- Custom Colors -->
		<div style="margin: 20px 0;">
			<h4>Custom Colors:</h4>
			<p>Specify custom color palette for segments</p>
			<tu-usage-bar 
				:items="applicationUsage" 
				:bar-colors="customColors"
				height="12px"
			/>
		</div>

		<!-- Different Font Size -->
		<div style="margin: 20px 0;">
			<h4>Different Font Sizes:</h4>
			<p>Adjust legend font size</p>
			<tu-usage-bar :items="applicationUsage" font-size="10px" />
			<tu-usage-bar :items="applicationUsage" font-size="16px" style="margin-top: 15px;" />
		</div>

		<!-- Small Items Grouped as Others -->
		<div style="margin: 20px 0;">
			<h4>Grouping Small Items:</h4>
			<p>Items with less than 5% are grouped into "Others"</p>
			<tu-usage-bar :items="detailedUsage" height="10px" />
		</div>

		<!-- Server Resource Usage -->
		<div style="margin: 20px 0;">
			<h4>Server Resource Usage:</h4>
			<p>Monitor CPU time distribution across processes</p>
			<tu-usage-bar :items="serverUsage" :bar-colors="serverColors" height="12px" />
		</div>

		<!-- With Custom Item Colors -->
		<div style="margin: 20px 0;">
			<h4>Individual Item Colors:</h4>
			<p>Each item can have its own color</p>
			<tu-usage-bar :items="coloredItems" height="10px" />
		</div>

		<!-- Real-time Updates -->
		<div style="margin: 20px 0;">
			<h4>Real-time Updates:</h4>
			<p>Usage bar automatically updates when data changes</p>
			<tu-usage-bar :items="dynamicUsage" height="12px" />
			<div style="margin-top: 10px;">
				<button @click="updateDynamicUsage" style="padding: 8px 16px; cursor: pointer;">
					Refresh Data
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UsageBarItem } from "../components/tuUsageBar/types";

//====================================
// Sample Data
//====================================

// Basic application usage
const applicationUsage = ref<UsageBarItem[]>([
	{ name: "Google Chrome", time: 120 },
	{ name: "VS Code", time: 100 },
	{ name: "Outlook", time: 50 },
	{ name: "Instagram", time: 70 },
	{ name: "Slack", time: 90 },
	{ name: "Terminal", time: 40 }
]);

// Detailed usage with many small items
const detailedUsage = ref<UsageBarItem[]>([
	{ name: "Chrome", time: 220 },
	{ name: "VS Code", time: 180 },
	{ name: "Outlook", time: 100 },
	{ name: "Teams", time: 80 },
	{ name: "Excel", time: 10 },
	{ name: "Word", time: 8 },
	{ name: "Notepad", time: 5 },
	{ name: "Calculator", time: 3 },
	{ name: "Paint", time: 2 }
]);

// Server resource usage
const serverUsage = ref<UsageBarItem[]>([
	{ name: "Node.js", time: 350 },
	{ name: "PostgreSQL", time: 280 },
	{ name: "Redis", time: 120 },
	{ name: "Nginx", time: 80 },
	{ name: "System", time: 70 }
]);

// Items with custom colors
const coloredItems = ref<UsageBarItem[]>([
	{ name: "Production", time: 400, color: "#28a745" },
	{ name: "Staging", time: 200, color: "#ffa00a" },
	{ name: "Development", time: 150, color: "#5e64ff" },
	{ name: "Testing", time: 100, color: "#7cd6fd" }
]);

// Dynamic usage that updates
const dynamicUsage = ref<UsageBarItem[]>([
	{ name: "Service A", time: 100 },
	{ name: "Service B", time: 80 },
	{ name: "Service C", time: 60 }
]);

//====================================
// Custom Color Palettes
//====================================

const customColors = [
	"#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A",
	"#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"
];

const serverColors = [
	"#2ecc71", "#3498db", "#9b59b6", "#e74c3c", "#95a5a6"
];

//====================================
// Methods
//====================================

/**
 * Updates dynamic usage with random values
 */
const updateDynamicUsage = (): void => {
	dynamicUsage.value = [
		{ name: "Service A", time: Math.floor(Math.random() * 150) + 50 },
		{ name: "Service B", time: Math.floor(Math.random() * 150) + 50 },
		{ name: "Service C", time: Math.floor(Math.random() * 150) + 50 },
		{ name: "Service D", time: Math.floor(Math.random() * 100) + 20 }
	];
};
</script>

<style scoped lang="scss">
.showcase-component {
	padding: 20px;
	max-width: 1000px;
	margin: 0 auto;

	h3 {
		margin-bottom: 10px;
		color: #333;
	}

	h4 {
		margin-bottom: 8px;
		color: #555;
		font-size: 1.1em;
	}

	p {
		margin-bottom: 10px;
		color: #666;
		font-size: 0.95em;
	}

	hr {
		margin: 20px 0;
		border: none;
		border-top: 1px solid #e0e0e0;
	}

	button {
		background-color: #5e64ff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 14px;
		transition: background-color 0.2s;

		&:hover {
			background-color: #4850cc;
		}

		&:active {
			transform: translateY(1px);
		}
	}
}
</style>
