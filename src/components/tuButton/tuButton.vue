<template>
	<button 
		:class="buttonClasses"
		:style="buttonStyles"
		v-bind="$attrs" 
		v-on="listeners" 
		ref="button"
	>
		<div class="tu-button__content">
			<slot />
		</div>
		<div v-if="$slots.animate" :class="[
			'tu-button__animate',
			`tu-button__animate--${animationType}`
		]">
			<slot name="animate" />
		</div>
		<div v-if="loading" class="tu-button__loading"></div>
	</button>
</template>

<script setup lang="ts">
import { computed, ref, inject } from "vue";
import { ComponentConstants } from "../tuComponent";
import ripple, { rippleCut, rippleReverse } from "../../utils/ripple";


defineOptions({
	name: "TuButton",
	inheritAttrs: false
});

interface Props {
	// Appearance
	color?: "primary" | "success" | "danger" | "warn" | "dark";
	variant?: "solid" | "flat" | "outline" | "gradient" | "relief" | "shadow" | "floating";
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	
	// Shape
	circle?: boolean;
	square?: boolean;
	
	// Layout
	block?: boolean;
	inline?: boolean;
	icon?: boolean;
	width?: string;
	height?: string;
	
	// States
	active?: boolean;
	loading?: boolean;
	disabled?: boolean;
	
	// Navigation
	to?: Record<string, unknown> | string;
	href?: string;
	blank?: boolean;
	
	// Button Group
	value?: string | number; // Used for identification in mutually exclusive button groups
	
	// Legacy props (for backward compatibility)
	flat?: boolean; // maps to variant="flat"
	border?: boolean; // maps to variant="outline"
	gradient?: boolean; // maps to variant="gradient"
	relief?: boolean; // maps to variant="relief"
	transparent?: boolean; // maps to variant="flat"
	shadow?: boolean; // maps to variant="shadow"
	floating?: boolean; // maps to variant="floating"
	
	// Legacy color props (for backward compatibility)
	primary?: boolean; // maps to color="primary"
	success?: boolean; // maps to color="success"
	danger?: boolean; // maps to color="danger"
	warn?: boolean; // maps to color="warn"
	dark?: boolean; // maps to color="dark"
	
	// Advanced styling (rarely used)
	colorSecondary?: string;
	textColor?: string;
	ripple?: string;
	activeDisabled?: boolean;
	upload?: boolean;
	animationType?: string;
	animateInactive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	// Appearance
	color: "primary",
	variant: "solid",
	size: "md",
	
	// Shape
	circle: false,
	square: false,
	
	// Layout
	block: false,
	inline: false,
	icon: false,
	width: undefined,
	height: undefined,
	
	// States
	active: false,
	loading: false,
	disabled: false,
	
	// Navigation
	to: undefined,
	href: undefined,
	blank: false,
	
	// Button Group
	value: undefined,
	
	// Legacy props
	flat: false,
	border: false,
	gradient: false,
	relief: false,
	transparent: false,
	shadow: false,
	floating: false,
	
	// Legacy color props
	primary: false,
	success: false,
	danger: false,
	warn: false,
	dark: false,
	
	// Advanced
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff",
	ripple: "",
	activeDisabled: false,
	upload: false,
	animationType: "scale",
	animateInactive: true,
});

const emit = defineEmits<{
	routeErr: [error: Error];
	mouseover: [event: MouseEvent];
	mouseout: [event: MouseEvent];
	blur: [event: FocusEvent];
	click: [event: MouseEvent];
}>();

const rippleDir = ref("");
const button = ref<HTMLButtonElement>();

// Button group integration
const buttonGroup = inject<{
	mutuallyExclusive: boolean;
	selectedButton: { value: number | string | null };
	selectButton: (buttonId: number | string) => void;
	isSelected: (buttonId: number | string) => boolean;
} | null>("buttonGroup", null);

// Generate a unique ID for this button instance if none provided
const buttonId = computed(() => {
	if (props.value !== undefined) return props.value;
	// Fallback to instance uid if available, or generate a simple ID
	return Math.random().toString(36).substr(2, 9);
});

// Check if this button is selected in a mutually exclusive button group
const isSelectedInGroup = computed(() => {
	if (!buttonGroup || !buttonGroup.mutuallyExclusive) return false;
	return buttonGroup.isSelected(buttonId.value);
});

// Determine final active state (either from prop or button group selection)
const isActive = computed(() => {
	if (buttonGroup && buttonGroup.mutuallyExclusive)
		return isSelectedInGroup.value;
	return props.active;
});

// Simplified computed properties
const buttonClasses = computed(() => {
	const classes = ["tu-button"];
	
	// Determine color (explicit color prop takes precedence over legacy boolean props)
	let buttonColor = props.color;
	if (!buttonColor || buttonColor === "primary") {
		if (props.success) buttonColor = "success";
		else if (props.danger) buttonColor = "danger";
		else if (props.warn) buttonColor = "warn";
		else if (props.dark) buttonColor = "dark";
		else if (props.primary) buttonColor = "primary";
	}
	
	// Color variant
	if (buttonColor && ["primary", "success", "danger", "warn", "dark"].includes(buttonColor))
		classes.push(`tu-button--${buttonColor}`);
	
	// Size
	if (props.size)
		classes.push(`tu-button--${props.size}`);
	
	// Style variant (only one should be active)
	const styleVariant = getStyleVariant();
	if (styleVariant)
		classes.push(`tu-button--${styleVariant}`);
	
	// Shape
	if (props.circle) classes.push("tu-button--circle");
	if (props.square) classes.push("tu-button--square");
	
	// States
	if (isActive.value) classes.push("tu-button--active");
	if (props.loading) classes.push("tu-button--loading");
	if (props.block) classes.push("tu-button--block");
	if (props.icon) classes.push("tu-button--icon");
	if (props.inline) classes.push("tu-button--inline");
	
	return classes;
});

const buttonStyles = computed(() => {
	const styles: Record<string, string> = {};
	
	if (props.width) styles.width = props.width;
	if (props.height) styles.height = props.height;
	
	return styles;
});

// Helper to determine the primary style variant
const getStyleVariant = () => {
	// Use explicit variant prop if provided
	if (props.variant && props.variant !== "solid") return props.variant;
	
	// Fall back to legacy props for backward compatibility
	if (props.flat) return "flat";
	if (props.transparent) return "transparent";
	if (props.border) return "outline";
	if (props.gradient) return "gradient";
	if (props.relief) return "relief";
	if (props.shadow) return "shadow";
	if (props.floating) return "floating";
	
	return "solid"; // default
};

const clickButton = function (event: MouseEvent) {
	// Handle button group selection if in a mutually exclusive group
	if (buttonGroup && buttonGroup.mutuallyExclusive)
		buttonGroup.selectButton(buttonId.value);
	
	if (props.to)
		ComponentConstants.router.push(props.to);
	else if (props.href)
		window.open(props.href, (props.blank && "_blank") || "_self");
	emit("click", event);
};

const mousedown = (event: MouseEvent) => {
	if (rippleDir.value === "reverse")
		rippleReverse(event);
	else if (rippleDir.value === "cut")
		rippleCut(event);
	else {
		// Determine the current button color for ripple effect
		let rippleColor = props.color;
		if (props.success) rippleColor = "success";
		else if (props.danger) rippleColor = "danger";
		else if (props.warn) rippleColor = "warn";
		else if (props.dark) rippleColor = "dark";
		else if (props.primary) rippleColor = "primary";
		
		// Apply ripple effect based on button variant
		const isFlat = props.flat || props.transparent || getStyleVariant() === "flat";
		const isBorder = props.border || getStyleVariant() === "outline";
		
		if (isFlat) {
			// Flat buttons: use colored ripple with full opacity
			ripple(
				event,
				rippleColor,
				true // Use full color opacity for the ripple
			);
		}
		else if (isBorder) {
			// Border/outline buttons: use colored ripple
			ripple(event, rippleColor, true);
		}
		else {
			// Solid buttons: use light ripple (null = white ripple)
			ripple(event, null, false);
		}
	}
};

const listeners = computed(() => {
	return {
		click: (event: MouseEvent) => clickButton(event),
		mousedown: (event: MouseEvent) => mousedown(event)
	};
});


</script>

<style lang="scss">
@use "../../style/sass/_functions" as *;
@use "../../style/sass/_tokens" as *;

.tu-button {
	// Base styles
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: spacing('xs');
	
	// Typography
	font-weight: font-weight('medium');
	text-decoration: none;
	user-select: none;
	
	// Layout
	border: 0;
	border-radius: border-radius('lg');
	cursor: pointer;
	position: relative;
	overflow: hidden;
	margin: spacing('xs');
	
	// Default size
	@include button-size('md');
	
	// Transitions and animations
	transition: all transition('fast');
	
	// Default solid primary style - using direct CSS custom properties
	background: var(--tu-primary);
	color: white;
	
	// Focus state
	@include focus-ring;
	
	// Hover effect
	&:hover:not(:disabled) {
		background: rgba(var(--tu-primary-rgb), 0.9);
		transform: translateY(-1px);
		box-shadow: shadow('md');
	}
	
	// Disabled state
	&:disabled,
	&[aria-disabled="true"] {
		opacity: 0.6;
		cursor: not-allowed;
		pointer-events: none;
		transform: none !important;
		box-shadow: none !important;
	}
	
	// Size variants
	&--xs { @include button-size('xs'); }
	&--sm { @include button-size('sm'); }
	&--lg { @include button-size('lg'); }
	&--xl { 
		@include button-size('xl'); 
		border-radius: border-radius('xl');
	}
	
	// Shape variants
	&--circle { border-radius: border-radius('full'); }
	&--square { border-radius: 0; }
	
	//Ripple 
	&.ripple-anim {
		color: rgb(var(--tu-button-text-color)) !important;
	}


	// Style variants
	&--flat {
		background: rgba(var(--tu-primary-rgb), 0.1);
		color: var(--tu-primary);
		
		&:hover:not(:disabled) {
			background: rgba(var(--tu-primary-rgb), 0.3);
			transform: none;
			box-shadow: none;
		}
	}

	&--transparent {
		background: transparent;
		color: var(--tu-primary);
		box-shadow: 0px 0px 15px -7px rgba(var(--tu-primary-rgb), 0.5);
		
		&:hover:not(:disabled) {
			background: transparent;
			transform: none;
			box-shadow: none;
		}
	}
	
	&--outline {
		background: transparent;
		color: var(--tu-primary);
		border: 1px solid var(--tu-primary);
		
		&:hover:not(:disabled) {
			background: transparent;
			transform: translateY(-1px);
			box-shadow: shadow('md');
		}
	}
	
	&--gradient {
		background: linear-gradient(135deg, var(--tu-primary), rgba(var(--tu-primary-rgb), 0.8));
		
		&:hover:not(:disabled) {
			transform: translateY(-2px);
			box-shadow: shadow('lg');
		}
	}
	
	&--relief {
		box-shadow: 0 4px 0 rgba(var(--tu-primary-rgb), 0.8);
		
		&:active:not(:disabled) {
			transform: translateY(2px);
			box-shadow: 0 2px 0 rgba(var(--tu-primary-rgb), 0.8);
		}
	}
	
	&--shadow {
		box-shadow: shadow('sm');
		
		&:hover:not(:disabled) {
			box-shadow: shadow('md');
		}
	}
	
	&--floating {
		box-shadow: shadow('lg');
		
		&:hover:not(:disabled) {
			transform: translateY(-4px);
			box-shadow: shadow('xl');
		}
	}
	
	// Color variants - override CSS custom properties
	&--success {
		background: var(--tu-success);
		
		&:hover:not(:disabled) {
			background: rgba(var(--tu-success-rgb), 0.9);
		}
		
		&.tu-button--flat {
			background: rgba(var(--tu-success-rgb), 0.1);
			color: var(--tu-success);
			
			&:hover:not(:disabled) {
				background: rgba(var(--tu-success-rgb), 0.3);
			}
		}
		
		&.tu-button--outline {
			background: transparent;
			color: var(--tu-success);
			border-color: var(--tu-success);
			
			&:hover:not(:disabled) {
				background: transparent;
				transform: translateY(-1px);
				box-shadow: shadow('md');
			}
		}
		
		&.tu-button--gradient {
			background: linear-gradient(135deg, var(--tu-success), rgba(var(--tu-success-rgb), 0.8));
		}
		
		&.tu-button--relief {
			box-shadow: 0 4px 0 rgba(var(--tu-success-rgb), 0.8);
			
			&:active:not(:disabled) {
				box-shadow: 0 2px 0 rgba(var(--tu-success-rgb), 0.8);
			}
		}
	}
	
	&--danger {
		background: var(--tu-danger);
		
		&:hover:not(:disabled) {
			background: rgba(var(--tu-danger-rgb), 0.9);
		}
		
		&.tu-button--flat {
			background: rgba(var(--tu-danger-rgb), 0.1);
			color: var(--tu-danger);
			
			&:hover:not(:disabled) {
				background: rgba(var(--tu-danger-rgb), 0.3);
			}
		}
		
		&.tu-button--outline {
			background: transparent;
			color: var(--tu-danger);
			border-color: var(--tu-danger);
			
			&:hover:not(:disabled) {
				background: transparent;
				transform: translateY(-1px);
				box-shadow: shadow('md');
			}
		}
		
		&.tu-button--gradient {
			background: linear-gradient(135deg, var(--tu-danger), rgba(var(--tu-danger-rgb), 0.8));
		}
		
		&.tu-button--relief {
			box-shadow: 0 4px 0 rgba(var(--tu-danger-rgb), 0.8);
			
			&:active:not(:disabled) {
				box-shadow: 0 2px 0 rgba(var(--tu-danger-rgb), 0.8);
			}
		}
	}
	
	&--warn {
		background: var(--tu-warn);
		color: black; // warn color is light, so use black text
		
		&:hover:not(:disabled) {
			background: rgba(var(--tu-warn-rgb), 0.9);
		}
		
		&.tu-button--flat {
			background: rgba(var(--tu-warn-rgb), 0.1);
			color: var(--tu-warn);
			
			&:hover:not(:disabled) {
				background: rgba(var(--tu-warn-rgb), 0.3);
			}
		}
		
		&.tu-button--outline {
			background: transparent;
			color: var(--tu-warn);
			border-color: var(--tu-warn);
			
			&:hover:not(:disabled) {
				background: transparent;
				transform: translateY(-1px);
				box-shadow: shadow('md');
			}
		}
		
		&.tu-button--gradient {
			background: linear-gradient(135deg, var(--tu-warn), rgba(var(--tu-warn-rgb), 0.8));
		}
		
		&.tu-button--relief {
			box-shadow: 0 4px 0 rgba(var(--tu-warn-rgb), 0.8);
			
			&:active:not(:disabled) {
				box-shadow: 0 2px 0 rgba(var(--tu-warn-rgb), 0.8);
			}
		}
	}
	
	&--dark {
		background: var(--tu-dark);
		
		&:hover:not(:disabled) {
			background: rgba(var(--tu-dark-rgb), 0.9);
		}
		
		&.tu-button--flat {
			background: rgba(var(--tu-dark-rgb), 0.1);
			color: var(--tu-dark);
			
			&:hover:not(:disabled) {
				background: rgba(var(--tu-dark-rgb), 0.3);
			}
		}
		
		&.tu-button--outline {
			background: transparent;
			color: var(--tu-dark);
			border-color: var(--tu-dark);
			
			&:hover:not(:disabled) {
				background: transparent;
				transform: translateY(-1px);
				box-shadow: shadow('md');
			}
		}
		
		&.tu-button--gradient {
			background: linear-gradient(135deg, var(--tu-dark), rgba(var(--tu-dark-rgb), 0.8));
		}
		
		&.tu-button--relief {
			box-shadow: 0 4px 0 rgba(var(--tu-dark-rgb), 0.8);
			
			&:active:not(:disabled) {
				box-shadow: 0 2px 0 rgba(var(--tu-dark-rgb), 0.8);
			}
		}
	}
	
	// State modifiers
	&--active {
		background: var(--tu-primary);
		color: white;
	}
	
	&--block {
		display: flex;
		width: 100%;
	}
	
	&--icon {
		padding: spacing('sm');
		
		i {
			font-size: 1.15rem;
		}
	}
	
	&--inline {
		margin: 0;
	}
}

.tu-button__content {
	display: flex;
	align-items: center;
	gap: spacing('xs');
	z-index: 50;
}

.tu-button__loading {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(var(--tu-primary-rgb), 0.8);
	border-radius: inherit;
	width: 100%;
	height: 100%;

	&::before,
	&::after {
		content: "";
		position: absolute;
		width: 17px;
		height: 17px;
		border-radius: 50%;
		box-sizing: border-box;
	}

	&::after {
		border: 2px dotted rgba(255, 255, 255, 0.6);
		border-top: 2px solid transparent;
		border-bottom: 2px solid transparent;
		border-right: 2px solid transparent;
		animation: btnload 0.6s linear infinite;
	}

	&::before {
		border: 2px solid rgb(255, 255, 255);
		border-top: 2px solid transparent;
		border-bottom: 2px solid transparent;
		border-right: 2px solid transparent;
		animation: btnload 0.6s ease infinite;
	}
}

// Motion preference support
@media (prefers-reduced-motion: reduce) {
	.tu-button {
		transition: none !important;
		
		&:hover {
			transform: none !important;
		}
	}
}

@keyframes btnload {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>
