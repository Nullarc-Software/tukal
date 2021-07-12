import {defineComponent, h} from 'vue'
import './icons.sass'

export default defineComponent({
  props: {
	less : { type: Boolean, default: false }
  },
  render() {
    const icon = h('i', {      
      class: {
		'vs-icon-arrow': true,
        less: this.less
      },
      ref: 'icon',      
    ...this.$attrs
      
    });
    return icon;
  }
})  

