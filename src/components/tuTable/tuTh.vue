<template>
	<th class="tu-table__th" :class="{ sort: sort }" v-bind="$attrs">
		<div class="tu-table__th__content">
			<slot />
			<div v-if="sort" class="tu-table__th__content__icons">
				<tu-icon>keyboard_arrow_up</tu-icon>
				<tu-icon>keyboard_arrow_down</tu-icon>
			</div>
		</div>
	</th>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from "vue";
import tuComponent from "../tuComponent";
import tuIcon from "../tuIcon";
export default defineComponent({
	name: "TuTh",
	extends: tuComponent,
	components: { tuIcon },
	props: {
		sort: {
			default: false,
			type: Boolean
		}
	},
	setup(props, context){

		let instance = getCurrentInstance();
		
		onMounted(() => {
			(instance.vnode.el as HTMLElement).style.width = `${(instance.vnode.el as HTMLElement).scrollWidth}px`;
		})

	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";
.tu-table__th {
  padding: 10px 12px;
  text-align: left;
  transition: all 0.25s ease;
  font-size: 0.8rem;
  border: 0px;

  &.sort {
    .tu-table__th__content {
      pointer-events: none;
    }

    &:hover {
      background: -getColor("gray-3");
    }
  }

  &[data-sort-type='asc'] {
    .icon-sort-2 {
      margin-top: -7px;
      transform: rotate(45deg) !important;
    }

    .icon-sort-1 {
      margin-top: -1px;
      transform: rotate(45deg) !important;
    }
  }

  &[data-sort-type='desc'] {
    .icon-sort-2 {
      margin-top: -7px;
    }

    .icon-sort-1 {
      margin-top: -1px;
      transform: rotate(-135deg) !important;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: all 0.25s ease;

    &__icons {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-left: 7px;
      transform: scale(0.8);
    }

    .tu-icon-arrow {
      position: relative;
      display: block;

      &.icon-sort-1 {
        transform: rotate(45deg);
      }

      &.icon-sort-2 {
        transform: rotate(-135deg);
      }
    }
  }
}
</style>