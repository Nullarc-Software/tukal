import tuComponent from "./components/tuTree.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

export * from "./components/interface";
export { tuComponent as tuTreeView };
