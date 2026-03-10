import tuComponent from "./tuSidebar.vue";
import tuComponent2 from "./tuSidebarItem.vue";
import tuComponent3 from "./tuSidebarGroup.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
	vue.component(tuComponent2.name, tuComponent2);
	vue.component(tuComponent3.name, tuComponent3);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export { tuComponent as TuSidebar, tuComponent2 as TuSidebarItem, tuComponent3 as TuSidebarGroup };
