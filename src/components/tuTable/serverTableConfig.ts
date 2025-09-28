// Example: How to handle server-defined table columns with components

import type { TuHeaderDefn } from "./tuTableStore.refactored";

/**
 * Example server response for table configuration
 */
export interface ServerTableConfig {
	columns: {
		field: string;
		caption: string;
		sortable?: boolean;
		searchable?: boolean;
		width?: string | number;
		isTemplate?: boolean;
		component?: string;
		componentProps?: Record<string, unknown>;
	}[];
	data: Record<string, unknown>[];
}

/**
 * Simulate fetching table configuration from server
 * In real application, this would be an HTTP API call
 */
export async function fetchServerTableConfig(): Promise<ServerTableConfig> {
	// Simulate API delay
	await new Promise(resolve => setTimeout(resolve, 500));
	
	// Simulate server response
	return {
		columns: [
			{
				field: "id",
				caption: "ID",
				sortable: true,
				width: "60px"
			},
			{
				field: "name",
				caption: "Full Name",
				sortable: true,
				searchable: true
			},
			{
				field: "email", 
				caption: "Email Address",
				sortable: true,
				searchable: true
			},
			{
				field: "status",
				caption: "Account Status",
				isTemplate: true,
				component: "StatusBadge", // Server specifies component name
				componentProps: {
					type: "filled",
					size: "sm"
				}
			},
			{
				field: "role",
				caption: "User Role", 
				isTemplate: true,
				component: "StatusTag", // Different component
				componentProps: {
					type: "outline",
					size: "sm"
				}
			},
			{
				field: "actions",
				caption: "Actions",
				isTemplate: true,
				component: "ActionMenu",
				componentProps: {
					placement: "bottom-start"
				}
			}
		],
		data: [
			{
				id: 1,
				name: "John Doe",
				email: "john@example.com", 
				status: "active",
				role: "admin"
			},
			{
				id: 2,
				name: "Jane Smith",
				email: "jane@example.com",
				status: "inactive", 
				role: "user"
			},
			{
				id: 3,
				name: "Bob Johnson",
				email: "bob@example.com",
				status: "active",
				role: "moderator"
			}
		]
	};
}

/**
 * Transform server column definition to TuHeaderDefn
 */
export function transformServerColumns(serverColumns: ServerTableConfig["columns"]): TuHeaderDefn[] {
	return serverColumns.map(col => ({
		field: col.field,
		caption: col.caption,
		sortable: col.sortable || false,
		searchable: col.searchable || false,
		width: col.width,
		isTemplate: col.isTemplate || false,
		component: col.component,
		componentProps: col.componentProps || {}
	}));
}
