import _ from "lodash";
import { defineStore } from "pinia";
import { computed, ComputedRef, reactive, ref, Ref } from "vue";

export class TableIdentifierAuto {
	public static id = 0;
}

export interface TuTableRow {
	index: number,
	rowData: {
		[name:string] : any
	}
}

export interface TuFilterDefn {
	field: string,
	value: string
}

export interface TuHeaderDefn {
	index: number,
	minWidth?: number,
	maxWidth?: number,
	width?: number,
	field: string
}

export interface TuTableDefn {
	headers: Array<TuHeaderDefn>,
	data: Array<TuTableRow>,
	currentFilters: {
		[field:string] : string
	},
	pageSize?: number,
	currentPage?: number
}

export class TableFunctions {

}

export class TuTable {
	private id: string;
	private table: TuTableDefn;
	private headerIndexCtr: number = 0;
	private rowIndexCtr: number = 0;

	public getTableData: ComputedRef<TuTableRow[]>;
	public getTableHeaders: ComputedRef<TuHeaderDefn[]>;

	constructor (tableId: string) {
		this.id = tableId;
		this.table = reactive({
			headers: [],
			rowIndexCtr: 0,
			data: [],
			currentFilters: {},
			pageSize: 25,
			currentPage: 0
		});

		this.getTableData = computed(() => {
			let data = _.filter(this.table.data, (value: TuTableRow) => {
				return _.every(this.table.currentFilters, (filterValue, key) => {
					if (filterValue === "")
						return true;
					else if (value.rowData[key] !== undefined)
						return String(value.rowData[key]).toLowerCase().includes(filterValue.toLowerCase());
					else
						return true;
				});
			});

			if (this.table.pageSize > 0)
				data = _.slice(data, this.table.pageSize * this.table.currentPage, (this.table.pageSize * this.table.currentPage) + this.table.pageSize);

			return data;
		});

		this.getTableHeaders = computed(() => {
			return this.table.headers;
		});
	};

	public setPaging (pageSize: number, page: number) {
		this.table.pageSize = pageSize;
		this.table.currentPage = page - 1;
	}

	public setTableData (data: any) {
		_.forEach(data, (value: Object) => {
			const row: TuTableRow = Object.create({});
			row.index = ++this.rowIndexCtr;
			row.rowData = value;
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
};
