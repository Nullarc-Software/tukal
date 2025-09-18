<template>
	<div class="tu-button-group" :style="{
		'--tu-bg-height': fixedHeight
	}">
		<slot />
	</div>
</template>
<script setup lang="ts">

defineOptions({
	name: "TuButtonGroup"
});

interface Props {
	fixedHeight?: string;
}

withDefaults(defineProps<Props>(), {
	fixedHeight: ""
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";

.tu-button-group {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin: 5px;

	.tu-button {
		margin: 0;
		height: var(--tu-bg-height);
	}

	.tu-button:not(:last-of-type):not(:first-of-type) {
		border-radius: 0;
		border: 0;

		&.tu-button--border {
			&:nth-child(2) {
				&:before {
					border-left: 0;
					border-right: 0;
					width: 100%;
				}
			}

			+.tu-button--border:not(:last-of-type) {
				&:before {
					border-right: 0;
					width: calc(100%);
				}
			}
		}
	}

	.tu-button:last-of-type {
		border-radius: 0 12px 12px 0;
	}

	.tu-button:first-of-type {
		border-radius: 12px 0 0 12px;
	}

	.tu-button:first-of-type:last-of-type {
		border-radius: 12px;
	}
}
</style>
