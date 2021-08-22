<template>
	<th
		class="tu-table__th"
		:class="{
			sort: sort,
			search: search,
		}"
		v-bind="$attrs"
		:data-sort-type="sortType"
		ref="theader"
	>
		<div class="tu-table__th__content">
			<div class="tu-table__th__content__text" @click="toggleSort">
				<slot />
				<div v-if="sort" class="tu-table__th__content__icons">
					<tu-icon class="icon-sort-1">keyboard_arrow_up</tu-icon>
					<tu-icon class="icon-sort-2">keyboard_arrow_down</tu-icon>
				</div>
			</div>
			<tu-input v-if="search" block border v-model="colSearch" type="search" @keypress="keyPressed" />
		</div>
		<div class="tu-table__th__resizer_right" v-on="resizeListeners" v-if="!fixed">
		</div>
	</th>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, onMounted, reactive, ref, watch } from "vue";
import tuComponent from "../tuComponent";
import tuIcon from "../tuIcon";
import { TuTable } from "./tuTableStore";

export default defineComponent({
	name: "TuTh",
	extends: tuComponent,
	components: { tuIcon },
	props: {
		/**
		 * Enables sorting options for the column
		 */
		sort: {
			default: false,
			type: Boolean
		},
		/**
		 * Enables Searching functionality for the column
		 */
		search: {
			type: Boolean,
			default: false
		},
		/**
		 * Sets the field to display data from when user Server side model
		 * @values null, field name (Accepts field nesting by following '.' notation. i.e 'Row.Key' will look for { Row : { Key : "Value here"}})
		 */
		field: {
			type: String,
			default: null
		},
		fixed: {
			type: Boolean,
			default: false
		}
	},
	setup (props, context) {
		const instance = getCurrentInstance();
		const tableInstance = inject<TuTable>("tableInstance");
		const tableId = inject<string>("tableId");
		const colSearch = ref("");
		const theader = ref<HTMLElement>();
		const sortType = computed(() => {
			return tableInstance.getSorters.value[props.field] ?? "none";
		});
		const headerDefn = tableInstance.getHeaderObject(props.field);

		let headerElement;
		let startOffset = 0;

		function keyPressed (event: KeyboardEvent) {
			if (event.key === "Enter")
				tableInstance.setFilter(props.field, colSearch.value);
		};

		function toggleSort (event) {
			tableInstance.toggleSort(props.field);
		}

		watch(colSearch, (value) => {
			if	(value === "")
				tableInstance.deleteFilter(props.field);
		});

		function trackMouseMove (event: MouseEvent) {
			if (headerElement)
				headerDefn.width = startOffset + event.pageX + "px";
		}

		function trackMouseUp (event) {
			headerElement = undefined;
		}

		const resizeListeners = {
			mousedown: function (event) {
				headerElement = theader.value;
				startOffset = headerElement.offsetWidth - event.pageX;
				document.addEventListener("mousemove", trackMouseMove);
				document.addEventListener("mouseup", trackMouseUp);
			}
		};

		onMounted(() => {
		});

		return {
			theader,
			colSearch,
			sortType,
			resizeListeners,
			keyPressed,
			toggleSort
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";
.tu-table__th {
	padding: 10px 12px;
	text-align: left;
	transition: all 0.25s ease;
	font-size: 0.8rem;
	border: 0px;
	position: relative;

	::v-deep(input) {
		width: 100%;
	}

	&.sort {
		&:hover {
			background: -getColor("gray-3");
		}
	}

	&.search {
		.tu-table__th__content {
			display: flex;
			flex-direction: column;
		}
	}

	.icon-sort-1 {
		transform-origin: center bottom;
		font-size: 20px;
	}

	.icon-sort-2 {
		transform-origin: center top;
		font-size: 20px;
	}

	&__resizer {
		&_right {
			position: absolute;
			width: 5px;
			cursor: w-resize;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}

	&[data-sort-type="asc"] {
		.icon-sort-2 {
			transform: rotate(180deg) translateY(-10px) !important;
			transition: inherit;
		}

		.icon-sort-1 {
			transition: inherit;
			transform: translateY(10px);
		}
	}

	&[data-sort-type="desc"] {
		.icon-sort-2 {
			transform: rotate(0deg) translateY(-10px) !important;
			transition: inherit;
		}

		.icon-sort-1 {
			transform: rotate(-180deg) translateY(10px) !important;
			transition: inherit;
		}
	}

	&[data-sort-type="none"] {
		.icon-sort-2 {
			transform: rotate(0deg) !important;
			transition: inherit;
		}
		.icon-sort-1 {
			transform: rotate(0deg) !important;
			transition: inherit;
		}
	}

	&__content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		transition: all 0.25s ease;

		&__text {
			display: flex;
			flex-direction: row;
			align-items: center;
			cursor: pointer
		}

		&__icons {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-left: 7px;
			transform: scale(0.8);
			transition: all 0.25s ease;
		}

		.tu-icon-arrow {
			position: relative;
			display: block;

			&.icon-sort-1 {
				transform: rotate(45deg);
			}

			&.icon-sort-2 {
				transform: rotate(-135deg);
			}
		}
	}
}
</style>
