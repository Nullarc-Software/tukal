<template>
	<div
		v-if="open"
		class="tu-navbar-content"
		:style="{
			['--tu-color']: color ? getColor(color) : '',
			'z-index': zIndex,
		}"
		:class="[
			{
				fixed: fixed,
				sticky: sticky,
				shadow: shadow,
				hidden: hidden,
				shadowActive: shadowActive,
				textWhite: textWhite,
				paddingScroll: paddingScroll,
				paddingScrollActive: paddingScrollActive,
				tuNavbarSquare: square,
				leftAligned: leftAligned,
			},
			// colors
			{ [`tu-component--primary`]: !!primary },
			{ [`tu-component--danger`]: !!danger },
			{ [`tu-component--warn`]: !!warn },
			{ [`tu-component--success`]: !!success },
			{ [`tu-component--dark`]: !!dark },
			{ [`tu-component--is-color`]: !!isColor },
		]"
		ref="navbarContent"
	>
		<div class="tu-navbar">
			<div
				v-if="leftCollapsed ? !collapsedForced : true"
				class="tu-navbar__left"
				ref="left"
			>
				<slot name="left" />
			</div>
			<div
				v-if="centerCollapsed ? !collapsedForced : true"
				class="tu-navbar__center"
				ref="center"
			>
				<slot />
			</div>
			<div
				v-if="rightCollapsed ? !collapsedForced : true"
				class="tu-navbar__right"
				ref="right"
			>
				<slot name="right" />
			</div>
		</div>
		<div
			:class="['tu-navbar__line', { notTransition: lineNotTransition }]"
			:style="{
				left: `${leftLine}px`,
				width: `${widthLine}px`,
			}"
		></div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	nextTick,
	onMounted,
	ref,
	watch,
} from "vue";
import _color from "../../utils/color";
import tuComponent from "../tuComponent";

class NavbarConstants {
	public static zIndex = 9000;
}

export default defineComponent({
	name: "TuNavbar",
	extends: tuComponent,
	props: {
		fixed: { default: false, type: Boolean },
		sticky: { default: false, type: Boolean },
		leftAligned: { default: false, type: Boolean },
		open: { default: true, type: Boolean },
		shadow: { default: false, type: Boolean },
		shadowScroll: { default: false, type: Boolean },
		hideScroll: { default: false, type: Boolean },
		textWhite: { default: false, type: Boolean },
		square: { default: false, type: Boolean },
		paddingScroll: { default: false, type: Boolean },
		notLine: { default: false, type: Boolean },
		leftCollapsed: { default: false, type: Boolean },
		centerCollapsed: { default: false, type: Boolean },
		rightCollapsed: { default: false, type: Boolean },
		targetScroll: { type: String, default: null },
	},
	provide() {
		return {
			setLeftLine: this.setLeftLine,
			setWidthLine: this.setWidthLine,
			setModel: this.setModel,
		};
	},
	emits: ["collapsed", "update:value"],
	setup(props, context) {
		let leftLine = ref(0);
		let widthLine = ref(0);
		let scrollTop = ref(0);
		let collapsedWidth = ref(0);
		let hidden = ref(false);
		let shadowActive = ref(false);
		let paddingScrollActive = ref(false);
		let lineNotTransition = ref(false);
		let collapsedForced = ref(false);

		let navbarContent = ref<HTMLDivElement>();
		let left = ref<HTMLDivElement>();
		let right = ref<HTMLDivElement>();
		let center = ref<HTMLDivElement>();
		let instance = getCurrentInstance();
		let zIndex = NavbarConstants.zIndex--;

		let idToLineHandler: any = {};
		let activeId = "";

		const setModel = function (id: string, handleFunc: Function) {
			context.emit("update:value", id);
			idToLineHandler[id] = handleFunc;
			activeId = id;
		};

		watch(
			[
				() => props.hideScroll,
				() => props.paddingScroll,
				() => props.shadowScroll,
			],
			() => {
				handleScroll();
			}
		);

		const setLeftLine = function (left: any, transition: boolean = true) {
			if (!transition) {
				lineNotTransition.value = true;
			} else {
				lineNotTransition.value = false;
			}
			nextTick(() => {
				leftLine.value = left;
			});
		};

		const setWidthLine = function (width: any) {
			nextTick(() => {
				widthLine.value = width;
			});
		};

		const scroll = function (evt: any) {
			const scrollTopTemp = props.targetScroll
				? document.querySelector(props.targetScroll)?.scrollTop
				: window.pageYOffset;
			if (props.hideScroll) {
				if (
					Math.sign((scrollTopTemp as number) - scrollTop.value) === 1
				) {
					hidden.value = true;
				} else {
					hidden.value = false;
				}
			}

			if (props.shadowScroll) {
				if ((scrollTopTemp as number) > 0) {
					shadowActive.value = true;
				} else {
					shadowActive.value = false;
				}
			}

			if (props.paddingScroll) {
				if ((scrollTopTemp as number) > 0) {
					paddingScrollActive.value = true;
				} else {
					paddingScrollActive.value = false;
				}
			}
			scrollTop.value = scrollTopTemp as number;
		};

		const handleScroll = function () {
			if (props.hideScroll || props.shadowScroll || props.paddingScroll) {
				if (props.targetScroll) {
					const scrollElement = document.querySelector(
						props.targetScroll
					);
					scrollElement?.addEventListener("scroll", scroll);
				} else {
					window.addEventListener("scroll", scroll);
				}
			}
		};

		const handleResize = function () {
			const active: HTMLElement = navbarContent.value?.querySelector(
				".tu-navbar__item.active"
			) as HTMLElement;

			if (active) {
				idToLineHandler[activeId].call(null, null);
			} else {
				widthLine.value = 0;
			}
			const navbar: any = navbarContent.value;

			if (
				props.leftCollapsed ||
				props.centerCollapsed ||
				props.rightCollapsed
			) {
				if (navbar.offsetWidth < collapsedWidth.value) {
					collapsedForced.value = true;
				}
			}

			if (collapsedForced) {
				context.emit("collapsed", true);
			} else {
				context.emit("collapsed", false);
			}

			if (navbar.offsetWidth < collapsedWidth.value) {
				context.emit("collapsed", true);
			} else {
				context.emit("collapsed", false);
				collapsedForced.value = false;
			}
		};

		onMounted(() => {
			setTimeout(() => {
				try {
					const leftEl: any = left.value;
					const centerEl: any = center.value;
					const rightEl: any = right.value;
					collapsedWidth.value =
						leftEl.offsetWidth +
						centerEl.offsetWidth +
						rightEl.offsetWidth +
						150;
					const navbar: any = navbarContent.value;
					if (navbar.offsetWidth < collapsedWidth.value) {
						collapsedForced.value = true;
						context.emit("collapsed", true);
						widthLine.value = 0;
						handleResize();
					}
				} catch (error) {
					console.log(error);
				}
			}, 150);

			handleScroll();
			window.addEventListener("resize", handleResize);
		});

		return {
			leftLine,
			widthLine,
			scrollTop,
			collapsedWidth,
			hidden,
			shadowActive,
			paddingScrollActive,
			lineNotTransition,
			collapsedForced,
			setModel,
			setLeftLine,
			setWidthLine,
			navbarContent,
			left,
			right,
			center,
			zIndex,
		};
	},
});
</script>
<style lang="scss">
@import "../../style/sass/_mixins";

.tu-navbar-content {
	--tu-color: var(--tu-gray-2);
	width: 100%;
	position: relative;
	top: 0px;
	left: 0px;
	width: 100%;
	border-radius: 0px 0px 15px 15px;
	background: -getColor("color");
	transition: all 0.25s ease;
	color: -getColor("text");

	&.paddingScroll:not(.paddingScrollActive) {
		padding-top: 20px;
		padding-bottom: 20px;

		.tu-navbar__group__items {
			margin-bottom: -30px;
		}
	}

	&.tuNavbarSquare {
		border-radius: 0px;
	}

	&.textWhite {
		color: #fff;

		.tu-navbar__line {
			background: #fff;
		}

		.tu-navbar__item {
			&:before {
				background: #fff;
			}
		}
	}

	&.leftAligned {
		.tu-navbar {
			justify-content: left !important;

			&__right {
				margin-left: auto;
			}

			&__center {
				margin-left: 2%;
			}
		}
	}

	&.fixed {
		position: fixed !important;
	}

	&.sticky {
		position: sticky !important;
	}

	&.shadow,
	&.shadowActive {
		box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, -var("shadow-opacity"));
	}

	&.hidden {
		transform: translate(0, -100%);
	}
}

.tu-navbar {
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 15px;
	box-sizing: border-box;
	min-height: 44px;

	&__left {
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		padding: 5px;
		img {
			width: 100px;
		}
	}

	&__right {
		display: inline-flex;
		align-items: center;
		justify-content: flex-end;
	}

	&__center {
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
	}

	&__line {
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 100px;
		background: -getColor("text");
		height: 3px;
		transition: all 0.25s ease;

		&.notTransition {
			transition: none !important;
		}
	}
}
</style>