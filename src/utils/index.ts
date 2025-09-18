import { inject } from "vue";
import { Router } from "vue-router";

// ============================================================================
// COLOR UTILITIES
// ============================================================================

/**
 * Comprehensive list of supported theme colors
 */
const tuColors = [
	"primary",
	"secondary", 
	"success",
	"danger",
	"warn",
	"dark",
	"light",
	"text",
	"background",
	// social colors
	"facebook",
	"twitter",
	"youtube",
	"pinterest",
	"linkedin",
	"snapchat",
	"whatsapp",
	"tumblr",
	"reddit",
	"spotify",
	"amazon",
	"medium",
	"vimeo",
	"skype",
	"dribbble",
	"slack",
	"yahoo",
	"twitch",
	"discord",
	"telegram",
	"google-plus",
	"messenger",
	"primary-rgb",
	"secondary-rgb",
	"success-rgb",
	"danger-rgb",
		"warn-rgb",
		"dark-rgb",
		"light-rgb",
		"text-rgb",
		"background-rgb"
	];

/**
 * Check if a color string is a valid theme color
 */
const isColor = (color: string): boolean => {
	return tuColors.includes(color);
};

/**
 * Check if a color string is in hexadecimal format
 */
function isHex(color: string): boolean {
	return /^(#)/.test(color);
}

/**
 * Check if a color string is in RGB/RGBA format
 */
function isRGB(color: string): boolean {
	return /^(rgb|rgba)/.test(color);
}

/**
 * Check if a color string is RGB numbers (comma-separated)
 */
function isRGBNumbers(color: string): boolean {
	return /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/.test(color);
}

/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, (m: any, r: string, g: string, b: string) => {
		return r + r + g + g + b + b;
	});

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

const setVar = (propertyName: string, value: string, el: any) => {
	if (!el) {
		document.documentElement.style.setProperty(
			`--tu-${propertyName}`,
			value
		);
	}
	else {
		if (el.nodeName !== "#comment")
			el.style.setProperty(`--tu-${propertyName}`, value);
	}
};

const setColor = (
	colorName: string,
	color: string,
	el: any,
	addClass?: boolean
) => {
	function hexToRgb (hex: string) {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(
			shorthandRegex,
			(m: any, r: string, g: string, b: string) => {
				return r + r + g + g + b + b;
			}
		);

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
				r: parseInt(result[1], 16),
				// tslint:disable-next-line:object-literal-sort-keys
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			  }
			: null;
	}

	const isRGB = /^(rgb|rgba)/.test(color);
	const isRGBNumbers = /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/.test(
		color
	);
	const isHEX = /^(#)/.test(color);
	let newColor;

	if (color === "dark" && el) {
		if (addClass)
			el.classList.add("tu-component-dark");
	}

	if (isRGB) {
		const arrayColor = color.replace(/[rgba()]/g, "").split(",");
		newColor = `${arrayColor[0]},${arrayColor[1]},${arrayColor[2]}`;
		setVar(colorName, newColor, el);
		if (addClass)
			el.classList.add("tu-change-color");
	}
	else if (isHEX) {
		const rgb = hexToRgb(color);
		newColor = `${rgb!.r},${rgb!.g},${rgb!.b}`;
		setVar(colorName, newColor, el);
		if (addClass)
			el.classList.add("tu-change-color");
	}
	else if (isColor(color)) {
		const style = window.getComputedStyle(document.body);
		newColor = style.getPropertyValue("--tu-" + color);
		setVar(colorName, newColor, el);
		if (addClass)
			el.classList.add("tu-change-color");
	}
	else if (isRGBNumbers) {
		setVar(colorName, color, el);
		if (addClass)
			el.classList.add("tu-change-color");
	}
	else {
		//     consolee.warn({
		//       el,
		//       link: 'https://lusaxweb.github.io/vuesax/',
		//       text: `• Component: ${el.__vue__.$vnode.componentOptions.tag}
		// • Warn info: El formato de la propiedad color es incorrecto
		// • Prop: color
		// • value: ${color}
		// • Valores Permitidos: (RGB, HEX, RGB Numbers, Vuesax Colors)
		// • Example: color="#000" or color="rgb(255,255,255)"`,
		//       title: 'VUESAX'
		//     })
	}
};

const getApplyColor = (color: string, alphax = 1) => {
	let hColor: string = getColor(color);
	hColor = hColor.trim();
	if (isHex(hColor)) {
		const rgb = hexToRgb(hColor);
		return `rgba(${rgb?.r},${rgb?.g},${rgb?.b}, ${alphax})`;
	}
	else
		return `rgba(${getColor(color)} , ${alphax})`;
};

function getColorAsRgb (color: string, alphax = 1) {
	let newColor = getColor(color, alphax);
	if (typeof newColor === "string") {
		newColor = newColor.trim();
		if (isHex(newColor)) {
			const rgb = hexToRgb(newColor);
			return `${rgb?.r},${rgb?.g},${rgb?.b}`;
		}
		return newColor; 
	}
	return newColor;
}

/**
 * Main color getter - handles theme colors, hex, rgb, and CSS custom properties
 */
const getColor = (color: string, alpha: number = 1): string => {
	if (!color || color === null || color === undefined) {
		return "var(--tu-primary)";
	}

	// Handle hex colors
	if (isHex(color)) {
		const rgb = hexToRgb(color);
		if (rgb) {
			return alpha === 1 
				? `rgb(${rgb.r},${rgb.g},${rgb.b})`
				: `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
		}
	}

	// Handle RGB/RGBA colors
	if (isRGB(color)) {
		if (alpha !== 1 && color.startsWith('rgb(')) {
			return color.replace(/^rgb/, "rgba").replace(/\)$/, `,${alpha})`);
		}
		return color;
	}

	// Handle RGB numbers (comma-separated)
	if (isRGBNumbers(color)) {
		return alpha === 1 
			? `rgb(${color})`
			: `rgba(${color},${alpha})`;
	}

	// Handle theme colors
	if (isColor(color)) {
		if (typeof window !== "undefined") {
			const style = window.getComputedStyle(document.documentElement);
			const cssValue = style.getPropertyValue(`--tu-${color}`).trim();
			if (cssValue) {
				// Check if the CSS value is a hex color and convert it
				if (isHex(cssValue)) {
					const rgb = hexToRgb(cssValue);
					if (rgb) {
						return alpha === 1 
							? `rgb(${rgb.r},${rgb.g},${rgb.b})`
							: `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
					}
				}
				// If it's already RGB numbers (comma-separated), wrap in rgb()
				else if (isRGBNumbers(cssValue)) {
					return alpha === 1 
						? `rgb(${cssValue})`
						: `rgba(${cssValue},${alpha})`;
				}
				// Return as-is for other formats
				return cssValue;
			}
		}
		// Fallback to CSS custom property
		return `var(--tu-${color})`;
	}

	// Return as-is for unknown formats
	return color;
};

/**
 * Get color with alpha applied (alias for getColor with alpha)
 */
const getColorAlpha = (color: string, alpha: number = 1): string => {
	return getColor(color, alpha);
};

/**
 * Legacy rColor function for backward compatibility
 */
const rColor = (color: string, opacity: number = 1): string => {
	return getColor(color, opacity);
};

/**
 * Darken a color by a percentage
 */
function darkenColor(color: string, percent: number): string {
	const f = color.split(",");
	const t = percent < 0 ? 0 : 255;
	const p = percent < 0 ? percent * -1 : percent;
	const R = parseInt(f[0].replace(/[^\d]/g, ''));
	const G = parseInt(f[1]);
	const B = parseInt(f[2]);
	return `rgb(${Math.round((t - R) * p) + R},${Math.round((t - G) * p) + G},${Math.round((t - B) * p) + B})`;
}

/**
 * Generate a random RGB color
 */
function getRandomColor(): string {
	const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
	return `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)})`;
}

/**
 * Check if a color is dark (for contrast calculations)
 */
function isColorDark(color: string): boolean {
	let rgb: string[];
	
	if (isHex(color)) {
		const hexRgb = hexToRgb(color);
		if (!hexRgb) return false;
		rgb = [hexRgb.r.toString(), hexRgb.g.toString(), hexRgb.b.toString()];
	} else if (isRGB(color)) {
		const match = color.match(/rgba?\(([^)]+)\)/);
		if (!match) return false;
		rgb = match[1].split(',').map(v => v.trim());
	} else {
		return false;
	}

	const yiq = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
	return yiq < 128;
}

/**
 * Get contrast color (black or white) for a given background
 */
function getContrastColor(backgroundColor: string): string {
	return isColorDark(backgroundColor) ? '#ffffff' : '#000000';
}

/**
 * Check if component has dark color props
 */
function isComponentDark(props: any): boolean {
	return (
		props.color === "dark" ||
		props.dark ||
		props.componentColor === "dark"
	);
}

/**
 * Check if component has any color props set
 */
function isColorDefault(props: any): boolean {
	return (
		!!props.color ||
		!!props.primary ||
		!!props.success ||
		!!props.warn ||
		!!props.danger ||
		!!props.dark
	);
}

/**
 * Set CSS custom property
 */
function setCssVariable(propertyName: string, value: any): void {
	if (typeof window !== "undefined") {
		document.documentElement.style.setProperty(propertyName, value);
	}
}

/**
 * Get CSS custom property value
 */
function getCssVariable(propertyName: string): string {
	if (typeof window !== "undefined") {
		const style = window.getComputedStyle(document.documentElement);
		return style.getPropertyValue(propertyName).trim();
	}
	return '';
}

/**
 * Transform color based on initial color value
 */
function changeColor(colorInicial: string): string {
	let colorx = "";
	if (/^[#]/.test(colorInicial)) {
		const rgbx = hexToRgb(colorInicial);
		colorx = rgbx ? `${rgbx.r},${rgbx.g},${rgbx.b}` : "";
	} else if (/^[rgb]/.test(colorInicial)) {
		colorx = colorInicial.replace(/[rgba()]/g, "").replace(/[\s]/g, "");
	} else {
		if (isColor(colorInicial)) {
			if (typeof window !== "undefined") {
				const style = window.getComputedStyle(document.documentElement);
				colorx = style.getPropertyValue("--tu-" + colorInicial);
			} else {
				colorx = "--tu-" + colorInicial;
			}
		} else {
			colorx = "--tu-" + colorInicial;
		}
	}
	return colorx;
}

const insertBody = (element: HTMLElement, parent?: HTMLElement) => {
	const target = parent || document.body;
	target.insertBefore(element, target.lastChild);
};

const removeBody = (element: HTMLElement, parent: any) => {
	const target = parent || document.body;
	target.removeChild(element);
};

const setCords = (element: any, parent: any) => {
	const cords = parent.getBoundingClientRect();
	const x = cords.x;
	const y = cords.y;
	const w = cords.width;
	const h = cords.height;
	const style = element.style;
	const scrollTop = window.pageYOffset;
	const elTop = element.clientHeight + cords.y + scrollTop;
	const rootTop = scrollTop + window.innerHeight;

	if (rootTop - elTop < 30) {
		style.top = `${y + scrollTop - element.clientHeight - 4}px`;
		style.left = `${x + 8}px`;
		style.width = `${w}px`;
		element.classList.add("top");
		parent.classList.add("top");
	}
	else {
		style.top = `${y + scrollTop + h - 4}px`;
		style.left = `${x}px`;
		style.width = `${w}px`;
		element.classList.remove("top");
		parent.classList.remove("top");
	}
};

const setCordsPosition = (element: any, parent: any, position: string) => {
	const cords = parent.getBoundingClientRect();
	const x = cords.x;
	const y = cords.y;
	const w = cords.width;
	const h = cords.height;
	const style = element.style;
	const scrollTop = window.pageYOffset;
	const elTop = element.clientHeight + cords.y + scrollTop;
	const rootTop = scrollTop + window.innerHeight;

	if (
		x + w + 10 + element.getBoundingClientRect().width >
			window.innerWidth &&
		position === "right"
	) {
		position = "left";
		element.classList.remove("right");
		element.classList.add("left");
	}

	if (x - 10 < element.getBoundingClientRect().width && position === "left") {
		position = "top";
		element.classList.remove("left");
		element.classList.add("top");
	}

	if (rootTop - elTop < 30 || position === "top") {
		// console.log('hola mundo')
		style.top = `${y + scrollTop - element.clientHeight - 8}px`;
		const left = x + (w - element.getBoundingClientRect().width) / 2;

		if (left + element.getBoundingClientRect().width < window.innerWidth) {
			if (left > 0)
				style.left = `${left}px`;

			else {
				style.left = "10px";
				element.classList.add("notArrow");
			}
		}
		else {
			style.left = "auto";
			style.right = "10px";
			element.classList.add("notArrow");
		}
	}
	else if (position === "bottom") {
		style.top = `${y + scrollTop + h + 8}px`;
		const left = x + (w - element.getBoundingClientRect().width) / 2;

		if (left + element.getBoundingClientRect().width < window.innerWidth) {
			if (left > 0)
				style.left = `${left}px`;

			else {
				style.left = "10px";
				element.classList.add("notArrow");
			}
		}
		else {
			style.left = "auto";
			style.right = "10px";
			element.classList.add("notArrow");
		}
	}
	else if (position === "left") {
		style.top = `${y +
			scrollTop +
			(h - element.getBoundingClientRect().height) / 2}px`;
		style.left = `${x - element.getBoundingClientRect().width - 8}px`;
	}
	else if (position === "right") {
		style.top = `${y +
			scrollTop +
			(h - element.getBoundingClientRect().height) / 2}px`;
		style.left = `${x + w + 8}px`;
	}
};

const getRouter = () => {
	return inject<Router>("appRouter") as Router;
};

function joinPath(...args: string[]): string {
	return args.map((part, i) => {
		if (i === 0) 
			return part.trim().replace(/[/]*$/g, "");
		else 
			return part.trim().replace(/(^[/]*|[/]*$)/g, "");
	}).filter(x=>x.length).join("/");
}

export {
	// Color functions
	isColor,
	getColor,
	getColorAlpha,
	getColorAsRgb,
	getApplyColor,
	rColor,
	darkenColor,
	getRandomColor,
	isColorDark,
	getContrastColor,
	isComponentDark,
	isColorDefault,
	changeColor,
	// Helper functions
	isHex,
	isRGB,
	isRGBNumbers,
	hexToRgb,
	// CSS functions
	setCssVariable,
	getCssVariable,
	setVar,
	setColor,
	// DOM functions
	insertBody,
	removeBody,
	setCords,
	setCordsPosition,
	// Vue/Router functions
	getRouter,
	joinPath
};
