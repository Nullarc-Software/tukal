<template>
  <div class="vs-card__group">
    <button class="vs-card__group-prev" @click="handleClick($event, 'left')">
      <vs-icon>keyboard_arrow_left</vs-icon>
    </button>
    <div class="vs-card__group-cards" ref="cards">
      <slot />
      <div class="vs-card__group-space"></div>
    </div>
	<button class="vs-card__group-next" @click="handleClick($event, 'right')">
      <vs-icon>keyboard_arrow_right</vs-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import VsIcon from "../vsIcon/vsIcon.vue";
export default defineComponent({

	name: "VsCardGroup",
	setup(props, context) {

		let cards = ref<HTMLDivElement>();

		const handleClick = function(evt, dir) {
			if(dir == "left")
				cards.value?.scrollTo(cards.value?.scrollLeft - cards.value?.clientWidth, 0);
			else
				cards.value?.scrollTo(cards.value?.scrollLeft + cards.value?.clientWidth, 0);
		}

		return {
			cards,
			handleClick
		}
	}

});
</script>

<style lang="sass">
// @import '../../../styles/mixins'
.vs-card__group
  width: 100%
  display: flex
  position: relative
  align-items: center
  &-space
    min-width: 20px
    position: relative
    height: 20px
  .vs-card__group-cards
    position: relative
    z-index: 1
    display: flex
    align-items: center
    justify-content: flex-start
    overflow: hidden
    overflow-x: auto
    scroll-behavior: smooth
    padding-top: 20px
    padding-bottom: 20px
    border-radius: 20px
    .vs-card-content
      min-width: 350px
      margin-left: 20px
  .vs-card__group-prev
    z-index: 2
    position: relative
    left: 0px
    width: 50px
    height: 50px
    min-width: 50px
    display: flex
    align-items: center
    justify-content: center
    background: transparent
    border: 0px
    .vs-icon-arrow
      width: 15px
      height: 15px
      display: block
      transform: rotate(-45deg)
      &:before
       width: 2px
      &:after
       height: 2px
  .vs-card__group-next
    border: 0px
    z-index: 2
    position: relative
    left: 0px
    width: 50px
    height: 50px
    min-width: 50px
    display: flex
    align-items: center
    justify-content: center
    background: transparent
    .vs-icon-arrow
      width: 15px
      height: 15px
      display: block
      transform: rotate(135deg)
      &:before
       width: 2px
      &:after
       height: 2px
</style>
