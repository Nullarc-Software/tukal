<template>
	<div class="showcase-component">
		<h3>Tree View:</h3>
		<hr />
		
		<!-- Basic Tree View -->
		<div style="margin: 20px 0; height: 200px; background-color: red;">
			<h4>Basic Tree View:</h4>
			<div style="flex: 1; min-height: 0;">
				<TuTreeView :nodes="basicTreeData" @node-click="onNodeClick" />
			</div>
			<p v-if="selectedNode" style="margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
				Selected: {{ selectedNode.text }}
			</p>
		</div>

		<!-- File System Tree -->
		<div style="margin: 20px 0;">
			<h4>File System Tree:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
				<TuTreeView :nodes="fileSystemData" @node-click="onFileClick" @node-expand="onNodeExpand">
					<template #node="{ node }">
						<div style="display: flex; align-items: center; gap: 8px;">
							<tu-icon :style="{ color: getFileColor(node) }">{{ getFileIcon(node) }}</tu-icon>
							<span>{{ node.text }}</span>
							<TuChip v-if="node.size" size="xs" color="default">{{ node.size }}</TuChip>
						</div>
					</template>
				</TuTreeView>
			</div>
		</div>

		<!-- Organization Chart -->
		<div style="margin: 20px 0;">
			<h4>Organization Chart:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<TuTreeView :nodes="organizationData" @node-click="onEmployeeClick">
					<template #node="{ node }">
						<div style="display: flex; align-items: center; gap: 10px; padding: 5px;">
							<TuAvatar :text="node.text.charAt(0)" size="24" />
							<div>
								<div style="font-weight: bold;">{{ node.text }}</div>
								<div style="font-size: 12px; color: #666;">{{ node.position }}</div>
							</div>
							<TuChip v-if="node.department" size="xs" :color="getDepartmentColor(node.department)">
								{{ node.department }}
							</TuChip>
						</div>
					</template>
				</TuTreeView>
			</div>
		</div>

		<!-- Interactive Tree with Checkboxes -->
		<div style="margin: 20px 0">
			<h4>Interactive Tree with Checkboxes:</h4>
			<div style="margin-bottom: 15px;">
				<TuButton @click="selectAll" size="sm">Select All</TuButton>
				<TuButton @click="deselectAll" size="sm" style="margin-left: 10px;">Deselect All</TuButton>
				<TuButton @click="expandAll" size="sm" style="margin-left: 10px;">Expand All</TuButton>
				<TuButton @click="collapseAll" size="sm" style="margin-left: 10px;">Collapse All</TuButton>
			</div>
			<TuTreeView 
				:nodes="checkboxTreeData" 
				:checkNode="true"
				@node-checked="onNodeCheck"
				@node-click="onCheckboxNodeClick"
			>
				<template #node="{ node }">
					<div style="display: flex; align-items: center; gap: 8px;">
						<tu-icon>{{ getNodeIcon(node.type) }}</tu-icon>
						<span>{{ node.text }}</span>
						<TuChip v-if="node.count" size="xs" color="info">{{ node.count }}</TuChip>
					</div>
				</template>
			</TuTreeView>
			<div v-if="checkedNodes.length > 0" style="margin-top: 15px; padding: 10px; background: #e7f3ff; border-radius: 4px;">
				<strong>Selected items ({{ checkedNodes.length }}):</strong>
				<div style="margin-top: 5px;">
					<TuTag v-for="node in checkedNodes" :key="node.id" size="sm" style="margin: 2px;">
						{{ node.text }}
					</TuTag>
				</div>
			</div>
		</div>

		<!-- Menu Tree -->
		<div style="margin: 20px 0;">
			<h4>Navigation Menu Tree:</h4>
			<div style="background: #2c3e50; color: white; padding: 20px; border-radius: 8px;">
				<TuTreeView :nodes="menuData" @node-click="onMenuClick" style="color: white;">
					<template #node="{ node }">
						<div style="display: flex; align-items: center; gap: 8px; color: white;">
							<tu-icon style="color: white;">{{ node.icon }}</tu-icon>
							<span>{{ node.label }}</span>
							<TuChip v-if="node.badge" size="xs" color="danger">{{ node.badge }}</TuChip>
						</div>
					</template>
				</TuTreeView>
			</div>
		</div>

		<!-- Dynamic Tree -->
		<div style="margin: 20px 0;">
			<h4>Dynamic Tree (Editable):</h4>
			<div style="margin-bottom: 15px;">
				<TuInput v-model="newNodeName" placeholder="Enter node name" style="margin-right: 10px;" />
				<TuButton @click="addNode" :disabled="!newNodeName.trim()">Add Node</TuButton>
			</div>
			<TuTreeView :nodes="dynamicTreeData" @node-click="onDynamicNodeClick">
				<template #node="{ node }">
					<div style="display: flex; align-items: center; gap: 8px; justify-content: space-between; width: 100%;">
						<div style="display: flex; align-items: center; gap: 8px;">
							<tu-icon>{{ node.type === 'folder' ? 'folder' : 'insert_drive_file' }}</tu-icon>
							<span>{{ node.label }}</span>
						</div>
						<div style="display: flex; gap: 5px;">
							<TuButton @click.stop="editNode(node)" size="xs">Edit</TuButton>
							<TuButton @click.stop="deleteNode(node.id)" size="xs" color="danger">Delete</TuButton>
						</div>
					</div>
				</template>
			</TuTreeView>
		</div>

		<!-- Project Structure Tree -->
		<div style="margin: 20px 0;">
			<h4>Project Structure:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
				<div style="display: flex; justify-content: between; align-items: center; margin-bottom: 15px;">
					<h5>Vue.js Project</h5>
					<TuChip color="success" size="sm">Active</TuChip>
				</div>
				<TuTreeView :nodes="projectStructure" @node-click="onProjectFileClick">
					<template #node="{ node }">
						<div style="display: flex; align-items: center; gap: 8px;">
							<tu-icon :style="{ color: getProjectFileColor(node) }">{{ getProjectFileIcon(node) }}</tu-icon>
							<span>{{ node.label }}</span>
							<TuChip v-if="node.status" size="xs" :color="getStatusColor(node.status)">
								{{ node.status }}
							</TuChip>
						</div>
					</template>
				</TuTreeView>
			</div>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Selected Node:</strong> {{ selectedNode?.text || 'None' }}</p>
				<p><strong>Checked Nodes:</strong> {{ checkedNodes.length }}</p>
				<p><strong>Dynamic Tree Nodes:</strong> {{ countNodes(dynamicTreeData) }}</p>
				<p><strong>Last Clicked File:</strong> {{ lastClickedFile || 'None' }}</p>
				<p><strong>Last Menu Action:</strong> {{ lastMenuAction || 'None' }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TuTreeView } from "../components/tuTreeView";
import { TuButton } from "../components/tuButton";
import { TuChip } from "../components/tuChip";
import { TuTag } from "../components/tuTag";
import { TuInput } from "../components/tuInput";
import { TuAvatar } from "../components/tuAvatar";
import type { NodeData } from "../components/tuTreeView/components/interface";

// Selected states
const selectedNode = ref<NodeData | null>(null);
const checkedNodes = ref<NodeData[]>([]);
const lastClickedFile = ref("");
const lastMenuAction = ref("");
const newNodeName = ref("");

// Basic tree data
const basicTreeData = ref([
	{
		id: "1",
		text: "Root Node",
		children: [
			{
				id: "2",
				text: "Child 1",
				children: [
					{ id: "3", text: "Grandchild 1" },
					{ id: "4", text: "Grandchild 2" }
				]
			},
			{
				id: "5",
				text: "Child 2",
				children: [
					{ id: "6", text: "Grandchild 3" }
				]
			}
		]
	}
]);

// File system data
const fileSystemData = ref<NodeData[]>([
	{
		id: "1",
		text: "Documents",
		children: [
			{ id: "2", text: "Resume.pdf" },
			{ id: "3", text: "Cover Letter.docx" },
			{
				id: "4",
				text: "Projects",
				children: [
					{ id: "5", text: "Project1.zip" },
					{ id: "6", text: "Project2.zip" }
				]
			}
		]
	},
	{
		id: "7",
		text: "Images",
		children: [
			{ id: "8", text: "vacation.jpg" },
			{ id: "9", text: "profile.png" }
		]
	},
	{
		id: "10",
		text: "Music",
		children: [
			{ id: "11", text: "song1.mp3" },
			{ id: "12", text: "song2.mp3" }
		]
	}
]);

// Organization data
const organizationData = ref([
	{
		id: "1",
		text: "John Doe",
		position: "CEO",
		department: "Executive",
		children: [
			{
				id: "2",
				text: "Jane Smith",
				position: "CTO",
				department: "Technology",
				children: [
					{ id: "3", text: "Bob Johnson", position: "Senior Developer", department: "Engineering" },
					{ id: "4", text: "Alice Brown", position: "DevOps Engineer", department: "Engineering" }
				]
			},
			{
				id: "5",
				text: "Charlie Wilson",
				position: "CFO",
				department: "Finance",
				children: [
					{ id: "6", text: "David Lee", position: "Accountant", department: "Finance" }
				]
			}
		]
	}
]);

// Checkbox tree data
const checkboxTreeData = ref([
	{
		id: "1",
		text: "All Categories",
		type: "category",
		children: [
			{
				id: "2",
				text: "Electronics",
				type: "category",
				count: 156,
				children: [
					{ id: "3", text: "Smartphones", type: "subcategory", count: 45 },
					{ id: "4", text: "Laptops", type: "subcategory", count: 32 },
					{ id: "5", text: "Tablets", type: "subcategory", count: 28 }
				]
			},
			{
				id: "6",
				text: "Clothing",
				type: "category",
				count: 203,
				children: [
					{ id: "7", text: "Men's", type: "subcategory", count: 98 },
					{ id: "8", text: "Women's", type: "subcategory", count: 105 }
				]
			}
		]
	}
]);

// Menu data
const menuData = ref<NodeData[]>([
	{
		id: "1",
		text: "Dashboard",
		icon: "dashboard",
		route: "/dashboard"
	},
	{
		id: "2",
		text: "Users",
		icon: "people",
		badge: "5",
		children: [
			{ id: "3", text: "All Users", icon: "person", route: "/users" },
			{ id: "4", text: "Add User", icon: "person_add", route: "/users/add" },
			{ id: "5", text: "User Roles", icon: "admin_panel_settings", route: "/users/roles" }
		]
	},
	{
		id: "6",
		text: "Products",
		icon: "inventory",
		children: [
			{ id: "7", text: "All Products", icon: "list", route: "/products" },
			{ id: "8", text: "Add Product", icon: "add", route: "/products/add" },
			{ id: "9", text: "Categories", icon: "category", route: "/products/categories" }
		]
	},
	{
		id: "10",
		text: "Reports",
		icon: "assessment",
		children: [
			{ id: "11", text: "Sales Report", icon: "trending_up", route: "/reports/sales" },
			{ id: "12", text: "User Report", icon: "people_outline", route: "/reports/users" }
		]
	},
	{
		id: "13",
		text: "Settings",
		icon: "settings",
		route: "/settings"
	}
] as NodeData[]);

// Clean menu data to remove children property from leaf nodes
function cleanMenuData(nodes: any[]) {
	for (const node of nodes) {
		if (node.children && Array.isArray(node.children) && node.children.length > 0) {
			cleanMenuData(node.children);
		} else {
			delete node.children;
		}
	}
}
cleanMenuData(menuData.value);

// Dynamic tree data
const dynamicTreeData = ref([
	{
		id: "1",
		text: "Root Folder",
		type: "folder",
		children: [
			{ id: "2", text: "Document 1", type: "file" },
			{ id: "3", text: "Document 2", type: "file" }
		]
	}
]);

let nextDynamicId = 4;

// Project structure
const projectStructure = ref([
	{
		id: "1",
		text: "src",
		type: "folder",
		children: [
			{
				id: "2",
				text: "components",
				type: "folder",
				children: [
					{ id: "3", text: "Header.vue", type: "vue", status: "modified" },
					{ id: "4", text: "Footer.vue", type: "vue", status: "clean" }
				]
			},
			{ id: "5", text: "main.ts", type: "typescript", status: "clean" },
			{ id: "6", text: "App.vue", type: "vue", status: "modified" }
		]
	},
	{
		id: "7",
		text: "public",
		type: "folder",
		children: [
			{ id: "8", text: "index.html", type: "html", status: "clean" }
		]
	},
	{ id: "9", text: "package.json", type: "json", status: "clean" },
	{ id: "10", text: "vite.config.ts", type: "typescript", status: "clean" }
] as any);

// Methods
const onNodeClick = (node: any) => {
	selectedNode.value = node;
	console.log("Node clicked:", node);
};

const onFileClick = (node: any) => {
	lastClickedFile.value = node.text;
	console.log("File clicked:", node);
};

const onEmployeeClick = (node: any) => {
	console.log("Employee clicked:", node);
};

const onNodeExpand = (node: any) => {
	console.log("Node expanded:", node);
};

const onNodeCheck = (checkedNodesList: any[]) => {
	checkedNodes.value = checkedNodesList;
};

const onCheckboxNodeClick = (node: any) => {
	console.log("Checkbox node clicked:", node);
};

const onMenuClick = (node: any) => {
	lastMenuAction.value = `Clicked: ${node.text}`;
	if (node.route) {
		console.log("Navigate to:", node.route);
	}
};

const onDynamicNodeClick = (node: any) => {
	console.log("Dynamic node clicked:", node);
};

const onProjectFileClick = (node: any) => {
	console.log("Project file clicked:", node);
};

// Helper methods
const getFileIcon = (node: any) => {
	if (node.type === "folder") return "folder";
	const extension = node.text.split(".").pop()?.toLowerCase();
	switch (extension) {
		case "pdf": return "picture_as_pdf";
		case "docx": return "description";
		case "zip": return "archive";
		case "jpg":
		case "png": return "image";
		case "mp3": return "music_note";
		default: return "insert_drive_file";
	}
};

const getFileColor = (node: any) => {
	if (node.type === "folder") return "#ffc107";
	return "#6c757d";
};

const getDepartmentColor = (department: string) => {
	switch (department) {
		case "Executive": return "danger";
		case "Technology": return "primary";
		case "Engineering": return "info";
		case "Finance": return "success";
		default: return "default";
	}
};

const getNodeIcon = (type: string) => {
	switch (type) {
		case "category": return "category";
		case "subcategory": return "subdirectory_arrow_right";
		default: return "label";
	}
};

const getProjectFileIcon = (node: any) => {
	if (node.type === "folder") return "folder";
	switch (node.type) {
		case "vue": return "code";
		case "typescript": return "code";
		case "html": return "web";
		case "json": return "data_object";
		default: return "insert_drive_file";
	}
};

const getProjectFileColor = (node: any) => {
	if (node.type === "folder") return "#ffc107";
	switch (node.type) {
		case "vue": return "#4fc08d";
		case "typescript": return "#007acc";
		case "html": return "#e34f26";
		case "json": return "#000000";
		default: return "#6c757d";
	}
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "modified": return "warning";
		case "clean": return "success";
		case "error": return "danger";
		default: return "default";
	}
};

const selectAll = () => {
	// Implementation would depend on the tree component API
	console.log("Select all nodes");
};

const deselectAll = () => {
	checkedNodes.value = [];
	console.log("Deselect all nodes");
};

const expandAll = () => {
	console.log("Expand all nodes");
};

const collapseAll = () => {
	console.log("Collapse all nodes");
};

const addNode = () => {
	if (newNodeName.value.trim()) {
		const newNode = {
			id: String(nextDynamicId++),
			text: newNodeName.value.trim(),
			type: "file"
		};
		
		// Add to root level for simplicity
		if (!dynamicTreeData.value[0].children) {
			dynamicTreeData.value[0].children = [];
		}
		dynamicTreeData.value[0].children.push(newNode);
		newNodeName.value = "";
	}
};

const editNode = (node: any) => {
	const newLabel = prompt("Edit node name:", node.text);
	if (newLabel !== null && newLabel.trim()) {
		node.text = newLabel.trim();
	}
};

const deleteNode = (nodeId: number) => {
	const deleteFromTree = (nodes: any[]): boolean => {
		for (let i = 0; i < nodes.length; i++) {
			if (nodes[i].id === nodeId) {
				nodes.splice(i, 1);
				return true;
			}
			if (nodes[i].children && deleteFromTree(nodes[i].children)) {
				return true;
			}
		}
		return false;
	};
	
	deleteFromTree(dynamicTreeData.value);
};

const countNodes = (nodes: any[]): number => {
	let count = 0;
	for (const node of nodes) {
		count++;
		if (node.children) {
			count += countNodes(node.children);
		}
	}
	return count;
};
</script>
