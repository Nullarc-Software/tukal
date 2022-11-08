<template>
	<div
		:class="{ 'open-item': maxHeight != '0px', disabledx: disabled }"
		class="tu-collapse-item"
		@mouseover="mouseover"
		@mouseout="mouseout"
	>
		<header class="tu-collapse-item--header" @click="toggleContent">
			<slot name="header"></slot>
			<span
				v-if="!notArrow"
				class="icon-header tu-collapse-item--icon-header"
			>
				<tu-icon :icon-pack="iconPack" :icon="arrow" />
			</span>
		</header>
		
		<div
			ref="content"
			:style="styleContent"
			class="tu-collapse-item--content"
		>
			<hr style="border-top: 1px solid #ffffff55; margin-bottom: 5px"/>

			<div class="con-content--item">
				<slot />
			</div>
		</div>
	</div>
</template>
<script>
import { tuIcon } from "../tuIcon/tuIcon";
export default {
	name: "tuCollapseItem",
	components: {
		tuIcon
	},
	props: {
		iconPack: {
			type: String,
			default: "material-icons"
		},
		iconArrow: {
			type: String,
			default: "keyboard_arrow_down"
		},
		notArrow: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			maxHeight: "0px",
			arrow: "keyboard_arrow_down",
			isOpen: false,
			styleContent: {
				maxHeight: "0px"
			}
		};
	},
	methods: {
		toggleContent () {
			if (this.disabled) return;
			if (this.isOpen) {
				this.maxHeight = "0px";
				this.arrow = "keyboard_arrow_down";
				this.isOpen = false;
			}
			else {
				this.maxHeight = this.$refs.content.scrollHeight + "px";
				this.arrow = "keyboard_arrow_up";
				this.isOpen = true;
			}
			this.styleContent = {
				maxHeight: this.maxHeight
			};
		},
		mouseover () {
			if (this.disabled) return;
			this.$el.style.backgroundColor = "#ffffff22";
		},
		mouseout () {
			if (this.disabled) return;
			this.$el.style.backgroundColor = "#ffffff00";
		}
	}
};
</script>

<style lang="scss" scoped>
.tu-collapse-item {
	border-bottom: 1px solid rgba(0,0,0,0.04);
	cursor: pointer;
	transition: all 0.25s ease;
	&.open-item {
		.con-content--item {
			opacity: 1;
		}
	}
	&.disabledx {
		opacity: --tu-disabled-opacity;
		cursor: default;
		pointer-events: none;
		z-index: 999;
	}
	&:last-child {
		border-bottom: 0px solid rgba(0,0,0,0) !important;
	}
}
.tu-collapse-item--header {
	display: flex;
	padding: 10px;
	position: relative;
	transition: all 0.25s ease;
}
.tu-collapse-item--icon-header {	
	top: 50%;
	display: block;
	transition: all 0.25s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
}
.tu-collapse-item--content {
	overflow: hidden;
	transition: all 0.2s ease;
}
.con-content--item {
	padding: 10px;
	padding-top: 0px;
	font-size: 0.85rem;
	opacity: 0.2;
	transition: all 0.25s ease;
}
</style>
