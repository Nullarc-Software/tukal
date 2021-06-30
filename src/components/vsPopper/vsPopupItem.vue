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
			:class="{'disabled':disabled}"
			class="vs-dropdown--item-link"
			v-on="$listeners"
		>
			{{ $attrs.disabled }}
			<slot/>
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
	name: "VsPopupItem",
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
		
			
		const giveColor = function (opacity = 1) {
			return _color.rColor(color.value, opacity);
		};		

		return {
			hoverx,
			vsDropDownItem,
			color,
			giveColor,
		};
	},
});
</script>

<style lang="scss" scoped>
.vs-dropdown--item {
	transition: all 0.2s ease;
	position: relative;
	z-index: 100;
	border-radius: 5px;
	width: calc(100% - 6px);
	margin: 0px 3px;
	list-style: none;
	font-weight: normal !important;
	font-size: 0.9375em;
	::v-deep(.vs-dropdown--item-link) {
		background: inherit !important;
		color: inherit !important;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 5px;
		padding-left: 10px;
		padding-right: 10px;
		width: 100%;
		position: relative;
		display: block;
		color: rgba(0, 0, 0, 0.7);
		&.disabled {
			user-select: none;
			pointer-events: none !important;
			cursor: default;
			opacity: var(--vs-disabled-opacity) !important;
			color: rgba(0, 0, 0, var(--vs-disabled-opacity)) !important;
		}
	}
	&.divider {
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		margin-top: 5px;
	}
}
</style>
