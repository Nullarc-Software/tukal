import tuComponent from "./tuTreeView.vue";
import tuComponent2 from "./tuTreeItem.vue";
export * from "./types";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export { tuComponent as tuTreeView, tuComponent2 as tuTreeItem };
