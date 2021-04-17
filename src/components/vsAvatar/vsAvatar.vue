<template lang="html">
  <div
    v-bind="$attrs"
    :style="avatarStyle"
    :class="avatarClass"
    class="con-vs-avatar"
    v-on="$listeners">
    <div
      v-if="badge && badge > 0"
      :style="badgeStyle"
      :class="badgeClass"
      class="dot-count vs-avatar--count">
      {{ typeof badge != 'boolean' ? badge : null }}
    </div>
    <div
      v-if="src"
      class="con-img vs-avatar--con-img">
      <img
        :src="src"
        :alt="text"
      >
    </div>
    <span
      v-else
      :title="text"
      :style="textStyle"
      :class="[text ? '' : iconPack, text ? '' : icon, textClass]"
      translate="no"
      class="vs-avatar--text notranslate"
    >
      {{ text ? returnText : iconPack == 'material-icons' ? icon : '' }}
    </span>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import _color from "../../utils/color";

export default defineComponent({
	name: "VsAvatar",
	props: {
		badge: {
			type: [Boolean, String, Number],
			default: false,
		},
		badgeColor: {
			default: "danger",
			type: String,
		},
		size: {
			type: String,
			default: null,
		},
		src: {
			type: String,
			default: null,
		},
		icon: {
			type: String,
			default: "person",
		},
		iconPack: {
			type: String,
			default: "material-icons",
		},
		textColor: {
			type: String,
			default: "rgb(255, 255, 255)",
		},
		text: {
			type: [String],
			default: null,
		},
		color: {
			type: String,
			default: "rgb(195, 195, 195)",
		},
	},
	setup(props, context) {
		const avatarClass = computed(() => {
			const classes = {};
			classes[props.size] = true;
			if (_color.isColor(props.color)) {
				classes[`con-vs-avatar-${props.color}`] = true;
			}
			return classes;
		});
		const avatarStyle = computed(() => {
			let style :any = {
				width: /[px]/.test(props.size) ? props.size : null,
				height: /[px]/.test(props.size) ? props.size : null,
			};
			if (!_color.isColor(props.color)) {
				style.background = _color.getColor(props.color);
			}
			return style;
		});
		const badgeClass = computed(() => {
			const classes = {
				badgeNumber: typeof props.badge != "boolean",
			};
			if (_color.isColor(props.badgeColor)) {
				classes[`dot-count-${props.badgeColor}`] = true;
			}
			return classes;
		});
		const badgeStyle = computed(() => {
			let style: any;
			if (!_color.isColor(props.badgeColor)) {
				style.background = _color.getColor(props.badgeColor);
			}
			return style;
		});
		const textClass = computed(() => {
			const classes = {
				"material-icons": !props.text,
			};
			if (_color.isColor(props.textColor)) {
				classes[`vs-avatar-text-${props.textColor}`] = true;
			}
			return classes;
		});
		const textStyle = computed(() => {
			let style: any = {
				transform: `translate(-50%,-50%) scale(${returnScale})`,
			};
			if (!_color.isColor(props.textColor)) {
				style.color = _color.getColor(props.textColor);
			}
			return style;
		});
		const returnText = computed(() => {
			if (props.text.length <= 5) {
				return props.text;
			}
			let exp = /\s/g;
			var letras = "";
			if (exp.test(props.text)) {
				props.text.split(exp).forEach((word) => {
					letras += word[0].toUpperCase();
				});
			} else {
				letras = props.text[0].toUpperCase();
			}
			return letras.length > 5 ? letras[0] : letras;
		});
		const returnScale = computed(() => {
			if (!props.text) return 1;
			let lengthx = (returnText.value).length;
			if (lengthx <= 5 && lengthx > 1) {
				return lengthx / (lengthx * 1.5);
			} else {
				return 1;
			}
		});
	
		return {
			avatarClass,
			avatarStyle,
			badgeClass,
			badgeStyle,
			textClass,
			textStyle,
			returnText,
			returnScale,
		}
	},
});
</script>
