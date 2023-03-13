import tuComponent from "./tuHistory.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
};

if (typeof window !== "undefined" && (<any>window).Vue) 
	tuComponent.install((<any>window).Vue);

export type { TuHistoryEvent, TuHistoryServerModel } from "./utils";
export { tuComponent as tuHistory };