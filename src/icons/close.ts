import Vue, { defineComponent, VNode } from 'vue'
import './icons.sass'

export default defineComponent({
    props: {
        hover: { type: String, default: null }
    },

    render(h: any): VNode {
        const icon = h('i', {
            staticClass: 'tu-icon-close',
            class: [
                `tu-icon-hover-${this.hover}`
            ],
            ref: 'icon'
        })

        return icon
    }
})
