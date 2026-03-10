export interface NodeData {
	state?: {
		partiallyChecked?: boolean;
		checked?: boolean;
		expanded?: boolean;
		hidden?: boolean;
	};
	children?: NodeData[] | boolean;
	text: string;
	id: string;
	icon?: string;

	route?: string | object;
	iconPack?: string;
}

export interface NodesProperties {
	[key: string]: unknown;
}

export interface TreeCustomStyles {
	tree: {
		style: {
			[key: string]: string;
		};
	};
}

export interface TreeRowCustomStyles {
	row: {
		style: {
			[key: string]: string;
		};
		child: {
			class: string;
			style: {
				[key: string]: string;
			};
			active: {
				class: string;
				style: {
					[key: string]: string;
				};
			};
		};
	};
	iconParent: {
		class: string;
	};
	rowIndent: {
		[key: string]: string;
	};
	expanded: {
		class: string;
	};
	addNode: {
		class: string;
		style: {
			[key: string]: string;
		};
	};
	editNode: {
		class: string;
		style: {
			[key: string]: string;
		};
	};
	deleteNode: {
		class: string;
		style: {
			[key: string]: string;
		};
	};
	selectIcon: {
		class: string;
		style: {
			[key: string]: string;
		};
		active: {
			class: string;
			style: {
				[key: string]: string;
			};
		};
	};
	text: {
		style: {
			[key: string]: string;
		};
		class?: string;
		active: {
			style: {
				[key: string]: string;
			};
		};
	};
}

export interface TuTreeServerModel {
	url: string;
	method?: string;
}

// Additional interfaces for better type safety
export interface TreeProps {
	checkNode?: boolean;
	filterNode?: boolean;
	removeNode?: boolean;
	addNode?: boolean;
	editNode?: boolean;
	customStyles?: TreeRowCustomStyles;
	id?: string;
	nodes?: NodeData[];
	model?: "local" | "server";
	serverSideConfig?: TuTreeServerModel;
	expandAll?: boolean;
	collapseAll?: boolean;
	modelValue?: NodeData[];
	checkedNodes?: NodesProperties[];
}

export interface TreeRowProps {
	root?: unknown;
	isCheckNode?: boolean;
	icon?: string;
	isRemoveNode?: boolean;
	isAddNode?: boolean;
	isEditNode?: boolean;
	customStyles?: TreeRowCustomStyles;
	search?: boolean;
	node?: NodeData;
	model?: "local" | "server";
	serverSideConfig?: TuTreeServerModel;
	keyWord?: string;
	parentNode?: NodeData;
	depth?: number;
}

export type TreeEmits = {
	"update:checkedNodes": [value: NodesProperties[]];
	"update:modelValue": [value: NodeData[]];
	"node-added": [node: NodeData];
	"node-deleted": [node: NodeData];
	"node-checked": [checkedNodes: NodesProperties[]];
	"node-edited": [nodes: NodeData[]];
};

export type TreeRowEmits = {
	"node-added": [node: NodeData];
	"node-expanded": [node: NodeData, state: boolean];
	"node-selected": [node: NodeData];
	"node-deleted": [node: NodeData, isSingleNode?: boolean];
	"parent-node": [node: NodeData];
	"node-checked": [node: NodeData, state: boolean];
	"node-edited": [node: NodeData];
};
