<template>
	<transition name="view-upload">
		<div ref="view" class="view-upload" @click="closeView">
			<img :src="src" alt="image" />
		</div>
	</transition>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as utils from "../../utils";

interface Props {
	active?: boolean;
	src?: string;
}

withDefaults(defineProps<Props>(), {
	active: false,
	src: undefined
});

const emit = defineEmits<{
	"close": [];
}>();

const view = ref<HTMLElement>();

onMounted(() => {
	if (view.value) utils.insertBody(view.value);
});

const closeView = (evt: Event) => {
	const target = evt.target as HTMLElement;
	if (target.tagName !== "IMG") emit("close");
};
</script>

<style lang="scss">
.view-upload-enter-active,
.view-upload-leave-active {
	transition: opacity 0.5s;
}
.view-upload-enter,
.view-upload-leave-to {
	opacity: 0;
}
.view-upload-enter img,
.view-upload-leave-to img {
	transform: scale(0.4);
}
.view-upload {
	position: fixed;
	left: 0px;
	z-index: 15000;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	top: 0px;
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		transition: all 0.3s ease;
		border-radius: 10px;
		position: relative;
		display: block;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		max-width: 100%;
		max-height: 100%;
		margin: auto;
		animation: imageRebound 0.7s ease !important;
		box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.25);
		background: #fff;
	}
}
</style>
