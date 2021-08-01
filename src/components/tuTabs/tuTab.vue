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
        <div v-if="active" class="con-tab tu-tabs--content">
            <slot />
        </div>
    </transition>
    <div v-else-if="active" class="con-tab tu-tabs--content">
            <slot />
    </div>
    
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onBeforeMount, onMounted, reactive, Ref, toRefs, VNode, watch } from "vue"
import { ChildData, TabId } from "./tuTabs.vue";

export default defineComponent({
	name: "TuTab",
	inheritAttrs: false,
	props: {
		label: {
			default: "Label",
			type: String,
		},
        name: {
            default: null,
            type: String
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
        let updateChild = inject<Function>("updateChild");
        let noTransitions = inject<Ref<Boolean>>("noTransitions");
        let nextId = inject<Ref<TabId>>("tabIdInstance");

        let currentId = nextId?.value ? nextId.value.tabId++ : 0
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
			id: currentId,
			attrs: context.attrs,	
            disabled: props.disabled,
            name: props.name	
		});

        onMounted(() => {
            addChild?.call(null,data);
        });
       

        return {
            ...toRefs(reactiveData),
            noTransitions
        }

    }	
});
</script>
