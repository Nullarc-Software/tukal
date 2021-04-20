<template lang="html">
	<li
		:class="{ divider: divider }"
		:style="{
			color: hoverx ? giveColor() + ' !important' : null,
			background: hoverx ? giveColor(0.01) + ' !important' : null,
		}"
		class="vs-component vs-dropdown--item"
		@click="closeParent"
		@mouseover="hoverx = true"
		@mouseout="hoverx = false"
	>
		<router-link
			v-if="to"
			:to="to"
			v-bind="$attrs"
			:class="{ disabled: disabled }"
			class="vs-dropdown--item-link"
		>
			{{ $attrs.disabled }}
			<slot />
		</router-link>

		<a
			v-else
			v-bind="$attrs"
			:class="{ disabled: disabled }"
			class="vs-dropdown--item-link"
		>
			<slot />
		</a>
	</li>
</template>

<script lang="ts">
import {
	defineComponent,
	inject,
	onMounted,
	onUpdated,
	provide,
	Ref,
	ref,
} from "vue";
import _color from "../../utils/color";
export default defineComponent({
	name: "VsDropdownItem",
	inheritAttrs: false,
	props: {
		to: {},
		disabled: {
			default: false,
			type: Boolean,
		},
		divider: {
			default: false,
			type: Boolean,
		},
	},
	setup(props, context) {
		let hoverx = ref(false);
		let vsDropDownItem = ref(true);
		let color = ref("");
		let parent = inject<HTMLButtonElement>("parent");
		let parentColor = inject<string>("parentColor");

		const closeParent = function() {
			if (props.disabled) return;
			context.emit("update:vsDropdownVisible", false);
		};
		const changeColor = function() {
			if (parentColor) color.value = parentColor;
		};
		const giveColor = function(opacity = 1) {
			return _color.rColor(color.value, opacity);
		};

		onMounted(() => {
			changeColor();
		});

		onUpdated(() => {
			changeColor();
		});
	},
});
</script>
