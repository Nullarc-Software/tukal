import Vue, { defineComponent, VNode } from 'vue'
import './icons.sass'

export default defineComponent({

    props: {
        less: { type: Boolean, default: false }
    },
    render(h: any): VNode {
        const icon = h('i', {
            staticClass: 'tu-icon-plus',
            class: {
                less: this.less
            },
            ref: 'icon',
            on: {
                ...this.$attrs
            }
        })

        return icon
    }
});
