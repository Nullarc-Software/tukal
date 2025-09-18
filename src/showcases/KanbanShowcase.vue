<template>
	<div class="showcase-component">
		<h3>Kanban Board:</h3>
		<hr />
		
		<!-- Basic Kanban -->
		<div style="margin: 20px 0;">
			<h4>Basic Kanban Board:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; overflow-x: auto;">
				<tu-kanban
					:columns="basicColumns"
					:items="basicItems"
					@item-moved="onItemMoved"
					@item-added="onItemAdded"
					@item-updated="onItemUpdated"
					@item-deleted="onItemDeleted"
				/>
			</div>
		</div>

		<!-- Project Management Kanban -->
		<div style="margin: 20px 0;">
			<h4>Project Management Board:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<div style="display: flex; justify-content: between; align-items: center; margin-bottom: 20px;">
					<h5>Software Development Sprint</h5>
					<div>
						<TuButton @click="addNewTask" size="sm" color="primary">Add Task</TuButton>
						<TuButton @click="showBurndown" size="sm" style="margin-left: 10px;">View Burndown</TuButton>
					</div>
				</div>
				
				<tu-kanban
					:columns="projectColumns"
					:items="projectItems"
					:allow-add="true"
					:allow-edit="true"
					:allow-delete="true"
					@item-moved="onProjectItemMoved"
				>
					<template #item="{ item }">
						<div class="project-card">
							<div class="card-header">
								<div class="priority-indicator" :class="`priority-${item.priority}`"></div>
								<span class="task-id">{{ item.id }}</span>
							</div>
							<h6 class="task-title">{{ item.title }}</h6>
							<p class="task-description">{{ item.description }}</p>
							<div class="task-meta">
								<div class="assignee">
									<TuAvatar :src="item.assignee.avatar" size="xs" />
									<span>{{ item.assignee.name }}</span>
								</div>
								<div class="task-points">{{ item.storyPoints }}pts</div>
							</div>
							<div class="task-tags">
								<TuChip v-for="tag in item.tags" :key="tag" size="xs" :color="getTagColor(tag)">
									{{ tag }}
								</TuChip>
							</div>
							<div class="task-footer">
								<span class="due-date" :class="{ 'overdue': isOverdue(item.dueDate) }">
									Due: {{ formatDate(item.dueDate) }}
								</span>
							</div>
						</div>
					</template>
				</tu-kanban>
			</div>
		</div>

		<!-- Sales Pipeline -->
		<div style="margin: 20px 0;">
			<h4>Sales Pipeline:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<div style="display: flex; justify-content: between; align-items: center; margin-bottom: 20px;">
					<h5>Q4 Sales Pipeline</h5>
					<div style="display: flex; gap: 10px;">
						<div class="pipeline-stat">
							<span>Total Value: </span>
							<strong>${{ totalPipelineValue.toLocaleString() }}</strong>
						</div>
						<div class="pipeline-stat">
							<span>Deals: </span>
							<strong>{{ salesItems.length }}</strong>
						</div>
					</div>
				</div>
				
				<tu-kanban
					:columns="salesColumns"
					:items="salesItems"
					@item-moved="onSalesItemMoved"
				>
					<template #column-header="{ column }">
						<div class="sales-column-header">
							<h6>{{ column.title }}</h6>
							<div class="column-stats">
								<div>{{ getColumnItemCount(column.id, salesItems) }} deals</div>
								<div>${{ getColumnValue(column.id, salesItems).toLocaleString() }}</div>
							</div>
						</div>
					</template>
					
					<template #item="{ item }">
						<div class="sales-card">
							<h6 class="company-name">{{ item.company }}</h6>
							<p class="deal-title">{{ item.title }}</p>
							<div class="deal-value">${{ item.value.toLocaleString() }}</div>
							<div class="deal-meta">
								<div class="contact">
									<tu-icon>person</tu-icon>
									{{ item.contact }}
								</div>
								<div class="probability">
									<TuProgress-bar :value="item.probability" size="sm" />
									<span>{{ item.probability }}%</span>
								</div>
							</div>
							<div class="deal-footer">
								<span class="close-date">Close: {{ formatDate(item.closeDate) }}</span>
								<TuChip :color="getStageColor(item.stage)" size="xs">{{ item.stage }}</TuChip>
							</div>
						</div>
					</template>
				</tu-kanban>
			</div>
		</div>

		<!-- Custom Workflow -->
		<div style="margin: 20px 0;">
			<h4>Custom Workflow:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<div style="margin-bottom: 20px;">
					<h5>Content Review Process</h5>
					<div style="display: flex; gap: 10px; margin-top: 10px;">
						<TuInput v-model="newWorkflowItem.title" placeholder="Item title" />
						<TuSelect v-model="newWorkflowItem.type" :select-items="contentTypes" placeholder="Content type" />
						<TuButton @click="addWorkflowItem" :disabled="!newWorkflowItem.title">Add Item</TuButton>
					</div>
				</div>
				
				<tu-kanban
					:columns="workflowColumns"
					:items="workflowItems"
					:column-width="280"
					@item-moved="onWorkflowItemMoved"
				>
					<template #item="{ item }">
						<div class="workflow-card">
							<div class="content-type-badge" :class="`type-${item.type}`">
								{{ item.type }}
							</div>
							<h6>{{ item.title }}</h6>
							<div class="workflow-meta">
								<div class="author">
									<tu-icon>edit</tu-icon>
									{{ item.author }}
								</div>
								<div class="created">{{ formatDate(item.created) }}</div>
							</div>
							<div v-if="item.comments" class="comments">
								<tu-icon>comment</tu-icon>
								{{ item.comments }} comments
							</div>
							<div class="workflow-actions">
								<TuButton size="xs" @click="viewItem(item)">View</TuButton>
								<TuButton size="xs" color="primary" @click="editItem(item)">Edit</TuButton>
							</div>
						</div>
					</template>
				</tu-kanban>
			</div>
		</div>

		<!-- Statistics -->
		<div style="margin: 20px 0;">
			<h4>Board Statistics:</h4>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
				<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
					<h6>Project Progress</h6>
					<div style="margin-top: 15px;">
						<div v-for="column in projectColumns" :key="column.id" style="margin: 10px 0;">
							<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
								<span>{{ column.title }}</span>
								<span>{{ getColumnItemCount(column.id, projectItems) }}</span>
							</div>
							<TuProgress-bar 
								:value="(getColumnItemCount(column.id, projectItems) / projectItems.length) * 100" 
								size="sm" 
								:color="getColumnColor(column.id)"
							/>
						</div>
					</div>
				</div>
				
				<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
					<h6>Sales Conversion</h6>
					<div style="margin-top: 15px;">
						<div class="stat-item">
							<span>Lead to Qualified:</span>
							<strong>{{ calculateConversionRate('lead', 'qualified') }}%</strong>
						</div>
						<div class="stat-item">
							<span>Qualified to Proposal:</span>
							<strong>{{ calculateConversionRate('qualified', 'proposal') }}%</strong>
						</div>
						<div class="stat-item">
							<span>Proposal to Closed:</span>
							<strong>{{ calculateConversionRate('proposal', 'closed') }}%</strong>
						</div>
						<div class="stat-item">
							<span>Overall Conversion:</span>
							<strong>{{ calculateConversionRate('lead', 'closed') }}%</strong>
						</div>
					</div>
				</div>
				
				<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
					<h6>Workflow Efficiency</h6>
					<div style="margin-top: 15px;">
						<div class="stat-item">
							<span>Average Time in Review:</span>
							<strong>2.3 days</strong>
						</div>
						<div class="stat-item">
							<span>Items Completed Today:</span>
							<strong>{{ workflowItems.filter(item => item.columnId === 'published').length }}</strong>
						</div>
						<div class="stat-item">
							<span>Pending Approval:</span>
							<strong>{{ workflowItems.filter(item => item.columnId === 'review').length }}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Current Data -->
		<div style="margin: 20px 0;">
			<h4>Current Board Data:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic Items:</strong> {{ basicItems.length }}</p>
				<p><strong>Project Tasks:</strong> {{ projectItems.length }}</p>
				<p><strong>Sales Deals:</strong> {{ salesItems.length }}</p>
				<p><strong>Workflow Items:</strong> {{ workflowItems.length }}</p>
				<p><strong>Total Pipeline Value:</strong> ${{ totalPipelineValue.toLocaleString() }}</p>
				<p><strong>Last Moved Item:</strong> {{ lastMovedItem || 'None' }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { tuButton as TuButton } from "../components/tuButton";
import TuProgress from "../components/tuProgress";
import { tuChip as TuChip } from "../components/tuChip";
import TuInput from "../components/tuInput";
import TuAvatar from "../components/tuAvatar";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Basic kanban data
const basicColumns = ref([
	{ id: "todo", title: "To Do", color: "#6c757d" },
	{ id: "progress", title: "In Progress", color: "#007bff" },
	{ id: "review", title: "Review", color: "#ffc107" },
	{ id: "done", title: "Done", color: "#28a745" }
]);

const basicItems = ref([
	{ id: 1, title: "Setup development environment", columnId: "todo" },
	{ id: 2, title: "Create project structure", columnId: "todo" },
	{ id: 3, title: "Implement authentication", columnId: "progress" },
	{ id: 4, title: "Design user interface", columnId: "progress" },
	{ id: 5, title: "Write unit tests", columnId: "review" },
	{ id: 6, title: "Setup CI/CD pipeline", columnId: "done" }
]);

// Project management data
const projectColumns = ref([
	{ id: "backlog", title: "Backlog", color: "#6c757d" },
	{ id: "sprint", title: "Sprint", color: "#007bff" },
	{ id: "development", title: "Development", color: "#17a2b8" },
	{ id: "testing", title: "Testing", color: "#ffc107" },
	{ id: "completed", title: "Completed", color: "#28a745" }
]);

const projectItems = ref([
	{
		id: "TASK-101",
		title: "User Authentication System",
		description: "Implement JWT-based authentication with role management",
		columnId: "development",
		priority: "high",
		storyPoints: 8,
		assignee: { name: "John Doe", avatar: "/api/avatar/john" },
		tags: ["backend", "security"],
		dueDate: "2024-01-15"
	},
	{
		id: "TASK-102", 
		title: "Dashboard UI Components",
		description: "Create reusable dashboard components",
		columnId: "sprint",
		priority: "medium",
		storyPoints: 5,
		assignee: { name: "Jane Smith", avatar: "/api/avatar/jane" },
		tags: ["frontend", "ui"],
		dueDate: "2024-01-20"
	},
	{
		id: "TASK-103",
		title: "API Rate Limiting",
		description: "Implement rate limiting for API endpoints",
		columnId: "testing",
		priority: "low",
		storyPoints: 3,
		assignee: { name: "Mike Johnson", avatar: "/api/avatar/mike" },
		tags: ["backend", "performance"],
		dueDate: "2024-01-10"
	}
]);

// Sales pipeline data
const salesColumns = ref([
	{ id: "lead", title: "Leads", color: "#6c757d" },
	{ id: "qualified", title: "Qualified", color: "#007bff" },
	{ id: "proposal", title: "Proposal", color: "#ffc107" },
	{ id: "negotiation", title: "Negotiation", color: "#fd7e14" },
	{ id: "closed", title: "Closed Won", color: "#28a745" }
]);

const salesItems = ref([
	{
		id: 1,
		company: "TechCorp Inc",
		title: "Enterprise Software License", 
		value: 50000,
		columnId: "qualified",
		contact: "Sarah Wilson",
		probability: 60,
		stage: "qualified",
		closeDate: "2024-02-15"
	},
	{
		id: 2,
		company: "StartupXYZ",
		title: "Cloud Infrastructure Setup",
		value: 25000,
		columnId: "proposal", 
		contact: "Alex Chen",
		probability: 80,
		stage: "proposal",
		closeDate: "2024-01-30"
	},
	{
		id: 3,
		company: "Global Industries",
		title: "Digital Transformation",
		value: 150000,
		columnId: "negotiation",
		contact: "Robert Davis",
		probability: 90,
		stage: "negotiation", 
		closeDate: "2024-03-01"
	}
]);

// Workflow data
const workflowColumns = ref([
	{ id: "draft", title: "Draft", color: "#6c757d" },
	{ id: "review", title: "Review", color: "#007bff" },
	{ id: "approved", title: "Approved", color: "#28a745" },
	{ id: "published", title: "Published", color: "#17a2b8" }
]);

const workflowItems = ref([
	{
		id: 1,
		title: "Q4 Marketing Campaign",
		type: "article",
		columnId: "review",
		author: "Marketing Team",
		created: "2024-01-05",
		comments: 3
	},
	{
		id: 2,
		title: "Product Launch Announcement",
		type: "blog",
		columnId: "approved", 
		author: "Product Team",
		created: "2024-01-03",
		comments: 1
	}
]);

// Form data
const newWorkflowItem = ref({
	title: "",
	type: ""
});

const contentTypes = ref([
	{ label: "Blog Post", value: "blog" },
	{ label: "Article", value: "article" },
	{ label: "Video", value: "video" },
	{ label: "Infographic", value: "infographic" }
]);

// State
const lastMovedItem = ref("");

// Computed
const totalPipelineValue = computed(() => {
	return salesItems.value.reduce((total, item) => total + item.value, 0);
});

// Methods
const onItemMoved = (event: any) => {
	console.log("Item moved:", event);
	lastMovedItem.value = `${event.item.title} → ${event.toColumn}`;
};

const onItemAdded = (event: any) => {
	console.log("Item added:", event);
};

const onItemUpdated = (event: any) => {
	console.log("Item updated:", event);
};

const onItemDeleted = (event: any) => {
	console.log("Item deleted:", event);
};

const onProjectItemMoved = (event: any) => {
	console.log("Project item moved:", event);
	lastMovedItem.value = `${event.item.id}: ${event.item.title} → ${event.toColumn}`;
};

const onSalesItemMoved = (event: any) => {
	console.log("Sales item moved:", event);
	lastMovedItem.value = `${event.item.company} → ${event.toColumn}`;
};

const onWorkflowItemMoved = (event: any) => {
	console.log("Workflow item moved:", event);
	lastMovedItem.value = `${event.item.title} → ${event.toColumn}`;
};

const addNewTask = () => {
	const newTask = {
		id: `TASK-${Date.now()}`,
		title: "New Task",
		description: "Task description",
		columnId: "backlog",
		priority: "medium",
		storyPoints: 1,
		assignee: { name: "Unassigned", avatar: "" },
		tags: [],
		dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
	};
	
	projectItems.value.push(newTask);
};

const showBurndown = () => {
	alert("Burndown chart would open here");
};

const addWorkflowItem = () => {
	if (newWorkflowItem.value.title && newWorkflowItem.value.type) {
		const newItem = {
			id: Date.now(),
			title: newWorkflowItem.value.title,
			type: newWorkflowItem.value.type,
			columnId: "draft",
			author: "Current User",
			created: new Date().toISOString().split('T')[0],
			comments: 0
		};
		
		workflowItems.value.push(newItem);
		newWorkflowItem.value = { title: "", type: "" };
	}
};

const getTagColor = (tag: string): string => {
	const colors = {
		backend: "primary",
		frontend: "success", 
		security: "danger",
		ui: "info",
		performance: "warning"
	};
	return colors[tag as keyof typeof colors] || "default";
};

const getStageColor = (stage: string): string => {
	const colors = {
		lead: "secondary",
		qualified: "primary",
		proposal: "warning", 
		negotiation: "info",
		closed: "success"
	};
	return colors[stage as keyof typeof colors] || "default";
};

const getColumnColor = (columnId: string): string => {
	const colors = {
		backlog: "secondary",
		sprint: "primary",
		development: "info",
		testing: "warning",
		completed: "success"
	};
	return colors[columnId as keyof typeof colors] || "default";
};

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString();
};

const isOverdue = (dateString: string): boolean => {
	return new Date(dateString) < new Date();
};

const getColumnItemCount = (columnId: string, items: any[]): number => {
	return items.filter(item => item.columnId === columnId).length;
};

const getColumnValue = (columnId: string, items: any[]): number => {
	return items
		.filter(item => item.columnId === columnId)
		.reduce((sum, item) => sum + (item.value || 0), 0);
};

const calculateConversionRate = (fromStage: string, toStage: string): number => {
	const fromCount = getColumnItemCount(fromStage, salesItems.value);
	const toCount = getColumnItemCount(toStage, salesItems.value);
	
	if (fromCount === 0) return 0;
	return Math.round((toCount / fromCount) * 100);
};

const viewItem = (item: any) => {
	console.log("Viewing item:", item);
	alert(`Viewing: ${item.title}`);
};

const editItem = (item: any) => {
	console.log("Editing item:", item);
	alert(`Editing: ${item.title}`);
};
</script>

<style scoped>
.project-card {
	background: white;
	border-radius: 8px;
	padding: 12px;
	margin-bottom: 8px;
	border-left: 4px solid #007bff;
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
}

.priority-indicator {
	width: 8px;
	height: 8px;
	border-radius: 50%;
}

.priority-high { background: #dc3545; }
.priority-medium { background: #ffc107; }
.priority-low { background: #28a745; }

.task-id {
	font-size: 12px;
	color: #6c757d;
	font-weight: bold;
}

.task-title {
	margin: 0 0 8px 0;
	font-size: 14px;
	font-weight: 600;
}

.task-description {
	font-size: 12px;
	color: #6c757d;
	margin: 0 0 12px 0;
	line-height: 1.4;
}

.task-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 8px;
}

.assignee {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 12px;
}

.task-points {
	background: #e9ecef;
	padding: 2px 6px;
	border-radius: 12px;
	font-size: 11px;
	font-weight: bold;
}

.task-tags {
	margin-bottom: 8px;
}

.task-footer {
	font-size: 11px;
}

.due-date.overdue {
	color: #dc3545;
	font-weight: bold;
}

.sales-card {
	background: white;
	border-radius: 8px;
	padding: 12px;
	margin-bottom: 8px;
	border-left: 4px solid #28a745;
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.company-name {
	margin: 0 0 4px 0;
	font-size: 14px;
	font-weight: 600;
}

.deal-title {
	font-size: 12px;
	color: #6c757d;
	margin: 0 0 8px 0;
}

.deal-value {
	font-size: 16px;
	font-weight: bold;
	color: #28a745;
	margin-bottom: 8px;
}

.deal-meta {
	margin-bottom: 8px;
}

.contact {
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	margin-bottom: 4px;
}

.probability {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 11px;
}

.deal-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 11px;
}

.workflow-card {
	background: white;
	border-radius: 8px;
	padding: 12px;
	margin-bottom: 8px;
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.content-type-badge {
	display: inline-block;
	padding: 2px 8px;
	border-radius: 12px;
	font-size: 10px;
	font-weight: bold;
	text-transform: uppercase;
	margin-bottom: 8px;
}

.type-blog { background: #e3f2fd; color: #1976d2; }
.type-article { background: #f3e5f5; color: #7b1fa2; }
.type-video { background: #fff3e0; color: #f57c00; }
.type-infographic { background: #e8f5e8; color: #388e3c; }

.workflow-meta {
	margin: 8px 0;
	font-size: 12px;
	color: #6c757d;
}

.author {
	display: flex;
	align-items: center;
	gap: 4px;
	margin-bottom: 4px;
}

.comments {
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 12px;
	color: #6c757d;
	margin: 8px 0;
}

.workflow-actions {
	display: flex;
	gap: 6px;
	margin-top: 8px;
}

.sales-column-header {
	text-align: center;
}

.column-stats {
	font-size: 12px;
	color: #6c757d;
}

.pipeline-stat {
	background: white;
	padding: 8px 12px;
	border-radius: 4px;
	font-size: 14px;
}

.stat-item {
	display: flex;
	justify-content: space-between;
	margin: 8px 0;
	font-size: 14px;
}
</style>
