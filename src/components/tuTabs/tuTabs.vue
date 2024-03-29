<template>
	<div :class="[
		`tu-tabs--${color}`,
		`tu-tabs--position-${position}`,
		`tu-tabs--${tabStyle}`
	]" class="tu-tabs" :style="{
	width: fixedWidth,
	height: fixedHeight
}">
		<div class="con-ul-tabs">
			<ul ref="ul" :class="[`ul-tabs-${alignment}`]" class="ul-tabs tu-tabs--ul" v-if="tabStyle !== 'progress'">
				<li v-for="child in children" :key="child.id" :style="childActive == child.id ? styleTab(child.id) : {}"
					class="tu-tabs--li" :class="{
						[`tu-tabs--li-${child.id}`]: true,
						[`tu-tabs--li-${child.name}`]: child.name,
						activeChild: childActive == child.id,
						['tu-tabs--button-li']: tabStyle === 'pills' && position === 'top'
					}" @mouseover="hover = true" @mouseout="hover = false">
					<a :href="type === 'router' ? getALinkHref(child.to) : null" class="tu-tabs--a">
						<button class="tu-button tu-button--default tu-button--small tu-button__content"
							v-if="tabStyle === 'pills' && childActive == child.id" :style="styleAlignIcon(child.icon)"
							:disabled="child.disabled" @click="activeChild(child.id)">
							<tu-icon v-if="child.icon" :icon-pack="child.iconPack" :icon="child.icon"
								class="tu-tabs--btn-icon"></tu-icon>
							<span class="tu-tabs-button-text" v-if="child.label">{{ child.label }}</span>
						</button>
						<button v-else :style="styleAlignIcon(child.icon)" :disabled="child.disabled" class="tu-tabs--btn"
							type="button" @click="activeChild(child.id)">
							<tu-icon v-if="child.icon" :icon-pack="child.iconPack" :icon="child.icon" :color="color"
								class="tu-tabs--btn-icon"></tu-icon>
							<span v-if="child.label">{{ child.label }}</span>
						</button>

						<button v-if="child.tag" class="tu-tabs--btn-tag" @click="clickTag(child)">
							<tu-icon :icon-pack="child.iconPack" :icon="child.tag"></tu-icon>
						</button>
					</a>
				</li>
			</ul>
			<div v-else ref="ul" :class="[`ul-tabs-${alignment}`]" class="ul-tabs tu-tabs--ul">
				<div class="tu-tabs-progress-header">
					<div class="tu-tabs--progress__info">
						<div class="tu-tabs--progress__title">{{ children[activeIdx] ? children[activeIdx].label : "" }}
						</div>
						<div class="tu-tabs-progress__nav">
							<tu-icon class="tu-tabs-progress__icon" @click="activeChild(activeIdx - 1)">
								keyboard_arrow_left</tu-icon>
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
							<tu-icon class="tu-tabs-progress__icon" @click="activeChild(activeIdx + 1)"
								style="margin-left: 10px;">
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
			<span :style="stylex" v-if="tabStyle !== 'progress' && tabStyle !== 'pills'" class="line-tu-tabs" />
		</div>

		<div class="con-slot-tabs" :class="{ 'tabs-fixed-height': fixedHeight ? true : false }">
			<slot v-if="type === 'normal'" />

			<router-view v-if="type === 'router' && routerModeParams.name !== null"
				:name="routerModeParams.name"></router-view>
			<router-view v-else-if="type === 'router'"></router-view>
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
	watch,
	PropType,
	onUnmounted
} from "vue";
import { TuTabsChildData, TabId, TuTabsRouterParams } from ".";
import * as utils from "../../utils";
import tuComponent, { ComponentConstants } from "../tuComponent";
import tuIcon from "../tuIcon";
import tuProgress from "../tuProgress";

import { useRouter } from "vue-router";
import { buildProps } from "@vue/compiler-core";

interface TabData {
	topx: string;
	heightx: number;
	hover: boolean;
	children: TuTabsChildData[];
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
		fixedWidth: {
			type: String,
			default: null
		},
		fixedHeight: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: "normal"
		},
		routerModeParams: {
			type: Object as PropType<TuTabsRouterParams>,
			default: () => { }
		},
	},
	provide() {
		return {
			addChild: (instance: TuTabsChildData) => {
				this.children.push(instance);
			},
			updateChild: (instance: TuTabsChildData) => {
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
		let routerHook = null;

		if (props.type === "router") {
			props.routerModeParams.tabs.forEach(tab => {
				tab.id = tabIdInstance.value.tabId++;
				reactiveData.children.push(tab);
			});
		}

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


		// This is used only for type=router where on initial page load we have to 
		// set the active tab based on the current route.
		const setActiveTab = function (index) {
			const initialAnimation = true;
			const elem = ul.value?.getElementsByClassName(
				`tu-tabs--li-${index}`
			)[0];
			reactiveData.childActive = index;
			context.emit("update:modelValue", reactiveData.childActive);

			if (props.tabStyle !== "progress")
				changePositionLine(elem, initialAnimation);
		}

		const activeChild = function (index, initialAnimation?) {

			if (index < 0 || index > reactiveData.children.length - 1) return;

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

			if (props.type === "normal") {
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

				if (props.position === "left" || props.position === "right")
					reactiveData.children[index]?.setVertical(true);
			}
			if (props.type === "router") {

				const router = ComponentConstants.router;
				if (router) {

					const childWithId = _.find(reactiveData.children, { id: index });
					if (childWithId) {
						const targetPath = props.routerModeParams.baseRoute ? utils.joinPath(props.routerModeParams.baseRoute, childWithId.to) : childWithId.to;

						// Only replace the url if the current path is an exact match, if not, it may be a child route and we shouldn't override it.
						if (router.currentRoute.value.path.replace(targetPath, "") === "")
							router.replace(targetPath);
						else if (router.currentRoute.value.path.replace(targetPath, "") === router.currentRoute.value.path)
							router.replace(targetPath);
					}
				}

			}
			reactiveData.childActive = index;
			activeIdx.value = index;
			context.emit("update:modelValue", reactiveData.childActive);

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

		function getALinkHref(to: string) {
			const finalPath = utils.joinPath("/#/", props.routerModeParams?.baseRoute ? utils.joinPath(props.routerModeParams?.baseRoute, to) : to);
			return finalPath;
		}

		function findMatchingPath(inputPath: string, pathsToCompare: string[]): { type: string, path: string, index: number } | undefined {
			// Find exact matches
			const exactMatch = pathsToCompare.find(path => path === inputPath);
			if (exactMatch) {
				return { type: 'exact', path: exactMatch, index: pathsToCompare.indexOf(exactMatch) };
			}

			// Find prefix matches
			const prefixMatch = pathsToCompare.find(path =>
				inputPath.startsWith(path) && (inputPath.charAt(path.length) === '/' || inputPath.length === path.length + 1)
			);
			if (prefixMatch) {
				return { type: 'prefix', path: prefixMatch, index: pathsToCompare.indexOf(prefixMatch) };
			}

			// No match found
			return undefined;
		}

		onMounted(() => {
			let activeIndex = parseIndex(props.modelValue);

			if (props.type === "router") {
				if (ComponentConstants.router) {

					const tabMatched = findMatchingPath(ComponentConstants.router.currentRoute.value.path, reactiveData.children.map(child => {
						const actualPath = _.isNil(props.routerModeParams.baseRoute) === false ? utils.joinPath(props.routerModeParams.baseRoute, child.to) : child.to;
						return actualPath;
					}));

					if (tabMatched && reactiveData.childActive !== tabMatched.index) {
						activeIndex = tabMatched.index;
					}
					routerHook = ComponentConstants.router.afterEach((to, from) => {
						if (props.routerModeParams?.baseRoute) {
							if (to.fullPath === props.routerModeParams.baseRoute && !props.routerModeParams.preventAutoRedirect) {
								activeChild(0, true);
							}
							else {
								const targetPath = to.fullPath.replace(props.routerModeParams.baseRoute, "");
								const tabMatched = findMatchingPath(targetPath, reactiveData.children.map(child => child.to));
								if (tabMatched && reactiveData.childActive !== tabMatched.index) {
									setActiveTab(tabMatched.index);
								}
							}
						}
						else {
							const tabMatched = _.findIndex(reactiveData.children, { to: to.fullPath });
							if (tabMatched !== -1 && reactiveData.childActive !== tabMatched) {
								setActiveTab(tabMatched);
							}
						}
					})

				}
			}
			reactiveData.childActive = activeIndex;
			nextTick(() => {
				activeChild(activeIndex, true);
			});
		});

		onUnmounted(() => {
			if (routerHook) {
				routerHook();
			}
		})

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

		const overallStyles = {

		}


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
			getALinkHref,
			tabIdInstance
		};
	}
});
</script>


<style lang="scss" >
@import "../../style/sass/_mixins";

.tu-tabs {
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	position: relative;

	&--ul {
		width: 100%;
		padding-left: 0;
		position: relative;
		margin-top: 0;

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

	&--li {
		display: block;
		position: relative;

		button {
			color: inherit;
			font-family: inherit;
			box-sizing: border-box;
			display: block;
			position: relative;
			width: 100%;
			background: transparent;
			margin: 0;
			padding: 10px;
			border: 0;
			cursor: pointer;
			transition: all 0.2s ease;
			z-index: 100;

			&:hover:not(:disabled) {
				color: inherit;
			}

			&:disabled {
				opacity: 0.5;
				cursor: default !important;
				pointer-events: none;
			}
		}
	}

	&--a {
		display: contents;
		color: unset;
	}

	&>.con-ul-tabs>.line-tu-tabs {
		width: 100px;
		height: 2px;
		display: block;
		position: absolute;
		transition: all 0.2s ease;
		transform: translateZ(0);
		will-change: left, right;
	}

	&>.con-slot-tabs.tabs-fixed-height {
		flex-grow: 1;
	}


	&--card {
		box-shadow: -var("elevated-1");
		border-radius: 15px;
		padding-bottom: 10px;
	}

	&>.con-ul-tabs>.ul-tabs>.activeChild {
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

	&--pills {
		&>.con-ul-tabs>.ul-tabs>.activeChild>a>button {
			background: -getColor("color") !important;
			color: #fff !important;
		}
	}

	&>.con-ul-tabs>.ul-tabs>li>a>.tu-tabs--btn-tag {
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
		border: 0;
		background: #fff;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
		cursor: pointer;
		z-index: 200;

		i {
			padding-right: 0 !important;
			font-size: 0.9rem;
		}
	}

	&>.con-ul-tabs>.ul-tabs>.tu-tabs--button-li {
		margin-right: 5px;
	}

	&--position-top>.con-ul-tabs>.tu-tabs--ul {
		display: flex;
		flex-wrap: wrap;
	}

	&--position-bottom>.con-ul-tabs>.tu-tabs--ul {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.05);
		border-bottom: 0 !important;
	}

	&--position-bottom>.con-ul-tabs {
		order: 2;
	}

	&--position-bottom>.con-ul-tabs>.line-tu-tabs {
		top: 0;
	}

	&--position-left {
		display: flex;
		flex-direction: row !important;

		&>.con-slot-tabs {
			margin-left: 15px;
		}

		&>.con-ul-tabs>.line-tu-tabs {
			left: auto !important;
			right: 0;
		}

		>.con-ul-tabs {
			float: left;
			height: 100%;
			display: block;
			position: relative;
		}

		>.con-ul-tabs>.tu-tabs--ul {
			display: block;
			width: auto;
			border-bottom: 0 !important;
			border-right: 1px solid rgba(0, 0, 0, 0.05);
			margin: 0;
		}

		&>.con-ul-tabs>.ul-tabs>.activeChild>li>a>button {
			padding-top: 10px !important;
			padding-bottom: 10px !important;
			padding-left: 12px !important;
		}
	}

	&--position-right {
		display: flex;
		flex-direction: row !important;

		>.con-slot-tabs {
			width: 100%;
			margin-right: 15px;
		}

		&>.con-ul-tabs>.line-tu-tabs {
			left: 0 !important;
			right: auto !important;
		}

		>.con-ul-tabs {
			float: left;
			height: 100%;
			display: block;
			order: 2;
			position: relative;
		}

		&>.con-ul-tabs>.tu-tabs--ul {
			display: block;
			width: auto;
			border-bottom: 0 !important;
			border-left: 1px solid rgba(0, 0, 0, 0.05);
			margin: 0;
		}

		&>.con-ul-tabs>.ul-tabs>.activeChild>li>a>button {
			padding-top: 10px !important;
			padding-bottom: 10px !important;
			padding-left: 8px !important;
			padding-right: 12px !important;
		}

		&.tu-tabs-progress {
			padding: 20px;
			box-shadow: var(--tu-elevated-6);
			border-radius: 15px;
		}

	}

	>.con-ul-tabs>.tu-tabs--ul>.tu-tabs-progress-header {
		flex-direction: column;
		display: flex;
		width: 100%;
		margin-bottom: 10px;

		>.tu-tabs--progress__info {
			display: flex;
			align-items: center;
			align-self: flex-end;

			&>.tu-tabs--progress__title {
				margin-right: 10px;
			}

			&>.tu-tabs-progress__nav {
				display: inline-flex;
				margin-left: auto;
				align-items: center;

				.tu-tabs-progress__icon {
					&:hover {
						background: -getColorAlpha("text", 0.1);
						border-radius: 20px;
					}
				}
			}
		}
	}

	::v-deep(.tu-tabs--content) {
		padding: 10px;
	}

	.tu-tabs-button-text {
		color: white;
	}

	@mixin state($tu-color) {

		:not(.tu-tabs-pills) {
			.con-ul-tabs {
				button {
					&:not(:disabled):hover {
						color: -getColor($tu-color) !important;
					}
				}
			}
		}


		&:not(.tu-tabs-progress):not(.tu-tabs-card) {
			.line-tu-tabs {
				background: linear-gradient(30deg, -getColor($tu-color) 0%, -getColorAlpha($tu-color, 0.5) 100%) !important;
				box-shadow: 0 0 8px 0 -getColorAlpha($tu-color, 0.4) !important;
			}
		}
	}

	&.tu-tabs {
		&-success {
			@include state("success");
		}

		&-danger {
			@include state("danger");
		}

		&-warn {
			@include state("warn");
		}

		&-dark {
			@include state("dark");
		}

		&-primary {
			@include state("primary");
		}
	}

}
</style>
