<template>
	<transition name="tu-dialog">
		<div v-if="modelValue" :class="[
			'tu-dialog-content',
			{
				blur: blur,
				fullScreen: fullScreen
			}
		]" ref="dialog-content" @click="click">
			<div class="tu-dialog" :style="dialogStyle" :class="{
	'tu-dialog--fullScreen': fullScreen,
	'tu-dialog--rebound': rebound,
	'tu-dialog--notPadding': notPadding,
	'tu-dialog--square': square,
	'tu-dialog--autoWidth': autoWidth,
	'tu-dialog--scroll': scroll,
	'tu-dialog--loading': loading,
	'tu-dialog--notCenter': notCenter
}">
				<div v-if="loading" class="tu-dialog__loading">
					<div class="tu-dialog__loading__load"></div>
				</div>
				<tu-button v-if="!notClose" color="#1e2023" class="tu-dialog__close" @click="closeClick">
					<tu-icon>close </tu-icon>
				</tu-button>
				<header v-if="$slots.header" class="tu-dialog__header">
					<slot name="header" />
				</header>
				<div v-if="$slots.default" :class="[
					'tu-dialog__content',
					{ notFooter: !$slots.footer }
				]">
					<slot />
				</div>
				<footer v-if="$slots.footer" class="tu-dialog__footer" :class="footerClasses">
					<slot name="footer" />
				</footer>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { ref, watch, inject, computed } from "vue";
import { Router } from "vue-router";
import tuButton from "../tuButton/tuButton.vue";
import tuIcon from "../tuIcon/tuIcon.vue";

defineOptions({
	name: "TuDialog"
});

interface Props {
	modelValue?: boolean;
	loading?: boolean;
	fullScreen?: boolean;
	notClose?: boolean;
	preventClose?: boolean;
	notPadding?: boolean;
	overflowHidden?: boolean;
	blur?: boolean;
	square?: boolean;
	autoWidth?: boolean;
	scroll?: boolean;
	notCenter?: boolean;
	routerClose?: boolean;
	width?: string | null;
	footerClasses?: Record<string, unknown> | null;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	loading: false,
	fullScreen: false,
	notClose: false,
	preventClose: false,
	notPadding: false,
	overflowHidden: false,
	blur: false,
	square: false,
	autoWidth: false,
	scroll: false,
	notCenter: false,
	routerClose: false,
	width: null,
	footerClasses: null,
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
	close: [];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const rebound = ref(false);

const dialogStyle = computed(() => ({
	width: props.width || undefined
}));

const esc = function (evt: KeyboardEvent) {
	if (evt.which === 27 && !props.preventClose) {
		emit("update:modelValue", false);
		emit("close");
	}
};

const addEsc = function () {
	window.addEventListener("keydown", esc);
};

const insertDialog = function () {
	addEsc();
};

watch(
	() => props.modelValue,
	(newVal) => {
		if (newVal) {
			insertDialog();
			if (props.overflowHidden)
				document.body.style.overflow = "hidden";
		}
		else {
			if (props.overflowHidden) {
				document.body.style.overflow = "";
				window.removeEventListener("keydown", esc);
			}
		}
	}
);

const click = function (evt: MouseEvent) {
	if (!(evt.target as Element).closest(".tu-dialog") && !props.preventClose) {
		emit("update:modelValue", !props.modelValue);
		emit("close");
	}

	if (props.preventClose && !(evt.target as Element).closest(".tu-dialog")) {
		rebound.value = true;
		setTimeout(() => {
			rebound.value = false;
		}, 300);
	}
};

const closeClick = function () {
	emit("update:modelValue", !props.modelValue);
	emit("close");
};
</script>

<style lang="scss">
@import "../../style/sass/_functions";
@import "../../style/sass/_tokens";

// Enhanced transition animations using design tokens
.tu-dialog-enter-active {
	transition: all map-get($transition, 'slow');

	.tu-dialog {
		&:not(.tu-dialog--fullScreen) {
			animation: rebound 0.4s;
		}
	}
}

.tu-dialog-leave-active {
	transition: all map-get($transition, 'fast');

	.tu-dialog {
		transition: all map-get($transition, 'fast');
	}
}

.tu-dialog-enter,
.tu-dialog-leave-to {
	opacity: 0;

	.tu-dialog {
		transform: scale(0.7);
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));

		&--fullScreen {
			transform: translate(0, 8%) !important;
		}
	}
}

@keyframes rebound {
	0% {
		transform: scale(0.8);
	}

	40% {
		transform: scale(1.08);
	}

	80% {
		transform: scale(0.98);
	}

	100% {
		transform: scale(1);
	}
}

@keyframes reboundClick {
	0% {
		transform: scale(1);
	}

	40% {
		transform: scale(1.05);
	}

	80% {
		transform: scale(0.96);
	}

	100% {
		transform: scale(1);
	}
}

// Enhanced dialog content container using design tokens
.tu-dialog-content {
	--tu-color: var(--tu-primary);
	background: getColorAlpha("background", 0.8);
	position: fixed;
	left: 0;
	top: 0;
	z-index: map-get($z-index, 'modal');
	display: flex;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
	height: 100%;
	max-height: 100vh;
	overflow-y: auto;
	overflow-x: hidden;
	padding-top: map-get($spacing, 'xxl');
	padding-bottom: map-get($spacing, 'xxl');

	// Enhanced focus management for accessibility
	&:focus-within {
		.tu-dialog {
			outline: 2px solid var(--tu-primary, #2563eb);
			outline-offset: 4px;
		}
	}

	&.fullScreen {
		padding: 0;
		overflow: hidden;
	}

	&.blur {
		backdrop-filter: saturate(180%) blur(15px);
		background: getColorAlpha("background", 0.6);
	}
}

// Dark theme support
.tu-dark-theme {
	.tu-dialog {
		background: getColor("component-background");
		border: 1px solid getColorAlpha("text", 0.12);
	}
}

// Enhanced main dialog component using design tokens
.tu-dialog {
	background: getColor("component-background");
	color: getColor("text");
	position: relative;
	min-width: 400px;
	border-radius: map-get($border-radius, 'xl');
	transition: all map-get($transition, 'slow');
	box-shadow: map-get($shadow, 'xl');
	max-width: calc(100vw - 10%);
	margin: auto;
	border: 1px solid getColorAlpha("text", 0.08);

	// Enhanced accessibility and focus management
	&[tabindex="-1"]:focus {
		outline: none;
	}

	&--notCenter {
		.tu-dialog__header {
			display: block;
		}
	}

	&__loading {
		width: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		height: 100%;
		border-radius: inherit;
		background: getColorAlpha("background", 0.8);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;

		&:after {
			content: "";
			position: absolute;
			width: 30px;
			height: 30px;
			border-radius: inherit;
			border: 2px solid getColor("color");
			border-top: 2px solid getColorAlpha("color", 0);
			border-left: 2px solid getColorAlpha("color", 0);
			border-bottom: 2px solid getColorAlpha("color", 0);
			box-sizing: border-box;
			transition: all 0.25s ease;
			display: block;
			box-shadow: 0px 0px 0px 0px getColor("color");
			animation: loadingDialog 0.6s ease infinite;
		}

		&:before {
			content: "";
			position: absolute;
			width: 30px;
			height: 30px;
			border-radius: inherit;
			border: 2px dashed getColor("color");
			border-top: 2px solid getColorAlpha("color", 0);
			border-left: 2px solid getColorAlpha("color", 0);
			border-bottom: 2px solid getColorAlpha("color", 0);
			box-sizing: border-box;
			transition: all 0.25s ease;
			display: block;
			box-shadow: 0px 0px 0px 0px getColor("color");
			animation: loadingDialog 0.6s linear infinite;
		}
	}

	&--scroll {
		.tu-dialog__content {
			max-height: calc(80vh - 200px);
			overflow: auto;
		}
	}

	&--autoWidth {
		width: auto !important;
		min-width: auto !important;
		max-width: auto !important;
	}

	&--square {
		border-radius: 0px;

		.tu-dialog__close {
			border-radius: 0px;
		}
	}

	&--notPadding {
		.tu-dialog__footer {
			padding: 0px;
		}

		.tu-dialog__content {
			padding: 0px;
			margin-bottom: 0px !important;
		}

		.tu-dialog__header {
			padding: 0px;
		}
	}

	&--rebound {
		animation: reboundClick 0.3s !important;
	}

	&--fullScreen {
		width: calc(100% - 30px) !important;
		height: calc(100% - 30px) !important;
		max-width: none !important;
		max-height: none !important;
	}

	&__footer {
		padding: 10px 16px;
		padding-top: 0px;
		display: flex;
		justify-content: flex-end;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 16px;
	}

	&__content {
		padding: 10px 16px;
		width: 100%;
		position: relative;
		border-radius: inherit;

		&.notFooter {
			margin-bottom: 20px;
		}
	}

	&__close {
		color: getColor("text");
		position: absolute;
		padding: 0px !important;
		top: -6px;
		right: -6px;
		padding: 0px;
		margin: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: inherit;
		border-radius: 12px;
		box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));
		transition: all 0.25s ease;
		z-index: 200;
		border: 0px;

		::v-deep(.tu-button__content) {
			padding: 2px !important;
		}

		i {
			width: 34px;
			height: 34px;
			opacity: 0.7;

			&:after {
				width: 14px;
			}

			&:before {
				width: 14px;
			}
		}

		&:hover {
			box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));
			transform: translate(-2px, 2px);

			i {
				opacity: 1;
			}
		}

		.tu-button__content {
			padding: inherit !important;

			.tu-icon {
				padding: 5px;
			}
		}
	}
}

@keyframes loadingDialog {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

@media (max-width: 600px) {
	.tu-dialog {
		min-width: calc(100vw - 20px);
		max-width: calc(100vw - 20px);
		margin: auto 10px;
	}
}
</style>

