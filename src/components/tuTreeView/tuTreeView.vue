<template>
	<ul id="explorer" class="explorer tree-item-node-parent">
		<li
			v-for="treeViewItem in items"
			:key="treeViewItem.id"
			:id="treeViewItem.id"
			draggable
			@dragover.stop.prevent
			@dragenter.stop.prevent
			@dragstart.stop="onDragNode(treeViewItem, $event)"
			@drop.prevent.stop="
				onDropNode(treeViewItem, $event, onDropValidator)
			"
			@dragover.stop="addHoverClass"
			class="tree-item-node"
			@dragleave.stop="removeHoverClass"
		>
			<TreeItemComponent
				class="pointer tree-view-item"
				:item="treeViewItem"
				:parent="parent"
				:isCheckable="isCheckable"
				:selectedItem="selectedItem"
				:treeState="treeState"
				:isNested="isNested === true"
				@contextmenu.prevent="
					$emit('onContextMenu', {
						item: treeViewItem,
						event: $event,
					})
				"
			>
				<template v-slot:icon
					><slot name="item-prepend-icon" v-bind="treeViewItem"></slot
				></template>
				<template v-slot:prepend
					><slot name="item-prepend" v-bind="treeViewItem"></slot
				></template>
			</TreeItemComponent>

			<div
				class="node-child hide"
				:class="{ 'hide-guidelines': hideGuideLines }"
				v-if="treeViewItem.children && treeViewItem.children.length > 0"
			>
				<tu-tree-view
					:items="treeViewItem.children"
					:hideGuideLines="hideGuideLines"
					:isNested="true"
					:parent="treeViewItem"
					:selectedItem="selectedItem"
					:checkedItems="checkedItems"
					:treeState="treeState"
					:isCheckable="isCheckable"
					@onContextMenu="$emit('onContextMenu', $event)"
				>
					<template v-for="(_, slot) of $slots" v-slot:[slot]="props">
						<slot :name="slot" v-bind="props" />
					</template>
				</tu-tree-view>
			</div>
		</li>
	</ul>
</template>
<script lang="ts" >
import { IsValidDropCallback, TreeState, TuTreeViewItemDefn } from "./types";
import TreeItemComponent from "./tuTreeItem.vue";
import { useTreeViewItemMouseActions } from "./composables/use-tree-mouse-actions";
import { useGraph } from "./composables/use-graph";
import { computed, defineComponent, PropType, ref } from "vue";
import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuTreeView",
	extends: tuComponent,
	props: {
		isNested: {
			type: Boolean,
			default: false
		},
		items: {
			type: Array as PropType<TuTreeViewItemDefn[]>,
			required: true,
			default: () => {
				return [];
			}
		},
		selectedItem: {
			type: Object as PropType<TuTreeViewItemDefn>
		},
		checkedItems: {
			type: Array as PropType<TuTreeViewItemDefn[]>
		},
		isCheckable: {
			type: Boolean
		},
		hideGuideLines: {
			type: Boolean,
			default: false
		},
		onDropValidator: {
			type: Function as PropType<IsValidDropCallback>,
			default: () => {
				() => true;
			}
		},
		treeState: {
			type: Object as PropType<TreeState>
		},
		expandedTypes: {
			type: Object as PropType<string[]>,
			default: () => []
		},
		expandedIds: {
			type: Object as PropType<string[]>,
			default: () => []
		},
		expandAll: {
			type: Boolean as PropType<boolean>,
			default: false
		}
	},
	components: { TreeItemComponent },
	emits: ["update:selectedItem", "update:checkedItems", "onContextMenu", "onSelect", "onCheck"],

	setup (props, { emit, attrs }) {
		const parent = computed<TuTreeViewItemDefn>(() => attrs.parent as TuTreeViewItemDefn);

		const treeState = ref<TreeState>();
		const expandedKeys = new Set<string>([...props.expandedTypes, ...props.expandedIds]);
		// Create a tree state object for only root nodes.
		if (props.treeState !== null)
			treeState.value = props.treeState;

		else {
			treeState.value = useGraph(
				props.selectedItem,
				(selectedItem) => emit("update:selectedItem", selectedItem),
				props.checkedItems,
				(checkedItems) => emit("update:checkedItems", checkedItems),
				(id: string, type: string) => expandedKeys.has(id) || expandedKeys.has(type) || props.expandAll,
				(eventArguments) => emit("onSelect", eventArguments),
				(eventArguments) => emit("onCheck", eventArguments)
			);
		}

		return {
			...useTreeViewItemMouseActions(),
			parent,
			treeState
		};
	}
});

</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

.icon-area {
    width: 22px;
    margin-right: 0.4em;
}

.node-name {
    cursor: pointer;
    margin-left: 5px;
}

.d-flex {
    display: flex;
}

.align-items-center {
    align-items: center;
}

.hide {
    display: none;
}

.pointer {
    cursor: pointer;
}

ul {
    padding-left: 0;
    margin: 0;
    list-style-type: none;
    display: inline-block;
}

li {
    border-radius: 4px;
}

li.drag-over {
    background-color: rgba(22, 22, 22, 0.068);
}

.node-child {
    margin-left: 37px !important;
    border-left: 1px dashed rgb(192, 192, 192);
    display: block;
}

.node-child.hide {
	display: none !important;
}

.hide-guidelines {
    border-left: none !important;
}

</style>
