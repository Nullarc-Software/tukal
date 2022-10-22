<template>
	<div
		class="tu-pagination-content"
		:style="{
			['--tu-color']: color ? getColor(color) : ''
		}"
		:class="[
			{
				buttonsDotted: buttonsDotted,
				circle: circle,
				square: square,
				disabled: disabled,
				notMargin: notMargin
			},
			{
				[`tu-component--primary`]:
					!danger && !success && !warn && !dark && !color
			},
			{ [`tu-component--danger`]: !!danger },
			{ [`tu-component--warn`]: !!warn },
			{ [`tu-component--success`]: !!success },
			{ [`tu-component--dark`]: !!dark }
		]"
		v-bind="$attrs"
	>
		<button
			v-if="!notArrows"
			class="tu-pagination__arrow prev"
			:disabled="infinite ? false : val <= 1"
			@click="prevClicked"
		>
			<slot v-if="$slots.arrowPrev" name="arrowPrev" />
			<tu-icon
				:style="{
					cursor: 'pointer',
					display: 'inline-flex',
					'align-self': 'center',
					'justify-content': 'center'
				}"
				v-else
				>keyboard_arrow_left</tu-icon
			>
		</button>
		<slot v-if="$slots.default" />
		<div
			class="tu-pagination"
			ref="pagination"
			v-if="!onlyArrows && !$slots.default"
		>
			<component :is="item" v-for="item of getPages" :key="item" />
		</div>
		<button
			v-if="!notArrows"
			class="tu-pagination__arrow next"
			:disabled="infinite ? false : val >= length"
			@click="nextClicked"
		>
			<slot v-if="$slots.arrowNext" name="arrowNext" />
			<tu-icon
				:style="{
					cursor: 'pointer',
					display: 'inline-flex',
					'align-self': 'center',
					'justify-content': 'center'
				}"
				v-else
				>keyboard_arrow_right</tu-icon
			>
		</button>
		<div v-if="progress" class="tu-pagination__progress">
			<div class="progress" :style="{ width: `${getProgress}%` }"></div>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, h, nextTick, ref, watch } from "vue";
import tuIconsArrow from "../../icons/arrow";
import tuComponent from "../tuComponent";
import tuIcon from "../tuIcon";

export default defineComponent({
	name: "TuPagination",
	extends: tuComponent,
	components: {
		tuIcon
	},
	props: {
		modelValue: { type: Number, default: 1 },
		infinite: { default: false, type: Boolean },
		flat: { default: false, type: Boolean },
		progress: { default: false, type: Boolean },
		notMargin: { default: false, type: Boolean },
		buttonsDotted: { default: false, type: Boolean },
		notArrows: { default: false, type: Boolean },
		onlyArrows: { default: false, type: Boolean },
		circle: { default: false, type: Boolean },
		square: { default: false, type: Boolean },
		disabled: { default: false, type: Boolean },
		disabledItems: { default: () => [], type: Array },
		loadingItems: { default: () => [], type: Array },
		length: { default: 1, type: Number },
		max: { default: 9, type: Number },
		dottedNumber: { default: 5, type: Number },
	},
	setup (props, context) {
		const val = ref(1);
		const leftActive = ref(42);
		const activeClassMove = ref(false);
		const pagination = ref<HTMLDivElement>();

		const getProgress = computed(() => {
			let percent = 0;
			if (props.modelValue)
				percent = (props.modelValue * 100) / props.length;

			return percent;
		});

		const setValuePage = function (NumberPage: number) {
			context.emit("update:modelValue", NumberPage);
		};

		const renderDotted = function (text: string = "...") {
			const dotted = h(
				"div",
				{
					class: {
						"tu-pagination__dotted": true,
						next:
							props.modelValue === props.length
								? false
								: text === "...>"
					},
					style: {
						cursor: "pointer"
					},
					onClick: (evt: any) => {
						let newVal = (
							props.modelValue === props.length
								? false
								: text === "...>"
						)
							? (val.value += props.dottedNumber)
							: (val.value -= props.dottedNumber);
						if (newVal > props.length) newVal = props.length;
						else if (newVal < 1) newVal = 1;

						setValuePage(newVal);
					}
				},
				[
					h(
						"span",
						{
							class: "dotted"
						},
						"..."
					),
					h(
						"span",
						{
							class: "con-arrows"
						},
						[h(tuIconsArrow), h(tuIconsArrow)]
					)
				]
			);

			return dotted;
		};

		const isDisabledItem = function (item: number) {
			return props.disabledItems.indexOf(item) !== -1;
		};

		const isLoadingItem = function (item: number) {
			return props.loadingItems.indexOf(item) !== -1;
		};

		const renderButton = function (NumberPage: number = 1) {
			const button = h(
				"button",
				{
					ref: `btn${NumberPage}`,
					class: {
						[`tu-pagination__button pagination-btn-${NumberPage}`]:
							true,
						active: NumberPage === props.modelValue,
						"tu-pagination__active":
							NumberPage === props.modelValue,
						flat: props.flat,
						prevActive: NumberPage === props.modelValue - 1,
						nextActive: NumberPage === props.modelValue + 1,
						disabled: isDisabledItem(NumberPage),
						loading: isLoadingItem(NumberPage)
					},
					onClick: (evt: any) => {
						setValuePage(NumberPage);
					}
				},
				props.buttonsDotted ? "" : `${NumberPage}`
			);

			return button;
		};

		const renderButtons = function (array: any) {
			const buttons: any[] = [];

			array.forEach((item: any) => {
				if (item === "...>" || item === "<...")
					buttons.push(renderDotted(item));
				else buttons.push(renderButton(item));
			});

			return buttons;
		};

		const getButtons = function (start: number = 1, end: number = 6) {
			const buttons: any[] = [];
			for (start > 0 ? start : 1; start <= end; start++)
				buttons.push(start);

			return buttons;
		};

		const isMobile = computed(() => {
			const isMobile = false;
			/* if (!(<any>window.vm).$isServer) {
				if (window.innerWidth < 600) {
					isMobile = true;
				}
			} */
			return isMobile;
		});

		const getPages = computed(() => {
			const length = Number(props.length);
			const max = props.max;
			const even = max % 2 === 0 ? 1 : 0;
			const prevRange = Math.floor(max / 2);
			const nextRange = length - prevRange + 1 + even;

			if (
				props.modelValue >= prevRange &&
				props.modelValue <= nextRange &&
				!props.buttonsDotted
			) {
				const start = props.modelValue - prevRange + 2;
				const end = props.modelValue + prevRange - 2 - even;

				return renderButtons([
					1,
					"<...",
					...getButtons(start, end),
					"...>",
					props.length
				]);
			}
			else if (!props.buttonsDotted && props.length > 6) {
				return renderButtons([
					...getButtons(1, prevRange),
					"...>",
					...getButtons(nextRange, length)
				]);
			}
			else if (props.buttonsDotted || props.length <= 6) {
				return renderButtons([
					...getButtons(1, props.length === 0 ? 1 : props.length)
				]);
			}

			return [];
		});

		const prevClicked = function () {
			const newVal = (val.value -= 1);
			if (newVal > 0) setValuePage(newVal);
			else if (props.infinite) setValuePage(props.length);
		};

		const nextClicked = function () {
			const newVal = (val.value += 1);
			if (newVal <= props.length) setValuePage(newVal);
			else if (props.infinite) setValuePage(1);
		};

		watch(
			() => props.length,
			() => {
				val.value = 1;
				setValuePage(1);
				nextTick(() => {
					setTimeout(() => {
						activeClassMove.value = false;
					}, 300);
				});
			}
		);

		watch(
			() => props.modelValue,
			(valNew, prevValue) => {
				if (isDisabledItem(valNew) || isLoadingItem(valNew)) {
					let newVal = valNew;
					if (valNew > prevValue) newVal += 1;
					else newVal -= 1;

					if (newVal > props.length)
						newVal = props.infinite ? 1 : prevValue;
					else if (newVal <= 0)
						newVal = props.infinite ? props.length : prevValue;

					val.value = newVal;
					setValuePage(newVal);
				}
				else {
					val.value = valNew;
					if (pagination.value) {
						activeClassMove.value = true;
						nextTick(() => {
							setTimeout(() => {
								activeClassMove.value = false;
							}, 300);
						});
					}
				}
			}
		);

		return {
			leftActive,
			activeClassMove,
			val,
			prevClicked,
			nextClicked,
			getPages,
			pagination,
			getProgress
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.tu-pagination-content {
	--tu-getColor: var(--tu-primary);
}

.tu-pagination-content {
	position: relative;
	display: flex;
	align-self: center;
	justify-content: center;

	&.notMargin {
		.tu-pagination {
			&__dotted {
				background: -getColor("gray-3");
				margin: 0px;
			}

			&__arrow {
				margin: 0px !important;
				border-radius: 0px;

				&:first-of-type {
					border-radius: 12px 0px 0px 12px;
				}

				&:last-of-type {
					border-radius: 0px 12px 12px 0px;
				}
			}

			&__button {
				border-radius: 0px;
				margin: 0px !important;
			}
		}
	}

	&.disabled {
		opacity: 0.5;
		pointer-events: none;
		user-select: none;
	}

	&.square {
		.tu-pagination {
			&__active {
				border-radius: 0px;
			}

			&__button {
				border-radius: 0px;
			}

			&__arrow {
				border-radius: 0px;
			}
		}
	}

	&.circle {
		.tu-pagination {
			&__active {
				border-radius: 50%;
			}

			&__button {
				border-radius: 50%;
			}

			&__arrow {
				border-radius: 50%;
			}
		}
	}

	&.buttonsDotted {
		.tu-pagination {
			&__arrow {
				width: 15px;
				height: 12px;
				min-width: 15px;
				padding: 0px;
				background: transparent;

				i {
					width: 6px;
					height: 6px;

					&:before {
						width: 1px;
					}

					&:after {
						height: 1px;
					}
				}
			}

			&__dotted {
				width: 12px;
				height: 12px;
				font-size: 0.9rem;
				letter-spacing: 1px;
			}

			&__button {
				width: 12px;
				height: 12px;

				&.active {
					transform: scale(1);
				}
			}

			&__active {
				width: 12px;
				height: 12px;
				box-shadow: 0px 2px 10px 0px -getColor("color", 0.4);
				transform: scale(1);

				&.move {
					transform: scale(1.2);
				}
			}
		}
	}
}

.tu-pagination {
	display: flex;
	align-self: center;
	justify-content: center;
	position: relative;
	transition: background-color 0.2s ease;
	&__progress {
		width: calc(100% - 16px);
		height: 3px;
		background: -getColor("gray-3");
		position: absolute;
		bottom: -8px;
		border-radius: 10px;

		.progress {
			width: 0px;
			background: -getColor("color", 1);
			height: 100%;
			position: relative;
			border-radius: inherit;
			transition: all 0.25s ease;
			max-width: 100%;
		}
	}

	&__slot {
		min-height: 36px;
		min-width: 36px;
		position: relative;
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__arrow {
		position: relative;
		width: auto;
		height: 36px;
		min-width: 36px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0px 2px;
		background: -getColor("gray-3");
		transition: all 0.25s ease;
		border: 0px;

		&:disabled {
			opacity: 0.4;
			pointer-events: none;
		}

		&:hover {
			background: -getColor("gray-4");
		}

		i {
			width: 10px;

			position: relative;
			display: block;

			&:before {
				width: 2px;
			}

			&:after {
				height: 2px;
			}
		}
	}

	&__active {
		&.flat {
			background: -getColor("color", 0.15) !important;
			color: -getColor("color", 1) !important;
		}

		background: -getColor("color") !important;
		color: #fff !important;

		&.move {
			transform: scale(1.1);
		}
	}

	&__dotted {
		width: 36px;
		height: 36px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		letter-spacing: 2px;
		margin: 0px 2px;
		cursor: pointer;

		&:hover {
			span.dotted {
				opacity: 0;
				margin-left: -1px;
				transition: all 0.25s ease;
			}

			.con-arrows {
				opacity: 1;
				margin-left: -1px;
				transition: all 0.25s ease;
			}
		}

		&.next {
			&:hover {
				span.dotted {
					opacity: 0;
					margin-left: 1px;
					transition: all 0.25s ease;
				}

				.con-arrows {
					opacity: 1;
					margin-left: 1px;
					transition: all 0.25s ease;
				}
			}
		}

		span.dotted {
			margin-right: -2px;
			text-align: center;
		}

		&.next {
			.con-arrows {
				transform: rotate(180deg);
				margin-left: -5px;
			}
		}

		.con-arrows {
			width: 10px;
			height: 10px;
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 5px;
			opacity: 0;
			transition: all 0.1s ease;

			i {
				width: 10px;
				height: 10px;
				position: relative;
				display: block;
				transform: rotate(-45deg) scale(0.8);

				&:before {
					width: 2px;
				}

				&:after {
					height: 2px;
				}

				&:last-child {
					position: absolute;
					top: 0px;
					margin-left: 6px;
				}
			}
		}
	}

	&__button {
		width: 36px;
		height: 36px;
		border-radius: 12px;
		padding: 0px;
		background: -getColor("gray-3");
		margin: 0px 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		transition: all 0.25s ease;
		color: -getColor("text");
		position: relative;
		border: 0px;

		&.loading {
			border-radius: 50%;
			opacity: 0.5;
			pointer-events: none;
			user-select: none;

			&:after {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				border: 2px solid -getColor("color", 1);
				border-top: 2px solid -getColor("background", 0);
				border-left: 2px solid -getColor("background", 0);
				border-bottom: 2px solid -getColor("background", 0);
				box-sizing: border-box;
				transition: all 0.25s ease;
				display: block;
				box-shadow: 0px 0px 0px 0px -getColor("color", 1);
				animation: loadingPagination 0.6s ease infinite;
			}

			&:before {
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				border: 2px dashed -getColor("color", 1);
				border-top: 2px solid -getColor("background", 0);
				border-left: 2px solid -getColor("background", 0);
				border-bottom: 2px solid -getColor("background", 0);
				box-sizing: border-box;
				transition: all 0.25s ease;
				display: block;
				box-shadow: 0px 0px 0px 0px -getColor("color", 1);
				animation: loadingPagination 0.6s linear infinite;
			}
		}

		&.disabled {
			opacity: 0.4;
			pointer-events: none;
			user-select: none;
		}

		&:hover {
			background: -getColor("gray-4");
		}

		&:active {
			transform: scale(0.9);
		}
	}
}

@keyframes loadingPagination {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
