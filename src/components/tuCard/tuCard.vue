<template>
	<div class="tu-card-content" :class="{
		[`tu-card-content--type-${type}`]: true,
		'tu-card-content--fill-parent': fillParent
	}">
		<div class="tu-card" :class="{
			'tu-card--fit-content': fitContent,
			'tu-card--content': content,
			'tu-card--fill-parent': fillParent
		}" v-bind="$attrs">
			<!-- Header slot (used by type 6) -->
			<div v-if="$slots.header" class="tu-card__header" :style="{
				'justify-content': justifyHeader
			}">
				<slot name="header" />
			</div>
			
			<!-- Content slot -->
			<div v-if="$slots.content" class="tu-card__content" :style="{
				'background-color': backgroundColor
			}">
				<slot name="content" />
				<div v-if="$slots.interactions" class="tu-card__interactions">
					<slot name="interactions" />
				</div>
			</div>
			
			<!-- Text slot -->
			<div v-if="$slots.text" class="tu-card__text">
				<div v-if="$slots.title" class="tu-card__title">
					<slot name="title" />
				</div>
				<slot name="text" />
			</div>
			
			<!-- Buttons slot -->
			<div v-if="$slots.buttons" class="tu-card__buttons">
				<slot name="buttons" />
			</div>
			
			<!-- Default slot for card body content -->
			<div v-if="$slots.default" class="tu-card__body">
				<slot />
			</div>
			
			<!-- Footer slot -->
			<div v-if="$slots.footer" class="tu-card__footer">
				<slot name="footer" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: "TuCard"
});

interface Props {
	type?: string | number;
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
	backgroundColor: "transparent"
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

// Card content wrapper with type variations
.tu-card-content {
	--tu-color: var(--tu-primary);

	// Modifier: Fill parent
	&--fill-parent {
		width: 100% !important;
		height: 100% !important;
	}

	// Type 1: Standard card with simple hover effects
	&--type-1 {
		.tu-card {
			&:hover {
				box-shadow: shadow('lg');
				// Removed transform animation as requested

				.tu-card__content img {
					transform: scale(1.05);
				}
			}
		}
	}

	// Type 2: Overlay text card
	&--type-2 {
		.tu-card {
			box-shadow: none;
			overflow: hidden;

			&:hover {
				&:not(.tu-card--content) {
					transform: scale(0.98);
				}

				.tu-card__content img {
					transform: scale(1.1);
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

				h2, h3, h4, h5, h6 {
					padding: 0px;
					padding-bottom: spacing('xs');
				}
			}

			&__text {
				position: absolute;
				bottom: 0px;
				padding-top: spacing('lg');
				border-radius: 0px 0px border-radius('xl') border-radius('xl');
				background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
				color: transparent;
				font-size: font-size('sm');
				transform: translate(0, 45%);
				transition: all transition('base');

				p {
					opacity: 1;
				}
			}
		}
	}

	// Type 3: Horizontal layout card
	&--type-3 {
		.tu-card {
			display: flex;
			max-width: 400px;

			&:hover:not(.tu-card--content) {
				transform: scale(1.02);
			}

			&__text {
				padding-top: spacing('md');
			}

			&__title {
				h2, h3, h4, h5, h6 {
					padding: 0px;
				}
			}
		}
	}

	// Type 4: Bottom overlay card
	&--type-4 {
		.tu-card {
			box-shadow: none;
			max-width: 300px;

			&:hover {
				.tu-card__content img {
					transform: scale(1);
				}

				.tu-card__text {
					padding-top: spacing('md');
					padding-bottom: spacing('lg');
				}
			}

			&__content {
				align-items: center;
				max-height: 600px;

				img {
					transform: scale(1.1);
				}
			}

			&__interactions {
				top: 0px;
				bottom: auto;
			}

			&__text {
				background: getColorAlpha("background", 0.9);
				position: absolute;
				bottom: 0px;
				backdrop-filter: saturate(180%) blur(20px);
				border-radius: 0px 0px border-radius('xl') border-radius('xl');
				transition: all transition('base');

				p {
					opacity: 1;
				}
			}
		}
	}

	// Type 5: Animated card with sliding text
	&--type-5 {
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
					box-shadow: shadow('lg');
				}

				.tu-card__content {
					border-radius: border-radius('md') border-radius('xl') border-radius('md') border-radius('xl');

					img {
						transform: scale(1.05);
					}
				}
			}

			&__content {
				border-radius: border-radius('md') border-radius('lg') border-radius('md') border-radius('lg');
			}

			&__interactions {
				bottom: spacing('xs');
				transition: all transition('base');
				z-index: z-index('elevated');
			}

			&__text {
				background: getColor("component-background");
				box-shadow: shadow('none');
				border-radius: border-radius('md') border-radius('lg') border-radius('md') border-radius('lg');
				margin-top: -50px;
				z-index: z-index('base');
				position: relative;
				width: calc(100% - 30px);
				padding-top: spacing('sm');
				transition: all transition('base');
				transform: translate(0, 25px);
				opacity: 0;
			}
		}
	}

	// Type 6: Column layout card with header
	&--type-6 {
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
				// Removed transform animation as requested
				.tu-card__content img {
					transform: scale(1.05);
				}
			}
		}
	}
}

// Main card component using BEM methodology
.tu-card {
	background: getColor("component-background");
	color: getColor("text");
	width: 100%;
	border-radius: border-radius('xl');
	box-shadow: shadow('md');
	transition: all transition('base');
	cursor: pointer;
	position: relative;
	border: 1px solid getColorAlpha("text", 0.08);

	// Modifier: Not fit content and not fill parent
	&:not(.tu-card--fit-content):not(.tu-card--fill-parent) {
		max-width: 350px;
	}

	// Enhanced accessibility with modern focus ring
	@include focus-ring();

	// Element: Header
	&__header {
		display: flex;
		padding: spacing('xs');
		border-bottom: 1px solid getColorAlpha("text", 0.08);
	}

	// Element: Content
	&__content {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: border-radius('xl');
		transition: all transition('base');

		img {
			width: 100%;
			border-radius: border-radius('xl');
			display: block;
			transition: all transition('base');
			object-fit: cover;
		}
	}

	// Element: Interactions
	&__interactions {
		position: absolute;
		bottom: 0px;
		padding: spacing('xs') spacing('sm');
		display: flex;
		align-items: center;
		justify-content: flex-start;
		left: 0px;
		border-radius: 0 0 border-radius('xl') border-radius('xl');
		transition: all transition('fast');
	}

	// Element: Text
	&__text {
		font-size: font-size('sm');
		padding: 0 spacing('md');
		padding-bottom: spacing('md');
		line-height: map-get($line-height, 'normal');

		p {
			font-size: inherit;
			margin: 0;
			opacity: 0.85;
			line-height: inherit;
		}
	}

	// Element: Title
	&__title {
		padding-top: spacing('sm');
		padding-bottom: spacing('xs');

		h2, h3, h4, h5, h6 {
			padding: 0;
			margin: 0;
			font-size: font-size('lg');
			font-weight: font-weight('semibold');
			color: getColor("text");
			line-height: map-get($line-height, 'tight');
		}
	}

	// Element: Buttons
	&__buttons {
		padding: spacing('md');
		border-top: 1px solid getColorAlpha("text", 0.08);
		display: flex;
		gap: spacing('sm');
		align-items: center;
		justify-content: flex-end;
	}

	// Element: Body (default slot)
	&__body {
		padding: spacing('md');
		
		img {
			width: 100%;
			height: auto;
			border-radius: border-radius('lg');
			display: block;
			margin-bottom: spacing('sm');
		}
		
		p {
			margin: 0;
			font-size: font-size('sm');
			line-height: map-get($line-height, 'normal');
			color: getColor("text");
			opacity: 0.85;
		}
	}

	// Element: Footer
	&__footer {
		padding: spacing('md');
		border-top: 1px solid getColorAlpha("text", 0.08);
		background: getColorAlpha("background", 0.5);
	}

	// Modifier: Content scrollable
	&--content {
		.tu-card__content {
			overflow: auto;
			cursor: default;
			padding: spacing('sm');

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
				border-radius: border-radius('sm');
			}

			&::-webkit-scrollbar-thumb:hover {
				background: getColorAlpha("text", 0.3);
			}
		}
	}

	// Modifier: Fill parent
	&--fill-parent {
		width: 100% !important;
		height: 100% !important;
	}

	// Modifier: Fit content
	&--fit-content {
		.tu-card__content {
			padding: spacing('xs');
		}
	}

	// Content size constraints
	&:not(.tu-card--fit-content):not(.tu-card--fill-parent) {
		.tu-card__content {
			max-height: 250px;
		}
	}

	// Enhanced hover states for accessibility
	&:hover {
		box-shadow: shadow('lg');
	}
}

// Apply motion preferences globally to card
@media (prefers-reduced-motion: reduce) {
	.tu-card,
	.tu-card__content,
	.tu-card__text,
	.tu-card__interactions {
		transition: none !important;
		transform: none !important;
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		scroll-behavior: auto !important;
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

