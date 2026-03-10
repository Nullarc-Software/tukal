<template>
	<div class="tu-table-content" ref="tableContainer" :style="containerStyles">
		<!-- Table Controls Groove -->
		<div v-if="columnSelector || searchControls" class="tu-table-controls-groove">
			<!-- Column Chooser Control -->
			<tu-popper v-if="columnSelector" placement="bottom-start" :offset="8" click-away >
				<tu-icon icon="more_horiz" class="tu-table-control-icon" />
				<template #content>
					<div class="column-chooser-dropdown">
						<div class="column-chooser-header">Column Chooser</div>
						<div class="column-list">
							<div v-for="header in table.columns" :key="header.field" class="column-item">
								<label class="column-chooser-item">
									<tu-check-box 
										v-model="header.visible"
										@update:checked="handleVisibilityChange(header)"
									>
									<span>{{ header.caption }}</span>
									</tu-check-box>
									
								</label>
							</div>
						</div>
					</div>
				</template>
			</tu-popper>
			
			<!-- Search Toggle Control -->
			<tu-icon 
				v-if="searchControls" 
				:icon="searchEnabled ? 'search_off' : 'search'"
				class="tu-table-control-icon"
				:class="{ 'active': searchEnabled }"
				@click="searchEnabled = !searchEnabled"
				:title="searchEnabled ? 'Hide search fields' : 'Show search fields'"
			/>
		</div>

		<div class="tu-table" :class="tableClasses" :style="tableStyles">
			<table class="tu-table__element" ref="tableElement">
				<thead ref="thead" class="tu-table__thead">
					<tr>
						<tu-th v-if="multiSelect" fixed >
							<tu-check-box v-model="selectedAll" :indeterminate="table.isPartiallySelected.value" />
						</tu-th>
						<tu-th v-if="rowExpand" fixed >
							<!-- Expand/Collapse header -->
						</tu-th>
						<tu-th v-for="(header, headerIndex) in table.visibleColumns.value" :key="header.field" :field="header.field"
							:style="getColumnStyle(header)"
							:sort="header.sortable" :type="header.dataType"
							:search="header.searchable" 
							:isLast="headerIndex === table.visibleColumns.value.length - 1"
							:draggable="draggableColumns"
							:class="{ 
								'dragging': isDragging && dragIndex === table.visibleColumns.value.findIndex(h => h.field === header.field), 
								'drag-over': isDragging && dragIndex !== table.visibleColumns.value.findIndex(h => h.field === header.field) 
							}"
							@dragstart="startDrag($event, header)"
							@dragover="onDragOver($event)"
							@dragenter.prevent
							@drop="onDrop($event, header)"
							@dragend="onDragEnd">
							{{ header.caption }}
						</tu-th>
					</tr>
				</thead>
				<tbody :id="`${id}-tbody`" :class="{ 'loading-body': !isLoaded }" class="tu-table__tbody">
					<template v-for="(tr, trIndex) in table.processedData.value" :key="tr.id">
						<tu-tr :model-value="tr.data" :selected="tr.selected" :index="trIndex" @row-clicked="onRowClick(tr.data)">
							<tu-td v-if="multiSelect">
								<tu-check-box v-model="tr.selected"/>
							</tu-td>
							<tu-td v-if="rowExpand">
								<tu-icon 
									icon="keyboard_arrow_right"
									@click="toggleRowExpansion(tr)" 
									class="tu-table__tr_expand_handle" 
									:class="{ expanded: tr.expanded }" />
							</tu-td>
							<tu-td v-for="th in table.visibleColumns.value" :key="th.field" :field="th.field"
								:style="getColumnStyle(th)">
								<!-- Server-defined template component -->
								<component 
									v-if="th.isTemplate && typeof th.component === 'string' && getTableComponent(th.component)"
									:is="getTableComponent(th.component as string)"
									:row-data="tr.data" 
									:row-index="trIndex"
									:field="th.field"
									v-bind="th.componentProps"
								/>
								
								<!-- User-defined template slot (static) -->
								<slot 
									v-else-if="th.isTemplate && $slots[th.field]" 
									:name="th.field" 
									:rowData="tr.data" 
									:rowIndex="trIndex"
									:field="th.field"
								/>
								
								<!-- Legacy component approach -->
								<component v-else-if="th.isComponent" 
									:modelValue="tr.componentValues?.[th.field || '']"
									@update:modelValue="tr.componentValues![th.field || ''] = $event"
									v-bind="th.componentProps" :is="th.component" />
								<span v-else-if="th.valueFormatter" v-html="th.valueFormatter(tr.data?.[th.field || ''])" />
								<span v-else>{{ tr.data?.[th.field || ''] }}</span>
							</tu-td>
						</tu-tr>
						<!-- Expanded row content -->
						<tr v-if="rowExpand && tr.expanded" class="tu-table__expanded-row">
							<td :colspan="totalColumnsWithExtras" class="tu-table__expanded-content">
								<slot name="expandedRow" :row="tr.data" :expandedData="tr.expandedData" :rowIndex="trIndex">
									<div class="default-expanded-content">
										<h4>Expanded Data:</h4>
										<pre>{{ JSON.stringify(tr.expandedData, null, 2) }}</pre>
									</div>
								</slot>
							</td>
						</tr>
					</template>
					<tr class="tu-table_not-found">
						<td>
							<span v-if="table.isEmpty.value" class="tu-table__no-data">
								No Data Found
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<!-- Pagination Footer -->
		<div v-if="pagination" class="tu-table__footer" :class="{
			'bordered': bordered
		}">
			<div class="tu-table__pagination">
				<tuPagination 
					v-model="currentPaginationPage"
					:total="paginationTotal"
					:perPage="table.pagination.pageSize"
					show-total
					show-size-changer
					:pageSizeOptions="[10, 25, 50, 100]"
					size="sm"
					@update:modelValue="handlePageChange"
					@page-size-change="handlePageSizeChange"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	computed,
	onBeforeUnmount,
	onMounted,
	provide,
	ref,
	useAttrs,
	watch
} from "vue";
import {
	useTuTableStore,
	generateRowId,
	type TuHeaderDefn
} from "./tuTableStore.refactored";
import { getTableComponent } from "./componentRegistry";

import tuTh from "./tuTh.vue";
import tuTr from "./tuTr.vue";
import tuTd from "./tuTd.vue";
import { TuCheckbox } from "../tuCheckBox";
import { TuIcon } from "../tuIcon";
import { TuPopper } from "../tuPopper";
import { TuPagination } from "../tuPagination";

/**
 * Transform raw data to TuTableRow format
 */
function transformDataToTableRows(data: unknown[], expandedRows: unknown[] = []): Array<{
	id: string | number;
	selected: boolean;
	expanded: boolean;
	data: Record<string, unknown>;
	expandedData: Record<string, unknown>;
	componentValues: Record<string, unknown>;
}> {
	return data.map((item) => {
		const row = item as Record<string, unknown>;
		const transformedData = row.data as Record<string, unknown> || row;
		const rowId = (row.id as string | number) ?? generateRowId();
		
		return {
			id: rowId,
			selected: false,
			expanded: expandedRows.some(expandedRow => {
				// Use ID-based comparison if available, otherwise fall back to object reference
				const expandedRowObj = expandedRow as Record<string, unknown>;
				return expandedRowObj?.id ? expandedRowObj.id === rowId : expandedRow === item;
			}),
			data: transformedData,
			expandedData: (row.expandedData as Record<string, unknown>) || {},
			componentValues: (row.componentValues as Record<string, unknown>) || {}
		};
	});
}

interface Props {
	// Core data props (required)
	columns: TuHeaderDefn[];
	data: unknown[];
	
	// Selection and interaction
	modelValue?: unknown;
	multiSelect?: boolean;
	
	// Table features
	columnSelector?: boolean;
	searchControls?: boolean;
	rowExpand?: boolean;
	expandedRows?: unknown[];
	
	// External data mode
	externalData?: boolean;
	
	// Column reordering and persistence
	draggableColumns?: boolean;
	persistentId?: string;
	
	// Styling and layout
	striped?: boolean;
	bordered?: boolean;
	compact?: boolean;
	size?: string;
	fixedWidth?: boolean;
	
	// Height and scrolling
	height?: string | number;
	maxHeight?: string | number;
	
	// State
	loading?: boolean;
	
	// Pagination
	pageSize?: number;
	pagination?: boolean;
	
	// Technical
	id?: string;
}

const props = withDefaults(defineProps<Props>(), {
	data: () => [],
	columns: () => [],
	multiSelect: false,
	columnSelector: false,
	searchControls: false,
	rowExpand: false,
	expandedRows: () => [],
	externalData: false,
	draggableColumns: false,
	persistentId: "",
	striped: false,
	bordered: false,
	compact: false,
	size: "",
	fixedWidth: false,
	height: "",
	maxHeight: "",
	loading: false,
	pageSize: 25,
	pagination: false,
	id: () => `tu-table-${Math.random().toString(36).substr(2, 9)}`
});

const emit = defineEmits<{
	"update:modelValue": [value: unknown];
	"update:expandedRows": [value: unknown[]];
	"rowClick": [value: unknown];
	"rowExpand": [value: { row: unknown; expanded: boolean }];
	"columnVisibilityChange": [value: { columns: TuHeaderDefn[] }];
	"columnReorder": [value: { columns: TuHeaderDefn[]; fromIndex: number; toIndex: number; persistentId?: string }];
	"queryChange": [query: {
		filters: { field: string; value: unknown; type: string }[];
		sorts: { field: string; direction: "asc" | "desc" }[];
		pagination: { page: number; pageSize: number };
	}];
}>();

defineOptions({
	name: "TuTable",
	inheritAttrs: false
});

const attrs = useAttrs();
const colspan = ref(0);
const thead = ref<HTMLHeadElement>();
const tableElement = ref<HTMLTableElement>();
const tableContainer = ref<HTMLDivElement>();
const selectedAll = ref(false);
const isLoaded = ref(false);
const isMounted = ref(false);
const searchEnabled = ref(false); // Controls whether search fields are shown

// Initialize the refactored table store
const table = useTuTableStore({
	columns: props.columns,
	data: transformDataToTableRows(props.data, props.expandedRows),
	persistence: props.persistentId ? {
		id: props.persistentId,
		saveOrder: props.draggableColumns,
		saveVisibility: props.columnSelector
	} : undefined,
	externalData: props.externalData
});

// Update pagination settings when pageSize prop changes
watch(() => props.pageSize, (newPageSize) => {
	if (newPageSize && newPageSize !== table.pagination.pageSize) 
		table.pagination.pageSize = newPageSize;
}, { immediate: true });

// Pagination state and computed properties
const currentPaginationPage = ref(1);

const paginationTotal = computed(() => {
	// For external data mode, we can't calculate total from local data
	// The parent should manage pagination externally
	if (props.externalData) 
		return props.data.length; // Use provided data length as total
	return table.totalRows.value;
});

// Handle pagination page change
const handlePageChange = (page: number) => {
	currentPaginationPage.value = page;
	table.pagination.currentPage = page;
	
	// Emit query change for external data mode
	if (props.externalData) 
		emitQueryChange();
};

// Handle page size change
const handlePageSizeChange = (size: number) => {
	table.pagination.pageSize = size;
	// Reset to first page when page size changes
	currentPaginationPage.value = 1;
	table.pagination.currentPage = 1;
	
	// Emit query change for external data mode
	if (props.externalData) 
		emitQueryChange();
};

// Sync pagination page with table store
watch(() => table.pagination.currentPage, (newPage) => {
	if (newPage !== currentPaginationPage.value) 
		currentPaginationPage.value = newPage;
});

// Create a reactive computed that ensures data updates are reflected
const reactiveTableData = computed(() => {
	const transformedData = transformDataToTableRows(props.data, props.expandedRows);
	return transformedData;
});

// Update table data when reactive data changes
watch(reactiveTableData, (newData) => {
	table.setData(newData);
}, { immediate: true });

// Memoized computed for better performance
const isMultipleSelected = computed(() => {
	return Array.isArray(props.modelValue);
});

// Memoized table CSS classes for better template performance
const tableClasses = computed(() => ({
	isSelectedValue: !!props.modelValue,
	striped: props.striped,
	bordered: props.bordered,
	isMultipleSelected: isMultipleSelected.value,
	[`size-${props.size}`]: true,
	footer: props.pagination,
	compact: props.compact,
	"fixed-width": props.fixedWidth,
	// Include classes passed from parent (like 'scrollable')
	...(attrs.class ? { [attrs.class as string]: true } : {})
}));

// Computed styles for the table container
const containerStyles = computed(() => {
	const styles: Record<string, string> = {};
	
	// Apply height if specified
	if (props.height) {
		styles.height = typeof props.height === "string" ? props.height : `${props.height}px`;
		styles.overflow = "hidden";
		styles.display = "flex";
		styles.flexDirection = "column";
	}
	
	// Apply maxHeight if specified
	if (props.maxHeight) {
		styles.maxHeight = typeof props.maxHeight === "string" ? props.maxHeight : `${props.maxHeight}px`;
		styles.overflow = "hidden";
		styles.display = "flex";
		styles.flexDirection = "column";
	}
	
	return styles;
});

// Computed styles for the actual table element when height is constrained
const tableStyles = computed(() => {
	const styles: Record<string, string> = {};
	
	if (props.height || props.maxHeight) {
		styles.height = "100%";
		styles.display = "block";
		styles.overflowY = "auto";
	}
	
	return styles;
});

// Calculate column widths with minimal sizes for select/expand columns
const getColumnStyle = computed(() => {
	return (header: TuHeaderDefn) => {
		const headers = table.visibleColumns.value;
		const visibleHeaders = headers.filter((h: TuHeaderDefn) => h.visible);
		
		// If header has explicit width, use it
		if (header.width) {
			return {
				width: typeof header.width === "string" ? header.width : `${header.width}px`,
				minWidth: header.minWidth ? `${header.minWidth}px` : undefined,
				maxWidth: header.maxWidth ? `${header.maxWidth}px` : undefined
			};
		}
		
		// Calculate remaining width after accounting for fixed columns
		const selectColumnWidth = 80; // Minimal width for checkbox column
		const expandColumnWidth = 60; // Minimal width for expand column
		
		let reservedWidth = 0;
		if (props.multiSelect) reservedWidth += selectColumnWidth;
		if (props.rowExpand) reservedWidth += expandColumnWidth;
		
		const availableWidth = Math.max(0, 100 - (reservedWidth * 100 / window.innerWidth || 0));
		const evenWidth = visibleHeaders.length > 0 ? `${availableWidth / visibleHeaders.length}%` : "auto";
		
		return {
			width: evenWidth,
			minWidth: header.minWidth ? `${header.minWidth}px` : "100px",
			maxWidth: header.maxWidth ? `${header.maxWidth}px` : undefined
		};
	};
});

// Calculate total columns including extra columns for colspan
const totalColumnsWithExtras = computed(() => {
	const headers = table.visibleColumns.value;
	const visibleHeaders = headers.filter((h: TuHeaderDefn) => h.visible);
	let extraColumns = 0;
	if (props.multiSelect) extraColumns++;
	if (props.rowExpand) extraColumns++;
	if (props.columnSelector) extraColumns++;
	return visibleHeaders.length + extraColumns;
});

function selected(val: unknown) {
	if (isMultipleSelected.value) selectedMultiple(val);
	else emit("update:modelValue", val);
}

function selectedMultiple(val: unknown) {
	const newVal = props.modelValue as Array<unknown>;
	if (newVal.includes(val)) newVal.splice(newVal.indexOf(val), 1);
	else newVal.push(val);

	emit("update:modelValue", newVal);
}

// Create an enhanced table instance for TuTh components
const enhancedTableInstance = computed(() => {
	if (props.externalData) {
		// Return a proxy that provides both UI-only and API-triggering methods
		return {
			...table,
			// UI-only methods (don't emit queryChange)
			addFilterUI: (filter: { field: string; type: string; value: unknown }) => {
				// Only add to local state for UI consistency, don't emit
				table.addFilter({ 
					field: filter.field, 
					type: filter.type as "like" | "equals" | "date-between", 
					value: filter.value 
				});
			},
			removeFilterUI: (field: string) => {
				// Only remove from local state for UI consistency, don't emit
				table.removeFilter(field);
			},
			// API-triggering methods (emit queryChange)
			addFilter: (filter: { field: string; type: string; value: unknown }) => {
				// Still add to local state for UI consistency
				table.addFilter({ 
					field: filter.field, 
					type: filter.type as "like" | "equals" | "date-between", 
					value: filter.value 
				});
				// Emit the current query state
				emitQueryChange();
			},
			removeFilter: (field: string) => {
				table.removeFilter(field);
				emitQueryChange();
			},
			setSort: (field: string, direction: "asc" | "desc") => {
				// Still update local state for UI consistency
				table.setSort(field, direction);
				emitQueryChange();
			},
			clearSort: () => {
				table.clearSort();
				emitQueryChange();
			}
		};
	}
	return table;
});

// Emit query change event for external data mode
const emitQueryChange = () => {
	if (!props.externalData) return;
	
	const filters = table.filters.map(f => ({
		field: f.field,
		value: f.value,
		type: f.type
	}));
	
	const sorts = table.sorters.map(s => ({
		field: s.field,
		direction: s.direction
	}));
	
	const pagination = {
		page: currentPaginationPage.value,
		pageSize: table.pagination.pageSize
	};
	
	emit("queryChange", { filters, sorts, pagination });
};

// Provide values for child components
provide("selected", (data: unknown) => {
	selected(data);
});

provide("tableInstance", enhancedTableInstance.value);
provide("tableId", props.id);
provide("externalData", props.externalData);
provide("searchEnabled", searchEnabled);

// Initialize data - always local mode now
if (props.data.length !== 0) 
	table.setData(transformDataToTableRows(props.data, props.expandedRows));

// Row click handler
function onRowClick(row: unknown) {
	emit("rowClick", row);
}

// Row expansion functionality  
function toggleRowExpansion(tableRow: { id: string | number; expanded: boolean; data: Record<string, unknown> }) {
	// Toggle the expanded state in the table row
	tableRow.expanded = !tableRow.expanded;
	
	// Update the external expandedRows prop for parent component sync
	const currentExpanded = [...(props.expandedRows || [])];
	const rowData = tableRow.data;
	const index = currentExpanded.indexOf(rowData);
	
	if (tableRow.expanded && index === -1) {
		// Row was just expanded, add to external array
		currentExpanded.push(rowData);
	} 
	else if (!tableRow.expanded && index > -1) {
		// Row was just collapsed, remove from external array
		currentExpanded.splice(index, 1);
	}
	
	// Emit the updates
	emit("update:expandedRows", currentExpanded);
	emit("rowExpand", { row: rowData, expanded: tableRow.expanded });
}
// Handle column visibility change from the column chooser
function handleVisibilityChange(header: TuHeaderDefn) {
	// Update column visibility using the new store API
	table.setColumnVisibility(header.field, header.visible ?? true);
	
	// Emit the updated columns to the parent
	emit("columnVisibilityChange", { columns: props.columns });
}

// Drag and drop functionality for column reordering
const dragIndex = ref<number | null>(null);
const dropIndex = ref<number | null>(null);
const isDragging = ref(false);

function startDrag(event: DragEvent, header: TuHeaderDefn) {
	if (!props.draggableColumns) {
		event.preventDefault();
		return;
	}
	
	isDragging.value = true;
	// Store the field name instead of index for better tracking
	dragIndex.value = table.visibleColumns.value.findIndex(h => h.field === header.field);
	
	if (event.dataTransfer) {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("text/plain", "");
	}
}

function onDragOver(event: DragEvent) {
	if (props.draggableColumns && isDragging.value) {
		event.preventDefault();
		if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
	}
}

function onDrop(event: DragEvent, header: TuHeaderDefn) {
	if (!props.draggableColumns || !isDragging.value) return;
	
	event.preventDefault();
	
	// Find the dragged header using the stored drag index
	const headers = table.visibleColumns.value;
	const draggedHeader = dragIndex.value !== null ? headers[dragIndex.value] : null;
	
	if (draggedHeader && draggedHeader.field !== header.field) {
		// Find positions in the original columns array using field names
		const draggedColumnIndex = props.columns.findIndex(col => col.field === draggedHeader.field);
		const dropTargetIndex = props.columns.findIndex(col => col.field === header.field);
		
		if (draggedColumnIndex !== -1 && dropTargetIndex !== -1) {
			// Use the table store's built-in reordering method which handles persistence properly
			if (props.persistentId) {
				const fromIndex = table.columns.findIndex(col => col.field === draggedHeader.field);
				const toIndex = table.columns.findIndex(col => col.field === header.field);
				table.reorderColumns(fromIndex, toIndex);
			}
			
			// Create a copy of columns for the event emission
			const reorderedColumns = [...props.columns];
			const draggedColumn = reorderedColumns[draggedColumnIndex];
			
			// Remove the dragged column and insert at new position  
			reorderedColumns.splice(draggedColumnIndex, 1);
			reorderedColumns.splice(dropTargetIndex, 0, draggedColumn);
			
			// Emit the reorder event - let parent handle the update
			emit("columnReorder", {
				columns: reorderedColumns,
				fromIndex: draggedColumnIndex,
				toIndex: dropTargetIndex,
				persistentId: props.persistentId || undefined
			});
		}
	}
	
	// Reset drag state
	isDragging.value = false;
	dragIndex.value = null;
	dropIndex.value = null;
}

function onDragEnd() {
	// Reset drag state on drag end (in case drop didn't fire)
	isDragging.value = false;
	dragIndex.value = null;
	dropIndex.value = null;
}

// Watch expanded rows changes and sync with table row state
watch(
	() => props.expandedRows,
	(newExpandedRows) => {
		// Update the expanded state of table rows based on external prop changes
		table.rawData.value.forEach(tableRow => {
			const shouldBeExpanded = newExpandedRows?.some(expandedRow => {
				const expandedRowObj = expandedRow as Record<string, unknown>;
				return expandedRowObj?.id ? expandedRowObj.id === tableRow.id : expandedRow === tableRow.data;
			}) || false;
			
			tableRow.expanded = shouldBeExpanded;
		});
	},
	{ deep: true }
);

onMounted(() => {

	if (thead.value) {
		colspan.value = thead.value.querySelectorAll("th").length;
		
		// Set CSS custom property for even column distribution
		if (tableElement.value) {
			tableElement.value.style.setProperty("--column-count", colspan.value.toString());
			
			// Check if any columns have explicit widths
			const headers = thead.value.querySelectorAll("th");
			const hasExplicitWidths = Array.from(headers).some(th => 
				th.style.width || th.getAttribute("width") || th.hasAttribute("data-width")
			);
			
			// Add class to control CSS behavior
			if (!hasExplicitWidths)
				tableElement.value.classList.remove("has-explicit-widths");
			else
				tableElement.value.classList.add("has-explicit-widths");
		}
	}

	// Handle last header width calculation if needed
	if (tableContainer.value && table.visibleColumns.value.length > 0) {
		const lastHeaderElement = tableContainer.value.querySelector("th:last-child") as HTMLElement;
		if (lastHeaderElement) {
			const containerWidth = tableContainer.value.offsetWidth;
			const lastHeaderLeft = lastHeaderElement.offsetLeft;
			lastHeaderElement.style.width = `${containerWidth - lastHeaderLeft}px`;
		}
	}

	isMounted.value = true;
});

onBeforeUnmount(() => {
	// Cleanup will happen automatically when the component is destroyed
});
</script>
<style lang="scss" scoped>
@import "../../style/sass/_functions";


.tu-table-content {
	width: 100%;
	height: 100%;
	animation-duration: 24s;
	display: inline-flex;
	flex-direction: column;
	// box-shadow: 0px 5px 22px 0px rgba(0,0,0, tuVar(shadow-opacity))
	border-radius: 16px;

	footer {
		padding-top: 10px;
		padding-bottom: 10px;
	}
}

.tu-table__element {
	table-layout: fixed;
	width: 100%;
	border-spacing: 0;
	
	// Ensure proper column distribution
	th, td {
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	// For manual header approach, ensure even column distribution
	thead tr:not(.has-fixed-widths) {
		th {
			width: auto;
		}
	}
	
	// Apply even width distribution when no explicit widths are set
	&:not(.has-explicit-widths) {
		thead tr {
			display: table-row;
			
			th {
				width: 1fr;
				// Use CSS Grid-like behavior with table-cell
				width: calc(100% / var(--column-count, 1));
			}
		}
		
		tbody tr {
			td {
				width: calc(100% / var(--column-count, 1));
			}
		}
	}
}

@keyframes fadeIn {
	0% {
		transform: scale(0);
	}

	100% {
		transform: scale(1);
	}
}

.animation-table {
	animation-name: fadeIn;
	animation-duration: 100ms;
}

.display-inline {
	display: inline-block !important;
}

.loading-body {
	position: relative;
}

.tu-table {
	font-size: 0.9rem;
	margin: 0px;
	height: 100%;
	
	// When inside a height-constrained container, make it scrollable
	&.scrollable,
	&[style*="height"],
	&[style*="max-height"] {
		display: block;
		height: 100%;
		overflow-y: auto;
		
		// Scrollbar styling
		scrollbar-width: thin;
		scrollbar-color: #adb5bd #f8f9fa;
		
		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}
		
		&::-webkit-scrollbar-track {
			background: #f8f9fa;
			border-radius: 4px;
		}
		
		&::-webkit-scrollbar-thumb {
			background: #adb5bd;
			border-radius: 4px;
		}
		
		&::-webkit-scrollbar-thumb:hover {
			background: #6c757d;
		}
		
		.tu-table__element {
			width: 100%;
		}
		
		.tu-table__thead {
			position: sticky;
			top: 0;
			z-index: 10;
			background: white;
		}
	}

	::v-deep(.tu-table__element) {
		margin: 0px;
		border-collapse: collapse;

		border: 0px;
	}

	&.compact {
		:deep(.tu-table__td) {
			padding: 5px 12px !important;
		}
	}

	&.striped {
		::v-deep(.tu-table__tr) {
			&:nth-child(even) {
				background: getColor("gray-2") !important;
			}
		}
	}
	

	&.bordered {

		::v-deep(.tu-table__element) {
			border: 4px solid getColorAlpha("text", 0.25);
			border-collapse: separate; /* allow border-radius to work */
			border-spacing: 0;         /* remove extra gaps */
			border-radius: 14px;       /* rounded corners */
			border-bottom-left-radius: 0px;
			border-bottom-right-radius: 0px;
		}

	
	}

	&.fixed-width {
		overflow: hidden;
		
		::v-deep(.tu-table__element) {
			table-layout: fixed;
			width: 100%;
			max-width: 100%;
		}

		::v-deep(.tu-table__th),
		::v-deep(.tu-table__td) {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	&__tr_expand_handle {
		transition: all 0.25s ease;

		&.expanded {
			transform: rotate(90deg);
		}
	}

	&.size-fitData {
		::v-deep(.tu-table__element) {
			width: auto;
			max-width: 100%;
		}
	}

	&_not-found {
		display: none;
		padding: 20px;
		text-align: center;
		width: 100%;

		::v-deep(tr) {
			text-align: center;

			::v-deep(td) {
				padding: 20px;
				border: 0px;

				// width: 100%
			}
		}
	}

	&__cell__data {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		display: table-cell;
	}

	&__tbody {
		background-color: getColor("background");
		overflow: auto;
		position: relative;

		&:empty {
			display: none;
			background: #000;

			~.tu-table_not-found {
				display: table-row-group;
			}
		}
		
		// Fixed column styles for select and expand in tbody
		::v-deep(.tu-table__td) {
			&[fixed] {
				width: 40px !important;
				min-width: 40px !important;
				max-width: 40px !important;
				text-align: center;
				padding: 8px 4px !important;
			}
		}
	}

	&.isSelectedValue {
		::v-deep(tr) {
			cursor: pointer;
		}
	}

	&__footer {
		padding: 8px 10px;
		background: getColor("gray-2");
		border-radius: 0px 0px 14px 14px;

		&.bordered {
			border: 4px solid getColorAlpha("text", 0.25);
			border-top: 0px;
			border-bottom-left-radius: 16px;
			border-bottom-right-radius: 16px;
		}
	}

	&__pagination {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	&__header {
		width: 100%;
		padding: 10px;
		background: getColor("gray-2");
		border-radius: 14px 14px 0px 0px;

		&~.tu-table {
			::v-deep(.tu-table__th) {
				&:first-child {
					border-radius: 0px;
				}

				&:last-child {
					border-radius: 0px;
				}
			}
		}
	}

	&__thead {
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 2;
		border-bottom: 1px solid getColorAlpha("text", 0.2);

		::v-deep(.tu-table__th) {
			background: getColor("gray-2");
			transition: all 0.2s ease;

			&:first-child {
				border-radius: 14px 0px 0px 0px;
			}

			&:last-child {
				border-radius: 0px 14px 0px 0px;
			}
			
			// Fixed column styles for select and expand
			&[fixed] {
				width: 40px !important;
				min-width: 40px !important;
				max-width: 40px !important;
				text-align: center;
				padding: 8px 4px !important;
			}
			
			// Drag and drop states
			&[draggable="true"] {
				cursor: grab;
				
				&:active {
					cursor: grabbing;
				}
			}
			
			&.dragging {
				opacity: 0.5;
				transform: scale(0.95);
				cursor: grabbing;
				background: getColorAlpha("primary", 0.1);
				border: 2px dashed getColor("primary");
			}
			
			&.drag-over {
				background: getColorAlpha("primary", 0.05);
				border-left: 3px solid getColor("primary");
				
				&:hover {
					background: getColorAlpha("primary", 0.1);
				}
			}
		}
	}

	&__no-data {
		display: flex;
		width: 100px;
		margin: 20px;
	}

	&__expanded-row {
		background-color: getColor("gray-1");
		
		.tu-table__expanded-content {
			padding: 15px;
			border-left: 3px solid getColor("primary");
			
			.default-expanded-content {
				background: getColor("background");
				padding: 10px;
				border-radius: 4px;
				font-family: monospace;
				font-size: 0.8rem;
				max-height: 200px;
				overflow: auto;
			}
		}
	}
}

// Table Controls Groove
.tu-table-controls-groove {
	background: linear-gradient(to bottom, getColor("gray-1"), getColor("gray-2"));
	border: 1px solid getColorAlpha("text", 0.1);
	border-bottom: none;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	padding: 3px 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	height: 20px;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
	width: fit-content;
	margin-left: auto;
	margin-right: 14px;
	margin-bottom: -1px; // Blend with table border

	.tu-table-control-icon {
		padding: 3px;
		border-radius: 3px;
		cursor: pointer;
		color: getColor("text");
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		min-width: 20px;
		min-height: 20px;

		&:hover {
			background-color: getColorAlpha("primary", 0.1);
			color: getColor("primary");
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
		}
	}
}

// Column Chooser Dropdown
.column-chooser-dropdown {
	background: getColor("background");
	border-radius: 4px;
	border: 1px solid getColorAlpha("text", 0.15);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	min-width: 160px;
	max-width: 240px;
	padding: 0;
	overflow: hidden;

	.column-chooser-header {
		background: getColor("gray-1");
		padding: 8px 12px;
		font-size: 12px;
		font-weight: 500;
		color: getColor("text");
		border-bottom: 1px solid getColorAlpha("text", 0.1);
	}

	.column-list {
		padding: 4px 0;

		.column-item {
			padding: 6px 12px;
			display: flex;
			align-items: center;
			transition: background-color 0.15s ease;
			cursor: pointer;

			&:hover {
				background-color: getColorAlpha("primary", 0.05);
			}

			.column-chooser-item {
				display: flex;
				align-items: center;
				width: 100%;
				cursor: pointer;
				
				::v-deep(.tu-check-box) {
					margin-right: 8px;
				}
				
				span {
					font-size: 13px;
					color: getColor("text");
					white-space: nowrap;
				}
			}
		}
	}
}

// Make sure table blends with groove when present
.tu-table-content:has(.tu-table-controls-groove) .tu-table {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.column-chooser-table-bar {
	display: flex;
	height: 25px;
	transform: translateY(15px);
	background-color: getColor("gray-2");
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	justify-content: center;
	width: 75px;
}

/* Drag and drop animations */
th.dragging {
	opacity: 0.5;
	transform: scale(0.95);
	transition: all 0.2s ease;
	cursor: grabbing !important;
}

th.drag-over {
	background-color: rgba(66, 165, 245, 0.1);
	border-left: 3px solid #42A5F5;
	transition: all 0.2s ease;
}

th[draggable="true"] {
	cursor: grab;
	transition: all 0.2s ease;
	
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
}
</style>

