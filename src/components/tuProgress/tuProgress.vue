<template>
	<div
		:class="[
			`tu-progress-${color}`,
			{
				indeterminate: indeterminate
			}
		]"
		:style="styleConProgress"
		class="tu-progress--background"
	>
		<div :style="styleProgress" class="tu-progress--foreground" />
		<div
			v-if="indeterminate"
			:style="styleProgress"
			class="tu-progress--indeterminate"
		/>
	</div>
</template>

<script lang="ts">
import { getApplyColor } from "@/utils";
import {
	computed,
	defineComponent,
	onMounted,
	ref,
	watch
} from "vue";
import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuProgress",
	extends: tuComponent,
	props: {
		height: {
			type: [Number, String],
			default: 5
		},
		indeterminate: {
			type: Boolean,
			default: false
		},
		percent: {
			type: Number,
			default: 0
		},
		color: {
			type: String,
			default: "primary"
		}
	},
	setup (props, context) {
		const percentx = ref(0);

		const styleConProgress = computed(() => {
			return {
				background: getApplyColor(props.color, 0.1),
				height: `${props.height}px`
			};
		});

		const styleProgress = computed(() => {
			return {
				background: getApplyColor(props.color),
				width: `${percentx.value}%`
			};
		});

		watch(
			() => props.percent,
			newVal => {
				percentx.value = newVal;
			}
		);

		onMounted(() => {
			setTimeout(() => {
				percentx.value = props.percent;
			}, 600);
		});

		return {
			styleConProgress,
			styleProgress
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";
@import "../../style/sass/_colors";

.tu-progress--indeterminate {
	position: absolute;
	width: 0%;
	height: 100%;
	left: -100%;
	top: 0px;
	border-radius: 2px;
	animation: indeterminate 2.2s ease infinite;
	border-radius: 20px;
}
.tu-progress--background {
	width: 100%;
	border-radius: 18px;
	background-color: rgba(0, 0, 0, 0.06);
	z-index: 50;
	position: relative;
	display: inline-block;
	overflow: hidden;
}
.tu-progress--foreground {
	z-index: 100;
	height: 100%;
	border-radius: 18px;
	transition: all 0.5s ease;
}

@keyframes indeterminate {
	0% {
		width: 30%;
		left: -40%;
	}
	60% {
		left: 100%;
		width: 100%;
	}
	100% {
		left: 100%;
		width: 0%;
	}
}

@each $color, $index in --tu-colors {
	.tu-progress-#{$color} {
		background: -getColor($color, 0.1);
		::v-deep(.tu-progress--foreground, .tu-progress--indeterminate) {
			background: -getColor($color, 1);
		}
	}
}
</style>
