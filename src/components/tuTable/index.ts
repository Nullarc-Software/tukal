import tuComponent from "./tuTable.vue";
import tuComponent2 from "./tuTh.vue";
import tuComponent3 from "./tuTr.vue";
import tuComponent4 from "./tuTd.vue";
import tuComponent5 from "./tuTableContextMenu.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);
	vue.component(tuComponent3.name, tuComponent3);
	vue.component(tuComponent4.name, tuComponent4);
	vue.component(tuComponent5.name, tuComponent5);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export * from "./tuTableStore";
export { ExportData } from "./export";
export type {VirtualElement } from "@popperjs/core";
export { tuComponent as tuTable, tuComponent2 as tuTh, tuComponent3 as tuTr, tuComponent4 as tuTd, tuComponent5 as tuTableContextMenu };
