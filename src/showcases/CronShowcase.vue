<!--
/**
 * @fileoverview CronShowcase - Showcase component for TuCron
 * @component CronShowcase
 * @author Tukal UI Library
 * @since 1.0.0
 */
-->
<template>
	<div class="showcase-component">
		<h3>Cron Showcase</h3>
		<hr />
		
		<div class="showcase-section">
			<h4>Basic Cron Editor</h4>
			<p>A comprehensive cron expression editor that provides an intuitive interface for creating and editing cron expressions.</p>
			
			<div class="demo-container">
				<div class="form-group">
					<label>Cron Expression:</label>
					<TuCron 
						v-model="cronExpression"
						:cols="{ minute: 5, hour: 4, day: 4 }"
						@update:model-value="handleCronUpdate"
						@error="handleError"
					/>
				</div>
				
				<div class="output-section" v-if="cronExpression">
					<h5>Current Expression:</h5>
					<code class="cron-expression">{{ cronExpression }}</code>
					<p class="cron-description">{{ cronDescription }}</p>
				</div>
				
				<div v-if="error" class="error-section">
					<p><strong>Error:</strong> {{ error }}</p>
				</div>
			</div>
		</div>

		<div class="showcase-section">
			<h4>Custom Configuration</h4>
			<p>Customize column layouts and localization settings.</p>
			
			<div class="demo-container">
				<div class="form-group">
					<label>Custom Layout Cron Editor:</label>
					<TuCron 
						v-model="customCronExpression"
						:cols="customCols"
						@update:model-value="handleCustomCronUpdate"
					/>
				</div>
				
				<div class="output-section" v-if="customCronExpression">
					<h5>Custom Expression:</h5>
					<code class="cron-expression">{{ customCronExpression }}</code>
				</div>
			</div>
		</div>

		<div class="showcase-section">
			<h4>Features</h4>
			<ul class="feature-list">
				<li>✅ Interactive cron expression editing</li>
				<li>✅ Customizable column layouts</li>
				<li>✅ Internationalization support</li>
				<li>✅ Type-safe props and events</li>
				<li>✅ Accessible form controls</li>
				<li>✅ Real-time expression validation</li>
				<li>✅ Multiple selection support</li>
				<li>✅ Responsive design</li>
			</ul>
		</div>

		<div class="showcase-section">
			<h4>Code Example</h4>
			<pre class="code-example"><code>&lt;TuCron 
  v-model="cronExpression"
  :cols="{ minute: 5, hour: 4, day: 4 }"
  :customLocale="customLocale"
  @update:model-value="handleUpdate"
  @error="handleError"
/&gt;</code></pre>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TuCron from "../components/tuCron";

defineOptions({
	name: "CronShowcase"
});

// Reactive data
const cronExpression = ref("0 0 * * *");
const customCronExpression = ref("*/15 * * * *");
const error = ref("");

// Custom column configuration
const customCols = ref({
	minute: 3,
	hour: 6,
	day: 5,
	month: 3,
	dayOfWeek: 7
});

// Computed properties
const cronDescription = computed(() => {
	// Simple cron expression parser for demonstration
	const parts = cronExpression.value.split(" ");
	if (parts.length !== 5) 
		return "Invalid cron expression";
	
	const [minute, hour, day, month, dayOfWeek] = parts;
	
	if (minute === "0" && hour === "0" && day === "*" && month === "*" && dayOfWeek === "*") 
		return "Run daily at midnight";
	else if (minute === "*/15" && hour === "*" && day === "*" && month === "*" && dayOfWeek === "*") 
		return "Run every 15 minutes";
	else if (minute === "0" && hour === "*/2" && day === "*" && month === "*" && dayOfWeek === "*") 
		return "Run every 2 hours";
	else 
		return `Custom schedule: ${cronExpression.value}`;
	
});

// Event handlers
const handleCronUpdate = (value: string): void => {
	cronExpression.value = value;
	error.value = ""; // Clear any previous errors
	console.log("Cron expression updated:", value);
};

const handleCustomCronUpdate = (value: string): void => {
	customCronExpression.value = value;
	console.log("Custom cron expression updated:", value);
};

const handleError = (errorMessage: Error | string): void => {
	error.value = typeof errorMessage === "string" ? errorMessage : errorMessage.message;
	console.error("Cron expression error:", errorMessage);
};
</script>

<style scoped>
.showcase-component {
	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;
}

.showcase-section {
	margin-bottom: 40px;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	padding: 20px;
	background: #fafafa;
}

.showcase-section h4 {
	color: #333;
	margin-bottom: 10px;
	font-size: 1.2em;
}

.showcase-section p {
	color: #666;
	margin-bottom: 15px;
	line-height: 1.6;
}

.demo-container {
	background: white;
	padding: 20px;
	border-radius: 6px;
	border: 1px solid #ddd;
}

.form-group {
	margin-bottom: 20px;
}

.form-group label {
	display: block;
	font-weight: 600;
	margin-bottom: 8px;
	color: #333;
}

.output-section {
	margin-top: 20px;
	padding: 15px;
	background: #f8f9fa;
	border-radius: 4px;
	border-left: 4px solid #007bff;
}

.output-section h5 {
	margin: 0 0 10px 0;
	color: #333;
	font-size: 1em;
}

.cron-expression {
	display: inline-block;
	background: #e9ecef;
	padding: 4px 8px;
	border-radius: 4px;
	font-family: 'Courier New', monospace;
	font-weight: bold;
	color: #495057;
}

.cron-description {
	margin-top: 8px;
	font-style: italic;
	color: #6c757d;
}

.error-section {
	margin-top: 20px;
	padding: 10px;
	background: #f8d7da;
	color: #721c24;
	border-radius: 4px;
	border-left: 4px solid #dc3545;
}

.feature-list {
	list-style: none;
	padding: 0;
}

.feature-list li {
	padding: 8px 0;
	border-bottom: 1px solid #eee;
	color: #333;
}

.feature-list li:last-child {
	border-bottom: none;
}

.code-example {
	background: #2d3748;
	color: #e2e8f0;
	padding: 20px;
	border-radius: 6px;
	overflow-x: auto;
	font-family: 'Courier New', monospace;
	font-size: 14px;
	line-height: 1.5;
}

.code-example code {
	background: none;
	color: inherit;
	padding: 0;
}

/* Responsive design */
@media (max-width: 768px) {
	.showcase-component {
		padding: 15px;
	}
	
	.showcase-section {
		padding: 15px;
	}
	
	.demo-container {
		padding: 15px;
	}
	
	.code-example {
		font-size: 12px;
		padding: 15px;
	}
}
</style>
