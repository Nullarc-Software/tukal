<template>
	<tr class="tu-table__tr" @click="rowClick" :class="{
		selected: computeSelected,
		invisible: isInvisible
	}">
		<slot />
	</tr>
</template>

<script setup lang="ts">
import {
	computed,
	inject,
	provide,
	ref
} from "vue";
import { Router } from "vue-router";

defineOptions({
	name: "TuTr"
});

interface Props {
	data?: unknown;
	isSelected?: boolean;
	notClickSelected?: boolean;
	hidden?: boolean;
	invisible?: boolean;
	// Props passed from tuTable
	modelValue?: unknown;
	selected?: boolean;
	index?: number;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

// Row context interface for provide/inject
export interface TuTableRowContext {
	rowData: unknown;
	rowIndex: number;
}

const props = withDefaults(defineProps<Props>(), {
	isSelected: false,
	notClickSelected: true,
	hidden: false,
	invisible: false,
	selected: false,
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

// Provide row context to all child components
const rowContext: TuTableRowContext = {
	rowData: props.data || props.modelValue,
	rowIndex: props.index || 0
};
provide("tuTableRowContext", rowContext);

const emit = defineEmits<{
	rowClick: [event: Event];
	rowClicked: [event: Event];
	selected: [data: unknown];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const selected = inject<((data: unknown) => void) | null>("selected");
const isSelected = ref(false);
const isInvisible = ref(props.invisible);

const computeSelected = computed(() => {
	if (isSelected.value) return true;
	else return props.isSelected || props.selected;
});

const rowClick = function (event: Event) {
	if (!props.notClickSelected) {
		selected?.call(null, props.data);
		emit("selected", props.data);
	}

	emit("rowClick", event);
	emit("rowClicked", event);
};
</script>

<style lang="scss" scoped>
@import "../../style/sass/_functions";

.isMultipleSelected {
	::v-deep(.tu-table__tr) {
		::v-deep(.tu-table__td) {
			border-radius: 0px !important;
		}
	}
}

.tu-table__tr {
	padding: 5px;
	border: 0px;
	border-bottom: 1px solid getColorAlpha("text", 0.2);

	&:first-of-type {
		::v-deep(.tu-table__td) {
			&:last-child {
				border-radius: 0px 0px 0px 0px;
			}

			&:first-child {
				border-radius: 0px 0px 0px 0px;
			}
		}
	}

	&:last-of-type {
		border-bottom: none;
		
		::v-deep(.tu-table__td) {
			border-bottom: none;
			
			&:last-child {
				border-radius: 0px 0px 14px 0px;
			}

			&:first-child {
				border-radius: 0px 0px 0px 14px;
			}
		}
	}

	&.selected {
		::v-deep(.tu-table__td) {
			background: getColorAlpha("color", 0.1) !important;
			color: getColor("color") !important;
		}
	}

	::v-deep(.tu-table__td) {
		background: getColorAlpha("bg", 0.1);
		color: getColor("bg");
	}

	&:hover {
		::v-deep(.tu-table__td) {
			background: getColor("gray-1");
		}
	}
}

.invisible {
	border-bottom: none !important;
}
</style>

