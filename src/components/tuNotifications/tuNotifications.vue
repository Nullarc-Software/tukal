<template>
	<transition enter-from-class="notification-enter-from" enter-active-class="notification-enter-active"
		enter-to-class="notification-enter-to" leave-to-class="notification-leave-to"
		leave-from-class="notification-leave-from" leave-active-class="notification-leave-active" appear out-in>
		<div :id="`notification-${notifId}`" ref="notif" :class="[
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
			`tu-notification--${isColor() ? color : null}`,
			,
			transitionClass
		]" :style="{
	['--tu-color']: color ? getColor(color) : '',
	['--tu-color-secondary']: colorSecondary
		? getColor(colorSecondary)
		: '',
	['--tu-color-text']: textColor ? getColor(textColor) : ''
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
	</transition>
</template>

<script lang="ts">
import tuIcon from "../tuIcon/tuIcon.vue";
import _color from "../../utils/color";
import {
	onMounted,
	ref,
	Transition,
	TransitionGroup,
	defineComponent,
	onBeforeUnmount
} from "vue";

import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuNotifications",
	extends: tuComponent,
	props: {
		notifId: {  //notifId prop: unique id for notification 
			type: Number,
			default: 0
		},
		position: {  //position prop: position of the notification message. the values are: i) bottom-right ii) bottom-left iii) top-right iv) top-left v) top-center vi) bottom-center
			type: String,
			default: "bottom-right"
		},
		content: {  //content prop: content for the notification message
			type: Object,
			default: null
		},
		title: {  //title prop: title of the notification message
			type: String,
			default: null
		},
		text: {  //text ptop: text for the notification message
			type: String,
			default: null
		},
		color: {  //color prop: background color for the notification message
			type: String,
			default: "primary"
		},
		border: {  //border prop: adds border for notification message
			type: String,
			default: null
		},
		icon: {  //icon prop: adss icon to the notification
			type: String,
			default: null
		},
		onClickClose: {  //onClickClose prop: emits when close button is clicked
			type: Function,
			default: null
		},
		onClick: {  //onClick prop: emits when clicked on the notification
			type: Function,
			default: null
		},
		buttonClose: {  //buttonClose prop: adds a close button if boolean is true
			type: Boolean,
			default: true
		},
		flat: {  //flat prop: adds flat style to the notification message
			type: Boolean,
			default: false
		},
		sticky: {  //sticky prop: makes the notification message position sticky
			type: Boolean,
			default: false
		}, 
		square: {  //square prop: makes the notification of the shape of square
			type: Boolean,
			default: false
		},
		width: {  //width prop: width of the notification message is set
			type: String,
			default: null
		},
		loading: {  //loading prop: loading animation to be shown
			type: Boolean,
			default: false
		},
		progressAuto: { //progressAuto prop: progress bar to be automatically increased
			type: Boolean,
			default: false
		},
		progress: {  //progress prop: value to be set in progress bar
			type: Number,
			default: 0
		},
		duration: {  //duration prop: duration of the notification message after which it disappears
			type: Number,
			default: 5000
		},
		notPadding: {  //notPadding prop: removes padding from the notification message
			type: Object,
			default: null
		},
		clickClose: {  //clickClose prop: emits when notification is closed
			type: Boolean,
			default: false
		},
	},
	components: {
		tuIcon,
		Transition,
		TransitionGroup
	},
	emits: ["close"],
	setup(props, context) {
		const internalProgress = ref(props.progress);
		const intervalProgress = ref<NodeJS.Timer>();
		const notif = ref<HTMLDivElement>();

		const transitionClass = ref<Array<String>>([]);
		transitionClass.value = [];

		const clickNoti = function () {
			if (props.onClick) props.onClick();
		};

		const handleClickClose = function () {
			transitionClass.value = [
				"notification-leave-active",
				"notification-leave-to"
			];
			setTimeout(() => {
				if (props.clickClose)
					if (props.onClickClose) props.onClickClose();
			}, 100);
		};

		const beforeEnter = function (el: any) {
			el.style.maxHeight = "0px";
			el.style.padding = "0px 20px";
		};

		const enter = function (el: any, done: any) {
			const h = el.scrollHeight;
			el.style.maxHeight = `${h + 40}px`;
			if (window.innerWidth < 600) el.style.padding = "15px";
			else el.style.padding = "20px";

			done();
		};

		const leave = function (el: any, done: any) {
			setTimeout(() => {
				done();
			}, 250);
		};

		const isColor = () => {
			return _color.isColor(props.color);
		};
		onMounted(() => {
			if (props.sticky === false) {
				let value = 0;
				intervalProgress.value = setInterval(() => {
					if (props.progressAuto) internalProgress.value++;
					else value++;

					if (internalProgress.value >= 100 || value >= 100) {
						clearInterval(intervalProgress.value);
						handleClickClose();
					}
				}, props.duration / 100);
			}
		});

		onBeforeUnmount(() => {
			clearInterval(intervalProgress.value);
		});

		return {
			internalProgress,
			intervalProgress,
			notif,
			close,
			handleClickClose,
			beforeEnter,
			enter,
			leave,
			clickNoti,
			isColor,
			transitionClass
		};
	}
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.notification-enter-active {
	transition: all 0.3s ease 0.05s, transform 0.3s ease, margin 0.25s ease,
		clip-path 1s ease 0.8s;
}

.notification-leave-active {
	transition: all 0.25s ease !important;
}

.notification-enter-to {
	transform: none;
}

.notification-leave-from {
	clip-path: circle(100% at 50% 50%) !important;
}

.notification-leave-to {

	clip-path: circle(0% at 50% 50%) !important;
}

// transform: translate(0,10px) !important

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
			clip-path: circle(120% at 50% 0%);
			transition: all 0.25s ease, transform 0.3s ease,
				max-height 0.25s ease, clip-path 0.5s ease 0.1s;

			&.tu-notification--border {
				border: 3px solid transparent;
				border-top: 3px solid -getColor("border");
			}
		}

		.notification-enter-from {
			transform: translate(0, -25%);
			clip-path: circle(0% at 50% 0%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(0, -10%);
			}
		}

		.notification-leave-to {
			transform: translate(0, -25%);
			clip-path: circle(0% at 50% 0%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(0, -10%);
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
			clip-path: circle(120% at 50% 100%) !important;
			transition: all 0.25s ease, transform 0.3s ease,
				max-height 0.25s ease, clip-path 0.5s ease 0.1s;

			&.tu-notification--border {
				border: 3px solid transparent;
				border-bottom: 3px solid -getColor("border");
			}
		}

		.notification-enter-from {
			transform: translate(0, 25%);
			clip-path: circle(0% at 50% 100%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(0, 10%);
			}
		}

		.notification-leave-to {
			transform: translate(0, 25%);
			clip-path: circle(0% at 50% 100%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(0, 10%);
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
			clip-path: circle(145% at 0% 50%) !important;

			&.tu-notification--border {
				border: 3px solid transparent;
				border-left: 3px solid -getColor("border");
			}
		}

		.notification-enter-from {
			transform: translate(-25%);
			clip-path: circle(0% at 20% 35%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(0, -10%);
			}
		}

		.notification-leave-to {
			transform: translate(-25%);
			clip-path: circle(0% at 20% 35%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(0, -10%);
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

		.notification-enter-from {
			transform: translate(-25%);
			clip-path: circle(145% at 80% 30%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(-10%);
			}
		}

		.notification-leave-to {
			transform: translate(-25%);
			clip-path: circle(145% at 80% 30%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(-10%);
			}
		}

		.tu-notification {
			&.tu-notification--border {
				border: 3px solid transparent;
				border-left: 3px solid -getColor("border");
			}
		}
	}

	&--bottom-right {
		.notification-enter-from {
			transform: translate(25%);
			clip-path: circle(0% at 80% 35%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(10%);
			}
		}

		.notification-leave-to {
			transform: translate(25%);
			clip-path: circle(0% at 80% 35%) !important;

			.tu-notification__content {
				opacity: 0;
				transform: translate(10%);
			}
		}
	}
}

.tu-notification {
	--tu-color: var(--tu-background);
	--tu-border: var(--tu-background);
	--tu-opacity: 0.6;
	position: relative;
	max-width: 340px;
	width: 100%;
	height: auto;
	border-radius: 20px;
	box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, -var("shadow-opacity"));
	overflow: hidden;
	clip-path: circle(145% at 100% 50%);
	background: -getColor("color");
	color: -getColor("text");
	margin: 3px 10px;
	transition: all 0.25s ease, transform 0.3s ease 0.1s, max-height 0.25s ease,
		clip-path 0.5s ease 0.1s;
	padding: 20px;

	&:hover:not(&--flat) {
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, -var("shadow-opacity"));
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
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, -var("shadow-opacity"));
		background: -getColor("background");
		color: -getColor("color") !important;

		&:hover {
			&::after {
				background: -getColorAlpha("color", 0.15);
			}
		}

		.tu-notification__progress {
			background: -getColor("color") !important;
		}

		.tu-notification__close {
			--tu-color: inherit;
		}

		.tu-notification__content {
			color: -getColor("color") !important;
		}

		&.tu-notification--border {
			border: 0px solid transparent !important;
			border-right: 3px solid -getColor("border") !important;
		}

		&:after {
			content: "";
			background: -getColorAlpha("color", 0.1);
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
		border-right: 3px solid -getColor("border");
	}

	&__progress {
		width: 0%;
		height: 3px;
		background: -getColor("text");
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
			border: 2px solid -getColor("text");
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
			border: 2px dashed -getColor("text");
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
		transition: all 0.25s ease 0.2s;
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
