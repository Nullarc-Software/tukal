<template>
	<div class="showcase-component">
		<h3>Button Groups:</h3>
		<hr />
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
			<TuButton dark> button 1 </TuButton>
			<TuButton dark> button 2 </TuButton>
			<TuButton dark> button 3 </TuButton>
		</TuButtonGroup>
	</div>
</template>

<script setup lang="ts">
import { tuButton as TuButton, tuButtonGroup as TuButtonGroup } from "../components/tuButton";

// This component doesn't need any reactive state
</script>
