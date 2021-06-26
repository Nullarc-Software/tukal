import vsComponent from './vsDropDown.vue'
import vsComponent3 from './vsDropDownItem.vue'
import vsComponent2 from './vsDropDownMenu.vue'


vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent);  
  vue.component(vsComponent3.name, vsComponent3); 
  vue.component(vsComponent2.name, vsComponent2); 
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)  
}

export  {vsComponent as vsDropDown, vsComponent3 as vsDropDownItem, vsComponent2 as vsDropDownMenu };