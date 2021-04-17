<template lang="html">
  <div
    :class="[`vs-checkbox-${color}`, `vs-checkbox-${size}`]"
    class="vs-component con-vs-checkbox">
    <input
      v-bind="$attrs"
      :checked="isChecked || $attrs.checked"
      :value="value"
      type="checkbox"
      class="vs-checkbox--input"
	  v-on="listeners"
      >
    <span
      :style="style"
      class="checkbox_x vs-checkbox">
      <span
        :style="style_check"
        class="vs-checkbox--check">
        <vs-icon
          :icon="icon"
          :icon-pack="iconPack"
          class="vs-checkbox--icon"
        />
      </span>
    </span>
    <span class="con-slot-label">
      <slot/>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import _color from '../../utils/color'
export default  defineComponent({
  name:'VsCheckbox',
  inheritAttrs: false,
  props:{
    color:{
      default:'primary',
      type:String,
    },
    value:{
		type: [Array, String, Boolean],
		default: false
	},
    icon:{
      default:'check',
      type:String
    },
    iconPack:{
      default:'material-icons',
      type:String
    },
    vsValue:{
      type:[Boolean,Array,String,Number,Object],
      default:false
    },
    size:{
      default: 'default',
      type: String
    }
  },
  emits: [
	  "update:value",
	  "change"
  ],
  setup(props, context){

	const style_check = computed(() => {
      return {
        background: isChecked ? _color.getColor(props.color, 1) : null,
      }
    });

    const style = computed(() => {
      return {
        border: `2px solid ${isChecked ? _color.getColor(props.color, 1) : 'rgb(180, 180, 180)'}`,
      }
    });
	
    const listeners = computed(() => {
      return {
        // ...$listeners,
        change: (evt) => {
          toggleValue(evt)
        },
        // input: (evt) => {
        //   toggleValue(evt)
        // }
      }
    });

    const isChecked = computed(() => {
      return isArrayx() ? isArrayIncludes() : props.value
    });

	//methods
	const giveColor = function(color) {
      return _color.rColor(color)
    };

    const toggleValue = function(evt) {
      if(isArrayx()) {
        setArray()
      } else if (typeof(props.vsValue) == 'string') {
        setValueString()
      }
      else {
        context.emit('update:value', !props.value)
        context.emit('change', evt)
      }
    };

    const setArray = function() {
      // Copy Array
      const value = (props.value as Array<any>).slice(0)
      if(isArrayIncludes()) {
        value.splice(value.indexOf(props.vsValue), 1)
        context.emit('update:value', value)
        context.emit('change', value)
      } else {
        value.push(props.vsValue)
        context.emit('update:value', value)
        context.emit('change', value)
      }
    };

    const setValueString = function() {
      if(props.value == props.vsValue) {
        context.emit('update:value', null)
        context.emit('change', null)
      } else {
        context.emit('update:value', props.vsValue)
        context.emit('change', props.vsValue)
      }
    };

    const isArrayIncludes = function() {
      let modelx = props.value
      let value = props.vsValue
      return modelx.includes(value)
    };

    const isArrayx = function() {
      return Array.isArray(props.value)
    };

	return {
		style_check,
		style,
		listeners,
		isChecked,
		giveColor,
		toggleValue,
		setArray,
		setValueString,
		isArrayIncludes,
		isArrayx
	}

  }
});
</script>
