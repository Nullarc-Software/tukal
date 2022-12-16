import { XHRRequestWrapper } from "@/utils/apiWrapper";
import * as _ from "lodash";
import { Component, computed, ComputedRef, reactive, ReactiveEffect, ref, Ref, shallowReactive, watch } from "vue";

import { TukalGlobals } from "../tukalGlobals";

export class TableIdentifierAuto {
	public static id = 0;
}

export interface TuTableRow {
	index: number;
	selected: boolean;
	expanded: boolean;
	componentValues?: {
		[fieldName: string]: any;
	};
	rowData?: {
		[name: string]: any;
	};
}

export interface TuFilterDefn {
	field: string;
	type: string;
	value: any;
}

export interface TuHeaderDefn {
	index?: number;
	minWidth?: number | string;
	maxWidth?: number | string;
	width?: number | string;
	field?: string;
	caption?: string;
	isComponent?: boolean;
	element?: HTMLElement;
	inputComponent?: boolean;
	component?: HTMLElement | Component | string;
	componentProps?: any;
	props?: {
		search?: boolean;
		sort?: boolean;
	};
	textWrap?: boolean;
	valueFormatter?: Function;
	hidden?: boolean;
}

export interface TuTableSorterDefn {
	field: string;
	dir: "asc" | "desc" | boolean;
}

export interface TuTableDefn {
	headers: Array<TuHeaderDefn>;
	data: Array<TuTableRow>;
	currentFilters: TuFilterDefn[];
	currentSort: TuTableSorterDefn[];
	pageSize?: number;
	currentPage?: number;
}

export interface TuTableServerModel {
	ajaxUrl: string;
	method?: string;
	ajaxLoadedFn?: Function;
	ajaxErrorFn?: Function;
}

export interface TuTableProps {
	multiSelect?: boolean;
	serverSideConfig?: TuTableServerModel;
	columns: Array<TuHeaderDefn | null>;
	model: "server" | "local" | string;
	size: string;
}

export interface TuTableLocalColumn {
	field?: string;
	visibility?: boolean;
}

export interface TuTableLocal {
	columns?: Array<TuTableLocalColumn>;
}

export interface TuTableContextMenuEntry {
	caption: string | HTMLElement;
	icon?: HTMLElement;
	hasSubMenu?: boolean;
	disabled?: boolean;
	onClicked?: Function;
	data?: any;
	closeOnClick?: boolean;
	divider?: boolean;
	subMenu?: TuTableContextMenuEntry[];
}

export class TableFunctions {}

export interface TuTableInitialComponentValues {
	selector: any;
	key: string;
	value: any;
}

export class TuTableStore {
	private id: string;
	private persistenceId: string;
	private table: TuTableDefn;
	private headerIndexCtr = 0;
	private rowIndexCtr = 0;
	private activeSort: Ref<number>;
	private refreshTable: Ref<boolean>;
	private firstDataSet: boolean;

	public loading: Ref<boolean>;

	public serverSideModel = false;
	public serverModelProps: TuTableServerModel;

	public headerCount: Ref<number>;
	public pageLength: Ref<number>;
	public rowCount: Ref<number>;

	public getTableData: ComputedRef<TuTableRow[]>;
	public isPartiallyChecked: ComputedRef<boolean>;
	public getTableHeaders: ComputedRef<TuHeaderDefn[]>;
	public getSorters: ComputedRef<TuTableSorterDefn[]>;
	public getFilters: ComputedRef<TuFilterDefn[]>;
	public getSelectedRows: ComputedRef<TuTableRow[]>;

	public persistentSettings: TuTableLocal;	

	public getCaptionForField (field: string) {

		const header = _.find(this.table.headers, {
			field: field
		});

		if (header)
			return header.caption;
		else 
			return "<error>";
	}

	private getField (obj: any, field: string) {
		let temp = Object.assign({}, obj);
		for (const key of field.split("."))
			if (temp[key]) temp = temp[key];
		
		return temp;
	}

	constructor (tableId: string, columnsInitial = 0, persistenceId?: string) {
		this.id = tableId;
		this.persistenceId = persistenceId;
		this.table = reactive({
			headers: [],
			data: [],
			currentFilters: [],
			currentSort: [],
			pageSize: 25,
			currentPage: 1
		});
		this.persistentSettings = reactive({
			columns: []
		});
		this.loading = ref(true);

		this.headerCount = ref(columnsInitial);
		this.pageLength = ref(1);
		this.activeSort = ref(0);
		this.rowCount = ref(0);
		this.refreshTable = ref(false);
		this.getTableData = computed(() => {
			this.refreshTable.value = !this.refreshTable.value;
			this.loading.value = true;
			let data: any[] = [];
			if (this.serverSideModel === false) {
				this.rowCount.value = this.table.data.length;
				// apply search filter
				data = _.filter(this.table.data, (value: TuTableRow) => {
					return _.every(this.table.currentFilters, (filterValue) => {
						const fieldValue = this.getField(
							value.rowData,
							filterValue.field
						);
						if (filterValue.value === "") return true;
						if (fieldValue !== undefined) {
							return String(fieldValue)
								.toLowerCase()
								.includes(
									String(filterValue.value).toLowerCase()
								);
						}
						else return true;
					});
				});

				// apply sorters
				const fields = _.map(this.table.currentSort, (value) => {
					return `rowData.${value.field}`;
				});
				const sortDirs = _.map(this.table.currentSort, (value) => {
					return value.dir;
				});

				if (fields.length) data = _.orderBy(data, fields, sortDirs);

				this.pageLength.value = Math.ceil(
					data.length / this.table.pageSize
				);
				if (this.table.pageSize > 0) {
					data = _.slice(
						data,
						this.table.pageSize * (this.table.currentPage - 1),
						this.table.pageSize * (this.table.currentPage - 1) +
							this.table.pageSize
					);
				}
				this.loading.value = false;
			}
			else {
				const inst = this;
				const xhrRequest = new  XHRRequestWrapper();
				xhrRequest.request.onreadystatechange = () => {
					if (
						xhrRequest.request.readyState === XMLHttpRequest.DONE &&
						xhrRequest.request.status === 200
					) {
						if (xhrRequest.request.responseType === "json") {
							inst.setTableData(xhrRequest.request.response.data);
							inst.rowCount.value = xhrRequest.request.response.total_rows;
						}
						else if (xhrRequest.request.responseType === "text") {
							const obj = JSON.parse(xhrRequest.request.responseText);
							inst.rowCount.value = obj.total_rows;
							inst.setTableData(obj.data);
						}
						else {
							const obj = JSON.parse(xhrRequest.request.responseText);
							inst.rowCount.value = obj.total_rows;
							inst.setTableData(obj.data);
						}
						inst.pageLength.value = Math.ceil(
							data.length / inst.table.pageSize
						);
						data = inst.table.data;
						this.loading.value = false;
					}
				};
				const props: any = {
					filters: this.getFilters.value,
					sorters: this.getSorters.value,
					size: this.table.pageSize,
					page: this.table.currentPage
				};

				if (_.isUndefined(this.serverModelProps.method))
					this.serverModelProps.method = "GET";

				xhrRequest.open(
					this.serverModelProps.method,
					TukalGlobals.ApiRequestTarget + this.serverModelProps.ajaxUrl					
				);
				xhrRequest.request.setRequestHeader("Content-Type", "application/json");
				xhrRequest.request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				xhrRequest.request.send(JSON.stringify(props));
				data = this.table.data;
			}

			return data;
		});

		this.getTableHeaders = computed(() => {
			return _.filter(this.table.headers, {
				hidden: false
			}) as TuHeaderDefn[];
			// return this.table.headers;
		});

		this.getSorters = computed(() => {
			return this.table.currentSort;
		});

		this.getSelectedRows = computed(() => {
			return _.filter(this.table.data, (row) => {
				return row.selected;
			});
		});

		this.getFilters = computed(() => {
			return this.table.currentFilters;
		});

		this.serverModelProps = reactive({
			ajaxUrl: ""
		});

		this.isPartiallyChecked = computed(() => {
			const filteredRows = _.filter(this.table.data, (row) => {
				return row.selected;
			});
			if (filteredRows.length > 0) {
				// console.log("Total : " + this.rowIndexCtr + ", Selected : " + filteredRows.length + ", Value : " + (this.rowIndexCtr !== filteredRows.length));
				return this.rowIndexCtr !== filteredRows.length;
			}
			else return false;
		});

		if (_.isEmpty(this.persistenceId) === false) {
			watch(this.persistentSettings, () => {				
				for(const column of this.persistentSettings.columns) 
					this.setColumnVisibility(column.field, !column.visibility);				
			});
		}
		
	}

	private verifyTableSchema () {
		const persistentSettings = JSON.parse(localStorage.getItem(`table-${this.persistenceId}`)) as TuTableLocal;
		if (_.isNil(persistentSettings) === false && _.isNil(persistentSettings.columns) === false) {
			if (persistentSettings.columns.length != this.table.headers.length) {
				console.log("wiping persistence for table");
				localStorage.removeItem(`table-${this.persistenceId}`);
				return;
			}

			for (const header of this.table.headers) {
				if (_.isNil(_.find(persistentSettings.columns, {field: header.field}))) {
					// Table schema changed, reset persistence
					console.log("wiping persistence for table");
					localStorage.removeItem(`table-${this.persistenceId}`);
					return;
				}
			}
		}
		
	}

	public getRowsMatching (filter: any): TuTableRow[] {
		const filteredRows = _.filter(
			this.table.data,
			_.matches({ rowData: filter })
		);
		return filteredRows;
	}

	public setServerModelProps (props: TuTableServerModel) {
		this.serverModelProps.ajaxUrl = props.ajaxUrl;
		this.serverModelProps.ajaxErrorFn = props.ajaxErrorFn;
		this.serverModelProps.ajaxLoadedFn = props.ajaxLoadedFn;
	}

	public setPaging (pageSize: number, page: number) {
		this.table.pageSize = pageSize;
		this.table.currentPage = page;
		console.log(this.table.currentPage);
	}

	public refresh () {
		this.refreshTable.value = !this.refreshTable.value;
	}

	public updateComponentValuesForRows (rows: TuTableInitialComponentValues[]) {
		for (const row of rows) {
			const filtered = _.filter(this.table.data, row.selector);
			if (filtered.length > 0) {
				filtered.forEach((selectedRow) => {
					if (selectedRow.componentValues[row.key])
						selectedRow.componentValues.row.key.value = row.value;
					else selectedRow.componentValues[row.key] = ref(row.value);
				});
			}
		}
	}

	public setTableData (data: any) {
		this.table.data.splice(0);
		_.forEach(data, (value: any) => {
			let componentValues = null;
			if (value.componentValues) {
				componentValues = ref(value.componentValues);
				delete value.componentValues;
			}
			const row: TuTableRow = shallowReactive({
				index: ++this.rowIndexCtr,
				selected: false,
				expanded: false,
				rowData: shallowReactive(value),
				componentValues: componentValues
			});
			this.table.data.push(row);
		});

		// TODO: Optimize this stuff, horrible perf
		_.forEach(this.table.data, (row) => {
			const componentValueObject = {};
			_.forEach(this.table.headers, (header) => {
				if (header.isComponent && header.inputComponent) {
					if (
						_.isNil(header.componentProps) === false &&
						_.isNil(header.componentProps.modelValue)
					)
						componentValueObject[header.field] = ref(undefined);
					else if (_.isNil(header.componentProps))
						componentValueObject[header.field] = ref(undefined);
				}
			});

			if (row.componentValues === null)
				row.componentValues = componentValueObject;
		});
	}

	private swap (i: number, j: number, array: any[]) {
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	public constructHeaders (headers: any[], persistentId: string) {
		if (headers.length === 1 && typeof headers[0].type === "symbol")
			headers = headers[0].children;
		_.forEach(headers, (value) => {
			if (value && value.field) {
				const header: TuHeaderDefn = {
					index: this.headerIndexCtr++,
					field: value.field,
					maxWidth: value.maxWidth ?? Number.MAX_SAFE_INTEGER,
					minWidth: value.minWidth ?? 100,
					width: value.width,
					isComponent: value.isComponent ?? false,
					inputComponent: value.inputComponent,
					component: value.component,
					componentProps: value.componentProps,
					caption: value.caption,
					props: value.props,
					valueFormatter: value.valueFormatter,
					hidden: false
				};
				this.table.headers.push(header);
				this.headerCount.value++;
			}
		});
		if (_.isEmpty(this.persistenceId) === false) {
			this.verifyTableSchema();
			if (localStorage.getItem(`table-${persistentId}`) !== null) {
				const localSettings = JSON.parse(localStorage.getItem(`table-${persistentId}`)) as TuTableLocal;
				for(let i = 0; i < localSettings.columns.length; i++) {
					this.persistentSettings.columns.push({
						field: localSettings.columns[i].field,
						visibility: localSettings.columns[i].visibility
					});
				}
				// Restore saved column order
				let currSwapIndex = 0;
				for (let i = 0; i < this.persistentSettings.columns.length; i++ ) {
					const index = _.findIndex(this.table.headers, {field: this.persistentSettings.columns[i].field});
					if (index > -1) {
						this.swap(currSwapIndex, index, this.table.headers);
						currSwapIndex++;
					}
				}
				/* const getNextHeader = (i: number) => {
					const header = this.persistentSettings.columns[i].field;
					for (let j = 0; j < this.table.headers.length; j++) {
						if (this.table.headers[j].field === header)
							return this.table.headers[j];
					}
				};
				const prevHeaders: TuHeaderDefn[] = [];
				for (let i = 0; i < this.table.headers.length; i++)
					prevHeaders.push(getNextHeader(i));
				this.table.headers = prevHeaders; */
			}
			else {
				for (let i = 0; i < headers.length; i++) {
					const column: TuTableLocalColumn = {
						field: headers[i].field,
						visibility: headers[i].hidden ? !headers[i].hidden : true
					};
					this.persistentSettings.columns.push(column);
				}
				localStorage.setItem(
					`table-${this.persistenceId}`,
					JSON.stringify(this.persistentSettings)
				);
			}
		}
	}

	public setColumnVisibility (fieldName: string, value: boolean) {
		const header = _.find(this.table.headers, {
			field: fieldName
		});

		if(header) {
			if(header.hidden != value) { // update only if value is changed  
				header.hidden = value;
				if (this.persistenceId) {
					localStorage.setItem(
						`table-${this.persistenceId}`,
						JSON.stringify(this.persistentSettings)
					);
				}	
			}
			
		}

		
	}

	public reOrderTableColumns (indexOne: number, indexTwo: number, persistentId?: string) {
		let indexOneFound = false;
		let indexTwoFound = false;
		for (let i = 0; i < this.table.headers.length; i++) {
			if (!indexOneFound) {
				if (this.table.headers[i].index === indexOne) {
					indexOne = i;
					indexOneFound = true;
				}
			}
			if (!indexTwoFound) {
				if (this.table.headers[i].index === indexTwo) {
					indexTwo = i;
					indexTwoFound = true;
				}
			}
			if (indexOneFound && indexTwoFound) break;
		}
		this.table.headers.splice(indexTwo, 0, this.table.headers.splice(indexOne, 1)[0]);
		if (persistentId) {			
			for (let i = 0; i < this.table.headers.length; i++)
				this.persistentSettings.columns[i].field = this.table.headers[i].field;
			localStorage.setItem(`table-${persistentId}`, JSON.stringify(this.persistentSettings));
		}
	}

	public deleteRow (index: number) {
		_.remove(this.table.data, (value: TuTableRow) => {
			return value.index === index;
		});
	}

	public setFilter (field: string, type: string, value: string) {
		const idx = _.findIndex(this.table.currentFilters, (value) => {
			return value.field === field;
		});

		if (idx < 0) {
			this.table.currentFilters.push({
				field,
				type,
				value
			});
		}
		else {
			this.table.currentFilters[idx].value = value;
			this.table.currentFilters[idx].field = field;
			this.table.currentFilters[idx].type = type;
		}
	}

	public deleteFilter (field: string) {
		_.remove(this.table.currentFilters, (item) => {
			return item.field === field;
		});
	}

	public clearFilters () {
		this.table.currentFilters = [];
	}

	public getHeaderObject (field: string | number) {
		let header: TuHeaderDefn = null;
		if (typeof field === "string") {
			_.forEach(this.table.headers, (value) => {
				if (value.field === field) {
					header = value;
					return false;
				}
			});
		}
		else if (field >= 0) header = this.table.headers[field];
		else if (this.table.headers.length)
			header = this.table.headers[this.table.headers.length - 1];
		return header;
	}

	public getRowData (index: number) {
		return this.table.data[index].rowData;
	}

	public toggleSort (field: string) {
		const obj = _.find(this.table.currentSort, (value) => {
			return value.field === field;
		});

		if (obj) {
			_.remove(this.table.currentSort, (value, index) => {
				return value.field !== field;
			});
			if (obj.dir === "asc") {
				obj.dir = "desc";
				return "desc";
			}
			else {
				_.remove(this.table.currentSort, obj);
				return "none";
			}
		}
		else {
			_.remove(this.table.currentSort, (value, index) => {
				return value.field !== field;
			});
			this.table.currentSort.push({
				field,
				dir: "asc"
			});
			return "asc";
		}
	}
}
