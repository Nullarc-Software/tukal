import tuComponent from "./tuTable.vue";
import tuComponent1 from "./tuTableExpand.vue";
import tuComponent2 from "./tuTh.vue";
import tuComponent3 from "./tuTr.vue";
import tuComponent4 from "./tuTd.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent1.name, tuComponent1);
	vue.component(tuComponent2.name, tuComponent2);
	vue.component(tuComponent3.name, tuComponent3);
	vue.component(tuComponent4.name, tuComponent4);
};



if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export { tuComponent as tuTable, tuComponent1 as tuTableExpand, tuComponent2 as tuTh, tuComponent3 as tuTr, tuComponent4 as tuTd };
