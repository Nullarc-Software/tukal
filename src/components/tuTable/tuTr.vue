<template>
	<tr class="tu-table__tr" @click="rowClick" :class="{
		selected: computeSelected,
		isExpand: !!instanceExpand,
		expand: $slots.expand,
		invisible: isInvisible
	}">
		<slot />
	</tr>
	<transition name="expand-row" appear>
		<tr v-if="$slots.expand && expand" class="tu-table__tr__expand">
			<td class="tu-table__expand__td" :colspan="colSpan">
				<div class="tu-table__expand__td__content" ref="content">
					<div class="tu-table__expand__td__content__sub">
						<slot name="expand" />
					</div>
				</div>
			</td>
		</tr>
	</transition>
</template>

<script lang="ts">
import _ from "lodash";
import {
	computed,
	defineComponent,
	getCurrentInstance,
	inject,
	ref,
	watch
} from "vue";
import tuComponent from "../tuComponent";
import { TuTableStore } from "./tuTableStore";

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
			default: true,
			type: Boolean
		},
		expandHandle: {
			default: false,
			type: Boolean
		},
		rowId: {
			type: Number
		},
		hidden: {
			type: Boolean,
			default: false
		},
		expanded: {
			type: Boolean,
			default: false
		},
		invisible: {
			default: false,
			type: Boolean
		}
	},
	emits: ["rowClick", "selected", "rowExpanded"],
	setup(props, context) {
		const expand = ref(false);
		const instance = getCurrentInstance();
		const selected = inject<Function>("selected");
		const tableInstance = inject<TuTableStore>("tableInstance");
		const instanceExpand = ref<any>(null);
		const isSelected = ref(false);
		const isInvisible = ref(props.invisible);
		const colSpan = ref(0);
		colSpan.value = tableInstance.headerCount.value;

		const computeSelected = computed(() => {
			if (isSelected.value) return true;
			else return props.isSelected;
		});

		function insertAfter(element: any) {
			if (instance.vnode.el.nextSibling) {
				instance.vnode.el.parentNode.insertBefore(
					element,
					instance.vnode.el.nextSibling
				);
			}
			else
				instance.vnode.el.parentNode.appendChild(element);
		}

		function handleClickHasExpand(expanded?: boolean) {

			if (_.isUndefined(expanded) === false)
				expand.value = expanded;
			else
				expand.value = !expand.value;
			context.emit("rowExpanded", expand.value);
		}

		const rowClick = function (event: Event) {
			if (context.slots.expand) {
				if (!props.expandHandle &&
					!(event as any).isInput &&
					!(event.currentTarget as HTMLElement).className.includes("isCheck")
				)
					handleClickHasExpand();
				else if (props.expandHandle && (event as any).isExpand)
					handleClickHasExpand();
			}

			if (!props.notClickSelected) {
				// isSelected.value = true;
				selected.call(null, props.data);
				context.emit("selected", props.data);
			}

			context.emit("rowClick", event);
		};

		watch(() => props.expanded, () => {
			handleClickHasExpand(props.expanded);
		});

		return {
			rowClick,
			colSpan,
			expand,
			instanceExpand,
			computeSelected,
			isInvisible
		};
	}
});
</script>

<style lang="scss">
.expand-row-enter-active,
.expand-row-leave-active {
	transition: all 2.25s ease;
}

.expand-row-enter-from,
.expand-row-leave-to {
	opacity: 0;

	.tu-table__expand__td__content {
		height: 0px;
	}
}

.expand-row-enter-to,
.expand-row-leave-from {
	opacity: 1;
}
</style>

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
	border-bottom: 1px solid -getColorAlpha("text", 0.2);

	&.expand {
		cursor: pointer;
	}

	&.tu-change-color {
		::v-deep(.tu-table__td) {
			background: -getColorAlpha("color", 0.1) !important;
			color: -getColor("color") !important;

			&:hover {
				background: -getColorAlpha("color", 0.2) !important;
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

		+.tu-table__tr__expand {
			td {
				border-radius: 0px 0px 15px 15px !important;
			}
		}
	}

	&.selected {
		::v-deep(.tu-table__td) {
			background: -getColorAlpha("color", 0.1) !important;
			color: -getColor("color") !important;
		}
	}

	::v-deep(.tu-table__td) {
		background: -getColorAlpha("bg", 0.1);
		color: -getColor("bg");
	}

	&.tu-change-color {
		&:hover {
			::v-deep(.tu-table__td) {
				background: -getColorAlpha("color", 0.2) !important;
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

			&__sub {
				padding: 10px 15px;
				z-index: 1;
				position: relative;
			}
		}
	}
}

.invisible {
	border-bottom: none !important;
}
</style>
