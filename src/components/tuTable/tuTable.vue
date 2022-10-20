<template>
	<div class="tu-table-content" ref="tableContainer">
		<header v-if="$slots.header" class="tu-table__header">
			<slot name="header" />
		</header>
		<div v-if="columnSelecter">
			<tu-popper arrow border-radius="20px">
				<i class="material-icons">view_column</i>
				<template #content>
					<tu-popup-menu
						v-for="column in totalColumns"
						:key="column.index"
					>
						<tu-popup-item>
							<tu-checkbox
								v-model="colsControl[column.index - 1]"
							>
								{{ column.caption }}
							</tu-checkbox>
						</tu-popup-item>
					</tu-popup-menu>
				</template>
			</tu-popper>
		</div>
		<div
			class="tu-table"
			:class="{
				isSelectedValue: modelValue,
				striped: striped,
				isMultipleSelected: isMultipleSelected,
				[`size-${size}`]: true,
				compact: compact
			}"
		>
			<table id="table" class="tu-table__element" ref="tableElement">
				<thead ref="thead" class="tu-table__thead">
					<tu-th
						v-if="rowExpand"
						fixed
						@click="expandedAll = !expandedAll"
						style="width: 50px"
					>
						<tu-icon
							class="tu-table__tr_expand_handle"
							:class="{ expanded: expandedAll }"
							>keyboard_arrow_right</tu-icon
						>
					</tu-th>
					<tu-th v-if="multiSelect" fixed style="width: 50px">
						<tu-checkbox
							v-model="selectedAll"
							:indeterminate="table.isPartiallyChecked.value"
						/>
					</tu-th>
					<tu-th
						v-for="header in table.getTableHeaders.value"
						:key="header.index"
						:field="header.field"
						:style="{
							width: header.width,
							minWidth: header.minWidth,
							maxWidth: header.maxWidth
						}"
                        draggable="true"
						@dragstart="startDrag($event,header)"
						@drop="onDrop(header)"
						@dragover.prevent
						@dragenter.prevent
						:class="{ 'animation-table': isDrag && header.index === dragIndex || header.index === dropIndex }"
						:sort="header.props ? header.props.sort : false"
						:search="header.props ? header.props.search : false"
					>
							{{ header.caption }}
					</tu-th>
				</thead>
				<tbody id="tbody" :class="{ 'loading-body' : !isLoaded  }" class="tu-table__tbody">
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
						@rowClick="rowListeners.click($event, this)"
					>
						<tu-td expand v-if="rowExpand">
							<tu-icon
								class="tu-table__tr_expand_handle"
								:class="{ expanded: tr.expanded }"
								>keyboard_arrow_right</tu-icon
							>
						</tu-td>
						<tu-td checkbox v-if="multiSelect">
							<tu-checkbox
								v-model="tr.selected"
								:checked="selectedAll"
							/>
						</tu-td>
						<tu-td
							v-for="(th, j) in table.getTableHeaders.value"
							:key="j"
							:class="{ 'animation-table' : isDrag && th.index === dragIndex || th.index === dropIndex }"
						>
							<span
								:title="tr.rowData[th.field]"
								v-if="th.isComponent === false"
							>
								{{
									th.valueFormatter
										? th.valueFormatter(
												tr.rowData[th.field],
												tr.rowData
										  )
										: th.field.indexOf(".") !== -1
										? getNestedField(tr.rowData, th.field)
										: tr.rowData[th.field] ?? "undefined"
								}}
							</span>
							<!--
								v-model is always instance specific. So, if any component needs to echo values to the parent, they should only use generic 'v-models'
								and not specifics like "v-mode:xyz"

								the value of the component's output is available to be consumed at row.componentValue

								This component will try and bind to the inbuild componentValue Ref first, if a user defined modelValue is defined in the header, that will be used instead
							-->
							<component
								v-else-if="
									th.isComponent &&
									tr.componentValues[th.field]
								"
								v-model="tr.componentValues[th.field].value"
								v-bind="th.componentProps"
								:is="th.component"
								:rowIndex="tr.index"
								:rowData="tr.rowData"
							/>
							<component
								v-else-if="th.isComponent"
								v-bind="th.componentProps"
								:is="th.component"
								:rowIndex="tr.index"
								:rowData="tr.rowData"
							/>
						</tu-td>
						<template #expand v-if="tr.rowData['expanded']">
							<component
								:is="
									tr.rowData['expanded'].component ??
									require(`${tr.rowData['expanded'].componentName}`)
								"
								v-bind="tr.rowData['expanded'].props"
							/>
						</template>
					</tu-tr>
				</tbody>
			</table>
		</div>
		<footer style="display: flex" v-if="$slots.footer">
			<slot name="footer" />
		</footer>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onBeforeUnmount,
	onMounted,
	PropType,
	reactive,
	ref,
	watch
} from "vue";
import * as _ from "lodash";
import tuComponent from "../tuComponent";
import {
	TableIdentifierAuto,
	TuTableStore,
	TuTableServerModel,
	TuTableRow,
	TuTableInitialComponentValues,
	TuHeaderDefn,
	TuTableLocal,
	TuTableLocalColumn
} from "./tuTableStore";

import tuTh from "./tuTh.vue";
import tuTr from "./tuTr.vue";
import tuTd from "./tuTd.vue";
import tuIcon from "../tuIcon";
import tuCheckbox from "../tuCheckBox";
import { tuPopper, tuPopupMenu } from "../tuPopper";
import contextMenuComponent from "./tuTableContextMenu.vue";
import {
	Loading,
	LoadingAttributes
} from "../tuLoading";

if (typeof window !== "undefined" && (window as any).VueInstance)
	contextMenuComponent.install((window as any).VueInstance);

export default defineComponent({
	name: "TuTable",
	extends: tuComponent,
	components: {
		tuTh,
		tuTr,
		tuTd,
		tuIcon,
		tuCheckbox,
		tuPopper,
		tuPopupMenu
	},
	props: {
		modelValue: {},
		pageSize: {
			type: Number,
			default: 10
		},
		page: {
			type: Number,
			default: 1
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
		 * The Data for the table. ignored in Server Side model. SSM This contains the table data.
		 */
		data: {
			type: Array,
			default: () => []
		},
		columnSelecter: {
			type: Boolean,
			default: false
		},
		id: {
			type: String,
			default: () => `tu-table-${TableIdentifierAuto.id++}`
		},
		persistentId: {
			type: String,
			default: ""
		},
		multiSelect: {
			type: Boolean,
			default: false
		},
		serverSideConfig: {
			type: Object as PropType<TuTableServerModel>,
			default: () => {
				return {};
			}
		},
		rowExpand: {
			type: Boolean,
			default: false
		},
		columns: {
			type: Object as () => any[],
			default: () => []
		},
		tableInstance: {
			type: TuTableStore,
			default: null
		},
		compact: {
			type: Boolean,
			default: false
		},
		/**
		 * Initial values for all the components in the rows of the table.
		 */
		initialComponentValues: {
			type: Object as PropType<Array<TuTableInitialComponentValues>>,
			default: () => []
		}
	},
	emits: [
		"update:modelValue",
		"update:numPages",
		"update:data",
		"update:tableInstance"
	],
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
		const tableContainer = ref<HTMLDivElement>();
		const selectedAll = ref(false);
		const expandedAll = ref(false);
		const noOfTableValues = ref(0);
		const isLoaded = ref(false);
		let load;
		const totalColumns = ref(props.columns);
		let table: TuTableStore;
		const showLoading = function () {
			const attrs: LoadingAttributes = {
				target: "#tbody",
				color: "dark",
				type: "circles",
				scale: "1.0"
			};
			load = new Loading(attrs);
		};

		if (props.multiSelect && props.rowExpand)
			table = new TuTableStore(props.id, 2);
		else if (props.multiSelect || props.rowExpand)
			table = new TuTableStore(props.id, 1);
		else table = new TuTableStore(props.id, 0);

		table.constructHeaders(props.columns, props.persistentId);

		if (props.model === "local") table.setTableData(props.data);
		else {
			table.serverSideModel = true;
			table.serverModelProps = reactive(props.serverSideConfig);
		}
		let persistentColumns: TuTableLocal = {
			columns: []
		};

		if (props.persistentId !== null) {
			for (let i = 0; i < table.getTableHeaders.value.length; i++) {
				const column: TuTableLocalColumn = {
					header: table.getTableHeaders.value[i].field,
					visibility: false
				};
				persistentColumns.columns.push(column);
			}
		}

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
				// console.log("Row clicked");
			}
		};
		const colsControl = ref([]);
		const updateColumns = () => {
			for (let i = 0; i < props.columns.length; i++)
				persistentColumns.columns[i].visibility = colsControl.value[i];
			localStorage.setItem(`table-${props.persistentId}`, JSON.stringify(persistentColumns));
			for (let i = 0; i < colsControl.value.length; i++)
				table.setColumnVisibility(i, !colsControl.value[i]);
		};
		if (props.persistentId !== null) {
			if (localStorage.getItem(`table-${props.persistentId}`) === null) {
				for (let i = 0; i < props.columns.length; i++) {
					colsControl.value[i] = true;
					persistentColumns.columns[i].visibility = true;
				}
				localStorage.setItem(`table-${props.persistentId}`, JSON.stringify(persistentColumns));
			}
			else {
				persistentColumns = JSON.parse(localStorage.getItem(`table-${props.persistentId}`));
				for (let i = 0; i < props.columns.length; i++)
					colsControl.value[i] = persistentColumns.columns[i].visibility;
				updateColumns();
				localStorage.setItem(`table-${props.persistentId}`, JSON.stringify(persistentColumns));
			}
		}
		watch(
			colsControl,
			() => {
				updateColumns();
			},
			{
				deep: true
			}
		);

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

		watch(table.getTableData, () => {
			const newVal = table.getTableData.value as Array<TuTableRow>;
			context.emit("update:data", newVal);
			noOfTableValues.value = newVal.length;
			isLoaded.value = true;
			load.close();
		});

		watch(table.getSelectedRows, () => {
			const newVal = table.getSelectedRows.value as Array<any>;
			context.emit("update:modelValue", newVal);
			if (newVal.length === noOfTableValues.value)
				selectedAll.value = true;
			if (newVal.length === 0) selectedAll.value = false;
		});

		onMounted(() => {
			if (thead.value)
				colspan.value = thead.value.querySelectorAll("th").length;

			const lastHeader = table.getHeaderObject(-1);
			if (lastHeader) {
				const len =
					tableContainer.value.offsetWidth +
					tableContainer.value.offsetLeft;
				lastHeader.width =
					(tableContainer.value.offsetWidth -
						lastHeader.element.offsetLeft ?? 0) + "px";
			}
			context.emit("update:tableInstance", table);
			showLoading();
		});

		onBeforeUnmount(() => {
			table = undefined; // Force free up mem on next gc call
		});

		const getNestedField = function (rowData: any, key: string) {
			const keys = key.split(".");
			let obj: any = rowData;
			for (const key of keys) if (obj[key]) obj = obj[key];

			return obj;
		};

		const dragIndex = ref(null);
		const dropIndex = ref(null);
		const isDrag = ref(false);

		const startDrag = (evt : DragEvent, header : TuHeaderDefn) => {
			isDrag.value = false;
			evt.dataTransfer.effectAllowed = "copyMove";
			dragIndex.value = header.index;
		};
		const onDrop = (header: TuHeaderDefn) => {
			isDrag.value = true;
			dropIndex.value = header.index;
			if (props.persistentId)
				table.reOrderTableColumns(dragIndex.value, dropIndex.value, props.persistentId);

			else
				table.reOrderTableColumns(dragIndex.value, header.index);
		};

		return {
			tableContainer,
			tableElement,
			selectedAll,
			expandedAll,
			ldash: _,
			thead,
			isMultipleSelected,
			selected,
			table,
			rowListeners,
			colsControl,
			getNestedField,
			totalColumns,
			updateColumns,
			startDrag,
			onDrop,
			isDrag,
			dragIndex,
			dropIndex,
			isLoaded
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.tu-table-content {
	width: 100%;
	animation-duration: 24s;

	// box-shadow: 0px 5px 22px 0px rgba(0,0,0, -var(shadow-opacity))
	border-radius: 16px;
	footer {
		padding-top: 10px;
	}
}

.tu-table__element {
	table-layout: fixed;
	width: 100%;
}
@keyframes fadeIn {
	0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.animation-table {
	animation-name: fadeIn;
    animation-duration: 100ms;
}

.display-inline {
	display: inline-block !important;
}

.loading-body {
	position: relative;
	height: 50vh;
	width: 50vw;
}
.tu-table {
	font-size: 0.9rem;
	margin: 0px;
	overflow: auto;

	::v-deep(table) {
		margin: 0px;
		border-collapse: collapse;

		border: 0px;
	}

	&.compact {
		:deep(.tu-table__td) {
			padding: 5px 12px !important;
		}
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
		background-color: -getColor("background");
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
		top: 0;
		z-index: 2;
		border-bottom: 1px solid -getColor("text", 0.2);
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
