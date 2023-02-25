
import { TukalGlobals } from "../tukalGlobals";
import { XHRRequestWrapper } from "@/utils/apiWrapper";
import { isUndefined } from "lodash";

export interface historyEvent {
    title: string;
    description: string;
    date: string;
    icon?: string;
    color?: string;
    url?: string;
    data?: any;
  }
  
export interface TuHistoryServerModel {
      ajaxUrl: string;
      method?: string;
      ajaxLoadedFn?: Function;
      ajaxErrorFn?: Function;
  }

export function serverRequest (serverSideConfig: TuHistoryServerModel, query?: string) {
	return new Promise<historyEvent[]>((resolve,reject) => {
		const xhrRequest = new XHRRequestWrapper();
		let events: historyEvent[];
		if (isUndefined(serverSideConfig.method))
			serverSideConfig.method = "GET";
		xhrRequest.request.onreadystatechange = function () {
			if (
				xhrRequest.request.readyState === XMLHttpRequest.DONE &&
				xhrRequest.request.status === 200
			) {
				if (xhrRequest.request.responseType === "json") {
					events = xhrRequest.request.response.data;
					resolve(events);
				}
				else if (xhrRequest.request.responseType === "text") {
					events = JSON.parse(xhrRequest.request.responseText);
					resolve(events);
				}
				else {
					events = JSON.parse(xhrRequest.request.responseText);
					resolve(events);
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