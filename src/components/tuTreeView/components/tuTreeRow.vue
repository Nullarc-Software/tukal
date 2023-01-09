<template>
	<li class="node" :class="[{ 'tree-node-hidden': currentNode.state?.hidden === true }, 'tree-row']"
		:data-id="currentNode.id">
		<div
			:class="['row_data', editSelected && isCheckNode ? 'position-bottom' : null, editSelected && !isCheckNode ? 'position-bottom-l' : null]">
			<span @click.stop="expandNode()">
				<tu-icon :class="[
	currentNode.state?.expanded
		? 'keyboard_arrow_down'
		: 'keyboard_arrow_right',
	currentNode.children != undefined &&
		(Array.isArray(currentNode.children) && currentNode.children.length > 0) || currentNode.children === true ?
		null : 'invisible'
]">
					keyboard_arrow_right
				</tu-icon>
			</span>
			<span>
				<slot v-if="$slots.customIcon && !loading" name="customIcon" />
				<tu-icon v-else-if="model === 'server' && currentNode.icon && !loading"
					:icon-pack="currentNode.iconPack" :icon="currentNode.icon" />
				<span v-else class="loading-icon" />
			</span>
			<div :class="[{ 'margin-left-loading': loading }, 'inline-block']">
				<tu-checkbox :eventBubble="true" v-if="isCheckNode" type="checkbox" :data-id="currentNode.id"
					:indeterminate="currentNode.state.partiallyChecked" :checked="
	currentNode.state.partiallyChecked
		? false
		: currentNode.state.checked
" @click="toggleCheckState(currentNode)">
					<div v-if="!editSelected">
						<span data-toggle="tooltip" data-placement="top" v-bind:class="[
	styles.text.class
]">
							{{ currentNode.text }}
						</span>
						<span v-if="isAddNode && model === 'local'" @click.stop="addNode(currentNode)"
							:class="styles.iconParent.class">
							<i v-bind:class="[
	styles.addNode.class
]" :style="styles.addNode.style">
							</i>
						</span>
						<span v-if="isEditNode && model === 'local'" @click.stop="editNode"
							:class="styles.iconParent.class">
							<i v-bind:class="[
	'icon-hover',
	styles.editNode.class
]" :style="styles.editNode.style">
							</i>
						</span>
						<span v-if="isRemoveNode && model === 'local'" @click.stop="removeNode(currentNode)"
							:class="styles.iconParent.class">
							<i v-bind:class="[
	'icon-hover',
	styles.deleteNode.class
]" :style="styles.deleteNode.style">
							</i>
						</span>
					</div>
					<span v-else-if="editSelected"><tu-input @focusOut="focusOut" @onEnter="focusOut"
							v-model="currentNode.text" /></span>
				</tu-checkbox>
				<div :class="['node-alignment']">
					<div v-if="!isCheckNode && !editSelected">
						<span data-toggle="tooltip" data-placement="top" v-bind:class="[
	styles.text.class
]">
							{{ currentNode.text }}
						</span>
						<span v-if="isAddNode && model === 'local'" @click.stop="addNode(currentNode)"
							:class="styles.iconParent.class">
							<i v-bind:class="[
	styles.addNode.class
]" :style="styles.addNode.style">
							</i>
						</span>
						<span v-if="isEditNode && model === 'local'" @click.stop="editNode"
							:class="styles.iconParent.class">
							<i v-bind:class="[
	'icon-hover',
	styles.editNode.class
]" :style="styles.editNode.style">
							</i>
						</span>
						<span v-if="isRemoveNode && model === 'local'" @click.stop="removeNode(currentNode)"
							:class="styles.iconParent.class">
							<i v-bind:class="[
	'icon-hover',
	styles.deleteNode.class
]" :style="styles.deleteNode.style">
							</i>
						</span>
					</div>
					<span v-if="editSelected && !isCheckNode"><tu-input @focusOut="focusOut" @onEnter="focusOut"
							v-model="currentNode.text" /></span>
				</div>
			</div>
		</div>
		<div :style="getHeight" v-if="currentNode.state?.expanded" class="line">
			<ul v-if="currentNode.state?.expanded && currentNode.children" :style="styles.rowIndent">
				<div style="display: contents;" v-if="Array.isArray(currentNode.children)">
					<tu-tree-row v-for="child in currentNode.children" :ref="`tree-row-` + (child as NodeData).id"
						:isCheckNode="isCheckNode" :isAddNode="isAddNode" :isRemoveNode="isRemoveNode"
						:keyWord="keyWord" :isEditNode="isEditNode" :icon="icon" :custom-styles="customStyles"
						:depth="depth + 1" :key="(child as NodeData).id" :node="child" :root="root"
						:parent-node="currentNode" :model="model" v-on:emitNodeExpanded="emitNodeExpanded"
						v-on:emitNodeSelected="emitNodeSelected" v-on:emitNodeDeleted="emitNodeDeleted"
						v-on:emitNodeAdded="onNodeAdded" v-on:emitParentNode="onParentNodeEmit"
						v-on:emitNodeChecked="onNodeChecked" v-on:emitNodeEdited="onNodeEdited">
						<template v-slot:customIcon>
							<slot v-if="$slots.customIcon" name="customIcon" />
						</template>
					</tu-tree-row>
				</div>
			</ul>
		</div>
	</li>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, Ref, nextTick, onMounted } from "vue";
import {
	NodeData,
	TreeRowCustomStyles,
	TuTreeServerModel
} from "./interface";
import { recCallNodes, serverRequest } from "./helper";
import tuComponent from "@/components/tuComponent";
export default defineComponent({
	name: "TuTreeRow",
	extends: tuComponent,
	props: {
		root: {},
		isCheckNode: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String,
			default: "file_copy"
		},
		isRemoveNode: {
			type: Boolean,
			default: false
		},
		isAddNode: {
			type: Boolean,
			default: false
		},
		isEditNode: {
			type: Boolean,
			default: false
		},
		customStyles: {
			type: Object as PropType<TreeRowCustomStyles>
		},
		search: {
			type: Boolean,
			default: false
		},
		node: Object as PropType<NodeData>,
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
		keyWord: {
			type: String,
			default: null
		},
		parentNode: Object as PropType<NodeData>,
		depth: Number
	},
	emits: [
		"emitNodeAdded",
		"emitNodeExpanded",
		"emitNodeSelected",
		"emitNodeDeleted",
		"emitParentNode",
		"emitNodeChecked",
		"emitNodeEdited"
	],
	setup(props, context) {
		const currentNode: Ref<NodeData> = ref(props.node);
		//const currentNodeIsPartiallyChecked = ref(false);
		const currentParentNode: Ref<NodeData> = ref(props.parentNode);
		const currentNodeCheckState = ref(currentNode.value.state.checked);
		const parentNodeIsPartialState: Ref<boolean> = ref(false);
		const itemRefs = ref(null);
		const editSelected = ref(false);
		const loading = ref(false);
		const styles: TreeRowCustomStyles = reactive({
			row: {
				style: {
					width: "500px",
					cursor: "pointer"
				},
				child: {
					class: "",
					style: {
						height: "35px"
					},
					active: {
						class: "",
						style: {
							height: "35px",
							backgroundColor: "rgb(240, 240, 240, 0.4)"
						}
					}
				}
			},
			rowIndent: {
				paddingLeft: "20px"
			},
			iconParent: {
				class: "icon_parent"
			},
			expanded: {
				class: "expanded_icon"
			},
			addNode: {
				class: "add_icon",
				style: {
					color: "#007AD5"
				}
			},
			editNode: {
				class: "edit_icon",
				style: {
					color: "#007AD5"
				}
			},
			deleteNode: {
				class: "delete_icon",
				style: {
					color: "#EE5F5B"
				}
			},
			selectIcon: {
				class: "folder_icon",
				style: {
					color: "#007AD5"
				},
				active: {
					class: "folder_icon_active",
					style: {
						color: "#2ECC71"
					}
				}
			},
			text: {
				style: {},
				active: {
					style: {
						"font-weight": "bold"
					}
				}
			},
		});
		// Default tree behavior when node is selected
		function toggleSelected() {
			currentNode.value.state.checked = !currentNode.value.state.checked
			currentNode.value.state.expanded =
				!currentNode.value.state.expanded;
		}

		// Redirect the event toward the Tree component
		function emitNodeSelected(nodeSelected: NodeData) {
			context.emit("emitNodeSelected", nodeSelected);
		}
		// Redirect the event toward the Tree component
		function emitNodeExpanded(node: NodeData, state: boolean) {
			context.emit("emitNodeExpanded", node, state);
		}
		function onNodeAdded(node: NodeData) {
			context.emit("emitNodeAdded", node);
		}
		function emitNodeDeleted(node: NodeData, isSingleNode?: boolean) {
			context.emit("emitNodeDeleted", node, isSingleNode);
		}
		const expandNode = (server?: boolean) => {
			currentNode.value.state.expanded =
				!currentNode.value.state.expanded;
			if (props.model === "server" && currentNode.value.state?.expanded === true) {
				if (currentNode.value.children === true) {
					loading.value = true;
				}
				let query = `?expand=${currentNode.value.id}`
				serverRequest(props.serverSideConfig, query).then((data) => {
					currentNode.value.children = data;
					console.log(currentNode.value.children);
					loading.value = false;
					for (let i = 0; i < currentNode.value.children.length; i++) {
						currentNode.value.children[i].state = {
							expanded: false,
							hidden: data[i].state.hidden,
							checked: currentNode.value.state.checked,
						}
					}
				});
			}
		}
		const isAllCheck = (node: NodeData) => {
			if (node.children === undefined || node.children === null) return false;
			else if (Array.isArray(node.children)) {
				for (let i = 0; i < node.children.length; i++) {
					if (node.children[i].state.checked === true) {
						if (i === node.children.length - 1) return true;
						else continue;
					}
					else return false;
				}
			}
		};
		const atleastOneCheck = (node: NodeData) => {
			if (node.children === undefined || node.children === null) return false;
			else if (Array.isArray(node.children)) {
				for (let i = 0; i < node.children.length; i++)
					if (node.children[i].state.checked === true || node.children[i].state.partiallyChecked) return true;
			}

			return false;
		};
		const onParentNodeEmit = (node: NodeData, isCheckParent?: boolean) => {
			if (!isCheckParent || isCheckParent === undefined) {
				if (node === currentNode.value) {
					if (isAllCheck(currentNode.value)) {
						currentNode.value.state.checked = true;
						currentNode.value.state.partiallyChecked = false;
					}
					if (atleastOneCheck(currentNode.value) && !isAllCheck(currentNode.value)) {
						currentNode.value.state.partiallyChecked = true;
						currentNode.value.state.checked = false;
					}
					else if (!atleastOneCheck(currentNode.value) && !isAllCheck(currentNode.value)) {
						currentNode.value.state.checked = false;
						currentNode.value.state.partiallyChecked = false;
					}
				}
			}
			else {
				if (isAllCheck(currentNode.value)) {
					currentNode.value.state.checked = true;
					currentNode.value.state.partiallyChecked = false;
				}
				else if (atleastOneCheck(currentNode.value)) {
					currentNode.value.state.partiallyChecked = true;
					currentNode.value.state.checked = false;
				}
				else {
					if (
						currentNode.value.state.partiallyChecked === true &&
						!atleastOneCheck(currentNode.value)
					) {
						currentNode.value.state.partiallyChecked = false;
						currentNode.value.state.checked = false;
					}
				}
			}
			nextTick(() => {
				context.emit("emitParentNode", currentParentNode.value);
			});
		};
		function toggleCheckState(node: NodeData) {
			// if checkbox partailly checked make it true and all child children true else toggle true or false
			if (currentNode.value.state.partiallyChecked === true) {
				currentNode.value.state.partiallyChecked = false;
				currentNode.value.state.checked = false;
			}
			else {
				currentNode.value.state.checked =
					!currentNode.value.state.checked;
			}
			// if parent node is true and current node is false emit to parent node to make parent children partially checked
			if (
				currentParentNode.value.state.checked === true &&
				currentNode.value.state.checked === false
			)
				context.emit("emitParentNode", currentParentNode.value);
			// else emit to parent node and check if parent children are all checked if so make parent node checkbox true
			else context.emit("emitParentNode", currentParentNode.value, true);
			// if child children exist make all child children true
			recCallNodes(
				currentNode.value.state.checked,
				"checked",
				node.children as NodeData[]
			);
			context.emit("emitNodeChecked");
		}
		const getHeight = () => {
			const heightNum = (currentNode.value.children as NodeData[]).length * 35 + 35;
			return {
				height: heightNum + "px"
			};
		}
		const removeNode = (node) => {
			if (node === currentParentNode.value)
				emitNodeDeleted(node);
			else {
				if (Array.isArray(currentParentNode.value.children)) {
					for (let i = 0; i < currentParentNode.value.children.length; i++) {
						if (node.id === currentParentNode.value.children[i].id) {
							currentParentNode.value.children.splice(i, 1);
							emitNodeDeleted(currentParentNode.value, true);
						}
					}
				}
			}
		};
		const addNode = (node) => {
			currentNode.value.state.checked = !currentNode.value.state.checked;
			currentNode.value.state.expanded = true;
			const newNode = {
				text: "new Node",
				id: Math.floor(Math.random() * 100).toString(),
				state: { checked: false, expanded: false, hidden: false }
			};
			if (node.children === undefined) node.children = [newNode];
			else node.children.push(newNode);
			currentNode.value = node;
			context.emit("emitNodeAdded", currentNode.value);
		};
		const editNode = () => {
			currentNode.value.state.checked = !currentNode.value.state.checked;
			editSelected.value = true;
		};
		const focusOut = () => {
			editSelected.value = false;
			if (currentNode.value.text === "")
				currentNode.value.text = "untitled";
			context.emit("emitNodeEdited")
		};
		const onNodeChecked = () => {
			context.emit("emitNodeChecked");
		}
		const onNodeEdited = () => {
			context.emit("emitNodeEdited");
		}
		return {
			styles,
			toggleCheckState,
			toggleSelected,
			emitNodeExpanded,
			emitNodeSelected,
			emitNodeDeleted,
			onNodeAdded,
			currentNode,
			addNode,
			removeNode,
			expandNode,
			parentNodeIsPartialState,
			onParentNodeEmit,
			itemRefs,
			currentNodeCheckState,
			getHeight,
			editNode,
			editSelected,
			focusOut,
			onNodeChecked,
			onNodeEdited,
			loading
		};
	}
});
</script>
<style lang="scss" scoped>
@import "../../../style/sass/_mixins.scss";

.small-tree-indent {
	margin: 0 3px;
	display: inline-block;
}

.icon-hover {
	visibility: hidden;
	opacity: 0;
	transition: all 0.2s ease-in-out;
}

.row_data:hover .icon-hover {
	visibility: visible;
	opacity: 1;
}

.capitalize {
	text-transform: capitalize;
}

.badge {
	font-size: 12px;
	font-weight: normal;
}

li {
	list-style: none;
}

.icon_parent {
	background: transparent;
	width: 20px;
	height: 20px;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	margin: 0 2px 0 0;

	i {
		font-size: 16px;
		line-height: 10px;
	}

	&:last-child {
		margin: 0;
	}
}

div.row_data {
	&:hover {
		background-color: -getColor("gray-2");
	}
}

.expanded_icon {
	transform: rotate(0deg);
	transition: all ease 0.2s;
	display: inline-block;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 4px 0 4px 8px;
	border-color: transparent transparent transparent #555;

	&.expanded {
		transform: rotate(90deg);
	}
}

.inline-block {
	display: inline-block;
}

.add_icon:before {
	content: "\002b";
}

.edit_icon:before {
	content: "\00270e";
}

.delete_icon:before {
	content: "\00d7";
}

.keyboard_arrow_down {
	transform: rotateY(0deg) rotate(90deg);
	transition: 0.5s;
}

.keyboard_arrow_right {
	transition: 0.5s;
}

.invisible {
	visibility: hidden;
}

ul {
	animation-duration: 1s;
	animation-name: animate-fade;
	animation-fill-mode: forwards;
}

@keyframes animate-fade {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

.elevate-input {
	position: relative;
	bottom: 10px;
}

.node-alignment {
	position: relative;
	bottom: 8px;
	left: 5px;
}

.line {
	border-left: 1px solid green;
	position: relative;
	left: 12.5px;
}


.position-bottom-l {
	position: relative;
	bottom: 10px;
}

.tree-node-hidden {
	display: none;
}

.tree-row {
	width: 500px;
	cursor: pointer;
}

.loading-icon {
	position: absolute;
	width: 22px;
	height: 22px;
	margin-left: 5px;
	margin-top: 2px;
	pointer-events: none;
	border-radius: 50%;
	box-sizing: border-box;
	background: inherit;
	cursor: default;

	&:after {
		box-sizing: border-box;
		position: absolute;
		width: 100%;
		height: 100%;
		border: 2px solid -getColor("primary");
		border-radius: inherit;
		border-top: 2px solid transparent;
		border-left: 2px solid transparent;
		border-right: 2px solid transparent;
		animation: rotateInputLoading 0.8s ease infinite;
		top: 0px;
		content: "";
	}

	&:before {
		box-sizing: border-box;
		top: 0px;
		position: absolute;
		width: 100%;
		height: 100%;
		border: 2px dashed blue;
		border-radius: inherit;
		border-top: 2px solid transparent;
		border-left: 2px solid transparent;
		border-right: 2px solid transparent;
		animation: rotateInputLoading 0.8s linear infinite;
		opacity: 0.2;
		content: "";
	}
}

@keyframes rotateInputLoading {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.margin-left-loading {
	margin-left: 30px;
}
</style>