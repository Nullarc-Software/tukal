<template>
	<div
		class="vs-select__option-group"
		:class="[
			{
				hiddenOptionGroup: hiddenOptionGroup
			}
		]"
	>
		<h5>
			<slot name="title" />
			<slot />
		</h5>
	</div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, inject, ref, watch } from "vue";
import _color from "../../utils/color";
import vsComponent from "../vsComponent";
export default {
	name: "VsOptionGroup",
	inheritAttrs: false,
	extends: vsComponent,
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		value: {
			default: null
		},
		text: {
			default: null
		}
	},
	setup(props, context) {
		let optionGroup = ref(true);
		let textFilter = ref<String>();
		let hiddenOptionGroup = ref(false);

		let parentTextFilter = inject<String>("textFilter");

		let parent = getCurrentInstance()?.parent;
		let clickOption = function(value: any, label: any) {
			(parent as any).clickOption(value, label);
		};

		const labels = computed(() => {
			let labels: string = "";
			(context.slots.default as any).forEach(item => {
				if (item.tag) {
					labels += (item.componentInstance as any).label;
				}
			});
			return labels;
		});

		watch(
			() => parentTextFilter as String,
			val => {
				if (val) {
					if (
						labels.value.toLowerCase().indexOf(val.toLowerCase()) ===
						-1
					) {
						hiddenOptionGroup.value = true;
					} else {
						hiddenOptionGroup.value = false;
					}
				} else {
					hiddenOptionGroup.value = false;
				}
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

.vs-select__option-group {
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
