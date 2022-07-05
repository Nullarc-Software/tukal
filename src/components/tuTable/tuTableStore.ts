
import _ from "lodash";
import { Component, computed, ComputedRef, reactive, ref, Ref, shallowReactive } from "vue";

export class TableIdentifierAuto {
	public static id = 0;
}

export interface TuTableRow {
	index: number,
	selected: boolean,
	expanded: boolean,
	rowData?: {
		[name:string] : any
	}
}

export interface TuFilterDefn {
	field: string,
	type: string,
	value: any
}

export interface TuHeaderDefn {
	index?: number,
	minWidth?: number | string,
	maxWidth?: number | string,
	width?: number | string,
	field?: string,
	caption?: string,
	isComponent?: boolean,
	element?: HTMLElement,
	component?: HTMLElement | Component | string,
	componentProps?: any,
	props?: {
		search?: boolean,
		sort?: boolean
	},
	valueFormatter?: Function
}

export interface TuTableSorterDefn {
	field: string,
	dir: "asc" | "desc" | boolean
}

export interface TuTableDefn {
	headers: Array<TuHeaderDefn>,
	data: Array<TuTableRow>,
	currentFilters: TuFilterDefn[],
	currentSort: TuTableSorterDefn[],
	pageSize?: number,
	currentPage?: number
}

export interface TuTableServerModel {
	ajaxUrl: string,
	method?: string,
	ajaxLoadedFn?: Function,
	ajaxErrorFn?: Function
}

export interface TuTableProps {
	multiSelect?: boolean,
	serverSideConfig?: TuTableServerModel,
	columns: Array<TuHeaderDefn|null>,
	model: string,
	size: string,
}

export interface TuTableContextMenuEntry {
	caption: string | HTMLElement,
	icon?: HTMLElement,
	hasSubMenu?: boolean,
	onClicked?: Function,
	data?: any,
	closeOnClick?: boolean,
	divider?: boolean,
	subMenu?: TuTableContextMenuEntry[]
}

export class TableFunctions {

}

export class TuTableStore {
	private id: string;
	private table: TuTableDefn;
	private headerIndexCtr: number = 0;
	private rowIndexCtr: number = 0;
	private activeSort: Ref<number>;
	private refreshTable: Ref<boolean>;

	public serverSideModel: boolean = false;
	public serverModelProps: TuTableServerModel;

	public headerCount: Ref<number>;
	public pageLength: Ref<number>;
	public getTableData: ComputedRef<TuTableRow[]>;
	public getTableHeaders: ComputedRef<TuHeaderDefn[]>;
	public getSorters: ComputedRef<TuTableSorterDefn[]>;
	public getFilters: ComputedRef<TuFilterDefn[]>;
	public getSelectedRows: ComputedRef<TuTableRow[]>;

	private getField (obj:any, field:string) {
		let temp = Object.assign({}, obj);
		for (const key of field.split(".")) {
			if (temp[key])
				temp = temp[key];
		}
		return temp;
	}

	constructor (tableId: string, columnsInitial:number = 0) {
		this.id = tableId;
		this.table = reactive({
			headers: [],
			data: [],
			currentFilters: [],
			currentSort: [],
			pageSize: 25,
			currentPage: 1
		});

		this.headerCount = ref(columnsInitial);
		this.pageLength = ref(1);
		this.activeSort = ref(0);
		this.refreshTable = ref(false);
		this.getTableData = computed(() => {
			this.refreshTable.value = !this.refreshTable.value;
			let data: any[] = [];
			if (this.serverSideModel === false) {
				// apply search filter
				data = _.filter(this.table.data, (value: TuTableRow) => {
					return _.every(this.table.currentFilters, (filterValue) => {
						const fieldValue = this.getField(value.rowData, filterValue.field);
						if (filterValue.value === "")
							return true;
						else if (fieldValue !== undefined)
							return String(fieldValue).toLowerCase().includes(String(filterValue.value).toLowerCase());
						else
							return true;
					});
				});

				// apply sorters
				const fields = _.map(this.table.currentSort, (value) => {
					return `rowData.${value.field}`;
				});
				const sortDirs = _.map(this.table.currentSort, (value) => {
					return value.dir;
				});

				if (fields.length)
					data = _.orderBy(data, fields, sortDirs);

				this.pageLength.value = Math.ceil(data.length / this.table.pageSize);
				if (this.table.pageSize > 0)
					data = _.slice(data, this.table.pageSize * (this.table.currentPage - 1), (this.table.pageSize * (this.table.currentPage - 1)) + this.table.pageSize);
			}
			else {
				const inst = this;
				const request: XMLHttpRequest = new XMLHttpRequest();
				request.onreadystatechange = function () {
					if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
						if (request.responseType === "json")
							inst.setTableData(request.response.data);
						else if (request.responseType === "text") {
							const obj = JSON.parse(request.responseText);
							inst.setTableData(obj.data);
						}
						else {
							const obj = JSON.parse(request.responseText);
							inst.setTableData(obj.data);
						}
						inst.pageLength.value = Math.ceil(data.length / inst.table.pageSize);
						data = inst.table.data;
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

				request.open(this.serverModelProps.method, this.serverModelProps.ajaxUrl, true);
				request.setRequestHeader("Content-Type", "application/json");
				request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				request.send(JSON.stringify(props));
				data = this.table.data;
			}
			return data;
		});

		this.getTableHeaders = computed(() => {
			return this.table.headers;
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
	};

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

	public setTableData (data: any) {
		this.table.data.splice(0);
		_.forEach(data, (value: Object) => {
			const row: TuTableRow = shallowReactive({
				index: ++this.rowIndexCtr,
				selected: false,
				expanded: false,
				rowData: shallowReactive(value)
			});

			this.table.data.push(row);
		});
	};

	public constructHeaders (headers: any[]) {
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
					component: value.component,
					componentProps: value.componentProps,
					caption: value.caption,
					props: value.props,
					valueFormatter: value.valueFormatter
				};
				this.table.headers.push(header);
				this.headerCount.value++;
			}
		});
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
		else if (field >= 0)
			header = this.table.headers[field];
		else if (this.table.headers.length)
			header = this.table.headers[this.table.headers.length - 1];
		return header;
	}

	public getRowData (index: number) {
		return this.table.data[index].rowData;
	}

	public toggleSort (field:string) {
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
};
