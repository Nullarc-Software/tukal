<template>
	<div 
		class="tu-tag"
		@click="onTagClicked"
		:class="[
			`tu-tag--size-${size}`,
			{
				'tu-tag--flat': flat,
				'tu-tag--active': active
			}
		]"
		:style="{
			'--tu-color': color ? getColor(color) : getColor('primary'),
			'--tu-color-rgb': color ? getColorAsRgb(color) : getColorAsRgb('primary'),
			'--tu-text-color': textColor || '#ffffff'
		}"
		:tabindex="undefined"
		:role="undefined"
		@keydown.enter="onTagClicked"
		@keydown.space.prevent="onTagClicked"
	>
		<!-- Key-value format when both name and value are provided -->
		<template v-if="name && value">
			<div class="tu-tag__key">
				{{ name }}
			</div>
			<div class="tu-tag__separator">
				:
			</div>
			<div class="tu-tag__value">
				{{ value }}
			</div>
		</template>
		
		<!-- Simple content format when using slots or only name -->
		<template v-else>
			<div class="tu-tag__content">
				<slot>{{ name }}</slot>
			</div>
		</template>
	</div>
</template>
<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import { Router } from "vue-router";
import { getColor, getColorAsRgb } from "../../utils";

defineOptions({
	name: "TuTag"
});

type TagSize = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
	flat?: boolean;
	name?: string;
	value?: string;
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
	size?: TagSize;
}

const props = withDefaults(defineProps<Props>(), {
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff",
	size: "md"
});

const emit = defineEmits<{
	onTagClicked: [];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const getColorSecondary = ref<string>("");

onMounted(() => {
	getColorSecondary.value = getColor(props.colorSecondary || "rgb(130, 207, 23)");
});

function onTagClicked() {
	emit("onTagClicked");
}
</script>

<style lang="scss">
@import "../../style/sass/_functions";

.tu-tag {
	--tu-tag-text-color: #ffffff;
	--tu-tag-text-color-rgb: 255, 255, 255;
	
	display: inline-flex;
	align-items: center;
	background: var(--tu-color, var(--tu-primary));
	color: var(--tu-text-color, #ffffff);
	border-radius: border-radius('full');
	cursor: pointer;
	transition: transition('base');
	border: none;
	
	// Default size (md)
	padding: spacing('xs') spacing('sm');
	font-size: font-size('sm');
	gap: spacing('xs');
	
	// Focus states for accessibility
	@include focus-ring();
	
	// Hover state
	&:hover:not(&--flat) {
		transform: translateY(-1px);
		box-shadow: shadow('sm');
	}
	
	// Size variants using BEM modifiers
	&--size-xs {
		padding: spacing('xs') spacing('xs');
		font-size: font-size('xs');
		gap: 2px;
	}
	
	&--size-sm {
		padding: spacing('xs') spacing('sm');
		font-size: font-size('xs');
		gap: spacing('xs');
	}
	
	&--size-md {
		padding: spacing('xs') spacing('sm');
		font-size: font-size('sm');
		gap: spacing('xs');
	}
	
	&--size-lg {
		padding: spacing('sm') spacing('md');
		font-size: font-size('base');
		gap: spacing('xs');
	}
	
	&--size-xl {
		padding: spacing('sm') spacing('lg');
		font-size: font-size('lg');
		gap: spacing('sm');
	}
	
	// Flat variant
	&--flat {
		background: rgba(var(--tu-color-rgb, var(--tu-primary-rgb)), 0.15);
		color: var(--tu-color, var(--tu-primary));
		
		&:hover {
			background: rgba(var(--tu-color-rgb, var(--tu-primary-rgb)), 0.25);
			transform: none;
			box-shadow: none;
		}
	}
	
	// Active state
	&--active {
		background: var(--tu-color, var(--tu-primary));
		color: var(--tu-text-color, #ffffff);
		box-shadow: shadow('sm');
	}
	
	// Interactive hover states
	&:hover {
		opacity: 0.9;
	}
	
	&:active {
		transform: translateY(0);
		box-shadow: shadow('xs');
	}
}

.tu-tag__key {
	font-weight: font-weight('medium');
	line-height: 1;
}

.tu-tag__value {
	font-weight: font-weight('semibold');
	line-height: 1;
}

.tu-tag__separator {
	opacity: 0.7;
	line-height: 1;
}

.tu-tag__content {
	font-weight: font-weight('medium');
	line-height: 1;
	display: flex;
	align-items: center;
	gap: spacing('xs');
}

// Respect motion preferences
@media (prefers-reduced-motion: reduce) {
	.tu-tag {
		transition: none;
		
		&:hover {
			transform: none;
		}
		
		&--clickable:active {
			transform: none;
		}
	}
}
</style>

