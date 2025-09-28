<template>
	<div class="row-info-demo">
		<div class="row-summary">
			<strong>Row {{ rowIndex + 1 }}</strong>
			<span class="row-id">ID: {{ (rowData as any)?.id }}</span>
		</div>
		<div class="row-details">
			{{ (rowData as any)?.name || 'N/A' }} - {{ (rowData as any)?.email || 'N/A' }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTableRowContext } from "../components/tuTable";

// Automatically access row data and index through provide/inject
const rowContext = useTableRowContext();
const rowData = rowContext?.rowData;
const rowIndex = rowContext?.rowIndex ?? -1;
</script>

<style scoped>
.row-info-demo {
	padding: 8px 12px;
	background: #f8f9fa;
	border-radius: 4px;
	font-size: 0.85em;
}

.row-summary {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 4px;
}

.row-id {
	color: #6c757d;
	font-size: 0.9em;
}

.row-details {
	color: #495057;
	font-size: 0.9em;
}
</style>
