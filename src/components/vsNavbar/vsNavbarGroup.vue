<template>
	<div class="vs-navbar__group">
		<button class="vs-navbar__group__item" ref="item">
			<slot />
		</button>
		<div class="vs-navbar__group__items">
			<slot name="items" />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import vsComponent from "../vsComponent";

export default defineComponent({
	name: "VsNavbarGroup",
	extends: vsComponent,
	setup(props, context) {
		const setModel = function(id: any) {
			const parent: any = this.$parent;
			parent.setModel(id);
		};
		const setLeftLine = function() {
			const parent: any = this.$parent;
			const left = (this.$el as any).offsetLeft;
			parent.setLeftLine(left);
			const width = (this.$refs.item as any).scrollWidth;
			parent.setWidthLine(width);
		};
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";
.vs-navbar__group {
	position: relative;

	&:hover {
		.vs-navbar__group__item {
			opacity: 1;
		}

		.vs-navbar__group__items {
			opacity: 1;
			visibility: visible;
			transform: translate(0, 100%);
		}
	}

	&__item {
		padding: 10px 15px;
		background: transparent;
		color: inherit;
		font-weight: bold;
		transition: all 0.25s ease, color 0s;
		opacity: 0.7;
		border: 0px;
	}

	&__items {
		position: absolute;
		bottom: 0px;
		left: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-bottom: -12px;
		transform: translate(0, 90%);
		background: -getColor("color");
		border-radius: 5px 18px 18px 18px;
		padding: 10px;
		min-width: 160px;
		opacity: 0;
		box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, -var("shadow-opacity"));
		transition: all 0.25s ease;
		color: inherit;
		visibility: hidden;

		&:after {
			content: "";
			left: 0px;
			top: -13px;
			background: transparent;
			width: 100%;
			height: 14px;
			position: absolute;
			z-index: -1;
		}

		.vs-navbar__item {
			text-align: left;
			width: 100%;
			position: relative;
			padding: 5px 10px;

			&:before {
				content: "";
				left: 0px;
				top: 0px;
				width: 4px;
				height: 4px;
				background: -getColor("text");
				position: absolute;
				border-radius: 50%;
				top: calc(50% - 2px);
				opacity: 0;
				transform: translate(-10px);
				transition: all 0.25s ease;
			}

			&.active {
				&:before {
					opacity: 1;
					transform: translate(0px);
				}
			}
		}
	}
}
</style>
