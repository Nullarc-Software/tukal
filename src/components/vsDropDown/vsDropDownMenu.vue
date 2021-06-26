<template lang="html">
  <transition name="dropdownx">
    <div
      v-if="visibleDropdown"
      ref="dropOptions"
      :class="{'rightx':vsDropRight || $parent.rightx,'notHeight': notHeight}"
      :style="{
        'left':`${leftx}px`,
        'top':`${topx}px`
      }"
      class="con-vs-dropdown--menu vs-dropdown-menu"      
      @mouseleave="mouseleavex"
      @mouseenter="mouseenterx"
    >
      <!-- @mouseout="toggleMenu($event)" -->
      <!-- @mouseover="toggleMenu($event)" -->
      <ul
        v-if="!vsCustomContent"
        class="vs-component vs-dropdown--menu" >
        <slot/>
      </ul>
      <div
        v-else
        class="vs-dropdown--custom vs-dropdown--menu">
        <slot/>
      </div>
      <div
        ref="menuAfter"
        :class="[ vsDropRight ? 'vs-dropdown-right--menu--after' : 'vs-dropdown--menu--after']"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { insertBody } from "@/utils";
import _ from "lodash";
import {
	defineComponent,
	getCurrentInstance,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	toRefs,
	watch,
	VNode,
	inject,
	Ref,
	toRef,
	nextTick,
} from "vue";

export default defineComponent({
	name: "VsDropdownMenu",
	setup(props, context) {
		let data = reactive({
			dropdownVisible: false,
			leftAfter: 20,			
			rightx: true,		
			vsDropRight: false,
			widthx: 0,			
			vsCustomContent: false,
		});

		let menuAfterDiv = ref<HTMLDivElement>();
		let dropOptions = ref<HTMLDivElement>();
		let instance = getCurrentInstance();
		let parentNode = inject<Ref<HTMLDivElement>>("parent");
        let visibleDropdown = inject<Ref<Boolean>>("dropdownVisible");
        let vsTriggerClick = inject<Ref<Boolean>>("vsTriggerClick");
        let setInitialSize = inject<Function>("setInitialSize");
        let setHoverMenu = inject<Function>("setHoverMenu");
        let topx = inject<Ref<Number>>("topx");
        let leftx = inject<Ref<Number>>("leftx");
        let notHeight = inject<Ref<Boolean>>("notHeight");

		const mouseenterx = function () {
			if (vsTriggerClick?.value) {
				
                setHoverMenu?.call(true);

				if (instance?.vnode.el)
					data.widthx = instance?.vnode.el.clientWidth;
			}
		};
		const mouseleavex = function () {
			if (!vsTriggerClick?.value) {
				setHoverMenu?.call(false);
				if (instance?.vnode.el)
					data.widthx = instance?.vnode.el.clientWidth;
			}
		};
		const setDirection = function () {
			setTimeout(() => {
				const dropdown = parentNode;
				const menuAfter = menuAfterDiv;
				if (!menuAfter) return;
				if (
					dropdown &&
					menuAfter &&
					dropdown.value.getBoundingClientRect().top + 300 >=
						window.innerHeight
				) {
					// const hasGroup = this.$children.find(it=>it.hasOwnProperty('activeGroup'))
					if (menuAfter.value !== undefined) {
						menuAfter.value.style.bottom = "-5px";
						menuAfter.value.style.transform = "rotate(225deg)";
					}
					return;
				}
				if (menuAfter.value !== undefined)
					menuAfter.value.style.top = "10px";
			}, 100);
		};
	
		const insertDropdownMenu = function () {
			let elp = instance?.vnode.el as HTMLDivElement;			
			insertBody(elp, document.body);
		};

		onMounted(() => {
			insertDropdownMenu();
          
		});

		watch(
			() => visibleDropdown?.value,
			(val) => {

                if(val){
                    nextTick(() => {
                        setInitialSize?.call(dropOptions.value?.clientWidth, dropOptions.value?.clientHeight, dropOptions.value?.offsetWidth);
                    });
                    
                }
                  
				if (instance?.vnode.el) {
					let dropdownGroup = _.filter(
						instance?.vnode.el.children,
						(item) => item.hasOwnProperty("activeGroup")
					);
					dropdownGroup.forEach((item_group) => {
						item_group.activeGroup = false;
					});
					setDirection();
				}

				//!val ? (parentNode.value?.el.rightx = false) : null;
			}
		);

		onBeforeUnmount(() => {
			context.emit("remove", instance);
		});

		return {
			...toRefs(data),
			mouseenterx,
			mouseleavex,
			setDirection,			
			insertBody,
            visibleDropdown,
            topx,
            leftx,
            notHeight,
            dropOptions,
            vsTriggerClick
		};
	},
	beforeDestroy() {
		this.$el.parentNode.removeChild(this.$el);
	},
});
</script>


<style lang="scss" scoped>

.dropdownx-enter-from,
.dropdownx-leave-to {
	opacity: 0;
	transform: translateY(5px) !important;
}

.con-vs-dropdown--menu {
	padding-top: 10px;
	position: absolute;
	height: auto;
	width: auto;
	z-index: 40000;
	//transform: translate(-100%);
	transition: opacity 0.25s, transform 0.25s, width 0.3s ease;
	&.rightx {
		::v-deep(.vs-dropdown--menu--after) {
			left: 30px;
			right: 0;
		}
	}
	&::after {
		content: "";
		display: block;
		width: 100%;
		height: 10px;
		position: absolute;
		left: 0;
		top: 100%;
	}
}
.vs-dropdown--menu {
	background: #fff;
	padding-left: 0px !important;
	border-radius: 5px;
	box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding-top: 5px;
	padding-bottom: 5px;
	position: relative;
	margin: 0px;
}
.vs-dropdown-right--menu--after {
	position: absolute;
	left: 20px;
	width: 10px;
	height: 10px;
	display: block;
	background: #fff;
	transform: rotate(45deg) translate(-7px);
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	border-left: 1px solid rgba(0, 0, 0, 0.1);
	z-index: 10;
	box-sizing: border-box;
}
.vs-dropdown--menu--after {
	position: absolute;
	right: 10px;
	width: 10px;
	height: 10px;
	display: block;
	background: #fff;
	transform: rotate(45deg) translate(-7px);
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	border-left: 1px solid rgba(0, 0, 0, 0.1);
	z-index: 1;
	box-sizing: border-box;
    top: 10px
}


.notHeight {
	::v-deep(.vs-dropdown-menu) {
		&::after {
			top: auto;
			bottom: 0px;
			border-top: 1px solid rgba(0, 0, 0, 0);
			border-left: 1px solid rgba(0, 0, 0, 0);
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			border-right: 1px solid rgba(0, 0, 0, 0.1);
			transform: rotate(45deg) translate(7px);
		}
	}
    ::v-deep(.vs-dropdown--menu--after){
        top: unset;
        border-top: unset;
	    border-left: unset;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	    border-right: 1px solid rgba(0, 0, 0, 0.1);
        //transform: rotate(225deg) translate(-7px);
    }
}

</style>