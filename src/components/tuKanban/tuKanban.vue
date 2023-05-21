<template>
    <div class="tu-kanban">
        <div class="d-flex justify-content-start">
            <tu-input placeholder="Search" v-model="search" />
        </div>
        <table class="tu-kanban-table__element">
            <thead class="tu-kanban-table__thead">
                <th v-for="field in fields" class="text-center tu-kanban-table__th">{{ field.fieldname }}
                    <span class="multiselect-badge"
                        v-if="selectedItems.length > 0 && selectedItems[0].fieldname === field.fieldname">{{
                            selectedItems.length }}</span>
                </th>
            </thead>
            <tbody :id="`tu-kanban-${id}`" style="position: relative;">
                <tr v-for="ind in rows">
                    <td :draggable="true" @dragstart="startDrag($event, value[ind - 1])" @dragover.prevent
                        @dragenter.prevent v-for="(value, index) in itemsOfCategories.fields" @drop="onDrop(index)"
                        class="text-center" @click="selectItem(value[ind - 1], index)" :class="{
                            'animation-kanban':
                                isDrag === true && value[ind - 1] && dragIndex === value[ind - 1].id
                        }">
                        <div :class="{ 'dragItem': value[ind - 1].id === dragIndex, 'selectedItem': isSelected(value[ind - 1].id) }"
                            v-if="value[ind - 1] && value[ind - 1].content && !value[ind - 1].hidden"
                            class="d-flex align-items-center tu-kanban-item" :style="{
                                height: `${height}`,
                            }">
                            <img v-if="value[ind - 1].image" :src="value[ind - 1].image"
                                class="tu-kanban-img tu-kanban-ml-4" />
                            <tu-icon class="tu-kanban-icon tu-kanban-ml-4" v-else-if="value[ind - 1].icon"> {{ value[ind -
                                1].icon
                            }}</tu-icon>
                            <h5 class="tu-kanban-ml-4"> {{ value[ind - 1].content }}</h5>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch, Ref, onMounted, computed } from 'vue'
import { groupBy, sliceIntoChunks, kanbanItems, kanbanFields } from "./utils"
import tuInput from "../tuInput";
import tuIcon from "../tuIcon";
import _color from "../../utils/color";
import { TuLoading, TuLoadingAttributes } from '../tuLoading';
export default defineComponent({
    name: "tuKanban",
    components: {
        tuIcon,
        tuInput
    },
    props: {
        items: {
            type: Object as PropType<kanbanItems[]>,
            default: []
        },
        fields: {
            type: Object as PropType<kanbanFields[]>,
            default: []
        },
        multiselect: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: "42px"
        },
        modelValue: {}
    },
    emits: ["onDrag", "update:modelValue"],
    setup(props, context) {
        let id = Math.floor(Math.random() * 100);
        let kanban = ref()
        let isDrag = ref(false)
        let dragItem = ref(null);
        let dragIndex = ref(null);
        let dropIndex = ref(null)
        let dropCategory = ref(null);
        let rows = ref(props.fields.length - 1)
        let copiedObject = JSON.parse(JSON.stringify(props.items));
        let currentItems: kanbanItems[] = copiedObject
        let itemsOfCategories = reactive({ fields: groupBy(props.items, 'fieldname', "noOfRows", props.fields) });
        let search = ref("");
        let selectedItems = ref([]);
        let selectedField = ref(null);
        function exchangeItems() {
            console.log(selectedItems.value.length)
            if (props.multiselect && selectedItems.value.length > 0) {
                for (let i = 0; i < selectedItems.value.length; i++) {
                    dragItem.value = selectedItems.value[i]
                    exchange()
                }
                selectedItems.value = []
                selectedField.value = null
            }
            else {
                exchange()
            }
        }
        let exchange = () => {
            let newArray = itemsOfCategories.fields[dragItem.value.fieldname].filter(obj => obj.id !== dragItem.value.id);
            itemsOfCategories.fields[dragItem.value.fieldname] = newArray;
            let index = currentItems.findIndex(obj => obj.id === dragItem.value.id)
            currentItems[index].fieldname = dropCategory.value
            dragItem.value.fieldname = dropCategory.value
            itemsOfCategories.fields[dropCategory.value].push(dragItem.value)
            if (itemsOfCategories.fields[dropCategory.value].length > rows.value) {
                rows.value++;
            }
        }
        let startDrag = (evt: DragEvent, item: any) => {
            isDrag.value = false;
            evt.dataTransfer.effectAllowed = "copyMove";
            dragItem.value = item
            dragIndex.value = item.id
        }
        let onDrop = (index: number) => {
            isDrag.value = true;
            dropCategory.value = index
            if (dropCategory.value !== dragItem.value.categoryId && dropCategory.value !== undefined && dragItem.value !== undefined) {
                exchangeItems()
                dragItem.value = undefined;
                dropCategory.value = undefined;
                context.emit("onDrag", currentItems)
                context.emit("update:modelValue", currentItems)
            }
        }
        let load: TuLoading = null;
        function setLoading() {
            const attrs: TuLoadingAttributes = {
                target: `#tu-kanban-${id}`,
                color: "dark",
                type: "circles",
                scale: "1.0"
            };
            load = new TuLoading(attrs);
        }
        watch(search, () => {
            setLoading()
            for (let i = 0; i < props.fields.length; i++) {
                for (let j = 0; j < itemsOfCategories.fields[props.fields[i].fieldname].length; j++) {
                    if (search.value === "") {
                        itemsOfCategories.fields[props.fields[i].fieldname][j].hidden = false
                    }
                    else if (itemsOfCategories.fields[props.fields[i].fieldname][j].content.toLowerCase().includes(search.value.toLowerCase())) {
                        itemsOfCategories.fields[props.fields[i].fieldname][j].hidden = false
                        if (j - 1 >= 1) {
                            for (let k = j - 1; k >= 0; k--) {
                                let temp = itemsOfCategories.fields[props.fields[i].fieldname][k]
                                itemsOfCategories.fields[props.fields[i].fieldname][k] = itemsOfCategories.fields[props.fields[i].fieldname][k + 1]
                                itemsOfCategories.fields[props.fields[i].fieldname][k + 1] = temp
                            }
                        }
                        else if (j - 1 === 0) {
                            let temp = itemsOfCategories.fields[props.fields[i].fieldname][j]
                            itemsOfCategories.fields[props.fields[i].fieldname][j] = itemsOfCategories.fields[props.fields[i].fieldname][j - 1]
                            itemsOfCategories.fields[props.fields[i].fieldname][j - 1] = temp
                        }
                    }
                    else {
                        itemsOfCategories.fields[props.fields[i].fieldname][j].hidden = true
                    }
                }
            }
            load.close()
        })
        let selectItem = (item: any, field: number) => {
            if (props.multiselect) {
                if (selectedField.value === null || selectedField.value === field) {
                    selectedField.value = field
                    const selectedIndex = selectedItems.value.find(obj => obj.id === item.id);
                    if (selectedIndex === undefined) {
                        selectedItems.value.push(item);
                    } else {
                        const filteredObjects = selectedItems.value.filter(obj => obj.id !== item.id);
                        selectedItems.value = filteredObjects
                        if (selectedItems.value.length === 0) {
                            selectedField.value = null
                        }
                    }
                }
                else {
                    return;
                }
            }
        }
        const isSelected = computed(() => {
            return (index) => {
                return selectedItems.value.find(obj => obj.id === index);
            };
        });
        return { dropIndex, rows, id, kanban, search, itemsOfCategories, startDrag, dragIndex, onDrop, dragItem, isDrag, selectItem, isSelected, selectedItems }
    },
})
</script>

<style scoped lang="scss">
@import "../../style/sass/_mixins";

.tu-kanban {
    overflow: auto;
}

.tu-kanban::-webkit-scrollbar-thumb {
    background: var(--tu-gray-4);
}

*::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.tu-kanban th {
    height: 30px;
}

.tu-kanban td {
    height: 30px;
}

.selectedItem {
    border: 2px solid -getColorAlpha("primary", 1);
    background: -getColorAlpha("primary", 0.2);
}

.tu-kanban-table {
    &__thead {
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 2;
        border-bottom: 1px solid -getColorAlpha("text", 0.2);

        ::v-deep(.tu-kanban-table__th) {
            background: -getColor("gray-2");

            &:first-child {
                border-radius: 14px 0px 0px 0px;
            }

            &:last-child {
                border-radius: 0px 14px 0px 0px;
            }
        }
    }
}

.tu-kanban-table__element {
    table-layout: fixed;
    width: 100%;
}

.tu-kanban td {
    cursor: pointer;
}

.dragItem:active {
    opacity: 0.3;
}

.dragItem {
    transition: all 0.5s ease-in-out;
}

.tu-kanban-img {
    height: 24px;
    width: 24px !important;
}

.tu-kanban-item {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 6px 20px 0 rgba(0, 0, 0, 0.08);
    margin: 1px;
    border-radius: 12px;
    transition: all 0.5s ease-in-out;
}

.tu-dark-theme {
    .tu-kanban-item {
        background: var(--tu-gray-1);
        box-shadow: 0 6px 30px -6px rgba(255, 255, 255, 0.1) !important;
    }

    .selectedItem {
        border: 2px solid -getColorAlpha("primary", 1);
        background: -getColorAlpha("primary", 0.2);
    }
}

.justify-content-start {
    justify-content: start;
}

.text-center {
    text-align: center;
}

.d-flex {
    display: flex;
}

.align-items-center {
    align-items: center;
}

.tu-kanban-ml-4 {
    margin-left: 10px;
}

.animation-kanban {
    animation-name: fadeIn;
    animation-duration: 100ms;
}

@keyframes fadeIn {
    0% {
        transform: scale(0)
    }

    100% {
        transform: scale(1);
    }
}

.tu-kanban-icon {
    font-size: 24px !important;
}

.multiselect-badge {
    background: var(--tu-primary);
    border-radius: 0.8em;
    color: #ffffff;
    display: inline-block;
    font-weight: bold;
    line-height: 1.4em;
    margin-left: 5px;
    text-align: center;
    width: 1.4em;
    font-size: small;
}
</style>