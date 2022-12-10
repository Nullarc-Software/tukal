<template>
	<div :class="[
		`tu-tabs-${color}`,
		`tu-tabs-position-${position}`,
		`tu-tabs-${tabStyle}`
	]" class="con-tu-tabs tu-tabs" :style="{
	width: fixedWidth,
	height: fixedHeight
}">
		<div class="con-ul-tabs">
			<ul ref="ul" :class="[`ul-tabs-${alignment}`]" class="ul-tabs tu-tabs--ul" v-if="tabStyle !== 'progress'">
				<li v-for="child in children" :key="child.id" :style="childActive == child.id ? styleTab(child.id) : {}"
					class="tu-tabs--li" :class="{
						[`tu-tabs--li-${child.id}`]: true,
						[`tu-tabs--li-${child.name}`]: child.name,
						activeChild: childActive == child.id
					}" @mouseover="hover = true" @mouseout="hover = false">
					<button v-bind="child.attrs" :style="styleAlignIcon(child.icon)" :disabled="child.disabled"
						class="tu-tabs--btn" type="button" @click="activeChild(child.id)">
						<tu-icon v-if="child.icon" :icon-pack="child.iconPack" :icon="child.icon" :color="color"
							class="tu-tabs--btn-icon"></tu-icon>
						<span v-if="child.label">{{ child.label }}</span>
					</button>

					<button v-if="child.tag" class="tu-tabs--btn-tag" @click="clickTag(child)">
						<tu-icon :icon-pack="child.iconPack" :icon="child.tag"></tu-icon>
					</button>
				</li>
			</ul>
			<div v-else ref="ul" :class="[`ul-tabs-${alignment}`]" class="ul-tabs tu-tabs--ul">
				<div class="tu-tabs-progress-header">
					<div class="tu-tabs--progress__info">
						<span> </span>
						<span style="margin-left: 5px">
							<span :style="{
								color: `rgb(${getColor(color)})`
							}">{{ activeIdx + 1 }}
							</span>
							<span :style="{
								color: `rgba(${getColor('text')}, 0.75)`
							}">
								of {{ children.length }}
							</span>
						</span>
						<div class="tu-tabs-progress__nav">
							<tu-icon class="tu-tabs-progress__icon" style="margin-right: 10px"
								@click="activeChild(activeIdx - 1)">
								keyboard_arrow_left</tu-icon>
							<tu-icon class="tu-tabs-progress__icon" @click="activeChild(activeIdx + 1)">
								keyboard_arrow_right</tu-icon>
						</div>
					</div>
					<div class="tu-tabs--progress__bar" :style="{ width: progressWidth }">
						<tu-progress :height="8" :percent="getPercentage" :color="color"></tu-progress>
					</div>
				</div>
				<div hidden v-for="child in children" :key="child.id" class="tu-tabs--li" :class="{
					[`tu-tabs--li-${child.id}`]: true,
					[`tu-tabs--li-${child.name}`]: child.name,
					activeChild: childActive == child.id
				}" />
			</div>
			<span :style="stylex" class="line-tu-tabs" />
		</div>

		<div class="con-slot-tabs" :style="{
			width: fixedWidth,
			height: fixedHeight
		}" :class="{ 'tabs-fixed-height': fixedHeight ? true : false }">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import * as _ from "lodash";
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	reactive,
	ref,
	toRefs,
	watch
} from "vue";
import { ChildData, TabId } from ".";
import * as utils from "../../utils";
import tuComponent from "../tuComponent";
import tuIcon from "../tuIcon";
import tuProgress from "../tuProgress";

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

export default defineComponent({
	name: "TuTabs",
	components: { tuIcon, tuProgress },
	extends: tuComponent,
	props: {
		modelValue: {
			default: 0,
			type: [Number, String]
		},
		color: {
			default: "primary",
			type: String
		},
		tagColor: {
			default: "primary",
			type: String
		},
		alignment: {
			default: "left",
			type: String
		},
		position: {
			default: "top",
			type: String
		},
		noTransitions: {
			type: Boolean,
			default: false
		},
		headerSize: {
			type: Number,
			default: 16
		},
		progressWidth: {
			type: String,
			default: "100%"
		},
		tabStyle: {
			type: String,
			default: "default"
		},
		title: {
			type: String,
			default: null
		},
		fixedWidth: {
			type: String,
			default: null
		},
		fixedHeight: {
			type: String,
			default: null
		}
	},
	provide() {
		return {
			addChild: (instance: ChildData) => {
				this.children.push(instance);
			},
			updateChild: (instance: ChildData) => {
				this.children[instance.id] = _.merge(
					this.children[instance.id],
					instance
				);
			},
			noTransitions: computed(() => {
				return this.noTransitions;
			}),
			tabIdInstance: computed(() => {
				return this.tabIdInstance;
			})
		};
	},
	setup(props, context) {
		const tabIdInstance = ref(new TabId());

		const ul = ref<HTMLUListElement>();
		const data: TabData = {
			topx: "auto",
			heightx: 2,
			hover: false,
			children: [],
			childActive: 0,
			leftx: 0,
			widthx: 0,
			these: false,
			vertical: false,
			active: false,
			id: null,
			invert: false
		};

		const activeIdx = ref(0);

		const reactiveData = reactive(data);

		const styleTab = (childId) => {
			const style: any = {
				color: utils.getApplyColor(props.color, 1)
			};

			if (props.tabStyle === "card") {
				style.background = utils.getApplyColor(props.color, 0.15);
				if (childId === 0) style["border-radius"] = "15px 0px 15px 0px";
				else if (childId === data.children.length - 1)
					style["border-radius"] = "0px 15px 0px 15px";
				else style["border-radius"] = "0px 0px 15px 15px";
			}

			return style;
		};

		const stylex = computed(() => {
			const bkg = `linear-gradient(30deg, ${utils.getApplyColor(
				props.color,
				1
			)} 0%, ${utils.getApplyColor(props.color, 0.5)} 100%)`;

			return props.tabStyle === "default"
				? {
					top: `${reactiveData.topx}px`,
					left: `${reactiveData.leftx}px`,
					width: `${reactiveData.widthx}px`,
					height: `${reactiveData.heightx}px`,
					background: bkg,
					boxShadow: `0px 0px 8px 0px ${utils.getApplyColor(
						props.color,
						0.5
					)}`,
					transform: `scaleX(${reactiveData.these ? 1.3 : 1})`
				}
				: {};
		});

		const clickTag = function (child) {
			context.emit("click-tag", child);
		};

		const styleAlignIcon = function (icon) {
			return icon
				? {
					display: "flex",
					"align-items": "center",
					"font-size": `${props.headerSize}px`,
					cursor: "pointer"
				}
				: {
					"font-size": `${props.headerSize}px`,
					cursor: "pointer"
				};
		};

		const parseIndex = function (index) {
			let activeIndex = reactiveData.childActive;

			if (typeof index === "number" || !isNaN(parseInt(index))) {
				if (index < 0) activeIndex = 0;
				else if (index >= reactiveData.children.length)
					activeIndex = reactiveData.children.length - 1;
				else if (reactiveData.children[index].disabled === false)
					activeIndex = parseInt(index);
			}
			else {
				activeIndex = _.findIndex(reactiveData.children, (child) => {
					return child.name === index;
				});
			}
			activeIdx.value = activeIndex;
			return activeIndex;
		};

		const activeChild = function (index, initialAnimation?) {
			initialAnimation = !!initialAnimation;
			const elem = ul.value?.getElementsByClassName(
				`tu-tabs--li-${index}`
			)[0];
			if (reactiveData.childActive === index && !initialAnimation) {
				reactiveData.these = true;
				elem?.classList.add("isActive");
				setTimeout(() => {
					elem?.classList.remove("isActive");
					reactiveData.these = false;
				}, 200);
			}

			reactiveData.children.forEach((value, key) => {
				if (key !== index) value.setActive(false);
			});

			if (reactiveData.childActive > index) {
				reactiveData.children[index]?.setInvert(true);
				reactiveData.children[reactiveData.childActive]?.setInvert(
					false
				);
			}
			else {
				reactiveData.children[reactiveData.childActive]?.setInvert(
					true
				);
				reactiveData.children[index]?.setInvert(false);
			}

			reactiveData.children[index]?.setActive(true);
			reactiveData.childActive = index;
			context.emit("update:modelValue", reactiveData.childActive);

			if (props.position === "left" || props.position === "right")
				reactiveData.children[index]?.setVertical(true);

			if (props.tabStyle !== "progress")
				changePositionLine(elem, initialAnimation);
		};

		const changePositionLine = function (elem, initialAnimation) {
			if (props.position === "left" || props.position === "right") {
				reactiveData.topx = elem.offsetTop;
				reactiveData.heightx = elem.offsetHeight;
				reactiveData.widthx = 2;

				if (props.position === "right") reactiveData.leftx = 0;
			}
			else {
				const update = () => {
					if (elem) {
						reactiveData.leftx = elem.offsetLeft;
						reactiveData.widthx = elem.offsetWidth;
						if (ul.value) {
							reactiveData.topx =
								elem.offsetHeight +
								(elem.getBoundingClientRect().top -
									ul.value.getBoundingClientRect().top);
						}
					}
				};
				if (!initialAnimation) update();
				else setTimeout(update, 100);
			}
		};

		const getPercentage = computed(() => {
			return (
				((activeIdx.value + 1) /
					(reactiveData.children.length === 0
						? 1
						: reactiveData.children.length)) *
				100
			);
		});

		onMounted(() => {
			const activeIndex = parseIndex(props.modelValue);
			reactiveData.childActive = activeIndex;
			nextTick(() => {
				activeChild(activeIndex, true);
			});
		});

		watch(
			() => props.modelValue,
			() => {
				const activeIndex = parseIndex(props.modelValue);
				reactiveData.childActive = activeIndex;
				nextTick(() => {
					activeChild(activeIndex);
				});
			}
		);

		return {
			...toRefs(reactiveData),
			ul,
			getPercentage,
			activeIdx,
			styleTab,
			stylex,
			styleAlignIcon,
			clickTag,
			activeChild,
			parseIndex,
			tabIdInstance
		};
	}
});
</script>


<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.con-tu-tabs {
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
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

.tu-tabs-card {
	box-shadow: -var("elevated-1");
	border-radius: 15px;
	padding-bottom: 10px;
}

.tu-tabs--ul {
	width: 100%;
	padding-left: 0px;
	position: relative;
	margin-top: 0px;

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

.line-tu-tabs {
	width: 100px;
	height: 2px;
	display: block;
	position: absolute;
	transition: all 0.2s ease;
	transform: translateZ(0);
	will-change: left, right;
}

.tu-tabs--li {
	display: block;
	position: relative;

	button {
		color: inherit;
		font-family: inherit;

		&.tu-tabs--btn {
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

		&.tu-tabs--btn {
			padding-top: 8px;
			padding-bottom: 12px;
		}
	}
}

.tu-tabs--btn-tag {
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

.tu-tabs-position-top {
	.tu-tabs--ul {
		display: flex;
		flex-wrap: wrap;
	}
}

.tu-tabs-position-bottom {
	.tu-tabs--ul {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		border-bottom: 0px !important;
	}

	.con-ul-tabs {
		order: 2;
	}

	.line-tu-tabs {
		top: 0px;
	}
}

.tu-tabs-position-left {
	display: flex;
	flex-direction: row !important;

	.con-slot-tabs {
		margin-left: 15px;
	}

	.line-tu-tabs {
		left: auto !important;
		right: 0px;
	}

	.con-ul-tabs {
		float: left;
		height: 100%;
		display: block;
	}

	.tu-tabs--ul {
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

.tu-tabs-position-right {
	display: flex;
	flex-direction: row !important;

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

	.tu-tabs--ul {
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

::v-deep(.tu-tabs--content) {
	padding: 10px;
}

.tu-tabs-progress {
	padding: 20px;
	box-shadow: var(--tu-elevated-6);
	border-radius: 15px;
}

.tu-tabs-progress-header {
	flex-direction: column;
	display: flex;
	width: 100%;
}

.tu-tabs--progress__info {
	display: flex;
	align-items: center;

	::v-deep(.tu-tabs-progress__nav) {
		display: inline-flex;
		margin-left: auto;

		.tu-tabs-progress__icon {
			&:hover {
				background: -getColor("text", 0.1);
				border-radius: 20px;
			}
		}
	}
}

@each $tu-color,
$index in --tu-colors {
	.tu-tabs-#{$tu-color} {
		.con-ul-tabs {
			button {
				&:not(:disabled):hover {
					color: -getColor($tu-color, 1) !important;
				}
			}

			.activeChild {
				button {
					color: -getColor($tu-color, 1) !important;
				}
			}

			.line-tu-tabs {
				background: linear-gradient(30deg,
						-getColor($tu-color, 1) 0%,
						-getColor($tu-color, 0.5) 100%) !important;
				box-shadow: 0px 0px 8px 0px -getColor($tu-color, 0.4) !important;
			}
		}
	}
}
</style>
