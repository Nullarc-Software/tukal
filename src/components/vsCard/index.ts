import vsComponent from './vsCard.vue'
import vsComponent2 from './vsCardGroup.vue'

vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent)
  vue.component(vsComponent2.name, vsComponent2)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)
}

export {vsComponent as vsCard, vsComponent2 as vsCardGroup};
