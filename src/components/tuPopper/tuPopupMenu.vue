<template>
	<div ref="dropOptions">
		<!-- @mouseout="toggleMenu($event)" -->
		<!-- @mouseover="toggleMenu($event)" -->
		<ul class="tu-component tu-dropdown--menu">
			<slot />
		</ul>
	</div>
</template>

<script lang="ts">
import { insertBody } from "@/utils";
import {
	defineComponent,
	getCurrentInstance,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	toRefs
} from "vue";

export default defineComponent({
	name: "TuPopupMenu",
	components: {
		
	},
	emits: ["remove", "shown"],
	setup (props, context) {
		const data = reactive({
			dropdownVisible: false,
			leftAfter: 20,
			rightx: true,
			tuDropRight: false,
			widthx: 0,
			tuCustomContent: false
		});

		const dropOptions = ref<HTMLDivElement>();
		const instance = getCurrentInstance();

		onBeforeUnmount(() => {
			context.emit("remove", instance);
		});

		onMounted(() => {
			context.emit("shown", instance);
		});

		return {
			...toRefs(data),
			insertBody,
			dropOptions
		};
	}
});
</script>

<style lang="scss" scoped>
.dropdownx-enter-from,
.dropdownx-leave-to {
	opacity: 0;
	transform: translateY(5px) !important;
}

.con-tu-dropdown--menu {
	padding-top: 10px;
	position: absolute;
	height: auto;
	width: auto;
	z-index: 40000;
	//transform: translate(-100%);
	transition: opacity 0.25s, transform 0.25s, width 0.3s ease;
	&.rightx {
		::v-deep(.tu-dropdown--menu--after) {
			left: 30px;
			right: 0;
		}
	}
	&::after {
		content: "";
		display: block;
		width: 100%;
		height: 10px;
		position: absolute;
		left: 0;
		top: 100%;
	}
}
.tu-dropdown--menu {
	background: #fff;
	padding-left: 0px !important;
	border-radius: 5px;
	box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding-top: 5px;
	padding-bottom: 5px;
	position: relative;
	margin: 0px;
}
.tu-dropdown-right--menu--after {
	position: absolute;
	left: 20px;
	width: 10px;
	height: 10px;
	display: block;
	background: #fff;
	transform: rotate(45deg) translate(-7px);
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	border-left: 1px solid rgba(0, 0, 0, 0.1);
	z-index: 10;
	box-sizing: border-box;
}
.tu-dropdown--menu--after {
	position: absolute;
	right: 10px;
	width: 10px;
	height: 10px;
	display: block;
	background: #fff;
	transform: rotate(45deg) translate(-7px);
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	border-left: 1px solid rgba(0, 0, 0, 0.1);
	z-index: 1;
	box-sizing: border-box;
	top: 10px;
}

.notHeight {
	::v-deep(.tu-dropdown-menu) {
		&::after {
			top: auto;
			bottom: 0px;
			border-top: 1px solid rgba(0, 0, 0, 0);
			border-left: 1px solid rgba(0, 0, 0, 0);
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			border-right: 1px solid rgba(0, 0, 0, 0.1);
			transform: rotate(45deg) translate(7px);
		}
	}
	::v-deep(.tu-dropdown--menu--after) {
		top: unset;
		border-top: unset;
		border-left: unset;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		//transform: rotate(225deg) translate(-7px);
	}
}
</style>
