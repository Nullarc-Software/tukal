<template>
	<div class="showcase-component">
		<h3>Button Groups:</h3>
		<hr />
		
		<h4>Regular Button Groups:</h4>
		<TuButtonGroup>
			<TuButton> button 1 </TuButton>
			<TuButton> button 2 </TuButton>
			<TuButton> button 3 </TuButton>
		</TuButtonGroup>

		<TuButtonGroup>
			<TuButton primary> button 1 </TuButton>
			<TuButton primary> button 2 </TuButton>
			<TuButton primary> button 3 </TuButton>
		</TuButtonGroup>

		<TuButtonGroup>
			<TuButton danger> button 1 </TuButton>
			<TuButton danger> button 2 </TuButton>
			<TuButton danger> button 3 </TuButton>
		</TuButtonGroup>

		<TuButtonGroup>
			<TuButton warn> button 1 </TuButton>
			<TuButton warn> button 2 </TuButton>
			<TuButton warn> button 3 </TuButton>
		</TuButtonGroup>

		<TuButtonGroup>
			<TuButton success> button 1 </TuButton>
			<TuButton success> button 2 </TuButton>
			<TuButton success> button 3 </TuButton>
		</TuButtonGroup>

		<TuButtonGroup>
			<TuButton dark flat> button 1 </TuButton>
			<TuButton dark flat> button 2 </TuButton>
			<TuButton dark flat> button 3 </TuButton>
		</TuButtonGroup>

		<h4>Mutually Exclusive Button Groups (Radio Button Behavior):</h4>
		
		<p>Basic exclusive group with v-model:</p>
		<TuButtonGroup v-model="selectedBasic" mutually-exclusive>
			<TuButton value="option1" primary> Option 1 </TuButton>
			<TuButton value="option2" primary> Option 2 </TuButton>
			<TuButton value="option3" primary> Option 3 </TuButton>
		</TuButtonGroup>
		<p>Selected: {{ selectedBasic }}</p>

		<p>View modes exclusive group:</p>
		<TuButtonGroup v-model="selectedView" mutually-exclusive>
			<TuButton value="list" success> List View </TuButton>
			<TuButton value="grid" success> Grid View </TuButton>
			<TuButton value="card" success> Card View </TuButton>
		</TuButtonGroup>
		<p>Current view: {{ selectedView }}</p>

		<p>Size selector:</p>
		<TuButtonGroup v-model="selectedSize" mutually-exclusive>
			<TuButton value="small" warn> Small </TuButton>
			<TuButton value="medium" warn> Medium </TuButton>
			<TuButton value="large" warn> Large </TuButton>
			<TuButton value="xlarge" warn> X-Large </TuButton>
		</TuButtonGroup>
		<p>Selected size: {{ selectedSize }}</p>

		<p>Filter options (with numeric values):</p>
		<TuButtonGroup v-model="selectedFilter" mutually-exclusive>
			<TuButton :value="1" dark> All </TuButton>
			<TuButton :value="2" dark> Active </TuButton>
			<TuButton :value="3" dark> Completed </TuButton>
			<TuButton :value="4" dark> Archived </TuButton>
		</TuButtonGroup>
		<p>Selected filter: {{ selectedFilter }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { tuButton as TuButton, tuButtonGroup as TuButtonGroup } from "../components/tuButton";

// Reactive state for different button groups
const selectedBasic = ref<string | number | null>("option1");
const selectedView = ref<string | number | null>("grid");
const selectedSize = ref<string | number | null>("medium");
const selectedFilter = ref<string | number | null>(1);
</script>
