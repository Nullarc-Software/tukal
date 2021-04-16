import vsComponent from './vsChip.vue'
import vsComponent2 from './vsChips.vue'

export default Vue => {
  Vue.component(vsComponent.name, vsComponent)
  Vue.component(vsComponent2.name, vsComponent2)
}
