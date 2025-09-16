<template>
	<tu-input v-if="filterNode === true" placeholder="Enter keyword" @onEnter="searchKeyword()" v-model="keyWord" />
	<div class="buttons">
		<tu-button v-if="expandAll && model === 'local'" @click="expandAllNodes">Expand all</tu-button>
		<tu-button v-if="collapseAll && model === 'local'" @click="collapseAllNodes">Collapse all</tu-button>
	</div>
	<div :id="id">
		<ul :style="styles.tree.style">
			<tu-tree-row v-for="node in currentNodes" :ref="'tree-row-' + node.id" :isCheckNode="checkNode"
				:isRemoveNode="removeNode" :isAddNode="addNode" :isEditNode="editNode" :icon="node.icon"
				:custom-styles="customStyles" :depth="1" :key="node.id" :node="node" :parent-node="node"
				:root="currentNodes" :model="model" :serverSideConfig="serverSideConfig" :keyWord="keyWord"
				v-on:emitNodeAdded="onNodeAdded" v-on:emitNodeDeleted="onNodeDeleted"
				v-on:emitNodeChecked="onNodeChecked" v-on:emitNodeEdited="onNodeEdited">
				<template v-slot:customIcon>
					<slot v-if="$slots.icon" name="icon" />
				</template>
			</tu-tree-row>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
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
			maxHeight: "500px",
			display: "inline-block"
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
	// argWanted: id -> return id, id1 etc... argWanted: id, name -> return {id: id, name: name}, {id: id1, name: name1}, etc
	// conditions {checked: true} conditions {checked: true, selected: true}
	if (format === false)
		return recGetNodesData(argWanted, conditions, currentNodes.value);
	else {
		return recGetNodesDataWithFormat(
			argWanted,
			conditions,
			currentNodes.value
		);
	}
}

function recGetNodesData(
	argWanted: string | string[],
	conditions: NodesProperties,
	children: NodeData[] | undefined
): NodesProperties[] {
	let arr: NodesProperties[] = [];
	if (children === undefined) return arr;
	children.forEach((node) => {
		if (
			node.state &&
			Object.keys(node.state).filter(
				(key) => (conditions as Record<string, any>)[key] === (node.state as Record<string, any>)?.[key]
			).length === Object.keys(conditions).length
		) {
			if (Array.isArray(argWanted)) {
				arr.push(
					Object.keys(node)
						.filter((key) => argWanted.includes(key))
						.reduce((obj, key) => {
							(obj as Record<string, any>)[key] = (node as Record<string, any>)[key];
							return obj;
						}, {} as NodesProperties)
				);
			}
			else arr.push((node as Record<string, any>)[argWanted]);
		}
		arr = arr.concat(
			recGetNodesData(argWanted, conditions, node.children as NodeData[])
		);
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
		if (
			node.state &&
			Object.keys(node.state).filter(
				(key) => (conditions as Record<string, boolean>)[key] === node.state?.[key]
			).length === Object.keys(conditions).length
		) {
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
};

const onNodeAdded = (node: NodeData) => {
	for (let i = 0; i < currentNodes.value.length; i++) {
		if (node.id === currentNodes.value[i].id) {
			currentNodes.value[i] = node;
			break;
		}
	}
	emit("update:modelValue", currentNodes.value);
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
	emit("update:checkedNodes", Array.isArray(checkedNodes) ? checkedNodes : [checkedNodes]);
};

const onNodeEdited = () => {
	emit("update:modelValue", currentNodes.value);
};
</script>