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

<script lang="ts">
import { computed, inject, Ref, ref, watch } from "vue";
import tuComponent from "../tuComponent";
import tuSelectOption from "./tuSelectOption.vue";
export default {
	name: "TuSelectOptionGroup",
	inheritAttrs: false,
	extends: tuComponent,
	components: {
		tuSelectOption
	},
	props: {
		disabled: {  //disabled prop: disable selectOption group
			type: Boolean,
			default: false
		},
		value: {  //value prop: value for select option group
			default: null
		},
		text: {  //text prop: text for the select group option
			default: null
		}
	},
	setup (props, context) {
		const optionGroup = ref(true);
		const textFilter = ref<String>();
		const hiddenOptionGroup = ref(false);
		const parentTextFilter = inject<Ref<String>>("textFilter");

		const onClickOption = inject<Function>("onClickOption");

		const clickOption = function (value: any, label: any) {
			onClickOption?.call(null, value, label);
		};

		const labels = computed(() => {
			let labels: string = "";
			(context.slots.default as any).forEach((item) => {
				if (item.tag) labels += (item.componentInstance as any).label;
			});
			return labels;
		});

		watch(
			() => parentTextFilter?.value as String,
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

		return {
			optionGroup,
			textFilter,
			hiddenOptionGroup,
			clickOption,
			labels
		};
	}
};
</script>
<style lang="scss">
@import "../../style/sass/_mixins";

.tu-select__option-group {
	padding-left: 10px;
	border-bottom: 2px solid -getColor("gray-1");
	position: relative;
	overflow: hidden;
	transition: all 0.25s ease;

	&:last-child {
		border: 0px;
	}

	&.hiddenOptionGroup {
		border-bottom: 0px solid -getColor("gray-1");

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
