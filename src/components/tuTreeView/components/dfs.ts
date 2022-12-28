import { NodeData } from "./interface";
export type DftCallback = (node: NodeData) => any; 
export class DFT {
	public search(nodes :NodeData[] ,keyWord: string) {
		const func = (node: NodeData) => {
			if (node.text.includes(keyWord))  
				return node;
			else 
				return null;
		};
		const res = [];
		for (let i = 0; i < nodes.length; i++) {
			const intermediate = this.dft(nodes[i] ,func);
			if(intermediate !== null  && intermediate !== undefined) 
				res.push(intermediate);
		}
	}
	private dft(node: NodeData, func: DftCallback, isFindById?: boolean) {
		let res = node;
		if (node.children) {  
			if (node.children.length > 0) { 
				for (let i  = node.children.length - 1; i >= 0; i--) {
					const result = this.dft(node.children[i], func, isFindById);
					if (result === null) 
						res.children.splice(i ,1); 
					if (isFindById === true && result !== null) {
						res = result;
						return res;
					}
				}
			}
		}
		if (res.children && res.children.length > 0) {  
			if(func(res) !== null) 
				return res;
			else
				return res.children;
		}
		else if (func(node) !== null) 
			return node; 
		else
			return null; 
	}

	public findById (nodes: NodeData[], id: string) {
		const func = (node: NodeData) => {
			if (node.id === id) 
				return node;
			else 
				return null;
		};
		let res: NodeData;
		for (let i = 0; i < nodes.length; i++) {
			const intermediate = this.dft(nodes[i] ,func, true);
			if(intermediate !== null  && intermediate !== undefined) {
				res = intermediate;
				break;
			}
		}
	}
}