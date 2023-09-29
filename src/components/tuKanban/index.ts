import tuComponent from "./tuKanban.vue";
import { TuKanbanField, TuKanbanItem } from "./utils";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export { tuComponent as tuKanban };
export type {TuKanbanItem, TuKanbanField};
