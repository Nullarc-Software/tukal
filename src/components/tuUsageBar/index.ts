import tuComponent from "./tuUsageBar.vue";
tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export { tuComponent as TuUsageBar };
export type { UsageBarItem } from "./types";
