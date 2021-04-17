<template>
	<div class="vs-button-group">
		<slot />
	</div>
</template>
<script lang="ts">
import Vue, { defineComponent } from 'vue'
export default defineComponent({
	name: "VsButtonGroup"
});
</script>