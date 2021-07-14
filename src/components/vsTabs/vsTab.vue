<template lang="html">
    <transition
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
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onBeforeMount, onMounted, reactive, toRefs, VNode } from "vue"
import { ChildData } from "./vsTabs.vue";

class TabId {
	public static tabId = 0;
}

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
			id: TabId.tabId++,
			attrs: context.attrs,	
            disabled: props.disabled		
		});

        onMounted(() => {
            addChild?.call(null,data);
        })

        return {
            ...toRefs(reactiveData)
        }

    }	
});
</script>
