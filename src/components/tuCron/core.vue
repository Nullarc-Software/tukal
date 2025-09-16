
<template>
	<slot v-bind="slotProps" />
</template>

<script setup lang="ts">
import multiple from "./fields/multiple";
import { Field, Position } from "./types";
import { getLocale, defaultItems, Locale } from "./locale";
import util from "./util";
import { computed, reactive, ref, watch } from "vue";

// Define props
interface Props {
	modelValue?: string;
	fields?: Array<{
		id: string;
		items: Array<unknown>;
	}>;
	periods?: Array<{
		id: string;
		value: Array<string>;
	}>;
	customLocale?: Record<string, unknown> | null;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: "* * * * *",
	fields: () => {
		const items = defaultItems("en") as {
			minuteItems: Array<unknown>;
			hourItems: Array<unknown>;
			dayItems: Array<unknown>;
			monthItems: Array<unknown>;
			dayOfWeekItems: Array<unknown>;
		};
		return [
			{ id: "minute", items: items.minuteItems },
			{ id: "hour", items: items.hourItems },
			{ id: "day", items: items.dayItems },
			{ id: "month", items: items.monthItems },
			{ id: "dayOfWeek", items: items.dayOfWeekItems }
		];
	},
	periods: () => {
		return [
			{ id: "minute", value: [] },
			{ id: "hour", value: ["minute"] },
			{ id: "day", value: ["hour", "minute"] },
			{ id: "week", value: ["dayOfWeek", "hour", "minute"] },
			{ id: "month", value: ["day", "dayOfWeek", "hour", "minute"] },
			{ id: "year", value: ["month", "day", "dayOfWeek", "hour", "minute"] }
		];
	},
	customLocale: null
});

// Define emits
const emit = defineEmits<{
	"update:model-value": [value: string];
	"error": [error: string];
}>();

// Define component name
defineOptions({
	name: "VueCronCore"
});

// Initialize selected state
const selected = reactive<Record<string, Array<unknown>>>({});
for (const field of props.fields)
	selected[field.id] = [];

const error = ref("");
const selectedPeriod = ref(props.periods[props.periods.length - 1]);

// Computed properties
const splitValue = computed(() => {
	return props.modelValue.split(" ");
});

const fieldIndex = computed(() => {
	return props.fields.reduce((acc: Record<string, number>, f, i: number) => {
		acc[f.id] = i;
		return acc;
	}, {});
});

const periodIndex = computed(() => {
	return props.periods.reduce((acc: Record<string, number>, p, i: number) => {
		acc[p.id] = i;
		return acc;
	}, {});
});

const computedFields = computed(() => {
	return props.fields.map((f) => new Field(f.id, f.items));
});

const filteredFields = computed(() => {
	return selectedPeriod.value.value.map((fieldId: string) => {
		const i = fieldIndex.value[fieldId];
		return computedFields.value[i];
	});
});

const _loc = computed(() => {
	return props.customLocale ? new Locale(props.customLocale) : getLocale("en", {} as Record<string, unknown>);
});

const _periods = computed(() => {
	if (!props.periods)
		return [];
	
	return props.periods.map((p) => {
		return Object.assign({
			text: _loc.value.getLocaleStr(p.id, Position.Text)
		}, p);
	});
});

// Methods
const defaultValue = () => {
	return new Array(props.fields.length).fill("*").join(" ");
};

const cronToSelected = (value: string) => {
	if (!value) {
		emit("update:model-value", defaultValue());
		return;
	}

	if (splitValue.value.length !== props.fields.length) {
		error.value = "invalid pattern";
		return;
	}

	for (let i = 0; i < splitValue.value.length; i++) {
		const field = computedFields.value[i];
		if (!selectedPeriod.value.value.includes(field.id))
			continue;

		const array = multiple.strToArray(splitValue.value[i], field);
		if (array === null) {
			error.value = "invalid pattern";
			return;
		}
		selected[field.id] = array;
	}

	error.value = "";
};

const selectedToCron = (selectedData: Record<string, Array<unknown>>) => {
	const strings = [];
	for (const field of computedFields.value) {
		if (!selectedPeriod.value.value.includes(field.id)) {
			strings.push("*");
			continue;
		}
		const array = selectedData[field.id];
		const str = multiple.arrayToStr(array, field);
		if (str === null) {
			error.value = "invalid selection";
			return;
		}
		strings.push(str.value);
	}
	error.value = "";
	emit("update:model-value", strings.join(" "));
};

// Watchers
watch(() => props.modelValue, (value: string) => {
	cronToSelected(value);
}, { immediate: true });

watch(selected, (selectedData: Record<string, Array<unknown>>) => {
	selectedToCron(selectedData);
}, { deep: true });

watch(selectedPeriod, () => {
	selectedToCron(selected);
});

watch(error, (errorValue: string) => {
	emit("error", errorValue);
});

// Computed slot props for the template
const slotProps = computed(() => {
	const fieldProps = [];
	for (const field of filteredFields.value) {
		const i = fieldIndex.value[field.id];
		const values = selected[field.id];

		const attrs = {
			modelValue: values
		};
		const events = {
			"update:model-value": ((fieldId: string) => (evt: Array<unknown>) => {
				const selectedArray = Array.from(evt).sort((a: unknown, b: unknown) => {
					// Type assertion for comparison - assumes numeric or string values
					return (a as number | string) > (b as number | string) ? 1 : -1;
				});
				selected[fieldId] = selectedArray;
			})(field.id)
		};

		const cronSegment = multiple.arrayToStr(values, field);
		if (!cronSegment) continue;
		
		const segments = Array.isArray((cronSegment as { segments?: unknown }).segments) 
			? (cronSegment as { segments: Array<unknown> }).segments 
			: [cronSegment];

		const selectedStr = segments.map((seg: unknown) => {
			const params = util.populate(seg, field.itemMap) as Record<string, unknown>;
			params.field = field;
			return _loc.value.render(selectedPeriod.value.id, field.id, (seg as { type: string }).type, Position.Text, params);
		}).join(",");
		const prefix = _loc.value.getLocaleStr(selectedPeriod.value.id, field.id, (cronSegment as { type: string }).type, Position.Prefix);
		const suffix = _loc.value.getLocaleStr(selectedPeriod.value.id, field.id, (cronSegment as { type: string }).type, Position.Suffix);

		fieldProps.push({
			...field,
			cron: splitValue.value[i],
			selectedStr,
			events,
			attrs,
			prefix,
			suffix
		});
	}

	return {
		error: error.value,
		fields: fieldProps,
		period: {
			attrs: {
				modelValue: selectedPeriod.value.id
			},
			events: {
				"update:model-value": (periodId: string) => {
					const i = periodIndex.value[periodId] || 0;
					selectedPeriod.value = props.periods[i];
				}
			},
			items: _periods.value,
			prefix: _loc.value.getLocaleStr(selectedPeriod.value.id, Position.Prefix),
			suffix: _loc.value.getLocaleStr(selectedPeriod.value.id, Position.Suffix)
		}
	};
});
</script>
