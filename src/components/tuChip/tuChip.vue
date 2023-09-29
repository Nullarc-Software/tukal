<template>
  <div
    :style="styleChip"
    :class="[
      `tu-chip-${color}`,
      {
        'closable': closable,
        'con-color': color,
        'bg-chip-transparent': transparent
      }
    ]"
    class="con-tu-chip">

    <span class="text-chip tu-chip--text">
      <slot/>
    </span>

    <button
      v-if="closable"
      class="btn-close tu-chip--close"
      type="button"
      @click="closeChip">
      <tu-icon
        :icon-pack="iconPack"
        :icon="closeIcon"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import * as _color from "../../utils";

export default defineComponent({
	name: "TuChip",
	props: {
		item: {
			type: Boolean
		},
		value: {
			default: null,
			type: Array
		},
		active: {
			type: Boolean,
			default: true
		},
		text: {
			type: String,
			default: null
		},
		closable: {
			type: [Boolean, String],
			default: false
		},
		color: {
			type: String,
			default: null
		},
		icon: {
			type: String,
			default: null
		},
		iconPack: {
			type: String,
			default: "material-icons"
		},
		closeIcon: {
			type: String,
			default: "clear"
		},
		transparent: {
			type: Boolean,
			default: false
		}
	},
	setup (props, context) {
		const styleChip = computed(() => {
			const background = props.transparent ? _color.getApplyColor(props.color, 0.15) : _color.getApplyColor(props.color, 1);
			const color = props.transparent ? _color.getApplyColor(props.color, 1) : props.color ? "rgba(255,255,255,.9)" : "rgba(0,0,0,.7)";

			return {
				background: background,
				color: color
			};
		});

		const closeChip = () => {
			context.emit("input", false);
			context.emit("click");
		};

		const remove = () => {
			context.emit("tu-remove", false);
			context.emit("input", false);
		};

		return {
			styleChip,
			closeChip,
			remove
		};
	}
});
</script>
