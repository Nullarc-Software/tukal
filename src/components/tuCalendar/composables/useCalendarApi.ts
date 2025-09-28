import { ref, readonly } from "vue";
import { ICalendarItem, TuCalendarServerModel } from "../ICalendarItem";
import { TukalGlobals } from "../../tukalGlobals";
import { XHRRequestWrapper } from "../../../utils/apiWrapper";

export function useCalendarApi() {
	const loading = ref(false);
	const error = ref<string | null>(null);

	const fetchEvents = async (serverConfig: TuCalendarServerModel): Promise<ICalendarItem[]> => {
		loading.value = true;
		error.value = null;

		try {
			return await new Promise((resolve, reject) => {
				const xhrRequest = new XHRRequestWrapper();
				const method = serverConfig.method || "GET";

				xhrRequest.request.onreadystatechange = function () {
					if (xhrRequest.request.readyState === XMLHttpRequest.DONE) {
						if (xhrRequest.request.status === 200) {
							try {
								let responseData: ICalendarItem[];
								
								if (xhrRequest.request.responseType === "json") 
									responseData = xhrRequest.request.response.data;
								 else 
									responseData = JSON.parse(xhrRequest.request.responseText);
								
								
								loading.value = false;
								resolve(responseData);
							}
							catch (parseError) {
								loading.value = false;
								error.value = "Failed to parse server response";
								reject(new Error("Failed to parse server response"));
							}
						}
						else {
							loading.value = false;
							error.value = `Server error: ${xhrRequest.request.status}`;
							reject(new Error(`Server error: ${xhrRequest.request.status}`));
						}
					}
				};

				xhrRequest.request.onerror = function () {
					loading.value = false;
					error.value = "Network error occurred";
					reject(new Error("Network error occurred"));
				};

				try {
					xhrRequest.open(method, TukalGlobals.ApiRequestTarget + serverConfig.ajaxUrl);
					xhrRequest.request.setRequestHeader("Content-Type", "application/json");
					xhrRequest.request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					xhrRequest.request.send();
				}
				catch (requestError) {
					loading.value = false;
					error.value = "Failed to send request";
					reject(new Error("Failed to send request"));
				}
			});
		}
		catch (err) {
			loading.value = false;
			error.value = err instanceof Error ? err.message : "Unknown error occurred";
			throw err;
		}
	};

	return {
		loading: readonly(loading),
		error: readonly(error),
		fetchEvents
	};
}
