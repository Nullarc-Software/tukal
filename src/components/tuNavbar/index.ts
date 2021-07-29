import tuComponent from './tuNavbar.vue'
import tuComponent2 from './tuNavbarGroup.vue'
import tuComponent3 from './tuNavbarItem.vue'


tuComponent.install = (vue: any) => {
  vue.component(tuComponent.name, tuComponent);
  vue.component(tuComponent2.name, tuComponent2)
  vue.component(tuComponent3.name, tuComponent3)  
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  tuComponent.install((<any>window).Vue)  
}

export {tuComponent as tuNavbar, tuComponent2 as tuNavbarGroup, tuComponent3 as tuNavbarItem};