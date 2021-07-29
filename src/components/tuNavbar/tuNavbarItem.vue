<template>
	<button
		class="tu-navbar__item"
		:class="{ active: active || internalActive }"
		v-on="listeners"
		ref="item"
	>
		<slot></slot>
	</button>
</template> 
<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	inject,
	nextTick,
	onMounted,
	ref,
	watch
} from "vue";
import { useRouter } from "vue-router";
import tuComponent, { ComponentConstants } from "../tuComponent";

export default defineComponent({
	name: "TuNavbarItem",
	extends: tuComponent,
	props: {
		active: { default: false, type: Boolean },
		to: {},
		id: {},
		href: {},
		target: { default: "_blank" }
	},
	emits: ["click"],
	setup(props, context) {
		let setLeftLine = inject<Function>("setLeftLine");
		let setWidthLine = inject<Function>("setWidthLine");
		let setModel = inject<Function>("setModel");
		let item = ref<HTMLButtonElement>();
		let instance = getCurrentInstance();
		let internalActive = ref(false);
		let router = ComponentConstants.router;		
		let parentName = instance?.parent?.type.name;

		const handleLine = function() {
			nextTick(() => {
				if (props.active || internalActive) {
					
					if(parentName == "TuNavbarGroup"){						
						const left = instance?.parent?.vnode.el?.offsetLeft;
						setLeftLine?.call(null, left);
						const width = instance?.parent?.vnode.el?.offsetWidth;
						setWidthLine?.call(null, width);
					}					
					else{
						const left = item.value?.offsetLeft;
						setLeftLine?.call(null, left);
						const width = item.value?.scrollWidth;
						setWidthLine?.call(null, width);
					}
				}
			});
		};

		watch(() => props.active, (val: boolean) => {

			if(!val)
				internalActive.value = false;

		});

		const handleClick = function() {
			if (props.to) {
				router.push(props.to as any);
			} else if (props.href) {
				window.open(props.href as string, props.target);
			}
		};

		const handleActive = function() {			
			setModel?.call(null, props.id, handleLine);
			handleLine();
		};

		const listeners = computed(() => {
			return {
				click: function(event) {
					context.emit("click", event);
					internalActive.value = true;
					handleLine();
					handleClick();
					handleActive();
				}
			};
		});

		const handleRouteChange = function(){
			if(router.currentRoute.value.path === props.to){
				internalActive.value = true;
				handleLine();
			}
			else
				internalActive.value = false;

			
		}

		const handleResize = function(){
			if(internalActive.value)
				handleLine();
		}

		onMounted(() => {
			setTimeout(() => {				

				if (props.active || internalActive.value) {
					handleLine();
				}
			}, 150);

			
		});

		if(router)
		watch(router.currentRoute, () => {
			handleRouteChange();
		})

		return {
			handleLine,
			handleClick,
			handleActive,
			item,
			listeners,
			handleRouteChange,
			internalActive
		};
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.tu-navbar__item {
  padding: 10px 15px;
  margin: 0px;
  border: 0px;
  background: transparent;
  font-size: 0.85rem;
  opacity: 0.7;
  transition: all 0.25s ease, color 0s;
  font-weight: bold;
  color: inherit;

  &.active {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
