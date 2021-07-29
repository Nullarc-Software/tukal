import tuComponent from './tuButton.vue'
import tuComponent1 from './tuButtonGroup.vue'

tuComponent.install = (vue: any) => {
  vue.component(tuComponent.name, tuComponent)
  vue.component(tuComponent1.name, tuComponent1)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  tuComponent.install((<any>window).Vue)
}

export {tuComponent as tuButton, tuComponent1 as tuButtonGroup};
