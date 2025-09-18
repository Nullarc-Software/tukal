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
<script setup lang="ts">
defineOptions({
	name: "TuCard"
});

interface Props {
	type?: string | boolean;
	justifyHeader?: string;
	content?: boolean;
	fitContent?: boolean;
	fillParent?: boolean;
	backgroundColor?: string;
}

withDefaults(defineProps<Props>(), {
	type: "1",
	justifyHeader: "flex-end",
	content: false,
	fitContent: false,
	fillParent: false,
	backgroundColor: "0x00000011"
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";
@import "../../style/sass/_tokens";

// Dark theme support
.tu-dark-theme .tu-card {
	background: getColor("component-background") !important;
	border-color: getColorAlpha("text", 0.12);
}

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
					box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));
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
				background: getColor("background-component");
				box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));
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
				background: getColorAlpha("background", 0.8);
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
				background: getColorAlpha("background", 0.9);
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
				box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));

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

// Enhanced main card component using design tokens
.tu-card {
	background: getColor("component-background");
	color: getColor("text");
	width: 100%;
	border-radius: map-get($border-radius, 'xl');
	box-shadow: map-get($shadow, 'md');
	transition: all map-get($transition, 'slow');
	cursor: pointer;
	position: relative;
	border: 1px solid getColorAlpha("text", 0.08);

	// Enhanced size constraints
	&:not(.fitContent):not(.fillParent) {
		max-width: 350px;
	}

	// Enhanced accessibility
	&:focus-visible {
		outline: 2px solid var(--tu-primary, #2563eb);
		outline-offset: 2px;
	}

	// Enhanced text content styling
	&__text {
		font-size: map-get($font-size, 'sm');
		padding: 0 map-get($spacing, 'md');
		padding-bottom: map-get($spacing, 'md');
		line-height: 1.5;

		p {
			font-size: inherit;
			margin: 0;
			opacity: 0.85;
			line-height: inherit;
		}
	}

	// Enhanced title styling
	&__title {
		padding-top: map-get($spacing, 'sm');
		padding-bottom: map-get($spacing, 'xs');

		h2, h3, h4, h5, h6 {
			padding: 0;
			margin: 0;
			font-size: map-get($font-size, 'lg');
			font-weight: 600;
			color: getColor("text");
			line-height: 1.3;
		}
	}

	// Enhanced header styling
	&__header {
		display: flex;
		padding: map-get($spacing, 'xs');
		border-bottom: 1px solid getColorAlpha("text", 0.08);
	}

	// Enhanced interactions styling
	&__interactions {
		position: absolute;
		bottom: 0;
		padding: map-get($spacing, 'xs') map-get($spacing, 'sm');
		display: flex;
		align-items: center;
		justify-content: flex-start;
		left: 0;
		background: getColorAlpha("background", 0.9);
		backdrop-filter: blur(4px);
		border-radius: 0 0 map-get($border-radius, 'xl') map-get($border-radius, 'xl');
		transition: all map-get($transition, 'fast');
	}

	// Enhanced content styling
	&__content {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: map-get($border-radius, 'xl');
		transition: all map-get($transition, 'slow');

		img {
			width: 100%;
			border-radius: map-get($border-radius, 'xl');
			display: block;
			transition: all map-get($transition, 'slow');
			object-fit: cover;
		}
	}

	// Enhanced button area styling
	&__buttons {
		padding: map-get($spacing, 'md');
		border-top: 1px solid getColorAlpha("text", 0.08);
		display: flex;
		gap: map-get($spacing, 'sm');
		align-items: center;
		justify-content: flex-end;
	}

	// Content variant styling
	&.content {
		.tu-card__content {
			overflow: auto;
			cursor: default;
			padding: map-get($spacing, 'sm');

			// Enhanced scrollbar
			&::-webkit-scrollbar {
				width: 4px;
				height: 4px;
			}

			&::-webkit-scrollbar-track {
				background: transparent;
			}

			&::-webkit-scrollbar-thumb {
				background: getColorAlpha("text", 0.2);
				border-radius: map-get($border-radius, 'sm');

				&:hover {
					background: getColorAlpha("text", 0.3);
				}
			}
		}
	}

	// Size constraint for content
	&:not(.fitContent):not(.fillParent) {
		.tu-card__content {
			max-height: 250px;
		}
	}

	// Fill parent variant
	&.fillParent {
		width: 100% !important;
		height: 100% !important;
	}

	// Fit content variant
	&.fitContent {
		.tu-card__content {
			padding: map-get($spacing, 'xs');
		}
	}

	// Enhanced hover states for accessibility
	&:hover {
		transform: translateY(-2px);
		box-shadow: map-get($shadow, 'lg');
	}

	&:active {
		transform: translateY(0);
	}
}

// Motion preference support
@media (prefers-reduced-motion: reduce) {
	.tu-card,
	.tu-card *,
	.tu-card-content,
	.tu-card-content * {
		transition: none !important;
		animation: none !important;
		transform: none !important;
	}
	
	.tu-card:hover {
		transform: none !important;
	}
}

// High contrast mode support
@media (prefers-contrast: high) {
	.tu-card {
		border: 2px solid currentColor;
	}
}

// Touch device optimizations
@media (hover: none) and (pointer: coarse) {
	.tu-card {
		&:hover {
			transform: none;
		}
		
		&__content img:hover {
			transform: none;
		}
	}
}
</style>

