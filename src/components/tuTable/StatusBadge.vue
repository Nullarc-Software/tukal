<template>
	<tu-tag
		:color="getColorForStatus(rowData?.status)"
		:type="type"
		:size="size"
	>
		{{ getStatusText(rowData?.status) }}
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
	type: "filled",
	size: "sm"
});

// Access row data through context if not provided as prop
const rowContext = useTableRowContext();
const rowData = computed(() => props.rowData || rowContext?.rowData as Record<string, unknown> || {});

function getColorForStatus(status: unknown): string {
	switch (status) {
	case "active":
		return "success";
	case "inactive":
		return "warning";
	case "pending":
		return "info";
	case "error":
		return "danger";
	default:
		return "secondary";
	}
}

function getStatusText(status: unknown): string {
	if (typeof status === "string")
		return status.charAt(0).toUpperCase() + status.slice(1);
	return "Unknown";
}
</script>
