<template>
	<button :disabled="disabled" class="tu-select__option" :class="[
		{
			activeOption: isActive,
			isHover: isHover,
			isMultiple: isMultiple,
			hiddenOption: hiddenOption
		}
	]" v-bind="$attrs" v-on="listeners" ref="option">
		<tu-checkbox v-if="isMultiple" v-model="isActive">
			<slot />
		</tu-checkbox>
		<slot v-else />
	</button>
</template>
<script lang="ts">
import * as _ from "lodash";
import {
	computed,
	defineComponent,
	getCurrentInstance,
	inject,
	onMounted,
	Ref,
	ref,
	watch
} from "vue";
import { SelectOptionConstants } from "./index";
import tuCheckbox from "../tuCheckBox";
import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuSelectOption",
	props: {
		label: { type: String, default: null },  //label prop: label for the select option
		disabled: { type: Boolean, default: false },  //disabled prop: disables the option if boolean is true
		value: {}  //value prop: value for the select field
	},
	components: {
		tuCheckbox
	},
	extends: tuComponent,
	setup(props, context) {
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

		const callSetHover = inject<Function>("callSetHover");
		const addUid = inject<Function>("addUid");
		const addChildOption = inject<Function>("addChildOption");
		const onClickOption = inject<Function>("onClickOption");
		const updateActiveOptions = inject<Function>("updateActiveOptions");

		const uid = ++SelectOptionConstants.id;

		const instance = getCurrentInstance();

		if (textFilter) {
			watch(textFilter, (val) => {
				if (val) {
					if (
						props.label.toLowerCase().indexOf(val.toLowerCase()) ===
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
				click: () => {
					// console.log(this.value);

					onClickOption?.call(null, props.value, props.label);
				},
				blur: () => {
					if (!targetSelect?.value && !targetClose?.value)
						updateActiveOptions?.call(null, false);
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

		return {
			isActive,
			isHover,
			isMultiple,
			hiddenOption,
			activeOption,
			listeners,
			uid,
			dropdown
		};
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.tu-select__option {
	border: 0px;
	width: 100%;
	padding: 6px 10px;
	text-align: left;
	background: transparent;
	transition: all 0.25s ease;
	color: -getColor("text");
	border-radius: 5px;
	box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, -var(shadow-opacity));
	margin: 2px 0px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	overflow: hidden;
	opacity: 1;
	visibility: visible;
	max-height: 40px;

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
			background: -getColor("gray-2") !important;
		}

		&:disabled {
			.tu-checkbox-content {
				pointer-events: none;
			}
		}

		&:hover {
			padding-left: 5px !important;
		}

		.tu-checkbox-content {
			width: 100%;
			pointer-events: none;

			.tu-checkbox-con {
				transform: scale(0.85);
			}

			.tu-checkbox-label {
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
		background: -getColor("gray-2");
	}

	&.activeOption {
		background: -getColorAlpha("color", 0.05);
		color: -getColor("color");
	}

	// &:last-child
	//   border-radius: 0px 0px 12px 12px
	&:hover:not(:disabled) {
		color: -getColor("color");
		padding-left: 14px;
	}
}
</style>
