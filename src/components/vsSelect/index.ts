import vsComponent from './vsSelect.vue'
import vsComponent2 from './vsSelectItem.vue'
import vsComponent3 from './vsSelectGroup.vue'

vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent);
  vue.component(vsComponent2.name, vsComponent2)
  vue.component(vsComponent3.name, vsComponent3)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)  
}

export default vsComponent;