<template>
	<button :disabled="disabled" class="tu-select__option" :class="[
		{
			activeOption: isActive,
			isHover: isHover,
			isMultiple: isMultiple,
			hiddenOption: hiddenOption
		}
	]" v-bind="$attrs" v-on="listeners" ref="option">
		<tu-check-box v-if="isMultiple" v-model="isActive">
			<slot />
		</tu-check-box>
		<slot v-else />
	</button>
</template>
<script setup lang="ts">
import * as _ from "lodash";
import {
	computed,
	getCurrentInstance,
	inject,
	onMounted,
	Ref,
	ref,
	watch
} from "vue";

defineOptions({
	name: "TuSelectOption"
});
import { SelectOptionConstants } from "./common";
import tuCheckbox from "../tuCheckBox";

interface Props {
	label?: string;
	disabled?: boolean;
	value?: any;
}

const props = withDefaults(defineProps<Props>(), {
	label: null,
	disabled: false
});

const activeOption = ref(false);
const hiddenOption = ref(false);
const option = ref<HTMLButtonElement>();

const textFilter = inject<Ref<String>>("textFilter");
const uids = inject<Ref<any[]>>("uids");
const parentValue = inject<Ref<any>>("parentValue");
const hoverOption = inject<Ref<Number>>("hoverOption");
const renderSelect = inject<Ref<Boolean>>("renderSelect");
const multiple = inject<Ref<Boolean>>("isMultiple");
const targetSelect = inject<Ref<Boolean>>("targetSelect");
const targetClose = inject<Ref<Boolean>>("targetClose");
const dropdown = inject<Ref<Boolean>>("dropdown");

const callSetHover = inject<() => void>("callSetHover");
const addUid = inject<(uid: number) => void>("addUid");
const addChildOption = inject<(disabled: boolean, value: any, label: string, offsetTop?: number) => void>("addChildOption");
const onClickOption = inject<(value: any, label: string) => void>("onClickOption");
const updateActiveOptions = inject<(active: boolean) => void>("updateActiveOptions");

const uid = ++SelectOptionConstants.id;

const instance = getCurrentInstance();

if (textFilter) {
	watch(textFilter, (val) => {
		if (val) {
			if (
				props.label && props.label.toLowerCase().indexOf(val.toLowerCase()) ===
				-1
			)
				hiddenOption.value = true;
			else hiddenOption.value = false;
		}
		else hiddenOption.value = false;
	});
}

const isActive = computed(() => {
	return typeof parentValue?.value === "number" ||
		typeof parentValue?.value === "string"
		? parentValue?.value === props.value
		: _.find(parentValue?.value, (o) => {
			return o === props.value;
		}) !== undefined;
});

const isHover = computed(() => {
	return uids?.value.indexOf(uid) === hoverOption?.value;
});

const isMultiple = computed(() => {
	return multiple?.value;
});

const listeners = computed(() => {
	return {
		click: (event: Event) => {
			// Prevent the click from bubbling up to trigger window click handler
			// This prevents dropdown from closing when clicking options in multi-select mode
			if (multiple?.value) {
				event.stopPropagation();
				event.preventDefault();
			}

			onClickOption?.call(null, props.value, props.label);
		},
		mousedown: (event: Event) => {
			// Also prevent mousedown from bubbling since that's what the window listener uses
			if (multiple?.value) {
				event.stopPropagation();
				event.preventDefault();
			}
		},
		blur: (event: Event) => {
			// In multi-select mode, be more careful about blur handling
			if (multiple?.value) {
				// Check if we're still within the select component
				if (!targetSelect?.value && !targetClose?.value) {
					// Delay to allow other events to process
					setTimeout(() => {
						updateActiveOptions?.call(null, false);
					}, 150);
				}
			} else {
				if (!targetSelect?.value && !targetClose?.value)
					updateActiveOptions?.call(null, false);
			}
		}
	};
});

onMounted(() => {
	if (!renderSelect?.value) {
		addChildOption?.call(
			null,
			props.disabled,
			props.value,
			props.label,
			option.value?.offsetTop
		);
	}
	// console.log("added child: " + uid);

	addUid?.call(null, uid);

	activeOption.value = isActive.value;
	callSetHover?.call(null);
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";

.tu-select__option {
	border: 0px;
	width: 100%;
	padding: 6px 10px;
	text-align: left;
	background: transparent;
	transition: all 0.25s ease;
	color: getColor("text");
	border-radius: 5px;
	box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, tuVar(shadow-opacity));
	margin: 2px 0px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	overflow: hidden;
	opacity: 1;
	visibility: visible;
	max-height: 40px;
	
	// Remove browser default focus outline for mouse interactions
	// while maintaining accessibility for keyboard navigation
	&:focus {
		outline: none;
	}
	
	// Only show focus ring on keyboard navigation
	&:focus-visible {
		outline: 2px solid getColor("primary");
		outline-offset: 2px;
	}

	&.hiddenOption {
		//display: none;
		opacity: 0;
		visibility: hidden;
		max-height: 0px;
		padding-top: 0px;
		padding-bottom: 0px;
		border: 0px;
		margin: 0px;
	}

	&.isMultiple {
		padding: 0px;
		padding-left: 5px;

		.tu-select__option-group {
			padding-left: 0px;
		}

		&.isHover {
			background: getColor("gray-2") !important;
		}

		&:disabled {
			.tu-check-box-content {
				pointer-events: none;
			}
		}

		&:hover {
			padding-left: 5px !important;
		}

		.tu-check-box-content {
			width: 100%;
			pointer-events: none;

			.tu-check-box-con {
				transform: scale(0.85);
			}

			.tu-check-box-label {
				width: calc(100% - 23px);
				text-align: left;
				justify-content: flex-start;
			}
		}

		&.activeOption {
			pointer-events: auto !important;
		}
	}

	&.isHover {
		background: getColor("gray-2");
	}

	&.activeOption {
		background: getColorAlpha("color", 0.05);
		color: getColor("color");
	}

	// &:last-child
	//   border-radius: 0px 0px 12px 12px
	&:hover:not(:disabled) {
		color: getColor("color");
		padding-left: 14px;
	}
}
</style>

