<template>
	<div class="cv-header">
		<div class="cv-header-nav">
			<button
				:disabled="!headerProps.previousYear"
				class="previousYear"
				aria-label="Previous Year"
				@click.prevent="onInput(headerProps.previousYear!)"
			>
				{{ previousYearLabel }}
			</button>
			<button
				:disabled="!headerProps.previousPeriod"
				class="previousPeriod"
				aria-label="Previous Period"
				@click.prevent="onInput(headerProps.previousPeriod!)"
				v-html="previousPeriodLabel"
			/>
			<button
				class="currentPeriod"
				aria-label="Current Period"
				@click.prevent="onInput(headerProps.currentPeriod)"
			>
				{{ headerProps.currentPeriodLabel }}
			</button>
			<button
				:disabled="!headerProps.nextPeriod"
				class="nextPeriod"
				aria-label="Next Period"
				@click.prevent="onInput(headerProps.nextPeriod!)"
			>
				{{ nextPeriodLabel }}
			</button>
			<button
				:disabled="!headerProps.nextYear"
				class="nextYear"
				aria-label="Next Year"
				@click.prevent="onInput(headerProps.nextYear!)"
			>
				{{ nextYearLabel }}
			</button>
		</div>
		<div class="periodLabel">
			<slot name="label">{{ headerProps.periodLabel }}</slot>
		</div>
		<div class="cv-toolbar">
		<tu-switch class="margin-left" val="week" notValue="month" v-model="period">
			<template #off> month </template>
			<template #on> week </template>
		</tu-switch>
		<tu-switch val="dark" notValue="theme-default" v-model="theme">
			<template #off> light </template>
			<template #on> dark </template>
		</tu-switch>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { IHeaderProps } from "./IHeaderProps"
defineProps({
	headerProps: {
		type: Object as () => IHeaderProps,
		required: true,
	},
	previousYearLabel: { type: String, default: "<<" },
	previousPeriodLabel: { type: String, default: "<" },
	nextPeriodLabel: { type: String, default: ">" },
	nextYearLabel: { type: String, default: ">>" },
})

const emit = defineEmits<{
	(e: "input", day: Date): void;
	(e: "updatePeriod", period: string): void;
	(e: "updateTheme", theme: string): void;
}>();
const period = ref("month");
const theme = ref("theme-default");
watch(period, () => {
	emit("updatePeriod", period.value);
});
watch(theme, () => {
	emit("updateTheme", theme.value);
});
const onInput = (d: Date): void => {
	emit("input", d);
};
</script>
<style>
.cv-header {
	display: flex;
	flex: 0 1 auto;
	flex-flow: row nowrap;
	align-items: center;
	min-height: 2.5em;
	border-width: 1px 1px 0 1px;
}

.cv-header .periodLabel {
	display: flex;
	flex: 1 1 auto;
	flex-flow: row nowrap;
	min-height: 1.5em;
	line-height: 1;
	font-size: 1.5em;
}

.cv-header,
.cv-header button {
	border-style: solid;
	border-color: #ddd;
}

.cv-header-nav,
.cv-header .periodLabel {
	margin: 0.1em 0.6em;
}

.cv-header-nav button,
.cv-header .periodLabel {
	padding: 0.4em 0.6em;
}

.cv-header button {
	box-sizing: border-box;
	line-height: 1em;
	font-size: 1em;
	border-width: 1px;
}

.cv-toolbar {
	display: flex;
	width: 200px;
	justify-content: space-around;
}
</style>
