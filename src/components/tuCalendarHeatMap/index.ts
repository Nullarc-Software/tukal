import tuComponent from "./tuCalendarHeatMap.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export { tuComponent as tuCalendarHeatMap };