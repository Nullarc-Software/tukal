import { TukalGlobals } from "@/lib";

export type ApiHeaders = {
	[name:string]: string
}

export class XHRRequestWrapper {

	public request: XMLHttpRequest;
	public constructor () {
		this.request = new XMLHttpRequest();				
	}

	public open (method, ajaxUrl) {

		this.request.open(method, ajaxUrl, true);
		for (const key in TukalGlobals.ApiHeaders) 
			this.request.setRequestHeader(key, TukalGlobals.ApiHeaders[key]);
		
	}
}