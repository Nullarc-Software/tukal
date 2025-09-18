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

<script setup lang="ts">
import { computed } from "vue";
import * as _color from "../../utils";

defineOptions({
	name: "TuChip"
});

interface Props {
	item?: boolean;
	value?: Array<any> | null;
	active?: boolean;
	text?: string | null;
	closable?: boolean | string;
	color?: string | null;
	icon?: string | null;
	iconPack?: string;
	closeIcon?: string;
	transparent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	active: true,
	text: null,
	closable: false,
	color: null,
	icon: null,
	iconPack: "material-icons",
	closeIcon: "clear",
	transparent: false
});

const emit = defineEmits<{
	input: [value: boolean];
	click: [];
	"tu-remove": [value: boolean];
}>();

const styleChip = computed(() => {
	const background = props.transparent ? _color.getApplyColor(props.color, 0.15) : _color.getApplyColor(props.color, 1);
	const color = props.transparent ? _color.getApplyColor(props.color, 1) : props.color ? "rgba(255,255,255,.9)" : "rgba(0,0,0,.7)";

	return {
		background: background,
		color: color
	};
});

const closeChip = () => {
	emit("input", false);
	emit("click");
};

const remove = () => {
	emit("tu-remove", false);
	emit("input", false);
};
</script>
