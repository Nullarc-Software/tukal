import tuComponent from './tuSelect.vue'
import tuComponent2 from './tuSelectOptionGroup.vue'
import tuComponent3 from './tuSelectOption.vue'

tuComponent.install = (vue: any) => {
  vue.component(tuComponent.name, tuComponent);
  vue.component(tuComponent2.name, tuComponent2)
  vue.component(tuComponent3.name, tuComponent3)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  tuComponent.install((<any>window).Vue)  
}


export class SelectOptionConstants {
	public static id = 0;
}

export { tuComponent as tuSelect, tuComponent2 as tuSelectOption, tuComponent3 as tuSelectOptionGroup};