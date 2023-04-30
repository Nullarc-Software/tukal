<template>
	<div class="tu-component tu-divider">
		<span :class="borderClass" :style="afterStyle" class="tu-divider-border after" />
		<span v-if="icon || $slots.default" :style="{
			color: textColor,
			background: backgroundColor,
		}" :class="textAndBackgroundClass" class="tu-divider--text">
			<template v-if="!icon">
				<slot />
			</template>

			<tu-icon v-else :icon-pack="iconPack" :icon="icon" class="icon-divider notranslate tu-divider--icon">
			</tu-icon>
		</span>
		<span :style="beforeStyle" :class="borderClass" class="tu-divider-border before" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import _color from "../../utils/color";

export default defineComponent({
	name: "TuDivider",
	props: {
		color: {  //color prop: color of the divider which can be rgba or hexadecimal value
			type: String,
			default: "rgba(0, 0, 0,.1)",
		},
		background: {  //background porp: background color for the divider which can be rgba or hexadecimal value
			type: String,
			default: "transparent",
		},
		icon: {  //icon prop: icon for divider 
			default: null,
			type: String,
		},
		borderStyle: {  //borderStyle prop: borderStyle for the divider
			default: "solid",
			type: String,
		},
		borderHeight: {  //borderHeight prop: border height for the divider
			default: "1px",
			type: String,
		},
		position: {  //position prop: position of divider which can be i) left ii) left-center iii) right-center iv) center v) right.
			default: "center",
			type: String,
		},
		iconPack: {  //iconPack prop: iconPack for the icon used
			default: "material-icons",
			type: String,
		},
	},
	setup(props, context) {

		const getWidthAfter = computed(() => {
			let widthx = "100%";
			if (props.position == "left") {
				widthx = "0%";
			} else if (props.position == "left-center") {
				widthx = "25%";
			} else if (props.position == "right-center") {
				widthx = "75%";
			} else if (props.position == "right") {
				widthx = "100%";
			}
			return widthx;
		});

		const getWidthBefore = computed(() => {
			let widthx = "100%";
			if (props.position == "left") {
				widthx = "100%";
			} else if (props.position == "left-center") {
				widthx = "75%";
			} else if (props.position == "right-center") {
				widthx = "25%";
			} else if (props.position == "right") {
				widthx = "0%";
			}
			return widthx;
		});

		const borderColor = computed(() => {
			if (!_color.isColor(props.color)) {
				return _color.getColor(props.color);
			}
		});

		const afterStyle = computed(() => {
			const classes = {
				width: getWidthAfter.value,
				"border-top-width": props.borderHeight,
				["border-top-style" as any]: props.borderStyle,
			};
			if (!_color.isColor(props.color)) {
				classes["border-top-color"] = borderColor;
			}
			return classes;
		});

		const beforeStyle = computed(() => {
			const classes = {
				width: getWidthBefore.value,
				"border-top-width": props.borderHeight,
				["border-top-style" as any]: props.borderStyle,
			};
			if (!_color.isColor(props.color)) {
				classes["border-top-color"] = borderColor;
			}
			return classes;
		});

		const borderClass = computed(() => {
			const classes = {};
			let borderColor = _color.isColor(props.color) ? props.color : "default";
			classes[`tu-divider-border-${borderColor}`] = true;
			return classes;
		});
		const textColor = computed(() => {
			if (!_color.isColor(props.color)) {
				return _color.getColor(
					props.color !== "rgba(0, 0, 0,.1)" ? props.color : ""
				);
			}
		});

		const backgroundColor = computed(() => {
			if (!_color.isColor(props.background)) {
				return _color.getColor(props.background);
			}
		});

		const textAndBackgroundClass = computed(() => {
			const classes = {};

			let textColor = _color.isColor(props.color) ? props.color : "default";
			classes[`tu-divider-text-${textColor}`] = true;

			let backgroundColor = _color.isColor(props.background)
				? props.background
				: "default";
			classes[`tu-divider-background-${backgroundColor}`] = true;

			return classes;
		});

		return {
			getWidthAfter,
			backgroundColor,
			textAndBackgroundClass,
			textColor,
			borderClass,
			beforeStyle,
			getWidthBefore,
			afterStyle
		}

	}
});
</script>
