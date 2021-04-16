// Functions

import vsNotifications from './vsNotifications'
import vsLoading from './vsLoading'
import vsDialog from './vsDialog'
//theme
import vsTheme from '../utils/theme'


const vsFunctions = {
  vsNotifications,
  vsLoading,
  vsTheme,
  vsDialog
}

export default function functionWrapper(vm: any){
  
    Object.values(vsFunctions).forEach((vsFunctions) => {
      if(Object.prototype.hasOwnProperty.call(vsFunctions, 'subName')){
        vm.$vs[vsFunctions.name][vsFunctions['subName']] = vsFunctions.vsfunction
      } else {
        vm.$vs[vsFunctions.name] = vsFunctions.vsfunction
      }
      vm.$vs[vsFunctions.name].close = vsLoading.close
  });

  
}
