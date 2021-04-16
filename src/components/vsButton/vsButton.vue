<template lang="html">
	<button
		ref="btn"
		v-bind="$attrs"
		:class="[
			`vs-button-${isColor() ? color : null}`,
			`vs-button-${type}`,
			{
				isActive: isActive,
				includeIcon: icon,
				includeIconOnly: icon && !$slots.default,
				'vs-radius': radius,
			},
			size,
		]"
		:style="[
			styles,
			{
				width: /[px]/.test(size) ? `${size}` : null,
				height: /[px]/.test(size) ? `${size}` : null,
			},
		]"
		:type="button"
		class="vs-component vs-button"
		name="button"
		v-on="listeners"
	>
		<span
			v-if="!is('line') && !is('gradient') && !is('relief')"
			ref="backgroundx"
			:style="stylesBackGround()"
			class="vs-button-backgroundx vs-button--background"
		>
		</span>

		<vs-icon
			v-if="icon"
			:style="{
				order: iconAfter ? 2 : 0,
				['margin-' + isRTL('left')]:
					$slots.default && !iconAfter ? '5px' : '0px',
				['margin-' + isRTL('right')]:
					$slots.default && iconAfter ? '5px' : '0px',
			}"
			:icon-pack="iconPack"
			:icon="icon"
			class="vs-button--icon"
		></vs-icon>

		<span v-if="$slots.default" class="vs-button-text vs-button--text">
			<slot />
		</span>

		<span ref="linex" :style="styleLine" class="vs-button-linex" />
	</button>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, ref } from "vue";
import _color from "../../utils/color";
import {useRouter} from "vue-router";
import { useVs } from "@/functions";

export default defineComponent({
	name: "VsButton",
	inheritAttrs: false,
	props: {
		type: {
			default: "filled",
			type: String,
		},
		color: {
			default: "primary",
			type: String,
		},
		textColor: {
			default: null,
			type: String,
		},
		lineOrigin: {
			default: "center",
			type: String,
		},
		linePosition: {
			default: "bottom",
			type: String,
		},
		gradientDirection: {
			default: "30deg",
			type: String,
		},
		gradientColorSecondary: {
			default: "primary",
			type: String,
		},
		size: {
			type: String,
			default: null,
		},
		icon: {
			type: String,
			default: null,
		},
		iconPack: {
			type: String,
			default: "material-icons",
		},
		iconAfter: {
			default: false,
			type: Boolean,
		},
		radius: {
			default: false,
			type: Boolean,
		},
		to: {
			default: '',
			type: [String, Object],
		},
		href: {
			default: "",
			type: [String],
		},
		target: {
			default: false,
			type: [Boolean, String],
		},
		button: {
			default: "button",
			type: String,
		},
	},
	emits: [
		"routeErr",
		"mouseover",
		"mouseout",
		"blur",
		"click"
	],
	setup: function(props, context){

		let isActive 	= ref(false);
		let hoverx		= ref(false);
		let leftBackgorund = ref(20);
		let topBackgorund = ref(20);
		let radio		= ref(0);
		let time		= ref(0.3);
		let timeOpacity = ref(0.3);
		let opacity		= ref(1);

		let btn = ref<HTMLButtonElement>();
		let backgroundx = ref<HTMLSpanElement>();
		let linex = ref<HTMLSpanElement>();		
		const inst = getCurrentInstance();
		let vs = useVs();

		const isRTL = (value: string) => {
			if (vs.rtl) {
				return value;
			} else {
				if (value === "right") {
					return "left";
				}
				if (value === "left") {
					return "right";
				}
				return "right";
			}
		};
		const routerPush = () => {
			useRouter().push(props.to).catch((err) => {				
				context.emit("routeErr", err);
			});			
		};
		const is = (which) => {
			let type = props.type;
			return type == which;
		};
		const mouseoverx = (event) => {
			context.emit("mouseover", event);
			hoverx.value = true;
		};
		const mouseoutx = (event) => {
			context.emit("mouseout", event);
			hoverx.value= false;
		};
		const blurButton = (event) => {
			context.emit("blur", event);
			nextTick(() => {
				if (props.type == "border" || props.type == "flat") {
					opacity.value = 0;
					setTimeout(() => {
						radio.value = 0;
					}, 150);
					isActive.value = false;
				}
			});
		};
		const clickButton = (event) => {
			context.emit("click", event);
			nextTick(() => {
				if (isActive.value) {
					return;
				}
				if (props.to) {
					routerPush;
				}
				if (props.href) {
					if (typeof props.href == "string") {
						props.target
							? window.open(props.href)
							: (window.location.href = props.href);
					} 
				}
				if (props.type == "border" || props.type == "flat") {
					isActive.value = true;
				}
								
				let xEvent = event.offsetX;
				let yEvent = event.offsetY;
				
				let radio1 = btn.value?.clientWidth ? btn.value?.clientWidth * 3 : 3;
				time.value =
					(btn.value?.clientWidth ?? 1) /
					(btn.value?.clientWidth ?? + (is("border") || is("flat") ? 70 : 20));
				if (is("filled")) {
					timeOpacity.value = time.value;
				}

				if (event.srcElement ? event.srcElement != btn.value : false) {
					xEvent += event.target.offsetLeft;
					yEvent += event.target.offsetTop;
				}
				leftBackgorund.value = xEvent;
				topBackgorund.value = yEvent;
				radio.value = radio1;
				if (is("filled")) {
					opacity.value = 0;
				} else {
					opacity.value = 1;
				}

				if (is("filled")) {
					setTimeout(() => {
						time.value= timeOpacity.value = radio.value = 0;
						opacity.value = 1;
						isActive.value = false;
					}, time.value* 1100);
				} else {
					setTimeout(() => {
						timeOpacity.value = 0.15;
					}, time.value* 1100);
				}
			});
		};
		const isColor = () => {
			return _color.isColor(props.color);
		};
		const styles = () => {
			if (is("filled")) {
				return {
					color: _color.getColor(props.textColor, 1),
					background: _color.getColor(props.color, 1),
					boxShadow: hoverx.value
						? `0px 8px 25px -8px ${_color.getColor(props.color, 1)}`
						: null,
				};
			} else if (is("border") || is("flat")) {
				return {
					border: `${is("flat") ? 0 : 1}px solid ${_color.getColor(
						props.color,
						1
					)}`,
					background: hoverx.value
						? _color.getColor(props.color, 0.1)
						: "transparent",
					color:
						_color.getColor(props.textColor, 1) ||
						_color.getColor(props.color, 1),
				};
			} else if (is("line")) {
				return {
					color:
						_color.getColor(props.textColor, 1) ||
						_color.getColor(props.color, 1),
					borderBottomWidth: props.linePosition == "bottom" ? `2px` : null,
					borderColor: `${_color.getColor(props.color, 0.2)}`,
					borderTopWidth: props.linePosition == "top" ? `2px` : null,
				};
			} else if (is("gradient")) {
				let backgroundx = `linear-gradient(${
					props.gradientDirection
				}, ${_color.getColor(props.color)} 0%, ${_color.getColor(
					props.gradientColorSecondary,
					1
				)} 100%)`;
				return {
					background: backgroundx,
				};
			} else if (is("relief")) {
				let color = _color.getColor(props.color, 1);
				return {
					background: _color.getColor(props.color, 1),
					boxShadow: `0 3px 0 0 ${_color.darken(color, -0.4)}`,
				};
			}
		};
		const stylesBackGround = () => {
			let styles = {
				background:
					is("flat") || is("border")
						? _color.getColor(props.color, 1, false)
						: null,
				opacity: opacity.value,
				left: `${leftBackgorund.value}px`,
				top: `${topBackgorund.value}px`,
				width: `${radio.value}px`,
				height: `${radio.value}px`,
				transition: `width ${time.value}s ease, height ${time.value}s ease, opacity ${timeOpacity.value}s ease`,
			};

			return styles;
		};
		const styleLine = () => {
			let lineOrigin = "50%";
			if (props.lineOrigin == "left") {
				lineOrigin = "0%";
			} else if (props.lineOrigin == "right") {
				lineOrigin = "auto";
			}

			let styles = {
				top: props.linePosition == "top" ? "-2px" : "auto",
				bottom: props.linePosition == "bottom" ? "-2px" : "auto",
				background: _color.getColor(props.color, 1),
				left: lineOrigin,
				right: lineOrigin == "auto" ? "0px" : null,
				transform: lineOrigin == "50%" ? "translate(-50%)" : null,
			};

			return styles;
		}

		let listeners = computed(() => {
			return {				
				click: (event) => clickButton(event),
				blur: (event) => blurButton(event),
				mouseover: (event) => mouseoverx(event),
				mouseout: (event) => mouseoutx(event),
			};
		});

		return {
			isActive,
			hoverx,
			leftBackgorund,
			topBackgorund,
			radio,
			time,
			timeOpacity,
			opacity,
			isRTL,
			routerPush,
			is,
			mouseoverx,
			mouseoutx,
			blurButton,
			clickButton,
			isColor,
			styles,
			stylesBackGround,
			styleLine,			
			listeners,
			btn,
			backgroundx,
			linex
		}
	}
});
</script>
