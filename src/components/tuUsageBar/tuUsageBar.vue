<template>
	<div style="display: flex; flex-direction: column;">
		<div class="tu-usagebar-parent" :style="`height:${height}`" ref="usagebarParent" @animationstart="startWidthChange"
			@animationend="stopWidthChange">
			<tu-popper v-for="(item, index) in orderedItems" :key="index" arrow hover placement="top">
				<div class="tu-usagebar-children" :style="{
					...styleItem(item, index),
					width: item.width,
					height: height
				}" />
				<template #content>
					<div style="margin: 10px">
						<div v-if="item.name !== 'Others'">
							<div class="tu-usagebar-text-parent">
								<div class="tu-usagebar-text-title">{{ item.name }}: </div>
								<div class="tu-usagebar-text-percentage">{{ item.percentage.toFixed(2)
								}}%</div>
							</div>
						</div>
						<div v-else>
							<strong v-if="tempArr.length > 1"> Total : {{ item.percentage.toFixed(2) }}%</strong>
							<div class="tu-usagebar-text-parent" v-for="(item, itemIndex) in tempArr" :key="itemIndex">
								<span class="tu-usagebar-text-title">{{ item.name }}: </span>
								<span class="tu-usagebar-text-percentage">{{ item.percentage.toFixed(2)
								}}%</span>
							</div>
						</div>
					</div>
				</template>
			</tu-popper>
		</div>
		<div class="tu-usagebar-items" :style="{
			'font-size': fontSize
		}">
			<div v-for="(item, index) in orderedItems" :key="index" class="tu-usagebar-list-item">
				<span class="tu-usagebar-dot" :style="styleChip(item.color || '')"></span>
				<span class="tu-usagebar-text">{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { tuPopper } from "../tuPopper";
import * as _color from "../../utils";
import { UsageBarItem } from "./types";

interface UsageBarItemPercentage {
	name: string;
	percentage: number;
	color?: string;
	width?: string;
}

interface Props {
	barColors?: string[];
	items?: UsageBarItem[];
	height?: string;
	fontSize?: string;
}

const props = withDefaults(defineProps<Props>(), {
	barColors: () => ["#5e64ff",
		"#28a745",
		"#feef72",
		"#98d85b",
		"#ffa00a",
		"#ff5858",
		"#7cd6fd",
		"#743ee2", "#0000ff", "#003366", "#800000",
		"#800080", "#00ff00", "#20b2aa", "#f08080",
		"#ffc3a0", "#ff6666", "#008000",
		"#660066", "#8b0000", "#794044"],
	items: () => [],
	height: "20px",
	fontSize: "12px"
});

const usagebarParent = ref<HTMLDivElement>();
let tempArr = [] as UsageBarItemPercentage[];

const colors = ref(props.barColors);

const orderedItems = ref<UsageBarItemPercentage[]>([]);

function computeNewItems() {
	let othersCount = 0;
	orderedItems.value = [];
	if (props.items) {
		let total = 0;
		tempArr = [];
		for (let i = 0; i < props.items.length; i++)
			total = total + props.items[i].time;
		
		for (let i = 0; i < props.items.length; i++) {
			let percentage = (props.items[i].time / total) * 100;
			if (percentage <= 5 && percentage >= 0) {
				othersCount++;
				tempArr.push({
					name: props.items[i].name,
					color: props.items[i].color,
					percentage: percentage
				});
			}
			else {
				orderedItems.value.push({
					name: props.items[i].name,
					color: props.items[i].color,
					percentage: percentage,
					width: ""
				});
			}
		}

		orderedItems.value.sort((a: UsageBarItemPercentage, b: UsageBarItemPercentage) => b.percentage - a.percentage);
		if (othersCount > 1) {
			let percentage = 0;
			for (let i = 0; i < tempArr.length; i++)
				percentage = percentage + tempArr[i].percentage;

			orderedItems.value.push({
				name: "Others",
				percentage: percentage,
				width: "",
			});
		}
		else if (othersCount === 1) {
			orderedItems.value.push({
				name: tempArr[0].name,
				color: tempArr[0].color,
				percentage: tempArr[0].percentage,
				width: ""
			});
		}
	}
}

watch(() => props.items, () => {
	computeNewItems();
	if (usagebarParent.value)
		usagebarParent.value.getAnimations()[0].play();
});

function styleAllItems() {
	orderedItems.value.forEach(item => {
		item.width = `${(item.percentage / 100) * (usagebarParent.value?.clientWidth || 0)}px`;
	});
}

const styleItem = (item: UsageBarItemPercentage, index: number): Record<string, string> => {
	let background: string;
	if (item.color)
		background = `rgba(${_color.getColorAsRgb(item.color)})`;
	else {
		item.color = colors.value[index % 20];
		background = colors.value[index % 20];
	}

	if (index === 0) {
		return {
			background: background,
			"border-top-left-radius": "5px",
			"border-bottom-left-radius": "5px"
		};
	}
	else {
		let margin = 0;
		for (let i = 0; i < index; i++)
			margin = margin + orderedItems.value[i].percentage;
		
		if (index === orderedItems.value.length - 1) {
			return {
				background: background,
				"border-top-right-radius": "5px",
				"border-bottom-right-radius": "5px"
			};
		}
		return {
			background: background,
		};
	}
};

const styleChip = (color: string) => {
	let background = `rgba(${_color.getColorAsRgb(color)})`;
	return {
		background: background,
		width: props.fontSize,
		height: props.fontSize,
		"border-radius": props.fontSize
	};
};

let animationTimeout: ReturnType<typeof setInterval> | null = null;

function startWidthChange() {
	animationTimeout = setInterval(() => {
		if (orderedItems.value.length > 0)
			styleAllItems();
	}, 5);
}

function stopWidthChange() {
	if (animationTimeout)
		clearInterval(animationTimeout);
}

onMounted(() => {
	computeNewItems();
});
</script>

<style scoped lang="scss">
.tu-usagebar-parent {
	display: flex;
	margin: unset;
	position: relative;
	animation-name: widthAnim;
	animation-duration: 1.5s;
	animation-fill-mode: both;
}

@keyframes widthAnim {
	0% {
		width: 0%;
	}

	100% {
		width: 100%;
	}
}

.tu-usagebar-children {
	cursor: pointer;
	height: inherit;
	display: block;
	text-align: end;
	padding-right: 5px;
}

.tu-usagebar-text {
	padding-left: 5px;
}

.tu-usagebar-list-item {
	display: inline-flex;
	margin-left: 10px;
	margin-top: 5px;
	align-items: center;
}

.tu-usagebar-dot {
	height: 10px;
	width: 10px;
	border-radius: 50%;
	display: inline-flex;
}

.tu-usagebar-text-parent {
	display: flex;
	margin: 3px;
	justify-content: space-between !important;
}

.tu-usagebar-text-percentage {
	padding-left: 5px;
}

.tu-usagebar-items {
	display: flex;
	flex-wrap: wrap
}
</style>