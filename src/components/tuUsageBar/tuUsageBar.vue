<template>
    <div style="display:flex; flex-direction:column;">
        <div class="tu-usagebar-parent">
            <tu-popper fitPopperContainer v-for="(item, index) in orderedItems" :key="index" arrow hover>
                <div class="tu-usagebar-children tooltip" :style="styleItem(item, index)">
                </div>
                <template #content>
                    <tu-popup-menu v-if="item.name !== 'Others'">
                        <tu-popup-item>
                            <div class="tu-usagebar-text-parent">
                                <div class="tu-usagebar-text-title">{{ item.name }}</div>
                                <div class="tu-usagebar-text-percentage">{{ parseFloat(item.percentage).toFixed(2)
                                }}</div>
                            </div>
                        </tu-popup-item>
                    </tu-popup-menu>
                    <tu-popup-menu v-else>
                        <tu-popup-item v-for="item in tempArr" :key="index">
                            <div class="tu-usagebar-text-parent">
                                <span class="tu-usagebar-text-title">{{ item.name }}</span>
                                <span class="tu-usagebar-text-percentage">{{ parseFloat(item.percentage).toFixed(2)
                                }}</span>
                            </div>
                        </tu-popup-item>
                    </tu-popup-menu>
                </template>
            </tu-popper>
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
                    tempArr.value.push({
                        name: props.items[i].name,
                        color: props.items[i].color,
                        percentage: percentage
                    })
                }
                else {
                    orderedItems.value.push({
                        name: props.items[i].name,
                        color: props.items[i].color,
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
                    color: tempArr.value[0].color,
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
                item.color = colors[index % 20];
                background: colors[index % 20];
            }
            let width = orderedItems.value[index].percentage + "%"
            if (index === 0) {
                return {
                    background: background,
                    width: width,
                    "border-top-left-radius": "5px",
                    "border-bottom-left-radius": "5px"
                }
            }
            else {
                let margin = 0;
                for (let i = 0; i < index; i++) {
                    margin = margin + orderedItems.value[i].percentage
                }
                if (index === orderedItems.value.length - 1) {
                    return {
                        background: background,
                        width: width,
                        marginLeft: margin + "%",
                        "border-top-right-radius": "5px",
                        "border-bottom-right-radius": "5px"
                    }
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

<style scoped lang="scss">
.tu-usagebar-parent {
    width: 100%;
    height: 20px;
    border-radius: 10px !important;
    margin: 20px 10px;
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
.tu-usagebar-text-parent {
    display: flex;
    justify-content: space-between !important;
}
</style>