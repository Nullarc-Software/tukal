<template>
	<div
		:class="{ 'open-item': maxHeight != '0px', disabledx: disabled }"
		class="vs-collapse-item"
		@mouseover="mouseover"
		@mouseout="mouseout"
	>
		<header class="vs-collapse-item--header" @click="toggleContent">
			<slot name="header"></slot>
			<span
				v-if="!notArrow"
				class="icon-header vs-collapse-item--icon-header"
			>
				<vs-icon :icon-pack="iconPack" :icon="iconArrow" />
			</span>
		</header>
		
		<div
			ref="content"
			:style="styleContent"
			class="vs-collapse-item--content"
		>
			<hr style="border-top: 1px solid #ffffff55; margin-bottom: 5px"/>

			<div class="con-content--item">
				<slot />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue';
import vsicon from "../vsIcon";

export default defineComponent({
	name: "VsCollapseItem",
	components: {
		vsicon,
	},
	props: {
		open: {
			default: false,
			type: Boolean,
		},
		disabled: {
			default: false,
			type: Boolean,
		},
		notArrow: {
			default: false,
			type: Boolean,
		},
		iconArrow: {
			default: "keyboard_arrow_down",
			type: String,
		},
		iconPack: {
			default: "material-icons",
			type: String,
		},
		sst: {
			default: false,
			type: Boolean,
		},
	},
	inject: [
		"accordion",
		"openHover",
		"closeAllItems",
		"emitChange"
	],
	setup(props, context) {
		let maxHeight = ref("0px");
		let dataReady = ref(false);
		let content = ref<HTMLDivElement>();

		//Inject components from parent to use in child
		const accordion = inject<boolean>("accordion");
		const openHover = inject<boolean>("openHover");
		const closeAllItems = inject<Function>("closeAllItems");
		const emitChange = inject<Function>("emitChange");

		const styleContent = computed(() => {
			return {
				maxHeight: maxHeight.value
			}
		});

		const changeHeight = function() {
			const maxHeightx = content.value?.scrollHeight;
			if (maxHeight.value != "0px") {
				maxHeight.value = `${maxHeightx}px`;
			}
		};

		const toggleContent = function() {
			if (openHover || props.disabled) return;

			if (accordion) {
				closeAllItems?.call(null, content, maxHeight);
			}

			if (props.sst && !dataReady.value) {
				context.emit("fetch", {
					done: () => {
						initMaxHeight();
						dataReady.value = true;
					},
				});
			} else {
				initMaxHeight();
			}
		};

		const initMaxHeight = function() {
			const maxHeightx = content.value?.scrollHeight;
			if (maxHeight.value == "0px") {
				maxHeight.value = `${maxHeightx}px`;
			} else {
				maxHeight.value = `0px`;
			}
		};

		const mouseover = function() {
			if (props.disabled) return;
			let maxHeightx = content.value?.scrollHeight;
			if (openHover) {
				maxHeight.value = `${maxHeightx}px`;
			}
		};

		const mouseout = function() {
			if (openHover) {
				maxHeight.value = `0px`;
			}
		}

		onMounted(() => {

			window.addEventListener("resize", changeHeight);
			const maxHeightx = content.value?.scrollHeight;
			if (props.open) {
				maxHeight.value = `${maxHeightx}px`;
			}

		});

		onBeforeUnmount(() => {
			window.removeEventListener("resize", changeHeight);
		});

		watch(maxHeight, () => {
			emitChange?.call(null, null);
		});

		return {
			mouseover,
			mouseout,
			initMaxHeight,
			maxHeight,
			accordion,
			openHover,
			styleContent,
			dataReady,
			changeHeight,
			toggleContent,
			content
		}

	},
	watch: {
		ready(newVal, oldVal) {
			if (oldVal != newVal && newVal) {
				this.initMaxHeight();
			}
		},
	}
});
</script>

<style lang="scss" scoped>
.vs-collapse-item {
	border-bottom: 1px solid rgba(0,0,0,0.04);
	cursor: pointer;
	transition: all 0.25s ease;
	&.open-item {
		.con-content--item {
			opacity: 1;
		}
	}
	&.disabledx {
		opacity: --vs-disabled-opacity;
		cursor: default;
		pointer-events: none;
		z-index: 999;
	}
	&:last-child {
		border-bottom: 0px solid rgba(0,0,0,0) !important;
	}
}
.vs-collapse-item--header {
	display: flex;
	padding: 10px;
	position: relative;
	transition: all 0.25s ease;
}
.vs-collapse-item--icon-header {	
	top: 50%;
	display: block;
	transition: all 0.25s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
}
.vs-collapse-item--content {
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
