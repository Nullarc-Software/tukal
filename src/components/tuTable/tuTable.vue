<template>
	<div class="tu-table-content">
		<header v-if="$slots.header" class="tu-table__header">
			<slot name="header" />
		</header>
		<div
			class="tu-table"
			:class="{
				isSelectedValue: modelValue,
				striped: striped,
				isMultipleSelected: isMultipleSelected,
				[`size-${size}`]: true,
			}"
		>
			<table class="tu-table__element" ref="tableElement">
				<colgroup>
					<col v-if="rowExpand" style="width:50px" />
					<col v-if="multiSelect" style="width:50px" />
					<col v-for="header in table.getTableHeaders.value" 
						:key="header.index"
						:style="{
							width: header.width
						}"
					/>
				</colgroup>
				<thead ref="thead" class="tu-table__thead">
					<tu-th v-if="rowExpand" fixed  @click="expandedAll = !expandedAll">
						<tu-icon class="tu-table__tr_expand_handle" :class="{ expanded: expandedAll }">keyboard_arrow_right</tu-icon>
					</tu-th>
					<tu-th v-if="multiSelect" fixed >
						<tu-checkbox v-model="selectedAll" indeterminate />
					</tu-th>
					<slot name="thead" />
				</thead>
				<tbody class="tu-table__tbody">
					<slot v-if="$slots.tbody" name="tbody" />
					<tu-tr
						v-else
						v-for="tr in table.getTableData.value"
						:key="tr.index"
						:data="tr.rowData"
						:rowId="tr.index"
						:expanded="expandedAll"
						:expandHandle="rowExpand"
						@rowExpanded="tr.expanded = $event"
						@rowClick="rowListeners.click($event)"
					>
						<tu-td expand v-if="rowExpand">
							<tu-icon class="tu-table__tr_expand_handle" :class="{ expanded: tr.expanded }">keyboard_arrow_right</tu-icon>
						</tu-td>
						<tu-td checkbox v-if="multiSelect">
							<tu-checkbox v-model="tr.selected" :checked="selectedAll" />
						</tu-td>
						<tu-td
							v-for="(th, j) in table.getTableHeaders.value"
							:key="j"
						>
							<span
								:title="tr.rowData[th.field]"
								v-if="_.isArrayLike(tr.rowData[th.field]) || _.isUndefined(tr.rowData[th.field])"
							>
								{{ tr.rowData[th.field] ?? "undefined" }}
							</span>
							<component v-else-if="_.isObjectLike(tr.rowData[th.field])" :is="tr.rowData[th.field].component ?? require(`${tr.rowData[th.field].componentName}`)" v-bind="tr.rowData[th.field].props" />							
						</tu-td>
						<template #expand v-if="tr.rowData['expanded']" >
								<component :is="tr.rowData['expanded'].component ?? require(`${tr.rowData['expanded'].componentName}`)" v-bind="tr.rowData['expanded'].props" />
						</template>
					</tu-tr>
				</tbody>
			</table>
		</div>
		<footer v-if="$slots.footer">
			<slot name="footer" />
		</footer>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	nextTick,
	onBeforeUnmount,
	onMounted,
	PropType,
	reactive,
	ref,
	watch
} from "vue";
import * as _ from "lodash";
import tuComponent from "../tuComponent";
import { TableIdentifierAuto, TuTable, TuTableServerModel } from "./tuTableStore";
import resizableGrid from "./resizable";

export default defineComponent({
	name: "TuTable",
	extends: tuComponent,
	props: {
		modelValue: {},
		pageSize: {
			type: Number,
			default: -1
		},
		page: {
			type: Number,
			default: 0
		},
		numPages: {
			type: Number,
			default: 1
		},
		/**
		 * Enables striped rows on the table
		 */
		striped: {
			default: false,
			type: Boolean
		},
		/**
		 * Set to true if data is loading. Ignored in Server Side model.
		 */
		loading: {
			default: false,
			type: Boolean
		},
		/**
		 * The Size of the table.
		 * @values fitData, fill, <custom size string>
		 */
		size: {
			type: String,
			default: "fitData"
		},
		columnMode: {
			type: String,
			default: "fitDataStretch"
		},
		/**
		 * Specifies the model for the table. Server side model will send pagination, sorting and filtering params to the server.
		 * @values server, local
		 */
		model: {
			type: String,
			default: "local"
		},
		/**
		 * The Data for the table. ignored in Server Side model
		 */
		data: {
			type: Object,
			default: () => {
				return {};
			}
		},
		id: {
			type: String,
			default: () => `tu-table-${TableIdentifierAuto.id++}`
		},
		multiSelect: {
			type: Boolean,
			default: false
		},
		serverSideConfig: {
			type: Object as PropType<TuTableServerModel>,
			default: () => {
				return { };
			}
		},
		rowExpand: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue", "update:numPages"],
	provide () {
		return {
			selected: (data) => {
				this.selected(data);
			},
			tableInstance: this.table,
			tableId: this.id
		};
	},
	setup (props, context) {
		const colspan = ref(0);
		const thead = ref<HTMLHeadElement>();
		const tableElement = ref<HTMLTableElement>();
		let table: TuTable;

		if (props.multiSelect && props.rowExpand)
			table = new TuTable(props.id, 2);
		else if (props.multiSelect || props.rowExpand)
			table = new TuTable(props.id, 1);
		else
			table = new TuTable(props.id, 0);

		if (props.model === "local")
			table.setTableData(props.data);
		else {
			table.serverSideModel = true;
			table.serverModelProps = reactive(props.serverSideConfig);
		}

		table.constructHeaders(context.slots.thead());
		const selectedAll = ref(false);
		const expandedAll = ref(false);

		const isMultipleSelected = computed(() => {
			return _.isArray(props.modelValue);
		});

		function selected (val: any) {
			if (isMultipleSelected.value) selectedMultiple(val);
			else context.emit("update:modelValue", val);
		}

		function selectedMultiple (val: any) {
			const newVal = props.modelValue as Array<any>;
			if (newVal.includes(val)) newVal.splice(newVal.indexOf(val), 1);
			else newVal.push(val);

			context.emit("update:modelValue", newVal);
		}

		const rowListeners = {
			click: function (event, tr) {
				console.log("Row clicked");
			}
		};

		onMounted(() => {
			if (thead.value)
				colspan.value = thead.value.querySelectorAll("th").length;

			
		});

		onBeforeUnmount(() => {
			table = undefined; // Force free up mem on next gc call
		});

		watch(
			[() => props.pageSize, () => props.page],
			() => {
				table.setPaging(props.pageSize, props.page);
			},
			{
				immediate: true
			}
		);

		watch(table.pageLength, (newVal) => {
			context.emit("update:numPages", newVal);
		});

		watch(
			() => props.data,
			() => {
				table.setTableData(props.data);
			}
		);

		watch(table.getSelectedRows, () => {
			const newVal = table.getSelectedRows.value as Array<any>;
			context.emit("update:modelValue", newVal);
		});

		return {
			tableElement,
			selectedAll,
			expandedAll,
			_: _,
			thead,
			isMultipleSelected,
			selected,
			table,
			rowListeners
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.tu-table-content {
	width: fit-content;

	// box-shadow: 0px 5px 22px 0px rgba(0,0,0, -var(shadow-opacity))
	border-radius: 16px;
	footer {
		padding-top: 10px;
	}
}

.tu-table__element {
	table-layout: fixed;
}

.tu-table {
	width: 100%;
	font-size: 0.9rem;
	margin: 0px;
	overflow: auto;

	::v-deep(table) {
		margin: 0px;
		border-collapse: collapse;
		width: 100%;
		border: 0px;
	}

	&.striped {
		::v-deep(.tu-table__tr) {
			&:nth-child(even) {
				background: -getColor("gray-1") !important;
			}
		}
	}

	&__tr_expand_handle {

		transition: all 0.25s ease;
		&.expanded {
			transform: rotate(90deg);
		}
	}

	&.size-fitData {
		::v-deep(table) {
			width: auto;
			max-width: 100%;
		}
	}

	&_not-found {
		display: none;
		padding: 20px;
		text-align: center;
		width: 100%;

		::v-deep(tr) {
			text-align: center;

			::v-deep(td) {
				padding: 20px;
				border: 0px;

				// width: 100%
			}
		}
	}

	&__cell__data {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		display: table-cell;
	}

	&__tbody {
		&:empty {
			display: none;
			background: #000;

			~ .tu-table_not-found {
				display: table-row-group;
			}
		}
	}

	&.isSelectedValue {
		::v-deep(tr) {
			cursor: pointer;
		}
	}

	&__footer {
		padding: 8px 10px;
		background: -getColor("gray-2");
		border-radius: 0px 0px 14px 14px;
	}

	&__header {
		width: 100%;
		padding: 10px;
		background: -getColor("gray-2");
		border-radius: 14px 14px 0px 0px;

		& ~ .tu-table {
			::v-deep(.tu-table__th) {
				&:first-child {
					border-radius: 0px;
				}

				&:last-child {
					border-radius: 0px;
				}
			}
		}
	}

	&__thead {
		width: 100%;
		position: sticky;
		top:0;
		z-index: 2;
		::v-deep(.tu-table__th) {
			background: -getColor("gray-2");

			&:first-child {
				border-radius: 14px 0px 0px 0px;
			}

			&:last-child {
				border-radius: 0px 14px 0px 0px;
			}
		}
	}
}
</style>
