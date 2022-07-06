import tuComponent from "./tuPopper.vue";
import tuComponent2 from "./tuPopupItem.vue";
import tuComponent1 from "./tuPopupMenu.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent1.name, tuComponent1);
	vue.component(tuComponent2.name, tuComponent2);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export { tuComponent as tuPopper, tuComponent1 as tuPopupMenu, tuComponent2 as tuPopupItem };
