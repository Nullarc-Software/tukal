<template>
	<tu-tag
		:color="getColorForPriority(rowData?.[field || 'priority'])"
		:type="type"
		:size="size"
	>
		{{ getPriorityText(rowData?.[field || 'priority']) }}
	</tu-tag>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TuTag } from "../tuTag";
import { useTableRowContext } from "../tuTable";

interface Props {
	type?: "filled" | "outline" | "ghost";
	size?: "xs" | "sm" | "md" | "lg";
	rowData?: Record<string, unknown>;
	rowIndex?: number;
	field?: string;
}

const props = withDefaults(defineProps<Props>(), {
	type: "outline",
	size: "sm",
	field: "priority"
});

// Access row data through context if not provided as prop
const rowContext = useTableRowContext();
const rowData = computed(() => props.rowData || rowContext?.rowData as Record<string, unknown> || {});

function getColorForPriority(priority: unknown): string {
	switch (priority) {
	case "high":
		return "danger";
	case "medium":
		return "warning";
	case "low":
		return "success";
	default:
		return "secondary";
	}
}

function getPriorityText(priority: unknown): string {
	if (typeof priority === "string")
		return priority.toUpperCase();
	return "N/A";
}
</script>
