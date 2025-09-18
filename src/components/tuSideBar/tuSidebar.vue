<template>
	<div :style="{
		['--tu-color']: color ? getColor(color) : ''
	}" :class="[
	'tu-sidebar-content',
	{
		reduce: reduceInternal,
		open: open,
		notLineActive: notLineActive,
		square: square,
		notShadow: notShadow,
		textWhite: textWhite,
		relative: relative,
		absolute: absolute,
		right: right
	},
	// colors
	{ [`tu-component--${color}`]: color },
	{ [`tu-component--is-color`]: !!isColor }
]" v-on="listeners" ref="sidebar" v-bind="$attrs">
		<div v-if="$slots.logo" class="tu-sidebar__logo">
			<slot name="logo" />
		</div>
		<div v-if="$slots.header" class="tu-sidebar__header">
			<slot name="header" />
		</div>
		<div class="tu-sidebar">
			<slot />
		</div>

		<div v-if="$slots.footer" class="tu-sidebar__footer">
			<slot name="footer" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { setColor } from "@/utils";
import { computed, inject, onMounted, provide, ref, watch } from "vue";

defineOptions({
	name: "TuSidebar"
});

interface Props {
	value?: string | number | null;
	reduce?: boolean;
	hoverExpand?: boolean;
	open?: boolean;
	notLineActive?: boolean;
	square?: boolean;
	textWhite?: boolean;
	notShadow?: boolean;
	relative?: boolean;
	absolute?: boolean;
	right?: boolean;
	background?: string;
	expanded?: boolean;
	fixedExpandWidth?: number | null;
	color?: string;
}

const props = withDefaults(defineProps<Props>(), {
	value: undefined,
	reduce: false,
	hoverExpand: false,
	open: false,
	notLineActive: false,
	square: false,
	textWhite: false,
	notShadow: false,
	relative: false,
	absolute: false,
	right: false,
	background: "background",
	expanded: false,
	fixedExpandWidth: null,
});

const emit = defineEmits<{
	"update:open": [value: boolean];
	"update:value": [value: string | number | null];
	"update:expanded": [value: boolean];
}>();

// tuComponent functionality
const getColor = inject<(color: string) => string>("getColor", () => "");
const isColor = inject<boolean>("isColor", false);

const staticWidth = ref(260);
const reduceInternal = ref(false);

const sidebar = ref<HTMLDivElement>();

const clickCloseSidebar = function (evt: Event) {
	const target = evt.target as Element;
	if (!target.closest(".tu-sidebar-content"))
		emit("update:open", false);
};

const handleClickItem = function (id: string) {
	emit("update:value", id);
};

// Provide values for child components
provide("parentValue", computed(() => props.value));
provide("handleClickItem", handleClickItem);
provide("reduced", computed(() => reduceInternal.value));

const listeners = computed(() => {
	return {
		mouseenter: function () {
			if (props.hoverExpand) {
				reduceInternal.value = false;
				emit("update:expanded", true);
			}
		},
		mouseleave: function () {
			if (props.hoverExpand) {
				reduceInternal.value = true;
				emit("update:expanded", false);
			}
		}
	};
});

watch(
	() => props.open,
	(val: boolean) => {
		if (val) {
			setTimeout(() => {
				window.addEventListener("click", clickCloseSidebar);
			}, 200);
		}
		else window.removeEventListener("click", clickCloseSidebar);
	}
);

watch(
	() => props.reduce,
	(val: boolean) => {
		reduceInternal.value = val;
		const el = sidebar.value;
		if (el) {
			if (val) el.style.width = "50px";
			else el.style.width = `${staticWidth.value}px`;
		}

		emit("update:expanded", !val);
	}
);

watch(reduceInternal, (val: boolean) => {
	const el = sidebar.value;
	if (el) {
		if (val) el.style.width = "50px";
		else el.style.width = `${staticWidth.value}px`;
	}
});

watch(
	() => props.background,
	() => {
		setColor("background", props.background, sidebar.value, true);
	}
);

onMounted(() => {
	if (!props.fixedExpandWidth)
		staticWidth.value = (sidebar.value?.offsetWidth as number) + 15;
	else {
		staticWidth.value = props.fixedExpandWidth;
		if (sidebar.value)
			sidebar.value.style.width = `${staticWidth.value}px`;
	}

	reduceInternal.value = props.reduce;

	if (reduceInternal.value) emit("update:expanded", false);

	if (props.background !== "background")
		setColor("background", props.background, sidebar.value, true);

	if (props.textWhite) setColor("text", "#fff", sidebar.value, true);
});
</script>

<style lang="scss">
@import "../../style/sass/_functions";

.tu-sidebar-content {
	--tu-color: var(--tu-primary);
	position: relative;
	left: 0px;
	top: 0px;
	width: 100%;
	max-width: 260px;
	height: 100%;
	border-radius: 0px 30px 30px 0px;
	color: getColor("text");
	box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, tuVar("shadow-opacity"));
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
	z-index: 21000;
	background: getColor("gray-2");
	transition: all 0.25s ease;
	padding: 5px;

	&.right {
		left: auto;
		right: 0px;
		transform: translate(110%);
		border-radius: 30px 0px 0px 30px;

		&.open {
			transform: translate(0);
		}
	}

	&.absolute {
		position: absolute !important;
		z-index: 9001;
		height: 100%;
	}

	&.relative {
		position: relative !important;
		z-index: 9001;
		height: 100%;
	}

	&.textWhite {
		.tu-sidebar__group__content {
			&:after {
				background: rgba(255, 255, 255, 0.4);
			}
		}

		.tu-sidebar__item {
			color: #ffffffaa !important;

			&:after {
				background: #fff !important;
			}

			&.active {
				color: #fff !important;
			}
		}
	}

	&.notShadow {
		box-shadow: none !important;
	}

	&.square {
		border-radius: 0px;
	}

	&.notLineActive {
		.tu-sidebar {
			.tu-sidebar__item {
				&:after {
					display: none;
				}
			}
		}
	}

	&.open {
		transform: translate(0%);
	}

	&.reduce {
		.tu-sidebar {
			&__footer {
				padding: 10px 0px;
			}

			&__header {
				.tu-avatar-content {
					width: 44px !important;
					height: 44px !important;
				}

				opacity: 0;
				transition: all 0.25s ease;
				font-size: 0.9rem;
			}

			&__logo {
				img {
					width: 80%;
				}
			}

			.tu-sidebar__item {
				padding-left: 16px !important;
				min-height: 47px;

				&:not(.hasIcon) {
					.tu-sidebar__item__text {
						font-size: 0.5rem;
					}
				}

				&.hasIcon {
					.tu-sidebar__item__text {
						transform: translate(-10px);
						margin-left: -50px;
					}
				}

				&__arrow {
					position: absolute;
					top: 10%;
					animation: delayOpacity 0.6s ease;
					width: 5px;
					height: 5px;
				}
			}

			.tu-sidebar__item.hasIcon {
				padding: 0px !important;

				&:after {
					left: -6px;
				}
			}
		}
	}

	.tu-sidebar__logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 25px 0px;
		min-height: 80px;

		img {
			max-width: 120px;
			max-height: 35px;
		}
	}

	.tu-sidebar {
		overflow-x: hidden;
		width: 100%;
		flex-grow: 1;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;

		&::-webkit-scrollbar {
			width: 0px;
		}

		&__header {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			padding: 10px;
			padding-bottom: 20px;
		}

		&__footer {
			display: flex;
			align-items: center;
			justify-self: flex-start;
			width: 100%;
			padding: 10px;
		}
	}
}

.tu-sidebar__sticky_head {
	position: sticky;
	top: 0;
}

.tu-sidebar__sticky_tail {
	position: sticky;
	bottom: 0;
}

@keyframes delayOpacity {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>

