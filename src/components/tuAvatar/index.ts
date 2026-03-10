import tuComponent from './tuAvatar.vue'

tuComponent.install = (vue: any) => {
  vue.component(tuComponent.name, tuComponent)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  tuComponent.install((<any>window).Vue)
}

export default tuComponent as typeof tuComponent & { name: "TuAvatar" };
export { tuComponent as TuAvatar };
