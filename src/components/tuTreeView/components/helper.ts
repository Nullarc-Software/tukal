import { NodeData, TuTreeServerModel } from "./interface";
import { TukalGlobals } from "../../tukalGlobals";
import { XHRRequestWrapper } from "@/utils/apiWrapper";
import { isUndefined } from "lodash";

// Used to merge the tree options/styles with customOptions/customStyles
export const copyOptions = (src: any, dst: any) => {
	for (const key in src) {
		if (!dst[key])
			dst[key] = src[key];

		else if (typeof (src[key]) === "object")
			copyOptions(src[key], dst[key]);

		else
			dst[key] = src[key];
	}
};

const disabledState = { expanded: "expandable", checked: "checkable", hidden: "hidden" };

// Recursive function to change node's state
export const recCallNodes = (state: boolean, event: string, nodes: NodeData[]|undefined, pathIds: string[] = []) => {
	if (nodes === undefined) return;

	const targetId = pathIds.shift();
	if(nodes.length > 0) {
		nodes.forEach((node) => {
			if (targetId !== undefined && targetId !== node.id)
				return;

			const disabledStateKey = (disabledState as any)[event];
			if (targetId === node.id && pathIds.length === 0) {
				node.state[event] = state;
				return;
			}
			else if (disabledStateKey && node[disabledStateKey] !== false)
				node.state[event] = state;
			recCallNodes(state, event, node.children as NodeData[], pathIds);
		});
	}
};

export function serverRequest (serverSideConfig: TuTreeServerModel, query?: string) {
	return new Promise<NodeData[]>((resolve,reject) => {
		const xhrRequest = new XHRRequestWrapper();
		let nodes: NodeData[];
		if (isUndefined(serverSideConfig.method))
			serverSideConfig.method = "GET";
		xhrRequest.request.onreadystatechange = function () {
			if (
				xhrRequest.request.readyState === XMLHttpRequest.DONE &&
				xhrRequest.request.status === 200
			) {
				if (xhrRequest.request.responseType === "json") {
					nodes = xhrRequest.request.response.data;
					resolve(nodes);
				}
				else if (xhrRequest.request.responseType === "text") {
					nodes = JSON.parse(xhrRequest.request.responseText);
					resolve(nodes);
				}
				else {
					nodes = JSON.parse(xhrRequest.request.responseText);
					resolve(nodes);
				}
			}
		};
		xhrRequest.open(
			serverSideConfig.method,
			TukalGlobals.ApiRequestTarget + "http://localhost:3000/" + query
		);
		xhrRequest.request.setRequestHeader("Content-Type", "application/json");
		xhrRequest.request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhrRequest.request.send();
	});
}