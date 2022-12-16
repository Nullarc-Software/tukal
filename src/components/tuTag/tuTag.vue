<template>
	<div class="tu-tag" @click="onTagClicked">
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
	--tu-tag-text-color: 255, 255, 255;
	display: inline-flex;
	background: -getColor('primary');
	color: -getColor("tag-text-color");
	padding: 5px;
	border-radius: 20px;
	margin-left: 2px;
	margin-right: 2px;
	cursor: pointer;
}

.tu-tag__key {
	color: -getColorAlpha("tag-text-color", 0.9);
}

.tu-tag__value {
	color: -getColor("tag-text-color");
	font-weight: bold;
}

.tu-tag__separator {
	margin-left: 5px;
	margin-right: 5px;
}
</style>