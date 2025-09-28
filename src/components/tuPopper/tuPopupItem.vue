<template>
	<li :class="{ 
		divider: divider, 
		'divider-bottom': dividerBottom, 
		'tu-popup-item-disabled': disabled 
	}" 
	class="tu-component tu-dropdown--item" 
	@click="clickClose">
		<router-link v-if="to" :to="to" v-bind="$attrs" class="tu-dropdown--item-link">
			{{ $attrs.disabled }}
			<slot />
		</router-link>
		<a v-else v-bind="$attrs" :class="{ disabled: disabled }" class="tu-dropdown--item-link">
			<slot />
		</a>
	</li>
</template>

<script setup lang="ts">
import { inject } from "vue";

defineOptions({
	name: "TuPopupItem",
	inheritAttrs: false
});

interface Props {
	to?: object | null;
	onClickClose?: boolean;
	disabled?: boolean;
	divider?: boolean;
	dividerBottom?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	to: null,
	onClickClose: false,
	disabled: false,
	divider: false,
	dividerBottom: false
});

const closeParent = inject<() => void>("closeParent");

const clickClose = function () {
	if (props.onClickClose) closeParent?.call(null);
};
</script>

<style lang="scss" scoped>
.tu-dropdown--item {
	transition: all 0.2s ease;
	position: relative;
	z-index: 100;
	border-radius: 5px;
	width: calc(100% - 6px);
	margin: 0px 3px;
	list-style: none;
	font-weight: normal !important;
	font-size: 0.9375em;

	::v-deep(.tu-dropdown--item-link) {
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
		text-decoration: none;

		&.disabled {
			user-select: none;
			pointer-events: none !important;
			cursor: default;
			opacity: var(--tu-disabled-opacity) !important;
			color: rgba(0, 0, 0, var(--tu-disabled-opacity)) !important;
		}
	}

	&:hover .tu-dropdown--item-link {
		background: rgba(0, 123, 255, 0.1) !important;
		color: rgba(0, 0, 0, 0.9) !important;
	}

	&.divider {
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		margin-top: 5px;
	}

	&.divider-bottom {
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		margin-bottom: 5px;
	}
}

.tu-popup-item-disabled {
	pointer-events: none;
}
</style>
