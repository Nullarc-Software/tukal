<template lang="html">
  <nav
    v-bind="$attrs"
    :class="`vs-align-${align}`"
    class="vs-breadcrumb"
    aria-label="breadcrumb"
    >
    <ol class="vs-breadcrumb--ol">
      <slot/>
      <li
        v-for="item in mutableItems"
        v-show="!hasSlot"
        :key="item.title"
        :class="{'vs-active':item.active,'disabled-link':item.disabled}"
        :aria-current="item.active ? 'page' : null"
      >
        <a
          v-if="!item.active"
          :href="item.url ? item.url : '#'"
          :title="item.title"
          class="vs-breadcrumb--link"
          v-text="item.title"
        ></a>
        <template v-else>
          <span
            :class="textClass"
            :style="textStyle"
            class="vs-breadcrumb--text"
            v-text="item.title"
          ></span>
        </template>
        <span
          v-if="!item.active"
          :class="separator.length > 1 ? 'material-icons' : null"
          class="separator notranslate vs-breadcrum--separator"
          translate="no"
          aria-hidden="true"
          v-text="separator"
        ></span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import _color from '../../utils/color'
import { useRoute, useRouter} from "vue-router"

export default defineComponent({
  name:'VsBreadcrumb',
  props:{
    items:{
      type:	Array,
	  readOnly: false
    },
    separator:{
      type:String,
      default:'/'
    },
    color:{
      type:String,
      default: 'primary'
    },
    align:{
      type:String,
      default:'left'
    }
  },
  setup(props, context){
	
	const textClass = computed(() => {
      const classes = {}
      if (_color.isColor(props.color)) {
        classes[`vs-breadcrumb-text-${props.color}`] = true
      }
      return classes
    });

    const textStyle = computed(() => {
      let style : any = {}
      if (!_color.isColor(props.color)) {
        style.color = _color.getColor(props.color)
      }
      return style
    });

    const hasSlot = computed(() => {
      return !!context.slots.default
    });

	const mutableItems = computed(() => {

		let newItems : typeof props.items;
		if(props.items) {
			newItems = props.items.map((item) => {

				if (typeof (item as any).title === "function") {
					return {
						...(item as any),
						title: (item as any).title(useRoute().params)
					}
				}

				return item;
			});
		}

		return newItems;

	});

	return {
		textStyle,
		textClass,
		hasSlot,
		mutableItems
	}
  }
});
</script>
