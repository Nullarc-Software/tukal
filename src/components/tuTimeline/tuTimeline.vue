<template>
    <div style="display: flex;flex-direction:column">
        <div style="display: flex">
            <div class="tu-timeline-text" v-for="text in intervals" :class="{ 'tu-timeline-margin-left': text === '2am' }">{{ text }}</div>
        </div>
        <div class="tu-timeline-parent">
            <div class="tu-timeline-current-time" :style="styleCurrentTime" ></div>
            <div class="tu-timeline-box" v-for="index in 12" :key="index" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        interval: {
            
        }
    },
    setup() {
        let intervals = ["2am", "4am", "6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"]
        let styleCurrentTime = () => {
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();
            let timeInMinutes = hours * 60 + minutes;
            let percentage = (timeInMinutes / 24 * 60) * 100;
            return {
                "margin-left": percentage + "%"
            }
        }
        return { intervals, styleCurrentTime }
    },
})
</script>

<style>
.tu-timeline-parent {
    display: flex;
}

.tu-timeline-box {
    width: calc(100% / 12);
    height: 100px;
    border: 0.1px solid gray;
}

.tu-timeline-text {
    width: calc(100% / 12);
    margin-bottom: 5px;
}

.tu-timeline-margin-left {
    margin-left: calc(100%/12);
}

.tu-timeline-current-time {
    border-left: 3px dotted green;
    height: 150px;
    margin-top: -20px;
}
</style>
