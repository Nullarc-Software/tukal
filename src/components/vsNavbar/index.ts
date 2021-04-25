import vsComponent from './vsNavbar.vue'
import vsComponent2 from './vsNavbarGroup.vue'
import vsComponent3 from './vsNavbarItem.vue'


vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent);
  vue.component(vsComponent2.name, vsComponent2)
  vue.component(vsComponent3.name, vsComponent3)  
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)  
}

export {vsComponent as vsNavbar, vsComponent2 as vsNavbarGroup, vsComponent3 as vsNavbarItem};