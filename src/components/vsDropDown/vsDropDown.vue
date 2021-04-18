<template lang="html">
	<!-- @contextmenu.capture.prevent -->
	<div
		ref="dropdown"
		v-bind="$attrs"
		class="vs-con-dropdown parent-dropdown"
		v-on="listeners"
	>
		<slot v-if="$slots.custom" name="custom" />
		<transition v-else name="dropdownx">
			<div class="con-vs-dropdown--menu vs-dropdown-menu">
				<slot />
			</div>
		</transition>
		
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, provide, ref, watch } from "vue";
import { vsButton } from "../vsButton";

export default defineComponent({
	name: "VsDropdown",
	inheritAttrs: false,
	components: {
		vsButton,
	},
	props: {
		triggerClick: {
			default: false,
			type: Boolean,
		},
		color: {
			default: "primary",
			type: String,
		},
		vsCustomContent: {
			default: false,
			type: Boolean,
		},
		vsDropRight: {
			default: false,
			type: Boolean,
		},
	},
	setup(props, context) {
		let vsDropdownVisible = ref(false);
		let rightx = ref(false);
		let dropdown = ref<HTMLButtonElement>();

		provide("parent", dropdown);
		provide("parentColor", props.color);

		const listeners = computed(() => {
			return {				
				click: (evt) => {
					if (!props.triggerClick) {
						toggleMenu("click", evt);
					}

					if (dropdown.value === evt.target) {
						context.emit("click");
					}
				},
				mouseout: (evt) => toggleMenu("out", evt),
				mouseover: (evt) => toggleMenu("over", evt),
			};
		});

		const toggleMenu = function(source, event) {
			 
		}
	},
});
</script>
