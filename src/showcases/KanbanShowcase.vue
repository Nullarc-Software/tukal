<template>
	<div class="showcase-component">
		<h3>Kanban Board</h3>
		<hr />
		
		<!-- Basic Kanban -->
		<div style="margin: 20px 0;">
			<h4>Basic Kanban Board</h4>
			<p>Drag and drop items between columns. Use the search box to filter items.</p>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; min-height: 500px;">
				<tu-kanban
					:fields="basicFields"
					:items="basicItems"
					v-model="basicItems"
				/>
			</div>
		</div>

		<!-- Multi-Select Kanban -->
		<div style="margin: 20px 0;">
			<h4>Multi-Select Kanban</h4>
			<p>Enable multi-selection to select and move multiple items at once.</p>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; min-height: 500px;">
				<tu-kanban
					:fields="projectFields"
					:items="projectItems"
					:multi-select="true"
					v-model="projectItems"
				/>
			</div>
		</div>

		<!-- Icons Kanban -->
		<div style="margin: 20px 0;">
			<h4>Kanban with Icons</h4>
			<p>Items can include icons for visual identification.</p>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; min-height: 500px;">
				<tu-kanban
					:fields="iconFields"
					:items="iconItems"
					v-model="iconItems"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Basic Kanban Example
const basicFields = ref([
	{ fieldName: "todo", title: "To Do" },
	{ fieldName: "progress", title: "In Progress" },
	{ fieldName: "review", title: "Review" },
	{ fieldName: "done", title: "Done" }
]);

const basicItems = ref([
	{ id: 1, content: "Setup development environment", fieldName: "todo" },
	{ id: 2, content: "Create project structure", fieldName: "todo" },
	{ id: 3, content: "Implement authentication", fieldName: "progress" },
	{ id: 4, content: "Design user interface", fieldName: "progress" },
	{ id: 5, content: "Write unit tests", fieldName: "review" },
	{ id: 6, content: "Setup CI/CD pipeline", fieldName: "done" }
]);

// Project Management Kanban
const projectFields = ref([
	{ fieldName: "backlog", title: "Backlog" },
	{ fieldName: "sprint", title: "Sprint" },
	{ fieldName: "development", title: "Development" },
	{ fieldName: "testing", title: "Testing" },
	{ fieldName: "completed", title: "Completed" }
]);

const projectItems = ref([
	{ id: 1, content: "User Authentication - JWT implementation", fieldName: "development" },
	{ id: 2, content: "Dashboard UI Components", fieldName: "sprint" },
	{ id: 3, content: "API Rate Limiting", fieldName: "testing" },
	{ id: 4, content: "Database Migration", fieldName: "backlog" },
	{ id: 5, content: "User Profile Page", fieldName: "completed" },
	{ id: 6, content: "Email Notifications", fieldName: "sprint" },
	{ id: 7, content: "Search Functionality", fieldName: "development" },
	{ id: 8, content: "File Upload Feature", fieldName: "backlog" }
]);

// Icons Kanban
const iconFields = ref([
	{ fieldName: "features", title: "Features" },
	{ fieldName: "bugs", title: "Bug Fixes" },
	{ fieldName: "improvements", title: "Improvements" }
]);

const iconItems = ref([
	{ id: 1, content: "Add dark mode support", fieldName: "features", icon: "lightbulb" },
	{ id: 2, content: "Fix login redirect issue", fieldName: "bugs", icon: "bug_report" },
	{ id: 3, content: "Optimize database queries", fieldName: "improvements", icon: "speed" },
	{ id: 4, content: "Implement real-time updates", fieldName: "features", icon: "refresh" },
	{ id: 5, content: "Fix memory leak", fieldName: "bugs", icon: "warning" },
	{ id: 6, content: "Improve loading performance", fieldName: "improvements", icon: "trending_up" }
]);
</script>

<style scoped>
.showcase-component {
	padding: 20px;
}

.showcase-component h3 {
	color: var(--tu-primary);
	margin-bottom: 10px;
}

.showcase-component h4 {
	color: var(--tu-dark);
	margin-bottom: 5px;
}

.showcase-component p {
	color: var(--tu-text);
	margin-bottom: 15px;
	font-size: 14px;
}
</style>
