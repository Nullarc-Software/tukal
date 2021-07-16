<template lang="html">
  <div
    :class="[`vs-tabs-${color}`,`vs-tabs-position-${position}`]"
    class="con-vs-tabs vs-tabs" >
    <div
      class="con-ul-tabs">
      <ul
        ref="ul"
        :class="[`ul-tabs-${alignment}`]"
        class="ul-tabs vs-tabs--ul">
        <li
          v-for="child in children"   
          :key="child.id"                
          :style="childActive == child.id ? styleTab : {}"
          class="vs-tabs--li"
		  :class="{
			  	[`vs-tabs--li-${child.id}`] : true,
				'activeChild':childActive == child.id
			  }"
          @mouseover="hover = true"
          @mouseout="hover = false">
          <button
            v-bind="child.attrs"
            :style="styleAlignIcon(child.icon)"
            class="vs-tabs--btn"
            type="button"
            :disabled="child.disabled"
            @click="activeChild(child.id)"
            >
            <vs-icon
              v-if="child.icon"
              :icon-pack="child.iconPack"
              :icon="child.icon"
              :color="color"
              class="vs-tabs--btn-icon"></vs-icon>
            <span v-if="child.label">{{ child.label }}</span>
          </button>

          <button
            v-if="child.tag"
            class="vs-tabs--btn-tag"
            @click="clickTag(child)"
          >
            <vs-icon
              :icon-pack="child.iconPack"
              :icon="child.tag"
              :color="child.tagColor"></vs-icon>
          </button>
        </li>
      </ul>
      <span
        :style="stylex"
        class="line-vs-tabs"/>
    </div>
    <div class="con-slot-tabs">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	reactive,
	ref,
	toRefs,
	VNode,
	watch,
} from "vue";
import * as utils from "../../utils";
import vsIcon from "../vsIcon/vsIcon.vue";

export interface ChildData {
    label: string,
    icon: string,
    iconPack: string,
    tag: string,
    id: number,
    attrs: Object,
    disabled: boolean,
	vnode: VNode | undefined;
	setActive: Function;
	setInvert: Function;
	setVertical: Function;
}
interface TabData {
	topx: string;
	heightx: number;
	hover: boolean;
	children: ChildData[];
	childActive: number;
	leftx: number;
	widthx: number;
	these: boolean;
	vertical: boolean;
	active: boolean;
	id: null;
	invert: boolean;
}

class TabIndex {
	public static tabIndex = 0;
}

export default defineComponent({
	name: "VsTabs",
	components: { vsIcon },
	props: {
		modelValue: {
			default: 0,
			type: [Number, String],
		},
		color: {
			default: "primary",
			type: String,
		},
		tagColor: {
			default: "primary",
			type: String,
		},
		alignment: {
			default: "left",
			type: String,
		},
		position: {
			default: "top",
			type: String,
		},
	},
	provide() {
		return {
			addChild: (instance: ChildData) => {
				this.children.push(instance);
			},
		};
	},
	setup(props, context) {
		let ul = ref<HTMLUListElement>();

		let data: TabData = {
			topx: "auto",
			heightx: 2,
			hover: false,
			children: new Array(),
			childActive: 0,
			leftx: 0,
			widthx: 0,
			these: false,
			vertical: false,
			active: false,
			id: null,
			invert: false,
		};

		let reactiveData = reactive(data);

		const styleTab = computed(() => {
			return {
				color: utils.getApplyColor(props.color, 1),
			};
		});

		const stylex = computed(() => {
            let bkg = `linear-gradient(30deg, ${utils.getApplyColor(props.color,1)} 0%, ${utils.getApplyColor(props.color, 0.5)} 100%)`;
			return {
				top: `${reactiveData.topx}px`,
				left: `${reactiveData.leftx}px`,
				width: `${reactiveData.widthx}px`,
				height: `${reactiveData.heightx}px`,
				background: bkg,
				boxShadow: `0px 0px 8px 0px ${utils.getApplyColor(props.color,0.5)}`,
				transform: `scaleX(${reactiveData.these ? 1.3 : 1})`,
			};
		});

		const clickTag = function (child) {
			context.emit("click-tag", child);
		};

		const styleAlignIcon = function (icon) {
			return icon ? "display:flex;align-items:center" : "";
		};

		const parseIndex = function (index) {
			let activeIndex = reactiveData.childActive;
			if (index < 0) {
				activeIndex = 0;
			} else if (index >= reactiveData.children.length) {
				activeIndex = reactiveData.children.length - 1;
			} else if (		reactiveData.children[index].disabled === false
			) {
				activeIndex = parseInt(index);
			}
			return activeIndex;
		};

		const activeChild = function (index, initialAnimation?) {
			initialAnimation = !!initialAnimation;
			const elem = ul.value?.getElementsByClassName(`vs-tabs--li-${index}`)[0];
			if (reactiveData.childActive == index && !initialAnimation) {
				reactiveData.these = true;
				elem?.classList.add("isActive");
				setTimeout(() => {
					elem?.classList.remove("isActive");
					reactiveData.these = false;
				}, 200);
			}

			reactiveData.children.forEach((value, key) => {
				if (key != index) {
					value.setActive(false);
				}
			});

			if (reactiveData.childActive > index) {
				reactiveData.children[index]?.setInvert(true);
				reactiveData.children
					[reactiveData.childActive]
					?.setInvert(false);
			} else {
				reactiveData.children
					[reactiveData.childActive]
					?.setInvert(true);
				reactiveData.children[index]?.setInvert(false);
			}

			reactiveData.children[index]?.setActive(true);
			reactiveData.childActive = index;
			context.emit("update:modelValue", reactiveData.childActive);

			if (props.position == "left" || props.position == "right") {
				reactiveData.children[index]?.setVertical(true);
			}

			changePositionLine(elem, initialAnimation);
		};

		const changePositionLine = function (elem, initialAnimation) {
			if (props.position == "left" || props.position == "right") {
				reactiveData.topx = elem.offsetTop;
				reactiveData.heightx = elem.offsetHeight;
				reactiveData.widthx = 2;

                if(props.position == "right"){
                    reactiveData.leftx = 0;
                }
			} else {
				const update = () => {
					reactiveData.leftx = elem.offsetLeft;
					reactiveData.widthx = elem.offsetWidth;
					if (ul.value)
						reactiveData.topx =
							elem.offsetHeight +
							(elem.getBoundingClientRect().top -
								ul.value.getBoundingClientRect().top);
				};
				if (!initialAnimation) {
					update();
				} else {
					setTimeout(update, 100);
				}
			}
		};

		onMounted(() => {
			const activeIndex = parseIndex(props.modelValue);
			reactiveData.childActive = activeIndex;
			nextTick(() => {
				activeChild(activeIndex, true);
			});
		});

		return {
			...toRefs(reactiveData),
			ul,
			styleTab,
			stylex,
			styleAlignIcon,
			clickTag,
			activeChild,
			parseIndex,
		};
	},
	watch: {
		value(index) {
			const activeIndex = this.parseIndex(index);
			this.activeChild(activeIndex);
		},
	},
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.fade-tab-enter-active,
.fade-tab-leave-active {
	transition: all 0.3s;
}
.fade-tab-enter,
.fade-tab-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(-100%, 0, 0);
}
.fade-tab-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(100%, 0, 0);
}
.fade-tab-invert-enter-active,
.fade-tab-invert-leave-active {
	transition: all 0.3s;
}
.fade-tab-invert-enter,
.fade-tab-invert-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(100%, 0, 0);
}
.fade-tab-invert-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(-100%, 0, 0);
}
.fade-tab-vertical-enter-active,
.fade-tab-vertical-leave-active {
	transition: all 0.3s;
}
.fade-tab-vertical-enter {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(0, 100%, 0);
}
.fade-tab-vertical-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(0, -100%, 0);
}
.fade-tab-vertical-invert-enter-active,
.fade-tab-vertical-invert-leave-active {
	transition: all 0.3s;
}
.fade-tab-vertical-invert-enter {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(0, -100%, 0);
}
.fade-tab-vertical-invert-leave-to {
	top: 0px;
	opacity: 0;
	position: absolute !important;
	transform: translate3d(0, 100%, 0) !important;
}
.con-vs-tabs {
	width: 100%;
	overflow: hidden;
	position: relative;
	.con-slot-tabs {
		position: relative;
		display: block;
		overflow: hidden;
	}
	.con-ul-tabs {
		position: relative;
	}
}
.vs-tabs--ul {
	width: 100%;
	padding-left: 0px;
	position: relative;
	box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.04);
	&.ul-tabs-center {
		justify-content: center;
	}
	&.ul-tabs-right {
		justify-content: flex-end;
	}
	&.ul-tabs-fixed {
		justify-content: space-between;
		flex-wrap: nowrap !important;
		li {
			width: 100%;
		}
	}
}
.line-vs-tabs {
	width: 100px;
	height: 2px;
	display: block;
	position: absolute;
	transition: all 0.2s ease;
	transform: translateZ(0);
	will-change: left, right;
}
.vs-tabs--li {
	display: block;
	position: relative;
	button {
		color: inherit;
		font-family: inherit;
		&.vs-tabs--btn {
			box-sizing: border-box;
			display: block;
			position: relative;
			width: 100%;
			background: transparent;
			margin: 0px;
			padding: 10px;
			border: 0px;
			cursor: pointer;
			transition: all 0.2s ease;
			z-index: 100;
			&:hover {
				&:not(:disabled) {
					color: inherit;
				}
			}
		}
		&:disabled {
			opacity: 0.5;
			cursor: default !important;
			pointer-events: none;
		}
	}
}
.activeChild {
	button {
		&:not(:disabled) {
			color: inherit;
		}
		&.vs-tabs--btn {
			padding-top: 8px;
			padding-bottom: 12px;
		}
	}
}
.vs-tabs--btn-tag {
	position: absolute;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	top: -10px;
	right: -10px;
	z-index: 200;
	border-radius: 3px;
	border: 0px;
	background: #fff;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
	cursor: pointer;
	z-index: 200;
	i {
		padding-right: 0px !important;
		font-size: 0.9rem;
	}
}
.vs-tabs-position-top {
	.vs-tabs--ul {
		display: flex;
		flex-wrap: wrap;
	}
}
.vs-tabs-position-bottom {
	.vs-tabs--ul {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		border-bottom: 0px !important;
	}
	.con-ul-tabs {
		order: 2;
	}
	.line-vs-tabs {
		top: 0px;
	}
}
.vs-tabs-position-left {
	display: flex;
    .con-slot-tabs {
		margin-left: 15px;
	}
	.line-vs-tabs {
		left: auto !important;
		right: 0px;
	}
	.con-ul-tabs {
		float: left;
		height: 100%;
		display: block;
	}
	.vs-tabs--ul {
		display: block;
		width: auto;
		border-bottom: 0px !important;
		border-right: 1px solid rgba(0, 0, 0, 0.05);
        margin: 0px;    
	}
	.activeChild {
		button {
			padding-top: 10px !important;
			padding-bottom: 10px !important;
			padding-left: 12px !important;
			padding-right: 8px !important;
		}
	}
}
.vs-tabs-position-right {
	display: flex;
	.con-slot-tabs {
		width: 100%;
        margin-right: 15px;
	}
	.con-ul-tabs {
		float: left;
		height: 100%;
		display: block;
		order: 2;
	}
	.vs-tabs--ul {
		display: block;
		width: auto;
		border-bottom: 0px !important;
		border-left: 1px solid rgba(0, 0, 0, 0.05);
        margin: 0px;
	}
	.activeChild {
		button {
			padding-top: 10px !important;
			padding-bottom: 10px !important;
			padding-left: 8px !important;
			padding-right: 12px !important;
		}
	}
}

@each $vs-color, $index in --vs-colors {
	.vs-tabs-#{$vs-color} {
		.con-ul-tabs {
			button {
				&:not(:disabled):hover {
					color: -getColor($vs-color, 1) !important;
				}
			}
			.activeChild {
				button {
					color: -getColor($vs-color, 1) !important;
				}
			}
			.line-vs-tabs {
				background: linear-gradient(
					30deg,
					-getColor($vs-color, 1) 0%,
					-getColor($vs-color, 0.5) 100%
				) !important;
				box-shadow: 0px
					0px
					8px
					0px
					-getColor($vs-color, 0.4) !important;
			}
		}
	}
}

</style>