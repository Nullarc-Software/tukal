<template>
  <div
    class="vs-checkbox-content"
    :class="[
      { 'vs-checkbox--checked': isChecked },
      { 'vs-checkbox--disabled': $attrs.hasOwnProperty('disabled') },
      { 'vs-checkbox--loading': loading },
      { 'vs-checkbox--label-before': labelBefore },

      // colors
      {
        [`vs-component--primary`]:
          !danger && !success && !warn && !dark && !color,
      },
      { [`vs-component--danger`]: !!danger },
      { [`vs-component--warn`]: !!warn },
      { [`vs-component--success`]: !!success },
      { [`vs-component--dark`]: !!dark },
    ]"
  >
    <div class="vs-checkbox-con">
      <input
        class="vs-checkbox"
        type="checkbox"
        v-bind="$attrs"
        :id="`input-${uid}`"
        v-on="listeners"
        :checked="checkedForce || isChecked"
      />
      <div class="vs-checkbox-mask" :indeterminate="indeterminate">
        <slot v-if="$slots.icon" name="icon" />
		<vs-icon v-else >check</vs-icon>
      </div>
    </div>
    <label
      :for="`input-${uid}`"
      :class="['vs-checkbox-label', { ['lineThrough']: lineThrough }]"
    >
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { watch } from "vue";
import _color from "../../utils/color";
import vsComponent from "../vsComponent";

let uid_ = 0;

export default defineComponent({
  name: "VsCheckbox",
  extends: vsComponent,
  props: {
    value: { type: [Array, String, Boolean], default: "" },
    val: { default: "" },
    notValue: { default: "" },
    indeterminate: { type: Boolean, default: false },
    lineThrough: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    checkedForce: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    labelBefore: { type: Boolean, default: false },
  },
  emits: ["update:value", "change", "mousedown", "blur"],
  setup(props, context) {
    let uid = uid_++;

    watch(
      () => props.indeterminate,
      (val: boolean) => {
        if (val) context.emit("update:value", true);
        else context.emit("update:value", false);
      }
    );

    const listeners = computed(() => {
      return {
        // ...$listeners,
        input: (evt: any) => {
          if (typeof props.value == "boolean") {
            context.emit("update:value", !props.value);
          } else if (typeof props.value == "object" && props.value !== null) {
            const array = props.value;
            const containValue =
              array.indexOf(props.val) === -1 &&
              JSON.stringify(array).indexOf(JSON.stringify(props.val)) === -1;
            let indexVal = 0;

            array.forEach((item: any, index: number) => {
              if (JSON.stringify(item) == JSON.stringify(props.val)) {
                indexVal = index;
              }
            });

            if (containValue) {
              array.push(props.val);
            } else {
              array.splice(indexVal, 1);
            }

            context.emit("update:value", array);
          } else {
            if (props.val !== props.value) {
              context.emit("update:value", props.val);
            } else {
              context.emit("update:value", props.notValue || null);
            }
          }
          context.emit("mousedown", evt);
        },
        blur: (evt: EventTarget) => {
          context.emit("blur", evt);
        },
        // input: (evt) => {
        //   toggleValue(evt)
        // }
      };
    });

    const isChecked = computed(() => {
      let isChecked = false;

      if (props.value) {
        if (typeof props.value == "boolean") {
          isChecked = props.value;
        } else if (typeof props.value == "object" && props.value !== null) {
          const array = props.value;
          const containValue =
            array.indexOf(props.val) === -1 &&
            JSON.stringify(array).indexOf(JSON.stringify(props.val)) === -1;
          let indexVal = 0;

          array.forEach((item: any, index: number) => {
            if (JSON.stringify(item) == JSON.stringify(props.val)) {
              indexVal = index;
            }
          });

          if (containValue) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        isChecked = false;
      }
      return isChecked;
    });

    onMounted(() => {
      if (props.checked && typeof props.value == "boolean") {
        context.emit("update:value", true);
      }
    });

    return {
      listeners,
      isChecked,
      uid,
    };
  },
});
</script>

<style lang="sass">
@import '../../style/sass/_mixins'
@import '../../style/sass/root'

.vs-checkbox-content
  --vs-getColor: var(--vs-primary)
  display: inline-flex
  align-items: center
  justify-content: flex-start

.vs-checkbox-con
  width: 23px
  height: 23px
  border-radius: 9px
  position: relative
  z-index: 1

.vs-checkbox-mask
  border-radius: 32%
  width: 100%
  height: 100%
  position: absolute
  // border: 2px solid transparent
  z-index: 50
  cursor: pointer
  pointer-events: none
  box-sizing: border-box
  transition: all .25s ease
  display: flex
  align-items: center
  justify-content: center
  z-index: -1
  box-sizing: border-box
  i:not(.vs-icon-check)
    opacity: 0
    transition: all .25s ease
    color: #fff
    font-size: 1.1em
    transform: scale(.5)
  &:after
    content: ''
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 100%
    background: -getColor('color', 1)
    transform: scale(.5)
    border-radius: inherit
    opacity: 0
    transition: all .25s ease
    z-index: -1
  &:before
    content: ''
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 100%
    border-radius: inherit
    transition: all .25s ease
    z-index: -1
    border: 2px solid -getColor('gray-4', 1)
    box-sizing: border-box
  .vs-icon-check
    opacity: 0
    z-index: 200

.vs-checkbox
  position: absolute
  width: 100%
  height: 100%
  top: 0px
  left: 0px
  margin: 0px
  padding: 0px
  opacity: 0
  z-index: 100
  cursor: pointer
  &:disabled
    opacity: 0
    pointer-events: none
  &:active
    ~ .vs-checkbox-mask
      background: -getColor('gray-4', 1) !important
  &:hover
    ~ .vs-checkbox-mask
      background: -getColor('gray-3', 1)
      &:before
        border: 2px solid -getColor('gray-4', 0)
      // border: 2px solid -getColor('gray-3', 1)
  &:checked
    &:hover
      ~ .vs-checkbox-mask
        box-shadow: 0px 3px 15px 0px -getColor('color', .35)
    ~ .vs-checkbox-mask
      // border: 2px solid -getColor('color', 1) !important
      box-shadow: 0px 0px 0px 0px -getColor('color', .35)
      i:not(.vs-icon-check)
        opacity: 1
        transform: scale(1)
        transition: all .25s ease .15s
      .vs-icon-check
        opacity: 1
        span
          .line1
            &:after
              width: 100%
              transition: all .25s ease .1s
          .line2
            &:after
              transition: all .2s ease .30s
              height: 100%
      &:after
        opacity: 1
        transform: scale(1)
      &:before
        opacity: 0
        transform: scale(1.2)

.vs-checkbox-label
  user-select: none
  cursor: pointer
  padding: 7px
  transition: all .25s ease
  position: relative
  display: flex
  align-items: center
  justify-content: center
  font-size: .9rem
  &:before
    position: absolute
    width: 0px
    height: 2px
    background: -getColor('text', .6)
    content: ''
    transition: all .25s ease

.vs-checkbox--disabled
  pointer-events: none
  .vs-checkbox-label
    opacity: .5
  .vs-checkbox-mask
    opacity: .6
    background: transparent !important

.vs-checkbox--checked
  .lineThrough
    opacity: .4
    &:before
      width: calc(100% - 10px)

.vs-checkbox--loading
  pointer-events: none
  &.vs-checkbox--checked
    .vs-checkbox-mask
      background: transparent !important
      &:before
        border-radius: 50%
        border: 2px solid -getColor('color', 1) !important
        border-top: 2px solid transparent !important
        animation: rotateCheckboxLoading .6s linear infinite
        opacity: 1 !important
      &:after
        opacity: 0
        transform: scale(.5)
  .vs-checkbox-mask
    background: transparent !important
    &:before
      border-radius: 50%
      border: 2px solid -getColor('gray-4', 1) !important
      border-top: 2px solid transparent !important
      animation: rotateCheckboxLoading .6s linear infinite

@keyframes rotateCheckboxLoading
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

.vs-checkbox--label-before
  .vs-checkbox-label
    order: -1
</style>
