<template>
    <renderless-select v-bind="$attrs" @update:model-value="$emit('update:model-value', $event)"
        #default="{ selectedStr, itemRows, clear, select, isSelected, multiple }">
        <div class="vcron-select-container">
            <tu-popper arrow>
                <tu-button>
                    {{ selectedStr }}
                    <tu-icon @click="clear()" v-if="!selectedStr.includes('every')" style="font-size: 14px; margin-left: 5px;">close</tu-icon>
                </tu-button>
                <template #content>
                    <tu-popup-menu v-for="(row, i) in itemRows" :key="i">
                        <tu-popup-item class="vcron-select-col" v-for="(item, j) in row" :key="i + '-' + j" 
                        :style="isSelected(item) ? 'background-color: var(--tu-gray-4) !important;' : ''" @click="select(item)"
                        @click.stop="multiple ? () => { } : toggleMenu()" :loading="true" loadingType="scale"> <span v-if="item">{{ item.text }}</span> </tu-popup-item>
                    </tu-popup-menu>
                </template>
            </tu-popper>
        </div>
    </renderless-select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RenderlessSelect } from '@vue-js-cron/core'
export default defineComponent({
    inheritAttrs: false,
    components: {
        RenderlessSelect
    },
    name: 'CustomSelect',
    props: {},
    emits: ['update:model-value'],
});
</script>

<style>
.vcron-select-container {
    display: inline-block;
    position: relative;
    margin: 0 0.2em;
}
.tu-dropdown--menu {
    display: flex !important;
}
.tu-dropdown--item-link {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    overflow-y: auto !important;
}
</style>