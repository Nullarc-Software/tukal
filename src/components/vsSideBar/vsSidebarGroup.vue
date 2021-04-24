<template>
	<div
		class="vs-sidebar__group"
		:class="{ open: openState }"
		ref="sidebar_group"
	>
		<div class="vs-sidebar__group__header" @click="openState = !openState">
			<slot name="header" />
		</div>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div
				class="vs-sidebar__group__content"
				ref="content"
				name="show"
				v-if="openState"
			>
				<slot  />
			</div>
		</transition>
	</div>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, onMounted, ref, watch } from "vue";

export default defineComponent({
	name: "VsSidebarGroup",
	props: {
		open: {
			default: false,
			type: Boolean
		}
	},
	setup(props, context) {
		let group = ref(true);
		let openState = ref(false);
		let sidebar_group = ref<HTMLDivElement>();
		let content = ref<HTMLDivElement>();

		let parentValue = inject<any>("parentValue");
		let parentHandleClickItem = inject<Function>("handleClickItem");

		const handleClickItem = function(id: string) {
			parentHandleClickItem?.call(null, id);
		};

		const beforeEnter = function(el: any) {
			el.style.height = 0;
		};

		const enter = function(el: any, done: any) {
			const h = el.scrollHeight;
			el.style.height = h - 1 + "px";
			done();
		};

		const leave = function(el: any, done: any) {
			el.style.minHeight = "0px";
			el.style.height = "0px";
		};

		onMounted(() => {
			if (sidebar_group.value?.querySelector(".active") || props.open) {
				openState.value = true;
			}
		});

		watch(
			() => props.open,
			(val: boolean) => {
				nextTick(() => {
					const h = content.value?.scrollHeight;					
					if (group.value) {
						if (val) {
							//parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight + h -1}px`;
						} else {
							//parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight -h +1}px`;
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

.vs-sidebar__group {
	padding: 0px;
	width: 100%;
	min-width: 260px;
	position: relative;

	&.open {
		.vs-sidebar__group__content {
			&:after {
				transform: translate(0);
				opacity: 1;
			}
		}

		> .vs-sidebar__group__header {
			.vs-sidebar__item {
				opacity: 1;
			}

			.vs-sidebar__item__arrow {
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

		.vs-sidebar__item {
			background: -getColor("background");
		}
	}

	> .vs-sidebar__group__header {
		.vs-sidebar__item:hover {
			padding-left: 0px;
		}
	}
}
</style>
