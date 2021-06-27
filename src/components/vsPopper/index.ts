import vsComponent from './vsPopper.vue'
import vsComponent1 from './vsPopupMenu.vue'
import vsComponent2 from './vsPopupItem.vue'

vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent)
  vue.component(vsComponent1.name, vsComponent1)
  vue.component(vsComponent2.name, vsComponent2)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)
}

export {vsComponent as vsPopper, vsComponent1 as vsPopupMenu, vsComponent2 as vsPopupItem};
