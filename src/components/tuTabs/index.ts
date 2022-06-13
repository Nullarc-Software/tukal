import tuComponent from "./tuTabs.vue";
import tuComponent2 from "./tuTab.vue";
import { VNode } from "vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export interface ChildData {
	label: string;
	icon: string;
	iconPack: string;
	tag: string;
	id: number;
	name?: string;
	attrs: Object;
	disabled: boolean;
	vnode: VNode | undefined;
	setActive: Function;
	setInvert: Function;
	setVertical: Function;
}

export class TabId {
	public tabId = 0;
	public resetId () {
		this.tabId = 0;
	}
}

export { tuComponent as tuTabs, tuComponent2 as tuTab };
