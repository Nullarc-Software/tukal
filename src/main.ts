import * as tuComponents from "./components/index";
import "./style/sass/vuesax.scss";
import tuTheme from "./utils/theme";
import DefineVuesaxMixin from "./defineGlobalMixin";
import { App } from "vue";
import RootApp from "./App.vue";
import { createApp } from "@vue/runtime-dom";

import "material-design-icons/iconfont/material-icons.css";

const install = function (Vue : App, options : any = {}) {
	// set default options

	// Use Components
	Object.values(tuComponents).forEach((tuComponent) => {
		Vue.component(tuComponent.name, tuComponent);
	});
	if (options) {
		if (Object.prototype.hasOwnProperty.call(options, "theme")) {
			if (Object.prototype.hasOwnProperty.call(options, "color")) {
				if (typeof window !== "undefined") {
					tuTheme.tufunction(options.theme.colors);
				}
			}
		}
	}
	// Define vuesax functions and properties ($vs)
	DefineVuesaxMixin(Vue, options);
};

const appVm = createApp(RootApp);
(<any>window).Vue = appVm;
if (typeof window !== "undefined" && (<any>window).Vue) {
	install((<any>window).Vue);
}

appVm.mount("#app");

export default install;

/* export { tuButton, tuButtonGroup } from './components/tuButton'
export { tuSelect, tuSelectOption, tuSelectOptionGroup  } from './components/tuSelect'
export { default as tuSwitch } from './components/tuSwitch'
export { default as tuCheckbox } from './components/tuCheckBox'
export { default as tuRadio } from './components/tuRadio'
export { default as tuInput } from './components/tuInput'
export { default as tuTabs } from './components/tuTabs'
export { default as tuSlider } from './components/tuSlider'
export { default as tuInputNumber } from './components/tuInputNumber'
export { default as tuTooltip } from './components/tuTooltip'
export { default as tuUpload } from './components/tuUpload'
export { default as tuPopup } from './components/tuPopup'
export { default as tuAlert } from './components/tuAlert'
export {tuChip, tuChips } from './components/tuChip'
export { default as tuProgress } from './components/tuProgress'
export { tuCard, tuCardGroup } from './components/tuCard'
export { default as tuList } from './components/tuList'
export { default as tuAvatar } from './components/tuAvatar'
export { default as tuPagination } from './components/tuPagination'
export { default as tuBreadcrumb } from './components/tuBreadcrumb'
export { default as tuDivider } from './components/tuDivider'
export { default as tuSpacer } from './components/tuSpacer'
export { default as tuIcon } from './components/tuIcon'
export { tuNavbar,tuNavbarGroup, tuNavbarItem } from './components/tuNavbar'
export { tuSidebar, tuSidebarGroup, tuSidebarItem } from './components/tuSideBar'
export { tuDropDown, tuDropDownItem } from './components/tuDropDown'
export { default as tuTable } from './components/tuTable'
export { default as tuDialog } from './components/tuDialog'
export { default as tuTextarea } from './components/tuTextarea'
export { tuCollapse, tuCollapseItem } from './components/tuCollapse'
export { default as tuImages } from './components/tuImages'
export { default as tuNotification } from './components/tuNotifications'
//New Component import

//layout
export { default as tuRow } from './layout/tuRow'
export { default as tuCol } from './layout/tuCol' */
