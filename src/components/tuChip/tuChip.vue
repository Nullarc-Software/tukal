<template>
	<div :style="styleChip" :class="[
			`tu-chip-${color}`,
			{
				'closable': closable,
				'con-color': color,
				'bg-chip-transparent': transparent
			}
		]" class="con-tu-chip">

		<span class="text-chip tu-chip--text">
			<slot />
		</span>

		<button v-if="closable" class="btn-close tu-chip--close" type="button" @click="closeChip">
			<tu-icon :icon-pack="iconPack" :icon="closeIcon" />
		</button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import * as _color from "../../utils";

export default defineComponent({
	name: "tuChip",
	props: {
		closable: {  //closable prop: adds a close icon to the chip if boolean is true
			type: [Boolean, String],
			default: false
		},
		color: {  //color prop: background color for the chip
			type: String,
			default: ""
		},
		iconPack: {  //iconPack prop: the icon pack for the close icon
			type: String,
			default: "material-icons"
		},
		closeIcon: {  //closeIcon prop: icon for close
			type: String,
			default: "clear"
		},
		transparent: {  //transparent prop: lowers the opacity of background color
			type: Boolean,
			default: false
		}
	},
	setup(props, context) {
		const styleChip = computed(() => {
			let background, color;
			if (props.color !== "") {
				background = props.transparent ? _color.getApplyColor(props.color, 0.15) : _color.getApplyColor(props.color, 1);
				color = props.transparent ? _color.getApplyColor(props.color, 1) : props.color ? "rgba(255,255,255,.9)" : "rgba(0,0,0,.7)";
			}
			else {
				background = "white";
				color = "black"
			}

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
