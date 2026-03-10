<template>
	<div class="tu-tree">
		<tu-input 
			v-if="filterNode === true" 
			class="tu-tree__filter" 
			placeholder="Enter keyword" 
			@onEnter="searchKeyword()" 
			v-model="keyWord" 
		/>
		<div class="tu-tree__actions" v-if="expandAll || collapseAll">
			<tu-button 
				v-if="expandAll && model === 'local'" 
				class="tu-tree__action-btn"
				@click="expandAllNodes"
			>
				Expand all
			</tu-button>
			<tu-button 
				v-if="collapseAll && model === 'local'" 
				class="tu-tree__action-btn"
				@click="collapseAllNodes"
			>
				Collapse all
			</tu-button>
		</div>
		<div :id="id" class="tu-tree__container">
			<ul class="tu-tree__list" :style="styles.tree.style">
				<tu-tree-row 
					v-for="node in currentNodes" 
					:ref="'tree-row-' + node.id" 
					:is-check-node="checkNode"
					:is-remove-node="removeNode" 
					:is-add-node="addNode" 
					:is-edit-node="editNode" 
					v-bind="node.icon ? { icon: node.icon } : {}"
					:custom-styles="customStyles" 
					:depth="1" 
					:key="node.id" 
					:node="node" 
					:parent-node="node"
					:root="currentNodes" 
					:model="model" 
					:server-side-config="serverSideConfig" 
					:key-word="keyWord"
					@node-added="onNodeAdded" 
					@node-deleted="onNodeDeleted"
					@node-checked="onNodeChecked" 
					@node-edited="onNodeEdited"
				>
					
				</tu-tree-row>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";

defineOptions({
	name: "TuTree"
});

import {
	NodeData,
	NodesProperties,
	TreeCustomStyles,
	TreeRowCustomStyles,
	TuTreeServerModel,
} from "./interface";
import tuTreeRow from "./tuTreeRow.vue";
import { recCallNodes, serverRequest } from "./helper";
import { DFT } from "./dfs";
import { TuInput } from "../../tuInput";
import { TuButton } from "../../tuButton";

interface Props {
	checkNode?: boolean;
	filterNode?: boolean;
	removeNode?: boolean;
	addNode?: boolean;
	editNode?: boolean;
	customStyles?: TreeRowCustomStyles;
	id?: string;
	nodes?: NodeData[];
	model?: string;
	serverSideConfig?: TuTreeServerModel;
	expandAll?: boolean;
	collapseAll?: boolean;
	modelValue?: NodeData[];
	checkedNodes?: NodesProperties[];
}

const props = withDefaults(defineProps<Props>(), {
	checkNode: false,
	filterNode: false,
	removeNode: false,
	addNode: false,
	editNode: false,
	model: "local",
	serverSideConfig: (): TuTreeServerModel => ({ url: "" }),
	expandAll: false,
	collapseAll: false
});

const emit = defineEmits<{
	"update:checkedNodes": [value: NodesProperties[]];
	"update:modelValue": [value: NodeData[]];
	"node-added": [node: NodeData];
	"node-deleted": [node: NodeData];
	"node-checked": [checkedNodes: NodesProperties[]];
	"node-edited": [nodes: NodeData[]];
}>();

let currentNodes = ref<NodeData[]>([]);

if (props.model === "local") {
	currentNodes = ref(props.nodes || []);
	let addProperty = (arr: NodeData[]) => {
		for (let i = 0; i < arr.length; i++) {
			arr[i].state = {
				checked: false,
				expanded: false,
				hidden: false,
			};
			if (arr[i]?.children && Array.isArray(arr[i].children) && (arr[i].children as NodeData[]).length > 0)
				addProperty(arr[i].children as NodeData[]);
		}
	};
	if (props.nodes) addProperty(props.nodes);
}
else if (props.model === "server") {
	currentNodes = ref([]);
	serverRequest(props.serverSideConfig, "").then((data) => {
		currentNodes.value = data;
		for (let i = 0; i < currentNodes.value.length; i++) {
			currentNodes.value[i].state = {
				expanded: false,
				checked: false,
				hidden: false
			};
		}
	});
}

const keyWord = ref("");
const styles: TreeCustomStyles = reactive({
	tree: {
		style: {
			height: "auto",
		
		}
	}
});

// Return checked nodes
function getCheckedNodes(
	argWanted: string | string[],
	format = false
): NodesProperties[] | NodesProperties {
	return getNodesData(argWanted, { checked: true }, format);
}

// Expand all nodes
function expandAllNodes() {
	recCallNodes(true, "expanded", currentNodes.value);
}

// Collapse all nodes
function collapseAllNodes() {
	recCallNodes(false, "expanded", currentNodes.value);
}

// Filter nodes with conditions and return argWanted
function getNodesData(
	argWanted: string | string[],
	conditions: NodesProperties = {},
	format = false
): NodesProperties[] | NodesProperties {
	if (format === false)
		return recGetNodesData(argWanted, conditions, currentNodes.value);
	
	return recGetNodesDataWithFormat(
		argWanted,
		conditions,
		currentNodes.value
	);
}

function recGetNodesData(
	argWanted: string | string[],
	conditions: NodesProperties,
	children: NodeData[] | undefined
): NodesProperties[] {
	const arr: NodesProperties[] = [];
	if (children === undefined) return arr;
	
	children.forEach((node) => {
		if (node.state) {
			const conditionKeys = Object.keys(conditions);
			const matchingConditions = conditionKeys.filter(
				(key) => {
					const conditionValue = conditions[key];
					const nodeStateValue = (node.state as Record<string, unknown>)?.[key];
					return conditionValue === nodeStateValue;
				}
			);
			
			if (matchingConditions.length === conditionKeys.length) {
				if (Array.isArray(argWanted)) {
					const result: NodesProperties = {};
					argWanted.forEach((key) => {
						if (key in node)
							result[key] = (node as unknown as Record<string, unknown>)[key];
					});
					arr.push(result);
				}
				else {
					const value = (node as unknown as Record<string, unknown>)[argWanted];
					if (value !== undefined && value !== null)
						arr.push(value as NodesProperties);
				}
			}
		}
		arr.push(...recGetNodesData(argWanted, conditions, node.children as NodeData[]));
	});
	return arr;
}

// Recursive function of recGetNodesData (return nodes with tree format)
function recGetNodesDataWithFormat(
	argWanted: string | string[],
	conditions: NodesProperties,
	nodes: NodeData[] | undefined
): NodesProperties {
	const arr: NodesProperties = {};
	if (nodes === undefined || nodes.length === 0) return arr;
	
	nodes.forEach((node) => {
		if (node.state) {
			const conditionKeys = Object.keys(conditions);
			const matchingConditions = conditionKeys.filter((key) => {
				const conditionValue = conditions[key];
				const nodeStateValue = (node.state as Record<string, unknown>)?.[key];
				return conditionValue === nodeStateValue;
			});
			
			if (matchingConditions.length === conditionKeys.length) {
				arr[node.id] = recGetNodesDataWithFormat(
					argWanted,
					conditions,
					node.children as NodeData[]
				);
			}
			else {
				Object.assign(
					arr,
					recGetNodesDataWithFormat(
						argWanted,
						conditions,
						node.children as NodeData[]
					)
				);
			}
		}
	});
	return arr;
}

const onNodeDeleted = (node: NodeData, isSingleNode?: boolean) => {
	if (!isSingleNode || isSingleNode === undefined) {
		for (let i = 0; i < currentNodes.value.length; i++) {
			if (node.id === currentNodes.value[i].id) {
				currentNodes.value.splice(i, 1);
				break;
			}
		}
	}
	emit("update:modelValue", currentNodes.value);
	emit("node-deleted", node);
};

const onNodeAdded = (node: NodeData) => {
	for (let i = 0; i < currentNodes.value.length; i++) {
		if (node.id === currentNodes.value[i].id) {
			currentNodes.value[i] = node;
			break;
		}
	}
	emit("update:modelValue", currentNodes.value);
	emit("node-added", node);
};

const searchKeyword = () => {
	if (props.model === "local") {
		const dft = new DFT();
		dft.iterate(currentNodes.value, keyWord.value);
		expandAllNodes();
	}
	if (props.model === "server") {
		serverRequest(props.serverSideConfig, `?search=${keyWord.value}`).then((data: NodeData[]) => {
			currentNodes.value = data;
			for (let i = 0; i < currentNodes.value.length; i++) {
				currentNodes.value[i].state = {
					expanded: true,
					hidden: data[i].state?.hidden || false,
					checked: false
				};
			}
		});
	}
};

watch(keyWord, () => {
	if (keyWord.value === "" && props.model === "local")
		if (props.nodes) recCallNodes(false, "hidden", props.nodes);
	if (keyWord.value === "" && props.model === "server") {
		serverRequest(props.serverSideConfig, "").then((data: NodeData[]) => {
			currentNodes.value = data;
			for (let i = 0; i < currentNodes.value.length; i++) {
				currentNodes.value[i].state = {
					expanded: true,
					checked: false
				};
			}
		});
	}
});

const onNodeChecked = () => {
	const checkedNodes = getCheckedNodes(["text", "id"], false);
	const checkedNodesArray = Array.isArray(checkedNodes) ? checkedNodes : [checkedNodes];
	emit("update:checkedNodes", checkedNodesArray);
	emit("node-checked", checkedNodesArray);
};

const onNodeEdited = () => {
	emit("update:modelValue", currentNodes.value);
	emit("node-edited", currentNodes.value);
};
</script>

<style lang="scss" scoped>
@import "../../../style/sass/_functions.scss";

.tu-tree {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	&__filter {
		width: 100%;
		margin-bottom: 12px;
	}

	&__actions {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-bottom: 12px;
	}

	&__action-btn {
		font-size: 13px;
		padding: 6px 12px;
		height: auto;
	}

	&__container {
		flex: 1;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--tu-gray-2, #e0e0e0);
		border-radius: 6px;
		background: var(--tu-background, #fff);
	}

	&__list {
		margin: 0;
		padding: 8px;
		list-style: none;
		flex: 1;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--tu-gray-4, #ddd) transparent;

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
			border-radius: 4px;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--tu-gray-4, #ddd);
			border-radius: 4px;

			&:hover {
				background: var(--tu-gray-3, #bbb);
			}
		}
	}
}
</style>