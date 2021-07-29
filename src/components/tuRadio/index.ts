import tuComponent from './tuRadio.vue'

tuComponent.install = (vue: any) => {
  vue.component(tuComponent.name, tuComponent)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  tuComponent.install((<any>window).Vue)
}

export default tuComponent;
