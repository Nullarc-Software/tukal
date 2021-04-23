<template>
    <div
        class="vs-input-parent"
        :style="{
            ['--vs-getColor']: color ? getColor(color) : ''
        }"
        :class="[
            `vs-input-parent--state-${state}`,
            { 'vs-input-parent--border': !!border },
            { 'vs-input-parent--shadow': !!shadow },
            { [`vs-input-content--has-label`]: label || labelPlaceholder },
            { block: block },
            { transparent: transparent },
            { textWhite: textWhite },
            { square: square },

            // colors
            {
                [`vs-component--primary`]:
                    !danger && !success && !warn && !dark && !color
            },
            { [`vs-component--danger`]: !!danger },
            { [`vs-component--warn`]: !!warn },
            { [`vs-component--success`]: !!success },
            { [`vs-component--dark`]: !!dark },
            { [`vs-component--is-getColor`]: !!isColor }
        ]"
    >
        <div
            class="vs-input-content"
            :class="[
                { [`vs-input-content--has-getColor`]: hasColor },
                {
                    [`vs-input-content--has-label`]:
                        label || labelPlaceholder
                }
            ]"
        >
            <input
                class="vs-input"
                :value="value"
                :class="[
                    { ['vs-input--has-icon']: !!$slots.icon },
                    { ['vs-input--has-icon--after']: !!iconAfter }
                ]"
                v-bind="$attrs"
                @input="onInput"
                placeholder
                :id="getId"
            />
            <label
                v-if="label"
                :for="getId"
                :class="[
                    'vs-input__label',
                    { 'vs-input__label--hidden': value !== '' }
                ]"
            >
                {{ placeholder }}
            </label>
            <label
                :for="getId"
                :class="[
                    'vs-input__label',
                    { 'vs-input__label--placeholder': labelPlaceholder },
                    {
                        'vs-input__label--hidden':
                            value !== '' ||
                            $attrs.type == 'date' ||
                            $attrs.type == 'time'
                    },
                    { 'vs-input__label--label': label }
                ]"
            >
                {{ label || placeholder || labelPlaceholder }}
            </label>
            <span
				v-if="$slots.icon"
                class="vs-input__icon"
                :class="[
                    { 'vs-input__icon--after': iconAfter },
                    { 'vs-input__icon--click': !!$attrs['click-icon'] }
                ]"
                @click="iconClick"
            >
                <slot name="icon" />
            </span>
            <div v-if="loading" class="vs-input__loading" />
            <div class="vs-input__affects">
                <div class="vs-input__affects__1" />
                <div class="vs-input__affects__2" />
                <div class="vs-input__affects__3" />
                <div class="vs-input__affects__4" />
            </div>
        </div>
        <div
			v-if="progress > 0"
            class="vs-input__progress"
            :class="[
                { 'vs-input__progress--danger': progress < 33 },
                {
                    'vs-input__progress--warn':
                        progress < 66 && progress > 33
                },
                { 'vs-input__progress--success': progress > 66 }
            ]"
        >
            <div
                class="vs-input__progress_bar"
                :style="{ width: `${progress}%` }"
            />
        </div>
        <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div
                v-if="$slots[`message-success`]"
                class="vs-input__message vs-input__message--success"
            >
                <slot name="message-success" />
            </div>
        </transition>
        <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div
                v-if="$slots['message-danger']"
                class="vs-input__message vs-input__message--danger"
            >
                <slot name="message-danger" />
            </div>
        </transition>
        <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div
                v-if="$slots[`message-warn`]"
                class="vs-input__message vs-input__message--warn"
            >
                <slot name="message-warn" />
            </div>
        </transition>
        <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div
                v-if="$slots[`message-primary`]"
                class="vs-input__message vs-input__message--primary"
            >
                <slot name="message-primary" />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import _color from "../../utils/color";
import vsComponent from "../vsComponent";

class InputConstants {
	public static id = 0;
}

export default defineComponent({
    name: "VsInput",
    extends: vsComponent,
    props: {
        value: { default: "" },
        labelPlaceholder: { default: "" },
        label: { default: "" },
        block: { type: Boolean, default: false },
        iconAfter: { type: Boolean, default: false },
        visiblePassword: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        color: { type: String, default: null },
        state: { type: String, default: null },
        progress: { type: Number, default: 0 },
        border: { type: Boolean, default: false },
        shadow: { type: Boolean, default: false },
        transparent: { type: Boolean, default: false },
        textWhite: { type: Boolean, default: false },
        square: { type: Boolean, default: false },
        id: { type: String, default: null },
		placeholder: {type: String, default: null},
    },
	emits: [
		"update:value",
		"click-icon"
	],
    setup(props, context) {
        const getId = computed(() => {
            return `vs-input--${props.id || ++InputConstants.id}`;
        });

        const hasColor = computed(() => {
            return (
                props.color ||
                props.primary ||
                props.danger ||
                props.success ||
                props.dark ||
                props.warn
            );
        });

		const  beforeEnter = function(el: any) {
				el.style.height = 0
			};

			const enter = function(el: any, done: any) {
				let h = el.scrollHeight
				el.style.height = h - 1 + 'px'
				done();
			};

			const leave = function(el: any, done: any) {
				el.style.minHeight = '0px'
				el.style.height = '0px'
			};

		const onInput = function(evt){
			context.emit("update:value", evt.target.value);
		}

		const iconClick = function(evt){
			context.emit("click-icon", evt.target.value);
		}

		return{
			enter,
			beforeEnter,
			leave,
			onInput,
			iconClick,
			hasColor,
			getId
		}
    }
});
</script>
<style lang="sass">
@import "../../style/sass/_mixins"

@mixin state($color)
  .vs-input
    background: -getColor($color,.1) !important
    color: -getColor($color,1)
  .vs-input__label
    color: -getColor($color,1)
  .vs-input__icon
    color: -getColor($color,1)
    background: -getColor($color,.1)
    box-shadow: -15px 10px 10px -10px -getColor($color,.1)

.vs-input-parent
  --vs-color: var(--vs-primary)
  display: inline-flex
  align-self: center
  justify-content: center
  flex-direction: column
  position: relative
  margin:5px
  padding: 5px
  &.square
    .vs-input-content
      border-radius: 0px !important
  &.textWhite
    .vs-input
      color: #fff
  &.transparent
    .vs-input
      background: transparent !important
  &.block
    width: 100%
    .vs-input
      width: 100%
  &--has-label
    margin-top: 20px !important
  &--state-success
    @include state('success')
  &--state-danger
    @include state('danger')
  &--state-warn
    @include state('warn')
  &--state-dark
    @include state('dark')
  &--state-primary
    @include state('primary')

.vs-input-content
  display: flex
  align-items: center
  justify-content: flex-start
  position: relative
  border-radius: 12px
  + .vs-input__message
    padding-top: 2px

  &--has-getColor
    .vs-input
      // box-shadow: 0px 10px 20px -5px -getColor('color',.3)
      &:focus
        border-bottom: 2px solid -getColor('color',1)
        ~ .vs-input__icon
          color: -getColor('color',1)
        ~ .vs-input__label
          color: -getColor('color',1)
        ~ .vs-input__label--placeholder
          color: -getColor('color',1)

.vs-input
  border: 2px solid transparent
  background: -getColor('gray-2')
  color: -getColor('text')
  padding: 7px 13px
  border-radius: inherit
  transition: all .25s ease
  padding-left: 10px
  width: 200px
  &:focus
    background: -getColor('gray-3')
    padding-left: 15px
    &.vs-input--has-icon:not(.vs-input--has-icon--after)
      padding-left: 40px
      ~ .vs-input__icon
        box-shadow: 15px 10px 10px -10px rgba(0,0,0, -var(shadow-opacity))
      ~ .vs-input__label:not(.vs-input__label--placeholder):not(.vs-input__label--label)
        left: 44px
    ~ .vs-input__icon
      box-shadow: -15px 10px 10px -10px rgba(0,0,0, -var(shadow-opacity))
      transform: translate(-6px, -6px)
      background: -getColor('gray-1')
      &--after
        transform: translate(6px, -6px)

    ~ .vs-input__label:not(.vs-input__label--placeholder):not(.vs-input__label--label)
      opacity: 0
      left: 20px
    ~ .vs-input__label--placeholder
      opacity: 1
      visibility: visible
      pointer-events: auto
      transform: translate(-0.5%, -77%)
      font-size: .75rem
  &__label
    position: absolute
    left: 13px
    font-size: .8rem
    transition: all .25s ease
    cursor: text
    user-select: none
    pointer-events: none
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: flex-start
    opacity: .4
    &--hidden
      opacity: 0
      visibility: hidden
      &.vs-input__label--placeholder
        opacity: 1
        visibility: visible
        pointer-events: auto
        transform: translate(-3px, -80%)
        font-size: .75rem
    &--label
      opacity: 1
      visibility: visible
      pointer-events: auto
      transform: translate(-2px, -77%)
      font-size: .75rem
  &--has-icon
    padding-left: 38px
    ~ .vs-input__label
      left: 44px

    &--after
      padding-left: 7px
      padding-right: 38px
      ~ .vs-input__label
        left: 13px
      &.vs-input__label--label
        transform: translate(calc(-3px - 22px), -80%) !important
    &:focus
      &--has-icon
        &--after
          ~ .vs-input__label
            left: 44px
          ~ .vs-input__label--placeholder
            transform: translate(calc(-3px - 22px), -20%) !important
          ~ .vs-input__label
            left: 44px

  &__icon
    position: absolute
    right: auto
    width: 36px
    height: 36px
    display: flex
    align-items: center
    justify-content: center
    box-shadow: 12px 0px 10px -10px rgba(0,0,0,-var(shadow-opacity))
    transition: all .25s ease
    border-radius: inherit
    background: -getColor('gray-2')
    pointer-events: none
    left: 0px
    &--after
      left: auto
      right: 0px
      box-shadow: -12px 0px 10px -10px rgba(0,0,0, -var(shadow-opacity))
    &--click
      pointer-events: auto !important
      cursor: pointer
      &:hover
        box-shadow: -15px 10px 10px -10px rgba(0,0,0, -var(shadow-opacity))
        transform: translate(-6px, -6px)
        background: -getColor('gray-1')
        &.vs-input__icon--after
          transform: translate(6px, -6px)

  &__message
    font-size: .7rem
    position: relative
    padding: 0px 7px
    transition: all .25s ease
    overflow: hidden
    &--success
      color: -getColor('success',1)
    &--danger
      color: -getColor('danger',1)
    &--warn
      color: -getColor('warn',1)
    &--dark
      color: -getColor('dark',1)
    &--primary
      color: -getColor('primary',1)

  &__progress
    width: 95%
    left: 2.5%
    position: relative
    height: 2px
    background: -getColor('gray-2')
    margin-top: 5px
    overflow: hidden
    border-radius: 5px
    &--danger
      .vs-input__progress__bar
        background: -getColor('danger',1)
    &--warn
      .vs-input__progress__bar
        background: -getColor('warn',1)
    &--success
      .vs-input__progress__bar
        background: -getColor('success',1)
    &__bar
      width: 32%
      height: 2px
      max-width: 100%
      transition: all .25s ease
      border-radius: 5px

  &__loading
    position: absolute
    width: 22px
    height: 22px
    right: 7px
    pointer-events: none
    border-radius: 50%
    box-sizing: border-box
    background: inherit
    cursor: default
    &:after
      box-sizing: border-box
      position: absolute
      width: 100%
      height: 100%
      border: 2px solid -getColor('primary',1)
      border-radius: inherit
      border-top: 2px solid transparent
      border-left: 2px solid transparent
      border-right: 2px solid transparent
      animation: rotateInputLoading .8s ease infinite
      top: 0px
      content: ''
    &:before
      box-sizing: border-box
      top: 0px
      position: absolute
      width: 100%
      height: 100%
      border: 2px dashed -getColor('primary',1)
      border-radius: inherit
      border-top: 2px solid transparent
      border-left: 2px solid transparent
      border-right: 2px solid transparent
      animation: rotateInputLoading .8s linear infinite
      opacity: .2
      content: ''

.vs-input-parent
  &--border
    .vs-input__icon
      background: transparent !important
      box-shadow: none !important
    .vs-input-content
      border-radius: 0px
      .vs-input__affects
        width: 100%
        height: 100%
        position: absolute
        top: 0px
        left: 0px
        pointer-events: none
        &__1
          border-bottom: 2px solid -getColor('gray-3')
          width: 100%
          height: 2px
          position: absolute
          bottom: 0px
          transition: all .25s ease
        &__2
          border-bottom: 2px solid -getColor('color',1)
          width: 0%
          height: 2px
          position: absolute
          bottom: 0px
          transition: all .25s ease
          left: 50%
          transform: translate(-50%)
      .vs-input
        background: transparent
        border-radius: 0px
        &:focus
          ~ .vs-input__affects
              .vs-input__affects__2
                width: 100%
  &--shadow
    .vs-input__icon
      background: transparent
      z-index: 100
      // box-shadow: none !important
    .vs-input-content
      .vs-input__affects
        width: 100%
        height: 100%
        position: absolute
        top: 0px
        left: 0px
        border-radius: inherit
        pointer-events: none
        z-index: 10
        &__1
          box-shadow: 0px 6px 25px -6px rgba(0,0,0, -var(shadow-opacity))
          width: 100%
          height: 100%
          position: absolute
          top: 0px
          transition: all .25s ease
          z-index: 200
          border-radius: inherit
      .vs-input
        background: transparent
        border-radius: 0px
        border: 2px solid transparent
        &:focus
          transform: translate(0,3px)
          ~ .vs-input__icon
            background: -getColor('background') !important
            opacity: 1
            box-shadow: 0px 10px 20px -5px rgba(0,0,0, -var(shadow-opacity)) !important
          ~ .vs-input__affects
              .vs-input__affects__1
                transform: translate(0,3px)
                box-shadow: 0px 0px 3px 0px rgba(0,0,0, -var(shadow-opacity))

@keyframes rotateInputLoading
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
