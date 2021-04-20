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

<style lang="sass">
	  
@import '../../style/sass/_mixins'

.vs-button-group
  display: inline-flex
  align-items: center
  justify-content: center
  margin: 5px
  .vs-button
    margin: 0px
  .vs-button:not(:last-of-type):not(:first-of-type)
    border-radius: 0px
    border: 0px
    &.vs-button--border
      &:before
        border-left: 0px
        width: 100%
      + .vs-button--border:not(:last-of-type)
        &:before
          border-right: 0px
          width: calc(100%)
  .vs-button:last-of-type
    border-radius: 0px 12px 12px 0px
  .vs-button:first-of-type
    border-radius: 12px 0px 0px 12px

</style>