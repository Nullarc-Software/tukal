<template>
	<th class="tu-table__th" :class="{
		sort: sort,
		search: search && searchEnabled
	}" v-bind="$attrs" :data-sort-type="sortType" ref="theader">
		<div class="tu-table__th__content">
			<div class="tu-table__th__content__text" @click="toggleSort">
				<slot />
				<div v-if="sort" class="tu-table__th__content__icons">
					<tu-icon class="icon-sort-1">keyboard_arrow_up</tu-icon>
					<tu-icon class="icon-sort-2">keyboard_arrow_down</tu-icon>
				</div>
			</div>
			<tu-input v-if="search && searchEnabled && type === 'string'" block v-model="colSearch" type="search" @keypress="keyPressed" />
			<div v-if="search && searchEnabled && type === 'timestamp'" style="display: inline-flex; flex-direction: column;">
				<tu-input border type="datetime-local" v-model="startDateTime" label="From" @change="setDateFilter" />
				<tu-input border type="datetime-local" v-model="endDateTime" label="To" @change="setDateFilter" />
			</div>
		</div>
		<div class="tu-table__th__resizer_right" :class="{ active: isResizing }" v-on="resizeListeners"
			v-if="!fixed"></div>
	</th>
</template>

<script setup lang="ts">
import _ from "lodash";
import {
	computed,
	inject,
	onMounted,
	onBeforeUnmount,
	ref,
	watch,
} from "vue";
import { Router } from "vue-router";
import { TuIcon } from "../tuIcon";
import { TuInput } from "../tuInput";
import type { TuTableSorterDefn } from "./tuTableStore.refactored";

defineOptions({
	name: "TuTh"
});

interface Props {
	sort?: boolean;
	search?: boolean;
	field?: string;
	fixed?: boolean;
	type?: string;
	index?: number;
	isLast?: boolean;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	sort: false,
	search: false,
	field: "",
	fixed: false,
	type: "string",
	index: 0,
	isLast: false,
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

const emit = defineEmits<{
	enableDragListener: [];
	disableDragListener: [];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const tableInstance = inject("tableInstance") as any;
const isExternalData = inject("externalData", false) as boolean;
const searchEnabled = inject("searchEnabled", ref(true));
const colSearch = ref("");
const theader = ref<HTMLElement>();
const startDateTime = ref("");
const endDateTime = ref("");

// Debounced search function to prevent excessive API calls
const debouncedSearch = _.debounce((value: string, field: string, type: string) => {
	if (!tableInstance || !field) return;
	
	if (value === "") {
		// For external data mode, use UI-only method for typing
		if (isExternalData) 
			tableInstance.removeFilterUI?.(field);
		else 
			tableInstance.removeFilter(field);
		return;
	}
	
	// For external data mode, only update UI state, don't trigger API calls
	const filterMethod = isExternalData ? tableInstance.addFilterUI : tableInstance.addFilter;
	if (!filterMethod) return;
	
	switch (type) {
	case "string":
		filterMethod({ field, type: "like", value });
		break;
	case "number":
		filterMethod({ field, type: "equals", value });
		break;
	case "timestamp":
		filterMethod({ field, type: "date-between", value });
		break;
	default:
		break;
	}
}, 300); // 300ms debounce delay

const sortType = computed(() => {
	const item = tableInstance?.sorters?.find((sorter: TuTableSorterDefn) => {
		return sorter.field === props.field;
	});
	return item ? item.direction : "none";
});

const headerDefn = tableInstance?.getColumn?.(props.field);

const headerElement = ref<HTMLElement>();
const isResizing = ref(false);
let initialMouseX = 0;
let initialWidth = 0;

function setDateFilter() {
	if (props.field)
		tableInstance?.addFilter({ field: props.field, type: "date-between", value: [startDateTime.value, endDateTime.value] });
}

function keyPressed(event: KeyboardEvent) {
	// For immediate search on Enter key - always use API-triggering method
	if (event.key === "Enter" && props.field) {
		debouncedSearch.cancel(); // Cancel debounced search
		switch (props.type) {
		case "string":
			tableInstance?.addFilter({
				field: props.field,
				type: "like",
				value: colSearch.value
			});
			break;
		case "number":
			tableInstance?.addFilter({
				field: props.field,
				type: "equals",
				value: colSearch.value
			});
			break;
		case "timestamp":
			tableInstance?.addFilter({
				field: props.field,
				type: "date-between",
				value: colSearch.value
			});
			break;
		default:
			break;
		}
	}
}

function toggleSort() {
	if (!props.sort || !props.field) return;
	
	// Toggle sort direction: none -> asc -> desc -> none
	const currentSort = tableInstance?.sorters?.find((s: TuTableSorterDefn) => s.field === props.field);
	if (!currentSort) 
		tableInstance?.setSort(props.field, "asc");
	else if (currentSort.direction === "asc") 
		tableInstance?.setSort(props.field, "desc");
	else 
		tableInstance?.clearSort();
}

watch(colSearch, (value) => {
	if (props.field) {
		if (value === "") {
			debouncedSearch.cancel();
			// When clearing, always trigger API call (for both modes)
			tableInstance?.removeFilter(props.field);
		}
		else {
			// Trigger debounced search for non-empty values
			debouncedSearch(value, props.field, props.type || "string");
		}
	}
});

function trackMouseMove(event: MouseEvent) {
	if (headerElement.value && headerDefn && tableInstance) {
		// Calculate the new width based on mouse movement from initial position
		const deltaX = event.pageX - initialMouseX;
		const newWidth = initialWidth + deltaX;
		
		// Get table container and current headers for bounds checking
		const tableContainer = headerElement.value.closest(".tu-table-content") as HTMLElement;
		const table = headerElement.value.closest("table") as HTMLElement;
		if (!tableContainer || !table) return;
		
		const containerWidth = tableContainer.clientWidth - 20; // Leave some margin
		const headers = tableInstance.getTableHeaders.value;
		const currentHeaderIndex = headers.findIndex(h => h.field === props.field);
		
		if (currentHeaderIndex === -1) return;
		
		// Get current widths of all columns
		const currentWidths = headers.map(header => {
			const width = header.width || "auto";
			if (width === "auto") return 100;
			if (typeof width === "number") return width;
			return parseInt(width.replace("px", ""));
		});
		
		// Calculate minimum width constraints
		const minWidth = headerDefn.minWidth || 80;
		const maxWidth = Math.min(containerWidth * 0.6, 600); // Max 60% of container or 600px
		
		// Constrain the new width
		let constrainedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
		
		// Check if this resize would cause overflow
		const totalWidthWithChange = currentWidths.reduce((sum, width, index) => {
			return sum + (index === currentHeaderIndex ? constrainedWidth : width);
		}, 0);
		
		// If overflow would occur, adjust the width to fit
		if (totalWidthWithChange > containerWidth) {
			const widthBudget = containerWidth - currentWidths.reduce((sum, width, index) => {
				return sum + (index === currentHeaderIndex ? 0 : width);
			}, 0);
			constrainedWidth = Math.max(minWidth, widthBudget);
		}
		
		// Special handling for last column: prevent left column expansion
		const isLastColumn = currentHeaderIndex === headers.length - 1;
		if (isLastColumn && constrainedWidth < initialWidth) {
			// When shrinking last column, ensure we don't trigger expansion of other columns
			const remainingSpace = containerWidth - currentWidths.slice(0, -1).reduce((sum, w) => sum + w, 0);
			constrainedWidth = Math.max(minWidth, Math.min(constrainedWidth, remainingSpace));
		}
		
		// Apply the new width to the header definition for Vue reactivity
		headerDefn.width = constrainedWidth + "px";
		
		// Apply directly to DOM for immediate visual feedback
		if (headerElement.value) {
			headerElement.value.style.width = constrainedWidth + "px";
			headerElement.value.style.minWidth = constrainedWidth + "px";
		}
		
		// Update corresponding table data cells for consistent column width
		const headerRow = headerElement.value.parentElement;
		if (headerRow) {
			const headerCells = headerRow.children;
			let actualColumnIndex = 0;
			for (let i = 0; i < headerCells.length; i++) {
				if (headerCells[i] === headerElement.value) {
					actualColumnIndex = i + 1; // +1 for CSS nth-child (1-based)
					break;
				}
			}
			
			const cells = table.querySelectorAll(`tbody tr td:nth-child(${actualColumnIndex})`);
			cells.forEach((cell: Element) => {
				const tdElement = cell as HTMLElement;
				tdElement.style.width = constrainedWidth + "px";
				tdElement.style.minWidth = constrainedWidth + "px";
			});
		}
		
		// Prevent text selection during resize
		event.preventDefault();
	}
}

function trackMouseUp() {
	headerElement.value = undefined;
	isResizing.value = false;
	// Clean up event listeners
	document.removeEventListener("mousemove", trackMouseMove);
	document.removeEventListener("mouseup", trackMouseUp);
	// Re-enable cursor and selection
	document.body.style.userSelect = "";
	document.body.style.cursor = "";
	// Remove resizing class to re-enable transitions
	if (theader.value) {
		theader.value.classList.remove("tu-table__th--resizing");
		// Clear inline styles to let Vue reactivity take over
		theader.value.style.removeProperty("width");
		theader.value.style.removeProperty("min-width");
	}
	// Clear inline styles from table cells
	if (props.field && tableInstance) {
		const table = theader.value?.closest("table");
		if (table) {
			const headerRow = theader.value?.parentElement;
			if (headerRow) {
				const headerCells = headerRow.children;
				let actualColumnIndex = 0;
				for (let i = 0; i < headerCells.length; i++) {
					if (headerCells[i] === theader.value) {
						actualColumnIndex = i + 1;
						break;
					}
				}
				const cells = table.querySelectorAll(`tbody tr td:nth-child(${actualColumnIndex})`);
				cells.forEach((cell: Element) => {
					const tdElement = cell as HTMLElement;
					tdElement.style.removeProperty("width");
					tdElement.style.removeProperty("min-width");
				});
			}
		}
	}
	emit("enableDragListener");
}

const resizeListeners = {
	mousedown: function (event: MouseEvent) {
		headerElement.value = theader.value;
		if (headerElement.value && headerDefn) {
			isResizing.value = true;
			
			// Store initial values for smooth resizing
			initialMouseX = event.pageX;
			// Get the actual computed width to avoid jumping
			const computedStyle = window.getComputedStyle(headerElement.value);
			initialWidth = parseFloat(computedStyle.width) || headerElement.value.offsetWidth;
			
			// Make sure headerDefn has the current width
			if (!headerDefn.width)
				headerDefn.width = initialWidth + "px";
			
			// Add resizing class to disable transitions during resize
			headerElement.value.classList.add("tu-table__th--resizing");
			
			// Prevent text selection and set resize cursor during resize
			document.body.style.userSelect = "none";
			document.body.style.cursor = "col-resize";
			
			document.addEventListener("mousemove", trackMouseMove);
			document.addEventListener("mouseup", trackMouseUp);
			emit("disableDragListener");
			
			// Prevent default to avoid text selection
			event.preventDefault();
		}
	}
};

onMounted(() => {
	if (headerDefn && theader.value) headerDefn.element = theader.value;
});

onBeforeUnmount(() => {
	// Clean up debounced function to prevent memory leaks
	debouncedSearch.cancel();
	// Clean up event listeners
	document.removeEventListener("mousemove", trackMouseMove);
	document.removeEventListener("mouseup", trackMouseUp);
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_functions";

.tu-table__th {
	padding: 10px 12px;
	text-align: left;

	font-size: 0.8rem;
	border: 0px;
	position: relative;

	::v-deep(input) {
		width: 100%;
	}

	// Disable transitions during resize for smooth performance
	&--resizing {
		transition: none !important;
		* {
			transition: none !important;
		}
	}

	&.sort {
		&:hover {
			background: getColor("gray-3");
		}
	}

	&.search {
		.tu-table__th__content {
			display: flex;
			flex-direction: column;
		}
	}

	.icon-sort-1 {
		transform-origin: center bottom;
		font-size: 20px;
	}

	.icon-sort-2 {
		transform-origin: center top;
		font-size: 20px;
	}

	&__resizer {
		&_right {
			position: absolute;
			width: 8px;
			cursor: col-resize;
			right: -4px;
			top: 0;
			bottom: 0;
			background-color: getColorAlpha("primary", 0.15);
			transition: all 0.2s ease;
			z-index: 10;
			border-radius: 2px;

			// Add a subtle pattern to make it more visible
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 2px;
				height: 20px;
				background: repeating-linear-gradient(
					to bottom,
					getColorAlpha("primary", 0.3) 0px,
					getColorAlpha("primary", 0.3) 2px,
					transparent 2px,
					transparent 4px
				);
				border-radius: 1px;
			}

			&:hover {
				background-color: getColorAlpha("primary", 0.3);
				width: 10px;
				right: -5px;

				&::before {
					background: repeating-linear-gradient(
						to bottom,
						getColorAlpha("primary", 0.6) 0px,
						getColorAlpha("primary", 0.6) 2px,
						transparent 2px,
						transparent 4px
					);
				}
			}

			&.active {
				background-color: getColor("primary");
				width: 10px;
				right: -5px;

				&::before {
					background: repeating-linear-gradient(
						to bottom,
						rgba(255, 255, 255, 0.8) 0px,
						rgba(255, 255, 255, 0.8) 2px,
						transparent 2px,
						transparent 4px
					);
				}
			}
		}
	}

	&[data-sort-type="asc"] {
		.icon-sort-2 {
			transform: rotate(180deg) translateY(-10px) !important;
			transition: inherit;
		}

		.icon-sort-1 {
			transition: inherit;
			transform: translateY(10px);
		}
	}

	&[data-sort-type="desc"] {
		.icon-sort-2 {
			transform: rotate(0deg) translateY(-10px) !important;
			transition: inherit;
		}

		.icon-sort-1 {
			transform: rotate(-180deg) translateY(10px) !important;
			transition: inherit;
		}
	}

	&[data-sort-type="none"] {
		.icon-sort-2 {
			transform: rotate(0deg) !important;
			transition: inherit;
		}

		.icon-sort-1 {
			transform: rotate(0deg) !important;
			transition: inherit;
		}
	}

	&__content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		transition: all 0.25s ease;

		&__text {
			display: flex;
			flex-direction: row;
			align-items: center;
			cursor: pointer;
		}

		&__icons {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-left: 7px;
			transform: scale(0.8);
			transition: all 0.25s ease;
		}

		.tu-icon-arrow {
			position: relative;
			display: block;

			&.icon-sort-1 {
				transform: rotate(45deg);
			}

			&.icon-sort-2 {
				transform: rotate(-135deg);
			}
		}
	}
}
</style>

