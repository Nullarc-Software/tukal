import "./style/sass/vuesax.scss";
import tuTheme from "./utils/theme";
import DefineVuesaxMixin from "./defineGlobalMixin";
import { App } from "vue";
import RootApp from "./App.vue";
import { createApp } from "vue";

import "material-icons/iconfont/material-icons.css";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import VueClickAway from "vue3-click-away";
import TukalPlugin from "./plugins/tukalPlugin";

const install = function (Vue : App, options : any = {}) {
	// set default options

	// Removed global component registration - components now imported individually
	if (options) {
		if (Object.prototype.hasOwnProperty.call(options, "theme")) {
			if (Object.prototype.hasOwnProperty.call(options, "color")) {
				if (typeof window !== "undefined")
					tuTheme.tufunction(options.theme.colors);
			}
		}
	}
	// Define vuesax functions and properties ($vs)
	DefineVuesaxMixin(Vue, options);
};

const appVm = createApp(RootApp);
(<any>window).Vue = appVm;
if (typeof window !== "undefined" && (<any>window).Vue)
	install((<any>window).Vue);

const pinia = createPinia();
const router = createRouter({
	routes: [
		
	],
	history: createWebHashHistory()
});

appVm.use(VueClickAway);
appVm.use(router);
appVm.use(pinia);
appVm.use(TukalPlugin, { router });
appVm.mount("#app");

export default install;