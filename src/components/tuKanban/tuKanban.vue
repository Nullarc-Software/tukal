<template>
	<div class="tu-kanban">
		<!-- Search Section -->
		<div class="tu-kanban__search">
			<tu-input 
				v-model="search" 
				placeholder="Search items..."
			/>
		</div>

		<!-- Kanban Board -->
		<div 
			:id="`tu-kanban-${componentId}`" 
			class="tu-kanban__board"
		>
			<!-- Column/Category -->
			<div
				v-for="(field, index) in fields"
				:key="field.fieldName"
				class="tu-kanban__column"
				:class="getColumnClass(index)"
				@dragenter.prevent
				@dragover.prevent
				@drop="handleDrop($event, field.fieldName)"
			>
				<!-- Column Header -->
				<div class="tu-kanban__column-header">
					<span class="tu-kanban__column-title">
						{{ field.title }}
					</span>
					<span 
						v-if="getSelectedCountForField(field.fieldName) > 0"
						class="tu-kanban__badge"
					>
						{{ getSelectedCountForField(field.fieldName) }}
					</span>
				</div>

				<!-- Column Body -->
				<div class="tu-kanban__column-body">
					<!-- Kanban Item -->
					<div
						v-for="item in getItemsForField(field.fieldName)"
						:key="item.id"
						class="tu-kanban__item"
						:class="{ 'tu-kanban__item--selected': item.selected }"
						draggable="true"
						@dragstart="handleDragStart($event, item)"
						@click="handleItemClick(item)"
					>
						<!-- Item Image -->
						<img 
							v-if="item.image" 
							:src="item.image" 
							:alt="item.content"
							class="tu-kanban__item-image"
						/>
						
						<!-- Item Icon -->
						<tu-icon 
							v-else-if="item.icon" 
							class="tu-kanban__item-icon"
						>
							{{ item.icon }}
						</tu-icon>

						<!-- Item Content -->
						<span class="tu-kanban__item-text">
							{{ item.content }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { TuKanbanItem, TuKanbanField } from "./utils";
import { TuInput } from "../tuInput";
import { TuIcon } from "../tuIcon";
import { TuLoading, TuLoadingAttributes } from "../tuLoading";

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

defineOptions({
	name: "tuKanban"
});

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Server-side configuration for remote data fetching
 */
interface ServerSideConfig {
	/** Enable server-side data fetching */
	enabled: boolean;
	/** API endpoint URL */
	url: string;
	/** Request parameters */
	params: Record<string, unknown>;
	/** HTTP method (GET, POST, etc.) */
	method: string;
	/** Request headers */
	headers: Record<string, string>;
}

/**
 * Component Props Interface
 */
interface Props {
	/** Array of kanban items to display */
	items?: TuKanbanItem[];
	
	/** Array of kanban fields/columns */
	fields?: TuKanbanField[];
	
	/** Enable multi-selection of items */
	multiSelect?: boolean;
	
	/** Height of kanban items (deprecated - use CSS instead) */
	height?: string;
	
	/** Server-side configuration for remote data */
	serverSideConfig?: ServerSideConfig;
	
	/** v-model binding value */
	modelValue?: unknown;
}

// ============================================================================
// PROPS & EMITS
// ============================================================================

const props = withDefaults(defineProps<Props>(), {
	items: () => [],
	fields: () => [],
	multiSelect: false,
	height: "42px",
	serverSideConfig: () => ({
		enabled: false,
		url: "",
		params: {},
		method: "GET",
		headers: {}
	}),
	modelValue: undefined
});

/**
 * Component Events
 */
const emit = defineEmits<{
	/** Emitted when drag operation occurs */
	onDrag: [data: unknown];
	/** Emitted when model value updates */
	"update:modelValue": [value: unknown];
}>();

// ============================================================================
// STATE
// ============================================================================

/** Unique component identifier */
const componentId = ref<number>(Math.floor(Math.random() * 100000));

/** Current filtered/displayed items */
const currentItems = ref<TuKanbanItem[]>([...props.items]);

/** Search query string */
const search = ref<string>("");

/** Loading instance for async operations */
let loadingInstance: TuLoading | null = null;

// ============================================================================
// COMPUTED PROPERTIES
// ============================================================================

/**
 * Get items filtered by field name
 */
const getItemsForField = computed(() => {
	return (fieldName: string): TuKanbanItem[] => {
		return currentItems.value.filter(item => item.fieldName === fieldName);
	};
});

/**
 * Get count of selected items for a specific field
 */
const getSelectedCountForField = computed(() => {
	return (fieldName: string): number => {
		return currentItems.value.filter(
			item => item.fieldName === fieldName && item.selected
		).length;
	};
});

/**
 * Get column CSS class based on position
 */
const getColumnClass = computed(() => {
	return (index: number): string => {
		const classes: string[] = [];
		
		if (index === 0) 
			classes.push("tu-kanban__column--first");
		
		if (index === props.fields.length - 1) 
			classes.push("tu-kanban__column--last");
		
		return classes.join(" ");
	};
});

// ============================================================================
// METHODS
// ============================================================================

/**
 * Initialize loading indicator
 */
const initializeLoading = (): void => {
	const attrs: TuLoadingAttributes = {
		target: `#tu-kanban-${componentId.value}`,
		color: "dark",
		type: "circles",
		scale: "1.0"
	};
	loadingInstance = new TuLoading(attrs);
};

/**
 * Close loading indicator
 */
const closeLoading = (): void => {
	if (loadingInstance) {
		loadingInstance.close();
		loadingInstance = null;
	}
};

/**
 * Handle drag start event
 * @param event - Drag event
 * @param item - Kanban item being dragged
 */
const handleDragStart = (event: DragEvent, item: TuKanbanItem): void => {
	if (event.dataTransfer) 
		event.dataTransfer.effectAllowed = "move";
	
	// Mark item as selected for visual feedback
	item.selected = true;
};

/**
 * Handle drop event
 * @param event - Drop event
 * @param targetFieldName - Target field name where item is dropped
 */
const handleDrop = (event: DragEvent, targetFieldName: string): void => {
	event.preventDefault();
	
	// Update all selected items to new field
	currentItems.value.forEach((item) => {
		if (item.selected) {
			item.fieldName = targetFieldName;
			item.selected = false;
		}
	});
	
	// Emit updated items
	emit("update:modelValue", currentItems.value);
	emit("onDrag", { items: currentItems.value, targetField: targetFieldName });
};

/**
 * Handle item click event
 * @param item - Clicked kanban item
 */
const handleItemClick = (item: TuKanbanItem): void => {
	if (!props.multiSelect) 
		return;
	
	// Toggle selection state
	item.selected = !item.selected;
};

/**
 * Filter items based on search query
 * @param query - Search query string
 */
const filterItems = (query: string): void => {
	if (!query || query.trim() === "") {
		currentItems.value = [...props.items];
		return;
	}
	
	const lowerQuery = query.toLowerCase();
	currentItems.value = props.items.filter((item: TuKanbanItem) =>
		item.content.toLowerCase().includes(lowerQuery)
	);
};

// ============================================================================
// WATCHERS
// ============================================================================

/**
 * Watch search query and filter items
 */
watch(search, (newQuery) => {
	initializeLoading();
	
	// Small delay for better UX
	setTimeout(() => {
		filterItems(newQuery);
		closeLoading();
	}, 100);
});

/**
 * Watch items prop for external updates
 */
watch(() => props.items, (newItems) => {
	currentItems.value = [...newItems];
	
	// Re-apply search filter if active
	if (search.value) 
		filterItems(search.value);
}, { deep: true });

// ============================================================================
// LIFECYCLE HOOKS
// ============================================================================

onMounted(() => {
	// Initialize with props items
	currentItems.value = [...props.items];
});
</script>

<style scoped lang="scss">
@import "../../style/sass/_functions";

// ============================================================================
// KANBAN COMPONENT (BEM Methodology)
// ============================================================================

/**
 * Block: tu-kanban
 * Main kanban board container
 */
.tu-kanban {
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 1rem;

	// Element: Search section
	&__search {
		flex: 0 0 auto;
	}

	// Element: Board container
	&__board {
		display: flex;
		height: 100%;
		overflow-x: auto;
		gap: 0;
	}

	// Element: Column/Category
	&__column {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 250px;
		max-width: 350px;
		overflow: hidden;
		border-right: 1px solid getColor("gray-2");
		border-left: 1px solid getColor("gray-2");
		border-bottom: 1px solid getColor("gray-2");

		// Modifier: First column
		&--first {
			border-top-left-radius: 14px;
			border-bottom-left-radius: 14px;

			.tu-kanban__column-header {
				border-top-left-radius: 14px;
			}
		}

		// Modifier: Last column
		&--last {
			border-top-right-radius: 14px;
			border-bottom-right-radius: 14px;

			.tu-kanban__column-header {
				border-top-right-radius: 14px;
			}
		}
	}

	// Element: Column header
	&__column-header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem 1rem;
		background-color: getColor("gray-2");
		font-weight: 600;
		font-size: 0.95rem;
		text-align: center;
	}

	// Element: Column title
	&__column-title {
		flex: 1;
	}

	// Element: Column body (items container)
	&__column-body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		overflow-y: auto;
		overflow-x: hidden;
	}

	// Element: Kanban item card
	&__item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		background-color: var(--tu-background);
		border: 2px solid transparent;
		border-radius: 12px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08),
					0 1px 2px 0 rgba(0, 0, 0, 0.06);
		cursor: pointer;
		transition: all 0.15s ease-in-out;
		user-select: none;

		&:hover {
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
						0 2px 4px -1px rgba(0, 0, 0, 0.06);
			transform: translateY(-2px);
		}

		&:active {
			transform: translateY(0);
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		}

		// Modifier: Selected state
		&--selected {
			border-color: getColorAlpha("primary", 1);
			background-color: getColorAlpha("primary", 0.08);
		}
	}

	// Element: Item image
	&__item-image {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		border-radius: 4px;
		object-fit: cover;
	}

	// Element: Item icon
	&__item-icon {
		flex-shrink: 0;
		font-size: 24px;
	}

	// Element: Item text content
	&__item-text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.9rem;
	}

	// Element: Badge (for selected count)
	&__badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.5rem;
		height: 1.5rem;
		padding: 0 0.4rem;
		background-color: var(--tu-primary);
		color: #ffffff;
		border-radius: 0.75rem;
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1;
	}
}

// ============================================================================
// DARK THEME OVERRIDES
// ============================================================================

.tu-dark-theme {
	.tu-kanban {
		&__item {
			background-color: var(--tu-gray-1);
			box-shadow: 0 1px 3px 0 rgba(255, 255, 255, 0.05),
						0 1px 2px 0 rgba(255, 255, 255, 0.03);

			&:hover {
				box-shadow: 0 4px 6px -1px rgba(255, 255, 255, 0.08),
							0 2px 4px -1px rgba(255, 255, 255, 0.05);
			}

			// Modifier: Selected state in dark theme
			&--selected {
				border-color: getColorAlpha("primary", 1);
				background-color: getColorAlpha("primary", 0.15);
			}
		}
	}
}
</style>
