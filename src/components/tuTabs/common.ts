import { VNode } from "vue";

export interface TuTabsChildData {
	id?: number;
	label: string;
	name: string;
	to?: string;
	icon?: string;
	iconPack?: string;
	tag?: string;
	attrs?: Object;
	disabled?: boolean;
	vnode?: VNode | undefined;
	setActive?: Function;
	setInvert?: Function;
	setVertical?: Function;
}

export type TuTabsRouterParams = {
	tabs: TuTabsChildData[],
	baseRoute?: string,
	name?: string,
	preventAutoRedirect?: boolean
}

export class TabId {
	public tabId = 0;
	public resetId () {
		this.tabId = 0;
	}
}

