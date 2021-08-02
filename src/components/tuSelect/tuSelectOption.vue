<template>
	<button
		:disabled="disabled"		
		class="tu-select__option"
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
		ref="option"
	>
		<tu-checkbox v-if="isMultiple" v-model:value="isActive">			
			<slot />			
		</tu-checkbox>
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
	unref,
	watch
} from "vue";
import { SelectOptionConstants } from ".";

import tuComponent from "../tuComponent";


export default defineComponent({
	name: "TuOption",
	props: {
		label: { type: String, default: null },
		disabled: { type: Boolean, default: false },
		value: {},

	},
	extends: tuComponent,	
	setup(props, context) {
		let activeOption = ref(false);
		let hiddenOption = ref(false);		
		let option = ref<HTMLButtonElement>();
		
		let textFilter = inject<Ref<String>>("textFilter");
		let uids = inject<Ref<any[]>>("uids");
		let parentValue = inject<Ref<any>>("parentValue");
		let hoverOption = inject<Ref<Number>>("hoverOption");
		let renderSelect = inject<Ref<Boolean>>("renderSelect");
		let multiple = inject<Ref<Boolean>>("isMultiple");
		let targetSelect = inject<Ref<Boolean>>("targetSelect");
		let targetClose = inject<Ref<Boolean>>("targetClose");
		let dropdown = inject<Ref<Boolean>>("dropdown");

		let callSetHover = inject<Function>("callSetHover");
		let addUid = inject<Function>("addUid");
		let addChildOption = inject<Function>("addChildOption");
		let onClickOption = inject<Function>("onClickOption");
		let updateActiveOptions = inject<Function>("updateActiveOptions");

		let uid = ++SelectOptionConstants.id;		

		let instance = getCurrentInstance();		

		if(textFilter)
		watch(
			textFilter,
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
				: _.find(parentValue?.value, (o) => { return o === props.value}) !== undefined
		});

		const isHover = computed(() => {
			return uids?.value.indexOf(uid) == hoverOption?.value;
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
				addChildOption?.call(null, props.disabled, props.value, props.label, option.value?.offsetTop );
				//console.log("added child: " + uid);
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
    background: -getColor("color", 0.05);
    color: -getColor("color", 1);
    
  }

  // &:last-child
  //   border-radius: 0px 0px 12px 12px
  &:hover:not(:disabled) {
    color: -getColor("color");
    padding-left: 14px;
  }
}
</style>