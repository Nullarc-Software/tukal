<template>
    <div :key="reRender" class="margin-bottom">
        <div class="d-flex justify-content-start">
            <tu-input placeholder="Search" v-model="search" />
        </div>
        <table class="tu-kanban-table__element">
            <thead class="tu-kanban-table__thead">
                <th v-for="field in fields" class="text-center tu-kanban-table__th">{{ field.fieldname }}</th>
            </thead>
            <tr v-for="ind in rows">
                <td :draggable="true" @dragstart="startDrag($event, value[ind - 1])" @dragover.prevent @dragenter.prevent
                    v-for="(value, index) in itemsOfCategories.fields" @drop="onDrop(index)"
                    class="text-center" :class="{
                        'animation-kanban':
                            isDrag === true && dragIndex === value[ind - 1]
                    }">
                    <div :class="{ 'dragItem': value[ind - 1].id === dragIndex }"
                        v-if="value[ind - 1] && value[ind - 1].content && !value[ind - 1].hidden"
                        class="d-flex justify-content-between align-items-center tu-kanban-item">
                        <img v-if="value[ind - 1].image" :src="value[ind - 1].image" class="tu-kanban-img mt-3 ms-4" />
                        <tu-icon class="tu-kanban-icon ms-4" v-else-if="value[ind - 1].icon"> {{ value[ind - 1].icon
                        }}</tu-icon>
                        <h5 class="ms-4 "> {{ value[ind - 1].content }}</h5>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch, Vue} from 'vue'
import { groupBy, sliceIntoChunks, kanbanItems, kanbanFields } from "./utils"
export default defineComponent({
    name: "tuKanban",
    props: {
        items: {
            type: Object as PropType<kanbanItems[]>,
            default: []
        },
        fields: {
            type: Object as PropType<kanbanFields[]>,
            default: []
        }
    },
    setup(props) {
        let isDrag = ref(false)
        let dragItem = ref(null);
        let dragIndex = ref(null);
        let dropIndex = ref(null)
        let dropCategory = ref(null);
        let reRender = ref(0);
        let lastShuffledItem = ref();
        let rows = ref(props.fields.length - 1)
        let itemsOfCategories = reactive({ fields: groupBy(props.items, 'fieldname', "noOfRows", props.fields) });
        let search = ref("");
        function exchangeItems() {
            let newArray = itemsOfCategories.fields[dragItem.value.fieldname].filter(obj => obj.id !== dragItem.value.id);
            itemsOfCategories.fields[dragItem.value.fieldname] = newArray;
            dragItem.value.fieldname = dropCategory.value
            itemsOfCategories.fields[dropCategory.value].push(dragItem.value)
            if(itemsOfCategories.fields[dropCategory.value].length > rows.value) {
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
            }
        }
        watch(search, () => {
            globalSearch()
        })
        let globalSearch = () => {
            for (let i = 0; i < props.fields.length; i++) {
            }
        }
        return { dropIndex, rows, search, reRender, itemsOfCategories, startDrag, dragIndex, onDrop, dragItem, isDrag }
    },
})
</script>

<style scoped lang="scss">
@import "../../style/sass/_mixins";

td,
th {
    height: 45px;
}

.margin-bottom {
    margin-bottom: 25px;
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

td {
    cursor: pointer;
}

.dragItem:active {
    opacity: 0.4;
}

.dragItem {
    transition: all 0.5s ease-in-out;
}

.tu-kanban-img {
    height: 36px;
    width: 36px !important;
}

.tu-kanban-item {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 6px 20px 0 rgba(0, 0, 0, 0.08);
    margin: 10px;
    border-radius: 12px;
    transition: all 0.5s ease-in-out;
}

.tu-kanban-item.dragging {}

.tu-dark-theme {
    .tu-kanban-item {
        background: -getColor("gray-1") !important;
        box-shadow: 0 6px 30px -6px rgba(255, 255, 255, 0.1) !important;
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

.justify-content-around {
    justify-content: space-around;
}

.align-items-center {
    align-items: center;
}

.ms-4 {
    margin-left: 6%;
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
    font-size: 36px !important;
}
</style>