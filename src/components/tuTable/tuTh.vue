<template>
	<th
		class="tu-table__th"
		:class="{
			sort: sort,
			search: search,
		}"
		v-bind="$attrs"
	>
		<div class="tu-table__th__content">
			<slot />
			<div v-if="sort" class="tu-table__th__content__icons">
				<tu-icon>keyboard_arrow_up</tu-icon>
				<tu-icon>keyboard_arrow_down</tu-icon>
			</div>
			<tu-input v-if="search" border block v-model="colSearch" type="search" @keypress="keyPressed" />
		</div>
	</th>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, ref, watch } from "vue";
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
		}
	},
	setup (props, context) {
		const instance = getCurrentInstance();
		const tableInstance = inject<TuTable>("tableInstance");
		const tableId = inject<string>("tableId");
		const colSearch = ref("");

		function keyPressed (event: KeyboardEvent) {
			if (event.key === "Enter")
				tableInstance.setFilter(props.field, colSearch.value);
		};

		watch(colSearch, (value) => {
			if	(value === "")
				tableInstance.deleteFilter(props.field);
		});

		return {
			colSearch,
			keyPressed
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

	&.sort {
		.tu-table__th__content {
			pointer-events: none;
		}

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

	&[data-sort-type="asc"] {
		.icon-sort-2 {
			margin-top: -7px;
			transform: rotate(45deg) !important;
		}

		.icon-sort-1 {
			margin-top: -1px;
			transform: rotate(45deg) !important;
		}
	}

	&[data-sort-type="desc"] {
		.icon-sort-2 {
			margin-top: -7px;
		}

		.icon-sort-1 {
			margin-top: -1px;
			transform: rotate(-135deg) !important;
		}
	}

	&__content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		transition: all 0.25s ease;

		&__icons {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-left: 7px;
			transform: scale(0.8);
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
