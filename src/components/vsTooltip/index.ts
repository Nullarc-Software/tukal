import vsComponent from './vsTooltip.vue'

vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)
}

export default vsComponent;
