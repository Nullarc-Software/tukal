import tuComponent from "./tuTabs.vue";
import tuComponent2 from "./tuTab.vue";


tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);


export * from "./common";
export { tuComponent as TuTabs, tuComponent2 as TuTab };
