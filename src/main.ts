import * as tuComponents from "./components/index";
import "./style/sass/vuesax.scss";
import tuTheme from "./utils/theme";
import DefineVuesaxMixin from "./defineGlobalMixin";
import { App } from "vue";
import RootApp from "./App.vue";
import { createApp } from "vue";

import "material-design-icons/iconfont/material-icons.css";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import Component1 from "../test/Component1.vue";

const install = function (Vue : App, options : any = {}) {
	// set default options

	// Use Components
	Object.values(tuComponents).forEach((tuComponent) => {
		Vue.component(tuComponent.name, tuComponent);
	});
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
		{
			path: "/test",
			component: Component1
		}
	],
	history: createWebHashHistory()
});
appVm.use(router);
appVm.use(pinia);
appVm.mount("#app");

export default install;