<template>
	<div class="tree-test">
		<h2>Tree View Component Test</h2>
		
		<div class="test-section">
			<h3>Basic Tree</h3>
			<tu-tree-view 
				:nodes="basicTreeData"
				:check-node="false"
				:add-node="true"
				:edit-node="true"
				:remove-node="true"
				model="local"
				@node-added="onNodeAdded"
				@node-deleted="onNodeDeleted"
				@node-edited="onNodeEdited"
			/>
		</div>

		<div class="test-section">
			<h3>Tree with Checkboxes</h3>
			<tu-tree-view 
				:nodes="checkboxTreeData"
				:check-node="true"
				:expand-all="true"
				:collapse-all="true"
				model="local"
				@node-checked="onNodeChecked"
				@update:checked-nodes="onCheckedNodesUpdate"
			/>
		</div>

		<div class="test-section">
			<h3>Tree with Search</h3>
			<tu-tree-view 
				:nodes="searchTreeData"
				:filter-node="true"
				model="local"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TuTreeView } from "../index";
import type { NodeData, NodesProperties } from "../tuTreeView/components/interface";

const basicTreeData = ref<NodeData[]>([
	{
		id: "1",
		text: "Root Node 1",
		state: { checked: false, expanded: false, hidden: false },
		children: [
			{
				id: "1-1",
				text: "Child Node 1.1",
				state: { checked: false, expanded: false, hidden: false },
				children: [
					{
						id: "1-1-1",
						text: "Grandchild Node 1.1.1",
						state: { checked: false, expanded: false, hidden: false }
					}
				]
			},
			{
				id: "1-2", 
				text: "Child Node 1.2",
				state: { checked: false, expanded: false, hidden: false }
			}
		]
	},
	{
		id: "2",
		text: "Root Node 2",
		state: { checked: false, expanded: false, hidden: false },
		children: [
			{
				id: "2-1",
				text: "Child Node 2.1",
				state: { checked: false, expanded: false, hidden: false }
			}
		]
	}
]);

const checkboxTreeData = ref<NodeData[]>([
	{
		id: "c1",
		text: "Documents",
		state: { checked: false, expanded: false, hidden: false },
		children: [
			{
				id: "c1-1",
				text: "Reports",
				state: { checked: false, expanded: false, hidden: false },
				children: [
					{
						id: "c1-1-1",
						text: "Annual Report.pdf",
						state: { checked: false, expanded: false, hidden: false }
					},
					{
						id: "c1-1-2",
						text: "Monthly Report.pdf",
						state: { checked: false, expanded: false, hidden: false }
					}
				]
			},
			{
				id: "c1-2",
				text: "Images",
				state: { checked: false, expanded: false, hidden: false },
				children: [
					{
						id: "c1-2-1",
						text: "Logo.png",
						state: { checked: false, expanded: false, hidden: false }
					}
				]
			}
		]
	}
]);

const searchTreeData = ref<NodeData[]>([
	{
		id: "s1",
		text: "Project A",
		state: { checked: false, expanded: false, hidden: false },
		children: [
			{
				id: "s1-1",
				text: "Frontend Development",
				state: { checked: false, expanded: false, hidden: false }
			},
			{
				id: "s1-2",
				text: "Backend Development",
				state: { checked: false, expanded: false, hidden: false }
			},
			{
				id: "s1-3",
				text: "Testing",
				state: { checked: false, expanded: false, hidden: false }
			}
		]
	},
	{
		id: "s2",
		text: "Project B",
		state: { checked: false, expanded: false, hidden: false },
		children: [
			{
				id: "s2-1",
				text: "UI/UX Design",
				state: { checked: false, expanded: false, hidden: false }
			},
			{
				id: "s2-2",
				text: "Database Design",
				state: { checked: false, expanded: false, hidden: false }
			}
		]
	}
]);

const onNodeAdded = (node: NodeData) => {
	console.log("Node added:", node);
};

const onNodeDeleted = (node: NodeData) => {
	console.log("Node deleted:", node);
};

const onNodeEdited = (nodes: NodeData[]) => {
	console.log("Nodes edited:", nodes);
};

const onNodeChecked = (checkedNodes: NodesProperties[]) => {
	console.log("Node checked:", checkedNodes);
};

const onCheckedNodesUpdate = (checkedNodes: NodesProperties[]) => {
	console.log("Checked nodes updated:", checkedNodes);
};
</script>

<style scoped>
.tree-test {
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
}

.test-section {
	margin-bottom: 2rem;
	padding: 1rem;
	border: 1px solid #ddd;
	border-radius: 8px;
	background: #fafafa;
}

.test-section h3 {
	margin-top: 0;
	color: #333;
	font-size: 1.25rem;
}
</style>
