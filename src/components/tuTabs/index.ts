import tuComponent from "./tuTabs.vue";
import tuComponent2 from "./tuTab.vue";
import { VNode } from "vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

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

export { tuComponent as tuTabs, tuComponent2 as tuTab };
