import vsComponent from './vsSidebar.vue'
import vsComponent2 from './vsSidebarItem.vue'
import vsComponent3 from './vsSidebarGroup.vue'


vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent);
  vue.component(vsComponent2.name, vsComponent2)
  vue.component(vsComponent3.name, vsComponent3)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)  
}

export { vsComponent as vsSidebar, vsComponent2 as vsSidebarItem, vsComponent3 as vsSidebarGroup};
