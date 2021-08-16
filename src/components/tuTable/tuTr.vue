<template>
	<tr
		class="tu-table__tr"
		@click="rowClick"
		:class="{
			selected: computeSelected,
			isExpand: !!instanceExpand,
			expand: $slots.expand,
		}"
	>
		<slot />
	</tr>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	inject,
	ref
} from "vue";
import tuComponent from "../tuComponent";
import tuTableExpand from "./tuTableExpand.vue";

export default defineComponent({
	name: "TuTr",
	extends: tuComponent,
	props: {
		data: {},
		isSelected: {
			default: false,
			type: Boolean
		},
		notClickSelected: {
			default: false,
			type: Boolean
		},
		openExpandOnlyId: {
			default: false,
			type: Boolean
		},
		rowId: {
			type: Number
		}
	},
	setup (props, context) {
		const expand = ref(false);
		const instanceExpand = ref<any>(null);
		const instance = getCurrentInstance();
		const selected = inject<Function>("selected");
		const isSelected = ref(false);

		const computeSelected = computed(() => {
			if (isSelected.value) return true;
			else return props.isSelected;
		});

		function insertAfter (element: any) {
			if (instance.vnode.el.nextSibling) {
				instance.vnode.el.parentNode.insertBefore(
					element,
					instance.vnode.el.nextSibling
				);
			}
			else
				instance.vnode.el.parentNode.appendChild(element);
		}

		function handleClickHasExpand () {
			if (instanceExpand.value) {
				instanceExpand.value.props.hidden =
					!instanceExpand.value.props.hidden;
				instanceExpand.value = null;
				// this.expand = false
			}
			else {
				const colspan =
					instance.parent.vnode.el.querySelectorAll(
						"thead th"
					).length;
				instanceExpand.value = new tuTableExpand();
				instanceExpand.value.$props.colspan = colspan;
				instanceExpand.value.$slots.default = context.slots.expand;
				instanceExpand.value.vm = instanceExpand.value.$mount();
				instanceExpand.value.$data.hidden = false;
				insertAfter(instanceExpand.value.vnode.el);
				// this.expand = true
			}
		}

		const rowClick = function (event: any) {
			if (context.slots.expand) {
				if (
					(props.openExpandOnlyId
						? event.target.nodeName === "TD"
						: true) &&
					!event.target.className.includes("isEdit")
				)
					handleClickHasExpand();
			}

			if (event.target.nodeName === "TD" && !props.notClickSelected) {
				// isSelected.value = true;
				selected.call(null, props.data);
				context.emit("selected", props.data);
			}

			context.emit("rowClick", event);
		};

		return {
			rowClick,
			expand,
			instanceExpand,
			computeSelected
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.isMultipleSelected {
	::v-deep(.tu-table__tr) {
		::v-deep(.tu-table__td) {
			border-radius: 0px !important;
		}
	}
}

.tu-table__tr {
	padding: 5px;
	border: 0px;

	&.expand {
		cursor: pointer;
	}

	&.tu-change-color {
		::v-deep(.tu-table__td) {
			background: -getColor("color", 0.1) !important;
			color: -getColor("color", 1) !important;

			&:hover {
				background: -getColor("color", 0.2) !important;
			}
		}
	}

	&:first-of-type {
		::v-deep(.tu-table__td) {
			&:last-child {
				border-radius: 0px 0px 15px 0px;
			}

			&:first-child {
				border-radius: 0px 0px 0px 15px;
			}
		}
	}

	&.isExpand:first-of-type {
		::v-deep(.tu-table__td) {
			background: -getColor("gray-1") !important;
			border-radius: 0px;
		}
	}

	&.isExpand:not(:first-of-type) {
		::v-deep(.tu-table__td) {
			background: -getColor("gray-1") !important;

			&:last-child {
				border-radius: 0px 15px 0px 0px;
			}

			&:first-child {
				border-radius: 15px 0px 0px 0px;
			}
		}

		+ .tu-table__tr__expand {
			td {
				border-radius: 0px 0px 15px 15px !important;
			}
		}
	}

	&.selected {
		::v-deep(.tu-table__td) {
			background: -getColor("color", 0.1) !important;
			color: -getColor("color", 1) !important;
		}
	}

	::v-deep(.tu-table__td) {
		background: -getColor("bg", 0.1);
		color: -getColor("bg", 1);
	}

	&.tu-change-color {
		&:hover {
			::v-deep(.tu-table__td) {
				background: -getColor("color", 0.2) !important;
			}
		}
	}

	&:hover {
		::v-deep(.tu-table__td) {
			background: -getColor("gray-1");
		}
	}
}

.tu-table__tr__expand {
	transition: all 0.25s ease;
	border: 0px;

	::v-deep(td) {
		transition: all 0.25s ease;
		padding: 0px;
		background: -getColor("gray-1") !important;
		border: 0px;

		.tu-table__expand__td__content {
			overflow: hidden;
			display: block;
			transition: all 0.25s ease;

			&__sub {
				padding: 10px 15px;
				z-index: 1;
				position: relative;
			}
		}
	}
}

.fade-expand-enter-active,
.fade-expand-leave-active {
	transition: all 0.25s ease;
}

.fade-expand-enter,
.fade-expand-leave-to {
	opacity: 0;

	::v-deep(td) {
		::v-deep(.tu-table__expand__td__content) {
			height: 0px !important;
		}
	}
}
</style>
