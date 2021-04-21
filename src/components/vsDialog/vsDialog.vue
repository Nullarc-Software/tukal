<template>
	<transition name="vs-dialog">
		<div
			v-if="value"
			:class="[
				'vs-dialog-content',
				{
					blur: blur,
					fullScreen: fullScreen,
				},
			]"
			ref="dialog-content"
			@click="click"
		>
			<div
				class="vs-dialog"
				:style="{
					width: width,
				}"
				:class="{
					'vs-dialog--fullScreen': fullScreen,
					'vs-dialog--rebound': rebound,
					'vs-dialog--notPadding': notPadding,
					'vs-dialog--square': square,
					'vs-dialog--autoWidth': autoWidth,
					'vs-dialog--scroll': scroll,
					'vs-dialog--loading': loading,
					'vs-dialog--notCenter': notCenter,
				}"
			>
				<div v-if="loading" class="vs-dialog__loading">
					<div class="vs-dialog__loading__load"></div>
				</div>
				<vs-button v-if="!notClose" color="#1e2023" class="vs-dialog__close" @click="closeClick" >					
					<vs-icon >close </vs-icon>
				</vs-button>				
				<header v-if="$slots.header" class="vs-dialog__header">
					<slot name="header" />
				</header>
				<div
					v-if="$slots.default"
					:class="['vs-dialog__content', { notFooter: !$slots.footer }]"
				>
					<slot />
				</div>
				<footer v-if="$slots.footer" class="vs-dialog__footer">
					<slot name="footer" />
				</footer>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from "vue";
import VsButton from "../vsButton/vsButton.vue";
import vsIcon from "../vsIcon/vsIcon.vue";
import vsComponent from "../vsComponent";

export default defineComponent({
	name: "VsDialog",
	extends: vsComponent,
	components: { vsIcon, VsButton },
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		fullScreen: {
			type: Boolean,
			default: false,
		},
		notClose: {
			type: Boolean,
			default: false,
		},
		preventClose: {
			type: Boolean,
			default: false,
		},
		notPadding: {
			type: Boolean,
			default: false,
		},
		overflowHidden: {
			type: Boolean,
			default: false,
		},
		blur: {
			type: Boolean,
			default: false,
		},
		square: {
			type: Boolean,
			default: false,
		},
		autoWidth: {
			type: Boolean,
			default: false,
		},
		scroll: {
			type: Boolean,
			default: false,
		},
		notCenter: {
			type: Boolean,
			default: false,
		},
		routerClose: {
			type: Boolean,
			default: false,
		},
		width: {
			type: String,
			default: null,
		},
	},
	emits: ["update:value", "close"],
	setup(props, context) {
		let rebound = ref(false);

		const esc = function(evt: any) {
			if (evt.which == 27 && !props.preventClose) {
				context.emit("update:value", false);
				context.emit("close");
			}
		};

		const addEsc = function() {
			window.addEventListener("keydown", esc);
		};

		const insertDialog = function() {
			addEsc();
			/* nextTick(() => {
				const dialog = this.$refs["dialog-content"] as HTMLElement;
				insertBody(dialog, document.querySelector("#app"));
			}); */
		};

		watch(
			() => props.value,
			(newVal, prevVal) => {
				if (newVal) {
					insertDialog();
					if (props.overflowHidden) {
						document.body.style.overflow = "hidden";
					}
				} else {
					if (props.overflowHidden) {
						document.body.style.overflow = "";
						window.removeEventListener("keydown", esc);
					}
				}
			}
		);

		const click = function(evt) {
			if (!evt.target.closest(".vs-dialog") && !props.preventClose) {
				context.emit("update:value", !props.value);
				context.emit("close");
			}

			if (props.preventClose && !evt.target.closest(".vs-dialog")) {
				rebound.value = true;
				setTimeout(() => {
					rebound.value = false;
				}, 300);
			}
		};

		const closeClick = function(evt) {
			context.emit("update:value", !props.value);
			context.emit("close");
		};


		return {
			rebound,
			closeClick,
			click,
			insertDialog,
			esc,
			addEsc
		}
	},
});
</script>

<style lang="sass">
@import '../../style/sass/_mixins'

.vs-dialog-enter-active
  transition: all .25s ease
  .vs-dialog
    &:not(.vs-dialog--fullScreen)
      animation: rebound .4s
.vs-dialog-leave-active
  transition: all .15s ease
  .vs-dialog
    transition: all .15s ease


.vs-dialog-enter, .vs-dialog-leave-to
  opacity: 0
  .vs-dialog
    transform: scale(.7)
    box-shadow: 0px 0px 0px 0px rgba(0,0,0, -var('shadow-opacity'))
    &--fullScreen
      transform: translate(0,8%) !important

@keyframes rebound
  0%
    transform: scale(.8)
  40%
    transform: scale(1.08)
  80%
    transform: scale(0.98)
  100%
    transform: scale(1)

@keyframes reboundClick
  0%
    transform: scale(1)
  40%
    transform: scale(1.05)
  80%
    transform: scale(0.96)
  100%
    transform: scale(1)

.vs-dialog-content
  --vs-color: var(--vs-primary)
  background: rgba(0,0,0, -var('background-opacity'))
  position: fixed
  left: 0px
  top: 0px
  z-index: -var('zindex-2')
  display: flex
  align-items: flex-start
  justify-content: center
  width: 100%
  height: 100%
  max-height: 100vh
  overflow-y: auto
  overflow-x: hidden
  padding-top: 80px
  padding-bottom: 80px
  &.fullScreen
    padding: 0px
    overflow: hidden
  &.blur
    backdrop-filter: saturate(180%) blur(15px)

.vs-dialog
  background: -getColor('background')
  color: -getColor('text')
  position: relative
  min-width: 400px
  border-radius: -var('radius')
  transition: all .25s ease
  box-shadow: 0px 5px 30px 0px rgba(0,0,0, -var('shadow-opacity'))
  max-width: 800px
  margin: auto
  &--notCenter
    .vs-dialog__header
      display: block
  &__loading
    width: 100%
    position: absolute
    top: 0px
    left: 0px
    height: 100%
    border-radius: inherit
    background: -getColor('background', .8)
    z-index: 100
    display: flex
    align-items: center
    justify-content: center
    &:after
      content: ''
      position: absolute
      width: 30px
      height: 30px
      border-radius: inherit
      border: 2px solid -getColor('color', 1)
      border-top: 2px solid -getColor('color', 0)
      border-left: 2px solid -getColor('color', 0)
      border-bottom: 2px solid -getColor('color', 0)
      box-sizing: border-box
      transition: all .25s ease
      display: block
      box-shadow: 0px 0px 0px 0px -getColor('color',1)
      animation: loadingDialog .6s ease infinite
    &:before
      content: ''
      position: absolute
      width: 30px
      height: 30px
      border-radius: inherit
      border: 2px dashed -getColor('color',1)
      border-top: 2px solid -getColor('color', 0)
      border-left: 2px solid -getColor('color', 0)
      border-bottom: 2px solid -getColor('color', 0)
      box-sizing: border-box
      transition: all .25s ease
      display: block
      box-shadow: 0px 0px 0px 0px -getColor('color',1)
      animation: loadingDialog .6s linear infinite
  &--scroll
    .vs-dialog__content
      max-height: calc(80vh - 200px)
      overflow: auto
  &--autoWidth
    width: auto !important
    min-width: auto !important
    max-width: auto !important
  &--square
    border-radius: 0px
    .vs-dialog__close
      border-radius: 0px
  &--notPadding
    .vs-dialog__footer
      padding: 0px
    .vs-dialog__content
      padding: 0px
      margin-bottom: 0px !important
    .vs-dialog__header
      padding: 0px
  &--rebound
    animation: reboundClick .3s !important
  &--fullScreen
    width: calc(100% - 30px) !important
    height: calc(100% - 30px) !important
    max-width: none !important
    max-height: none !important
  &__footer
    padding: 10px 16px
    padding-top: 0px
    display: flex
    justify-content: flex-end
  &__header
    display: flex
    align-items: center
    justify-content: center
    padding: 10px 16px
  &__content
    padding: 10px 16px
    width: 100%
    position: relative
    border-radius: inherit
    &.notFooter
      margin-bottom: 20px
  &__close   
    color: -getColor('text')
    position: absolute
    padding: 0px !important
    top: -6px
    right: -6px
    padding: 0px
    margin: 0px
    display: flex
    align-items: center
    justify-content: center
    background: inherit
    border-radius: 12px
    box-shadow: 0px 5px 20px 0px rgba(0,0,0, -var('shadow-opacity'))
    transition: all .25s ease
    z-index: 200
    border: 0px
    i
      width: 34px
      height: 34px
      opacity: .7
      &:after
        width: 14px
      &:before
        width: 14px
    &:hover
      box-shadow: 0px 0px 4px 0px rgba(0,0,0, -var('shadow-opacity'))
      transform: translate(-2px, 2px)
      i
        opacity: 1
    .vs-button__content
        padding: inherit !important
        .vs-icon
            padding: 5px
		

@keyframes loadingDialog
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)

@media (max-width: 600px)
  .vs-dialog
    min-width: calc(100vw - 20px)
    max-width: calc(100vw - 20px)
    margin: auto 10px
</style>
