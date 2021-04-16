// Functions

import vsNotifications from './vsNotifications'
import vsLoading from './vsLoading'
import vsDialog from './vsDialog'
//theme
import vsTheme from '../utils/theme'
import { ComponentInternalInstance, getCurrentInstance } from '@vue/runtime-core'


const vsFunctions = {
	vsNotifications,
	vsLoading,
	vsTheme,
	vsDialog
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
