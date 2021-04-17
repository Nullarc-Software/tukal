import vsComponent from './vsCollapse.vue'
import vsComponent2 from './vsCollapseItem.vue'


vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent);
  vue.component(vsComponent2.name, vsComponent2);  
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)  
}

export {vsComponent as vsCollapse, vsComponent2 as vsCollapseItem};