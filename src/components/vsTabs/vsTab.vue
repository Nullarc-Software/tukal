<template lang="html">
    <transition

        v-if="!noTransitions"
        :name="
            invert
                ? vertical
                    ? 'fade-tab-vertical-invert'
                    : 'fade-tab-invert'
                : vertical
                ? 'fade-tab-vertical'
                : 'fade-tab'
        "
    >
        <div v-if="active" class="con-tab vs-tabs--content">
            <slot />
        </div>
    </transition>
    <div v-else-if="active" class="con-tab vs-tabs--content">
            <slot />
    </div>
    
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onBeforeMount, onMounted, reactive, Ref, toRefs, VNode } from "vue"
import { ChildData, TabId } from "./vsTabs.vue";

export default defineComponent({
	name: "VsTab",
	inheritAttrs: false,
	props: {
		label: {
			default: "Label",
			type: String,
		},
		icon: {
			default: "",
			type: String,
		},
		tag: {
			default: "",
			type: String,
		},
		iconPack: {
			type: String,
			default: "material-icons",
		},
        disabled: {
            type: Boolean,
            default: false
        },
        noTransitions: {
            type: Boolean,
            default: false
        }
	},
    setup(props, context){

        let reactiveData = reactive({
            vertical: false,
            active: false,
            id: null,
            invert: false,
        });

        let setActive = function(value : boolean){
            reactiveData.active = value;
        }

        let setInvert = function(value : boolean){
            reactiveData.invert = value;
        }

        let setVertical = function(value : boolean){
            reactiveData.vertical = value;
        }

        let addChild = inject<Function>("addChild");
        let noTransitions = inject<Ref<Boolean>>("noTransitions");
        let nextId = inject<Ref<TabId>>("tabIdInstance");

        let data = Object.assign({}, {
            vnode: (getCurrentInstance()?.vnode as VNode),
            setActive,
            setInvert,
            setVertical
        }, {
			label: props.label,
			icon: props.icon,
			iconPack: props.iconPack,
			tag: props.tag,
			id: nextId?.value ? nextId.value.tabId++ : 0,
			attrs: context.attrs,	
            disabled: props.disabled		
		});

        onMounted(() => {
            addChild?.call(null,data);
        })

        return {
            ...toRefs(reactiveData),
            noTransitions
        }

    }	
});
</script>
