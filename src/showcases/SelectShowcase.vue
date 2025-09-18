<template>
	<div class="showcase-component">
		<h3>Select:</h3>
		<hr />
		
		<!-- Basic Select -->
		<div style="margin: 20px 0;">
			<h4>Basic Select:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<TuSelect v-model="basicSelect" placeholder="Choose option" :select-items="basicOptions" />
				<TuSelect v-model="basicSelect2" label="With Label" placeholder="Choose option" :select-items="basicOptions" />
			</div>
		</div>

		<!-- Multiple Select -->
		<div style="margin: 20px 0;">
			<h4>Multiple Select:</h4>
			<TuSelect  v-model="multipleSelect" multiple label="Multiple Selection" placeholder="Choose multiple options" :select-items="basicOptions" />
			<p>Selected: {{ multipleSelect }}</p>
		</div>

		<!-- Multiple Select with Collapsed Chips -->
		<div style="margin: 20px 0;">
			<h4>Multiple Select (Collapsed Chips):</h4>
			<TuSelect v-model="multipleSelectCollapsed" multiple collapseChips label="Collapsed Mode" placeholder="Choose multiple options" :select-items="basicOptions" />
			<p>Selected: {{ multipleSelectCollapsed }}</p>
		</div>

		<!-- Scrollable Chips Demo -->
		<div style="margin: 20px 0;">
			<h4>Scrollable Chips Demo:</h4>
			<p style="font-size: 14px; color: #666; margin-bottom: 10px;">
				Select multiple options to see the scrollbar appear when chips exceed the container height.
			</p>
			<TuSelect v-model="scrollableChipsDemo" multiple label="Select Many Options" placeholder="Choose multiple to see scrolling" :select-items="basicOptions" />
			<p>Selected: {{ scrollableChipsDemo }}</p>
		</div>

		<!-- With Search Filter -->
		<div style="margin: 20px 0;">
			<h4>With Search Filter:</h4>
			<TuSelect v-model="searchSelect" multiple filter label="Searchable" placeholder="Search and select" :select-items="countries" />
		</div>

		<!-- Different States -->
		<div style="margin: 20px 0;">
			<h4>Different States:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<TuSelect v-model="stateSelect1" state="success" label="Success" :select-items="basicOptions" />
				<TuSelect v-model="stateSelect2" state="danger" label="Error" :select-items="basicOptions" />
			</div>
		</div>

		<!-- Disabled -->
		<div style="margin: 20px 0;">
			<h4>Disabled:</h4>
			<TuSelect v-model="disabledSelect" disabled label="Disabled" placeholder="Cannot select" :select-items="basicOptions" />
		</div>

		<!-- Loading -->
		<div style="margin: 20px 0;">
			<h4>Loading:</h4>
			<TuSelect v-model="loadingSelect" loading label="Loading" placeholder="Loading options..." :select-items="basicOptions" />
		</div>

		<!-- Block -->
		<div style="margin: 20px 0;">
			<h4>Block (Full Width):</h4>
			<TuSelect v-model="blockSelect" block label="Block Select" placeholder="Full width select" :select-items="basicOptions" />
		</div>

		<!-- Collapse Chips (Multiple) -->
		<div style="margin: 20px 0;">
			<h4>Collapse Chips (Multiple):</h4>
			<TuSelect v-model="collapseSelect" multiple collapse-chips label="Collapse Chips" placeholder="Multiple with collapse" :select-items="countries" />
		</div>

		<!-- Custom Options -->
		<div style="margin: 20px 0;">
			<h4>Custom Options:</h4>
			<TuSelect v-model="customSelect" label="Custom Options" placeholder="Select technology" :select-items="technologies">
				<template #option="{ item }">
					<div style="display: flex; align-items: center; gap: 10px;">
						<span :style="{ color: item.color }">{{ item.icon }}</span>
						<div>
							<div style="font-weight: bold;">{{ item.label }}</div>
							<div style="font-size: 12px; color: #666;">{{ item.description }}</div>
						</div>
					</div>
				</template>
			</TuSelect>
		</div>
 
		<!-- Dynamic Filter -->
		<div style="margin: 20px 0;">
			<h4>Dynamic Filter:</h4>
			<TuSelect v-model="dynamicSelect" dynamic-filter label="Dynamic Filter" placeholder="Type to filter" :select-items="largeDataset" />
		</div>

		<!-- Add Value -->
		<div style="margin: 20px 0;">
			<h4>Add Value:</h4>
			<TuSelect v-model="addValueSelect" add-value label="Add New Value" placeholder="Type new option" :select-items="addValueOptions" />
			<p>Options: {{ addValueOptions.map(opt => opt.label).join(', ') }}</p>
		</div>

		<!-- Grouped Options -->
		<div style="margin: 20px 0;">
			<h4>Grouped Options:</h4>
			<TuSelect v-model="groupedSelect" label="Grouped Select" placeholder="Select from groups" :select-items="groupedOptions" />
		</div>

		<!-- Style Variants -->
		<div style="margin: 20px 0;">
			<h4>Style Variants:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<TuSelect v-model="borderSelect" border label="Border Style" placeholder="Underline border" :select-items="basicOptions" />
				<TuSelect v-model="shadowSelect" shadow label="Shadow Style" placeholder="Elevated shadow" :select-items="basicOptions" />
				<TuSelect v-model="transparentSelect" transparent label="Transparent Style" placeholder="No background" :select-items="basicOptions" />
				<TuSelect v-model="squareSelect" square label="Square Style" placeholder="Square corners" :select-items="basicOptions" />
			</div>
		</div>

		<!-- Label vs Placeholder Demonstration -->
		<div style="margin: 20px 0;">
			<h4>Label vs Placeholder vs LabelPlaceholder:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
				<TuSelect v-model="labelDemo" label="Static Label" :select-items="basicOptions" />
				<TuSelect v-model="placeholderDemo" placeholder="This appears inside input" :select-items="basicOptions" />
				<TuSelect v-model="labelPlaceholderDemo" labelPlaceholder="Floating Label" :select-items="basicOptions" />
			</div>
			<div style="background: #e8f4fd; padding: 15px; margin-top: 10px; border-radius: 8px; font-size: 14px;">
				<p><strong>Explanation:</strong></p>
				<ul style="margin: 8px 0; padding-left: 20px;">
					<li><strong>label:</strong> Static text that appears above the select (always visible)</li>
					<li><strong>placeholder:</strong> Text that appears inside the input field when no option is selected</li>
					<li><strong>labelPlaceholder:</strong> Floating label that starts inside and moves up when focused/selected</li>
				</ul>
			</div>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic:</strong> {{ basicSelect }}</p>
				<p><strong>Multiple:</strong> {{ multipleSelect }}</p>
				<p><strong>Multiple (Collapsed):</strong> {{ multipleSelectCollapsed }}</p>
				<p><strong>Search:</strong> {{ searchSelect }}</p>
				<p><strong>Custom:</strong> {{ customSelect }}</p>
				<p><strong>Add Value:</strong> {{ addValueSelect }}</p>
				<p><strong>Grouped:</strong> {{ groupedSelect }}</p>
				<p><strong>Border Style:</strong> {{ borderSelect }}</p>
				<p><strong>Shadow Style:</strong> {{ shadowSelect }}</p>
				<p><strong>Transparent Style:</strong> {{ transparentSelect }}</p>
				<p><strong>Square Style:</strong> {{ squareSelect }}</p>
				<p><strong>Label Demo:</strong> {{ labelDemo }}</p>
				<p><strong>Placeholder Demo:</strong> {{ placeholderDemo }}</p>
				<p><strong>Label Placeholder Demo:</strong> {{ labelPlaceholderDemo }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TuSelect from "../components/tuSelect/tuSelect.vue";

// Basic selects
const basicSelect = ref("");
const basicSelect2 = ref("");
const multipleSelect = ref([]);
const multipleSelectCollapsed = ref([]);
const scrollableChipsDemo = ref([]);
const searchSelect = ref("");
const stateSelect1 = ref("");
const stateSelect2 = ref("");
const disabledSelect = ref("");
const loadingSelect = ref("");
const blockSelect = ref("");
const collapseSelect = ref([]);
const customSelect = ref("");
const dynamicSelect = ref("");
const addValueSelect = ref("");
const groupedSelect = ref("");

// Style variants
const borderSelect = ref("");
const shadowSelect = ref("");
const transparentSelect = ref("");
const squareSelect = ref("");

// Label vs Placeholder demonstration
const labelDemo = ref("");
const placeholderDemo = ref("");
const labelPlaceholderDemo = ref("");

// Options
const basicOptions = ref([
	{ label: "Option 1", value: "option1" },
	{ label: "Option 2", value: "option2" },
	{ label: "Option 3", value: "option3" },
	{ label: "Option 4", value: "option4" },
	{ label: "Option 5", value: "option5" },
	{ label: "Option 6", value: "option6" },
	{ label: "Option 7", value: "option7" },
	{ label: "Option 8", value: "option8" },
	{ label: "Option 9", value: "option9" },
	{ label: "Option 10", value: "option10" },
	{ label: "Long Option Name That Tests Text Overflow", value: "long_option" },
	{ label: "Another Very Long Option Name", value: "another_long" },
	{ label: "Short", value: "short" },
	{ label: "Medium Length Option", value: "medium" },
	{ label: "Extra Long Option Name That Should Demonstrate Scrolling", value: "extra_long" }
]);

const countries = ref([
	{ label: "United States", value: "US" },
	{ label: "Canada", value: "CA" },
	{ label: "United Kingdom", value: "UK" },
	{ label: "Germany", value: "DE" },
	{ label: "France", value: "FR" },
	{ label: "Italy", value: "IT" },
	{ label: "Spain", value: "ES" },
	{ label: "Netherlands", value: "NL" },
	{ label: "Australia", value: "AU" },
	{ label: "Japan", value: "JP" },
	{ label: "South Korea", value: "KR" },
	{ label: "Brazil", value: "BR" },
	{ label: "Mexico", value: "MX" },
	{ label: "India", value: "IN" },
	{ label: "China", value: "CN" }
]);

const technologies = ref([
	{ 
		label: "JavaScript", 
		value: "js", 
		icon: "🟨", 
		color: "#f7df1e",
		description: "Dynamic programming language"
	},
	{ 
		label: "Vue.js", 
		value: "vue", 
		icon: "💚", 
		color: "#4fc08d",
		description: "Progressive JavaScript framework"
	},
	{ 
		label: "React", 
		value: "react", 
		icon: "⚛️", 
		color: "#61dafb",
		description: "JavaScript library for UIs"
	},
	{ 
		label: "TypeScript", 
		value: "ts", 
		icon: "🔷", 
		color: "#3178c6",
		description: "Typed JavaScript"
	},
	{ 
		label: "Node.js", 
		value: "node", 
		icon: "🟢", 
		color: "#339933",
		description: "JavaScript runtime"
	}
]);

const largeDataset = ref(
	Array.from({ length: 100 }, (_, i) => ({
		label: `Item ${i + 1}`,
		value: `item${i + 1}`,
		description: `Description for item ${i + 1}`
	}))
);

const addValueOptions = ref([
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Orange", value: "orange" }
]);

const groupedOptions = ref([
	{
		group: "Frontend",
		options: [
			{ label: "HTML", value: "html" },
			{ label: "CSS", value: "css" },
			{ label: "JavaScript", value: "js" },
			{ label: "Vue.js", value: "vue" },
			{ label: "React", value: "react" }
		]
	},
	{
		group: "Backend",
		options: [
			{ label: "Node.js", value: "node" },
			{ label: "Python", value: "python" },
			{ label: "PHP", value: "php" },
			{ label: "Java", value: "java" },
			{ label: "C#", value: "csharp" }
		]
	},
	{
		group: "Database",
		options: [
			{ label: "MySQL", value: "mysql" },
			{ label: "PostgreSQL", value: "postgresql" },
			{ label: "MongoDB", value: "mongodb" },
			{ label: "Redis", value: "redis" }
		]
	}
]);
</script>
