<template>
    <div :key="reRender" class="margin-bottom">
        <table>
            <tr>
                <th v-for="category in categories" class="text-center hori">{{ category }}</th>
            </tr>
            <tr v-for="index in (itemsOfCategories.noOfRows + 1)">
                <td :draggable="true" @dragstart="startDrag($event, item)" @dragover.prevent @dragenter.prevent
                    v-for="(item, ind) in orderedItems[index - 1]" @drop="onDrop(item, ind)" class="text-center" :class="{
                        'vert': ind === 1, 'animation-kanban':
                            isDrag === true
                    }">
                    <div v-if="item.name" class="d-flex justify-content-center align-items-center">
                        <img v-if="item.image" :src="item.image" class="tu-kanban-img mt-3 ms-3" />
                        <h5 class="ms-4 "> {{ item.name }}</h5>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue'
import { groupBy, sliceIntoChunks, kanbanItems } from "./utils"
export default defineComponent({
    name: "tuKanban",
    props: {
        items: {
            type: Object as PropType<kanbanItems[]>,
            default: []
        },
        width: {
            type: String,
            default: "20%"
        },
        categories: {
            type: Array<string>,
            default: []
        }
    },
    setup(props) {
        let isDrag = ref(false)
        let dragItem = ref(null);
        let dragIndex = ref(null);
        let dropCategory = ref(null);
        let reRender = ref(0);
        let lastShuffledItem = ref();
        let itemsOfCategories = ref(groupBy(props.items, 'category', "noOfRows", props.categories));
        let orderedItems: any[][] = reactive([]);
        function createARow(k: number, arr: any[]) {
            for (let i = 0; i < props.categories.length; i++) {
                if (itemsOfCategories.value[props.categories[i]][k] === undefined)
                    arr.push({});
                else
                    arr.push(itemsOfCategories.value[props.categories[i]][k]);
            }
        }
        function shuffleItems (start: number) {
            for(let i = start; i < orderedItems.length; i++) {
                if(i === orderedItems.length - 1) {
                    orderedItems[i][dragItem.value.categoryId] = {}
                    let count = 0;
                    for (let j = 0; j < props.categories.length; j++) {
                        if (Object.keys(orderedItems[i][j]).length === 0)
                            count++;
                    }
                    if (count === props.categories.length) {
                        orderedItems.pop();
                    }
                }
                else {
                    orderedItems[i][dragItem.value.categoryId] = orderedItems[i + 1][dragItem.value.categoryId]
                }
            }
        }
        function exchangeItems() {
            let itemPushed = false;
            let itemRemoved = false;
            for (let i = 0; i < orderedItems.length; i++) {
                if (orderedItems[i][dragItem.value.categoryId].id === dragItem.value.id && !itemRemoved) {
                    orderedItems[i][dragItem.value.categoryId] = {}
                    itemRemoved = true
                    lastShuffledItem.value = i
                }
                if (Object.keys(orderedItems[i][dropCategory.value]).length === 0 && !itemPushed) {
                    const newItem = Object.assign({}, dragItem.value);
                    newItem.category = props.categories[dropCategory.value]
                    newItem.categoryId = dropCategory.value
                    orderedItems[i][dropCategory.value] = newItem
                    itemPushed = true
                }
                if (itemPushed && itemRemoved) {
                    shuffleItems(lastShuffledItem.value)
                    return;
                }
            }
            if (!itemPushed) {
                let newRow = [];
                for (let i = 0; i < props.categories.length; i++) {
                    if (i === dropCategory.value) {
                        const newItem = Object.assign({}, dragItem.value);
                        newItem.category = props.categories[dropCategory.value]
                        newItem.categoryId = dropCategory.value
                        newRow.push(newItem)
                    }
                    else
                        newRow.push({})
                }
                itemsOfCategories.value.noOfRows++;
                orderedItems.push(newRow)
                shuffleItems(lastShuffledItem.value)
            }
        }
        for (let i = 0; i < itemsOfCategories.value["noOfRows"]; i++) {
            createARow(i, orderedItems)
        }
        orderedItems = sliceIntoChunks(orderedItems, props.categories.length)
        let startDrag = (evt: DragEvent, item: any) => {
            console.log(item)
            isDrag.value = false;
            evt.dataTransfer.effectAllowed = "copyMove";
            dragItem.value = item
            dragIndex.value = item.id
        }
        let onDrop = (item: any, index: number) => {
            isDrag.value = true;
            dropCategory.value = index
            if (dropCategory.value !== dragItem.value.categoryId && dropCategory.value !== undefined && dragItem.value !== undefined) {
                exchangeItems()
                dragItem.value = undefined;
                dropCategory.value = undefined;
            }
        }
        return { orderedItems, reRender, itemsOfCategories, startDrag, dragIndex, onDrop, dragItem, isDrag }
    },
})
</script>

<style scoped>
td,
th {
    width: 20%;
    height: 50px;
}

.margin-bottom {
    margin-bottom: 25px;
}

td {
    cursor: pointer;
}

.vert {
    border-left: 1px solid var(--tu-text);
    border-right: 1px solid var(--tu-text);
}

.hori {
    border-bottom: 1px solid var(--tu-text);
}

.tu-kanban-img {
    height: 45px;
    width: 45px !important;
}

.text-center {
    text-align: center;
}

.d-flex {
    display: flex;
}

.justify-content-center {
    justify-content: center;
}

.align-items-center {
    align-items: center;
}

.ms-4 {
    margin-left: 14px;
}

.animation-kanban {
    animation-name: fadeIn;
    animation-duration: 100ms;
}

@keyframes fadeIn {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
</style>