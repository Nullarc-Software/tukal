import { injectDirectionClass } from "./utils/rtl";
import Vue, { App, reactive } from "vue"
/**
 * Vuesax global mixin, all vueasx functions and properties injected
 * in the @beforeCreate hook.
 */

export default (Vue : App, options: any) => {
  Vue.mixin({
    watch: {
      '$vs.rtl': {
        handler(val) {
          injectDirectionClass(val)
        }
      }
    },
    created() {
      // create $vs property if not exist      
      if(!this.$vs) {
        // define $vs reactive properties        
        this.$vs = reactive(options);
           
      }

      
    },
    mounted() {
      // inject the direction class for the initial options
      injectDirectionClass(this.$vs.rtl)
    }
  })
};
