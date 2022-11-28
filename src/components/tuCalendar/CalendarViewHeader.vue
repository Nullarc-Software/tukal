<template>
	<div class="cv-header">
		<div class="cv-header-nav">
			<tu-button transparent :disabled="!headerProps.previousYear" class="previousYear" aria-label="Previous Year"
				@click.prevent="onInput(headerProps.previousYear!)">
				<tu-icon style="transform: scale(-1, 1)">double_arrow</tu-icon>
			</tu-button>
			<tu-button transparent :disabled="!headerProps.previousPeriod" class="previousPeriod"
				aria-label="Previous Period" @click.prevent="onInput(headerProps.previousPeriod!)">
				<tu-icon>navigate_before</tu-icon>
			</tu-button>
			<tu-button transparent class="currentPeriod" aria-label="Current Period"
				@click.prevent="onInput(headerProps.currentPeriod)">
				<span class="label-span">{{
						headerProps.currentPeriodLabel
				}}</span>
			</tu-button>
			<tu-button transparent :disabled="!headerProps.nextPeriod" class="nextPeriod" aria-label="Next Period"
				@click.prevent="onInput(headerProps.nextPeriod!)">
				<tu-icon>navigate_next</tu-icon>
			</tu-button>
			<tu-button transparent :disabled="!headerProps.nextYear" class="nextYear" aria-label="Next Year"
				@click.prevent="onInput(headerProps.nextYear!)">
				<tu-icon>double_arrow</tu-icon>
			</tu-button>
		</div>
		<div class="periodLabel">
			<slot name="label">{{ headerProps.periodLabel }}</slot>
		</div>
		<div class="cv-toolbar">
			<tu-switch val="month" notValue="week" v-model="period">
				<template #off> month </template>
				<template #on> week </template>
			</tu-switch>
			<tu-switch color="dark" val="dark" notValue="theme-default" v-model="theme">
				<template #off> light </template>
				<template #on> dark </template>
			</tu-switch>
		</div>
		<tu-button @click="openAddCategoryDialog" class="category-button" transparent>Add Category</tu-button>
	</div>
	<tu-dialog width="350px" v-model="addCategoryDialog">
		<header>
			<h2 class="dialog-header">Add Category</h2>
		</header>
		<div class="center">
			<div>
				<table>
					<tr>
						<td>
							<span title="Label">Name</span>
						</td>
						<td>
							<tu-input primary v-model="categoryName" state="primary" placeholder="Title" />
						</td>
					</tr>
					<tr>
						<td></td>
						<td>
							<tu-color-picker v-model="categoryColor" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<template v-slot:footer>
			<div>
				<tu-button success @click="addCategory"> Add </tu-button>
			</div>
		</template>
	</tu-dialog>
</template>
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import { IHeaderProps } from "./IHeaderProps";
defineProps({
	headerProps: {
		type: Object as () => IHeaderProps,
		required: true
	},
	previousYearLabel: { type: String, default: "<<" },
	previousPeriodLabel: { type: String, default: "<" },
	nextPeriodLabel: { type: String, default: ">" },
	nextYearLabel: { type: String, default: ">>" }
});
const emit = defineEmits<{
	(e: "input", day: Date): void;
	(e: "updatePeriod", period: string): void;
	(e: "updateTheme", theme: string): void;
	(e: "updateCategory", category: Array<String>);
}>();
const period = ref("month");
const theme = ref("theme-default");
const addCategoryDialog = ref(false);
const categoryName = ref();
const categoryColor = ref();
const openAddCategoryDialog = () => {
	addCategoryDialog.value = true;
};
watch(period, () => {
	emit("updatePeriod", period.value);
});
watch(theme, () => {
	emit("updateTheme", theme.value);
});
const onInput = (d: Date): void => {
	emit("input", d);
};
const addCategory = () => {
	emit("updateCategory", [categoryColor.value, categoryName.value]);
	addCategoryDialog.value = false;
};
</script>
