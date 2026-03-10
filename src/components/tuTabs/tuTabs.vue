<template>
	<div :class="[
		`tu-tabs--${color}`,
		`tu-tabs--position-${actualPosition}`,
		`tu-tabs--${tabStyle}`
	]" class="tu-tabs" :style="{
	width: fixedWidth || 'auto',
	height: fixedHeight || 'auto'
}">
		<div class="con-ul-tabs">
			<ul ref="ul" :class="[`ul-tabs-${alignment}`]" class="ul-tabs tu-tabs--ul" v-if="tabStyle !== 'progress'">
				<li v-for="child in children" :key="child.id" :style="childActive == child.id ? styleTab(child.id) : {}"
					class="tu-tabs--li" :class="{
						[`tu-tabs--li-${child.id}`]: true,
						[`tu-tabs--li-${child.name}`]: child.name,
						activeChild: childActive == child.id,
						['tu-tabs--button-li']: tabStyle === 'pills' && actualPosition === 'top'
					}" @mouseover="hover = true" @mouseout="hover = false">
					<a :href="type === 'router' && child.to ? getALinkHref(child.to) : undefined" class="tu-tabs--a">
						<button class="tu-button tu-button--default tu-button--small tu-button__content"
							v-if="tabStyle === 'pills' && childActive == child.id" :style="styleAlignIcon(child.icon || '')"
							:disabled="child.disabled" @click="activeChild(child.id)">
							<tu-icon v-if="child.icon" :icon-pack="child.iconPack" :icon="child.icon"
								class="tu-tabs--btn-icon"></tu-icon>
							<span class="tu-tabs-button-text" v-if="child.label">{{ child.label }}</span>
						</button>
						<button v-else :style="styleAlignIcon(child.icon || '')" :disabled="child.disabled" class="tu-tabs--btn"
							type="button" @click="activeChild(child.id || 0)">
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
			<router-view v-if="type === 'router'" :name="routerModeParams.name || undefined"></router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import * as _ from "lodash";
import {
	computed,
	nextTick,
	onMounted,
	reactive,
	ref,
	toRefs,
	watch,
	onUnmounted,
	provide
} from "vue";
import { TuTabsChildData, TabId, TuTabsRouterParams } from ".";
import * as utils from "../../utils";
import { useTukal } from "../../composables/useTukal";
import { TuIcon } from "../tuIcon";
import { TuProgress } from "../tuProgress";

interface TabData {
	topx: string | number;
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

interface Props {
	modelValue?: number | string;
	color?: string;
	tagColor?: string;
	alignment?: string;
	position?: string;
	headerSize?: number;
	progressWidth?: string;
	tabStyle?: string;
	fixedWidth?: string | null;
	fixedHeight?: string | null;
	type?: string;
	routerModeParams?: TuTabsRouterParams;
	vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: 0,
	color: "primary",
	tagColor: "primary",
	alignment: "left",
	position: "top",
	headerSize: 16,
	progressWidth: "100%",
	tabStyle: "default",
	fixedWidth: null,
	fixedHeight: null,
	type: "normal",
	routerModeParams: () => ({
		tabs: [],
		baseRoute: undefined,
		preventAutoRedirect: false
	}),
	vertical: false
});

const emit = defineEmits<{
	"update:modelValue": [value: number | string];
	"click-tag": [child: TuTabsChildData];
}>();

defineOptions({
	name: "TuTabs"
});

const tabIdInstance = ref(new TabId());
const ul = ref<HTMLUListElement>();
const data: TabData = {
	topx: 0,
	heightx: 3,
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

const { router } = useTukal();
const activeIdx = ref(0);
const reactiveData = reactive(data);
let routerHook: (() => void) | null = null;

// Destructure reactive data to expose individual reactive variables to template
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { topx, heightx, hover, children, childActive, leftx, widthx, these, vertical, active, id, invert } = toRefs(reactiveData);

// Methods that will be provided to child components
const addChild = (instance: TuTabsChildData) => {
	reactiveData.children.push(instance);
};

const updateChild = (instance: TuTabsChildData) => {
	if (instance.id !== undefined) {
		reactiveData.children[instance.id] = _.merge(
			reactiveData.children[instance.id],
			instance
		);
	}
};

// Provide values for child components
provide("addChild", addChild);
provide("updateChild", updateChild);
provide("tabIdInstance", computed(() => tabIdInstance.value));

// Computed property to determine the actual position
const actualPosition = computed(() => {
	return props.vertical ? "left" : props.position;
});

if (props.type === "router") {
	props.routerModeParams.tabs.forEach(tab => {
		tab.id = tabIdInstance.value.tabId++;
		reactiveData.children.push(tab);
	});
}

const styleTab = (childId: number) => {
	const style: Record<string, string | number> = {
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

const clickTag = function (child: TuTabsChildData) {
	emit("click-tag", child);
};

const styleAlignIcon = function (icon: string) {
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

const parseIndex = function (index: number | string) {
	let activeIndex = reactiveData.childActive;

	if (typeof index === "number" || !isNaN(parseInt(index as string))) {
		if ((index as number) < 0) activeIndex = 0;
		else if ((index as number) >= reactiveData.children.length)
			activeIndex = reactiveData.children.length - 1;
		else if (reactiveData.children[index as number]?.disabled === false)
			activeIndex = parseInt(index as string);
	}
	else {
		// First try to find by value, then by name
		activeIndex = _.findIndex(reactiveData.children, (child) => {
			return child.value === index || child.name === index;
		});
		
		// If not found, default to 0
		if (activeIndex === -1) activeIndex = 0;
	}
	activeIdx.value = activeIndex;
	return activeIndex;
};

// This is used only for type=router where on initial page load we have to 
// set the active tab based on the current route.
const setActiveTab = function (index: number) {
	const initialAnimation = true;
	const elem = ul.value?.getElementsByClassName(
		`tu-tabs--li-${index}`
	)[0];
	reactiveData.childActive = index;
	
	// Emit the correct value - if child has a value prop, use that, otherwise use the index
	const activeChild = reactiveData.children[index];
	const emitValue = activeChild?.value || activeChild?.name || index;
	emit("update:modelValue", emitValue);

	if (props.tabStyle !== "progress")
		changePositionLine(elem as HTMLElement, initialAnimation);
};

const activeChild = function (index: number, initialAnimation?: boolean) {
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
			if (key !== index) value.setActive?.(false);
		});

		reactiveData.children[index]?.setActive?.(true);
	}
	if (props.type === "router") {
		if (router) {
			const childWithId = _.find(reactiveData.children, { id: index });
			if (childWithId && childWithId.to) {
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
	
	// Emit the correct value - if child has a value prop, use that, otherwise use the index
	const activeChild = reactiveData.children[index];
	const emitValue = activeChild?.value || activeChild?.name || index;
	emit("update:modelValue", emitValue);

	if (props.tabStyle !== "progress")
		changePositionLine(elem as HTMLElement, initialAnimation);
};

const changePositionLine = function (elem: HTMLElement, initialAnimation: boolean) {
	if (!elem || !ul.value) return;
	
	if (actualPosition.value === "left" || actualPosition.value === "right") {
		reactiveData.topx = elem.offsetTop;
		reactiveData.heightx = elem.offsetHeight;
		reactiveData.widthx = 3;
		reactiveData.leftx = actualPosition.value === "right" ? 0 : elem.offsetParent ? (elem.offsetParent as HTMLElement).offsetWidth - 3 : 0;
	}
	else {
		const update = () => {
			if (elem && ul.value) {
				reactiveData.leftx = elem.offsetLeft;
				reactiveData.widthx = elem.offsetWidth;
				reactiveData.topx = actualPosition.value === "bottom" ? 0 : elem.offsetHeight;
			}
		};
		if (!initialAnimation) update();
		else setTimeout(update, 150);
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

function getColor(colorName: string) {
	return utils.getColor(colorName, 1);
}

function findMatchingPath(inputPath: string, pathsToCompare: string[]): { type: string, path: string, index: number } | undefined {
	// Find exact matches
	const exactMatch = pathsToCompare.find(path => path === inputPath);
	if (exactMatch) 
		return { type: "exact", path: exactMatch, index: pathsToCompare.indexOf(exactMatch) };
	

	// Find prefix matches
	const prefixMatch = pathsToCompare.find(path =>
		inputPath.startsWith(path) && (inputPath.charAt(path.length) === "/" || inputPath.length === path.length + 1)
	);
	if (prefixMatch) 
		return { type: "prefix", path: prefixMatch, index: pathsToCompare.indexOf(prefixMatch) };
	

	// No match found
	return undefined;
}

onMounted(() => {
	let activeIndex = parseIndex(props.modelValue);

	if (props.type === "router") {
		if (router) {
			const tabMatched = findMatchingPath(router.currentRoute.value.path, reactiveData.children
				.filter(child => child.to)
				.map(child => {
					const actualPath = props.routerModeParams.baseRoute && child.to ? utils.joinPath(props.routerModeParams.baseRoute, child.to) : child.to || "";
					return actualPath;
				}));
		
			if (tabMatched && reactiveData.childActive !== tabMatched.index) 
				activeIndex = tabMatched.index;
			
			routerHook = router.afterEach((to) => {
				if (props.routerModeParams?.baseRoute) {
					if (to.fullPath === props.routerModeParams.baseRoute && !props.routerModeParams.preventAutoRedirect) 
						activeChild(0, true);
					
					else {
						const targetPath = to.fullPath.replace(props.routerModeParams.baseRoute, "");
						const tabMatched = findMatchingPath(targetPath, reactiveData.children
							.filter(child => child.to)
							.map(child => child.to || ""));
						if (tabMatched && reactiveData.childActive !== tabMatched.index) 
							setActiveTab(tabMatched.index);
						
					}
				}
				else {
					const tabMatched = _.findIndex(reactiveData.children, { to: to.fullPath });
					if (tabMatched !== -1 && reactiveData.childActive !== tabMatched) 
						setActiveTab(tabMatched);
					
				}
			});
		}
	}
	reactiveData.childActive = activeIndex;
	
	// Use nextTick to ensure child components are mounted
	nextTick(() => {
		// Re-parse the index in case children were registered after initial mount
		if (reactiveData.children.length > 0) {
			const newActiveIndex = parseIndex(props.modelValue);
			activeChild(newActiveIndex, true);
		}
	});
});

onUnmounted(() => {
	if (routerHook) 
		routerHook();
	
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

// Watch for children changes to ensure initial selection works
watch(
	() => reactiveData.children.length,
	(newLength, oldLength) => {
		// When children are first registered, ensure correct initial selection
		if (oldLength === 0 && newLength > 0) {
			const activeIndex = parseIndex(props.modelValue);
			nextTick(() => {
				activeChild(activeIndex, true);
			});
		}
	}
);
</script>


<style lang="scss" >
@import "../../style/sass/_functions";

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
		margin-bottom: 0;
		list-style: none;

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
		list-style: none;

		button {
			color: rgba(var(--tu-text), 0.7);
			font-family: inherit;
			box-sizing: border-box;
			display: block;
			position: relative;
			width: 100%;
			background: transparent;
			margin: 0;
			padding: 12px 16px;
			border: 0;
			cursor: pointer;
			transition: all 0.25s ease;
			font-size: 14px;
			font-weight: 500;
			border-radius: 4px;

			&:hover:not(:disabled) {
				color: rgba(var(--tu-text), 0.9);
				background: rgba(var(--tu-text), 0.05);
			}

			&:disabled {
				opacity: 0.4;
				cursor: default !important;
				pointer-events: none;
				color: rgba(var(--tu-text), 0.3) !important;
				background: transparent !important;
			}
		}

		&.activeChild {
			button {
				color: rgba(var(--tu-text), 1);
				font-weight: 600;
			}
		}
	}

	&--a {
		display: contents;
		color: unset;
	}

	&>.con-ul-tabs>.line-tu-tabs {
		width: 100px;
		height: 3px;
		display: block;
		position: absolute;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		transform: translateZ(0);
		will-change: left, width, transform;
		border-radius: 3px 3px 0 0;
		bottom: 0;
		z-index: 10;
	}

	&>.con-slot-tabs.tabs-fixed-height {
		flex-grow: 1;
	}


	&--card {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		padding-bottom: 0;
		border: 1px solid rgba(var(--tu-text), 0.1);
		overflow: hidden;

		.con-ul-tabs {
			.ul-tabs {
				.tu-tabs--li {
					border-bottom: 1px solid rgba(var(--tu-text), 0.1);
					
					&:last-child {
						border-bottom: none;
					}

					button {
						padding: 16px 20px;
						border-radius: 0;
						
						&:hover:not(:disabled) {
							background: rgba(var(--tu-text), 0.05);
						}
					}

					&.activeChild {
						background: rgba(var(--tu-primary), 0.1);
						border-left: 3px solid rgb(var(--tu-primary));
						
						button {
							color: rgb(var(--tu-primary)) !important;
							font-weight: 600;
						}
					}
				}
			}
		}

		.con-slot-tabs {
			padding: 20px;
		}
	}

	&>.con-ul-tabs>.ul-tabs>.activeChild {
		button {
			&:not(:disabled) {
				color: rgba(var(--tu-text), 1) !important;
				font-weight: 600;
			}

			&.tu-tabs--btn {
				padding-top: 12px;
				padding-bottom: 12px;
			}
		}
	}

	&--pills {
		&>.con-ul-tabs>.ul-tabs {
			gap: 8px;

			.tu-tabs--li {
				button {
					border-radius: 20px;
					padding: 8px 16px;
					background: rgba(var(--tu-text), 0.05);
					transition: all 0.25s ease;

					&:hover:not(:disabled) {
						background: rgba(var(--tu-text), 0.1);
						transform: translateY(-1px);
					}
				}

				&.activeChild {
					button {
						color: #fff !important;
						font-weight: 600;
						box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
						transform: translateY(-1px);
					}
				}
			}
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

	&--position-bottom {
		display: flex;
		flex-direction: column;
		
		&>.con-ul-tabs {
			order: 2;
			border-top: 1px solid rgba(var(--tu-text), 0.1);
			border-bottom: 0 !important;

			>.tu-tabs--ul {
				display: flex;
			}

			>.line-tu-tabs {
				top: 0;
				border-radius: 0 0 3px 3px;
			}
		}
	}

	&--position-left {
		display: flex;
		flex-direction: row !important;

		>.con-ul-tabs>.tu-tabs--ul {
			display: block !important;
			width: auto;
			border-bottom: 0 !important;
			border-right: 1px solid rgba(var(--tu-text), 0.1);
			margin: 0;
		}

		&>.con-slot-tabs {
			margin-left: 20px;
			flex: 1;
		}

		&>.con-ul-tabs {
			min-width: 200px;
			
			>.line-tu-tabs {
				left: auto !important;
				right: 0;
				width: 3px !important;
				height: auto;
				border-radius: 0 3px 3px 0;
			}
		}

		>.con-ul-tabs {
			float: left;
			height: 100%;
			display: block;
			position: relative;
		}

		&>.con-ul-tabs>.ul-tabs>.activeChild>li>a>button {
			padding: 12px !important;
		}
	}

	&--position-right {
		display: flex;
		flex-direction: row !important;

		>.con-slot-tabs {
			width: 100%;
			margin-right: 20px;
			flex: 1;
		}

		&>.con-ul-tabs {
			min-width: 200px;
			
			>.line-tu-tabs {
				left: 0 !important;
				right: auto !important;
				width: 3px !important;
				height: auto;
				border-radius: 3px 0 0 3px;
			}
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
			border-left: 1px solid rgba(var(--tu-text), 0.1);
			margin: 0;
		}

		&>.con-ul-tabs>.ul-tabs>.activeChild>li>a>button {
			padding: 12px !important;
		}

		&.tu-tabs--progress {
			padding: 20px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			border-radius: 12px;
		}
	}

	>.con-ul-tabs>.tu-tabs--ul>.tu-tabs-progress-header {
		flex-direction: column;
		display: flex;
		width: 100%;
		margin-bottom: 20px;
		padding: 20px;
		background: rgba(var(--tu-text), 0.02);
		border-radius: 12px;
		border: 1px solid rgba(var(--tu-text), 0.1);

		>.tu-tabs--progress__info {
			display: flex;
			align-items: center;
			align-self: flex-end;
			margin-bottom: 15px;

			&>.tu-tabs--progress__title {
				margin-right: 15px;
				font-size: 18px;
				font-weight: 600;
				color: rgba(var(--tu-text), 0.9);
			}

			&>.tu-tabs-progress__nav {
				display: inline-flex;
				margin-left: auto;
				align-items: center;
				gap: 10px;

				.tu-tabs-progress__icon {
					padding: 8px;
					border-radius: 50%;
					cursor: pointer;
					transition: all 0.2s ease;
					color: rgba(var(--tu-text), 0.6);

					&:hover {
						background: rgba(var(--tu-text), 0.1);
						color: rgba(var(--tu-text), 0.9);
					}
				}

				span {
					font-size: 14px;
					font-weight: 500;
				}
			}
		}

		>.tu-tabs--progress__bar {
			border-radius: 8px;
			overflow: hidden;
		}
	}

	::v-deep(.tu-tabs--content) {
		padding: 10px;
	}

	.tu-tabs-button-text {
		color: white;
	}

	@mixin state($tu-color) {
		&>.con-ul-tabs>.ul-tabs>.activeChild {
			button {
				&:not(:disabled) {
					color: getColor($tu-color) !important;
				}

				&:not(:disabled):hover {
					color: getColor($tu-color) !important;
				}
			}
		}

		&:not(.tu-tabs--pills) {
			.con-ul-tabs {
				button {
					&:not(:disabled):hover {
						color: getColor($tu-color) !important;
						background: getColorAlpha($tu-color, 0.1);
					}
				}
			}
		}

		&:not(.tu-tabs--progress):not(.tu-tabs--card) {
			.line-tu-tabs {
				background: linear-gradient(135deg, getColor($tu-color) 0%, getColorAlpha($tu-color, 0.8) 100%) !important;
				box-shadow: 0 2px 8px 0 getColorAlpha($tu-color, 0.3) !important;
			}
		}

		&.tu-tabs--pills {
			&>.con-ul-tabs>.ul-tabs>.activeChild>a>button {
				background: getColor($tu-color) !important;
				color: #fff !important;
				box-shadow: 0 2px 8px 0 getColorAlpha($tu-color, 0.4);
			}
		}

		&.tu-tabs--card {
			&>.con-ul-tabs>.ul-tabs>.activeChild {
				background: getColorAlpha($tu-color, 0.1);
				border-color: getColor($tu-color);
			}
		}
	}

	&.tu-tabs {
		&--success {
			@include state("success");
		}

		&--danger {
			@include state("danger");
		}

		&--warn {
			@include state("warn");
		}

		&--dark {
			@include state("dark");
		}

		&--primary {
			@include state("primary");
		}
	}

}
</style>

