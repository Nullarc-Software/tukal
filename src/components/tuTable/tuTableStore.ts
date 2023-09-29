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

export type TuFilterDefnType = "like" | "equals" | "date-between";
export interface TuFilterDefn {
	field: string;
	type: TuFilterDefnType;
	value: any;
}


export type TuHeaderDataTypes = "string" | "number" | "boolean" | "timestamp";

export interface TuHeaderDefn{
	index?: number;
	minWidth?: number;
	maxWidth?: number;
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
	searchFunction?: Function;
	hidden?: boolean;
	dataType?:  TuHeaderDataTypes; 
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
	additionalParams?: {
		[param: string]: string | Ref<any>
	},
}


export interface TuTableProps {
	multiSelect?: boolean;
	serverSideConfig?: TuTableServerModel;
	
	columns: Array<TuHeaderDefn | null>;
	model: "server" | "local" | string;
	size?: string;
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

export interface TuTableStoreConstructor {
	tableId: string;
	columnsInitial: number;
	persistenceId?: string;
	serverSideModel?: boolean;
	serverSideConfig?: TuTableServerModel;
	pageSize?: number;
	page?: number;
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
	public dataView: Ref<TuTableRow[]>;

	public getTableData: () => Promise<boolean>;
	public isPartiallyChecked: ComputedRef<boolean>;
	public getTableHeaders: ComputedRef<TuHeaderDefn[]>;
	public getSorters: ComputedRef<TuTableSorterDefn[]>;
	public getFilters: ComputedRef<TuFilterDefn[]>;
	public getSelectedRows: ComputedRef<TuTableRow[]>;

	public persistentSettings: TuTableLocal;	
	public isTableDataEmpty: boolean;

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
		return _.get(obj, field, undefined);
	}

	constructor (values: TuTableStoreConstructor) {
		this.id = values.tableId;
		this.persistenceId = values.persistenceId;
		this.table = reactive({
			headers: [],
			data: [],
			currentFilters: [],
			currentSort: [],
			pageSize: values.pageSize,
			currentPage: values.page
		});
		this.persistentSettings = reactive({
			columns: []
		});
		this.loading = ref(false);
		this.dataView = ref([]);
		this.serverModelProps = values.serverSideConfig;
		this.serverSideModel = values.serverSideModel;

		this.headerCount = ref(values.columnsInitial);
		this.pageLength = ref(1);
		this.activeSort = ref(0);
		this.rowCount = ref(0);
		this.refreshTable = ref(false);
		this.isTableDataEmpty = false;
		this.getTableData = () : Promise<boolean> =>  {

			return new Promise(((resolve, reject) => {
				this.loading.value = true;
				if (this.serverSideModel === false) {
					this.rowCount.value = this.table.data.length;
					// apply search filter
					this.dataView.value = _.filter(this.table.data, (value: TuTableRow) => {
						return _.every(this.table.currentFilters, (filterValue: TuFilterDefn) => {
							const fieldValue = this.getField(
								value.rowData,
								filterValue.field
							);
							if (filterValue.value === "") return true;
							if (fieldValue !== undefined) {
								const headerObject = this.getHeaderObject(filterValue.field);
								if (headerObject && headerObject.searchFunction) 
									return headerObject.searchFunction(fieldValue, filterValue.value);
								//TODO: Is this needed to make it more seamless ??
								/* else if (headerObject && headerObject.valueFormatter) {
								return (headerObject.valueFormatter(fieldValue) as string).toLowerCase()
									.includes(
										String(filterValue.value).toLowerCase()
									);
							} */
								else {
									if (filterValue.type === "like") {
										return String(fieldValue)
											.toLowerCase()
											.includes(
												String(filterValue.value).toLowerCase()
											);
									}
									else if (filterValue.type === "date-between") {

										if (_.isEmpty(filterValue.value[0]) && _.isEmpty(filterValue.value[1]))
											return true;

										const valueDate = new Date(fieldValue);
										if (_.isEmpty(filterValue.value[0]) && !_.isEmpty(filterValue.value[1]))
											return valueDate <= new Date(filterValue.value[1]);
										else if (!_.isEmpty(filterValue.value[0]) && _.isEmpty(filterValue.value[1]))
											return valueDate >= new Date(filterValue.value[0]);
										else 
											return valueDate >= new Date(filterValue.value[0]) && valueDate <= new Date(filterValue.value[1]);
									}
								}
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

					if (fields.length) this.dataView.value = _.orderBy(this.dataView.value, fields, sortDirs);

					this.pageLength.value = Math.ceil(
						this.dataView.value.length / this.table.pageSize
					);
					if (this.table.pageSize > 0) {
						this.dataView.value = _.slice(
							this.dataView.value,
							this.table.pageSize * (this.table.currentPage - 1),
							this.table.pageSize * (this.table.currentPage - 1) +
							this.table.pageSize
						);
					}
					this.loading.value = false;
					resolve(true);
				}
				else {					
					const xhrRequest = new  XHRRequestWrapper();
					xhrRequest.request.onreadystatechange = () => {
						if (
							xhrRequest.request.readyState === XMLHttpRequest.DONE &&
							xhrRequest.request.status === 200
						) {
							if (xhrRequest.request.responseType === "json") {
								const obj = JSON.parse(xhrRequest.request.responseText);
								if (!_.isNil(xhrRequest.request.responseText) && xhrRequest.request.responseText.length !== 0) {
									this.setTableData(xhrRequest.request.response.data);
									this.rowCount.value = xhrRequest.request.response.total_rows;
								}
								else 
									this.isTableDataEmpty = true;						
							}
							else if (xhrRequest.request.responseType === "text") {
								if(!_.isNil(xhrRequest.request.responseText) && xhrRequest.request.responseText.length !== 0) {
									const obj = JSON.parse(xhrRequest.request.responseText);
									if (Array.isArray(obj)) {
										this.setTableData(obj);
										this.rowCount.value = obj.length;
									}
									else {
										this.rowCount.value = obj.total_rows;
										this.setTableData(obj.data);
									}
								}
								else 
									this.isTableDataEmpty = true;
							}
							else {
								if(!_.isNil(xhrRequest.request.responseText) && xhrRequest.request.responseText.length !== 0) {
									const obj = JSON.parse(xhrRequest.request.responseText);
									if(obj.length === 0)
										this.isTableDataEmpty = true;
									this.rowCount.value = obj.total_rows;
									if (Array.isArray(obj)) {
										this.setTableData(obj);
										this.rowCount.value = obj.length;
									}
									else {
										this.rowCount.value = obj.total_rows;
										this.setTableData(obj.data);
									}
								}
								else 
									this.isTableDataEmpty = true;
							}
							this.dataView.value = this.table.data;
							this.pageLength.value = Math.ceil(
								this.rowCount.value / this.table.pageSize
							);
							this.loading.value = false;
							resolve (true);							
						}
					};

					xhrRequest.request.onerror = () => {
						this.loading.value = false;
						reject(false);
					};

					const props: any = {
						filters: this.getFilters.value,
						sorters: this.getSorters.value,
						size: this.table.pageSize,
						page: this.table.currentPage
					};

					if (this.serverModelProps.additionalParams) {
						for (const [key, value] of Object.entries(this.serverModelProps.additionalParams)) {
							if (typeof value === "string")
								props[key] = value;
							else if (typeof value === typeof ref<any>)
								props[key] = value.value;
							else if (typeof value === "object")
								props[key] = value;
						}
					}
	
					if (_.isUndefined(this.serverModelProps.method))
						this.serverModelProps.method = "GET";
	
					xhrRequest.open(
						this.serverModelProps.method,
						TukalGlobals.ApiRequestTarget + this.serverModelProps.ajaxUrl					
					);
					xhrRequest.request.setRequestHeader("Content-Type", "application/json");
					xhrRequest.request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					xhrRequest.request.send(JSON.stringify(props));
				}
			}).bind(this));	
		};

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

		watch([
			() => this.table.currentFilters, 
			() => this.table.currentSort, 
			() => this.table.pageSize, 
			() => this.table.currentPage,
			this.refreshTable
		], (newValue, oldValue) => {
			this.getTableData().then(result => {
				this.loading.value = false;
				// No need to do anything as this.dataView would be set on success and reactivity will take over.
			}).catch(error => {
				console.error("TuTable: Error Occurred while fetching from API");
			});
		}, {
			deep: true
		});

		
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
					searchFunction: value.searchFunction,
					hidden: false,
					dataType: value.dataType
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

	public setFilter (field: string, type: TuFilterDefnType, value: any) {
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
