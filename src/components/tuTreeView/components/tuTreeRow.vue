<template>
	<li 
		class="tu-tree-row" 
		:class="{ 'tu-tree-row--hidden': currentNode.state?.hidden === true }"
		:data-id="currentNode.id"
	>
		<div 
			class="tu-tree-row__content"
			:class="{
				'tu-tree-row__content--edit-checkbox': editSelected && isCheckNode,
				'tu-tree-row__content--edit-normal': editSelected && !isCheckNode
			}"
		>
			<span class="tu-tree-row__expand" @click.stop="expandNode()">
				<span 
					class="tu-tree-row__expand-icon"
					:class="[
						currentNode.state?.expanded
							? 'tu-tree-row__expand-icon--expanded'
							: 'tu-tree-row__expand-icon--collapsed',
						currentNode.children != undefined &&
							(Array.isArray(currentNode.children) && currentNode.children.length > 0) || currentNode.children === true ?
							null : 'tu-tree-row__expand-icon--invisible'
					]"
				>
				</span>
			</span>
			
			<span 
				v-if="shouldShowIcon"
				class="tu-tree-row__icon"
			>
				<slot v-if="$slots.customIcon && !loading" name="customIcon" />
				<tu-icon 
					v-else-if="(model === 'server' && currentNode.icon && !loading) || (icon && !loading)"
					:icon-pack="currentNode.iconPack" 
					:icon="icon || currentNode.icon" 
				/>
				<span v-else-if="loading" class="tu-tree-row__loading" />
			</span>
			
			<div 
				class="tu-tree-row__main"
				:class="{ 'tu-tree-row__main--loading': loading }"
			>
				<tuCheckBox 
					v-if="isCheckNode" 
					class="tu-tree-row__checkbox"
					:eventBubble="true"
					type="checkbox" 
					:data-id="currentNode.id"
					:indeterminate="currentNode.state?.partiallyChecked" 
					:checked="currentNode.state?.partiallyChecked ? false : currentNode.state?.checked"
					@click="toggleCheckState(currentNode)"
				>
					<div v-if="!editSelected" class="tu-tree-row__node-content">
						<span 
							class="tu-tree-row__text"
							:class="styles.text.class"
							data-toggle="tooltip" 
							data-placement="top"
						>
							{{ currentNode.text }}
						</span>
						<span 
							v-if="isAddNode && model === 'local'" 
							class="tu-tree-row__action tu-tree-row__action--add"
							:class="styles.iconParent.class"
							@click.stop="addNode(currentNode)"
						>
							<i 
								class="tu-tree-row__action-icon"
								:class="styles.addNode.class" 
								:style="styles.addNode.style"
							/>
						</span>
						<span 
							v-if="isEditNode && model === 'local'" 
							class="tu-tree-row__action tu-tree-row__action--edit"
							:class="styles.iconParent.class"
							@click.stop="editNode"
						>
							<i 
								class="tu-tree-row__action-icon tu-tree-row__action-icon--hover"
								:class="styles.editNode.class" 
								:style="styles.editNode.style"
							/>
						</span>
						<span 
							v-if="isRemoveNode && model === 'local'" 
							class="tu-tree-row__action tu-tree-row__action--remove"
							:class="styles.iconParent.class"
							@click.stop="removeNode(currentNode)"
						>
							<i 
								class="tu-tree-row__action-icon tu-tree-row__action-icon--hover"
								:class="styles.deleteNode.class" 
								:style="styles.deleteNode.style"
							/>
						</span>
					</div>
					<span v-else-if="editSelected" class="tu-tree-row__edit">
						<tu-input 
							@focusOut="focusOut" 
							@onEnter="focusOut"
							v-model="currentNode.text" 
						/>
					</span>
				</tuCheckBox>
				
				<div v-else class="tu-tree-row__node-alignment">
					<div v-if="!editSelected" class="tu-tree-row__node-content">
						<span 
							class="tu-tree-row__text"
							:class="styles.text.class"
							data-toggle="tooltip" 
							data-placement="top"
						>
							{{ currentNode.text }}
						</span>
						<span 
							v-if="isAddNode && model === 'local'" 
							class="tu-tree-row__action tu-tree-row__action--add"
							:class="styles.iconParent.class"
							@click.stop="addNode(currentNode)"
						>
							<i 
								class="tu-tree-row__action-icon"
								:class="styles.addNode.class" 
								:style="styles.addNode.style"
							/>
						</span>
						<span 
							v-if="isEditNode && model === 'local'" 
							class="tu-tree-row__action tu-tree-row__action--edit"
							:class="styles.iconParent.class"
							@click.stop="editNode"
						>
							<i 
								class="tu-tree-row__action-icon tu-tree-row__action-icon--hover"
								:class="styles.editNode.class" 
								:style="styles.editNode.style"
							/>
						</span>
						<span 
							v-if="isRemoveNode && model === 'local'" 
							class="tu-tree-row__action tu-tree-row__action--remove"
							:class="styles.iconParent.class"
							@click.stop="removeNode(currentNode)"
						>
							<i 
								class="tu-tree-row__action-icon tu-tree-row__action-icon--hover"
								:class="styles.deleteNode.class" 
								:style="styles.deleteNode.style"
							/>
						</span>
					</div>
					<span v-if="editSelected" class="tu-tree-row__edit">
						<tu-input 
							@focusOut="focusOut" 
							@onEnter="focusOut"
							v-model="currentNode.text" 
						/>
					</span>
				</div>
			</div>
		</div>
		
		<div 
			v-if="currentNode.state?.expanded" 
			class="tu-tree-row__children"
		>
			<ul 
				v-if="currentNode.state?.expanded && currentNode.children" 
				class="tu-tree-row__children-list"
				:style="styles.rowIndent"
			>
				<div style="display: contents;" v-if="Array.isArray(currentNode.children)">
					<tu-tree-row 
						v-for="child in currentNode.children" 
						:ref="`tree-row-` + (child as NodeData).id"
						:is-check-node="isCheckNode" 
						:is-add-node="isAddNode" 
						:is-remove-node="isRemoveNode"
						:key-word="keyWord" 
						:is-edit-node="isEditNode" 
						v-bind="(child as NodeData).icon ? { icon: (child as NodeData).icon } : {}"
						:custom-styles="customStyles"
						:depth="depth + 1" 
						:key="(child as NodeData).id" 
						:node="child" 
						:root="root"
						:parent-node="currentNode" 
						:model="model" 
						@node-expanded="emitNodeExpanded"
						@node-selected="emitNodeSelected" 
						@node-deleted="emitNodeDeleted"
						@node-added="onNodeAdded" 
						@parent-node="onParentNodeEmit"
						@node-checked="onNodeChecked" 
						@node-edited="onNodeEdited"
					>
						<template v-slot:customIcon>
							<slot v-if="$slots.customIcon" name="customIcon" />
						</template>
					</tu-tree-row>
				</div>
			</ul>
		</div>
	</li>
</template>
<script setup lang="ts">
import { reactive, ref, Ref, nextTick, computed, useSlots } from "vue";
import {
	NodeData,
	TreeRowCustomStyles,
	TuTreeServerModel
} from "./interface";
import { recCallNodes, serverRequest } from "./helper";
import { TuCheckbox } from "../../tuCheckBox";
import { TuIcon } from "../../tuIcon";
import { TuInput } from "../../tuInput";

defineOptions({
	name: "TuTreeRow"
});

interface Props {
	root?: unknown;
	isCheckNode?: boolean;
	icon?: string;
	isRemoveNode?: boolean;
	isAddNode?: boolean;
	isEditNode?: boolean;
	customStyles?: TreeRowCustomStyles;
	search?: boolean;
	node?: NodeData;
	model?: string;
	serverSideConfig?: TuTreeServerModel;
	keyWord?: string;
	parentNode?: NodeData;
	depth?: number;
}

const props = withDefaults(defineProps<Props>(), {
	isCheckNode: false,
	icon: "file_copy",
	isRemoveNode: false,
	isAddNode: false,
	isEditNode: false,
	search: false,
	model: "local",
	serverSideConfig: (): TuTreeServerModel => ({ url: "" }),
	keyWord: undefined,
	depth: 1
});

const emit = defineEmits<{
	"node-added": [node: NodeData];
	"node-expanded": [node: NodeData, state: boolean];
	"node-selected": [node: NodeData];
	"node-deleted": [node: NodeData, isSingleNode?: boolean];
	"parent-node": [node: NodeData];
	"node-checked": [node: NodeData, state: boolean];
	"node-edited": [node: NodeData];
}>();

const currentNode: Ref<NodeData> = ref(props.node || { id: "", text: "", state: { checked: false, expanded: false, hidden: false } });
const currentParentNode: Ref<NodeData> = ref(props.parentNode || { id: "", text: "", state: { checked: false, expanded: false, hidden: false } });
const editSelected = ref(false);
const loading = ref(false);

const styles: TreeRowCustomStyles = reactive({
	row: {
		style: {
			width: "100%",
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

// Computed property to determine if icon should be shown
const slots = useSlots();
const shouldShowIcon = computed(() => {
	// Show icon if there's a custom icon slot being used
	if (slots.customIcon) return true;
	
	// Show icon if it's server model and node has an icon
	if (props.model === "server" && currentNode.value.icon) return true;
	
	// Show loading state
	if (loading.value) return true;
	
	// Show icon if explicitly passed as prop and not undefined/null
	if (props.icon && props.icon !== undefined && props.icon !== null) return true;
	
	// Otherwise, don't show icon
	return false;
});

// Redirect the event toward the Tree component
function emitNodeSelected(nodeSelected: NodeData) {
	emit("node-selected", nodeSelected);
}

// Redirect the event toward the Tree component
function emitNodeExpanded(node: NodeData, state?: boolean) {
	emit("node-expanded", node, state as boolean);
}

function onNodeAdded(node: NodeData) {
	emit("node-added", node);
}

function emitNodeDeleted(node: NodeData, isSingleNode?: boolean) {
	emit("node-deleted", node, isSingleNode);
}

const expandNode = () => {
	if (!currentNode.value.state) return;
	
	currentNode.value.state.expanded = !currentNode.value.state.expanded;
	
	if (props.model === "server" && currentNode.value.state.expanded === true) {
		if (currentNode.value.children === true) 
			loading.value = true;
				
		const query = `?expand=${currentNode.value.id}`;
		serverRequest(props.serverSideConfig, query).then((data) => {
			currentNode.value.children = data;
			loading.value = false;
			if (Array.isArray(data)) {
				for (let i = 0; i < data.length; i++) {
					data[i].state = {
						expanded: false,
						hidden: data[i].state?.hidden || false,
						checked: currentNode.value.state?.checked || false,
					};
				}
			}
		});
	}
};

const isAllCheck = (node: NodeData): boolean => {
	if (!node.children || !Array.isArray(node.children)) return false;
	
	return node.children.every(child => child.state?.checked === true);
};

const atleastOneCheck = (node: NodeData): boolean => {
	if (!node.children || !Array.isArray(node.children)) return false;
	
	return node.children.some(child => 
		child.state?.checked === true || child.state?.partiallyChecked === true
	);
};

const onParentNodeEmit = (node: NodeData, isCheckParent?: boolean) => {
	if (!currentNode.value.state) return;
	
	if (!isCheckParent) {
		if (node === currentNode.value) {
			if (isAllCheck(currentNode.value)) {
				currentNode.value.state.checked = true;
				currentNode.value.state.partiallyChecked = false;
			}
			else if (atleastOneCheck(currentNode.value)) {
				currentNode.value.state.partiallyChecked = true;
				currentNode.value.state.checked = false;
			}
			else {
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
		else if (currentNode.value.state.partiallyChecked && !atleastOneCheck(currentNode.value)) {
			currentNode.value.state.partiallyChecked = false;
			currentNode.value.state.checked = false;
		}
	}
	
	nextTick(() => {
		emit("parent-node", currentParentNode.value);
	});
};

function toggleCheckState(node: NodeData) {
	if (!currentNode.value.state || !currentParentNode.value.state) return;
	
	// If checkbox partially checked make it false, else toggle true/false
	if (currentNode.value.state.partiallyChecked === true) {
		currentNode.value.state.partiallyChecked = false;
		currentNode.value.state.checked = false;
	}
	else 
		currentNode.value.state.checked = !currentNode.value.state.checked;
	
	
	// Check parent node state and emit accordingly
	if (currentParentNode.value.state.checked === true && currentNode.value.state.checked === false) 
		emit("parent-node", currentParentNode.value);
	
	else 
		emit("parent-node", currentParentNode.value);
	
	
	// Update all child nodes
	if (node.children && Array.isArray(node.children)) 
		recCallNodes(currentNode.value.state.checked, "checked", node.children);
	
	
	emit("node-checked", currentNode.value, currentNode.value.state.checked);
}

const removeNode = (node: NodeData) => {
	if (node === currentParentNode.value) 
		emitNodeDeleted(node);
	
	else if (currentParentNode.value.children && Array.isArray(currentParentNode.value.children)) {
		const index = currentParentNode.value.children.findIndex(child => child.id === node.id);
		if (index !== -1) {
			currentParentNode.value.children.splice(index, 1);
			emitNodeDeleted(currentParentNode.value, true);
		}
	}
};

const addNode = (node: NodeData) => {
	if (!currentNode.value.state) return;
	
	currentNode.value.state.expanded = true;
	const newNode: NodeData = {
		text: "new Node",
		id: Math.floor(Math.random() * 100).toString(),
		state: { checked: false, expanded: false, hidden: false }
	};
	
	if (!node.children) 
		node.children = [newNode];
	
	else if (Array.isArray(node.children)) 
		node.children.push(newNode);
	
	
	currentNode.value = node;
	emit("node-added", currentNode.value);
};

const editNode = () => {
	editSelected.value = true;
};

const focusOut = () => {
	editSelected.value = false;
	if (currentNode.value.text === "") 
		currentNode.value.text = "untitled";
	
	emit("node-edited", currentNode.value);
};

const onNodeChecked = () => {
	emit("node-checked", currentNode.value, currentNode.value.state?.checked || false);
};

const onNodeEdited = () => {
	emit("node-edited", currentNode.value);
};
</script>
<style lang="scss" scoped>
@import "../../../style/sass/_functions.scss";

.tu-tree-row {
	list-style: none;
	margin: 0;
	padding: 0;
	position: relative;

	&--hidden {
		display: none;
	}

	&__content {
		display: flex;
		align-items: center;
		min-height: 28px;
		padding: 2px 8px;
		cursor: pointer;
		border-radius: 4px;
		transition: all 0.15s ease;
		user-select: none;
		position: relative;
		gap: 2px;

		&:hover {
			background-color: var(--tu-gray-1, rgba(0, 0, 0, 0.04));

			.tu-tree-row__action-icon--hover {
				visibility: visible;
				opacity: 1;
			}
		}

		&--selected {
			background-color: rgba(var(--tu-primary-rgb, 25, 118, 210), 0.08);
			color: var(--tu-primary, #1976d2);
		}

		&--edit-checkbox,
		&--edit-normal {
			background-color: rgba(var(--tu-warn-rgb, 255, 193, 7), 0.08);
		}
	}

	&__expand {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		margin-right: 2px;
		cursor: pointer;
		border-radius: 2px;
		transition: all 0.15s ease;
		flex-shrink: 0;

		&:hover {
			background-color: var(--tu-gray-1, rgba(0, 0, 0, 0.08));
		}
	}

	&__expand-icon {
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 5px 0 5px 8px;
		border-color: transparent transparent transparent var(--tu-gray-3, #999);
		transform: rotate(0deg);
		transition: transform 0.15s ease;

		&--expanded {
			transform: rotate(90deg);
		}

		&--collapsed {
			transform: rotate(0deg);
		}

		&--invisible {
			visibility: hidden;
		}
	}

	&__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		margin-right: 4px;
		font-size: 14px;
		color: #666;
		flex-shrink: 0;
	}

	&__loading {
		position: relative;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		flex-shrink: 0;
		margin-right: 6px;

		&::after {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 2px solid #e0e0e0;
			border-top: 2px solid #666;
			border-radius: 50%;
			animation: tu-tree-row-spin 1s linear infinite;
			content: "";
		}
	}

	&__main {
		flex: 1;
		display: flex;
		align-items: center;
		min-width: 0;
		gap: 4px;

		&--loading {
			margin-left: 24px;
		}
	}

	&__checkbox {
		flex-shrink: 0;
	}

	&__node-content {
		display: flex;
		align-items: center;
		flex: 1;
		min-width: 0;
	}

	&__text {
		flex: 1;
		min-width: 0;
		padding: 2px 0;
		font-size: 14px;
		line-height: 20px;
		color: var(--tu-text, #333);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
	}

	&__edit {
		flex: 1;
		min-width: 0;
		margin: 0;
		padding: 2px 6px;
		border: 1px solid var(--tu-gray-3, #ddd);
		border-radius: 3px;
		font-size: 14px;
		line-height: 18px;
		background: var(--tu-background, white);
		outline: none;

		&:focus {
			border-color: var(--tu-primary, #1976d2);
			box-shadow: 0 0 0 2px rgba(var(--tu-primary-rgb, 25, 118, 210), 0.2);
		}
	}

	&__action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		margin-left: 2px;
		background: transparent;
		border: none;
		cursor: pointer;
		border-radius: 2px;
		font-size: 14px;
		transition: all 0.15s ease;

		&:hover {
			background-color: rgba(0, 0, 0, 0.08);
		}

		&--add {
			color: var(--tu-primary, #1976d2);

			&:hover {
				background-color: rgba(var(--tu-primary-rgb, 25, 118, 210), 0.08);
			}

			&::before {
				content: "+";
				font-weight: bold;
			}
		}

		&--edit {
			color: var(--tu-warn, #ff9800);

			&:hover {
				background-color: rgba(var(--tu-warn-rgb, 255, 152, 0), 0.08);
			}

			&::before {
				content: "✎";
			}
		}

		&--remove {
			color: var(--tu-danger, #f44336);

			&:hover {
				background-color: rgba(var(--tu-danger-rgb, 244, 67, 54), 0.08);
			}

			&::before {
				content: "×";
				font-size: 16px;
				font-weight: bold;
			}
		}
	}

	&__action-icon {
		font-size: 14px;
		line-height: 1;

		&--hover {
			visibility: hidden;
			opacity: 0;
			transition: all 0.15s ease;
		}
	}

	&__children {
		position: relative;
		margin-left: 16px;
		margin-bottom: 2px;

		&::before {
			content: '';
			position: absolute;
			left: -3px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: var(--tu-gray-2, #e0e0e0);
		}
	}

	&__children-list {
		margin: 0;
		padding: 0;
		list-style: none;
		animation: tu-tree-row-fade 0.2s ease;
	}
}

// Animations
@keyframes tu-tree-row-spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

@keyframes tu-tree-row-fade {
	0% {
		opacity: 0;
		transform: translateY(-4px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

// Backward compatibility icon classes (cleaned up)
.icon_parent {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	margin-right: 4px;

	i {
		font-size: 14px;
	}
}

.expanded_icon {
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 4px 0 4px 6px;
	border-color: transparent transparent transparent #666;
	transform: rotate(0deg);
	transition: transform 0.15s ease;

	&.expanded {
		transform: rotate(90deg);
	}
}

// Legacy icon content (simplified)
.add_icon::before { content: "+"; }
.edit_icon::before { content: "✎"; }
.delete_icon::before { content: "×"; }

.invisible {
	visibility: hidden;
}

// Utility classes
.capitalize {
	text-transform: capitalize;
}

.badge {
	font-size: 12px;
	font-weight: normal;
}

.inline-block {
	display: inline-block;
}

// High contrast mode support
@media (prefers-contrast: high) {
	.tu-tree-row__content {
		border: 1px solid transparent;

		&:hover {
			border-color: currentColor;
		}

		&--selected {
			border-color: #1976d2;
		}
	}
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
	.tu-tree-row__expand-icon,
	.tu-tree-row__content,
	.tu-tree-row__action {
		transition: none;
	}

	@keyframes tu-tree-row-spin {
		0%, 100% { transform: rotate(0deg); }
	}
}
</style>
