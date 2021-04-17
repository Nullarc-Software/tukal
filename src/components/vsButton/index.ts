import vsComponent from './vsButton.vue'
import vsComponent1 from './vsButtonGroup.vue'

vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent)
  vue.component(vsComponent1.name, vsComponent1)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)
}

export {vsComponent as vsButton, vsComponent1 as vsButtonGroup};
