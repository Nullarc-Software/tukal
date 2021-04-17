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
		const accordion = inject<Ref<boolean>>("accordion");
		const openHover = inject<Ref<boolean>>("openHover");
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
			if (openHover?.value || props.disabled) return;

			if (accordion?.value) {
				closeAllItems?.call(null, content);
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
			if (openHover?.value) {
				maxHeight.value = `${maxHeightx}px`;
			}
		};

		const mouseout = function() {
			if (openHover?.value) {
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
