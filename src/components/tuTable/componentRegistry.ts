import { Component } from "vue";

// Import your table cell components
import { tuTag } from "../tuTag";
import { tuButton } from "../tuButton";
import tuSwitch from "../tuSwitch";
import tuTableContextMenu from "./tuTableContextMenu.vue";
import StatusBadge from "./StatusBadge.vue";
import StatusTag from "./StatusTag.vue";

// Component registry for server-defined components
export const tableComponentRegistry: Record<string, Component> = {
	// Status components
	"StatusBadge": StatusBadge,
	"StatusTag": StatusTag,
	
	// Action components
	"ActionMenu": tuTableContextMenu,
	"ActionButton": tuButton,
	
	// Form components
	"ToggleSwitch": tuSwitch,
	
	// Legacy components (for backward compatibility)
	"tuTag": tuTag,
	"tuButton": tuButton,
	"tuSwitch": tuSwitch,
	
	// Add more components as your application grows
};

/**
 * Get a registered component by name
 */
export function getTableComponent(name: string): Component | null {
	return tableComponentRegistry[name] || null;
}

/**
 * Check if a component is registered
 */
export function hasTableComponent(name: string): boolean {
	return name in tableComponentRegistry;
}

/**
 * Register a new component dynamically
 */
export function registerTableComponent(name: string, component: Component): void {
	tableComponentRegistry[name] = component;
}

/**
 * Get all registered component names
 */
export function getRegisteredComponentNames(): string[] {
	return Object.keys(tableComponentRegistry);
}
