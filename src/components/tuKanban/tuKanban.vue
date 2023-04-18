<template>
    <div :key="reRender" class="margin-bottom">
        <table class="tu-kanban-table__element">
            <thead class="tu-kanban-table__thead">
                <th v-for="category in fields" class="text-center tu-kanban-table__th">{{ category.fieldname }}</th>
            </thead>
            <tr v-for="index in (itemsOfCategories.noOfRows + 1)">
                <td :draggable="true" @dragstart="startDrag($event, item)" @dragover.prevent @dragenter.prevent
                    v-for="(item, ind) in orderedItems[index - 1]" @drop="onDrop(item, ind)" class="text-center" :class="{
                        'animation-kanban':
                            isDrag === true
                    }">
                    <div v-if="item.name" class="d-flex justify-content-between align-items-center tu-kanban-item">
                        <img v-if="item.image" :src="item.image" class="tu-kanban-img mt-3 ms-4" />
                        <tu-icon class="tu-kanban-icon ms-4" v-else-if="item.icon"> {{ item.icon }}</tu-icon>
                        <h5 class="ms-4 "> {{ item.name }}</h5>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue'
import { groupBy, sliceIntoChunks, kanbanItems, kanbanFields } from "./utils"
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
        fields: {
            type: Object as PropType<kanbanFields[]>,
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
        let itemsOfCategories = ref(groupBy(props.items, 'fieldname', "noOfRows", props.fields));
        let orderedItems: any[][] = reactive([]);
        function createARow(k: number, arr: any[]) {
            for (let i = 0; i < props.fields.length; i++) {
                if (itemsOfCategories.value[props.fields[i].fieldname][k] === undefined)
                    arr.push({});
                else
                    arr.push(itemsOfCategories.value[props.fields[i].fieldname][k]);
            }
        }
        function shuffleItems (start: number) {
            for(let i = start; i < orderedItems.length; i++) {
                if(i === orderedItems.length - 1) {
                    orderedItems[i][dragItem.value.categoryId] = {}
                    let count = 0;
                    for (let j = 0; j < props.fields.length; j++) {
                        if (Object.keys(orderedItems[i][j]).length === 0)
                            count++;
                    }
                    if (count === props.fields.length) {
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
                    newItem.fieldname = props.fields[dropCategory.value]
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
                for (let i = 0; i < props.fields.length; i++) {
                    if (i === dropCategory.value) {
                        const newItem = Object.assign({}, dragItem.value);
                        newItem.fieldname = props.fields[dropCategory.value]
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
        orderedItems = sliceIntoChunks(orderedItems, props.fields.length)
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
        let widthChip = () =>{
            let width = ( 90 / props.fields.length);
            return {
                width: width + "vw"
            }
        }
        return { orderedItems, widthChip, reRender, itemsOfCategories, startDrag, dragIndex, onDrop, dragItem, isDrag }
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
	&__tbody {
		background-color: -getColor("background");
		overflow: auto;
		position: relative;

		&:empty {
			display: none;
			background: #000;

			~.tu-table_not-found {
				display: table-row-group;
			}
		}
	}

	&__header {
		width: 100%;
		padding: 10px;
		background: -getColor("gray-2");
		border-radius: 14px 14px 0px 0px;

		&~.tu-table {
			::v-deep(.tu-kanban-table__th) {
				&:first-child {
					border-radius: 0px;
				}

				&:last-child {
					border-radius: 0px;
				}
			}
		}
	}

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

.tu-kanban-img {
    height: 36px;
    width: 36px !important;
}

.tu-kanban-item {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 6px 20px 0 rgba(0, 0, 0, 0.08);
    margin: 10px;
    border-radius: 12px;
}

.tu-dark-theme { 
    .tu-kanban-item {
        background: -getColor("gray-1") !important;
        box-shadow:  0 6px 30px -6px rgba(255,255, 255, 0.1) !important;
    }
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
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

.tu-kanban-icon {
    font-size: 36px !important;
}
</style>