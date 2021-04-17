<template lang="html">
  <div
    :style="styleChip"
    :class="[
      `vs-chip-${color}`,
      {
        'closable': closable,
        'con-color': color,
        'bg-chip-transparent': transparent
      }
    ]"
    class="con-vs-chip">

    <span class="text-chip vs-chip--text">
      <slot/>
    </span>

    <button
      v-if="closable"
      class="btn-close vs-chip--close"
      type="button"
      @click="closeChip">
      <vs-icon
        :icon-pack="iconPack"
        :icon="closeIcon"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import _color from '../../utils/color'

export default defineComponent({
  name:'VsChip',
  props:{
    item:{
      type:Boolean,
    },
    value:{
		default: null,
		type: Array
	},
    active:{
      type:Boolean,
      default:true,
    },
    text:{
      type:String,
      default:null,
    },
    closable:{
      type:[Boolean,String],
      default:false,
    },
    color:{
      type:String,
      default:null,
    },
    icon:{
      type:String,
      default:null,
    },
    iconPack:{
      type:String,
      default:'material-icons'
    },
    closeIcon:{
      type:String,
      default:'clear',
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context){

	const styleChip = computed(() => {
      const background = props.transparent ? _color.getColor(props.color, .15) : _color.getColor(props.color, 1);
      const color = props.transparent ? _color.getColor(props.color, 1) : props.color ? 'rgba(255,255,255,.9)' : 'rgba(0,0,0,.7)';

      return {
        background: background,
        color: color
      };
    });

	const closeChip = () => {
      context.emit('input', false)
      context.emit('click')
    };

    const remove = () => {
      context.emit('vs-remove', false)
      context.emit('input', false)
    }

	return {
		styleChip,
		closeChip,
		remove
	}

  }
});
</script>
