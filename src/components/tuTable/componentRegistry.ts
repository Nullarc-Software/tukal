import { Component } from "vue";

// Import your table cell components
import { TuTag } from "../tuTag";
import { TuButton } from "../tuButton";
import { TuSwitch } from "../tuSwitch";
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
	"ActionButton": TuButton,
	
	// Form components
	"ToggleSwitch": TuSwitch,
	
	// Legacy components (for backward compatibility)
	"tuTag": TuTag,
	"tuButton": TuButton,
	"tuSwitch": TuSwitch,
	
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
