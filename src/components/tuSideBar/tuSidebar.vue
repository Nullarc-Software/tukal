<template>
	<div
		:style="{
			['--tu-color']: color ? getColor(color) : ''
		}"
		:class="[
			'tu-sidebar-content',
			{
				reduce: reduceInternal,
				open: open,
				notLineActive: notLineActive,
				square: square,
				notShadow: notShadow,
				textWhite: textWhite,
				relative: relative,
				absolute: absolute,
				right: right
			},
			// colors
			{ [`tu-component--primary`]: !!primary },
			{ [`tu-component--danger`]: !!danger },
			{ [`tu-component--warn`]: !!warn },
			{ [`tu-component--success`]: !!success },
			{ [`tu-component--dark`]: !!dark },
			{ [`tu-component--is-color`]: !!isColor }
		]"
		v-on="listeners"
		ref="sidebar"
		v-bind="$attrs"
	>
		<div v-if="$slots.logo" class="tu-sidebar__logo">
			<slot name="logo" />
		</div>
		<div v-if="$slots.header" class="tu-sidebar__header">
			<slot name="header" />
		</div>
		<div class="tu-sidebar">
			<slot />
		</div>

		<div v-if="$slots.footer" class="tu-sidebar__footer">
			<slot name="footer" />
		</div>
	</div>
</template>
<script lang="ts">
import { setColor } from "@/utils";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuSidebar",
	extends: tuComponent,
	props: {
		value: {},
		reduce: { default: false, type: Boolean },
		hoverExpand: { default: false, type: Boolean },
		open: { default: false, type: Boolean },
		notLineActive: { default: false, type: Boolean },
		square: { default: false, type: Boolean },
		textWhite: { default: false, type: Boolean },
		notShadow: { default: false, type: Boolean },
		relative: { default: false, type: Boolean },
		absolute: { default: false, type: Boolean },
		right: { default: false, type: Boolean },
		background: { default: "background", type: String },
		expanded: { default: false, type: Boolean },
		fixedExpandWidth: { default: null, type: Number }
	},
	emits: ["update:open", "update:value", "update:expanded"],
	provide () {
		return {
			parentValue: computed(() => this.value),
			handleClickItem: this.handleClickItem,
			reduced: computed(() => this.reduceInternal)
		};
	},
	setup (props, context) {
		const staticWidth = ref(260);
		const forceExpand = ref(false);
		const reduceInternal = ref(false);

		const sidebar = ref<HTMLDivElement>();

		const clickCloseSidebar = function (evt) {
			if (!(evt.target as any).closest(".tu-sidebar-content"))
				context.emit("update:open", false);
		};

		const handleClickItem = function (id: string) {
			context.emit("update:value", id);
		};

		const getValue = computed(() => {
			return props.value;
		});

		const listeners = computed(() => {
			return {
				mouseenter: function () {
					if (props.hoverExpand) {
						reduceInternal.value = false;
						context.emit("update:expanded", true);
					}
				},
				mouseleave: function () {
					if (props.hoverExpand) {
						reduceInternal.value = true;
						context.emit("update:expanded", false);
					}
				}
			};
		});

		watch(
			() => props.open,
			(val: boolean) => {
				if (val) {
					setTimeout(() => {
						window.addEventListener("click", clickCloseSidebar);
					}, 200);
				}
				else window.removeEventListener("click", clickCloseSidebar);
			}
		);

		watch(
			() => props.reduce,
			(val: boolean) => {
				reduceInternal.value = val;
				const el: any = sidebar.value;
				if (val) el.style.width = "50px";
				else el.style.width = `${staticWidth.value}px`;

				context.emit("update:expanded", !val);
			}
		);

		watch(reduceInternal, (val: boolean) => {
			const el: any = sidebar.value;
			if (val) el.style.width = "50px";
			else el.style.width = `${staticWidth.value}px`;
		});

		watch(
			() => props.background,
			() => {
				setColor("background", props.background, sidebar.value, true);
			}
		);

		onMounted(() => {
			if (!props.fixedExpandWidth)
				staticWidth.value = (sidebar.value?.offsetWidth as number) + 15;
			else {
				staticWidth.value = props.fixedExpandWidth;
				if (sidebar.value)
					sidebar.value.style.width = `${staticWidth.value}px`;
			}

			reduceInternal.value = props.reduce;

			if (reduceInternal.value) context.emit("update:expanded", false);

			if (props.background !== "background")
				setColor("background", props.background, sidebar.value, true);

			if (props.textWhite) setColor("text", "#fff", sidebar.value, true);
		});

		return {
			staticWidth,
			forceExpand,
			reduceInternal,
			handleClickItem,
			clickCloseSidebar,
			listeners,
			sidebar
		};
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.tu-sidebar-content {
	--tu-color: var(--tu-primary);
	position: relative;
	left: 0px;
	top: 0px;
	width: 100%;
	max-width: 260px;
	height: 100%;
	border-radius: 0px 30px 30px 0px;
	color: -getColor("text");
	box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, -var("shadow-opacity"));
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
	z-index: 21000;
	background: -getColor("gray-2");
	transition: all 0.25s ease;
	padding: 5px;

	&.right {
		left: auto;
		right: 0px;
		transform: translate(110%);
		border-radius: 30px 0px 0px 30px;

		&.open {
			transform: translate(0);
		}
	}

	&.absolute {
		position: absolute !important;
		z-index: 9001;
		height: 100%;
	}

	&.relative {
		position: relative !important;
		z-index: 9001;
		height: 100%;
	}

	&.textWhite {
		.tu-sidebar__group__content {
			&:after {
				background: rgba(255, 255, 255, 0.4);
			}
		}

		.tu-sidebar__item {
			color: #ffffffaa !important;

			&:after {
				background: #fff !important;
			}

			&.active {
				color: #fff !important;
			}
		}
	}

	&.notShadow {
		box-shadow: none !important;
	}

	&.square {
		border-radius: 0px;
	}

	&.notLineActive {
		.tu-sidebar {
			.tu-sidebar__item {
				&:after {
					display: none;
				}
			}
		}
	}

	&.open {
		transform: translate(0%);
	}

	&.reduce {
		.tu-sidebar {
			&__footer {
				padding: 10px 0px;
			}

			&__header {
				.tu-avatar-content {
					width: 44px !important;
					height: 44px !important;
				}

				opacity: 0;
				transition: all 0.25s ease;
				font-size: 0.9rem;
			}

			&__logo {
				img {
					width: 80%;
				}
			}

			.tu-sidebar__item {
				padding-left: 16px !important;
				min-height: 47px;

				&:not(.hasIcon) {
					.tu-sidebar__item__text {
						font-size: 0.5rem;
					}
				}

				&.hasIcon {
					.tu-sidebar__item__text {
						transform: translate(-10px);
						margin-left: -50px;
					}
				}

				&__arrow {
					position: absolute;
					top: 10%;
					animation: delayOpacity 0.6s ease;
					width: 5px;
					height: 5px;
				}
			}

			.tu-sidebar__item.hasIcon {
				padding: 0px !important;

				&:after {
					left: -6px;
				}
			}
		}
	}

	.tu-sidebar__logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 25px 0px;
		min-height: 80px;

		img {
			max-width: 120px;
			max-height: 35px;
		}
	}

	.tu-sidebar {
		overflow-x: hidden;
		width: 100%;
		flex-grow: 1;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;

		&::-webkit-scrollbar {
			width: 0px;
		}

		&__header {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			padding: 10px;
			padding-bottom: 20px;
		}

		&__footer {
			display: flex;
			align-items: center;
			justify-self: flex-start;
			width: 100%;
			padding: 10px;
		}
	}
}

.tu-sidebar__sticky_head {
	position: sticky;
	top: 0;
}

.tu-sidebar__sticky_tail {
	position: sticky;
	bottom: 0;
}

@keyframes delayOpacity {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>
