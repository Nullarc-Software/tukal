<template>
  <i
    :style="iconStyle"
    :class="[iconPack, iconPack !='material-icons' ? icon : '', iconClass, getBg, getBgSize, {'round':round}]"
    v-bind="$attrs"
    class="vs-icon notranslate icon-scale unselectable"
  >
    <slot>{{ iconPack == 'material-icons' ? icon : '' }}</slot>
  </i>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import _color from '../../utils/color'

class IconPackConstants {

	public static iconPackGlobal = "fa";
}

export default defineComponent({
  name:'VsIcon',
  props:{
    icon: {
      default: null,
      type: String
    },
    iconPack: {
      default: 'material-icons',
      type: String
    },
    color: {
      default: null,
      type: String
    },
    bg: {
      default: null,
      type: String
    },
    size: {
      default: null,
      type: String
    },
    round: {
      default: false,
      type: Boolean
    },

  },
  setup(props, context){

	const iconClass = computed(() => {
      const classes = {}
      classes[props.size] = true
      if (_color.isColor(props.color)) {
        classes[`vs-icon-${props.color}`] = true
      }
      return classes;
    });
    const iconStyle = computed(() => {
      const style = {
        width: /(px)/.test(props.size) ? props.size : /(em)/.test(props.size) ? props.size : null,
        height: /(px)/.test(props.size) ? props.size : /(em)/.test(props.size) ? props.size : null,
        'font-size': /(px)/.test(props.size) ? props.size : /(em)/.test(props.size) ? props.size : null,
        color: getColor,
        background: getBgColor,
		cursor: "pointer"
      }
      return style
    });
    const getBg = computed(() => {
      const classes = {}

      if (_color.isColor(props.bg)) {
        classes[`con-vs-icon-bg-${props.bg}`] = true
      }

      return classes
    });
    const getBgSize = computed(() => {
      const classes = {}
      if(['small','medium','large'].includes(props.size))  {
        classes[`bg-${props.size}`] = true;
        classes['vs-icon-bg'] = true;
      }

      return classes
    });

    const getColor = computed(() => {
      return _color.isColor(props.color) ? props.color : props.color;
    });

    const getBgColor = computed(() => {
      return _color.isColor(props.bg) ? props.bg : props.bg;
    });


	return {
		iconClass,
		iconStyle,
		getBg,
		getColor,
		getBgColor,
		getBgSize
	}
  }
});
</script>
