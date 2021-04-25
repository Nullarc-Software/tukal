<template>
	<button
		class="vs-navbar__item"
		:class="{ active: active }"
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
	ref
} from "vue";
import { useRouter } from "vue-router";
import vsComponent from "../vsList";

export default defineComponent({
	name: "VsNavbarItem",
	extends: vsComponent,
	props: {
		active: { default: false, type: Boolean },
		to: {},
		id: {},
		href: {},
		target: { default: "_blank" }
	},
	setup(props, context) {
		let setLeftLine = inject<Function>("setLeftLine");
		let setWidthLine = inject<Function>("setWidthLine");
		let setModel = inject<Function>("setModel");
		let item = ref<HTMLButtonElement>();
		let instance = getCurrentInstance();

		let parentName = instance?.parent?.type.name;
		console.log(instance);

		const handleLine = function() {
			nextTick(() => {
				if (props.active) {
					
					if(parentName == "VsNavbarGroup"){						
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

		const handleClick = function() {
			if (props.to) {
				useRouter().push(props.to as any);
			} else if (props.href) {
				window.open(props.href as string, props.target);
			}
		};

		const handleActive = function() {			
			setModel?.call(null, props.id);
			handleLine();
		};

		const listeners = computed(() => {
			return {
				click: function(event) {
					context.emit("click", event);
					handleLine();
					handleClick();
					handleActive();
				}
			};
		});

		onMounted(() => {
			setTimeout(() => {
				if (props.active) {
					handleLine();
				}
			}, 150);
		});

		return {
			handleLine,
			handleClick,
			handleActive,
			item,
			listeners
		};
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.vs-navbar__item {
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
