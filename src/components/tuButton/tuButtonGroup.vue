<template>
	<div class="tu-button-group" :style="{
		'--tu-bg-height': fixedHeight
	}">
		<slot />
	</div>
</template>
<script setup lang="ts">
import { provide, ref, watch } from "vue";

defineOptions({
	name: "TuButtonGroup"
});

interface Props {
	fixedHeight?: string;
	mutuallyExclusive?: boolean;
	modelValue?: number | string | null;
}

const props = withDefaults(defineProps<Props>(), {
	fixedHeight: "",
	mutuallyExclusive: false,
	modelValue: null
});

const emit = defineEmits<{
	"update:modelValue": [value: number | string | null];
	"change": [value: number | string | null, previousValue: number | string | null];
}>();

const selectedButton = ref<number | string | null>(props.modelValue);

// Watch for changes in modelValue prop to keep selectedButton in sync
watch(() => props.modelValue, (newValue) => {
	if (props.mutuallyExclusive)
		selectedButton.value = newValue;
}, { immediate: true });

// Provide context to child buttons
provide("buttonGroup", {
	mutuallyExclusive: props.mutuallyExclusive,
	selectedButton,
	selectButton: (buttonId: number | string) => {
		if (!props.mutuallyExclusive) return;
		
		const previousValue = selectedButton.value;
		selectedButton.value = buttonId;
		
		emit("update:modelValue", buttonId);
		emit("change", buttonId, previousValue);
	},
	isSelected: (buttonId: number | string) => {
		if (!props.mutuallyExclusive) return false;
		return selectedButton.value === buttonId;
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";

.tu-button-group {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin: 5px;

	.tu-button {
		margin: 0;
		height: var(--tu-bg-height);
	}

	.tu-button:not(:last-of-type):not(:first-of-type) {
		border-radius: 0;
		border: 0;

		&.tu-button--border {
			&:nth-child(2) {
				&:before {
					border-left: 0;
					border-right: 0;
					width: 100%;
				}
			}

			+.tu-button--border:not(:last-of-type) {
				&:before {
					border-right: 0;
					width: calc(100%);
				}
			}
		}
	}

	.tu-button:last-of-type {
		border-radius: 0 12px 12px 0;
	}

	.tu-button:first-of-type {
		border-radius: 12px 0 0 12px;
	}

	.tu-button:first-of-type:last-of-type {
		border-radius: 12px;
	}
}
</style>
