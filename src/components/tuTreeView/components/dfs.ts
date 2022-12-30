import { NodeData } from "./interface";
import _ from "lodash";
export type DftCallback = (node: NodeData) => any; 

export class DFT {
	public search(nodes: NodeData[] , keyWord: string, funcSearch?: DftCallback) {
		const func = (node: NodeData) => {
			if (node.text.toLowerCase().includes(keyWord.toLowerCase()))  
				return node;
			else 
				return null;
		};
		const res = [];
		for (let i = 0; i < nodes.length; i++) {
			const intermediate = this.dft(nodes[i] , funcSearch ?? func);
			if(intermediate !== null  && intermediate !== undefined) 
				res.push(intermediate);
			else
				nodes[i].state.hidden = true;
		}
	}
	private dft(node: NodeData, func: DftCallback, isFindById?: boolean) {
		const res = node;
		if (node.children) {  
			if (node.children.length > 0) { 
				for (let i  = node.children.length - 1; i >= 0; i--) {
					const result = this.dft(node.children[i], func, isFindById);
					if (result === null) 
						res.children[i].state.hidden = true;
				}
			}
		}
		if (res.children && res.children.length > 0) {
			if (_.some(res.children, {
				state: {
					hidden: false
				}
			})) 
				return res;
			if(func(res) !== null) 
				return res;
			else
				return null;
		}
		else if (func(node) !== null) 
			return node; 
		else
			return null; 
	}
}