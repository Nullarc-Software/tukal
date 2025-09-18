<template>
	<div class="showcase-component">
		<h3>Tree View:</h3>
		<hr />
		
		<!-- Basic Tree View -->
		<div style="margin: 20px 0;">
			<h4>Basic Tree View:</h4>
			<tu-tree-view :data="basicTreeData" @node-click="onNodeClick" />
			<p v-if="selectedNode" style="margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
				Selected: {{ selectedNode.label }}
			</p>
		</div>

		<!-- File System Tree -->
		<div style="margin: 20px 0;">
			<h4>File System Tree:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; max-height: 400px; overflow-y: auto;">
				<tu-tree-view :data="fileSystemData" @node-click="onFileClick" @node-expand="onNodeExpand">
					<template #node="{ node }">
						<div style="display: flex; align-items: center; gap: 8px;">
							<tu-icon :style="{ color: getFileColor(node) }">{{ getFileIcon(node) }}</tu-icon>
							<span>{{ node.label }}</span>
							<TuChip v-if="node.size" size="xs" color="default">{{ node.size }}</TuChip>
						</div>
					</template>
				</tu-tree-view>
			</div>
		</div>

		<!-- Organization Chart -->
		<div style="margin: 20px 0;">
			<h4>Organization Chart:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<tu-tree-view :data="organizationData" @node-click="onEmployeeClick">
					<template #node="{ node }">
						<div style="display: flex; align-items: center; gap: 10px; padding: 5px;">
							<TuAvatar :text="node.label.charAt(0)" size="24" />
							<div>
								<div style="font-weight: bold;">{{ node.label }}</div>
								<div style="font-size: 12px; color: #666;">{{ node.position }}</div>
							</div>
							<TuChip v-if="node.department" size="xs" :color="getDepartmentColor(node.department)">
								{{ node.department }}
							</TuChip>
						</div>
					</template>
				</tu-tree-view>
			</div>
		</div>

		<!-- Interactive Tree with Checkboxes -->
		<div style="margin: 20px 0;">
			<h4>Interactive Tree with Checkboxes:</h4>
			<div style="margin-bottom: 15px;">
				<TuButton @click="selectAll" size="sm">Select All</TuButton>
				<TuButton @click="deselectAll" size="sm" style="margin-left: 10px;">Deselect All</TuButton>
				<TuButton @click="expandAll" size="sm" style="margin-left: 10px;">Expand All</TuButton>
				<TuButton @click="collapseAll" size="sm" style="margin-left: 10px;">Collapse All</TuButton>
			</div>
			<tu-tree-view 
				:data="checkboxTreeData" 
				checkable 
				@check="onNodeCheck"
				@node-click="onCheckboxNodeClick"
			>
				<template #node="{ node }">
					<div style="display: flex; align-items: center; gap: 8px;">
						<tu-icon>{{ getNodeIcon(node.type) }}</tu-icon>
						<span>{{ node.label }}</span>
						<TuChip v-if="node.count" size="xs" color="info">{{ node.count }}</TuChip>
					</div>
				</template>
			</tu-tree-view>
			<div v-if="checkedNodes.length > 0" style="margin-top: 15px; padding: 10px; background: #e7f3ff; border-radius: 4px;">
				<strong>Selected items ({{ checkedNodes.length }}):</strong>
				<div style="margin-top: 5px;">
					<TuTag v-for="node in checkedNodes" :key="node.id" size="sm" style="margin: 2px;">
						{{ node.label }}
					</TuTag>
				</div>
			</div>
		</div>

		<!-- Menu Tree -->
		<div style="margin: 20px 0;">
			<h4>Navigation Menu Tree:</h4>
			<div style="background: #2c3e50; color: white; padding: 20px; border-radius: 8px;">
				<tu-tree-view :data="menuData" @node-click="onMenuClick" style="color: white;">
					<template #node="{ node }">
						<div style="display: flex; align-items: center; gap: 8px; color: white;">
							<tu-icon style="color: white;">{{ node.icon }}</tu-icon>
							<span>{{ node.label }}</span>
							<TuChip v-if="node.badge" size="xs" color="danger">{{ node.badge }}</TuChip>
						</div>
					</template>
				</tu-tree-view>
			</div>
		</div>

		<!-- Dynamic Tree -->
		<div style="margin: 20px 0;">
			<h4>Dynamic Tree (Editable):</h4>
			<div style="margin-bottom: 15px;">
				<TuInput v-model="newNodeName" placeholder="Enter node name" style="margin-right: 10px;" />
				<TuButton @click="addNode" :disabled="!newNodeName.trim()">Add Node</TuButton>
			</div>
			<tu-tree-view :data="dynamicTreeData" @node-click="onDynamicNodeClick">
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
			</tu-tree-view>
		</div>

		<!-- Project Structure Tree -->
		<div style="margin: 20px 0;">
			<h4>Project Structure:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
				<div style="display: flex; justify-content: between; align-items: center; margin-bottom: 15px;">
					<h5>Vue.js Project</h5>
					<TuChip color="success" size="sm">Active</TuChip>
				</div>
				<tu-tree-view :data="projectStructure" @node-click="onProjectFileClick">
					<template #node="{ node }">
						<div style="display: flex; align-items: center; gap: 8px;">
							<tu-icon :style="{ color: getProjectFileColor(node) }">{{ getProjectFileIcon(node) }}</tu-icon>
							<span>{{ node.label }}</span>
							<TuChip v-if="node.status" size="xs" :color="getStatusColor(node.status)">
								{{ node.status }}
							</TuChip>
						</div>
					</template>
				</tu-tree-view>
			</div>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Selected Node:</strong> {{ selectedNode?.label || 'None' }}</p>
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

import { tuButton as TuButton } from "../components/tuButton";
import { tuChip as TuChip } from "../components/tuChip";
import { tuTag as TuTag } from "../components/tuTag";
import TuInput from "../components/tuInput";
import TuAvatar from "../components/tuAvatar";
// Selected states
const selectedNode = ref(null);
const checkedNodes = ref([]);
const lastClickedFile = ref("");
const lastMenuAction = ref("");
const newNodeName = ref("");

// Basic tree data
const basicTreeData = ref([
	{
		id: 1,
		label: "Root Node",
		children: [
			{
				id: 2,
				label: "Child 1",
				children: [
					{ id: 3, label: "Grandchild 1" },
					{ id: 4, label: "Grandchild 2" }
				]
			},
			{
				id: 5,
				label: "Child 2",
				children: [
					{ id: 6, label: "Grandchild 3" }
				]
			}
		]
	}
]);

// File system data
const fileSystemData = ref([
	{
		id: 1,
		label: "Documents",
		type: "folder",
		children: [
			{ id: 2, label: "Resume.pdf", type: "file", size: "245 KB" },
			{ id: 3, label: "Cover Letter.docx", type: "file", size: "127 KB" },
			{
				id: 4,
				label: "Projects",
				type: "folder",
				children: [
					{ id: 5, label: "Project1.zip", type: "file", size: "2.3 MB" },
					{ id: 6, label: "Project2.zip", type: "file", size: "1.8 MB" }
				]
			}
		]
	},
	{
		id: 7,
		label: "Images",
		type: "folder",
		children: [
			{ id: 8, label: "vacation.jpg", type: "file", size: "3.2 MB" },
			{ id: 9, label: "profile.png", type: "file", size: "567 KB" }
		]
	},
	{
		id: 10,
		label: "Music",
		type: "folder",
		children: [
			{ id: 11, label: "song1.mp3", type: "file", size: "4.1 MB" },
			{ id: 12, label: "song2.mp3", type: "file", size: "3.8 MB" }
		]
	}
]);

// Organization data
const organizationData = ref([
	{
		id: 1,
		label: "John Doe",
		position: "CEO",
		department: "Executive",
		children: [
			{
				id: 2,
				label: "Jane Smith",
				position: "CTO",
				department: "Technology",
				children: [
					{ id: 3, label: "Bob Johnson", position: "Senior Developer", department: "Engineering" },
					{ id: 4, label: "Alice Brown", position: "DevOps Engineer", department: "Engineering" }
				]
			},
			{
				id: 5,
				label: "Charlie Wilson",
				position: "CFO",
				department: "Finance",
				children: [
					{ id: 6, label: "David Lee", position: "Accountant", department: "Finance" }
				]
			}
		]
	}
]);

// Checkbox tree data
const checkboxTreeData = ref([
	{
		id: 1,
		label: "All Categories",
		type: "category",
		children: [
			{
				id: 2,
				label: "Electronics",
				type: "category",
				count: 156,
				children: [
					{ id: 3, label: "Smartphones", type: "subcategory", count: 45 },
					{ id: 4, label: "Laptops", type: "subcategory", count: 32 },
					{ id: 5, label: "Tablets", type: "subcategory", count: 28 }
				]
			},
			{
				id: 6,
				label: "Clothing",
				type: "category",
				count: 203,
				children: [
					{ id: 7, label: "Men's", type: "subcategory", count: 98 },
					{ id: 8, label: "Women's", type: "subcategory", count: 105 }
				]
			}
		]
	}
]);

// Menu data
const menuData = ref([
	{
		id: 1,
		label: "Dashboard",
		icon: "dashboard",
		route: "/dashboard"
	},
	{
		id: 2,
		label: "Users",
		icon: "people",
		badge: "5",
		children: [
			{ id: 3, label: "All Users", icon: "person", route: "/users" },
			{ id: 4, label: "Add User", icon: "person_add", route: "/users/add" },
			{ id: 5, label: "User Roles", icon: "admin_panel_settings", route: "/users/roles" }
		]
	},
	{
		id: 6,
		label: "Products",
		icon: "inventory",
		children: [
			{ id: 7, label: "All Products", icon: "list", route: "/products" },
			{ id: 8, label: "Add Product", icon: "add", route: "/products/add" },
			{ id: 9, label: "Categories", icon: "category", route: "/products/categories" }
		]
	},
	{
		id: 10,
		label: "Reports",
		icon: "assessment",
		children: [
			{ id: 11, label: "Sales Report", icon: "trending_up", route: "/reports/sales" },
			{ id: 12, label: "User Report", icon: "people_outline", route: "/reports/users" }
		]
	},
	{
		id: 13,
		label: "Settings",
		icon: "settings",
		route: "/settings"
	}
]);

// Dynamic tree data
const dynamicTreeData = ref([
	{
		id: 1,
		label: "Root Folder",
		type: "folder",
		children: [
			{ id: 2, label: "Document 1", type: "file" },
			{ id: 3, label: "Document 2", type: "file" }
		]
	}
]);

let nextDynamicId = 4;

// Project structure
const projectStructure = ref([
	{
		id: 1,
		label: "src",
		type: "folder",
		children: [
			{
				id: 2,
				label: "components",
				type: "folder",
				children: [
					{ id: 3, label: "Header.vue", type: "vue", status: "modified" },
					{ id: 4, label: "Footer.vue", type: "vue", status: "clean" }
				]
			},
			{ id: 5, label: "main.ts", type: "typescript", status: "clean" },
			{ id: 6, label: "App.vue", type: "vue", status: "modified" }
		]
	},
	{
		id: 7,
		label: "public",
		type: "folder",
		children: [
			{ id: 8, label: "index.html", type: "html", status: "clean" }
		]
	},
	{ id: 9, label: "package.json", type: "json", status: "clean" },
	{ id: 10, label: "vite.config.ts", type: "typescript", status: "clean" }
]);

// Methods
const onNodeClick = (node: any) => {
	selectedNode.value = node;
	console.log("Node clicked:", node);
};

const onFileClick = (node: any) => {
	lastClickedFile.value = node.label;
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
	lastMenuAction.value = `Clicked: ${node.label}`;
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
	const extension = node.label.split(".").pop()?.toLowerCase();
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
			id: nextDynamicId++,
			label: newNodeName.value.trim(),
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
	const newLabel = prompt("Edit node name:", node.label);
	if (newLabel !== null && newLabel.trim()) {
		node.label = newLabel.trim();
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
