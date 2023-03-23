<template>
    <div style="display:block;">
        <div class="tu-usagebar-parent">
            <div v-for="(item, index) in orderedItems" :key="index" class="tu-usagebar-children tooltip"
                :style="styleItem(item, index)"><span v-if="item.name === 'Others'" class="tooltiptext">
                <div v-for="item in tempArr" :key="item" >{{ item.name  }}</div>
                </span></div>
        </div>
        <div v-for="(item, index) in orderedItems" :key="index" :style="styleListItem(item, index)"
            class="tu-usagebar-list">
            <span class="tu-usagebar-dot" :style="styleChip(item.color)"></span>
            <span class="tu-usagebar-text">{{ item.name }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, PropType } from "vue";
import tuComponent from "../tuComponent";
import * as _color from "../../utils";
interface progressBarItem {
    name: String;
    time: number;
    color?: string;
}
export default {
    name: "TuProgressBar",
    extends: tuComponent,
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
        let orderedItems = ref([]);
        let marginVar = ref(0);
        let tempArr = ref([]);
        let othersCount = ref(0);
        if (props.items) {
            for (let i = 0; i < props.items.length; i++) {
                let percentage = (props.items[i].time / props.number) * 100;
                if (percentage <= 5) {
                    othersCount.value++;
                    tempArr.value.push({
                        name: props.items[i].name,
                        percentage: percentage
                    })
                }
                else {
                    orderedItems.value.push({
                        name: props.items[i].name,
                        percentage: percentage
                    })
                }
            }
            if (othersCount.value > 1) {
                let percentage = 0;
                for (let i = 0; i < tempArr.value.length; i++) {
                    percentage = percentage + tempArr.value[i].percentage
                }
                orderedItems.value.push({
                    name: "Others",
                    percentage: percentage
                })
            }
            else if (othersCount.value === 1) {
                orderedItems.value.push({
                    name: tempArr.value[0].name,
                    percentage: tempArr.value[0].percentage
                })
            }
            orderedItems.value.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
        }
        const styleItem = (item, index) => {
            let background: string;
            if (item.color) {
                background = `rgba(${_color.getColorAsRgb(item.color)})`
            }
            else {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                background = "#" + randomColor
                item.color = background
            }
            let width = orderedItems.value[index].percentage + "%"
            if (index === 0) {
                return {
                    background: background,
                    width: width,
                }
            }
            else {
                let margin = 0;
                for (let i = 0; i < index; i++) {
                    margin = margin + orderedItems.value[i].percentage
                }
                return {
                    background: background,
                    width: width,
                    marginLeft: margin + "%"
                }
            }
        }
        const styleListItem = (item, index) => {
            let width = (orderedItems.value[index].percentage + 2) + "%"
            return {
                width: width,
            }
        }
        const styleChip = (color: string) => {
            let background = `rgba(${_color.getColorAsRgb(color)})`;
            return {
                background: background
            };
        };
        return { orderedItems, styleItem, styleListItem, styleChip, tempArr }
    },
}
</script>

<style scoped>
.tu-usagebar-parent {
    width: 100%;
    height: 20px;
    border-radius: 5px;
    margin: 20px 10px;
    border: 1px solid white;
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
    height: 100%;
    display: block;
    width: 40%;
    line-height: 20px;
    position: absolute;
    text-align: end;
    padding-right: 5px;
}

.tu-usagebar-text {
    font-size: 12px;
    padding-left: 5px;
}

.tu-usagebar-list {
    display: inline-block;
    margin-left: 10px;
}

.tu-usagebar-dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
}
.tooltip .tooltiptext {
    visibility: hidden;
    width: 80px;
    height: 80px;
    overflow: auto;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 85%;
    margin-left: -60px;
    font-size: 12px;
    transition: 2s ease-in;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}

.tooltiptext::-webkit-scrollbar {
		display: none;
	}

.tooltiptext::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

.tooltip:hover .tooltiptext {
    visibility: visible !important;
}
</style>