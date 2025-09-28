<template>
	<div :class="{ 'open-item': maxHeight != '0px', disabledx: disabled, 'hover-style': !disabled }"
		class="tu-collapse-item" @mouseover="mouseover" @mouseout="mouseout">
		<header class="tu-collapse-item--header" @click="toggleContent">
			<slot name="header"></slot>
			<span v-if="!notArrow" class="icon-header tu-collapse-item--icon-header">
				<TuIcon :icon-pack="iconPack" :icon="arrow" />
			</span>
		</header>

		<div ref="content" :style="styleContent" class="tu-collapse-item--content">
			<hr style="border-top: 1px solid #ffffff55; margin-bottom: 5px" />

			<div class="con-content--item">
				<slot />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import TuIcon from "../tuIcon/index";
import { ref, computed, inject, onMounted, onUnmounted } from "vue";

defineOptions({
	name: "TuCollapseItem"
});

interface Props {
	iconPack?: string;
	iconArrow?: string;
	notArrow?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	iconPack: "material-icons",
	iconArrow: "keyboard_arrow_down",
	notArrow: false,
	disabled: false
});

// Inject values from parent tuCollapse component
const accordion = inject<boolean>("accordion", false);
const openHover = inject<boolean>("openHover", false);
const emitChange = inject<(() => void) | null>("emitChange", null);
const registerItem = inject<((itemId: symbol, toggleFn: () => void) => void) | null>("registerItem", null);
const unregisterItem = inject<((itemId: symbol) => void) | null>("unregisterItem", null);
const updateItemState = inject<((itemId: symbol, isOpen: boolean) => void) | null>("updateItemState", null);
const closeOtherItems = inject<((currentItemId: symbol) => void) | null>("closeOtherItems", null);

const content = ref<HTMLElement>();
const maxHeight = ref("0px");
const arrow = ref("keyboard_arrow_down");
const isOpen = ref(false);
const itemId = Symbol(); // Unique identifier for this item

const styleContent = computed(() => ({
	maxHeight: maxHeight.value
}));

const doToggle = () => {
	if (isOpen.value) {
		maxHeight.value = "0px";
		arrow.value = "keyboard_arrow_down";
		isOpen.value = false;
	}
	else {
		maxHeight.value = content.value?.scrollHeight + "px" || "0px";
		arrow.value = "keyboard_arrow_up";
		isOpen.value = true;
	}
	
	// Update the state in parent component
	if (updateItemState)
		updateItemState(itemId, isOpen.value);
};

const toggleContent = () => {
	if (props.disabled) return;
	
	// If accordion mode is enabled and we're opening this item, close all others first
	if (accordion && !isOpen.value && closeOtherItems)
		closeOtherItems(itemId);
	
	doToggle();
	
	// Emit change event
	if (emitChange)
		emitChange();
};

// Register this item with the parent when mounted
onMounted(() => {
	if (registerItem)
		registerItem(itemId, doToggle);
});

// Unregister this item when unmounted
onUnmounted(() => {
	if (unregisterItem)
		unregisterItem(itemId);
});

const mouseover = () => {
	if (props.disabled) return;
	
	// If openHover is enabled, open the item on hover
	if (openHover && !isOpen.value)
		toggleContent();
};

const mouseout = () => {
	if (props.disabled) return;
	
	// If openHover is enabled, close the item when mouse leaves
	if (openHover && isOpen.value)
		toggleContent();
};
</script>

<style lang="scss" scoped>
@import "../../style/sass/_functions";

.tu-collapse-item {
	border-bottom: 1px solid rgba(0, 0, 0, 0.04);
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
		border-bottom: 0px solid rgba(0, 0, 0, 0) !important;
	}
}

.hover-style {
	&:hover {
		background-color: getColor("gray-2") !important;
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
