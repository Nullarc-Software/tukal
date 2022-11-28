<template>
	<transition name="view-upload">
		<div ref="view" class="view-upload" @click="closeView">
			<img :src="src" alt="image" />
		</div>
	</transition>
</template>
<script lang="ts">
import * as utils from "../../utils";
export default {
	name: "ViewUpload",
	props: {
		active: {
			default: false,
			type: Boolean
		},
		src: {
			default: null,
			type: String
		}
	},
	mounted () {
		utils.insertBody(this.$refs.view);
	},
	upload () {
		utils.insertBody(this.$refs.view);
	},
	methods: {
		closeView (evt) {
			if (evt.target.tagName !== "IMG") this.$parent.viewActive = false;
		}
	}
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
