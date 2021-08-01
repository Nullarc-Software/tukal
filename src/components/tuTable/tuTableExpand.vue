<template>
    <transition name="fade-expand">
        <tr v-if="!hidden" class="tu-table__tr__expand">   
            <td class="tu-table__expand__td" :colspan="colspan">
                <div class="tu-table__expand__td__content" ref="content">
                    <div class="tu-table__expand__td__content__sub">
                        <slot />
                    </div>
                </div>
            </td>
        </tr>
    </transition>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, nextTick, ref, watch } from "@vue/runtime-core";
import tuComponent from "../tuComponent";

export default defineComponent({
    name: "TuTableExpand",
    extends: tuComponent,
    props: {
        colspan: {
            type: Number
        },
        hidden : {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {

        let instance = getCurrentInstance();
        let content = ref<HTMLDivElement>();

        watch(() => props.hidden, (value) => {
            if(value) {
                setTimeout(() => {
                    instance.parent.vnode.el.removeChild(instance.vnode.el);                                        
                }, 300)
            } 
            else {
                nextTick(() => {
                    content.value.style.height = `${content.value.scrollHeight}px`;
                })
            }
        });

        return {
            content
        }

    }
})
</script>

<style>

</style>