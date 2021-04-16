import vsComponent from './vsDropDown.vue'
import vsComponent2 from './vsDropDownMenu.vue'
import vsComponent3 from './vsDropDownItem.vue'
import vsComponent4 from './vsDropDownGroup.vue'


vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent);
  vue.component(vsComponent2.name, vsComponent2)
  vue.component(vsComponent3.name, vsComponent3)
  vue.component(vsComponent4.name, vsComponent4)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)  
}

export default vsComponent;