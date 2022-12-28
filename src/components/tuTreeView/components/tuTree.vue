<template>
	<tu-input v-if="filterNode === true" placeholder="Enter keyword" @onEnter="searchKeyword()" v-model="keyWord" />
	<div class="buttons">
		<tu-button v-if="expandAll && model === 'local'" @click="expandAllNodes">Expand all</tu-button>
		<tu-button v-if="collapseAll && model === 'local'" @click="collapseAllNodes">Collapse all</tu-button>
	</div>
	<div :id="id">
		<ul :style="styles.tree.style" v-if="force">
			<tu-tree-row v-for="node in currentNodes" :ref="'tree-row-' + node.id" :isCheckNode="checkNode"
				:isRemoveNode="removeNode" :isAddNode="addNode" :isEditNode="editNode" :icon="icon"
				:custom-styles="customStyles" :depth="1" :key="node" :node="node" :parent-node="node"
				:root="currentNodes" :model="model" :serverSideConfig="serverSideConfig"
				v-on:emitNodeAdded="onNodeAdded" v-on:emitNodeDeleted="onNodeDeleted"
				v-on:emitNodeChecked="onNodeChecked" v-on:emitNodeEdited="onNodeEdited">
				<template v-slot:customIcon>
					<slot v-if="$slots.icon" name="icon" />
				</template>
			</tu-tree-row>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref, Ref, watch } from "vue";
import {
	NodeData,
	NodesProperties,
	TreeCustomStyles,
	TuTreeServerModel,
	serverNodeData
} from "./interface";
import tuTreeRow from "./tuTreeRow.vue";
import { recCallNodes, serverRequest } from "./helper";
import { DFT } from "./dfs.ts";
import tuComponent from "@/components/tuComponent";
export default defineComponent({
	name: "TuTree",
	extends: tuComponent,
	components: {
		tuTreeRow
	},
	props: {
		checkNode: {
			type: Boolean,
			default: false
		},
		filterNode: {
			tye: Boolean,
			default: false
		},
		removeNode: {
			type: Boolean,
			default: false
		},
		addNode: {
			type: Boolean,
			default: false
		},
		editNode: {
			type: Boolean,
			default: false
		},
		customStyles: {
			type: Object as PropType<TreeCustomStyles>
		},
		id: String,
		nodes: {
			type: Object as PropType<NodeData[]>
		},
		model: {
			type: String,
			default: "local"
		},
		serverSideConfig: {
			type: Object as PropType<TuTreeServerModel>,
			default: () => {
				return {};
			}
		},
		expandAll: {
			type: Boolean,
			default: false
		},
		collapseAll: {
			type: Boolean,
			default: false
		},
		modelValue: {},
		checkedNodes: {}
	},
	emits: [
		"update:checkedNodes",
		"update:modelValue"
	],
	setup(props, context) {
		let currentNodes = ref();
		if (props.model === "local") {
			currentNodes = ref(props.nodes);
			let addProperty = (arr) => {
				for (let i = 0; i < arr.length; i++) {
					arr[i].state = {
						checked: false,
						expanded: false,
						hidden: false,
					}
					if (arr[i]?.children && arr[i].children.length > 0) {
						addProperty(arr[i].children)
					}
				}
			}
			addProperty(props.nodes)
		}
		else if (props.model === "server") {
			currentNodes = ref([]);
			serverRequest(props.serverSideConfig, "").then((data) => {
				currentNodes.value = data;
				for (let i = 0; i < currentNodes.value.length; i++) {
					currentNodes.value[i].state = {
						expanded: false
					}
				}
			});
		}
		const keyWord = ref("");
		const firstSearch = ref(false);
		const styles: TreeCustomStyles = reactive({
			tree: {
				style: {
					height: "auto",
					maxHeight: "500px",
					display: "inline-block"
				}
			}
		});
		const selectedNodeData = reactive({ id: "" });
		const force = ref(true);
		// Find the ancestors ids of a node
		function findNodePath(nodeId: string, maxDepth = 9999): string[] {
			return recFindNodePath(nodeId, currentNodes.value, 1, maxDepth);
		}
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
		// Private functions
		// Recursive function of findNodePath
		function recFindNodePath(
			nodeId: string,
			nodes: NodeData[],
			depth: number,
			maxDepth: number
		): string[] {
			let ret: string[] = [];
			nodes.forEach((node) => {
				let tmp: string[] = [];
				if (nodeId === node.id && maxDepth >= depth) {
					ret.unshift(node.id);
					return false;
				}
				else if (
					node.children &&
					maxDepth > depth &&
					(tmp = recFindNodePath(
						nodeId,
						node.children,
						depth + 1,
						maxDepth
					)) != null &&
					tmp.length > 0
				) {
					tmp.unshift(node.id);
					ret = tmp;
					return false;
				}
			});
			return ret;
		}
		// Recursive function of findNode
		function recFindNode(
			nodeId: string,
			nodes: NodeData[],
			depth: number,
			maxDepth: number
		): NodeData | null {
			let ret: NodeData | null = null;
			nodes.forEach((node) => {
				let tmp: NodeData | null;
				if (nodeId === node.id && maxDepth >= depth) {
					ret = node;
					return false;
				}
				else if (
					node.children &&
					maxDepth > depth &&
					(tmp = recFindNode(
						nodeId,
						node.children,
						depth + 1,
						maxDepth
					)) != null
				) {
					ret = tmp;
					return false;
				}
			});
			return ret;
		}
		// Recursive function of getVisibleNodes
		function recGetVisibleNodes(
			arr: Array<NodeData | string>,
			node: NodeData,
			fullNode: boolean
		) {
			arr.push(fullNode ? node : node.id);
			if (node.state.expanded === true && node.children) {
				node.children.forEach((nodeChild) => {
					recGetVisibleNodes(arr, nodeChild, fullNode);
				});
			}
		}
		// Recursive function of recGetNodesData (return node[])
		function recGetNodesData(
			argWanted: string | string[],
			conditions: NodesProperties,
			children: NodeData[] | undefined
		): NodesProperties[] {
			let arr: NodesProperties[] = [];
			if (nodes === undefined) return arr;
			nodes.forEach((node) => {
				if (
					node.state &&
					Object.keys(node.state).filter(
						(key) => conditions[key] === node.state[key]
					).length === Object.keys(conditions).length
				) {
					if (Array.isArray(argWanted)) {
						arr.push(
							Object.keys(node)
								.filter((key) => argWanted.includes(key))
								.reduce((obj, key) => {
									obj[key] = node[key];
									return obj;
								}, {} as NodesProperties)
						);
					}
					else arr.push(node[argWanted]);
				}
				arr = arr.concat(
					recGetNodesData(argWanted, conditions, node.children)
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
						(key) => conditions[key] === node.state[key]
					).length === Object.keys(conditions).length
				) {
					arr[node.id] = recGetNodesDataWithFormat(
						argWanted,
						conditions,
						node.children
					);
				}
				else {
					Object.assign(
						arr,
						recGetNodesDataWithFormat(
							argWanted,
							conditions,
							node.children
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
			context.emit("update:modelValue", currentNodes.value);
		};
		const onNodeAdded = (node: NodeData) => {
			for (let i = 0; i < currentNodes.value.length; i++) {
				if (node.id === currentNodes.value[i].id) {
					currentNodes.value[i] = node;
					break;
				}
			}
			context.emit("update:modelValue", currentNodes.value);
		};
		let dfs = (node: NodeData, parentNode?: NodeData) => {
			if (node.text.startsWith(keyWord.value)) {
				return node;
			}
			if (node.children) {
				let requiredNodes = node;
				let nodeFound = false;
				for (let i = 0; i < node.children.length; i++) {
					let result = dfs(node.children[i], node)
					if (result != null) {
						requiredNodes.children[i].state.hidden = false;
						nodeFound = true;
					}
					else {
						requiredNodes.children[i].state.hidden = true;
					}
				}
				if (nodeFound === true) {
					return requiredNodes;
				}
				else {
					return null
				}
			}
			else {
				return null;
			}
		}

		const searchKeyword = () => {
			if (props.model === "local") {
				const dft = new DFT();
				dft.search(currentNodes.value, keyWord.value);
				expandAllNodes();
			}
			if (props.model === "server") {
				serverRequest(props.serverSideConfig, `?search=${keyWord.value}`).then((data) => {
					currentNodes.value = data;
					for (let i = 0; i < currentNodes.value.length; i++) {
						currentNodes.value[i].state = {
							expanded: true,
							checked: false
						}
					}
				})
			}
		}
		watch(keyWord, () => {
			if (firstSearch.value === true) {
				recCallNodes(false, "hidden", props.nodes);
			}
			if (keyWord.value === "" && props.model === "local") {
				recCallNodes(false, "hidden", props.nodes);
				searchKeyword();
			}
			if (keyWord.value === "" && props.model === "server") {
				serverRequest(props.serverSideConfig, `root`).then((data) => {
					currentNodes.value = data;
					for (let i = 0; i < currentNodes.value.length; i++) {
						currentNodes.value[i].state = {
							expanded: false,
							checked: false
						}
					}
				})
			}
		})
		const onNodeChecked = () => {
			context.emit("update:checkedNodes", getCheckedNodes(["text", "id"], false));
		}
		const onNodeEdited = () => {
			context.emit("update:modelValue", currentNodes.value)
		}
		return {
			styles,
			expandAllNodes,
			collapseAllNodes,
			force,
			currentNodes,
			onNodeAdded,
			onNodeDeleted,
			searchKeyword,
			onNodeChecked,
			keyWord,
			onNodeEdited
		};
	}
});
</script>