<template>
	<div
		class="tu-select__option-group"
		:class="[
			{
				hiddenOptionGroup: hiddenOptionGroup
			}
		]"
	>
		<h5>
			<slot name="title" />
		</h5>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, inject, Ref, ref, watch, useSlots, provide } from "vue";

interface Props {
	disabled?: boolean;
	value?: unknown;
	text?: string;
}

withDefaults(defineProps<Props>(), {
	disabled: false,
	value: undefined,
	text: undefined
});

defineOptions({
	name: "TuSelectOptionGroup",
	inheritAttrs: false
});

const slots = useSlots();

const optionGroup = ref(true);
const textFilter = ref<string>();
const hiddenOptionGroup = ref(false);
const parentTextFilter = inject<Ref<string>>("textFilter");

const onClickOption = inject<(value: unknown, label: string) => void>("onClickOption");

const clickOption = function (value: unknown, label: string) {
	onClickOption?.call(null, value, label);
};

const labels = computed(() => {
	let labels = "";
	if (slots.default) {
		// Type assertion needed for Vue slot content
		/* eslint-disable @typescript-eslint/no-explicit-any */
		(slots.default() as any[]).forEach((item: any) => {
			if (item.tag) labels += (item.componentInstance as any).label;
		});
		/* eslint-enable @typescript-eslint/no-explicit-any */
	}
	return labels;
});

watch(
	() => parentTextFilter?.value as string,
	(val) => {
		if (val) {
			if (
				labels.value
					.toLowerCase()
					.indexOf(val.toLowerCase()) === -1
			)
				hiddenOptionGroup.value = true;
			else hiddenOptionGroup.value = false;
		}
		else hiddenOptionGroup.value = false;

		textFilter.value = val;
	}
);

// Provide values for child components
provide("onClickOption", clickOption);
provide("textFilter", textFilter);
provide("optionGroup", optionGroup);
</script>
<style lang="scss">
@import "../../style/sass/_functions";

.tu-select__option-group {
	padding-left: 10px;
	border-bottom: 2px solid getColor("gray-1");
	position: relative;
	overflow: hidden;
	transition: all 0.25s ease;

	&:last-child {
		border: 0px;
	}

	&.hiddenOptionGroup {
		border-bottom: 0px solid getColor("gray-1");

		// display: none
		// visibility: hidden
		// opacity: 0
		// max-height: 0px
		h5 {
			padding: 0px;
			max-height: 0px;
		}
	}

	h5 {
		max-height: 28px;
		transition: all 0.25s ease;
		opacity: 0.5;
		margin: 0px;
		padding: 0px;
		padding: 7px 0px;
		font-size: 0.7rem;
		user-select: none;
		overflow: hidden;

		* {
			pointer-events: none;
		}
	}
}
</style>

