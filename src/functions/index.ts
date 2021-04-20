// Functions

import vsLoading from './vsLoading'
//theme
import vsTheme from '../utils/theme'
import { ComponentInternalInstance, getCurrentInstance } from '@vue/runtime-core'


const vsFunctions = {	
	vsLoading,
	vsTheme,
	
}

export function useVs(): any {	
	return (<any>window).$vs;
}

export default function functionWrapper(vm: any) {

	Object.values(vsFunctions).forEach((vsFunctions) => {
		if (Object.prototype.hasOwnProperty.call(vsFunctions, 'subName')) {
			vm.$vs[vsFunctions.name][vsFunctions['subName']] = vsFunctions.vsfunction
		} else {
			vm.$vs[vsFunctions.name] = vsFunctions.vsfunction
		}
		vm.$vs[vsFunctions.name].close = vsLoading.close
	});


}
