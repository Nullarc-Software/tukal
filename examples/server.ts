import express from "express";
import _ from "lodash";
const app = express();
type NodeData = {
	state: {
		partiallyChecked?: boolean,
		checked?: boolean;
		expanded?: boolean;
		hidden: boolean;
	}
	children: NodeData[];
	text: string;
	id: string;
}
type DftCallback = (node: NodeData, id?: any) => boolean;
type query = {
	keyWord?: any;
	id?: any; 
}

const treeDisplayData = [
	{
		text: "Root 1",
		id: "1",
		state: { hidden: false },
		children: [
			{
				text: "Child 1",
				id: "3",
				state: {hidden: false},
				children: [
					{
						text: "Grand1",
						id: "5",
						state: { hidden: false},
						children: [
							{
								text: "Grandgchild 1",
								id: "7",
								state: { hidden: false},
								children: []
							},
							{
								text: "Grandgchild 2",
								id: "8",
								state: { hidden: false},
								children: []
							}
						]
					},
					{
						text: "Grandchild 2",
						id: "6",
						state: { hidden: false},
						children: []
					},
					{
						text: "Tushar",
						id: "16",
						state: { hidden: false},
						children: []
					}
				]
			},
			{
				text: "Child 2",
				id: "4",
				state: { hidden: false},
				children: []
			}
		]
	},
	{
		text: "Root 2",
		id: "2",
		state: { hidden: false },
		children: []
	}
];

const removeChildren = (obj: any) => {
	if (obj.children?.length > 0) {
	  return Object.assign({}, obj, {
			children: true
	  });
	}
	else {
		return Object.assign({}, obj, {
			children: false
		  });
	}
};

class DFT {
	public iterate(nodes: NodeData[] , query?: query, funcSearch? : DftCallback) {
		const func = (node: NodeData, query: query) => {
			if (node.children && node.children.length > 0) {
				if (_.some(node.children, {
					state: {
						hidden: false
					}
				})) {
					node.state.hidden = false;
					node.state.expanded = true;
				}
				else {
					if (node.text.toLowerCase().includes(query.keyWord?.toLowerCase())) 
						node.state.hidden = false;
					
					else 
						node.state.hidden = true;
				}
			}
			else {
				if (node.text.toLowerCase().includes(query.keyWord?.toLowerCase())) 
					node.state.hidden = false;
				
				else 
					node.state.hidden = true;
			}
			return true;
			
		};
		for (let i = 0; i < nodes.length; i++) 
			this.dft(nodes[i] , funcSearch ?? func, query); 	
		
	}
	public hideFilteredChildren (nodes: NodeData[]) {
		const func = (node: NodeData, query?: query) => {
			if (node.children && node.children.length === 0) {
				if (node.state.hidden === false && Array.isArray(node.children))	{
					if (node.children.length > 0) {
						node = Object.assign(node, {
							children: true
						});
					}
					else {
						node = Object.assign(node, {
							children: false
						});
					}
				}
			}
			return true;
		};

		for (let i = 0; i < nodes.length; i++) 
			this.dft(nodes[i] , func, null); //root1			
		
	}
	private dft(node: NodeData, func: DftCallback, query?: query | null) {
		const res = node; 
		if (node.children && node.children.length > 0) {  
			
			for (let i  = node.children.length - 1; i >= 0; i--) {
				const result = this.dft(node.children[i], func, query); 
				if (result === false)
					break;
			}
			
		}
		return func?.call(this, res, query);
	}
}

app.get("/", (req, res) => {
	const expand = req.query.expand;
	const search = req.query.search;
	const query = {
		keyWord: search,
		id: expand
	};
	const dft = new DFT();
	if (expand === undefined && search === undefined) {
		const result = treeDisplayData.map((obj) => removeChildren(obj));
		res.send(result);
	}
	if (expand !== undefined) {
		dft.iterate(treeDisplayData, query, (node: NodeData, query: query) => {
			if (node.id === query.id) {
				for (let i = 0; i < node.children.length; i++ ) 
					node.children[i].state.hidden = false;
				
				node.state.hidden = false;
				let result: any = Object.assign([], node.children);
				result = _.flatten(result).map((obj) => removeChildren(obj));
				res.send(result);
				return false;
			}
			return true;
		});
	}
	else if (search !== undefined) {
		dft.iterate(treeDisplayData, query);
		const result: NodeData[] = Object.assign([],treeDisplayData );
		dft.hideFilteredChildren(result);
		res.send(result);
	}
});

app.listen(3000, () => {
	console.log("The application is listening on port 3000!");
});
