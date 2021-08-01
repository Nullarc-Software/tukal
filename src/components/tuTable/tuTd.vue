<template>
    <td class="tu-table__td"
        :class="{
            isCheck: checkbox,
            isEdit: edit
        }"
        @click="clickHandler"
    >
        <slot />
    </td>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import tuComponent from "../tuComponent";

export default defineComponent({
    name: "TuTd",
    extends: tuComponent,
    props: {
        checkbox: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {        
        const clickHandler = function(event) {
            context.emit("click", event);
        }

        return {
            clickHandler
        }
    }
});
</script>

<style lang="scss" scoped>
.tu-table__td {
  padding: 10px 12px;
  transition: all 0.25s ease;
  font-size: 0.8rem;
  border: 0px;

  &:last-child {
    border-radius: 0px 15px 15px 0px;
  }

  &:first-child {
    border-radius: 15px 0px 0px 15px;
  }

  &.isCheckbox {
    width: 23px;
  }

  &.isEdit {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>