<template>
	<div class="tu-kanban">
		<div class="d-flex justify-content-start" style="flex: 0 0 auto">
			<tu-input label-placeholder="Search" v-model="search" />
		</div>

		<div class="tu-kanban-main" :id="`tu-kanban-${id}`">
			<div v-for="field in     fields    " class="text-center tu-kanban-category" @dragenter.prevent @dragover.prevent
				@drop="onDrop($event, field.fieldName)">
				<div class="tu-kanban-header">
					{{ field.fieldName }}
					<span class="multiselect-badge"
						v-if="selectedItems.length > 0 && selectedItems[0].fieldname === field.fieldName">{{
							selectedItems.length }}</span>
				</div>
				<div class="d-flex tu-kanban-category-body">
					<div style="display: contents;" v-for="item of     currentItems    " :key="item.id">
						<div class="tu-kanban-item" :class="[
							{ ['selected-item']: item.selected }
						]" v-if="item.fieldName === field.fieldName" draggable="true" @dragstart="startDrag($event, item)"
							@click="selectItem(item)">
							<img v-if="item.image" :src="item.image" class="tu-kanban-img" />
							<tu-icon class="tu-kanban-icon" v-else-if="item.icon"> {{ item.icon
							}}</tu-icon>
							<span> {{ item.content }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch, Ref, onMounted, computed } from 'vue'
import { groupBy, sliceIntoChunks, KanbanItem, KanbanField } from "./utils"
import tuInput from "../tuInput";
import tuIcon from "../tuIcon";
import _color from "../../utils/color";
import { TuLoading, TuLoadingAttributes } from '../tuLoading';
import _ from "lodash";

export default defineComponent({
	name: "tuKanban",
	components: {
		tuIcon,
		tuInput
	},
	props: {
		items: {
			type: Object as PropType<KanbanItem[]>,
			default: []
		},
		fields: {
			type: Object as PropType<KanbanField[]>,
			default: []
		},
		multiSelect: {
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
		let currentItems = ref(props.items);

		let itemsOfCategories = reactive({ fields: groupBy(props.items, 'fieldname', "noOfRows", props.fields) });
		let search = ref("");
		let selectedItems = ref([]);
		let selectedField = ref(null);

		let startDrag = (evt: DragEvent, item: KanbanItem) => {

			evt.dataTransfer.effectAllowed = "copyMove";
			item.selected = true;
		}

		let onDrop = (evebt: DragEvent, fieldName: string) => {

			_.each(currentItems.value, (item) => {
				if (item.selected) {
					item.fieldName = fieldName,
						item.selected = false;
				}
			});

			console.log(props.items);
			console.log(currentItems.value);
			context.emit("update:modelValue", props.items)

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
			if (_.isEmpty(search.value)) {
				currentItems.value = props.items;
			}
			else {

				currentItems.value = _.filter(props.items, (x: KanbanItem) =>
					x.content.toLowerCase().includes(search.value)
				)
			}
			load.close()
		});

		let selectItem = (item: KanbanItem) => {
			if (props.multiSelect) {
				item.selected = !item.selected;
			}
		}
		const isSelected = computed(() => {
			return (index) => {
				return selectedItems.value.find(obj => obj.id === index);
			};
		});
		return { dropIndex, id, kanban, search, itemsOfCategories, startDrag, dragIndex, onDrop, dragItem, isDrag, selectItem, isSelected, selectedItems, currentItems }
	},
})
</script>

<style scoped lang="scss">
@import "../../style/sass/_mixins";

.tu-kanban {
	display: flex;
	flex-direction: column;

}


.selected-item {
	border: 2px solid -getColorAlpha("primary", 1);
	background-color: -getColorAlpha("primary", 0.1) !important;
}

.tu-kanban-main {
	display: flex;
	max-height: 80%;
}

.tu-kanban-category {
	display: flex;
	flex-direction: column;
	overflow: auto;
	min-width: 20%;
	width: 100%;


	&:first-of-type {
		.tu-kanban-header {
			margin: 0;
			border-radius: 14px 0px 0px 0px;
		}
	}


	&:last-of-type {
		.tu-kanban-header {
			margin: 0;
			border-radius: 0px 14px 0px 0px;
		}
	}

	.tu-kanban-header {
		top: 0;
		width: 100%;
		background-color: -getColor("gray-2");
		padding: 10px;
		font-weight: bold;
		position: sticky;
	}

	.tu-kanban-category-body {
		width: 100%;
		flex-wrap: wrap;

	}
}

.tu-kanban-img {
	height: 24px;
	width: 24px !important;
}

.tu-kanban-item {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1px;
	padding: 5px;
	border-radius: 12px;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 6px 20px 0 rgba(0, 0, 0, 0.08);
	transition: all 0.05s ease;
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