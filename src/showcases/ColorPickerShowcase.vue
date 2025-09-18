<template>
	<div class="showcase-component">
		<h3>Color Picker:</h3>
		<hr />
		
		<!-- Basic Color Picker -->
		<div style="margin: 20px 0;">
			<h4>Basic Color Picker:</h4>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
				<div>
					<TuColorPicker v-model="basicColor" label="Select Color" />
					<p style="margin-top: 10px; font-size: 14px;">Selected: {{ basicColor }}</p>
				</div>
				<div>
					<TuColorPicker v-model="primaryColor" label="Primary Color" disabled />
					<p style="margin-top: 10px; font-size: 14px;">Disabled: {{ primaryColor }}</p>
				</div>
			</div>
		</div>

		<!-- With Presets -->
		<div style="margin: 20px 0;">
			<h4>With Color Presets:</h4>
			<TuColorPicker 
				v-model="presetColor" 
				label="Choose from presets" 
				:presets="colorPresets"
				show-presets
			/>
			<p style="margin-top: 10px; font-size: 14px;">Selected: {{ presetColor }}</p>
		</div>

		<!-- Different Formats -->
		<div style="margin: 20px 0;">
			<h4>Different Color Formats:</h4>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
				<div>
					<TuColorPicker v-model="hexColor" label="HEX Format" format="hex" />
					<p style="margin-top: 10px; font-size: 14px;">HEX: {{ hexColor }}</p>
				</div>
				<div>
					<TuColorPicker v-model="rgbColor" label="RGB Format" format="rgb" />
					<p style="margin-top: 10px; font-size: 14px;">RGB: {{ rgbColor }}</p>
				</div>
				<div>
					<TuColorPicker v-model="hslColor" label="HSL Format" format="hsl" />
					<p style="margin-top: 10px; font-size: 14px;">HSL: {{ hslColor }}</p>
				</div>
				<div>
					<TuColorPicker v-model="hsvaColor" label="HSVA Format" format="hsva" />
					<p style="margin-top: 10px; font-size: 14px;">HSVA: {{ hsvaColor }}</p>
				</div>
			</div>
		</div>

		<!-- Alpha Channel -->
		<div style="margin: 20px 0;">
			<h4>With Alpha Channel:</h4>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
				<div>
					<TuColorPicker v-model="alphaColor1" label="With Transparency" show-alpha />
					<p style="margin-top: 10px; font-size: 14px;">RGBA: {{ alphaColor1 }}</p>
				</div>
				<div>
					<TuColorPicker v-model="alphaColor2" label="HSLA with Alpha" format="hsla" show-alpha />
					<p style="margin-top: 10px; font-size: 14px;">HSLA: {{ alphaColor2 }}</p>
				</div>
			</div>
		</div>

		<!-- Theme Designer -->
		<div style="margin: 20px 0;">
			<h4>Theme Designer:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #f8f9fa;">
				<h5>Create Your Theme</h5>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
					<TuColorPicker v-model="themeColors.primary" label="Primary Color" />
					<TuColorPicker v-model="themeColors.secondary" label="Secondary Color" />
					<TuColorPicker v-model="themeColors.success" label="Success Color" />
					<TuColorPicker v-model="themeColors.warning" label="Warning Color" />
					<TuColorPicker v-model="themeColors.danger" label="Danger Color" />
					<TuColorPicker v-model="themeColors.background" label="Background Color" />
				</div>
				
				<!-- Theme Preview -->
				<div style="margin-top: 20px; padding: 20px; border-radius: 8px; background: white;">
					<h6>Theme Preview:</h6>
					<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
						<TuButton :style="{ backgroundColor: themeColors.primary, borderColor: themeColors.primary }">
							Primary Button
						</TuButton>
						<TuButton :style="{ backgroundColor: themeColors.secondary, borderColor: themeColors.secondary }">
							Secondary Button
						</TuButton>
						<TuButton :style="{ backgroundColor: themeColors.success, borderColor: themeColors.success }">
							Success Button
						</TuButton>
						<TuButton :style="{ backgroundColor: themeColors.warning, borderColor: themeColors.warning }">
							Warning Button
						</TuButton>
						<TuButton :style="{ backgroundColor: themeColors.danger, borderColor: themeColors.danger }">
							Danger Button
						</TuButton>
					</div>
					
					<div style="margin-top: 15px; padding: 15px; border-radius: 6px;" :style="{ backgroundColor: themeColors.background }">
						<p :style="{ color: getContrastColor(themeColors.background) }">
							This is how your background color looks with contrasting text.
						</p>
					</div>
				</div>

				<div style="margin-top: 20px;">
					<TuButton @click="exportTheme" :style="{ backgroundColor: themeColors.primary, borderColor: themeColors.primary }">
						Export Theme
					</TuButton>
					<TuButton @click="resetTheme" style="margin-left: 10px;">
						Reset to Default
					</TuButton>
				</div>
			</div>
		</div>

		<!-- Color Palette Builder -->
		<div style="margin: 20px 0;">
			<h4>Color Palette Builder:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
				<div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
					<TuColorPicker v-model="newPaletteColor" label="Add Color" />
					<TuButton @click="addToPalette" :disabled="!newPaletteColor">Add to Palette</TuButton>
				</div>
				
				<div v-if="customPalette.length > 0">
					<h6>Your Palette:</h6>
					<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
						<div 
							v-for="(color, index) in customPalette" 
							:key="index"
							style="position: relative; width: 60px; height: 60px; border-radius: 8px; border: 2px solid #ddd; cursor: pointer; transition: transform 0.2s;"
							:style="{ backgroundColor: color }"
							@click="selectPaletteColor(color)"
							@mouseenter="$event.target.style.transform = 'scale(1.1)'"
							@mouseleave="$event.target.style.transform = 'scale(1)'"
						>
							<button 
								@click.stop="removePaletteColor(index)"
								style="position: absolute; top: -8px; right: -8px; width: 20px; height: 20px; border-radius: 50%; background: #ff4757; color: white; border: none; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center;"
							>
								×
							</button>
							<div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #666; white-space: nowrap;">
								{{ color }}
							</div>
						</div>
					</div>
					
					<div style="margin-top: 40px;">
						<TuButton @click="exportPalette" size="sm">Export Palette</TuButton>
						<TuButton @click="clearPalette" size="sm" color="danger" style="margin-left: 10px;">Clear Palette</TuButton>
					</div>
				</div>
				
				<div v-else style="text-align: center; color: #666; padding: 40px;">
					<p>No colors in palette yet. Add some colors above!</p>
				</div>
			</div>
		</div>

		<!-- Gradient Generator -->
		<div style="margin: 20px 0;">
			<h4>Gradient Generator:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
					<TuColorPicker v-model="gradientStart" label="Start Color" />
					<TuColorPicker v-model="gradientEnd" label="End Color" />
					<div>
						<label style="display: block; margin-bottom: 8px; font-weight: 500;">Direction:</label>
						<TuSelect v-model="gradientDirection" :select-items="gradientDirections" />
					</div>
				</div>
				
				<div style="margin: 20px 0;">
					<h6>Preview:</h6>
					<div 
						style="height: 100px; border-radius: 8px; border: 1px solid #ddd; margin-top: 10px;"
						:style="{ background: computedGradient }"
					></div>
					<p style="margin-top: 10px; font-size: 14px; word-break: break-all;">
						<strong>CSS:</strong> {{ computedGradient }}
					</p>
				</div>
				
				<TuButton @click="copyGradient">Copy CSS</TuButton>
			</div>
		</div>

		<!-- Form Integration -->
		<div style="margin: 20px 0;">
			<h4>Form Integration:</h4>
			<form @submit.prevent="saveColorSettings" style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
				<h5>Brand Settings</h5>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
					<TuColorPicker v-model="brandSettings.logo" label="Logo Color" required />
					<TuColorPicker v-model="brandSettings.accent" label="Accent Color" required />
					<TuColorPicker v-model="brandSettings.text" label="Text Color" required />
					<TuColorPicker v-model="brandSettings.background" label="Background" show-alpha />
				</div>
				
				<div style="margin: 20px 0;">
					<label style="display: flex; align-items: center; gap: 10px;">
						<input type="checkbox" v-model="brandSettings.isDarkMode" />
						<span>Dark Mode Theme</span>
					</label>
				</div>
				
				<div style="margin-top: 20px;">
					<TuButton type="submit" color="primary">Save Settings</TuButton>
					<TuButton @click="previewBrand" style="margin-left: 10px;">Preview</TuButton>
				</div>
			</form>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic Color:</strong> {{ basicColor }}</p>
				<p><strong>Preset Color:</strong> {{ presetColor }}</p>
				<p><strong>Theme Colors:</strong></p>
				<ul style="margin-left: 20px;">
					<li>Primary: {{ themeColors.primary }}</li>
					<li>Secondary: {{ themeColors.secondary }}</li>
					<li>Success: {{ themeColors.success }}</li>
				</ul>
				<p><strong>Custom Palette:</strong> {{ customPalette.length }} colors</p>
				<p><strong>Gradient:</strong> {{ gradientStart }} → {{ gradientEnd }}</p>
				<p><strong>Brand Settings:</strong> {{ Object.keys(brandSettings).filter(k => k !== 'isDarkMode').map(k => brandSettings[k]).join(', ') }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { tuColorPicker as TuColorPicker } from "../components/tuColorPicker";
import { tuButton as TuButton } from "../components/tuButton";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Basic colors
const basicColor = ref("#3498db");
const primaryColor = ref("#2c3e50");

// Preset color with presets
const presetColor = ref("#e74c3c");
const colorPresets = ref([
	"#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6",
	"#1abc9c", "#34495e", "#95a5a6", "#d35400", "#c0392b"
]);

// Different formats
const hexColor = ref("#ff6b6b");
const rgbColor = ref("rgb(74, 144, 226)");
const hslColor = ref("hsl(120, 100%, 50%)");
const hsvaColor = ref("hsva(60, 100%, 100%, 1)");

// Alpha colors
const alphaColor1 = ref("rgba(255, 107, 107, 0.8)");
const alphaColor2 = ref("hsla(280, 100%, 50%, 0.6)");

// Theme colors
const themeColors = ref({
	primary: "#007bff",
	secondary: "#6c757d",
	success: "#28a745",
	warning: "#ffc107",
	danger: "#dc3545",
	background: "#ffffff"
});

// Palette builder
const customPalette = ref(["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"]);
const newPaletteColor = ref("#ff9ff3");

// Gradient generator
const gradientStart = ref("#667eea");
const gradientEnd = ref("#764ba2");
const gradientDirection = ref("to right");

const gradientDirections = ref([
	{ label: "Left to Right", value: "to right" },
	{ label: "Top to Bottom", value: "to bottom" },
	{ label: "Diagonal ↘", value: "to bottom right" },
	{ label: "Diagonal ↙", value: "to bottom left" },
	{ label: "Radial", value: "radial-gradient(circle" }
]);

// Brand settings
const brandSettings = ref({
	logo: "#2c3e50",
	accent: "#3498db",
	text: "#2c3e50",
	background: "rgba(248, 249, 250, 1)",
	isDarkMode: false
});

// Computed gradient
const computedGradient = computed(() => {
	if (gradientDirection.value.includes("radial")) {
		return `radial-gradient(circle, ${gradientStart.value}, ${gradientEnd.value})`;
	}
	return `linear-gradient(${gradientDirection.value}, ${gradientStart.value}, ${gradientEnd.value})`;
});

// Methods
const getContrastColor = (backgroundColor: string): string => {
	// Simple contrast calculation (you might want to use a more sophisticated algorithm)
	const hex = backgroundColor.replace('#', '');
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	return brightness > 128 ? '#000000' : '#ffffff';
};

const exportTheme = () => {
	const themeCSS = Object.entries(themeColors.value)
		.map(([key, value]) => `--color-${key}: ${value};`)
		.join('\n  ');
	
	const cssContent = `:root {\n  ${themeCSS}\n}`;
	navigator.clipboard.writeText(cssContent);
	alert('Theme CSS copied to clipboard!');
};

const resetTheme = () => {
	themeColors.value = {
		primary: "#007bff",
		secondary: "#6c757d",
		success: "#28a745",
		warning: "#ffc107",
		danger: "#dc3545",
		background: "#ffffff"
	};
};

const addToPalette = () => {
	if (newPaletteColor.value && !customPalette.value.includes(newPaletteColor.value)) {
		customPalette.value.push(newPaletteColor.value);
		newPaletteColor.value = "#" + Math.floor(Math.random()*16777215).toString(16);
	}
};

const selectPaletteColor = (color: string) => {
	basicColor.value = color;
};

const removePaletteColor = (index: number) => {
	customPalette.value.splice(index, 1);
};

const exportPalette = () => {
	const paletteData = {
		name: "Custom Palette",
		colors: customPalette.value,
		created: new Date().toISOString()
	};
	
	const dataStr = JSON.stringify(paletteData, null, 2);
	navigator.clipboard.writeText(dataStr);
	alert('Palette data copied to clipboard!');
};

const clearPalette = () => {
	if (confirm('Are you sure you want to clear the entire palette?')) {
		customPalette.value = [];
	}
};

const copyGradient = () => {
	navigator.clipboard.writeText(computedGradient.value);
	alert('Gradient CSS copied to clipboard!');
};

const saveColorSettings = () => {
	console.log('Brand settings saved:', brandSettings.value);
	alert('Brand settings saved successfully!');
};

const previewBrand = () => {
	const preview = window.open('', '_blank', 'width=600,height=400');
	if (preview) {
		preview.document.write(`
			<html>
				<head><title>Brand Preview</title></head>
				<body style="background: ${brandSettings.value.background}; color: ${brandSettings.value.text}; font-family: Arial, sans-serif; padding: 20px;">
					<h1 style="color: ${brandSettings.value.logo};">Your Brand</h1>
					<p>This is how your brand colors look together.</p>
					<button style="background: ${brandSettings.value.accent}; color: white; border: none; padding: 10px 20px; border-radius: 4px;">Accent Button</button>
				</body>
			</html>
		`);
	}
};
</script>
