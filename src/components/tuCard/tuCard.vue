<template>
	<div class="tu-card-content" :class="{
		[`type-${type}`]: true,
		fillParent: fillParent
	}">
		<div class="tu-card" :class="{
			fitContent: fitContent,
			content: content,
			fillParent: fillParent
		}" v-bind="$attrs">
			<div v-if="type == '6'" class="tu-card__header" :style="{
				'justify-content': justifyHeader
			}">
				<slot name="header" />
			</div>
			<div v-if="$slots.content" :class="['tu-card__content']" :style="{
				'background-color': backgroundColor
			}">
				<slot name="content" />
				<div v-if="$slots.interactions" class="tu-card__interactions">
					<slot name="interactions" />
				</div>
			</div>
			<div v-if="$slots.text" class="tu-card__text">
				<div v-if="$slots.title" class="tu-card__title">
					<slot name="title" />
				</div>
				<slot name="text" />
			</div>
			<div v-if="$slots.buttons" class="tu-card__buttons">
				<slot name="buttons" />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "TuCard",
	props: {
		type: {
			default: "1",
			type: [String, Boolean]
		},
		justifyHeader: {
			type: String,
			default: "flex-end"
		},
		content: { type: Boolean, default: false },
		fitContent: { type: Boolean, default: false },
		fillParent: { type: Boolean, default: false },
		backgroundColor: { type: String, default: "0x00000011" }
	},
	setup(props, context) { }
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";
@import "../../style/sass/root";

.tu-card-content {
	--tu-color: var(--tu-primary);

	&.fillParent {
		width: 100% !important;
		height: 100% !important;
	}

	&.type-5 {
		.tu-card {
			box-shadow: none;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			&:hover {
				.tu-card__interactions {
					bottom: 50px;
				}

				.tu-card__text {
					transform: translate(0);
					opacity: 1;
					box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, -var("shadow-opacity"));
				}

				.tu-card__content {
					border-radius: 6px 40px 6px 40px;

					img {
						transform: scale(1.1);
					}
				}
			}

			&__content {
				border-radius: 6px 20px 6px 20px;
			}

			&__interactions {
				bottom: 6px;
				transition: all 0.25s ease;
				z-index: 20;
			}

			&__text {
				background: -getColor("background");
				box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, -var("shadow-opacity"));
				border-radius: 6px 20px 6px 20px;
				margin-top: -50px;
				z-index: 10;
				position: relative;
				width: calc(100% - 30px);
				padding-top: 10px;
				transition: all 0.25s ease;
				transform: translate(0, 25px);
				opacity: 0;
			}
		}
	}

	&.type-4 {
		.tu-card {
			box-shadow: none;
			max-width: 300px;

			&:hover {
				transform: translate(0, -5px);

				.tu-card__content {
					img {
						transform: scale(1);
					}
				}

				.tu-card__text {
					padding-top: 15px;
					padding-bottom: 25px;
				}
			}

			&__content {
				align-items: center;
				max-height: 600px;

				img {
					transform: scale(1.2);
				}
			}

			&__interactions {
				top: 0px;
				bottom: auto;
			}

			&__text {
				background: -getColorAlpha("background", 0.8);
				position: absolute;
				bottom: 0px;
				backdrop-filter: saturate(180%) blur(20px);
				border-radius: 0px 0px 20px 20px;
				transition: all 0.25s ease;

				p {
					opacity: 1;
				}
			}
		}
	}

	&.type-3 {
		.tu-card {
			display: flex;
			max-width: 400px;

			&:hover:not(.content) {
				transform: scale(1.04);
			}

			&__content {
				img {
					min-width: 200px;
				}
			}

			&__text {
				padding-top: 15px;
			}

			&__title {

				h2,
				h3,
				h4,
				h5,
				h6 {
					padding: 0px;
				}
			}
		}
	}

	&.type-2 {
		.tu-card {
			box-shadow: none;
			overflow: hidden;

			&:hover {
				&:not(.content) {
					transform: scale(0.95);
				}

				.tu-card__content {
					img {
						transform: scale(1.15);
					}
				}

				.tu-card__text {
					transform: translate(0);
					opacity: 1;
					color: #fff;
				}
			}

			&__interactions {
				right: 0px;
				top: 0px;
				left: auto;
				bottom: auto;
				align-items: flex-end;
			}

			&__title {
				position: relative;
				color: inherit;
				padding: 0px;

				h2,
				h3,
				h4,
				h5,
				h6 {
					padding: 0px;
					padding-bottom: 5px;
				}
			}

			&__text {
				position: absolute;
				bottom: 0px;
				background: -getColorAlpha("background", 0.9);
				padding-top: 30px;
				border-radius: 0px 0px 20px 20px;
				background: linear-gradient(180deg,
						transparent 0%,
						rgba(0, 0, 0, 0.5) 100%);
				color: transparent;
				font-size: 0.9rem;
				transform: translate(0, 45%);
				transition: all 0.25s ease;

				p {
					opacity: 1;
				}
			}
		}
	}

	&.type-1 {
		.tu-card {
			&:hover {
				box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, -var("shadow-opacity"));

				&:not(.content) {
					transform: translate(0, 5px);
				}

				.tu-card__content {
					img {
						transform: scale(1.15);
					}
				}
			}
		}
	}

	&.type-6 {
		.tu-card {
			display: flex;
			flex-direction: column;

			&__content {
				flex-grow: 1;
				align-items: center;
			}

			&__text {
				bottom: 0;
				display: flex;
				flex-direction: column;
				width: 100%;

				.tu-card__title {
					display: flex;
				}
			}

			&:hover {
				&:not(.content) {
					transform: translate(0, 5px);
				}

				.tu-card__content {
					img {
						transform: scale(1.15);
					}
				}
			}
		}
	}
}

.tu-card {
	background: -getColor("background");
	color: -getColor("text");
	width: 100%;

	&:not(.fitContent):not(.fillParent) {
		max-width: 350px;
	}

	box-shadow: -var("elevated-2");
	border-radius: 20px;
	transition: all 0.25s ease;
	cursor: pointer;
	position: relative;

	&__text {
		font-size: 0.85rem;
		padding: 0px 15px;
		padding-bottom: 15px;

		p {
			font-size: inherit;
			margin: 0px;
			opacity: 0.8;
		}
	}

	&__title {
		padding-top: 10px;
		padding-bottom: 5px;

		h2,
		h3,
		h4,
		h5,
		h6 {
			padding: 0px;
			margin: 0px;
			font-size: 1.1rem;
		}
	}

	&__header {
		display: flex;

		padding: 5px;
	}

	&__interactions {
		position: absolute;
		bottom: 0px;
		padding: 5px 10px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		left: 0px;
	}

	&__content {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		transition: all 0.25s ease;

		img {
			width: 100%;
			border-radius: 20px;
			display: block;
			transition: all 0.25s ease;
		}
	}

	&.content {
		.tu-card__content {
			overflow: auto;
			cursor: default;
		}
	}

	&:not(.fitContent):not(.fillParent) {
		.tu-card__content {
			max-height: 250px;
		}
	}

	&.fillParent {
		width: 100% !important;
		height: 100% !important;
	}

	&.fitContent {
		.tu-card__content {
			padding: 5px;
		}
	}
}
</style>
