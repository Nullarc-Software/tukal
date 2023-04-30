<template>
	<div class="tu-table-content" ref="tableContainer">
		<header v-if="$slots.header" class="tu-table__header">
			<slot name="header" />
		</header>
		<tu-popper v-if="columnSelector" arrow border-radius="6px" fitPopperContainer :placement="popperPlacement">
			<div class="column-chooser-table-bar" title="Column chooser">
				<tu-icon style="transform: translateY(-7px);">more_horiz</tu-icon>
			</div>
			<template #content>
				<tu-popup-menu>
					<tu-popup-item style="pointer-events: none;" divider-bottom>
						Column chooser
					</tu-popup-item>
					<tu-popup-item v-for="(column, index) in table.persistentSettings.columns" :key="index">
						<tu-checkbox v-model="column.visibility">
							{{ table.getCaptionForField(column.field) }}
						</tu-checkbox>
					</tu-popup-item>
				</tu-popup-menu>
			</template>
		</tu-popper>
		<div class="tu-table" :class="{
			isSelectedValue: modelValue,
			striped: striped,
			isMultipleSelected: isMultipleSelected,
			[`size-${size}`]: true,
			compact: compact
		}">
			<table class="tu-table__element" ref="tableElement">
				<thead ref="thead" class="tu-table__thead">
					<tu-th v-if="rowExpand" fixed @click="expandedAll = !expandedAll" style="width: 50px">
						<tu-icon class="tu-table__tr_expand_handle"
							:class="{ expanded: expandedAll }">keyboard_arrow_right</tu-icon>
					</tu-th>
					<tu-th v-if="multiSelect" fixed style="width: 50px">
						<tu-checkbox v-model="selectedAll" :indeterminate="table.isPartiallyChecked.value" />
					</tu-th>
					<tu-th v-for="header in table.getTableHeaders.value" :key="header.index" :field="header.field"
						:style="{
							width: header.width,
							minWidth: header.minWidth,
							maxWidth: header.maxWidth
						}" @enable-drag-listener="isDraggable = true" @disable-drag-listener="isDraggable = false"
						:draggable="`${isDraggable}`" @dragstart="startDrag($event, header)" @drop="onDrop(header)"
						@dragover.prevent @dragenter.prevent :class="{
							'animation-table':
								(isDrag && header.index === dragIndex) ||
								header.index === dropIndex
						}" :sort="header.props ? header.props.sort : false" :type="header.dataType"
						:search="header.props ? header.props.search : false">
						{{ header.caption }}
					</tu-th>
				</thead>
				<tbody :id="`${id}-tbody`" :class="{ 'loading-body': !isLoaded }" class="tu-table__tbody">
					<slot v-if="$slots.tbody" name="tbody" />
					<tu-tr v-else v-for="tr in table.dataView.value" :key="tr.index" :data="tr.rowData"
						:rowId="tr.index" :expanded="expandedAll" :expandHandle="rowExpand"
						@rowExpanded="tr.expanded = $event" @rowClick="rowListeners.click($event, this, tr.rowData)">
						<tu-td expand v-if="rowExpand">
							<tu-icon class="tu-table__tr_expand_handle"
								:class="{ expanded: tr.expanded }">keyboard_arrow_right</tu-icon>
						</tu-td>
						<tu-td checkbox v-if="multiSelect">
							<tu-checkbox v-model="tr.selected" :checked="selectedAll" />
						</tu-td>
						<tu-td v-for="(th, j) in table.getTableHeaders.value" :key="j" :class="{
							'animation-table':
								(isDrag && th.index === dragIndex) ||
								th.index === dropIndex
						}" :textWrap="th.textWrap">
							<span :title="tr.rowData[th.field]" v-if="th.isComponent === false">
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
							<component v-else-if="
								th.isComponent &&
								tr.componentValues[th.field]
							" v-model="tr.componentValues[th.field].value" v-bind="th.componentProps" :is="th.component"
								:rowIndex="tr.index" :rowData="tr.rowData" />
							<component v-else-if="th.isComponent" v-bind="th.componentProps" :is="th.component"
								:rowIndex="tr.index" :rowData="tr.rowData" />
						</tu-td>
						<template #expand v-if="tr.rowData['expanded']">
							<component :is="
								tr.rowData['expanded'].component ??
								require(`${tr.rowData['expanded'].componentName}`)
							" v-bind="tr.rowData['expanded'].props" />
						</template>
					</tu-tr>
					<span v-if="table.isTableDataEmpty" class="tu-table__no-data">
						No Data Found
					</span>
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
	TuTableStoreConstructor,
	TuTableLocalColumn
} from "./tuTableStore";

import tuTh from "./tuTh.vue";
import tuTr from "./tuTr.vue";
import tuTd from "./tuTd.vue";
import tuIcon from "../tuIcon";
import tuCheckbox from "../tuCheckBox";
import { tuPopper, tuPopupMenu, tuPopupItem } from "../tuPopper";
import contextMenuComponent from "./tuTableContextMenu.vue";
import { TuLoading, TuLoadingAttributes } from "../tuLoading";
import { VirtualElement } from "@popperjs/core";
import { threadId } from "worker_threads";
import { PlacementType } from "../tuPopper/tuPopper.vue";

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
		tuPopupMenu,
		tuPopupItem
	},
	props: {
		modelValue: {},  //v-model prop: current selected data present in the table
		pageSize: {  //pageSize prop: no fo rows to be present in one page
			type: Number,
			default: 25
		},
		page: {  //page prop: current page number for the table
			type: Number,
			default: 1
		},
		numPages: {  //numPages prop: total number of pages present in table
			type: Number,
			default: 1
		},
		striped: {  //striped prop: enables striped row on table
			default: false,
			type: Boolean
		},
		loading: {  //loading prop: Set to true if data is loading. Ignored in Server Side model
			default: false,
			type: Boolean
		},
		size: {  //size prop: The Size of the table values are i) fitData ii) fill iii) custom size string   
			type: String,
			default: ""
		},
		model: {  //model prop:  Specifies the model for the table. Server side model will send pagination, sorting and filtering params to the server. values for the prop are server and local
			type: String,
			default: "local"
		},
		data: {  //data prop:The Data for the table. ignored in Server Side model. SSM This contains the table data.
			type: Array,
			default: () => []
		},
		columnSelector: {  //columSelecter prop: enables column selected popper to select only particular columns
			type: Boolean,
			default: false
		},
		id: {  //id prop: unique id for table
			type: String,
			default: () => `tu-table-${TableIdentifierAuto.id++}`
		},
		persistentId: {  //persistentId prop: unique persistent id for persisting the table configuration
			type: String,
			default: ""
		},
		draggable: {  //draggable porp: enables the dragging of columns in the table
			type: Boolean,
			default: false
		},
		multiSelect: {  //multiSelect prop: selection of multiple data is enabled
			type: Boolean,
			default: false
		},
		serverSideConfig: {  //serverSideConfif prop: serverSideConfiguration for the server side model
			type: Object as PropType<TuTableServerModel>,
			default: () => {
				return {};
			}
		},
		rowExpand: {  //rowExpand prop: expands row if boolean is true
			type: Boolean,
			default: false
		},
		columns: {  //columns prop: columns for the table
			type: Object as () => TuHeaderDefn[],
			default: () => []
		},
		tableInstance: {  //tableinstance prop: table instance for the table
			type: TuTableStore,
			default: null
		},
		compact: {  //compact prop: compact style for table is enabled
			type: Boolean,
			default: false
		},
		initialComponentValues: {  //initialComponentValues prop: Initial values for all the components in the rows of the table.
			type: Object as PropType<Array<TuTableInitialComponentValues>>,
			default: () => []
		},
		popperPlacement: {  //popperPlacement prop: placement for the column selector popper
			type: String,
			default: () => "auto" as PlacementType
		}

	},
	emits: [
		"update:modelValue",
		"update:numPages",
		"update:data",
		"update:tableInstance",
		"onRowClicked",
		"onTableBeginLoad",
		"onTableEndLoad",
		"onCellClicked",
		"onTableConfigUpdated"
	],
	provide() {
		return {
			selected: (data) => {
				this.selected(data);
			},
			tableInstance: this.table,
			tableId: this.id
		};
	},
	setup(props, context) {
		const colspan = ref(0);
		const thead = ref<HTMLHeadElement>();
		const tableElement = ref<HTMLTableElement>();
		const tableContainer = ref<HTMLDivElement>();
		const selectedAll = ref(false);
		const expandedAll = ref(false);
		const noOfTableValues = ref(0);
		const isLoaded = ref(false);
		const isMounted = ref(false);

		const totalColumns = ref(props.columns);
		const isDraggable = ref(props.draggable);
		const openColumnChooser = ref(false);
		let table: TuTableStore;

		let virtualElement: VirtualElement = null;

		let load: TuLoading = null;

		function setLoading() {
			const id = `${props.id}-tbody`;
			if (_.isNil(document.getElementById(id)) === false) {
				const attrs: TuLoadingAttributes = {
					target: `#${id}`,
					color: "dark",
					type: "circles",
					scale: "1.0"
				};
				if (load) {
					load.close();
				}
				load = new TuLoading(attrs);
			}
		}

		const tableConstructor: TuTableStoreConstructor = {
			columnsInitial: (props.multiSelect && props.rowExpand) ? 2 : (props.multiSelect || props.rowExpand) ? 1 : 0,
			tableId: props.id,
			persistenceId: props.persistentId,
			serverSideModel: props.model !== "local",
			serverSideConfig: props.serverSideConfig,
			pageSize: props.pageSize,
			page: props.page
		}

		table = new TuTableStore(tableConstructor);
		table.constructHeaders(props.columns, props.persistentId);
		if (props.model === "local") {
			if (props.data.length !== 0)
				table.setTableData(props.data);
			else
				table.isTableDataEmpty = true
		}

		const isMultipleSelected = computed(() => {
			return _.isArray(props.modelValue);
		});

		function selected(val: any) {
			if (isMultipleSelected.value) selectedMultiple(val);
			else context.emit("update:modelValue", val);
		}

		function selectedMultiple(val: any) {
			const newVal = props.modelValue as Array<any>;
			if (newVal.includes(val)) newVal.splice(newVal.indexOf(val), 1);
			else newVal.push(val);

			context.emit("update:modelValue", newVal);
		}

		/* function showColumnChooser (event: MouseEvent) {
			if(props.columnSelector) {
				event.preventDefault();
				event.stopPropagation();
				// Check if mouse was within the bounding rectangle of the headers
				const rect = thead.value.getBoundingClientRect();
				if (event.clientX > rect.x && event.clientX < rect.right 
					&& event.clientY > rect.y && event.clientY < rect.bottom) {
					virtualElement.getBoundingClientRect =  generateGetBoundingClientRect(event.clientX, event.clientY);					
				}	
			
				
				if (openColumnChooser.value === false)
					openColumnChooser.value = true;
			}
		} */

		const rowListeners = {
			click: function (event, tr, row) {
				context.emit("onRowClicked", row);
			}
		};
		const colsControl = ref([]);

		watch(
			[() => props.pageSize, () => props.page],
			() => {
				table.setPaging(props.pageSize, props.page);
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

		watch(table.loading, (value) => {
			if (value) {
				if (_.isNil(load) && isMounted.value) {
					context.emit("onTableBeginLoad");
					setLoading();
				}
			}
			else {
				if (_.isNil(load) === false) {
					load.close();
					load = null;
				}
				context.emit("onTableEndLoad");
			}
		});

		watch(table.dataView, () => {
			context.emit("update:data", table.dataView.value);
			noOfTableValues.value = table.dataView.value.length;
			isLoaded.value = true;
		});

		watch(table.getSelectedRows, () => {
			const newVal = table.getSelectedRows.value as Array<any>;
			context.emit("update:modelValue", newVal);
			if (newVal.length === noOfTableValues.value)
				selectedAll.value = true;
			if (newVal.length === 0) selectedAll.value = false;
		});

		onMounted(() => {

			if (thead.value) {
				colspan.value = thead.value.querySelectorAll("th").length;
			}

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

			if (table.loading && _.isNil(load) && props.model !== "local") {
				context.emit("onTableBeginLoad");
				setLoading();
			}

			table.refresh();
			isMounted.value = true;
		});

		onBeforeUnmount(() => {
			table = undefined; // Force free up mem on next gc call
		});

		const getNestedField = function (rowData: any, key: string) {
			return _.get(rowData, key, undefined);
		};

		const dragIndex = ref(null);
		const dropIndex = ref(null);
		const isDrag = ref(false);

		const startDrag = (evt: DragEvent, header: TuHeaderDefn) => {
			if (isDraggable.value) {
				isDrag.value = false;
				evt.dataTransfer.effectAllowed = "copyMove";
				dragIndex.value = header.index;
			}
			else {
				evt.preventDefault();
				evt.stopPropagation();
			}
		};
		const onDrop = (header: TuHeaderDefn) => {
			if (isDraggable.value) {
				isDrag.value = true;
				dropIndex.value = header.index;
				if (props.persistentId) {
					table.reOrderTableColumns(
						dragIndex.value,
						dropIndex.value,
						props.persistentId
					);
					context.emit(
						"onTableConfigUpdated",
						JSON.parse(
							localStorage.getItem(`table-${props.persistentId}`)
						)
					);
				}
				else table.reOrderTableColumns(dragIndex.value, header.index);
			}
		};

		return {
			tableContainer,
			tableElement,
			selectedAll,
			expandedAll,
			ldash: _,
			thead,
			isMounted,
			isMultipleSelected,
			selected,
			table,
			rowListeners,
			colsControl,
			getNestedField,
			totalColumns,
			openColumnChooser,
			startDrag,
			onDrop,
			isDrag,
			dragIndex,
			dropIndex,
			isDraggable,
			isLoaded,
			virtualElement
		};
	}
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";


.tu-table-content {
	width: 100%;
	height: 100%;
	animation-duration: 24s;
	display: inline-flex;
	flex-direction: column;
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
}

.tu-table {
	font-size: 0.9rem;
	margin: 0px;
	height: 100%;
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
				background: -getColor("gray-2") !important;
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
		overflow: auto;
		position: relative;

		&:empty {
			display: none;
			background: #000;

			~.tu-table_not-found {
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

		&~.tu-table {
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
		border-bottom: 1px solid -getColorAlpha("text", 0.2);

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

	&__no-data {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		margin-top: 20px;
	}
}

.column-chooser-table-bar {
	display: flex;
	height: 25px;
	transform: translateY(15px);
	background-color: -getColor("gray-4");
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	justify-content: center;
	width: 75px;
}
</style>