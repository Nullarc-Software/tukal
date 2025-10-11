<template>
	<Transition enter-from-class="notification-enter-from" enter-active-class="notification-enter-active"
		enter-to-class="notification-enter-to" leave-to-class="notification-leave-to"
		leave-from-class="notification-leave-from" leave-active-class="notification-leave-active" appear mode="out-in"
		@after-leave="onAfterLeave">
		<div v-if="isVisibleInternal" :id="`notification-${notifId}`" ref="notif" :class="[
			{ 'tu-notification--color': color },
			{ 'tu-notification--border': border },
			{ 'tu-notification--icon': icon },
			{ 'tu-notification--onClick': onClick },
			{ 'tu-notification--onClickClose': onClickClose },
			{ 'tu-notification--flat': flat },
			{ 'tu-notification--sticky': sticky },
			{ 'tu-notification--square': square },
			{ 'tu-notification--width-all': width == '100%' },
			{ 'tu-notification--width-auto': width == 'auto' },
			{ 'tu-notification--loading': loading },
			{ 'tu-notification--notPadding': notPadding },
			`tu-notification--${isColor ? color : null}`,
			classNotification,
			transitionClass
		]" :style="{
	['--tu-color']: color ? getColorValue(color) : ''
}" class="tu-component tu-notification" @click="clickNoti">
			<div v-if="!loading && icon">
				<tu-icon>{{ icon }} </tu-icon>
			</div>
			<div v-if="!loading" class="tu-notification__content">
				<header v-if="title" class="tu-notification__content__header">
					<h4>
						{{ title }}
					</h4>
				</header>
				<div v-if="text" class="tu-notification__content__text">
					<p>{{ text }}</p>
				</div>
				<div v-if="content">
					<component :is="content.component" v-bind="content.props">
						<slot name="content" />
					</component>
				</div>
			</div>
			<button v-if="buttonClose" class="tu-notification__close" @click="handleClickClose">
				<tu-icon>close</tu-icon>
			</button>
			<div v-if="loading" class="tu-notification__loading"></div>
			<div class="tu-notification__progress" :style="{ width: `${internalProgress}%` }"></div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
// ============================================================
// Imports
// ============================================================
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
import tuIcon from "../tuIcon/tuIcon.vue";
import { isColor as checkIsColor, getColor } from "../../utils";

// ============================================================
// Component Options
// ============================================================
defineOptions({
	name: "TuNotifications"
});

// ============================================================
// Types
// ============================================================
/**
 * @description Notification component that displays temporary messages with various styles
 * @example 
 * <tu-notifications 
 *   title="Success" 
 *   text="Operation completed"
 *   color="success"
 *   :duration="3000"
 * />
 */
interface Props {
	/**
	 * Unique identifier for the notification
	 * @default 0
	 */
	notifId?: number;
	
	/**
	 * Position of the notification on screen
	 * Options: 'top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'
	 * @default 'bottom-right'
	 */
	position?: string;
	
	/**
	 * Whether the notification is visible
	 * @default true
	 */
	isVisible?: boolean;
	
	/**
	 * Custom content component to render
	 * @default null
	 */
	content?: {
		component: unknown;
		props?: Record<string, unknown>;
	} | null;
	
	/**
	 * Title text of the notification
	 * @default null
	 */
	title?: string | null;
	
	/**
	 * Body text of the notification
	 * @default null
	 */
	text?: string | null;
	
	/**
	 * Color theme for the notification
	 * @default 'primary'
	 */
	color?: string;
	
	/**
	 * Border style configuration
	 * @default null
	 */
	border?: string | null;
	
	/**
	 * Icon to display in the notification
	 * @default null
	 */
	icon?: string | null;
	
	/**
	 * Callback function when close button is clicked
	 * @default null
	 */
	onClickClose?: (() => void) | null;
	
	/**
	 * Callback function when notification is clicked
	 * @default null
	 */
	onClick?: (() => void) | null;
	
	/**
	 * Whether to show close button
	 * @default true
	 */
	buttonClose?: boolean;
	
	/**
	 * Flat style without shadow
	 * @default false
	 */
	flat?: boolean;
	
	/**
	 * Callback function when notification is destroyed
	 * @default null
	 */
	onDestroy?: (() => void) | null;
	
	/**
	 * Whether notification stays permanently (doesn't auto-close)
	 * @default false
	 */
	sticky?: boolean;
	
	/**
	 * Square corners instead of rounded
	 * @default false
	 */
	square?: boolean;
	
	/**
	 * Width of the notification ('auto', '100%', or specific value)
	 * @default null
	 */
	width?: string | null;
	
	/**
	 * Show loading state
	 * @default false
	 */
	loading?: boolean;
	
	/**
	 * Auto-increment progress bar
	 * @default false
	 */
	progressAuto?: boolean;
	
	/**
	 * Initial progress value (0-100)
	 * @default 0
	 */
	progress?: number;
	
	/**
	 * Duration before auto-close in milliseconds
	 * @default 5000
	 */
	duration?: number;
	
	/**
	 * Remove padding from notification
	 * @default null
	 */
	notPadding?: object | null;
	
	/**
	 * Close notification when clicked anywhere
	 * @default false
	 */
	clickClose?: boolean;
	
	/**
	 * Additional CSS classes for the notification
	 * @default null
	 */
	classNotification?: string | null;
}

// ============================================================
// Props
// ============================================================
const props = withDefaults(defineProps<Props>(), {
	notifId: 0,
	position: "bottom-right",
	isVisible: true,
	content: null,
	title: null,
	text: null,
	color: "primary",
	border: null,
	icon: null,
	onClickClose: null,
	onClick: null,
	buttonClose: true,
	flat: false,
	onDestroy: null,
	sticky: false,
	square: false,
	width: null,
	loading: false,
	progressAuto: false,
	progress: 0,
	duration: 5000,
	notPadding: null,
	clickClose: false,
	classNotification: null
});

// ============================================================
// Emits
// ============================================================
defineEmits<{
	close: [];
}>();

// ============================================================
// Injections
// ============================================================
// Note: $tukal and $utils injected but not currently used
// Kept for potential future use or external dependencies
// const $tukal = inject("$tukal");
// const $utils = inject("$utils");

// ============================================================
// Template Refs
// ============================================================
const notif = ref<HTMLDivElement>();

// ============================================================
// State
// ============================================================
const internalProgress = ref<number>(props.progress);
const intervalProgress = ref<ReturnType<typeof setInterval>>();
const transitionClass = ref<string[]>([]);
const isVisibleInternal = ref<boolean>(true);

// ============================================================
// Computed Properties
// ============================================================
/**
 * Check if the color is a valid preset color
 */
const isColor = computed(() => checkIsColor(props.color));

// ============================================================
// Methods
// ============================================================
/**
 * Get color value for styling
 * Exposed to template for use in style bindings
 */
const getColorValue = (color: string): string => {
	return getColor(color);
};

/**
 * Handle notification click
 */
const clickNoti = (): void => {
	if (props.onClick) props.onClick();
};

/**
 * Handle close button click with animation
 */
const handleClickClose = (): void => {
	// Trigger the leave animation by setting isVisibleInternal to false
	isVisibleInternal.value = false;
};

/**
 * Called after the leave animation completes
 */
const onAfterLeave = (): void => {
	// Now call the actual close callback after animation is complete
	if (props.clickClose && props.onClickClose) props.onClickClose();
};

// ============================================================
// Animation Handlers (kept for potential future use with transition hooks)
// ============================================================
/**
 * Before enter transition hook
 * @param el - The element being transitioned
 */
// const beforeEnter = (el: HTMLElement): void => {
// 	el.style.maxHeight = "0px";
// 	el.style.padding = "0px 20px";
// };

/**
 * Enter transition hook
 * @param el - The element being transitioned
 * @param done - Callback to signal completion
 */
// const enter = (el: HTMLElement, done: () => void): void => {
// 	const h = el.scrollHeight;
// 	el.style.maxHeight = `${h + 40}px`;
// 	
// 	if (window.innerWidth < 600)
// 		el.style.padding = "15px";
// 	else
// 		el.style.padding = "20px";
// 	
// 	done();
// };

/**
 * Leave transition hook
 * @param el - The element being transitioned
 * @param done - Callback to signal completion
 */
// const leave = (el: HTMLElement, done: () => void): void => {
// 	setTimeout(() => {
// 		done();
// 	}, 250);
// };

// ============================================================
// Lifecycle Hooks
// ============================================================
/**
 * Initialize auto-close timer and progress bar
 */
onMounted(() => {
	if (props.sticky === false) {
		let value = 0;
		
		intervalProgress.value = setInterval(() => {
			if (props.progressAuto)
				internalProgress.value++;
			else
				value++;

			if (internalProgress.value >= 100 || value >= 100) {
				clearInterval(intervalProgress.value);
				handleClickClose();
			}
		}, props.duration / 100);
	}
});

/**
 * Cleanup interval on component unmount
 */
onBeforeUnmount(() => {
	if (intervalProgress.value) clearInterval(intervalProgress.value);
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";

// ============================================================
// Base Notification Animations
// ============================================================
.notification-enter-active {
	transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.notification-leave-active {
	transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.notification-enter-from {
	opacity: 0;
}

.notification-enter-to {
	opacity: 1;
}

.notification-leave-from {
	opacity: 1;
}

.notification-leave-to {
	opacity: 0;
}

// ============================================================
// Notification Parent Container
// ============================================================
.tu-notification-parent {
	position: fixed;
	right: 0px;
	bottom: 0px;
	z-index: 200000;
	transition: all 1s ease;
	padding: 10px 0px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-end;

	&--top-right {
		bottom: auto;
		top: 0px;
		display: flex;
		flex-direction: column-reverse;
		
		// Circle animation from top-right corner
		.notification-enter-from {
			clip-path: circle(0% at 100% 0%);
			
			.tu-notification__content {
				opacity: 0;
			}
		}
		
		.notification-enter-to {
			clip-path: circle(150% at 100% 0%);
			
			.tu-notification__content {
				opacity: 1;
			}
		}
		
		.notification-leave-from {
			clip-path: circle(150% at 100% 0%);

			.tu-notification__content {
				opacity: 1;
			}
		}
		
		.notification-leave-to {
			clip-path: circle(0% at 100% 0%);

			.tu-notification__content {
				opacity: 0;
			}
		}
	}

	&--top-center {
		bottom: auto;
		top: 0px;
		display: flex;
		flex-direction: column-reverse;
		left: 50%;
		right: auto;
		transform: translate(-50%);

		.tu-notification--sticky {
			margin: 3px 20px;
			border-radius: 20px;

			&:last-child {
				border-radius: 0px 0px 20px 20px;
				margin-top: -10px;
			}
		}

		.tu-notification {
			&.tu-notification--border {
				border: 3px solid transparent;
				border-top: 3px solid getColor("border");
			}
		}

		// Circle animation from top-center
		.notification-enter-from {
			clip-path: circle(0% at 50% 0%);

			.tu-notification__content {
				opacity: 0;
			}
		}
		
		.notification-enter-to {
			clip-path: circle(150% at 50% 0%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-from {
			clip-path: circle(150% at 50% 0%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-to {
			clip-path: circle(0% at 50% 0%);

			.tu-notification__content {
				opacity: 0;
			}
		}
	}

	&--bottom-center {
		left: 50%;
		right: auto;
		transform: translate(-50%);

		.tu-notification--sticky {
			margin: 3px 20px;
			border-radius: 20px;

			&:last-child {
				border-radius: 20px 20px 0px 0px;
				margin-bottom: -10px;
			}
		}

		.tu-notification {
			&.tu-notification--border {
				border: 3px solid transparent;
				border-bottom: 3px solid getColor("border");
			}
		}

		// Circle animation from bottom-center
		.notification-enter-from {
			clip-path: circle(0% at 50% 100%);

			.tu-notification__content {
				opacity: 0;
			}
		}
		
		.notification-enter-to {
			clip-path: circle(150% at 50% 100%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-from {
			clip-path: circle(150% at 50% 100%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-to {
			clip-path: circle(0% at 50% 100%);

			.tu-notification__content {
				opacity: 0;
			}
		}
	}

	&--top-left {
		bottom: auto;
		top: 0px;
		left: 0px;
		right: auto;
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-start;
		justify-content: flex-end;

		.tu-notification--sticky {
			margin-left: 0px;
			border-radius: 0px 20px 20px 0px;
		}

		.tu-notification {
			&.tu-notification--border {
				border: 3px solid transparent;
				border-left: 3px solid getColor("border");
			}
		}

		// Circle animation from top-left corner
		.notification-enter-from {
			clip-path: circle(0% at 0% 0%);

			.tu-notification__content {
				opacity: 0;
			}
		}
		
		.notification-enter-to {
			clip-path: circle(150% at 0% 0%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-from {
			clip-path: circle(150% at 0% 0%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-to {
			clip-path: circle(0% at 0% 0%);

			.tu-notification__content {
				opacity: 0;
			}
		}
	}

	&--bottom-left {
		left: 0px;
		right: auto;

		.tu-notification--sticky {
			margin-left: 0px;
			border-radius: 0px 20px 20px 0px;
		}

		.tu-notification {
			&.tu-notification--border {
				border: 3px solid transparent;
				border-left: 3px solid getColor("border");
			}
		}

		// Circle animation from bottom-left corner
		.notification-enter-from {
			clip-path: circle(0% at 0% 100%);

			.tu-notification__content {
				opacity: 0;
			}
		}
		
		.notification-enter-to {
			clip-path: circle(150% at 0% 100%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-from {
			clip-path: circle(150% at 0% 100%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-to {
			clip-path: circle(0% at 0% 100%);

			.tu-notification__content {
				opacity: 0;
			}
		}
	}

	&--bottom-right {
		// Circle animation from bottom-right corner (default)
		.notification-enter-from {
			clip-path: circle(0% at 100% 100%);

			.tu-notification__content {
				opacity: 0;
			}
		}
		
		.notification-enter-to {
			clip-path: circle(150% at 100% 100%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-from {
			clip-path: circle(150% at 100% 100%);

			.tu-notification__content {
				opacity: 1;
			}
		}

		.notification-leave-to {
			clip-path: circle(0% at 100% 100%);

			.tu-notification__content {
				opacity: 0;
			}
		}
	}
}

// ============================================================
// Notification Base Styles
// ============================================================
.tu-notification {
	--tu-color: var(--tu-background);
	--tu-border: var(--tu-background);
	--tu-opacity: 0.6;
	position: relative;
	max-width: 340px;
	width: 100%;
	height: auto;
	border-radius: 20px;
	box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, tuVar("shadow-opacity"));
	overflow: hidden;
	background: getColor("color");
	color: getColor("text");
	margin: 3px 10px;
	padding: 20px;
	
	// Smooth transitions for all properties
	transition: box-shadow 0.25s ease, transform 0.25s ease, max-height 0.25s ease,
		opacity 0.3s ease, clip-path 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

	&:hover:not(&--flat) {
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));
		transform: translate(0, 3px);
	}

	&--notPadding {
		padding: 0px !important;
	}

	&.tu-notification--icon {
		padding-left: 50px !important;
	}

	&.tu-notification--loading {
		width: 100px !important;
		max-height: 100px !important;
		min-height: 100px !important;
		padding: 0px !important;
		padding-left: 0px !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&--width-auto {
		width: auto;
		max-width: none;
	}

	&--width-all {
		max-width: calc(100vw - 50px);
		width: calc(100vw - 50px);
	}

	&--square {
		border-radius: 0px !important;
	}

	&--sticky {
		margin-right: 0px;
		margin-bottom: 0px;
		border-radius: 20px 0px 0px 20px;
	}

	&--flat {
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));
		background: getColor("background");
		color: getColor("color") !important;

		&:hover {
			&::after {
				background: getColorAlpha("color", 0.15);
			}
		}

		.tu-notification__progress {
			background: getColor("color") !important;
		}

		.tu-notification__close {
			--tu-color: inherit;
		}

		.tu-notification__content {
			color: getColor("color") !important;
		}

		&.tu-notification--border {
			border: 0px solid transparent !important;
			border-right: 3px solid getColor("border") !important;
		}

		&:after {
			content: "";
			background: getColorAlpha("color", 0.1);
			width: 100%;
			height: 100%;
			border-radius: inherit;
			position: absolute;
			top: 0px;
			left: 0px;
			z-index: -1;
			transition: all 0.25s ease;
		}
	}

	&.tu-notification--onClick {
		cursor: pointer;
	}

	&.tu-notification--color:not(.tu-notification--flat) {
		color: #fff;

		.tu-notification__close {
			--tu-color: 255, 255, 255;
		}

		.tu-notification__progress {
			background: #fff;
		}

		.tu-notification__loading {
			&:after {
				border: 2px solid #fff;
				border-top: 2px solid transparent;
				border-left: 2px solid transparent;
				border-right: 2px solid transparent;
			}

			&:before {
				border: 2px dashed #fff;
				border-top: 2px solid transparent;
				border-left: 2px solid transparent;
				border-right: 2px solid transparent;
			}
		}
	}

	&.tu-notification--color:not(.tu-notification--flat, .tu-notification--light) {
		&.tu-notification__progress {
			background: #fff;
		}
	}

	&.tu-notification--border {
		border: 3px solid transparent;
		border-right: 3px solid getColor("border");
	}

	&__progress {
		width: 0%;
		height: 3px;
		background: getColor("text");
		position: absolute;
		bottom: 0px;
		left: 0px;
		transition: all 0.25s ease;
	}

	&__loading {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		position: absolute;

		&:after {
			box-sizing: border-box;
			position: absolute;
			width: 100%;
			height: 100%;
			border: 2px solid getColor("text");
			border-radius: inherit;
			border-top: 2px solid transparent;
			border-left: 2px solid transparent;
			border-right: 2px solid transparent;
			animation: loadingNoti 0.8s ease infinite;
			top: 0px;
			content: "";
		}

		&:before {
			box-sizing: border-box;
			top: 0px;
			position: absolute;
			width: 100%;
			height: 100%;
			border: 2px dashed getColor("text");
			border-radius: inherit;
			border-top: 2px solid transparent;
			border-left: 2px solid transparent;
			border-right: 2px solid transparent;
			animation: loadingNoti 0.8s linear infinite;
			opacity: 0.2;
			content: "";
		}
	}

	&__close {
		--tu-color: var(--tu-text);
		position: absolute;
		border: 0px;
		background: transparent;
		top: 2px;
		right: 2px;
		transform: scale(0.75);
		padding: 5px;
	}

	&__icon {
		position: absolute;
		top: calc(50% - 22px);
		background: transparent;
		width: 45px;
		height: 45px;
		left: 2px;
		border-radius: 0px 35% 35% 0px;
		// box-shadow: inherit
		display: flex;
		align-items: center;
		justify-content: center;

		i {
			font-size: 1.2rem;
		}
	}

	&__content {
		position: relative;
		width: auto;
		height: auto;
		transition: opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
		opacity: 1;

		&__text {
			width: 100%;

			p {
				margin: 0px;
				padding: 0px;
				font-size: 0.75rem;
				line-height: 1rem;
			}
		}

		&__header {
			width: 100%;
			margin: 0px;
			padding: 0px;
			padding-bottom: 6px;

			h4 {
				width: 100%;
				margin: 0px;
				padding: 0px;
				font-size: 0.9rem;
			}
		}
	}
}

.tu-notification--light {
	color: #000 !important;

	i {
		color: #000 !important;
	}
}

.tu-notification--dark:not(.tu-notification--flat) {
	color: #fff !important;

	.tu-notification__close {
		--tu-color: 255, 255, 255 !important;
	}

	h4 {
		color: #fff !important;
	}

	p {
		color: #fff !important;
	}

	i {
		color: #fff !important;
	}
}

@keyframes loadingNoti {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes progressNoti {
	0% {
		width: 0%;
	}

	100% {
		width: 100%;
	}
}

@media (max-width: 600px) {
	.tu-notification {
		margin: 3px 0px !important;
		border-radius: 0px !important;
		width: 100% !important;
		max-width: 100% !important;
		min-width: 100% !important;

		&:hover {
			transform: translate(0) !important;
		}

		&:last-child {
			margin-bottom: 0px !important;
		}
	}

	.tu-notification-parent {
		padding: 0px;
		width: 100% !important;
		max-width: 100% !important;

		.tu-notification--sticky {
			margin-bottom: 0px !important;
		}

		&.tu-notification-parent--top-center {
			.tu-notification:last-child {
				margin-bottom: 3px;
				margin-top: 0px !important;
			}
		}
	}
}
</style>

