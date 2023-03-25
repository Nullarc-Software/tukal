<template>
	<div style="display: flex; flex-direction: column;">
		<div class="tu-usagebar-parent" @animationstart="startWidthChange()" @animationend="stopWidthChange()"
			ref="usagebarParent">
			<tu-popper v-for="(item, index) in orderedItems" :key="index" arrow hover placement="top">
				<div class="tu-usagebar-children" :style="{
					...styleItem(item, index),
					width: item.width
				}" />
				<template #content>
					<div style="margin: 10px">
						<div v-if="item.name !== 'Others'">
							<div class="tu-usagebar-text-parent">
								<div class="tu-usagebar-text-title">{{ item.name }}: </div>
								<div class="tu-usagebar-text-percentage">{{ parseFloat(item.percentage).toFixed(2)
								}}</div>
							</div>
						</div>
						<div v-else>
							<div class="tu-usagebar-text-parent" v-for="item in tempArr" :key="index">
								<span class="tu-usagebar-text-title">{{ item.name }}: </span>
								<span class="tu-usagebar-text-percentage">{{ parseFloat(item.percentage).toFixed(2)
								}}</span>
							</div>
						</div>
					</div>
				</template>
			</tu-popper>
		</div>
		<div style="display: flex; flex-wrap: wrap">
			<div v-for="(item, index) in orderedItems" :key="index" :style="styleListItem(item, index)"
				class="tu-usagebar-list">
				<span class="tu-usagebar-dot" :style="styleChip(item.color)"></span>
				<span class="tu-usagebar-text">{{ item.name }}</span>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, PropType, reactive, nextTick } from "vue";
import tuComponent from "../tuComponent";
import { tuPopper, tuPopupMenu, tuPopupItem } from "../tuPopper";
import * as _color from "../../utils";
interface progressBarItem {
	name: String;
	time: number;
	color?: string;
}
export default defineComponent({
	name: "TuProgressBar",
	extends: tuComponent,
	components: {
		tuPopper, tuPopupMenu, tuPopupItem
	},
	props: {
		items: {
			type: Object as PropType<progressBarItem[]>,
			default: []
		},
		number: {
			type: Number,
			default: 0
		}
	},
	setup(props) {
		let orderedItems = reactive([]);
		const usagebarParent = ref<HTMLDivElement>();
		let marginVar = ref(0);

		let tempArr = [];
		let othersCount = ref(0);
		let colors = ["#5e64ff",
			"#28a745",
			"#feef72",
			"#98d85b",
			"#ffa00a",
			"#ff5858",
			"#7cd6fd",
			"#743ee2", "#0000ff", "#003366", "#800000",
			"#800080", "#00ff00", "#20b2aa", "#f08080",
			"#ffc3a0", "#ff6666", "#008000",
			"#660066", "#8b0000", "#794044"]
		if (props.items) {
			for (let i = 0; i < props.items.length; i++) {
				let percentage = (props.items[i].time / props.number) * 100;
				if (percentage <= 5) {
					othersCount.value++;
					tempArr.push({
						name: props.items[i].name,
						color: props.items[i].color,
						percentage: percentage
					})
				}
				else {
					orderedItems.push({
						name: props.items[i].name,
						color: props.items[i].color,
						percentage: percentage,
						width: ""
					})
				}
			}
			if (othersCount.value > 1) {
				let percentage = 0;
				for (let i = 0; i < tempArr.length; i++) {
					percentage = percentage + tempArr[i].percentage
				}
				orderedItems.push({
					name: "Others",
					percentage: percentage,
					width: ""
				})
			}
			else if (othersCount.value === 1) {
				orderedItems.push({
					name: tempArr[0].name,
					color: tempArr[0].color,
					percentage: tempArr[0].percentage,
					width: ""
				})
			}
			orderedItems.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
		}

		function styleAllItems() {
			console.log("hi")
			orderedItems.forEach(item => {
				item.width = `${(item.percentage / 100) * usagebarParent.value?.clientWidth}px`
			});
		}

		const styleItem = (item, index) => {
			let background: string;
			if (item.color) {
				background = `rgba(${_color.getColorAsRgb(item.color)})`
			}
			else {
				item.color = colors[index % 20];
				background: colors[index % 20];
			}
			let width = orderedItems[index].percentage + "%"

			const widthPx = (orderedItems[index].percentage / 100) * usagebarParent.value?.clientWidth;
			//console.log(widthPx);

			if (index === 0) {
				//
				return {
					background: background,
					//		width: `${widthPx}px`,
					"border-top-left-radius": "5px",
					"border-bottom-left-radius": "5px"
				}
			}
			else {
				let margin = 0;
				for (let i = 0; i < index; i++) {
					margin = margin + orderedItems[i].percentage
				}
				if (index === orderedItems.length - 1) {
					return {
						background: background,
						//		width: `${widthPx}px`,
						"border-top-right-radius": "5px",
						"border-bottom-right-radius": "5px"
					}
				}
				return {
					background: background,
					//width: `${widthPx}px`,
				}
			}
		}
		const styleListItem = (item, index) => {
			//let width = (orderedItems[index].percentage + 2) + "%"
			return {
				//width: width,
			}
		}
		const styleChip = (color: string) => {
			let background = `rgba(${_color.getColorAsRgb(color)})`;
			return {
				background: background
			};
		};

		const getWidth = computed(() => usagebarParent.value?.clientWidth)

		onMounted(() => {
			if (usagebarParent.value) {
				watch(() => getWidth.value, () => {
					console.log("hi");
					styleAllItems();
				});
			}

		})

		let animationTimeout = null;

		function startWidthChange() {
			animationTimeout = setInterval(() => {
				styleAllItems();
			}, 10);
		}

		function stopWidthChange() {
			clearInterval(animationTimeout);
		}

		return {
			orderedItems,
			styleItem,
			styleListItem,
			styleChip,
			tempArr,
			usagebarParent,
			startWidthChange,
			stopWidthChange
		}
	}
});
</script>

<style scoped lang="scss">
.tu-usagebar-parent {
	height: 20px;
	display: flex;
	margin: unset;
	position: relative;
	animation-name: widthAnim;
	animation-duration: 1s;
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
	height: 20px !important;

	text-align: end;
	padding-right: 5px;
}

.tu-usagebar-text {
	font-size: 12px;
	padding-left: 5px;
}

.tu-usagebar-list {
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
</style>