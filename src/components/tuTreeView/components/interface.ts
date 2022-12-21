export type NodeData = {
	state: {
		partiallyChecked: boolean,
		checked: boolean;
		expanded: boolean;
		selected: boolean;
		hidden?: boolean;
		[key: string]: any;
	}
	nodes?: NodeData[];
	id: string;
	depth: number;
	[key: string]: any;
}

export interface serverNodeData {
	id: string;
	text: string;
	children: boolean;
	icon?: string;
	iconPack?: string;
}

export interface NodesProperties {
	[key: string]: any;
}

export interface TreeCustomStyles {
	tree: {
		style: {
			[key: string]: string;
		}
	}
}

export interface TreeRowCustomStyles {
	row: {
		style: {
			[key: string]: string;
		}
		child: {
			class: string;
			style: {
				[key: string]: string;
			}
			active: {
				class: string;
				style: {
					[key: string]: string;
				}
			}
		}
	},
	iconParent: {
		class: string
	},
	rowIndent: {
		[key: string]: string;
	}
	expanded: {
		class: string;
	}
	addNode: {
		class: string;
		style: {
			[key: string]: string;
		}
	}
	editNode: {
		class: string;
		style: {
			[key: string]: string;
		}
	}
	deleteNode: {
		class: string;
		style: {
			[key: string]: string;
		}
	}
	selectIcon: {
		class: string;
		style: {
			[key: string]: string;
		},
		active: {
			class: string;
			style: {
				[key: string]: string;
			}
		}
	}
	text: {
		style: {
			[key: string]: string;
		},
		class: string;
		active: {
			style: {
				[key: string]: string;
			}
		}
	}
}

export interface TuTreeServerModel {
	url: string;
	method?: string;
}