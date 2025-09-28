import { inject } from "vue";
import type { TuTableRowContext } from "./tuTr.vue";

/**
 * Composable to access table row context in components rendered within table cells
 * 
 * @returns {TuTableRowContext | null} Row context containing rowData and rowIndex
 * 
 * @example
 * ```typescript
 * // In any component rendered in a table cell
 * const rowContext = useTableRowContext();
 * 
 * if (rowContext) {
 *   // Access current row data: rowContext.rowData
 *   // Access current row index: rowContext.rowIndex
 * }
 * ```
 */
export function useTableRowContext(): TuTableRowContext | null {
	return inject<TuTableRowContext | null>("tuTableRowContext", null);
}

/**
 * Hook to get specific field value from current row data
 * 
 * @param field - The field name to extract from row data
 * @returns {unknown} The field value or undefined
 * 
 * @example
 * ```typescript
 * const userName = useTableRowField("name");
 * const userEmail = useTableRowField("email");
 * ```
 */
export function useTableRowField(field: string): unknown {
	const rowContext = useTableRowContext();
	if (!rowContext?.rowData) return undefined;
	
	// Handle nested field access with dot notation
	const fieldParts = field.split(".");
	let value = rowContext.rowData as Record<string, unknown>;
	
	for (const part of fieldParts) {
		if (value && typeof value === "object" && part in value) 
			value = value[part] as Record<string, unknown>;
		else 
			return undefined;
	}
	
	return value;
}

/**
 * Hook to get current row index
 * 
 * @returns {number} Current row index or -1 if not in table context
 */
export function useTableRowIndex(): number {
	const rowContext = useTableRowContext();
	return rowContext?.rowIndex ?? -1;
}
