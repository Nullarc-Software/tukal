<template>
    <div style="display: flex;flex-direction:column">
        <div style="display: flex">
            <div class="tu-timeline-text" v-for="interval in intervalTime" :style="shadeIntervals(interval)"
                :class="{ 'tu-timeline-margin-left': interval.text === '2am' }">{{ interval.text }}</div>
        </div>
        <div class="tu-timeline-parent">
            <div class="tu-timeline-box" :id="`tu-timeline-box-${index}`" v-for="index in 12" :key="index" />
        </div>
        <div class="tu-timeline-current-time" :style="{ marginLeft: marginLeftCurrentTime + '%' }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import * as _color from "../../utils";;

export default defineComponent({
    props: {
        intervalStartTime: {  //intervalStartTime prop: start time from where to be shaded in the timeline
            type: Number,
            default: 8
        },
        intervalEndTime: {  //intervalEndTime prop: end tim etill where to be shaded in the timeline
            type: Number,
            default: 18
        },
        interval: {  //interval prop: the interval with which the productivity or unproductivity to be displayed ex. for each 5min .
            type: Number,
            default: 5
        },
        intervals: {  //intervals prop: periods of productive and unproductive time 
            type: Array<number>,
            default: []
        }
    },
    setup(props) {
        let intervalTime = [
            {
                text: "2am",
                utc: 2
            },
            {
                text: "4am",
                utc: 4
            },
            {
                text: "6am",
                utc: 6
            },
            {
                text: "8am",
                utc: 8
            },
            {
                text: "10am",
                utc: 10
            },
            {
                text: "12pm",
                utc: 12
            },
            {
                text: "2pm",
                utc: 14
            },
            {
                text: "4pm",
                utc: 16
            },
            {
                text: "6pm",
                utc: 18
            },
            {
                text: "8pm",
                utc: 20
            },
            {
                text: "10pm",
                utc: 22
            },
        ]
        let latestProductiveBox = ref(0)
        let marginLeftCurrentTime = ref(0);
        let lasProductiveTimeCount = ref(0);
        let calculateMarginLeftCurrentTime = () => {
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            let timeInMinutes = hours * 60 + minutes;
            marginLeftCurrentTime.value = (timeInMinutes / 1440) * 100;
        }
        let incrementMarginLeftCurrentTime = () => {
            marginLeftCurrentTime.value = marginLeftCurrentTime.value + (1 / 1440)
        }
        function between(x: number, min: number, max: number) {
            return x >= min && x <= max;
        }
        let shadeIntervals = (interval) => {
            if (interval.utc + 1 === props.intervalEndTime) {
                return {
                    background: "linear-gradient(to right, #D3D3D3 50%, white 50%)",
                }
            }
            if (between(interval.utc, props.intervalStartTime, props.intervalEndTime) && props.intervalEndTime !== interval.utc) {
                return {
                    background: '#D3D3D3'
                }
            }
            if (interval.utc + 1 === props.intervalStartTime) {
                return {
                    background: "linear-gradient(to left, #D3D3D3 50%, white 50%)",
                }
            }
        }
        let calculateCurrentBoxNum = (i: number) => {
            let percentage = (((props.interval * i) + props.interval) / 1440) * 100;
            let boxNum = Math.ceil(percentage / (100 / 12));
            return boxNum
        }
        let createNewProductiveBox = (i: number, bool?: boolean) => {
            let boxNum = calculateCurrentBoxNum(i);
            let currentBox = document.getElementById(`tu-timeline-box-${boxNum}`);
            let newProductiveBox = document.createElement("div");
            if (bool || i === 0) {
                newProductiveBox.style.marginLeft = 0 + "%"
            }
            else {
                let marginLeft = (((props.interval * lasProductiveTimeCount.value)) / 120) * 100
                newProductiveBox.style.marginLeft = marginLeft + "%"
            }
            newProductiveBox.style.width = ((props.interval / 120) * 100) + "%";
            newProductiveBox.style.marginTop = "15%"
            newProductiveBox.style.height = "80px"
            newProductiveBox.style.background = "green"
            newProductiveBox.id = `tu-productive-box-${i}`;
            latestProductiveBox.value = i
            currentBox.appendChild(newProductiveBox);
        }
        let addProductiveBox = (i = props.intervals.length - 1) => {
            let boxNum = calculateCurrentBoxNum(i);
            let prevBox = calculateCurrentBoxNum(i - 1);
            if (boxNum > prevBox) {
                lasProductiveTimeCount.value = 0;
            }
            if (props.intervals[i] === 1) {
                if (props.intervals[i - 1] === 1) {
                    if (boxNum > prevBox) {
                        createNewProductiveBox(i, true)
                    }
                    else {
                        let oldProductiveBox = document.getElementById(`tu-productive-box-${latestProductiveBox.value}`);
                        let str = oldProductiveBox.style.width
                        const mynum = Number(str.substring(0, str.length - 1));
                        oldProductiveBox.style.width = (mynum + ((props.interval / 120) * 100)) + "%"
                    }
                }
                else {
                    createNewProductiveBox(i)
                }
                lasProductiveTimeCount.value = 0;
            }
            else {
                lasProductiveTimeCount.value++
            }
        }
        let addProductiveBoxes = () => {
            if (props.intervals.length > 0) {
                for (let i = 0; i < props.intervals.length; i++) {
                    addProductiveBox(i)
                }
            }
        }
        watch(() => props.intervals, (newValue, oldValue) => {
            addProductiveBox()
        }, { deep: true });

        onMounted(() => {
            calculateMarginLeftCurrentTime()
            addProductiveBoxes()
            setInterval(incrementMarginLeftCurrentTime, 60000);
        })
        return { intervalTime, marginLeftCurrentTime, shadeIntervals }
    },
})
</script>

<style lang="scss">
.tu-timeline-parent {
    display: flex;
}

.tu-timeline-box {
    width: calc(100% / 12);
    height: 100px;
    border: 0.1px solid gray;
    display: flex;
}

.tu-timeline-text {
    width: calc(100% / 12);
    padding-bottom: 2px;
    padding-top: 2px;
    padding-left: 5px;
}

.tu-timeline-margin-left {
    margin-left: calc(100%/12);
}

.tu-timeline-current-time {
    border-left: 3px dotted blue;
    height: 150px;
    margin-top: -120px;
}
</style>
