<template>
	<button
		:disabled="disabled"		
		class="vs-select__option"
		:class="[
			{
				activeOption: isActive,
				isHover: isHover,
				isMultiple: isMultiple,
				hiddenOption: hiddenOption
			}
		]"
		v-bind="$attrs"
		v-on="listeners"
		:id="uid"
	>
		<vs-checkbox v-if="isMultiple" v-model:value="isActive">
			<slot />
		</vs-checkbox>
		<slot v-else />
	</button>
</template>
<script lang="ts">
import _ from "lodash";
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

import vsComponent from "../vsComponent";

class SelectOptionConstants {
	public static id = 0;
}

export default defineComponent({
	name: "VsOption",
	props: {
		label: { type: String, default: null },
		disabled: { type: Boolean, default: false },
		value: {},

	},
	extends: vsComponent,	
	setup(props, context) {
		let activeOption = ref(false);
		let hiddenOption = ref(false);
		
		let uid = "option-" + ++SelectOptionConstants.id;		

		let textFilter = inject<String>("textFilter");
		let uids = inject<Ref<any[]>>("uids");
		let parentValue = inject<Ref<any>>("parentValue");
		let hoverOption = inject<Number>("hoverOption");
		let renderSelect = inject<Ref<Boolean>>("renderSelect");
		let multiple = inject<Ref<Boolean>>("isMultiple");
		let targetSelect = inject<Ref<Boolean>>("targetSelect");
		let targetClose = inject<Ref<Boolean>>("targetClose");

		let callSetHover = inject<Function>("callSetHover");
		let addUid = inject<Function>("addUid");
		let addChildOption = inject<Function>("addChildOption");
		let onClickOption = inject<Function>("onClickOption");
		let updateActiveOptions = inject<Function>("updateActiveOptions");

		let instance = getCurrentInstance();		

		watch(
			() => textFilter as String,
			val => {
				if (val) {
					if (
						props.label.toLowerCase().indexOf(val.toLowerCase()) ===
						-1
					) {
						hiddenOption.value = true;
					} else {
						hiddenOption.value = false;
					}
				} else {
					hiddenOption.value = false;
				}
			}
		);


		const isActive = computed(() => {
			return (typeof parentValue?.value == "number") || (typeof parentValue?.value == "string")
				? parentValue?.value == props.value
				: _.find(parentValue?.value, { value: props.value, label: props.label }) !== undefined
		});

		const isHover = computed(() => {
			return uids?.value.indexOf(uid) == hoverOption;
		});

		const isMultiple = computed(() => {
			return multiple?.value;
		});

		const listeners = computed(() => {
			return {
				click: () => {
					//console.log(this.value);					
					onClickOption?.call(null, props.value, props.label);					
				},
				blur: () => {
					if (
						!targetSelect?.value &&
						!targetClose?.value
					) {
						updateActiveOptions?.call(null, false)
					}
				}
			};
		});

		onMounted(() => {
			if (!renderSelect?.value) {
				addChildOption?.call(null, instance);
			}
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
			uid			
		};
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";
.vs-select__option {
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
    // display: none
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

    .vs-select__option-group {
      padding-left: 0px;
    }

    &.isHover {
      background: -getColor("gray-2") !important;
    }

    &:disabled {
      .vs-checkbox-content {
        pointer-events: none;
      }
    }

    &:hover {
      padding-left: 5px !important;
    }

    .vs-checkbox-content {
      width: 100%;
      pointer-events: none;

      .vs-checkbox-con {
        transform: scale(0.85);
      }

      .vs-checkbox-label {
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
    background: -getColor("color", 0.05);
    color: -getColor("color", 1);
    pointer-events: none;
  }

  // &:last-child
  //   border-radius: 0px 0px 12px 12px
  &:hover:not(:disabled) {
    color: -getColor("color");
    padding-left: 14px;
  }
}
</style>
