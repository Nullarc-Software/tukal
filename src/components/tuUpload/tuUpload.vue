<template>
	<div class="con-upload">
		<view-upload v-if="viewActive" :src="viewSrc" />

		<div class="con-img-upload">
			<!-- <transition-group v-for="(img,index) in getFilesFilter" :key="index" name="upload"> -->
			<div
				v-for="(img, index) in getFilesFilter"
				:class="{
					fileError: img.error,
					removeItem: itemRemove.includes(index)
				}"
				:key="index"
				class="img-upload"
			>
				<button
					class="btn-x-file"
					type="button"
					@click="removeFile(index)"
				>
					<i translate="no" class="material-icons notranslate">
						clear
					</i>
				</button>
				<button
					v-if="showUploadButton"
					:class="{
						'on-progress': img.percent,
						'ready-progress': img.percent >= 100
					}"
					:style="{
						height: `${img.percent}%`
					}"
					class="btn-upload-file"
					@click="upload(index)"
				>
					<i translate="no" class="material-icons notranslate">
						{{
							img.percent >= 100
								? img.error
									? "report_problem"
									: "cloud_done"
								: "cloud_upload"
						}}
					</i>
					<span>{{ img.percent }} %</span>
				</button>
				<img
					v-if="img.src"
					:style="{
						maxWidth: img.orientation == 'h' ? '100%' : 'none',
						maxHeight: img.orientation == 'w' ? '100%' : 'none'
					}"
					:key="index"
					:src="img.src"
					@touchend="viewImage(img.src, $event)"
					@click="viewImage(img.src, $event)"
				/>
				<h4 v-if="!img.src" class="text-archive">
					<i translate="no" class="material-icons notranslate">
						description
					</i>
					<span>
						{{ img.name }}
					</span>
				</h4>
			</div>
			<!-- </transition-group > -->

			<div
				:class="{
					'on-progress-all-upload': percent != 0,
					'is-ready-all-upload': percent >= 100,
					'disabled-upload':
						$attrs.hasOwnProperty('disabled') || limit
							? srcs.length - itemRemove.length >= Number(limit)
							: false
				}"
				class="con-input-upload"
			>
				<input
					ref="fileInput"
					v-bind="$attrs"
					:disabled="
						$attrs.disabled || limit
							? srcs.length - itemRemove.length >= Number(limit)
							: false
					"
					type="file"
					@change="getFiles"
				/>
				<span class="text-input">
					{{ text }}
				</span>
				<span
					:style="{
						width: `${percent}%`
					}"
					class="input-progress"
				>
				</span>
				<button
					v-if="showUploadButton"
					:disabled="filesx.length == 0"
					type="button"
					title="Upload"
					class="btn-upload-all vs-upload--button-upload"
					@click="upload('all')"
				>
					<i translate="no" class="material-icons notranslate">
						cloud_upload
					</i>
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import tuComponent from "../tuComponent";
import viewUpload from "./tuViewUpload.vue";
export default defineComponent({
	name: "TuUpload",
	extends: tuComponent,
	components: {
		viewUpload
	},
	props: {
		fileName: {
			default: null,
			type: String
		},
		text: {
			default: "Upload File",
			type: String
		},
		textMax: {
			default: "Maximum of files reached",
			type: String
		},
		limit: {
			default: null,
			type: [Number, String]
		},
		action: {
			default: null,
			type: String
		},
		headers: {
			default: null,
			type: Object
		},
		data: {
			default: null,
			type: Object
		},
		automatic: {
			default: false,
			type: Boolean
		},
		showUploadButton: {
			default: true,
			type: Boolean
		},
		singleUpload: {
			default: false,
			type: Boolean
		}
	},
	setup (props, context) {
		const viewActive = ref(false);
		const viewSrc = ref(null);
		const srcs = ref([]);
		const filesx = ref([]);
		const percent = ref(0);
		const itemRemove = ref([]);
		const fileInput = ref<HTMLInputElement>();
		let lastTap = 0;

		const getFilesFilter = computed(() => {
			const files = srcs.value.filter((item) => {
				return !item.remove;
			});
			return files;
		});

		const postFiles = computed(() => {
			let postFiles = Array.prototype.slice.call(filesx.value);
			postFiles = postFiles.filter((item) => {
				return (
					!Object.prototype.hasOwnProperty.call(item, "remove") &&
					!Object.prototype.hasOwnProperty.call(item, "success")
				);
			});
			return postFiles.length;
		});

		const viewImage = function (src, evt) {
			let timeout;
			const eventx =
				"ontouchstart" in window ||
				(window.Touch && document instanceof window.Touch)
					? "touchstart"
					: "click";
			if (eventx === "click") {
				viewActive.value = true;
				viewSrc.value = src;
			}
			else {
				if (evt.type === "touchend") {
					const currentTime = new Date().getTime();
					const tapLength = currentTime - lastTap;
					clearTimeout(timeout);
					if (tapLength < 500 && tapLength > 0) {
						viewActive.value = true;
						viewSrc.value = src;
						event.preventDefault();
					}
					lastTap = currentTime;
				}
			}
		};

		const removeFile = function (index) {
			itemRemove.value.push(index);
			context.emit("on-delete", filesx.value[index]);
			setTimeout(() => {
				filesx.value[index].remove = true;
			}, 301);
		};

		const getFiles = (e) => {
			context.emit("update:vsFile", e.target.value);
			const _this = this;
			function uploadImage (e) {
				let orientation = "h";
				const image = new Image();
				image.src = e.target.result;
				image.onload = function () {
					if (image.width > image.height) orientation = "w";

					switchImage(image, orientation);
				};
			}
			function switchImage (image, orientation) {
				srcs.value.push({
					src: image.src,
					orientation: orientation,

					percent: null,
					error: false,
					remove: null
				});
			}

			const files = e.target.files;
			let count = srcs.value.length - itemRemove.value.length;
			for (const file in files) {
				if (Object.prototype.hasOwnProperty.call(files, file)) {
					if (props.limit) {
						count++;
						if (count > Number(props.limit)) break;
					}
					const reader = new FileReader();
					const filex = files[file];
					if (/image.*/.test(filex.type)) {
						filesx.value.push(filex);
						reader.onload = uploadImage;
						reader.readAsDataURL(filex);
					}
					else if (/video.*/.test(filex.type)) {
						filesx.value.push(filex);
						srcs.value.push({
							src: null,
							name: filex.name,
							type: "video",
							percent: null,
							error: false,
							remove: null
						});
					}
					else {
						filesx.value.push(filex);
						srcs.value.push({
							src: null,
							name: filex.name,
							percent: null,
							error: false,
							remove: null
						});
					}
					context.emit("change", e.target.value, filesx.value);
				}
			}
			const input = fileInput.value;
			input.type = "text";
			input.type = "file";
			if (props.automatic) upload("all");
		};

		const upload = function (index) {
			const formData = new FormData();
			let postFiles = Array.prototype.slice.call(filesx.value);
			if (typeof index === "number") postFiles = [postFiles[index]];
			else if (index === "all") {
				postFiles = postFiles.filter((item) => {
					return (
						!Object.prototype.hasOwnProperty.call(item, "remove") &&
						!Object.prototype.hasOwnProperty.call(item, "success")
					);
				});
			}
			const data = props.data || {};
			for (const key in data) formData.append(key, data[key]);

			if (props.singleUpload) {
				postFiles.forEach((filex) => {
					const formData = new FormData();
					for (const key in data) formData.append(key, data[key]);

					formData.append(props.fileName, filex, filex.name);
					uploadx(index, formData);
				});
			}
			else {
				postFiles.forEach((filex) => {
					formData.append(props.fileName, filex, filex.name);
				});
				uploadx(index, formData);
			}
		};

		const uploadx = (index, formData) => {
			const self = this;
			const xhr = new XMLHttpRequest();
			xhr.onerror = function error (e) {
				context.emit("on-error", e);
				if (typeof index === "number") srcs.value[index].error = true;
			};
			xhr.onload = function onload (e) {
				if (xhr.status < 200 || xhr.status >= 300) {
					context.emit("on-error", e);
					if (typeof index === "number")
						srcs.value[index].error = true;
				}
				else {
					filesx.value.forEach(function (loaded) {
						loaded.success = true;
					});
					context.emit("on-success", e);
				}
			};
			if (xhr.upload) {
				xhr.upload.onprogress = function progress (e) {
					if (e.total > 0) {
						let percent = (e.loaded / e.total) * 100;
						if (typeof index === "number")
							srcs.value[index].percent = Math.trunc(percent);
						else percent = Math.trunc(percent);
					}
				};
			}
			xhr.withCredentials = true;
			xhr.open("POST", props.action, true);
			const headers = props.headers || {};
			for (const head in headers) {
				if (
					Object.prototype.hasOwnProperty.call(headers, head) &&
					headers[head] !== null
				)
					xhr.setRequestHeader(head, headers[head]);
			}
			xhr.send(formData);
		};

		watch(percent, () => {
			if (percent.value >= 100) {
				srcs.value.forEach((file) => {
					file.percent = 100;
				});
				setTimeout(() => {
					percent.value = 0;
				}, 1000);
			}
		});

		return {
			viewSrc,
			viewActive,
			srcs,
			filesx,
			fileInput,
			uploadx,
			upload,
			percent,
			itemRemove,
			getFiles,
			getFilesFilter,
			removeFile,
			viewImage
		};
	}
});
</script>

<style></style>
<style lang="scss">
@import "../../style/sass/_mixins";
.con-upload {
	width: 100%;
	position: relative;
}
.con-input-upload {
	background: #f5f5f5;
	width: 200px;
	height: 200px;
	box-sizing: border-box;
	border-radius: 8px;
	position: relative;
	transition: all 0.25s ease;
	border: 1px dashed rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 15px;
	&:hover {
		border: 1px dashed rgba(-getColor(primary), 0.5);
	}
	&.disabled-upload {
		opacity: 0;
		pointer-events: none;
		user-select: none;
		display: none;
	}
	input {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		left: 0px;
		top: 0px;
		cursor: pointer;
	}
	.text-input {
		min-width: 200px;
		display: block;
		text-align: center;
		margin: 0px !important;
		padding: 0px !important;
		width: 100%;
		font-weight: bold;
	}
	.input-progress {
		height: 100%;
		position: absolute;
		display: block;
		left: 0px;
		top: 0px;
		width: 29%;
		background: -getColor("primary");
		border-radius: 10px;
	}
	&.on-progress-all-upload {
		width: 100%;
		height: 4px;
		overflow: hidden;
		padding: 0px;
		border: 0px solid rgba(0, 0, 0, 0);
	}
	&.is-ready-all-upload {
		.input-progress {
			background: -getColor(success, 1) !important;
		}
	}
}
.con-input-upload.on-progress-all-upload .text-input,
.con-input-upload.on-progress-all-upload .vs-upload--button-upload {
	opacity: 0;
	transform: translate(-40px);
}
.vs-upload--button-upload {
	position: absolute;
	border: 0px;
	padding: 4px;
	border-radius: 0px 0px 5px 5px;
	padding-left: 6px;
	padding-right: 6px;
	font-size: 0.8rem;
	z-index: 500;
	cursor: pointer;
	margin: 0px;
	color: -getColor("primary");
	transition: all 0.2s ease;
	box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.05);
	background: rgba(0, 0, 0, 0.03);
	bottom: 0px;
	width: 100%;
	&:disabled {
		opacity: 0.4;
		pointer-events: none;
	}
	&:hover {
		padding-bottom: 10px;
		padding-top: 10px;
		background: -getColor("primary");
		color: #fff;
	}
}
.con-img-upload {
	width: 100%;
	background: #fff;
	position: relative;
	border-radius: 10px;
	margin-top: 5px;
	padding-right: 5px;
	box-sizing: border-box;
	column-gap: 5px;
	overflow: hidden;
	.img-upload {
		backface-visibility: hidden;
		overflow: hidden;
		border-radius: 10px;
		background: rgba(0, 80, 0, 0.5);
		background: #fff;
		box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 200px;
		height: 200px;
		margin: 5px;
		position: relative;
		cursor: pointer;
		&.fileError {
			border: 1px solid rgba(-getColor("danger"), 0.2);
			box-shadow: 0px 5px 20px 0px rgba(-getColor("danger"), 0.2);
			.btn-upload-file {
				background: rgba(-getColor("danger"), 0.3) !important;
				i {
					background: -getColor("danger") !important;
				}
			}
		}
		&.removeItem {
			transition: all 0.3s ease, height 0.2s ease 0.2s;
			opacity: 0 !important;
			width: 0px !important;
			visibility: hidden;
			margin: 0px !important;
			height: 0px !important;
		}
		img {
			transition: all 0.3s ease;
		}
		&:hover {
			transform: scale(0.99);
			box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
			.btn-x-file {
				opacity: 1;
				transform: translate(0%, 0%);
			}
			.btn-upload-file {
				opacity: 1;
				transform: translate(-50%, 65%);
			}
		}
		.btn-x-file {
			display: block;
			position: absolute;
			top: 5px;
			padding: 0px;
			margin: 0px;
			transform: translate(20%, -20%);
			background: transparent;
			z-index: 300;
			opacity: 0;
			border: 0px;
			cursor: pointer;
			transition: all 0.2s ease;
			border-radius: 10px;
			i {
				transition: all 0.2s ease;
				position: relative;
				padding: 4px;
				font-size: 1.4rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 5px;
				background: rgba(0, 0, 0, 0.1);
				color: #fff;
				text-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
			}
			&:hover {
				i {
					border-radius: 50%;
					background: -getColor("danger");
				}
				& ~ .btn-upload-file {
					&:not(.on-progress) {
						background: radial-gradient(
							ellipse at center,
							-getColor(danger, 1) 0%,
							rgba(0, 0, 0, 0) 70%
						);
						height: 300px;
						i {
							opacity: 0;
						}
					}
					&:not(.on-progress):after {
						border: 1px solid -getColor("danger");
					}
				}
				& ~ .on-progress {
					background: rgba(-getColor(danger), 0.2);
					i {
						opacity: 0;
					}
				}
				& ~ img {
					filter: grayscale(80%);
				}
			}
		}
		.text-archive {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			text-align: center;
			padding: 5px;
			i {
				position: absolute;
				font-size: 7rem;
				opacity: 0.05;
			}
			span {
				position: relative;
				padding: 5px;
			}
		}
		.btn-upload-file {
			margin: 0px;
			opacity: 0;
			position: absolute;
			bottom: 0px;
			left: 50%;
			z-index: 200;
			border-radius: 50%;
			width: 300px;
			height: 200px;
			transform: translate(-50%, 80%);
			border: 0px;
			background: radial-gradient(
				ellipse at center,
				-getColor(success, 1) 0%,
				rgba(0, 0, 0, 0) 70%
			);
			cursor: pointer;
			transition: all 0.3s ease;
			animation: upload-imageRebound 0.7s ease !important;
			&:after {
				content: "";
				width: 200px;
				height: 200px;
				position: absolute;
				z-index: 100;
				display: block;
				left: 50%;
				transform: translate(-50%, -50%);
				top: 50%;
				border-radius: 50%;
				border: 1px solid -getColor(success, 1);
				animation: upload-circle 1.5s ease infinite;
			}
			&:not(.on-progress):hover {
				width: 200px;
				height: 200px;
				transform: translate(-50%, 70%);
				i {
					font-size: 1.4rem;
					background: -getColor(success, 1);
					top: 6%;
					padding: 10px;
				}
			}
			i {
				z-index: 50;
				border-radius: 50%;
				transition: all 0.2s ease;
				position: absolute;
				left: 50%;
				top: 12%;
				transform: translate(-50%);
				color: #fff;
				text-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
				padding: 20px;
				backface-visibility: visible;
			}
			span {
				opacity: 0;
				z-index: 300;
			}
			&.on-progress {
				width: 100%;
				height: 20px;
				background: rgba(-getColor(success), 0.3);
				border-top: 1px solid -getColor(success, 1);
				bottom: 0px;
				transform: translate(0);
				left: 0px;
				opacity: 1 !important;
				overflow: hidden;
				border-radius: 0px;
				pointer-events: none;
				i {
					opacity: 0.2;
					background: -getColor(success, 1);
					box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.15);
					top: 50%;
					transform: translate(-50%, -50%) scale(1.2);
					padding: 20px;
				}
				span {
					transition: all 0.5s ease;
					opacity: 1;
					color: #fff;
					font-size: 1rem;
					position: absolute;
					top: calc(50% + 40px);
					left: 0px;
					text-align: center;
					width: 100%;
					text-shadow: 0px 3px 15px -getColor(success, 1);
					font-weight: bold;
					z-index: 300;
					display: block;
					transform: translate(0, -50%);
				}
			}
			&.ready-progress {
				border-top: 0px solid -getColor(success, 1);
				background: rgba(-getColor(success), 0.5);
				span {
					z-index: 10;
					transform: translate(0, -50%) scale(0.5);
					top: calc(50% + 20px);
					opacity: 0;
				}
				&:after {
					opacity: 0;
				}
				i {
					opacity: 1;
					background: -getColor(success, 1);
					box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.15);
					top: 50%;
					transform: translate(-50%, -50%) scale(1);
					padding: 10px;
				}
			}
		}
	}
}
.upload-enter-active {
	transition: all 0.7s ease !important;
	animation: imageRebound 0.7s ease !important;
}
</style>
<style lang="scss">
@keyframes upload-imageRebound {
	0% {
		transform: scale(0.4);
		border-radius: 30%;
		pointer-events: none;
	}
	40% {
		transform: scale(1.03);
		border-radius: 14px;
		pointer-events: none;
	}
	70% {
		transform: scale(0.98);
		border-radius: 18px;
		pointer-events: none;
	}
	100% {
		transform: scale(1);
		border-radius: 10px;
		pointer-events: none;
	}
}

@keyframes upload-circle {
	0% {
		width: 0px height 0px;
	}
	100% {
		width: 230px height 230px opacity 0;
	}
}
</style>
