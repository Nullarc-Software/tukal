import { NodeData } from "./interface";
import _ from "lodash";
type DftCallback = (node: NodeData, id?: any) => boolean;

export class DFT {
	public iterate(nodes: NodeData[] , query: string, funcSearch? : DftCallback) {
		const func = (node: NodeData, query: string) => {
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
					if (node.text.toLowerCase().includes(query?.toLowerCase())) 
						node.state.hidden = false;
					
					else 
						node.state.hidden = true;
				}
			}
			else {
				if (node.text.toLowerCase().includes(query?.toLowerCase())) 
					node.state.hidden = false;
				
				else 
					node.state.hidden = true;
			}
			return true;
			
		};
		for (let i = 0; i < nodes.length; i++) 
			this.dft(nodes[i] , funcSearch ?? func, query); 	
		
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