import * as tuComponents from './components/index'
import './style/sass/vuesax.scss'
import tuTheme from './utils/theme'
import DefineVuesaxMixin from './defineGlobalMixin'

import { App } from '@vue/runtime-core'

import "material-design-icons/iconfont/material-icons.css"

const install = function(Vue : App, options : any = {}) {
  // set default options

  // Use Components
  Object.values(tuComponents).forEach((tuComponent) => {
    Vue.component(tuComponent.name, tuComponent);
  })
  if(options){
    if(options.hasOwnProperty('theme')){
      if(options.theme.hasOwnProperty('colors')){
        if (typeof window !== 'undefined') {
          tuTheme.tufunction(options.theme.colors)
        }
      }
    }
  }
  // Define vuesax functions and properties ($vs)
  DefineVuesaxMixin(Vue, options);
}
export default install;

export { tuButton, tuButtonGroup } from './components/tuButton'
export { tuSelect, tuSelectOption, tuSelectOptionGroup } from './components/tuSelect'
export { default as tuSwitch } from './components/tuSwitch'
export { default as tuCheckbox } from './components/tuCheckBox'
export { default as tuRadio } from './components/tuRadio'
export { default as tuInput } from './components/tuInput'
export { tuTab, tuTabs } from './components/tuTabs'
export { default as tuAlert } from './components/tuAlert'
export { tuChip, tuChips } from './components/tuChip'
export { tuCard, tuCardGroup } from './components/tuCard'
export { default as tuAvatar } from './components/tuAvatar'
export { default as tuPagination } from './components/tuPagination'
export { default as tuBreadcrumb } from './components/tuBreadcrumb'
export { loading, LoadingAttributes } from './components/tuLoading'

export { default as tuDivider } from './components/tuDivider'
export { default as tuIcon } from './components/tuIcon'
export { tuNavbar,tuNavbarGroup, tuNavbarItem } from './components/tuNavbar'
export { notification, NotificationAttributes} from './components/tuNotifications'
export { tuSidebar, tuSidebarGroup, tuSidebarItem } from './components/tuSideBar'
export { tuPopper, tuPopupMenu, tuPopupItem } from './components/tuPopper'
export { default as tuDialog } from './components/tuDialog'
export { tuCollapse, tuCollapseItem} from './components/tuCollapse'
//New Component import

//layout
export { default as tuRow } from './layout/tuRow'
export { default as tuCol } from './layout/tuCol'




