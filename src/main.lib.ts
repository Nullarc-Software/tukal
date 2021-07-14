import * as vsComponents from './components/index'
import './style/sass/vuesax.scss'
import vsTheme from './utils/theme'
import DefineVuesaxMixin from './defineGlobalMixin'
import vuesaxOptions from './utils/options'
import { App } from '@vue/runtime-core'

import "material-design-icons/iconfont/material-icons.css"

const install = function(Vue : App, options : any = {}) {
  // set default options
  Object.keys(vuesaxOptions).forEach((prop) => {

    if(!options[prop]) {
      options[prop.toString()] = (vuesaxOptions as any)[prop.toString()]
    }
  });

  // Use Components
  Object.values(vsComponents).forEach((vsComponent) => {
    Vue.component(vsComponent.name, vsComponent);
  })
  if(options){
    if(options.hasOwnProperty('theme')){
      if(options.theme.hasOwnProperty('colors')){
        if (typeof window !== 'undefined') {
          vsTheme.vsfunction(options.theme.colors)
        }
      }
    }
  }
  // Define vuesax functions and properties ($vs)
  DefineVuesaxMixin(Vue, options);
}

export default install;




