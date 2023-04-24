<template>
	<div
		class="tu-avatar-content"
		v-bind="$attrs"
		:style="{
			width: `${size}px`,
			height: `${size}px`,
			cursor: pointer && 'pointer',
			['--tu-getColor']: color ? getColor(color) : ''
		}"
		:class="[
			{
				history: history,
				'history--gradient': historyGradient,
				'tu-avatar-content--circle': circle,
				'tu-avatar-content--square': square,
				'tu-avatar-content--hidden': isHidden,
				'tu-avatar-content--latest': isLatest,
				'tu-avatar-content--hasIcons': $slots.icons,
				[`tu-avatar-content--size`]: size
			},
			// colors
			{ [`tu-component--primary`]: !!primary },
			{ [`tu-component--danger`]: !!danger },
			{ [`tu-component--warn`]: !!warn },
			{ [`tu-component--success`]: !!success },
			{ [`tu-component--dark`]: !!dark },
			{ [`tu-component--is-getColor`]: !!isColor },
			...additionalClasses
		]"
		ref="avatarContent"
	>
		<div v-if="loading" class="tu-avatar__loading">
			<div class="tu-avatar__loading__animate" />
		</div>
		<div
			class="tu-avatar"
			:class="{
				[`tu-avatar--letter--${textLength}`]: textLength > 2
			}"
		>
			<div v-if="text" v-html="getText" />
			<slot />
		</div>
		<div
			v-if="$slots.badge || badge"
			:class="[
				'tu-avatar__badge',
				{
					isSlot: $slots.badge,
					writing: writing
				},
				badgePosition
			]"
		>
			<div v-if="writing" class="tu-avatar__points">
				<div class="tu-avatar__points__point"></div>
				<div class="tu-avatar__points__point"></div>
				<div class="tu-avatar__points__point"></div>
			</div>
			<slot v-else name="badge" />
		</div>
		<div
			v-if="isLatest"
			class="tu-avatar__latest"
			name="show"
			:value="avatarsLength"
		>
			{{ `+1` }}
		</div>
		<slot v-if="$slots.icons" name="icons" />
	</div>
</template>

<script lang="ts">
import { setColor } from "@/utils";
import {
	computed,
	defineComponent,
	getCurrentInstance,
	inject,
	onMounted,
	Ref,
	watch,
	ref
} from "vue";

import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuAvatar",
	extends: tuComponent,
	props: {
		badgePosition: { default: null },  //badgePosition prop: the position of the prop which are i) top-right ii) top-left iii) bottom-left
		pointer: { default: false, type: Boolean },  //pointer prop: on hover cursor to be as pointer if boolean true else not
		circle: { default: false, type: Boolean },  //circle prop: the avatar to be shaped as circle if boolean true else not
		square: { default: false, type: Boolean },   //square prop: the avatar to be shaped as sqare if boolean true else not
		history: { default: false, type: Boolean },  //history prop:the avatar to be given special css similar to a button 
		loading: { default: false, type: Boolean },  //loading prop: the loading animation to be shown if boolean true 
		historyGradient: { default: false, type: Boolean },  //historyGradient prop: special grading to be given to history style. works only if history prop to be true 
		writing: { default: false, type: Boolean },  
		badge: { default: false, type: Boolean }, 
		badgeColor: { default: "", type: String }, 
		size: { default: "", type: String },  //size prop: size of the badge possible values are in pixels
		text: { default: "", type: String }  //text prop: text to be shown in the avatar
	},
	setup (props, context) {
		const textLength = ref(0);
		const countPlus = ref(0);
		const index = ref(0);
		const additionalClasses = ref<any[]>([]);
		const instance = getCurrentInstance();

		const avatarContent = ref<HTMLDivElement>();
		const addAvatar = inject<Function>("addAvatar", null);
		const avatarsLength = inject<Ref<Number>>("avatarsLength", null);
		const parentMax = inject<Ref<Number>>("parentMax", null);

		const getParent = function () {
			if (instance?.parent)
				return instance.parent.type.name === "TuAvatarGroup";

			return false;
		};

		const getText = computed(() => {
			if (props.text.length <= 5) return props.text;

			const exp = /\s/g;
			let letras = "";
			if (exp.test(props.text)) {
				props.text.split(exp).forEach((word) => {
					letras += word[0].toUpperCase();
				});
			}
			else letras = props.text[0].toUpperCase();

			return letras.length > 5 ? letras[0] : letras;
		});

		const isHidden = computed(() => {
			return (
				getParent() &&
				parentMax?.value &&
				index.value > Number(parentMax?.value) - 1
			);
		});

		const isLatest = computed(() => {
			return getParent() && index.value === Number(parentMax?.value) - 1;
		});

		watch(
			() => props.badgeColor,
			() => {
				setColor("badge", props.badgeColor, avatarContent.value);
				additionalClasses.value.push("tu-change-getColor-badge");
			}
		);

		onMounted(() => {
			setColor("badge", props.badgeColor, avatarContent.value);
			additionalClasses.value.push("tu-change-getColor-badge");
			if (getParent()) {
				index.value = avatarsLength?.value as number;
				addAvatar?.call(null, instance);
			}
		});

		return {
			textLength,
			countPlus,
			index,
			additionalClasses,
			avatarContent,
			avatarsLength,
			parentMax,
			isHidden,
			isLatest,
			getText
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";
@import "../../style/sass/root";

.tu-avatar-content {
	--tu-getColor: var(--tu-gray-2);
	--tu-badge: var(--tu-primary);
}

.tu-avatar-content {
	border-radius: 35%;
	z-index: 1;
	width: 44px;
	height: 44px;
	position: relative;
	transition: all 0.25s ease;
	user-select: none;

	&.tu-change-getColor-badge {
		.tu-avatar__badge {
			.tu-avatar__points__point {
				background: -getColor("background");
			}
		}
	}

	&.tu-change-getColor {
		&:hover {
			.tu-avatar {
				box-shadow: inset 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
			}
		}
	}

	&:hover::v-deep {
		.tu-avatar {
			box-shadow: inset 0px 0px 40px 0px rgba(0, 0, 0, 0.04);
		}

		img {
			transform: scale(1.1);
		}
	}

	&--size {
		&.history {
			&:after {
				top: (-2px) !important;
			}
		}
	}

	&--hasIcons {
		margin-right: 20px;
	}

	&--hidden {
		display: none;
	}

	&--circle {
		border-radius: 50% !important;

		.tu-avatar__badge {
			right: -2px;
			bottom: -2px;

			&.top-right {
				top: -2px;
				bottom: auto;
			}

			&.top-left {
				top: -2px;
				left: -2px;
				bottom: auto;
				right: auto;
			}

			&.bottom-left {
				left: -2px;
				right: auto;
			}
		}
	}

	&--square {
		border-radius: 0% !important;
	}

	&.history {
		&--gradient {
			&:after {
				background-image: linear-gradient(
					40deg,
					#f99b4a 0%,
					#df376b 74%,
					#c52d91 74%
				) !important;
			}
		}

		.tu-avatar {
			width: calc(100% - 4px);
			height: calc(100% - 4px);
			border: 2px solid -getColor("background");
			margin: 2px;
		}

		&:after {
			content: "";
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			background-getcolor: #ffe53b;
			z-index: -1;
			background: -getColor("color");
		}
	}

	&.tu-component--is-getColor {
		.tu-avatar {
			color: -getColor("background");
		}

		.tu-avatar__points {
			.tu-avatar__points__point {
				background: -getColor("background");
			}
		}
	}
}

.tu-avatar::v-deep {
	background: -getColor("color");
	color: #fff;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	color: -getColor("text");
	border-radius: inherit;
	width: 100%;
	height: 100%;
	transition: all 0.25s ease;
	box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.05);

	i {
		font-size: 1.4rem;
	}

	img {
		width: 100%;
		height: auto;
		display: block;
		transition: all 0.25s ease;
		border-radius: inherit;
	}

	&__loading {
		position: absolute;
		width: 100%;
		top: 0px;
		left: 0px;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
		height: 100%;
		border-radius: inherit;
		display: flex;
		align-items: center;
		justify-content: center;

		&__animate {
			height: 60%;
			width: 60%;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			&:after {
				box-sizing: border-box;
				position: absolute;
				width: 100%;
				height: 100%;
				border: 2px solid #fff;
				border-radius: inherit;
				border-top: 2px solid transparent;
				border-left: 2px solid transparent;
				border-right: 2px solid transparent;
				animation: rotateInputLoading 0.8s ease infinite;
				top: 0px;
				content: "";
			}

			&:before {
				box-sizing: border-box;
				top: 0px;
				position: absolute;
				width: 100%;
				height: 100%;
				border: 2px dashed #fff;
				border-radius: inherit;
				border-top: 2px solid transparent;
				border-left: 2px solid transparent;
				border-right: 2px solid transparent;
				animation: rotateInputLoading 0.8s linear infinite;
				opacity: 0.2;
				content: "";
			}
		}
	}

	&--letter--3 {
		font-size: 0.9rem;
	}

	&--letter--4 {
		font-size: 0.8rem;
	}

	&--letter--5 {
		font-size: 0.7rem;
	}

	&--letter--6 {
		font-size: 0.6rem;
	}

	&__badge {
		position: absolute;
		width: 13px;
		height: 13px;
		background: -getColor("badge");
		border-radius: 50%;
		border: 2px solid -getColor("background") !important;
		right: -4px;
		bottom: -4px;
		font-size: 0.6rem;
		font-weight: bold;
		z-index: 200;
		color: -getColor("text");

		&.isSlot,
		&.writing {
			width: auto;
			height: auto;
			border-radius: 7px;
			min-width: 18px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: -getColor("background");
			line-height: 0.9rem;
			padding: 0px 3px;
			min-height: 18px;
		}

		&.top-right {
			top: -4px;
			bottom: auto;
		}

		&.top-left {
			top: -4px;
			left: -4px;
			bottom: auto;
			right: auto;
		}

		&.bottom-left {
			left: -4px;
			right: auto;
		}
	}

	&__points {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		&__point {
			width: 5px;
			height: 5px;
			background: -getColor("text");
			margin: 0px 2px;
			border-radius: 50%;

			&:nth-child(1) {
				animation: point 1.2s ease infinite;
			}

			&:nth-child(2) {
				animation: point 1.2s ease infinite 0.4s;
			}

			&:nth-child(3) {
				animation: point 1.2s ease infinite 0.8s;
			}
		}
	}

	&__latest {
		background: rgba(0, 0, 0, 0.5);
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 300;
		border-radius: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: 600;
		user-select: none;
	}

	&__icons {
		position: absolute;
		width: auto;
		height: auto;
		min-height: 90%;
		background: -getColor("gray-3");
		top: 50%;
		transform: translate(0, -50%);
		right: -20px;
		padding: 3px;
		padding-left: 5px;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		flex-direction: column;
		z-index: -1;
		border-radius: 5px 5px 5px 5px;
		font-size: 1rem;

		i {
			cursor: pointer;
			transition: all 0.25s ease;

			&:hover {
				opacity: 0.7;
			}
		}
	}
}

@keyframes point {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0.4;
		transform: scale(0.5);
	}

	100% {
		opacity: 1;
	}
}
</style>
