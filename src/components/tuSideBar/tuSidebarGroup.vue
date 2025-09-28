<template>
<div class="tu-sidebar__group" :class="{ open: openState }" ref="sidebarGroup">
		<div class="tu-sidebar__group__header" @click="openState = !openState">
			<slot name="header" />
		</div>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div class="tu-sidebar__group__content" ref="content" name="show" v-if="openState">
				<slot />
			</div>
		</transition>
	</div>
</template>
<script lang="ts" setup>
import { inject, nextTick, onMounted, provide, ref, watch } from "vue";

defineOptions({
	name: "TuSidebarGroup"
});

interface Props {
	open?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	open: false
});

const group = ref(true);
const openState = ref(false);
const sidebarGroup = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const parentHandleClickItem = inject<((id: string) => void) | undefined>("handleClickItem");

const handleClickItem = function (id: string) {
	parentHandleClickItem?.(id);
};

// Provide for child components
provide("handleClickItem", handleClickItem);

const beforeEnter = function (el: Element) {
	(el as HTMLElement).style.height = "0";
};

const enter = function (el: Element, done: () => void) {
	const h = (el as HTMLElement).scrollHeight;
	(el as HTMLElement).style.height = h - 1 + "px";
	done();
};

const leave = function (el: Element) {
	(el as HTMLElement).style.minHeight = "0px";
	(el as HTMLElement).style.height = "0px";
};

onMounted(() => {
	if (sidebarGroup.value?.querySelector(".active") || props.open)
		openState.value = true;
});

watch(
	() => props.open,
	(val: boolean) => {
		nextTick(() => {
			if (group.value) {
				if (val) {
					// parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight + h -1}px`;
				}
				else {
					// parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight -h +1}px`;
				}
			}
		});
	}
);
</script>

<style lang="scss">
@import "../../style/sass/_functions";

.tu-sidebar__group {
	padding: 0px;

	position: relative;

	&.open {
		.tu-sidebar__group__content {
			&:after {
				transform: translate(0);
				opacity: 1;
			}
		}

		>.tu-sidebar__group__header {
			::v-deep(.tu-sidebar__item) {
				opacity: 1;
			}

			::v-deep(.tu-sidebar__item__arrow) {
				i {
					transition: all 0.25s ease;
					transform: rotate(180deg) !important;
				}
			}
		}
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__content {
		overflow: hidden;
		transition: all 0.25s ease;
		position: relative;

		&:after {
			content: "";
			position: absolute;
			left: 0px;
			top: 0px;
			background: getColorAlpha("color", 0.3);
			width: 4px;
			height: 100%;
			opacity: 0;
			transition: all 0.25s ease;
			transform: translate(-100%);
			border-radius: 0px 10px 10px 0px;
			z-index: 60;
		}

		::v-deep(.tu-sidebar__item) {
			background: getColor("background");
		}
	}

	>.tu-sidebar__group__header {
		::v-deep(.tu-sidebar__item):hover:not(.hasIcon) {
			padding-left: 20px;
		}

		::v-deep(.tu-sidebar__item) {
			&.hasIcon:hover {
				padding-left: 5px;
			}
		}
	}
}
</style>

