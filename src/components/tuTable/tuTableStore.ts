
import _ from "lodash";
import { computed, ComputedRef, markRaw, reactive, ref, Ref, shallowReactive, toRaw } from "vue";

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
	value: string
}

export interface TuHeaderDefn {
	index: number,
	minWidth?: number | string,
	maxWidth?: number | string,
	width?: number | string,
	field: string
}

export interface TuTableDefn {
	headers: Array<TuHeaderDefn>,
	data: Array<TuTableRow>,
	currentFilters: {
		[field:string] : string
	},
	currentSort: {
		[field:string] : "asc" | "desc"
	},
	pageSize?: number,
	currentPage?: number
}

export interface TuTableSorterDefn {
	[field:string]: string
}

export class TableFunctions {

}

export interface TuTableServerModel {
	ajaxUrl: string,
	ajaxLoadedFn?: Function,
	ajaxErrorFn?: Function
}

export class TuTable {
	private id: string;
	private table: TuTableDefn;
	private headerIndexCtr: number = 0;
	private rowIndexCtr: number = 0;
	private activeSort: string;

	public serverSideModel: boolean = false;
	public serverModelProps: TuTableServerModel;

	public headerCount: Ref<number>;
	public pageLength: Ref<number>;
	public getTableData: ComputedRef<TuTableRow[]>;
	public getTableHeaders: ComputedRef<TuHeaderDefn[]>;
	public getSorters: ComputedRef<TuTableSorterDefn>;
	public getSelectedRows: ComputedRef<TuTableRow[]>;

	constructor (tableId: string, columnsInitial:number = 0) {
		this.id = tableId;
		this.table = reactive({
			headers: [],
			rowIndexCtr: 0,
			data: [],
			currentFilters: {},
			currentSort: {},
			pageSize: 25,
			currentPage: 0
		});

		this.headerCount = ref(columnsInitial);
		this.pageLength = ref(1);

		this.getTableData = computed(() => {
			let data: any[] = [];
			if (this.serverSideModel === false) {
				// apply search filter
				data = _.filter(this.table.data, (value: TuTableRow) => {
					return _.every(this.table.currentFilters, (filterValue, key) => {
						if (filterValue === "")
							return true;
						else if (value.rowData[key] !== undefined)
							return String(value.rowData[key]).toLowerCase().includes(filterValue.toLowerCase());
						else
							return true;
					});
				});

				// apply sorters
				const order = this.table.currentSort[this.activeSort] ?? false;
				if (order)
					data = _.orderBy(data, `rowData.${this.activeSort}`, [order]);

				this.pageLength.value = Math.ceil(data.length / this.table.pageSize);
				if (this.table.pageSize > 0)
					data = _.slice(data, this.table.pageSize * this.table.currentPage, (this.table.pageSize * this.table.currentPage) + this.table.pageSize);
			}
			else {
				const request: XMLHttpRequest = new XMLHttpRequest();
				const inst = this;
				request.onreadystatechange = function () {
					if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
						if (request.responseType === "json")
							inst.setTableData(request.response.data);
						else if (request.responseType === "text") {
							const obj = JSON.parse(request.responseText);
							inst.setTableData(obj.data);
						}
					}
				};
				const props: any = {
					filters: this.table.currentFilters,
					sorters: this.table.currentSort,
					paging: {
						size: this.table.pageSize,
						page: this.table.currentPage
					}
				};
				request.open("GET", this.serverModelProps.ajaxUrl, true);
				request.setRequestHeader("Content-Type", "application/json");
				request.send(props);
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
		this.table.currentPage = page - 1;
	}

	public setTableData (data: any) {
		this.table.data = [];
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
		_.forEach(headers, (value) => {
			if (value.props && value.props.field) {
				const header: TuHeaderDefn = {
					index: ++this.headerIndexCtr,
					field: value.props.field,
					maxWidth: value.props.maxWidth,
					minWidth: value.props.minWidth,
					width: value.props.width
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

	public setFilter (field: string, value: string) {
		this.table.currentFilters[field] = value;
	}

	public deleteFilter (field: string) {
		delete this.table.currentFilters[field];
	}

	public clearFilters () {
		this.table.currentFilters = {};
	}

	public getHeaderObject (field: string) {
		let header: TuHeaderDefn = null;
		_.forEach(this.table.headers, (value) => {
			if (value.field === field) {
				header = value;
				return false;
			}
		});
		return header;
	}

	public toggleSort (field:string) {
		this.table.currentSort = _.pickBy(this.table.currentSort, (x, y) => y === field);
		if (Object.prototype.hasOwnProperty.call(this.table.currentSort, field) === false) {
			this.table.currentSort[field] = "asc";
			this.activeSort = field;
			return "asc";
		}
		else if (this.table.currentSort[field] === "asc") {
			this.table.currentSort[field] = "desc";
			this.activeSort = field;
			return "desc";
		}
		else {
			delete this.table.currentSort[field];
			this.activeSort = field;
			return "none";
		}
	}
};
