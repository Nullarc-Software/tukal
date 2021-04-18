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

export default defineComponent({
	name: "VsDialog",
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

<style></style>
