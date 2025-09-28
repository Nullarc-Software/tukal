// ===================================================================
// SIMPLIFIED & MODERNIZED TU-TABLE STORE
// ===================================================================
// This is a simplified, type-safe, modular version of the original store

import { computed, reactive, ref, watch } from "vue";
import type { Component } from "vue";

// ===================================================================
// CORE TYPES (Compatible with Legacy Types)
// ===================================================================

export type TuHeaderDataTypes = "string" | "number" | "boolean" | "timestamp";
export type TuFilterDefnType = "like" | "equals" | "date-between";
export type TuSortDirection = "asc" | "desc";

export interface TuTableRow {
	id: string | number;
	selected: boolean;
	expanded: boolean;
	data: Record<string, unknown>;
	expandedData: Record<string, unknown>;
	componentValues?: Record<string, unknown>;
}

export interface TuHeaderDefn {
	field: string;
	caption: string;
	index?: number;
	visible?: boolean;
	width?: number | string;
	minWidth?: number;
	maxWidth?: number;
	dataType?: TuHeaderDataTypes;
	element?: HTMLElement;
	isComponent?: boolean;
	inputComponent?: boolean;
	isTemplate?: boolean;
	component?: Component | string;
	componentProps?: Record<string, unknown>;
	textWrap?: boolean;
	valueFormatter?: (value: unknown) => string;
	searchFunction?: (fieldValue: unknown, searchValue: unknown) => boolean;
	props?: {
		search?: boolean;
		sort?: boolean;
	};
	// Convenience properties that map to props
	sortable?: boolean;
	searchable?: boolean;
}

export interface TuFilterDefn {
	field: string;
	type: TuFilterDefnType;
	value: unknown;
}

export interface TuTableSorterDefn {
	field: string;
	direction: TuSortDirection;
}

export interface TuTableContextMenuEntry {
	caption: string | HTMLElement;
	icon?: HTMLElement;
	hasSubMenu?: boolean;
	disabled?: boolean;
	onClicked?: (...args: unknown[]) => void;
	data?: unknown;
	closeOnClick?: boolean;
	divider?: boolean;
	subMenu?: TuTableContextMenuEntry[];
}

export interface PaginationConfig {
	pageSize: number;
	currentPage: number;
}

export interface PersistenceConfig {
	id?: string;
	saveOrder?: boolean;
	saveVisibility?: boolean;
}

// ===================================================================
// COMPOSABLES (Separated Concerns)
// ===================================================================

/**
 * Handles local data filtering, sorting, and pagination
 */
export function useTableData(initialData: TuTableRow[] = [], externalData = false) {
	const rawData = ref<TuTableRow[]>(initialData);
	const filteredData = ref<TuTableRow[]>([]);
	const loading = ref(false);
	
	const filters = reactive<TuFilterDefn[]>([]);
	const sorters = reactive<TuTableSorterDefn[]>([]);
	const pagination = reactive<PaginationConfig>({ pageSize: 25, currentPage: 1 });

	// Apply filters
	const applyFilters = (data: TuTableRow[]): TuTableRow[] => {
		if (filters.length === 0) return data;
		
		return data.filter(row => {
			return filters.every(filter => {
				const value = getNestedValue(row.data, filter.field);
				if (!filter.value) return true;
				
				switch (filter.type) {
				case "like":
					return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
				case "equals":
					return value === filter.value;
				case "date-between": {
					// Handle date range filtering
					const [start, end] = Array.isArray(filter.value) ? filter.value : [null, null];
					const date = new Date(value as string);
					if (start && end) return date >= new Date(start) && date <= new Date(end);
					if (start) return date >= new Date(start);
					if (end) return date <= new Date(end);
					return true;
				}
				default:
					return true;
				}
			});
		});
	};

	// Apply sorting
	const applySorting = (data: TuTableRow[]): TuTableRow[] => {
		if (sorters.length === 0) return data;
		
		return [...data].sort((a, b) => {
			for (const sort of sorters) {
				const aVal = getNestedValue(a.data, sort.field);
				const bVal = getNestedValue(b.data, sort.field);
				
				let comparison = 0;
				if (aVal != null && bVal != null) {
					// Type assertion for comparison - values should be comparable
					const aComparable = aVal as string | number;
					const bComparable = bVal as string | number;
					
					if (aComparable < bComparable) comparison = -1;
					else if (aComparable > bComparable) comparison = 1;
				} 
				else if (aVal == null && bVal != null)
					comparison = -1;
				else if (aVal != null && bVal == null)
					comparison = 1;
				
				if (comparison !== 0) 
					return sort.direction === "desc" ? -comparison : comparison;
				
			}
			return 0;
		});
	};

	// Apply pagination
	const applyPagination = (data: TuTableRow[]): TuTableRow[] => {
		const start = (pagination.currentPage - 1) * pagination.pageSize;
		return data.slice(start, start + pagination.pageSize);
	};

	// Computed processed data
	const processedData = computed(() => {
		let result = rawData.value;
		
		// Skip internal processing if using external data mode
		if (externalData) {
			filteredData.value = result;
			return result; // Return raw data as-is for external processing (no pagination)
		}
		
		result = applyFilters(result);
		result = applySorting(result);
		filteredData.value = result; // Store for pagination calculations
		return applyPagination(result);
	});

	const totalRows = computed(() => filteredData.value.length);
	const totalPages = computed(() => Math.ceil(totalRows.value / pagination.pageSize));
	const selectedRows = computed(() => rawData.value.filter(row => row.selected));
	const isEmpty = computed(() => rawData.value.length === 0);

	return {
		// State
		rawData,
		filteredData,
		processedData,
		loading,
		filters,
		sorters,
		pagination,
		
		// Computed
		totalRows,
		totalPages,
		selectedRows,
		isEmpty,

		// Actions
		setData: (data: TuTableRow[]) => {
			rawData.value = data; 
		},
		addFilter: (filter: TuFilterDefn) => {
			const existing = filters.findIndex(f => f.field === filter.field);
			if (existing >= 0) filters.splice(existing, 1, filter);
			else filters.push(filter);
		},
		removeFilter: (field: string) => {
			const index = filters.findIndex(f => f.field === field);
			if (index >= 0) filters.splice(index, 1);
		},
		clearFilters: () => filters.splice(0),
		setSort: (field: string, direction: TuSortDirection) => {
			sorters.splice(0); // Single sort for simplicity
			sorters.push({ field, direction });
		},
		clearSort: () => sorters.splice(0),
		toggleRowSelection: (rowId: string | number) => {
			const row = rawData.value.find(r => r.id === rowId);
			if (row) row.selected = !row.selected;
		},
		selectAll: () => rawData.value.forEach(row => row.selected = true),
		selectNone: () => rawData.value.forEach(row => row.selected = false)
	};
}

/**
 * Handles column definitions and visibility
 */
export function useTableColumns(initialColumns: TuHeaderDefn[] = []) {
	const columns = reactive(initialColumns.map((col, index) => ({
		...col,
		index,
		visible: col.visible ?? true
	})) as (TuHeaderDefn & { index: number; visible: boolean })[]);

	const visibleColumns = computed(() => columns.filter(col => col.visible));
	const allColumns = computed(() => columns);

	return {
		columns,
		visibleColumns,
		allColumns,
		
		// Actions
		setColumnVisibility: (field: string, visible: boolean) => {
			const column = columns.find(col => col.field === field);
			if (column) column.visible = visible;
		},
		reorderColumns: (fromIndex: number, toIndex: number) => {
			const [moved] = columns.splice(fromIndex, 1);
			columns.splice(toIndex, 0, moved);
			// Update indices
			columns.forEach((col, index) => col.index = index);
		},
		getColumn: (field: string) => columns.find(col => col.field === field),
		updateColumn: (field: string, updates: Partial<TuHeaderDefn>) => {
			const column = columns.find(col => col.field === field);
			if (column) Object.assign(column, updates);
		}
	};
}

/**
 * Handles persistence to localStorage
 */
export function useTablePersistence(config: PersistenceConfig) {
	if (!config.id) return null;

	const storageKey = `tuTable_${config.id}`;

	const saveState = (state: { columns?: { field: string; visible: boolean; order: number }[] }) => {
		try {
			localStorage.setItem(storageKey, JSON.stringify(state));
		}
		catch (error) {
			console.warn("Failed to save table state:", error);
		}
	};

	const loadState = (): { columns?: { field: string; visible: boolean; order: number }[] } | null => {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : null;
		}
		catch (error) {
			console.warn("Failed to load table state:", error);
			return null;
		}
	};

	return { saveState, loadState };
}

/**
 * Main table store composable
 */
export function useTuTableStore(config: {
	columns: TuHeaderDefn[];
	data?: TuTableRow[];
	persistence?: PersistenceConfig;
	externalData?: boolean;
}) {
	// Initialize composables
	const dataStore = useTableData(config.data, config.externalData);
	const columnStore = useTableColumns(config.columns);
	const persistence = config.persistence?.id ? useTablePersistence(config.persistence) : null;

	// Load persisted state
	if (persistence) {
		const saved = persistence.loadState();
		if (saved?.columns) {
			// Apply visibility settings
			if (config.persistence?.saveVisibility) {
				saved.columns.forEach(savedCol => {
					columnStore.setColumnVisibility(savedCol.field, savedCol.visible);
				});
			}
			
			// Apply column ordering
			if (config.persistence?.saveOrder) {
				const orderedColumns: TuHeaderDefn[] = [];
				const remainingColumns = [...columnStore.columns];
				
				// Sort saved columns by their order
				const sortedSaved = saved.columns.sort((a, b) => a.order - b.order);
				
				sortedSaved.forEach(savedCol => {
					const index = remainingColumns.findIndex(col => col.field === savedCol.field);
					if (index >= 0) 
						orderedColumns.push(remainingColumns.splice(index, 1)[0]);
				});
				
				// Add any remaining columns
				orderedColumns.push(...remainingColumns);
				// Update columns with proper indices
				const finalColumns = orderedColumns.map((col, index) => ({...col, index, visible: col.visible ?? true}));
				columnStore.columns.splice(0, columnStore.columns.length, ...finalColumns);
			}
		}
	}

	// Auto-save changes
	if (persistence && (config.persistence?.saveVisibility || config.persistence?.saveOrder)) {
		watch(
			() => columnStore.columns.map((col, index) => ({ 
				field: col.field, 
				visible: col.visible, 
				order: index 
			})),
			(columns) => {
				persistence.saveState({ columns });
			},
			{ deep: true }
		);
	}

	return {
		// From data store
		...dataStore,
		
		// From column store
		columns: columnStore.columns,
		visibleColumns: columnStore.visibleColumns,
		allColumns: columnStore.allColumns,
		setColumnVisibility: columnStore.setColumnVisibility,
		reorderColumns: columnStore.reorderColumns,
		getColumn: columnStore.getColumn,
		
		// Additional computed
		isPartiallySelected: computed(() => {
			const selected = dataStore.selectedRows.value.length;
			return selected > 0 && selected < dataStore.totalRows.value;
		})
	};
}

// ===================================================================
// UTILITIES
// ===================================================================

/**
 * Get nested object value using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
	return path.split(".").reduce<unknown>((current, key) => {
		return current && typeof current === "object" ? (current as Record<string, unknown>)[key] : undefined;
	}, obj);
}

/**
 * Generate unique table row ID
 */
export function generateRowId(): string {
	return `row_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
}
