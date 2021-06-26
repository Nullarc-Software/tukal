<template lang="html">
	<!-- @contextmenu.capture.prevent -->
 <button
    ref="dropdown"
    v-bind="$attrs"
    class="vs-con-dropdown parent-dropdown"
    type="button"
    v-on="listeners">
    <slot/>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, provide, ref, watch } from "vue";
import { vsButton } from "../vsButton";

export default defineComponent({
	name: "VsDropdown",
	inheritAttrs: false,
	components: {
		vsButton,
	},
	props: {
		vsTriggerClick: {
			default: false,
			type: Boolean,
		},
		color: {
			default: "primary",
			type: String,
		},
		vsCustomContent: {
			default: false,
			type: Boolean,
		},
		vsDropRight: {
			default: false,
			type: Boolean,
		},
		vsTriggerContextmenu: {
			default: false,
			type: Boolean,
		},
	},
	provide() {
		return {
			dropdownVisible: computed(() => this.vsDropdownVisible),
			topx: computed(() => this.topx),
			leftx: computed(() => this.leftx),
			setInitialSize: (width, height, offsetWidth) => {
				this.contentW = width;
				this.contentH = height;
				this.contentOffsetW = offsetWidth;
				this.changePositionMenu();
			},
			setHoverMenu: (hovered) => {
				this.menuHover = hovered;
			},
			notHeight: computed(() => this.childNotHeight),
			vsTriggerClick: computed(() => this.vsTriggerClick)
		};
	},
	setup(props, context) {
		let vsDropdownVisible = ref(false);
		let rightx = ref(false);
		let childNotHeight = ref(false);
		let menuHover = ref(false);
		let dropdown = ref<HTMLButtonElement>();
		let topx = ref(0);
		let leftx = ref(0);
		let contentW = ref(0);
		let contentH = ref(0);
		let contentOffsetW = ref(0);


		provide("parent", dropdown);
		provide("parentColor", props.color);

		const listeners = computed(() => {
			return {
				click: (evt) => {
					if (props.vsTriggerClick) {
						toggleMenu("click", evt);
					}

					if (dropdown.value === evt.target) {
						context.emit("click");
					}
				},
				mouseleave: (evt) => toggleMenu("out", evt),
				mouseenter: (evt) => toggleMenu("over", evt),
			};
		});

		const clickListener = function (evt) {
			if (
				!evt.target.closest(".vs-con-dropdown") &&
				!evt.target.closest(".vs-dropdown--menu") &&
				!evt.target.closest(".vs-dropdown")
			) {
				vsDropdownVisible.value = false;
				window.removeEventListener("click", clickListener);
			}
		};

		const toggleMenu = function (typex, evt) {
			if (evt.type == "contextmenu") 
				evt.preventDefault();

			if (typex == "click") {
				if (props.vsTriggerClick || props.vsTriggerContextmenu) {
					if (
						evt.target &&
						vsDropdownVisible.value &&
						!evt.target?.closest(".vs-dropdown--menu")
					) {
						vsDropdownVisible.value = false;
					} else {
						vsDropdownVisible.value = true;
						window.addEventListener("click", clickListener);
					}
				}
			}
			else
			{
				if (!props.vsTriggerClick && !props.vsTriggerContextmenu) {
				if (typex == "over") {
					vsDropdownVisible.value = true;
					console.log("over");
				} 
				else {
					if ( !menuHover.value) {
						vsDropdownVisible.value = false;
						console.log("out");
					}
				}
			}
			}			
		};

		const changePositionMenu = function () {
			let scrollTopx =
				window.pageYOffset || document.documentElement.scrollTop;

			if (
				dropdown.value &&
				dropdown.value?.getBoundingClientRect().top + 300 >=
					window.innerHeight
			) {
				nextTick(() => {
					if (dropdown.value) {
						topx.value =
							dropdown.value?.getBoundingClientRect().top -
							contentH.value -
							7 +
							scrollTopx;
						childNotHeight.value = true;
					}
				});
			} else {
				childNotHeight.value = false;
				if (dropdown.value) {
					topx.value =
						dropdown.value?.getBoundingClientRect().bottom +
						scrollTopx -
						5;
				}
			}

			nextTick(() => {
				var w =
					window.innerWidth ||
					document.documentElement.clientWidth ||
					document.body.clientWidth;
				if (
					dropdown.value &&
					dropdown.value?.getBoundingClientRect().left +
						contentOffsetW.value >=
						w - 25
				) {
					// this.rightx = true
				}
				if (
					dropdown.value &&
					dropdown.value?.getBoundingClientRect().right <
						contentW.value + 25
				) {
					leftx.value =
						contentW.value +
						dropdown.value?.getBoundingClientRect().left;
					rightx.value = true;
					return;
				}
				if (dropdown.value)
					leftx.value =
						dropdown.value?.getBoundingClientRect().left +
						(props.vsDropRight
							? contentW.value
							: dropdown.value?.clientWidth) -
						100;
			});
		};

		watch(vsDropdownVisible, (value) => {
			//changePositionMenu();
			if (vsDropdownVisible.value) {
				context.emit("focus");
				document.addEventListener("click", clickListener);
			}
		});

		return {
			listeners,
			vsDropdownVisible,
			rightx,
			topx,
			leftx,
			contentW,
			contentH,
			childNotHeight,
			contentOffsetW,
			changePositionMenu,
			dropdown,
			menuHover
		};
	},
});
</script>

<style lang="scss" scoped>


.dropdown-group-enter-active,
.dropdown-group-leave-active {
	transition: opacity 0.25s;
}
.dropdown-group-enter,
.dropdown-group-leave-to {
	opacity: 0;
}
.vs-con-dropdown {
	position: relative;
	display: inline-block;
	border: 0px;
	background: transparent;
	* {
		pointer-events: none;
	}
	a {
		user-select: none !important;
	}
	&:active {
		opacity: 1 !important;
	}
}
.vuesax-app-is-rtl {
	::v-deep(.vs-con-dropdown) {
		::v-deep(.a-icon) {
			flex-direction: row-reverse;
		}
	}
}

.vs-dropdown--group {
	position: relative;
	list-style: none;
	width: calc(100% - 6px);
	margin-left: 3px;
	width: auto;
	display: block;
	padding: 5px;
	padding-left: 10px;
	padding-right: 10px;
	box-sizing: border-box;
	cursor: pointer;
	transition: all 0.3s ease;
	&.marginIcon {
		padding-right: 25px;
		&:hover {
			::v-deep(.con-dropdown--group) {
				border-left: 1px solid rgba(0, 0, 0, 0.1);
			}
			& > .icon-group {
				transform: translate(0, -50%) rotate(-180deg);
				opacity: 0;
			}
		}
	}
}
.vs-dropdown--group-label {
	font-size: 0.9375em;
	font-weight: normal;
	pointer-events: none;
}
.vs-dropdown--group-icon {
	position: absolute;
	right: 4px;
	font-size: 1.125em;
	top: 50%;
	transition: all 0.25s ease;
	transform: translate(0, -50%);
}
.con-dropdown--group-con-ul {
	padding-left: 3px;
	position: relative;
	right: 0px;
	top: 0px;
	min-width: 130px;
	width: auto;
	z-index: 1000;
	background: inherit;
	overflow: hidden;
	transition: all 0.3s ease;
	border-left: 1px solid rgba(0, 0, 0, 0.1);
}
.con-dropdown--group-ul {
	padding-top: 5px;
	padding-left: 0px;
	position: relative;
	background: #fff;
	border-radius: 5px;
}

.no-cascading {
	font-weight: bold;
	border-top: 1px solid rgba(0, 0, 0, 0.05);
	padding-left: 0px !important;
	padding-right: 0px !important;
	margin-top: 5px !important;
	margin-left: 0px;
	& > h3 {
		padding: 0px 10px;
		font-size: 0.9375em;
		padding-top: 6px;
		padding-bottom: 6px;
		cursor: default;
	}
	::v-deep(.con-dropdown--group-no-cascading) {
		width: 100% !important;
		font-weight: bold;
		height: auto !important;
		opacity: 1 !important;
		border-left: 1px solid rgba(0, 0, 0, 0) !important;
		ul {
			width: 100%;
			box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0) !important;
			padding-left: 0px !important;
		}
	}
}

.vs-dropdown--custom {
	padding: 5px !important;
	padding-top: 8px !important;
}
</style>
