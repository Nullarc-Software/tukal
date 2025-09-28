<template>
	<div class="showcase-component">
		<h3>Table Components Showcase:</h3>
		<hr />
		
		<!-- Core Features Table - Combines basic, striped, bordered, sortable -->
		<div style="margin: 20px 0;">
			<h4>Core Features - Basic, Striped, Bordered, Sortable:</h4>
			<p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
				Demonstrates multiple table features in one: striped rows, borders, sorting, and multi-select.
			</p>
			<div style="display: flex; gap: 10px; margin-bottom: 10px;">
				<tu-button @click="selectAll" size="sm">Select All</tu-button>
				<tu-button @click="clearSelection" size="sm">Clear Selection</tu-button>
				<span style="align-self: center;">Selected: {{ selectedRows.length }} rows</span>
			</div>
			<TuTable 
				:columns="coreFeatureColumns"
				:data="coreFeatureData"
				multiSelect
				striped
				bordered
				:draggable-columns="true"
				persistent-id="core-features-table"
				@column-reorder="handleColumnReorder('coreFeatures', $event)"
			/>
			<div v-if="selectedRows.length > 0" style="margin-top: 10px;">
				<tu-button @click="bulkAction('complete')" success size="sm">Mark Complete</tu-button>
				<tu-button @click="bulkAction('delete')" danger style="margin-left: 10px;">Delete Selected</tu-button>
			</div>
		</div>

		<!-- Column Management - Combines column chooser and draggable columns -->
		<div style="margin: 20px 0;">
			<h4>Column Management - Chooser, Reordering & Fixed Width:</h4>
			<p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
				Click the column chooser button (⚙️) to show/hide columns, drag headers to reorder, and resize columns.
			</p>
			<div style="max-width: 800px; border: 2px dashed #ccc; padding: 10px;">
				<p style="margin: 0 0 10px 0; font-size: 0.9em; color: #666;">
					Table is constrained to not overflow horizontally:
				</p>
				<TuTable 
					:columns="columnManagementColumns"
					:data="columnManagementData"
					:draggable-columns="true"
					:column-selector="true"
					fixedWidth
					bordered
					persistent-id="column-management-demo"
					@column-reorder="handleColumnReorder('columnManagement', $event)"
				/>
			</div>
		</div>

		<!-- Search Controls - Toggle search fields on/off -->
		<div style="margin: 20px 0;">
			<h4>Search Controls - Toggle Search Fields:</h4>
			<p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
				Use the <code>searchControls</code> prop to add a search toggle button to the table controls. 
				Click the 🔍 icon to show/hide all search fields at once.
			</p>
			<TuTable 
				:columns="searchControlsColumns"
				:data="searchControlsData"
				:search-controls="true"
				striped
				bordered
				persistent-id="search-controls-demo"
			/>
		</div>

		<!-- Interactive Features - Combines pagination, loading, custom content -->
		<div style="margin: 20px 0;">
			<h4>Interactive Features - Pagination, Loading & Custom Content:</h4>
			<div style="display: flex; gap: 10px; margin-bottom: 10px;">
				<tu-button @click="toggleLoading" size="sm">Toggle Loading</tu-button>
				<tu-button @click="addMoreData" size="sm">Add 10 Rows</tu-button>
				<tu-button @click="resetInteractiveData" size="sm">Reset Data</tu-button>
				<span style="align-self: center;">Rows: {{ interactiveData.length }}</span>
			</div>
			<TuTable 
				:loading="tableLoading"
				:columns="interactiveColumns"
				:data="paginatedInteractiveData"
				striped
			/>
			<div style="margin-top: 15px; display: flex; justify-content: center;">
				<tu-pagination v-model="currentPage" :length="totalPages" />
			</div>
		</div>

		<!-- Built-in Pagination Demo -->
		<div style="margin: 20px 0;">
			<h4>Built-in Pagination - Integrated Footer Component:</h4>
			<p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
				Enable <code>pagination</code> prop to add an integrated pagination component in the table footer (right-aligned). 
				Supports page size selection and total records display.
			</p>
			<div style="display: flex; gap: 10px; margin-bottom: 10px;">
				<tu-button @click="addPaginationData" size="sm">Add 15 Rows</tu-button>
				<tu-button @click="resetPaginationData" size="sm">Reset Data</tu-button>
				<span style="align-self: center;">Total rows: {{ paginationDemoData.length }}</span>
			</div>
			<TuTable 
				:columns="paginationDemoColumns"
				:data="paginationDemoData"
				:pagination="true"
				:pageSize="10"
				striped
				
			/>
		</div>

		<!-- Component Rendering & Context Demo -->
		<div style="margin: 20px 0;">
			<h4>Component Rendering - Template-Based Approach:</h4>
			<p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
				Demonstrates the new <strong>template-based approach</strong> using both template slots and component registry.
				Row data is automatically accessible through slot props - cleaner and more flexible than the old approach!
			</p>
			<TuTable 
				:columns="componentRenderingColumns"
				:data="componentRenderingData"
				striped
				bordered
			>
				<!-- Template slot for custom row info display -->
				<template #info="{ rowData, rowIndex }">
					<div style="background: #e8f4f8; padding: 8px; border-radius: 4px; font-size: 0.85em;">
						<strong>Row #{{ rowIndex + 1 }}</strong><br>
						<span style="color: #666;">ID: {{ rowData.id }}, Role: {{ rowData.role }}</span>
					</div>
				</template>
			</TuTable>
		</div>

		<!-- Server-Defined Component Demo -->
		<div style="margin: 20px 0;">
			<h4>Server-Defined Components - Dynamic Component Registry:</h4>
			<p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
				Demonstrates how components can be defined by server response using a component registry. 
				The server sends component names as strings, which are resolved at runtime.
			</p>
			<div style="background: #f0f9ff; padding: 12px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #0284c7;">
				<strong>📡 Server Response Simulation:</strong> Column definitions include <code>isTemplate: true</code> 
				and <code>component: "StatusBadge"</code> which gets resolved from the component registry.
			</div>
			<TuTable 
				:columns="serverDefinedColumns"
				:data="serverDefinedData"
				striped
				bordered
			/>
		</div>

		<!-- Expandable Rows -->
		<div style="margin: 20px 0;">
			<h4>Expandable Rows with Editable Content:</h4>
			<p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
				Click the arrow icon to expand rows and view/edit additional details. Try editing the contact information.
			</p>
			<TuTable 
				:columns="expandableTableColumns"
				:data="expandableData"
				:row-expand="true"
				:expanded-rows="expandedRows"
				@update:expanded-rows="expandedRows = $event"
				@row-expand="handleRowExpand"
			>
				<template #expandedRow="{ expandedData }">
					<div class="expanded-row-content">
						<div class="expanded-row-grid">
							<div class="expanded-section">
								<h5>Contact Information</h5>
								<div class="info-grid">
									<div class="info-item">
										<strong>Phone:</strong> 
										<tu-input 
											v-model="(expandedData as any).personalInfo.phone" 
											style="width: 150px; margin-left: 8px;"
										/>
									</div>
									<div class="info-item">
										<strong>Address:</strong> 
										<tu-input 
											v-model="(expandedData as any).personalInfo.address" 
											style="width: 200px; margin-left: 8px;"
										/>
									</div>
									<div class="info-item">
										<strong>City:</strong> 
										<tu-input 
											v-model="(expandedData as any).personalInfo.city" 
											style="width: 120px; margin-left: 8px;"
										/>
									</div>
									<div class="info-item">
										<strong>Country:</strong> {{ (expandedData as any).personalInfo.country }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
			</TuTable>
			<div style="margin-top: 10px;">
				<tu-button @click="expandAll" size="sm">Expand All</tu-button>
				<tu-button @click="collapseAll" style="margin-left: 10px;">Collapse All</tu-button>
				<span style="margin-left: 15px;">Expanded: {{ expandedRows.length }} rows</span>
			</div>
		</div>

		<!-- Container Height Demonstrations - Streamlined -->
		<div style="margin: 40px 0; border-top: 2px solid #eee; padding-top: 30px;">
			<h3>Container Height & Scrolling Demonstrations:</h3>
			<hr />

			<!-- Combined Height Demos -->
			<div class="height-demo-grid">
				<!-- Fixed Height -->
				<div class="height-demo-card">
					<h4>Fixed Height (300px)</h4>
					<p class="demo-description">Auto scrolling when content exceeds height</p>
					<div style="display: flex; gap: 8px; margin-bottom: 10px;">
						<tu-button @click="addRowsToFixedHeight" size="xs">Add 5</tu-button>
						<tu-button @click="resetFixedHeightData" size="xs">Reset</tu-button>
						<span>Rows: {{ fixedHeightData.length }}</span>
					</div>
					<div class="fixed-height-container">
						<TuTable 
							:columns="containerDemoColumns"
							:data="fixedHeightData"
							:pageSize="1000"
							height="100%"
							striped
							bordered
						/>
					</div>
				</div>

				<!-- Viewport Height -->
				<div class="height-demo-card">
					<h4>Viewport Height (40vh)</h4>
					<p class="demo-description">Scales with browser window size</p>
					<div style="display: flex; gap: 8px; margin-bottom: 10px;">
						<tu-button @click="addRowsToViewportHeight" size="xs">Add 8</tu-button>
						<tu-button @click="resetViewportHeightData" size="xs">Reset</tu-button>
						<span>Rows: {{ viewportHeightData.length }}</span>
					</div>
					<div class="viewport-height-container">
						<TuTable 
							:columns="containerDemoColumns"
							:data="viewportHeightData"
							:pageSize="1000"
							height="100%"
							:multiSelect="true"
							bordered
						/>
					</div>
				</div>
			</div>

			<!-- Full Page Layout Demo -->
			<div style="margin: 30px 0;">
				<h4>Full Page Application Layout:</h4>
				<p style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
					Table fills remaining space in a flex layout - perfect for full-page applications.
				</p>
				<div style="display: flex; gap: 10px; margin-bottom: 10px;">
					<tu-button @click="addRowsToFullHeight" size="sm">Add 15 Rows</tu-button>
					<tu-button @click="resetFullHeightData" size="sm">Reset Data</tu-button>
					<span style="align-self: center;">Rows: {{ fullHeightData.length }}</span>
				</div>
				<div class="full-height-flex-container">
					<div class="header-section">
						<h5 style="margin: 0; padding: 15px;">Application Header</h5>
					</div>
					<div class="table-section">
						<TuTable 
							:columns="containerDemoColumns"
							:data="fullHeightData"
							:pageSize="1000"
							height="100%"
							:column-selector="true"
							:draggable-columns="true"
							persistent-id="full-height-demo"
						/>
					</div>
					<div class="footer-section">
						<p style="margin: 0; padding: 10px; text-align: center;">Footer Content</p>
					</div>
				</div>
			</div>
		</div>

		<!-- External Data Mode Demo -->
		<div style="margin: 40px 0; border-top: 2px solid #eee; padding-top: 30px;">
			<h3>External Data Mode - Server-Side Processing:</h3>
			<p style="margin-bottom: 15px; font-size: 0.9em; color: #666;">
				When <code>externalData</code> is enabled, the table emits <code>queryChange</code> events instead of 
				processing data internally. Perfect for server-side filtering, sorting, and pagination. The built-in 
				pagination component works seamlessly with external data mode.
			</p>
			<div style="background: #e8f4f8; padding: 12px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #17a2b8;">
				<strong>🚀 Performance Optimization:</strong> Filter changes only trigger API calls when you press <kbd>Enter</kbd> or when sorting changes. 
				This prevents excessive API requests while typing. Watch the API call counter to see this in action!
			</div>
			<div style="background: #f0f9ff; padding: 12px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #0284c7;">
				<strong>📄 Server-Side Pagination:</strong> The <code>queryChange</code> event now includes pagination data 
				(<code>page</code> and <code>pageSize</code>) along with filters and sorts. Your API can use this information 
				to return the correct page of results from the database.
			</div>
			
			<!-- Query State Display -->
			<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #007bff;">
				<h4 style="margin: 0 0 10px 0;">Current Query State:</h4>
				<div style="font-family: monospace; font-size: 0.85em; background: white; padding: 10px; border-radius: 4px;">
					<div><strong>Filters:</strong> {{ JSON.stringify(externalQuery.filters, null, 2) }}</div>
					<div style="margin-top: 8px;"><strong>Sorts:</strong> {{ JSON.stringify(externalQuery.sorts, null, 2) }}</div>
					<div style="margin-top: 8px;"><strong>Pagination:</strong> {{ JSON.stringify(externalQuery.pagination, null, 2) }}</div>
				</div>
			</div>

			<!-- Controls -->
			<div style="display: flex; gap: 10px; margin-bottom: 15px;">
				<tu-button @click="loadExternalData" size="sm" success>
					🔄 Load Data (Simulated API Call)
				</tu-button>
				<tu-button @click="resetExternalData" size="sm">Reset Data</tu-button>
				<tu-button @click="clearAllFiltersAndSorts" size="sm">Clear All Filters & Sorts</tu-button>
				<span style="align-self: center; margin-left: 10px;">
					Page {{ externalQuery.pagination.page }} | Showing {{ externalTableData.length }} of {{ externalTotalCount }} total | API Calls: {{ apiCallCount }}
				</span>
			</div>

			<!-- External Data Table -->
			<TuTable 
				:columns="externalDataColumns"
				:data="externalTableData"
				:externalData="true"
				:pagination="true"
				:pageSize="5"
				:search-controls="true"
				striped
				column-selector
				bordered
				@queryChange="handleQueryChange"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { tuTable as TuTable } from "../components/tuTable";
import tuInput from "../components/tuInput";
import { tuButton } from "../components/tuButton";
import tuPagination from "../components/tuPagination";
import type { TuHeaderDefn } from "../components/tuTable/tuTableStore.refactored";

// =====================================
// CORE FEATURES DATA (combines basic, striped, bordered, sortable, selectable)
// =====================================

const coreFeatureData = ref([
	{ id: 1, name: "John Doe", email: "john@example.com", department: "Engineering", role: "Admin", status: "active", priority: "high", score: 95 },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", department: "Marketing", role: "Manager", status: "active", priority: "medium", score: 87 },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", department: "Sales", role: "Rep", status: "inactive", priority: "low", score: 92 },
	{ id: 4, name: "Alice Brown", email: "alice@example.com", department: "HR", role: "Specialist", status: "active", priority: "high", score: 88 },
	{ id: 5, name: "Charlie Wilson", email: "charlie@example.com", department: "Finance", role: "Analyst", status: "active", priority: "medium", score: 94 }
]);

const coreFeatureColumns = ref<TuHeaderDefn[]>([
	{ field: "name", caption: "Name", sortable: true },
	{ field: "email", caption: "Email", sortable: true },
	{ field: "department", caption: "Department", sortable: true },
	{ field: "role", caption: "Role" },
	{ field: "status", caption: "Status" },
	{ field: "priority", caption: "Priority", sortable: true },
	{ field: "score", caption: "Score", sortable: true }
]);

// =====================================
// COLUMN MANAGEMENT DATA (combines column chooser, draggable, fixed width)
// =====================================

const columnManagementData = ref([
	{ id: 1, name: "John Doe", email: "john.doe@company.com", phone: "(555) 123-4567", department: "Engineering", position: "Senior Dev" },
	{ id: 2, name: "Jane Smith", email: "jane.smith@company.com", phone: "(555) 234-5678", department: "Marketing", position: "Manager" },
	{ id: 3, name: "Bob Johnson", email: "bob.johnson@company.com", phone: "(555) 345-6789", department: "Sales", position: "Sales Rep" },
	{ id: 4, name: "Alice Brown", email: "alice.brown@company.com", phone: "(555) 456-7890", department: "HR", position: "Specialist" }
]);

const columnManagementColumns = ref<TuHeaderDefn[]>([
	{ field: "id", caption: "ID", width: "60px" },
	{ field: "name", caption: "Full Name" },
	{ field: "email", caption: "Email Address" },
	{ field: "phone", caption: "Phone Number" },
	{ field: "department", caption: "Department" },
	{ field: "position", caption: "Position" }
]);

// =====================================
// INTERACTIVE FEATURES DATA (combines pagination, loading, custom content)
// =====================================

const interactiveData = ref(
	Array.from({ length: 25 }, (_, i) => ({
		id: i + 1,
		name: `Employee ${i + 1}`,
		email: `employee${i + 1}@company.com`,
		department: ["Engineering", "Marketing", "Sales", "HR", "Finance"][i % 5],
		status: i % 3 === 0 ? "inactive" : "active",
		progress: Math.floor(Math.random() * 100)
	}))
);

const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(interactiveData.value.length / itemsPerPage));

const paginatedInteractiveData = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return interactiveData.value.slice(start, end);
});

const interactiveColumns = ref<TuHeaderDefn[]>([
	{ field: "id", caption: "ID" },
	{ field: "name", caption: "Name" },
	{ field: "email", caption: "Email" },
	{ field: "department", caption: "Department" },
	{ field: "status", caption: "Status" },
	{ field: "progress", caption: "Progress" }
]);

const tableLoading = ref(false);

// =====================================
// PAGINATION DEMO DATA
// =====================================

const paginationDemoData = ref([
	{ id: 1, name: "Alice Johnson", email: "alice@demo.com", department: "Engineering", role: "Developer", status: "Active", salary: "$75,000" },
	{ id: 2, name: "Bob Smith", email: "bob@demo.com", department: "Marketing", role: "Manager", status: "Active", salary: "$80,000" },
	{ id: 3, name: "Charlie Brown", email: "charlie@demo.com", department: "Sales", role: "Rep", status: "Inactive", salary: "$60,000" },
	{ id: 4, name: "Diana Prince", email: "diana@demo.com", department: "HR", role: "Specialist", status: "Active", salary: "$65,000" },
	{ id: 5, name: "Edward Norton", email: "edward@demo.com", department: "Finance", role: "Analyst", status: "Active", salary: "$70,000" },
	{ id: 6, name: "Fiona Green", email: "fiona@demo.com", department: "Engineering", role: "Senior Dev", status: "Active", salary: "$90,000" },
	{ id: 7, name: "George Wilson", email: "george@demo.com", department: "Marketing", role: "Coordinator", status: "Active", salary: "$55,000" },
	{ id: 8, name: "Hannah Davis", email: "hannah@demo.com", department: "Sales", role: "Manager", status: "Active", salary: "$85,000" },
	{ id: 9, name: "Ian Murphy", email: "ian@demo.com", department: "HR", role: "Manager", status: "Inactive", salary: "$78,000" },
	{ id: 10, name: "Julia Roberts", email: "julia@demo.com", department: "Finance", role: "Director", status: "Active", salary: "$95,000" },
	{ id: 11, name: "Kevin Hart", email: "kevin@demo.com", department: "Engineering", role: "Junior Dev", status: "Active", salary: "$58,000" },
	{ id: 12, name: "Lisa Wong", email: "lisa@demo.com", department: "Marketing", role: "Specialist", status: "Active", salary: "$62,000" },
	{ id: 13, name: "Michael Jordan", email: "michael@demo.com", department: "Sales", role: "Rep", status: "Active", salary: "$61,000" },
	{ id: 14, name: "Nancy Drew", email: "nancy@demo.com", department: "HR", role: "Coordinator", status: "Active", salary: "$54,000" },
	{ id: 15, name: "Oscar Martinez", email: "oscar@demo.com", department: "Finance", role: "Accountant", status: "Active", salary: "$66,000" },
]);

const paginationDemoColumns = ref<TuHeaderDefn[]>([
	{ field: "id", caption: "ID", sortable: true },
	{ field: "name", caption: "Name", sortable: true, searchable: true },
	{ field: "email", caption: "Email", sortable: true, searchable: true },
	{ field: "department", caption: "Department", sortable: true, searchable: true },
	{ field: "role", caption: "Role", sortable: true },
	{ field: "status", caption: "Status", sortable: true },
	{ field: "salary", caption: "Salary", sortable: true }
]);

// =====================================
// SEARCH CONTROLS DEMO DATA
// =====================================

const searchControlsData = ref([
	{ id: 1, name: "Alice Cooper", email: "alice.cooper@company.com", department: "Engineering", position: "Senior Developer", status: "Active", location: "New York" },
	{ id: 2, name: "Bob Dylan", email: "bob.dylan@company.com", department: "Marketing", position: "Marketing Manager", status: "Active", location: "Los Angeles" },
	{ id: 3, name: "Charlie Parker", email: "charlie.parker@company.com", department: "Sales", position: "Sales Representative", status: "Inactive", location: "Chicago" },
	{ id: 4, name: "Diana Ross", email: "diana.ross@company.com", department: "HR", position: "HR Specialist", status: "Active", location: "Miami" },
	{ id: 5, name: "Elvis Presley", email: "elvis.presley@company.com", department: "Finance", position: "Financial Analyst", status: "Active", location: "Nashville" },
	{ id: 6, name: "Freddie Mercury", email: "freddie.mercury@company.com", department: "Engineering", position: "Lead Developer", status: "Active", location: "London" },
	{ id: 7, name: "Grace Kelly", email: "grace.kelly@company.com", department: "Marketing", position: "Content Creator", status: "Active", location: "Monaco" },
	{ id: 8, name: "Humphrey Bogart", email: "humphrey.bogart@company.com", department: "Sales", position: "Sales Manager", status: "Inactive", location: "Hollywood" }
]);

const searchControlsColumns = ref<TuHeaderDefn[]>([
	{ field: "id", caption: "ID", sortable: true },
	{ field: "name", caption: "Name", sortable: true, searchable: true },
	{ field: "email", caption: "Email", sortable: true, searchable: true },
	{ field: "department", caption: "Department", sortable: true, searchable: true },
	{ field: "position", caption: "Position", sortable: true, searchable: true },
	{ field: "status", caption: "Status", sortable: true, searchable: true },
	{ field: "location", caption: "Location", sortable: true, searchable: true }
]);

// =====================================
// COMPONENT RENDERING DATA
// =====================================

const componentRenderingData = ref([
	{ id: 1, name: "John Doe", email: "john@example.com", status: "active", enabled: true, priority: "high", role: "admin" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", enabled: false, priority: "medium", role: "user" },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", status: "inactive", enabled: true, priority: "low", role: "moderator" },
	{ id: 4, name: "Alice Brown", email: "alice@example.com", status: "active", enabled: true, priority: "high", role: "manager" }
]);

const componentRenderingColumns = ref<TuHeaderDefn[]>([
	{
		field: "info",
		caption: "Row Info (Template Slot Demo)",
		isTemplate: true
		// This uses a template slot: <template #info="{ rowData, rowIndex }">
	},
	{ field: "name", caption: "Name", sortable: true, searchable: true },
	{ field: "email", caption: "Email", sortable: true, searchable: true },
	{
		field: "status",
		caption: "Status",
		isTemplate: true,
		component: "tuTag", // String-based component name from registry
		componentProps: { type: "filled", size: "sm", color: "success" },
		valueFormatter: (value: unknown) => {
			const status = value as string;
			return status === "active" ? "Active" : "Inactive";
		}
	},
	{
		field: "enabled",
		caption: "Enabled", 
		isTemplate: true,
		component: "ToggleSwitch" // Using registry alias for tuSwitch
	},
	{
		field: "actions",
		caption: "Actions",
		isTemplate: true,
		component: "ActionMenu", // Using registry alias for tuTableContextMenu
		componentProps: {
			customIcon: { icon: "more_vert" },
			placement: "bottom-start",
			modelValue: [
				{
					caption: "View Details",
					onClicked: (rowData: Record<string, unknown>) => {
						alert(`User Details:\nName: ${rowData.name}\nEmail: ${rowData.email}\nRole: ${rowData.role}`);
					}
				},
				{
					caption: "Edit User",
					onClicked: (rowData: Record<string, unknown>) => {
						alert(`Opening edit dialog for ${rowData.name}...`);
					}
				},
				{
					caption: "", 
					divider: true
				},
				{
					caption: "Delete User",
					onClicked: (rowData: Record<string, unknown>) => {
						if (confirm(`Delete ${rowData.name}?`)) {
							const index = componentRenderingData.value.findIndex(u => u.id === rowData.id);
							if (index > -1) {
								componentRenderingData.value.splice(index, 1);
								alert(`${rowData.name} deleted`);
							}
						}
					}
				}
			]
		}
	}
]);

// =====================================
// SERVER-DEFINED COMPONENTS DEMO
// =====================================

const serverDefinedData = ref([
	{ id: 1, name: "Alice Cooper", email: "alice@server.com", status: "active", priority: "high", department: "Engineering" },
	{ id: 2, name: "Bob Dylan", email: "bob@server.com", status: "inactive", priority: "medium", department: "Marketing" },
	{ id: 3, name: "Charlie Parker", email: "charlie@server.com", status: "active", priority: "low", department: "Sales" },
	{ id: 4, name: "Diana Ross", email: "diana@server.com", status: "active", priority: "high", department: "HR" }
]);

// Simulate server response with component names as strings
const serverDefinedColumns = ref<TuHeaderDefn[]>([
	{ field: "name", caption: "Name", sortable: true, searchable: true },
	{ field: "email", caption: "Email", sortable: true, searchable: true },
	{
		field: "status",
		caption: "Status",
		isTemplate: true,
		component: "StatusBadge", // Server sends component name as string
		componentProps: { 
			type: "filled", 
			size: "sm"
		}
	},
	{ field: "department", caption: "Department", sortable: true },
	{
		field: "priority",
		caption: "Priority", 
		isTemplate: true,
		component: "StatusTag", // Another server-defined component
		componentProps: {
			size: "sm",
			type: "outline"
		}
	}
]);

// =====================================
// EXPANDABLE ROWS DATA
// =====================================

const expandableData = ref([
	{
		id: 1, name: "John Doe", department: "Engineering", position: "Senior Developer", email: "john.doe@company.com",
		expandedData: {
			personalInfo: { phone: "(555) 123-4567", address: "123 Main St", city: "New York", country: "USA" }
		}
	},
	{
		id: 2, name: "Jane Smith", department: "Marketing", position: "Marketing Manager", email: "jane.smith@company.com",
		expandedData: {
			personalInfo: { phone: "(555) 234-5678", address: "456 Oak Ave", city: "Los Angeles", country: "USA" }
		}
	}
]);

const expandableTableColumns = ref<TuHeaderDefn[]>([
	{ field: "name", caption: "Name" },
	{ field: "department", caption: "Department" },
	{ field: "position", caption: "Position" },
	{ field: "email", caption: "Email" }
]);

const expandedRows = ref<unknown[]>([]);

// =====================================
// CONTAINER DEMO DATA
// =====================================

const containerDemoColumns = ref<TuHeaderDefn[]>([
	{ field: "id", caption: "ID", width: "60px" },
	{ field: "name", caption: "Name" },
	{ field: "department", caption: "Department" },
	{ field: "position", caption: "Position" },
	{ field: "email", caption: "Email" },
	{ field: "status", caption: "Status", width: "100px" }
]);

const fixedHeightData = ref([
	{ id: 1, name: "Alice Johnson", department: "Engineering", position: "Senior Developer", email: "alice@example.com", status: "Active" },
	{ id: 2, name: "Bob Smith", department: "Marketing", position: "Marketing Manager", email: "bob@example.com", status: "Active" },
	{ id: 3, name: "Charlie Brown", department: "Sales", position: "Sales Rep", email: "charlie@example.com", status: "Inactive" }
]);

const viewportHeightData = ref([
	{ id: 1, name: "Michael Jordan", department: "Operations", position: "Operations Manager", email: "michael@example.com", status: "Active" },
	{ id: 2, name: "Sarah Connor", department: "Security", position: "Security Analyst", email: "sarah@example.com", status: "Active" }
]);

const fullHeightData = ref([
	{ id: 1, name: "Peter Parker", department: "Development", position: "Junior Developer", email: "peter@example.com", status: "Active" },
	{ id: 2, name: "Mary Jane", department: "Design", position: "UX Designer", email: "mary@example.com", status: "Active" }
]);

// =====================================
// SELECTION MANAGEMENT
// =====================================

const selectedRows = ref<number[]>([]);

// =====================================
// METHODS
// =====================================

// Selection methods
const selectAll = () => {
	selectedRows.value = coreFeatureData.value.map(item => item.id);
};

const clearSelection = () => {
	selectedRows.value = [];
};

const bulkAction = (action: string) => {
	alert(`Performing ${action} on ${selectedRows.value.length} items`);
	if (action === "delete") {
		coreFeatureData.value = coreFeatureData.value.filter(item => !selectedRows.value.includes(item.id));
		selectedRows.value = [];
	}
};

// Interactive methods
const toggleLoading = () => {
	tableLoading.value = !tableLoading.value;
};

const addMoreData = () => {
	const currentLength = interactiveData.value.length;
	for (let i = 1; i <= 10; i++) {
		interactiveData.value.push({
			id: currentLength + i,
			name: `New Employee ${currentLength + i}`,
			email: `employee${currentLength + i}@company.com`,
			department: ["Engineering", "Marketing", "Sales", "HR", "Finance"][i % 5],
			status: "active",
			progress: Math.floor(Math.random() * 100)
		});
	}
};

const resetInteractiveData = () => {
	interactiveData.value = Array.from({ length: 25 }, (_, i) => ({
		id: i + 1,
		name: `Employee ${i + 1}`,
		email: `employee${i + 1}@company.com`,
		department: ["Engineering", "Marketing", "Sales", "HR", "Finance"][i % 5],
		status: i % 3 === 0 ? "inactive" : "active",
		progress: Math.floor(Math.random() * 100)
	}));
	currentPage.value = 1;
};

// Pagination demo methods
const addPaginationData = () => {
	const currentLength = paginationDemoData.value.length;
	for (let i = 1; i <= 15; i++) {
		paginationDemoData.value.push({
			id: currentLength + i,
			name: `New Employee ${currentLength + i}`,
			email: `employee${currentLength + i}@demo.com`,
			department: ["Engineering", "Marketing", "Sales", "HR", "Finance"][i % 5],
			role: ["Developer", "Manager", "Specialist", "Analyst", "Coordinator"][i % 5],
			status: i % 4 === 0 ? "Inactive" : "Active",
			salary: `$${(50 + Math.floor(Math.random() * 50)) * 1000}`
		});
	}
};

const resetPaginationData = () => {
	paginationDemoData.value = [
		{ id: 1, name: "Alice Johnson", email: "alice@demo.com", department: "Engineering", role: "Developer", status: "Active", salary: "$75,000" },
		{ id: 2, name: "Bob Smith", email: "bob@demo.com", department: "Marketing", role: "Manager", status: "Active", salary: "$80,000" },
		{ id: 3, name: "Charlie Brown", email: "charlie@demo.com", department: "Sales", role: "Rep", status: "Inactive", salary: "$60,000" },
		{ id: 4, name: "Diana Prince", email: "diana@demo.com", department: "HR", role: "Specialist", status: "Active", salary: "$65,000" },
		{ id: 5, name: "Edward Norton", email: "edward@demo.com", department: "Finance", role: "Analyst", status: "Active", salary: "$70,000" },
		{ id: 6, name: "Fiona Green", email: "fiona@demo.com", department: "Engineering", role: "Senior Dev", status: "Active", salary: "$90,000" },
		{ id: 7, name: "George Wilson", email: "george@demo.com", department: "Marketing", role: "Coordinator", status: "Active", salary: "$55,000" },
		{ id: 8, name: "Hannah Davis", email: "hannah@demo.com", department: "Sales", role: "Manager", status: "Active", salary: "$85,000" },
		{ id: 9, name: "Ian Murphy", email: "ian@demo.com", department: "HR", role: "Manager", status: "Inactive", salary: "$78,000" },
		{ id: 10, name: "Julia Roberts", email: "julia@demo.com", department: "Finance", role: "Director", status: "Active", salary: "$95,000" },
		{ id: 11, name: "Kevin Hart", email: "kevin@demo.com", department: "Engineering", role: "Junior Dev", status: "Active", salary: "$58,000" },
		{ id: 12, name: "Lisa Wong", email: "lisa@demo.com", department: "Marketing", role: "Specialist", status: "Active", salary: "$62,000" },
		{ id: 13, name: "Michael Jordan", email: "michael@demo.com", department: "Sales", role: "Rep", status: "Active", salary: "$61,000" },
		{ id: 14, name: "Nancy Drew", email: "nancy@demo.com", department: "HR", role: "Coordinator", status: "Active", salary: "$54,000" },
		{ id: 15, name: "Oscar Martinez", email: "oscar@demo.com", department: "Finance", role: "Accountant", status: "Active", salary: "$66,000" },
	];
};

// Expandable methods
const handleRowExpand = () => {
	// Handle row expansion logic here
};

const expandAll = () => {
	expandedRows.value = [...expandableData.value];
};

const collapseAll = () => {
	expandedRows.value = [];
};

// Container demo methods
const addRowsToFixedHeight = () => {
	const currentLength = fixedHeightData.value.length;
	for (let i = 1; i <= 5; i++) {
		fixedHeightData.value.push({
			id: currentLength + i,
			name: `User ${currentLength + i}`,
			department: `Dept ${i}`,
			position: `Position ${i}`,
			email: `user${currentLength + i}@example.com`,
			status: "Active"
		});
	}
};

const resetFixedHeightData = () => {
	fixedHeightData.value = [
		{ id: 1, name: "Alice Johnson", department: "Engineering", position: "Senior Developer", email: "alice@example.com", status: "Active" },
		{ id: 2, name: "Bob Smith", department: "Marketing", position: "Marketing Manager", email: "bob@example.com", status: "Active" },
		{ id: 3, name: "Charlie Brown", department: "Sales", position: "Sales Rep", email: "charlie@example.com", status: "Inactive" }
	];
};

const addRowsToViewportHeight = () => {
	const currentLength = viewportHeightData.value.length;
	for (let i = 1; i <= 8; i++) {
		viewportHeightData.value.push({
			id: currentLength + i,
			name: `Employee ${currentLength + i}`,
			department: `Team ${i}`,
			position: `Role ${i}`,
			email: `emp${currentLength + i}@company.com`,
			status: "Active"
		});
	}
};

const resetViewportHeightData = () => {
	viewportHeightData.value = [
		{ id: 1, name: "Michael Jordan", department: "Operations", position: "Operations Manager", email: "michael@example.com", status: "Active" },
		{ id: 2, name: "Sarah Connor", department: "Security", position: "Security Analyst", email: "sarah@example.com", status: "Active" }
	];
};

const addRowsToFullHeight = () => {
	const currentLength = fullHeightData.value.length;
	for (let i = 1; i <= 15; i++) {
		fullHeightData.value.push({
			id: currentLength + i,
			name: `Person ${currentLength + i}`,
			department: `Team ${i}`,
			position: `Job ${i}`,
			email: `person${currentLength + i}@org.com`,
			status: "Active"
		});
	}
};

const resetFullHeightData = () => {
	fullHeightData.value = [
		{ id: 1, name: "Peter Parker", department: "Development", position: "Junior Developer", email: "peter@example.com", status: "Active" },
		{ id: 2, name: "Mary Jane", department: "Design", position: "UX Designer", email: "mary@example.com", status: "Active" }
	];
};

// =====================================
// EXTERNAL DATA MODE DEMO
// =====================================

const externalTableData = ref([
	{ id: 1, name: "John Doe", email: "john@external.com", department: "Engineering", status: "Active", priority: "High", score: 95 },
	{ id: 2, name: "Jane Smith", email: "jane@external.com", department: "Marketing", status: "Active", priority: "Medium", score: 87 },
	{ id: 3, name: "Bob Johnson", email: "bob@external.com", department: "Sales", status: "Inactive", priority: "Low", score: 92 },
	{ id: 4, name: "Alice Brown", email: "alice@external.com", department: "HR", status: "Active", priority: "High", score: 88 }
]);

const externalDataColumns = ref<TuHeaderDefn[]>([
	{ field: "name", caption: "Name", sortable: true, searchable: true },
	{ field: "email", caption: "Email", sortable: true, searchable: true },
	{ field: "department", caption: "Department", sortable: true, searchable: true },
	{ field: "status", caption: "Status", sortable: true },
	{ field: "priority", caption: "Priority", sortable: true },
	{ field: "score", caption: "Score", sortable: true }
]);

const externalQuery = ref({
	filters: [] as { field: string; value: unknown; type: string }[],
	sorts: [] as { field: string; direction: "asc" | "desc" }[],
	pagination: { page: 1, pageSize: 5 }
});

const apiCallCount = ref(0);
const externalTotalCount = ref(0);

// All available data for simulation
const allExternalData = [
	{ id: 1, name: "John Doe", email: "john@external.com", department: "Engineering", status: "Active", priority: "High", score: 95 },
	{ id: 2, name: "Jane Smith", email: "jane@external.com", department: "Marketing", status: "Active", priority: "Medium", score: 87 },
	{ id: 3, name: "Bob Johnson", email: "bob@external.com", department: "Sales", status: "Inactive", priority: "Low", score: 92 },
	{ id: 4, name: "Alice Brown", email: "alice@external.com", department: "HR", status: "Active", priority: "High", score: 88 },
	{ id: 5, name: "Charlie Wilson", email: "charlie@external.com", department: "Finance", status: "Active", priority: "Medium", score: 94 },
	{ id: 6, name: "Diana Prince", email: "diana@external.com", department: "Engineering", status: "Active", priority: "High", score: 98 },
	{ id: 7, name: "Edward Norton", email: "edward@external.com", department: "Marketing", status: "Inactive", priority: "Low", score: 82 },
	{ id: 8, name: "Fiona Green", email: "fiona@external.com", department: "Sales", status: "Active", priority: "Medium", score: 89 }
];

// Handle query changes from the table
const handleQueryChange = (query: { 
	filters: { field: string; value: unknown; type: string }[]; 
	sorts: { field: string; direction: "asc" | "desc" }[];
	pagination: { page: number; pageSize: number };
}) => {
	externalQuery.value = { ...query };
	// Automatically load data when query changes (simulating real-world usage)
	loadExternalData();
};

// Simulate an API call with the current query
const loadExternalData = () => {
	apiCallCount.value++;
	
	// Simulate API processing delay
	setTimeout(() => {
		let result = [...allExternalData];
		
		// Apply filters (server-side simulation)
		externalQuery.value.filters.forEach(filter => {
			if (filter.value && filter.field) {
				const filterValue = String(filter.value).toLowerCase();
				result = result.filter(item => {
					const fieldValue = String(item[filter.field as keyof typeof item] || "").toLowerCase();
					switch (filter.type) {
					case "like":
						return fieldValue.includes(filterValue);
					case "equals":
						return fieldValue === filterValue;
					default:
						return true;
					}
				});
			}
		});
		
		// Apply sorts (server-side simulation)
		externalQuery.value.sorts.forEach(sort => {
			result.sort((a, b) => {
				const aVal = a[sort.field as keyof typeof a];
				const bVal = b[sort.field as keyof typeof b];
				
				if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
				if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
				return 0;
			});
		});
		
		// Store total results before pagination for display
		externalTotalCount.value = result.length;
		
		// Apply pagination (server-side simulation)
		const { page, pageSize } = externalQuery.value.pagination;
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		result = result.slice(startIndex, endIndex);
		
		// Update the table data with paginated results
		externalTableData.value = result;
	}, 300); // Simulate network delay
};

const resetExternalData = () => {
	externalTableData.value = [...allExternalData.slice(0, 4)]; // Reset to initial 4 items
	apiCallCount.value = 0;
};

const clearAllFiltersAndSorts = () => {
	externalQuery.value = { 
		filters: [], 
		sorts: [],
		pagination: { page: 1, pageSize: 5 }
	};
	loadExternalData();
};

// Column reorder handler
const handleColumnReorder = (tableName: string, event: { columns: TuHeaderDefn[]; fromIndex: number; toIndex: number; persistentId?: string }) => {
	switch (tableName) {
	case "coreFeatures":
		coreFeatureColumns.value = [...event.columns];
		break;
	case "columnManagement":
		columnManagementColumns.value = [...event.columns];
		break;
	}
};

// Initialize external data on mount
onMounted(() => {
	loadExternalData();
});
</script>

<style scoped>
.selected {
	background-color: #e3f2fd !important;
}

.active {
	background-color: #f5f5f5;
}

/* Expanded Row Content Styles */
.expanded-row-content {
	padding: 20px;
	background: #f8f9fa;
	border-left: 4px solid #007bff;
	font-size: 0.9em;
}

.expanded-row-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	margin-bottom: 20px;
}

.expanded-section {
	margin-bottom: 15px;
}

.expanded-section h5 {
	margin: 0 0 10px 0;
	color: #495057;
	font-size: 1em;
	font-weight: 600;
	border-bottom: 1px solid #dee2e6;
	padding-bottom: 5px;
}

.info-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 8px;
}

.info-item {
	padding: 4px 0;
}

.info-item strong {
	color: #495057;
	margin-right: 8px;
	font-weight: 500;
}

/* Container Height Demonstration Styles */

/* Height Demo Grid */
.height-demo-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	margin: 20px 0;
}

.height-demo-card {
	border: 1px solid #dee2e6;
	border-radius: 8px;
	padding: 15px;
	background: #ffffff;
}

.height-demo-card h4 {
	margin: 0 0 8px 0;
	font-size: 1.1em;
	color: #495057;
}

.demo-description {
	margin: 0 0 10px 0;
	font-size: 0.85em;
	color: #6c757d;
}

/* Fixed Height Container (300px) */
.fixed-height-container {
	height: 300px;
	border: 2px solid #e9ecef;
	border-radius: 6px;
	background: #f8f9fa;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

/* Viewport Height Container (40vh) */
.viewport-height-container {
	height: 40vh;
	min-height: 250px;
	border: 2px solid #dee2e6;
	border-radius: 6px;
	background: #ffffff;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

/* Full Height Flex Container */
.full-height-flex-container {
	height: 60vh;
	min-height: 400px;
	border: 2px solid #adb5bd;
	border-radius: 12px;
	background: #ffffff;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-section {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	flex-shrink: 0;
}

.table-section {
	flex: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.footer-section {
	background: #f8f9fa;
	border-top: 1px solid #dee2e6;
	flex-shrink: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.height-demo-grid {
		grid-template-columns: 1fr;
		gap: 15px;
	}
	
	.expanded-row-grid {
		grid-template-columns: 1fr;
	}
	
	.info-grid {
		grid-template-columns: 1fr;
	}
}
</style>
