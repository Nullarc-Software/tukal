<template>
	<div
		class="tu-sidebar__group"
		:class="{ open: openState }"
		ref="sidebarGroup"
	>
		<div class="tu-sidebar__group__header" @click="openState = !openState">
			<slot name="header" />
		</div>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div
				class="tu-sidebar__group__content"
				ref="content"
				name="show"
				v-if="openState"
			>
				<slot />
			</div>
		</transition>
	</div>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, onMounted, ref, watch } from "vue";

export default defineComponent({
	name: "TuSidebarGroup",
	props: {
		open: {
			default: false,
			type: Boolean
		}
	},
	setup (props, context) {
		const group = ref(true);
		const openState = ref(false);
		const sidebarGroup = ref<HTMLDivElement>();
		const content = ref<HTMLDivElement>();
		const parentValue = inject<any>("parentValue");
		const parentHandleClickItem = inject<Function>("handleClickItem");

		const handleClickItem = function (id: string) {
			parentHandleClickItem?.call(null, id);
		};

		const beforeEnter = function (el: any) {
			el.style.height = 0;
		};

		const enter = function (el: any, done: any) {
			const h = el.scrollHeight;
			el.style.height = h - 1 + "px";
			done();
		};

		const leave = function (el: any, done: any) {
			el.style.minHeight = "0px";
			el.style.height = "0px";
		};

		onMounted(() => {
			if (sidebarGroup.value?.querySelector(".active") || props.open)
				openState.value = true;
		});

		watch(
			() => props.open,
			(val: boolean) => {
				nextTick(() => {
					const h = content.value?.scrollHeight;
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

		return {
			handleClickItem,
			leave,
			enter,
			beforeEnter,
			parentValue,
			group,
			openState
		};
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

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

		> .tu-sidebar__group__header {
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
			background: -getColor("color", 0.3);
			width: 4px;
			height: 100%;
			opacity: 0;
			transition: all 0.25s ease;
			transform: translate(-100%);
			border-radius: 0px 10px 10px 0px;
			z-index: 60;
		}

		::v-deep(.tu-sidebar__item) {
			background: -getColor("background");
		}
	}

	> .tu-sidebar__group__header {
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
