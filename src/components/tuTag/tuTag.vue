<template>
	<div class="tu-tag" @click="onTagClicked" :style="{
		['--tu-color']: color ? getColor(color) : '',
		['--tu-color-rgb']: color ? getColorAsRgb(color) : '',
		['--tu-text-color']: textColor
	}" :class="{
	['tu-tag--flat']: flat
}">
		<div class="tu-tag__key">
			{{ name }}
		</div>
		<div class="tu-tag__separator">
			:
		</div>
		<div class="tu-tag__value">
			{{ value }}
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import tuComponent from '../tuComponent';


export default defineComponent({
	name: "TuTag",
	extends: tuComponent,
	props: {
		flat: Boolean,
		name: String,
		value: String,
	},
	emits: ["onTagClicked"],
	setup(props, context) {
		function onTagClicked() {
			context.emit("onTagClicked");
		}
		return {
			onTagClicked
		}
	}
});

</script>

<style lang="scss">
@import "../../style/sass/_mixins";


.tu-tag {
	--tu-tag-text-color: #ffffff;
	--tu-tag-text-color-rgb: 255, 255, 255;
	display: inline-flex;
	background: -getColor('color');
	color: -getColor("tag-text-color");
	padding: 8px;
	border-radius: 20px;
	margin-left: 2px;
	margin-right: 2px;
	cursor: pointer;

	&.tu-tag--flat {
		background: -getColorAlpha('color', 0.15);
		color: -getColor("color");
	}
}


.tu-tag__value {
	font-weight: bold;
}

.tu-tag__separator {
	margin-left: 5px;
	margin-right: 5px;
}
</style>