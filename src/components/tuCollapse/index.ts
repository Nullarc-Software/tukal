import tuComponent from "./tuCollapse.vue";
import tuComponent2 from "./tuCollapseItem.vue";


tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);  
};

if (typeof window !== "undefined" && (<any>window).Vue) 
	tuComponent.install((<any>window).Vue);  


export {tuComponent as TuCollapse, tuComponent2 as TuCollapseItem};