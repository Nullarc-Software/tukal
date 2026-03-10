<template>
	<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
		<div v-if="active" ref="alert" :class="[
			`con-tu-alert-${color}`,
			{
				'con-icon': icon
			}
		]" :style="styleAlert" class="con-tu-alert" v-bind="$attrs">
			<div v-if="closable" class="con-x tu-alert--close" @click="emit('update:active', false)">
				<tu-icon :icon-pack="iconPack" :icon="closeIcon"></tu-icon>
			</div>

			<h4 v-if="title" :style="styleTitle" class="titlex tu-alert--title" v-text="title"></h4>

			<div :class="{ 'con-icon': icon }" class="tu-alert">
				<tu-icon v-if="icon" :icon-pack="iconPack" :icon="icon" class="icon-alert"></tu-icon>
				<slot />
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import { getColor, setColor } from "../../utils";
import { TuIcon } from "../tuIcon";

defineOptions({
	name: "TuAlert"
});

interface Props {
	active?: boolean | string;
	title?: string | null;
	closable?: boolean;
	color?: string;
	margin?: string | boolean;
	icon?: string | null;
	closeIcon?: string;
	iconPack?: string;
}

const props = withDefaults(defineProps<Props>(), {
	active: true,
	title: null,
	closable: false,
	color: "primary",
	margin: "10px",
	icon: null,
	closeIcon: "close",
	iconPack: "material-icons"
});

const emit = defineEmits<{
	"update:active": [value: boolean];
}>();

const alert = ref<HTMLDivElement>();

const styleAlert = computed(() => {
	return {
		background: getColor(props.color, 0.15),
		boxShadow: `0px 0px 25px 0px ${getColor(
			props.color,
			0.15
		)}`,
		color: getColor(props.color, 1)
	};
});

const styleTitle = computed(() => {
	return {
		boxShadow: `0px 6px 15px -7px ${getColor(
			props.color,
			0.4
		)}`
	};
});

const beforeEnter = (el: Element) => {
	const element = el as HTMLElement;
	element.style.height = "0";
	element.style.opacity = "0";
};

const enter = (el: Element, done: () => void) => {
	const h = alert.value?.scrollHeight;
	if (alert.value && h)
		alert.value.style.height = h + "px";
	const element = el as HTMLElement;
	element.style.opacity = "1";
	done();
};

const leave = (el: Element) => {
	const element = el as HTMLElement;
	element.style.height = "0px";
	element.style.opacity = "0";
};

onMounted(() => {
	if (alert.value) {
		nextTick(() => {
			const h = alert.value?.scrollHeight;
			if (alert.value && h)
				alert.value.style.height = h + "px";
		});
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_functions";
@import "../../style/sass/_colors";

.con-tu-alert {
	border-radius: 6px;
	color: #fff;
	width: 100%;
	position: relative;
	font-size: 0.8rem;
	cursor: default;
	transition: all 0.25s ease;
	overflow: hidden;
}

.icon-alert {
	height: 100%;
	position: absolute;
	padding: 10px;
	top: 0px;
	font-size: 1.1rem;
	display: flex;
	align-items: center;
}

.tu-alert {
	padding: 10px;
	overflow: hidden;
	position: relative;
}

.tu-alert--title {
	font-size: 0.9rem;
	font-weight: bold;
	padding: 8px 10px;
}

.tu-alert--close {
	position: relative;
	margin-top: 4px;
	display: inline-block;
	padding: 4px;
	border-radius: 6px;
	padding-bottom: 1px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
	}
}

@each $color in --tu-colors {
	.con-tu-alert-#{$color} {
		background: getColorAlpha($color, 0.15);
		box-shadow: 0px 0px 25px 0px getColorAlpha($color, 0.15);
		color: getColor($color);

		h4 {
			box-shadow: 0px 6px 15px -7px getColorAlpha($color, 0.4);
		}

		.con-x {
			background: getColor($color);
			color: rgb(255, 255, 255);
		}
	}
}
</style>

