<template lang="html">
  <div class="">
    <div
      :class="{'no-items':value.length == 0}"
      class="con-chips">
      <slot>
      </slot>

      <input
        :placeholder="value.length > 0 ? null : placeholder"
        v-model="newChip"
        type="text"
        class="con-chips--input"
        @keypress.enter="addItem">
      <div
        class="x-global con-chips--remove-all"
        @click="removeTotalItems">
        <vs-icon
          :icon-pack="iconPack"
          :icon="removeIcon"
        ></vs-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import vsChip from './vsChip.vue'
export default defineComponent({
  name:'VsChips',
  components:{
    vsChip
  },
  props:{
    value:{},
    vsColor:{
      type:String,
      default:'primary',
    },
    placeholder:{
      type:String,
      default:'',
    },
    items:{
      type:Array,
    },
    iconPack:{
      type:String,
      default:'material-icons'
    },
    removeIcon:{
      type:String,
      default:'close',
    },
  },
  data: () => ({
    newChip:'',
    chip1:true,
  }),
  methods:{
    addItem(){
      let valueOld = this.value as any
      valueOld.push(this.newChip)
      this.$emit('input', valueOld)
      this.newChip = ''
    },
    removeTotalItems(){
      let valueOld = this.value as any
      valueOld.splice(0, (this.value as any).length);
      this.$emit('input', valueOld)
    }
  }
});
</script>
