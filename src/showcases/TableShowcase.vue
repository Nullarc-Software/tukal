<template>
	<div class="showcase-component">
		<h3>Table:</h3>
		<hr />
		
		<!-- Basic Table -->
		<div style="margin: 20px 0;">
			<h4>Basic Table:</h4>
			<TuTable>
				<template #header>
					<TuTh>Name</TuTh>
					<TuTh>Email</TuTh>
					<TuTh>Role</TuTh>
					<TuTh>Status</TuTh>
				</template>
				<TuTr v-for="user in basicUsers" :key="user.id">
					<TuTd>{{ user.name }}</TuTd>
					<TuTd>{{ user.email }}</TuTd>
					<TuTd>{{ user.role }}</TuTd>
					<TuTd>
						<TuChip :color="user.status === 'active' ? 'success' : 'danger'" size="sm">
							{{ user.status }}
						</TuChip>
					</TuTd>
				</TuTr>
			</TuTable>
		</div>

		<!-- Striped Table -->
		<div style="margin: 20px 0;">
			<h4>Striped Table:</h4>
			<TuTable striped>
				<template #header>
					<TuTh>Product</TuTh>
					<TuTh>Price</TuTh>
					<TuTh>Stock</TuTh>
					<TuTh>Category</TuTh>
				</template>
				<TuTr v-for="product in products" :key="product.id">
					<TuTd>{{ product.name }}</TuTd>
					<TuTd>${{ product.price }}</TuTd>
					<TuTd>{{ product.stock }}</TuTd>
					<TuTd>{{ product.category }}</TuTd>
				</TuTr>
			</TuTable>
		</div>

		<!-- Sortable Table -->
		<div style="margin: 20px 0;">
			<h4>Sortable Table:</h4>
			<TuTable>
				<template #header>
					<TuTh @click="sortBy('name')" :class="{ active: sortField === 'name' }" style="cursor: pointer;">
						Name {{ getSortIcon('name') }}
					</TuTh>
					<TuTh @click="sortBy('age')" :class="{ active: sortField === 'age' }" style="cursor: pointer;">
						Age {{ getSortIcon('age') }}
					</TuTh>
					<TuTh @click="sortBy('score')" :class="{ active: sortField === 'score' }" style="cursor: pointer;">
						Score {{ getSortIcon('score') }}
					</TuTh>
					<TuTh>Actions</TuTh>
				</template>
				<TuTr v-for="student in sortedStudents" :key="student.id">
					<TuTd>{{ student.name }}</TuTd>
					<TuTd>{{ student.age }}</TuTd>
					<TuTd>{{ student.score }}</TuTd>
					<TuTd>
						<tu-button size="xs" @click="editStudent(student)">Edit</tu-button>
						<tu-button size="xs" color="danger" @click="deleteStudent(student.id)" style="margin-left: 5px;">Delete</tu-button>
					</TuTd>
				</TuTr>
			</TuTable>
		</div>

		<!-- Selectable Rows -->
		<div style="margin: 20px 0;">
			<h4>Selectable Rows:</h4>
			<div style="margin-bottom: 10px;">
				<tu-button @click="selectAll" size="sm">Select All</tu-button>
				<tu-button @click="clearSelection" size="sm" style="margin-left: 10px;">Clear Selection</tu-button>
				<span style="margin-left: 15px;">Selected: {{ selectedRows.length }} rows</span>
			</div>
			<TuTable>
				<template #header>
					<TuTh width="50px">
						<tu-check-box v-model="selectAllChecked" @change="toggleSelectAll" />
					</TuTh>
					<TuTh>Task</TuTh>
					<TuTh>Assignee</TuTh>
					<TuTh>Priority</TuTh>
					<TuTh>Due Date</TuTh>
				</template>
				<TuTr v-for="task in tasks" :key="task.id" :class="{ selected: isRowSelected(task.id) }">
					<TuTd>
						<tu-check-box v-model="selectedRows" :val="task.id" />
					</TuTd>
					<TuTd>{{ task.title }}</TuTd>
					<TuTd>{{ task.assignee }}</TuTd>
					<TuTd>
						<TuChip :color="getPriorityColor(task.priority)" size="sm">
							{{ task.priority }}
						</TuChip>
					</TuTd>
					<TuTd>{{ task.dueDate }}</TuTd>
				</TuTr>
			</TuTable>
			<div v-if="selectedRows.length > 0" style="margin-top: 10px;">
				<tu-button @click="bulkAction('complete')" success size="sm">Mark Complete</tu-button>
				<tu-button @click="bulkAction('delete')" danger size="sm" style="margin-left: 10px;">Delete Selected</tu-button>
			</div>
		</div>

		<!-- Paginated Table -->
		<div style="margin: 20px 0;">
			<h4>Paginated Table:</h4>
			<TuTable>
				<template #header>
					<TuTh>ID</TuTh>
					<TuTh>Name</TuTh>
					<TuTh>Email</TuTh>
					<TuTh>Department</TuTh>
				</template>
				<TuTr v-for="employee in paginatedEmployees" :key="employee.id">
					<TuTd>{{ employee.id }}</TuTd>
					<TuTd>{{ employee.name }}</TuTd>
					<TuTd>{{ employee.email }}</TuTd>
					<TuTd>{{ employee.department }}</TuTd>
				</TuTr>
			</TuTable>
			<div style="margin-top: 15px; display: flex; justify-content: center;">
				<tu-pagination v-model="currentPage" :length="totalPages" />
			</div>
		</div>

		<!-- Loading Table -->
		<div style="margin: 20px 0;">
			<h4>Loading Table:</h4>
			<TuTable :loading="tableLoading">
				<template #header>
					<TuTh>Column 1</TuTh>
					<TuTh>Column 2</TuTh>
					<TuTh>Column 3</TuTh>
				</template>
				<TuTr v-for="i in 5" :key="i">
					<TuTd>Loading...</TuTd>
					<TuTd>Loading...</TuTd>
					<TuTd>Loading...</TuTd>
				</TuTr>
			</TuTable>
			<tu-button @click="toggleLoading" style="margin-top: 10px;">Toggle Loading</tu-button>
		</div>

		<!-- Custom Cell Content -->
		<div style="margin: 20px 0;">
			<h4>Custom Cell Content:</h4>
			<TuTable>
				<template #header>
					<TuTh>User</TuTh>
					<TuTh>Stats</TuTh>
					<TuTh>Progress</TuTh>
					<TuTh>Actions</TuTh>
				</template>
				<TuTr v-for="user in advancedUsers" :key="user.id">
					<TuTd>
						<div style="display: flex; align-items: center; gap: 10px;">
							<tu-avatar :text="user.name.charAt(0)" size="30" />
							<div>
								<div style="font-weight: bold;">{{ user.name }}</div>
								<div style="font-size: 12px; color: #666;">{{ user.email }}</div>
							</div>
						</div>
					</TuTd>
					<TuTd>
						<div>
							<div>Projects: {{ user.projects }}</div>
							<div>Tasks: {{ user.tasks }}</div>
						</div>
					</TuTd>
					<TuTd>
						<tu-progress :percent="user.progress" size="small" />
						<div style="font-size: 12px; margin-top: 2px;">{{ user.progress }}%</div>
					</TuTd>
					<TuTd>
						<div style="display: flex; gap: 5px;">
							<tu-button size="xs" @click="viewUser(user)">View</tu-button>
							<tu-button size="xs" color="primary" @click="editUser(user)">Edit</tu-button>
							<tu-button size="xs" color="danger" @click="deleteUser(user.id)">Delete</tu-button>
						</div>
					</TuTd>
				</TuTr>
			</TuTable>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { tuTable as TuTable, tuTh as TuTh, tuTr as TuTr, tuTd as TuTd } from "../components/tuTable";
import { tuChip as TuChip } from "../components/tuChip";

// Basic users data
const basicUsers = ref([
	{ id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator", status: "inactive" },
	{ id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "active" }
]);

// Products data
const products = ref([
	{ id: 1, name: "Laptop", price: 999, stock: 15, category: "Electronics" },
	{ id: 2, name: "Mouse", price: 25, stock: 50, category: "Accessories" },
	{ id: 3, name: "Keyboard", price: 75, stock: 30, category: "Accessories" },
	{ id: 4, name: "Monitor", price: 300, stock: 8, category: "Electronics" },
	{ id: 5, name: "Desk", price: 200, stock: 5, category: "Furniture" }
]);

// Students data for sorting
const students = ref([
	{ id: 1, name: "Alice Johnson", age: 20, score: 95 },
	{ id: 2, name: "Bob Smith", age: 22, score: 87 },
	{ id: 3, name: "Charlie Brown", age: 19, score: 92 },
	{ id: 4, name: "Diana Wilson", age: 21, score: 88 },
	{ id: 5, name: "Eve Davis", age: 20, score: 94 }
]);

// Sort functionality
const sortField = ref("");
const sortDirection = ref("asc");

const sortedStudents = computed(() => {
	if (!sortField.value) return students.value;
	
	return [...students.value].sort((a, b) => {
		const aVal = a[sortField.value];
		const bVal = b[sortField.value];
		
		if (sortDirection.value === "asc") {
			return aVal > bVal ? 1 : -1;
		} else {
			return aVal < bVal ? 1 : -1;
		}
	});
});

// Tasks data for selection
const tasks = ref([
	{ id: 1, title: "Design homepage", assignee: "John", priority: "high", dueDate: "2024-03-15" },
	{ id: 2, title: "Fix bug #123", assignee: "Jane", priority: "medium", dueDate: "2024-03-10" },
	{ id: 3, title: "Update documentation", assignee: "Bob", priority: "low", dueDate: "2024-03-20" },
	{ id: 4, title: "Review code", assignee: "Alice", priority: "high", dueDate: "2024-03-12" },
	{ id: 5, title: "Test new feature", assignee: "Charlie", priority: "medium", dueDate: "2024-03-18" }
]);

const selectedRows = ref([]);
const selectAllChecked = ref(false);

// Pagination
const allEmployees = ref(
	Array.from({ length: 50 }, (_, i) => ({
		id: i + 1,
		name: `Employee ${i + 1}`,
		email: `employee${i + 1}@company.com`,
		department: ["Engineering", "Marketing", "Sales", "HR", "Finance"][i % 5]
	}))
);

const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => Math.ceil(allEmployees.value.length / itemsPerPage));

const paginatedEmployees = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return allEmployees.value.slice(start, end);
});

// Loading state
const tableLoading = ref(false);

// Advanced users with rich content
const advancedUsers = ref([
	{ id: 1, name: "John Doe", email: "john@company.com", projects: 12, tasks: 45, progress: 85 },
	{ id: 2, name: "Jane Smith", email: "jane@company.com", projects: 8, tasks: 32, progress: 72 },
	{ id: 3, name: "Bob Johnson", email: "bob@company.com", projects: 15, tasks: 58, progress: 91 },
	{ id: 4, name: "Alice Brown", email: "alice@company.com", projects: 6, tasks: 23, progress: 64 }
]);

// Methods
const sortBy = (field: string) => {
	if (sortField.value === field) {
		sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
	} else {
		sortField.value = field;
		sortDirection.value = "asc";
	}
};

const getSortIcon = (field: string) => {
	if (sortField.value !== field) return "↕️";
	return sortDirection.value === "asc" ? "↑" : "↓";
};

const editStudent = (student: any) => {
	alert(`Editing ${student.name}`);
};

const deleteStudent = (id: number) => {
	const index = students.value.findIndex(s => s.id === id);
	if (index > -1) {
		students.value.splice(index, 1);
	}
};

const isRowSelected = (id: number) => {
	return selectedRows.value.includes(id);
};

const selectAll = () => {
	selectedRows.value = tasks.value.map(task => task.id);
	selectAllChecked.value = true;
};

const clearSelection = () => {
	selectedRows.value = [];
	selectAllChecked.value = false;
};

const toggleSelectAll = () => {
	if (selectAllChecked.value) {
		selectAll();
	} else {
		clearSelection();
	}
};

const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "high": return "danger";
		case "medium": return "warn";
		case "low": return "success";
		default: return "primary";
	}
};

const bulkAction = (action: string) => {
	alert(`Performing ${action} on ${selectedRows.value.length} items`);
	if (action === "delete") {
		// Remove selected tasks
		tasks.value = tasks.value.filter(task => !selectedRows.value.includes(task.id));
		clearSelection();
	}
};

const toggleLoading = () => {
	tableLoading.value = !tableLoading.value;
};

const viewUser = (user: any) => {
	alert(`Viewing ${user.name}`);
};

const editUser = (user: any) => {
	alert(`Editing ${user.name}`);
};

const deleteUser = (id: number) => {
	const index = advancedUsers.value.findIndex(u => u.id === id);
	if (index > -1) {
		advancedUsers.value.splice(index, 1);
	}
};
</script>

<style scoped>
.selected {
	background-color: #e3f2fd !important;
}

.active {
	background-color: #f5f5f5;
}
</style>
