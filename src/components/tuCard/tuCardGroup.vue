<template>
	<div class="tu-card__group">
		<button
			class="tu-card__group-prev"
			@click="handleClick($event, 'left')"
		>
			<tu-icon>keyboard_arrow_left</tu-icon>
		</button>
		<div class="tu-card__group-cards" ref="cards">
			<slot />
			<div class="tu-card__group-space"></div>
		</div>
		<button
			class="tu-card__group-next"
			@click="handleClick($event, 'right')"
		>
			<tu-icon>keyboard_arrow_right</tu-icon>
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import tuIcon from "../tuIcon";
export default defineComponent({
	name: "TuCardGroup",
	components: {
		tuIcon
	},
	setup (props, context) {
		const cards = ref<HTMLDivElement>();

		const handleClick = function (evt, dir) {
			if (dir == "left") {
				cards.value?.scrollTo(
					cards.value?.scrollLeft - cards.value?.clientWidth,
					0
				);
			}
			else {
				cards.value?.scrollTo(
					cards.value?.scrollLeft + cards.value?.clientWidth,
					0
				);
			}
		};

		return {
			cards,
			handleClick
		};
	}
});
</script>

<style lang="sass">
// @import '../../../styles/mixins'
.tu-card__group
  width: 100%
  display: flex
  position: relative
  align-items: center
  &-space
    min-width: 20px
    position: relative
    height: 20px
  .tu-card__group-cards
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
    .tu-card-content
      min-width: 350px
      margin-left: 20px
  .tu-card__group-prev
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
    .tu-icon-arrow
      width: 15px
      height: 15px
      display: block
      transform: rotate(-45deg)
      &:before
       width: 2px
      &:after
       height: 2px
  .tu-card__group-next
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
    .tu-icon-arrow
      width: 15px
      height: 15px
      display: block
      transform: rotate(135deg)
      &:before
       width: 2px
      &:after
       height: 2px
</style>
