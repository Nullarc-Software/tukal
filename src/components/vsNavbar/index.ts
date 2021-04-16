import vsComponent from './vsNavbar.vue'
import vsComponent2 from './vsNavItem.vue'
import vsComponent3 from './vsNavGroup.vue'
import vsComponent4 from './vsNavbarTitle.vue'
import vsComponent5 from './vsNavbarItems.vue'


vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent);
  vue.component(vsComponent2.name, vsComponent2)
  vue.component(vsComponent3.name, vsComponent3)
  vue.component(vsComponent4.name, vsComponent4)
  vue.component(vsComponent5.name, vsComponent5)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)  
}

export default vsComponent;