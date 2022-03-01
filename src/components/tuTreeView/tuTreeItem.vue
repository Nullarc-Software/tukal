<template>
	<div
		class="d-flex align-items-center"
		@contextmenu.prevent="$emit('onContextMenu', { itemClone, event: $event })"
	>
		<div class="horizontal-dashes" v-if="isNested" />
		<span
			class="chevron-right"
			ref="chevron"
			:class="{
				'hide-chevron': !itemClone.children || itemClone.children.length < 1,
			}"
			@click="toggleExpand()"
		>
		</span>

		<div
			class="pointer"
			:class="{ 'selected-tree-item': !isCheckable && isSelected }"
			style="width: 100%"
		>
			<div>
				<div v-if="isCheckable" style="display: flex">
					<input
						@contextmenu.prevent
						@change="updateCheckState"
						type="checkbox"
						ref="checkbox"
					/>
					<div
						class="d-flex"
						style="margin-left: 0.4em; margin-right: 0.4em"
					>
						<slot name="icon"></slot>
						<slot name="prepend"></slot>
					</div>
					<component v-if="item.isComponent" :is="item.component" v-bind="item.componentProps" />
					<label v-else for="checkbox">{{ itemClone.name }}</label>
				</div>
				<div
					class="d-flex"
					v-else
					@click="treeState?.emitItemSelected(itemClone)"
				>
					<slot v-if="!item.isComponent" name="icon"></slot>
					<slot v-if="!item.isComponent" name="prepend"></slot>
					<span v-if="!item.isComponent"> {{ itemClone.name }} </span>
					<component v-if="item.isComponent" :is="item.component" v-bind="item.componentProps" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" >
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	PropType,
	ref,
	watch
} from "vue";
import tuComponent from "../tuComponent";
import {
	cascadeStateToDescendants,
	notifyParentOfSelection
} from "./composables/use-tree-traversal";
import { TreeState, TreeViewItem } from "./types";

export default defineComponent({
	name: "TuTreeItem",
	extends: tuComponent,
	inheritAttrs: true,
	props: {
		isNested: {
			type: Boolean,
			default: false
		},
		item: {
			type: Object as PropType<TreeViewItem>,
			required: true
		},
		isCheckable: {
			type: Boolean
		},
		selectedItem: {
			type: Object as PropType<TreeViewItem>
		},
		treeState: {
			type: Object as PropType<TreeState>
		}
	},
	emits: ["on-rename", "onContextMenu", "update:item"],

	setup (props, { emit, attrs }) {
		const checkbox = ref<HTMLInputElement>();
		const isSelected = computed(
			() => props.selectedItem?.id === props.item.id
		);
		const parent = computed<TreeViewItem>(
			() => attrs.parent as TreeViewItem
		);

		const itemClone = ref(props.item);

		onMounted(() => {
			props.treeState?.trackNode(props.item, parent.value);
			if (props.treeState?.isNodeExpanded(props.item.id, props.item.type))
				toggleExpand();
		});
		onUnmounted(() => props.treeState?.untrackNode(props.item));

		const updateCheckState = () => {
			itemClone.value.checkedStatus = checkbox.value?.checked === true ? "true" : "false";
			emit("update:item", itemClone);
			props.treeState!.emitItemCheckedChange(props.item);
			notifyParentOfSelection(props.item!, props.treeState!);
			cascadeStateToDescendants(props.item!, props.treeState!);
		};

		watch(
			() => props.item.checkedStatus,
			() => {
				if (props.item.checkedStatus === "indeterminate")
					checkbox.value!.indeterminate = true;
				else {
					checkbox.value!.indeterminate = false;
					checkbox.value!.checked =
						props.item.checkedStatus === "true";
				}
			}
		);

		const chevron = ref<HTMLSpanElement>();
		const toggleExpand = () => {
			chevron.value?.classList.toggle("rotate-90");
			const element = document
				.getElementById(props.item.id)
				?.getElementsByClassName("node-child");

			if (!element || !element[0]) return;
			element[0].classList.toggle("hide");
		};

		return {
			itemClone,
			toggleExpand,
			chevron,
			isSelected,
			updateCheckState,
			parent,
			checkbox
		};
	}
});
</script>

<style lang="scss" scoped>

.selected-tree-item {
	background: rgba(235, 106, 59, 0.795);
	color: white;
}
.tree-view-item {
	margin: 0.1em;
	padding: 0.35em;
}
.chevron-right {
	color: gray;
}

.hide-chevron {
	visibility: collapse;
	display: none;
}

.chevron-right {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
    transition: .2s;
}

.chevron-right.rotate-90::after {
    transform: rotateZ(45deg);
}

.chevron-right::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 7px;
    height: 7px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(-45deg);
    right: 6px;
    top: 5px
}

.horizontal-dashes {
    width: 1em;
    border-top: 1px dashed rgb(192, 192, 192);
}

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

</style>
