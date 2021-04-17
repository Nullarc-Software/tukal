<template>
	<div :class="[type]" class="vs-collapse" ref="collapse">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent, provide, ref } from "@vue/runtime-core";

export default defineComponent({
	name: "VsCollapse",
	props: {
		accordion: {
			default: false,
			type: Boolean,
		},
		type: {
			default: "default",
			type: String,
		},
		openHover: {
			default: false,
			type: Boolean,
		},
	},
	emits: ["change"],
	setup(props, context) {
		let collapse = ref<HTMLDivElement>();

		const emitChange = function () {
			context.emit("change");
		};
		const closeAllItems = function (el) {
			let children = collapse.value?.children;

			if(children){
				for(let item of children){
					if((item as HTMLElement) !== el){
						(item as HTMLElement).style.maxHeight = "0px";
					}
				}
			}
		};

		provide("closeAllItems", closeAllItems);
		provide("accordion", props.accordion);
		provide("openHover", props.openHover);
		provide("emitChange", emitChange);

		return {
			emitChange,
			closeAllItems,
			collapse
		};
	},
});
</script>
