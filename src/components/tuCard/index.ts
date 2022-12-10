import tuComponent from "./tuCard.vue";
import tuComponent2 from "./tuCardGroup.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);
};

if (typeof window !== "undefined" && (<any>window).Vue) 
	tuComponent.install((<any>window).Vue);


export {tuComponent as tuCard, tuComponent2 as tuCardGroup};
