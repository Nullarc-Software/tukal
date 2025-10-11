<!--
/**
 * @fileoverview TuCron - A Vue 3 cron expression editor component
 * @component TuCron
 * @author Tukal UI Library
 * @since 1.0.0
 * 
 * @description
 * A comprehensive cron expression editor component that provides an intuitive interface
 * for creating and editing cron expressions. Supports customizable fields, periods,
 * and localization.
 * 
 * @example
 * <TuCron 
 *   v-model="cronExpression"
 *   :cols="{ minute: 5, hour: 4, day: 4 }"
 *   :customLocale="customLocale"
 *   @error="handleError"
 * />
 * 
 * @features
 * - Interactive cron expression editing
 * - Customizable column layouts
 * - Internationalization support
 * - Type-safe props and events
 * - Accessible form controls
 */
-->
<template>
	<div>
		<CronCore :fields="fields" :periods="periods" :customLocale="customLocale" :mergeLocale="true" v-bind="$attrs"
			@update:model-value="$emit('update:model-value', $event)" @error="$emit('error', $event)"
			v-slot="{ fields, period }">
			<span class="vcron-editor">
				<span>{{ period.prefix }}</span>
				<div class="vcron-l-spacer">
					<custom-select v-bind="period.attrs" v-on="period.events" :items="period.items" item-value="id"
						:cols="cols['period'] || 1" />
				</div>
				<span>{{ period.suffix }}</span>

				<template v-for="f in fields" :key="f.id">
					<span>{{ f.prefix }}</span>
					<div class="vcron-l-spacer">
						<custom-select v-bind="f.attrs" v-on="f.events" :items="f.items" :cols="cols[f.id] || 1"
							:selection="f.selectedStr" multiple></custom-select>
					</div>
					<span>{{ f.suffix }}</span>
				</template>
			</span>
		</CronCore>
	</div>
</template>

<script setup lang="ts">
import CronCore from "./core.vue";
import CustomSelect from "./customSelect.vue";

defineOptions({
	name: "TuCron"
});

/**
 * Generic event handler type for better type safety
 */
type EventHandler = (...args: unknown[]) => void;

/**
 * Represents a cron field configuration
 */
interface CronField {
	id: string;
	prefix?: string;
	suffix?: string;
	attrs?: Record<string, unknown>;
	events?: Record<string, EventHandler>;
	items: Array<{ id: string; label: string; value: unknown }>;
	selectedStr?: string;
}

/**
 * Represents a cron period configuration
 */
interface CronPeriod {
	id: string;
	value: string[];
	prefix?: string;
	suffix?: string;
	attrs?: Record<string, unknown>;
	events?: Record<string, EventHandler>;
	items?: Array<{ id: string; label: string; value: unknown }>;
}

/**
 * Props interface for TuCron component
 */
interface Props {
	/**
	 * Column configuration for different time periods
	 * @default { minute: 5, hour: 4, day: 4 }
	 */
	cols?: Record<string, number>;
	
	/**
	 * Custom locale configuration for internationalization
	 * @default undefined
	 */
	customLocale?: Record<string, unknown> | undefined;
	
	/**
	 * Array of cron field configurations
	 * @default undefined
	 */
	fields?: CronField[];
	
	/**
	 * Array of cron period configurations
	 * @default undefined
	 */
	periods?: CronPeriod[];
}

withDefaults(defineProps<Props>(), {
	cols: () => ({
		minute: 5,
		hour: 4,
		day: 4
	}),
	customLocale: undefined
});

/**
 * Component events
 */
defineEmits<{
	/**
	 * Emitted when the cron expression value is updated
	 */
	"update:model-value": [value: string];
	
	/**
	 * Emitted when an error occurs
	 */
	error: [error: Error | string];
}>();
</script>

<style>
/**
 * TuCron Component Styles
 * Provides styling for the cron expression editor interface
 */

/* Main editor container */
.vcron-editor {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.25rem;
}

/* Spacer for form controls */
.vcron-l-spacer {
	display: inline-block;
	padding: 3px;
	min-width: 0; /* Prevent flex items from shrinking below content size */
}

/* Responsive behavior for smaller screens */
@media (max-width: 768px) {
	.vcron-editor {
		flex-direction: column;
		align-items: stretch;
	}
	
	.vcron-l-spacer {
		padding: 2px;
	}
}
</style>