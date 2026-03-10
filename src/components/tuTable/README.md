# TuTable Component Documentation

## Overview

`TuTable` is a powerful, feature-rich data table component for Vue 3 applications. It provides comprehensive functionality including sorting, filtering, pagination, row selection, expandable rows, column management, and custom cell rendering.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props](#props)
- [Events](#events)
- [Column Definition](#column-definition)
- [Features](#features)
  - [Sorting](#sorting)
  - [Filtering & Search](#filtering--search)
  - [Pagination](#pagination)
  - [Row Selection](#row-selection)
  - [Expandable Rows](#expandable-rows)
  - [Column Management](#column-management)
  - [Custom Cell Rendering](#custom-cell-rendering)
  - [External Data Mode](#external-data-mode)
  - [Height & Scrolling](#height--scrolling)
- [Styling Options](#styling-options)
- [Advanced Examples](#advanced-examples)

---

## Installation

```typescript
import { TuTable } from "@/components/tuTable";
```

---

## Basic Usage

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TuTable } from "@/components/tuTable";
import type { TuHeaderDefn } from "@/components/tuTable/tuTableStore.refactored";

const columns = ref<TuHeaderDefn[]>([
  { field: "id", caption: "ID" },
  { field: "name", caption: "Name" },
  { field: "email", caption: "Email" }
]);

const data = ref([
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
]);
</script>
```

---

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TuHeaderDefn[]` | `[]` | Column definitions for the table |
| `data` | `unknown[]` | `[]` | Data array to display in the table |
| `id` | `string` | auto-generated | Unique identifier for the table instance |

### Selection & Interaction

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `unknown` | `undefined` | Selected row(s) - can be single value or array |
| `multiSelect` | `boolean` | `false` | Enable multi-row selection with checkboxes |

### Table Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columnSelector` | `boolean` | `false` | Show column chooser control to show/hide columns |
| `searchControls` | `boolean` | `false` | Show search toggle button to enable/disable search fields |
| `rowExpand` | `boolean` | `false` | Enable row expansion functionality |
| `expandedRows` | `unknown[]` | `[]` | Array of expanded row data |
| `externalData` | `boolean` | `false` | Enable external data mode (server-side processing) |
| `draggableColumns` | `boolean` | `false` | Allow column reordering via drag and drop |
| `persistentId` | `string` | `""` | ID for persisting column order and visibility to localStorage |

### Styling & Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | `false` | Apply striped row styling |
| `bordered` | `boolean` | `false` | Add borders to the table |
| `compact` | `boolean` | `false` | Use compact cell padding |
| `size` | `string` | `""` | Size variant (e.g., "sm", "lg") |
| `fixedWidth` | `boolean` | `false` | Enable fixed table layout with text truncation |

### Height & Scrolling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `string \| number` | `""` | Fixed height for the table container (enables scrolling) |
| `maxHeight` | `string \| number` | `""` | Maximum height for the table container |

### State

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Display loading state |

### Pagination

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageSize` | `number` | `25` | Number of rows per page |
| `pagination` | `boolean` | `false` | Enable built-in pagination footer |

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `unknown` | Emitted when row selection changes |
| `update:expandedRows` | `unknown[]` | Emitted when expanded rows change |
| `rowClick` | `unknown` | Emitted when a row is clicked |
| `rowExpand` | `{ row: unknown; expanded: boolean }` | Emitted when a row is expanded/collapsed |
| `columnVisibilityChange` | `{ columns: TuHeaderDefn[] }` | Emitted when column visibility changes |
| `columnReorder` | `{ columns: TuHeaderDefn[]; fromIndex: number; toIndex: number; persistentId?: string }` | Emitted when columns are reordered |
| `queryChange` | `{ filters: FilterDefn[]; sorts: SorterDefn[]; pagination: { page: number; pageSize: number } }` | Emitted in external data mode when filters, sorts, or pagination change |

---

## Column Definition

### TuHeaderDefn Interface

```typescript
interface TuHeaderDefn {
  // Required
  field: string;              // Field name in data object
  caption: string;            // Display name for column header
  
  // Layout
  index?: number;             // Column order index
  visible?: boolean;          // Column visibility (default: true)
  width?: number | string;    // Explicit width (e.g., "120px", 120)
  minWidth?: number;          // Minimum width in pixels
  maxWidth?: number;          // Maximum width in pixels
  
  // Data & Formatting
  dataType?: "string" | "number" | "boolean" | "timestamp";
  valueFormatter?: (value: unknown) => string;  // Custom value formatter
  
  // Features
  sortable?: boolean;         // Enable sorting for this column
  searchable?: boolean;       // Enable searching for this column
  textWrap?: boolean;         // Allow text wrapping
  
  // Custom Rendering
  isTemplate?: boolean;       // Use template-based rendering
  isComponent?: boolean;      // Legacy component rendering
  component?: Component | string;  // Component to render (can be string name from registry)
  componentProps?: Record<string, unknown>;  // Props to pass to component
  
  // Custom Search
  searchFunction?: (fieldValue: unknown, searchValue: unknown) => boolean;
}
```

### Column Examples

```typescript
// Basic column
{ field: "name", caption: "Name" }

// Sortable and searchable
{ field: "email", caption: "Email", sortable: true, searchable: true }

// Fixed width
{ field: "id", caption: "ID", width: "60px" }

// Custom formatter
{ 
  field: "salary", 
  caption: "Salary",
  valueFormatter: (value) => `$${value.toLocaleString()}`
}

// Template-based component rendering
{
  field: "status",
  caption: "Status",
  isTemplate: true,
  component: "StatusBadge",  // String name from component registry
  componentProps: { type: "filled", size: "sm" }
}

// Custom search function
{
  field: "age",
  caption: "Age",
  searchable: true,
  searchFunction: (fieldValue, searchValue) => {
    return Number(fieldValue) >= Number(searchValue);
  }
}
```

---

## Features

### Sorting

Enable sorting on individual columns using the `sortable` property:

```vue
<template>
  <TuTable :columns="columns" :data="data" />
</template>

<script setup lang="ts">
const columns = ref<TuHeaderDefn[]>([
  { field: "name", caption: "Name", sortable: true },
  { field: "email", caption: "Email", sortable: true },
  { field: "age", caption: "Age", sortable: true }
]);
</script>
```

**Features:**
- Click column header to sort ascending
- Click again to sort descending
- Click a third time to remove sorting
- Multi-column sorting not currently supported

---

### Filtering & Search

#### Basic Search

Enable search fields for specific columns:

```vue
<template>
  <TuTable :columns="columns" :data="data" search-controls />
</template>

<script setup lang="ts">
const columns = ref<TuHeaderDefn[]>([
  { field: "name", caption: "Name", searchable: true },
  { field: "email", caption: "Email", searchable: true },
  { field: "department", caption: "Department", searchable: true }
]);
</script>
```

**Features:**
- `searchControls` prop adds a toggle button to show/hide all search fields
- Search fields appear in the column headers
- Supports text-based searching (like operator)
- Press **Enter** to apply filters (prevents excessive filtering while typing)

#### Custom Search Functions

Define custom search logic for specific columns:

```typescript
{
  field: "price",
  caption: "Price",
  searchable: true,
  searchFunction: (fieldValue, searchValue) => {
    // Custom logic: find products under a certain price
    return Number(fieldValue) <= Number(searchValue);
  }
}
```

---

### Pagination

#### Built-in Pagination

Enable the integrated pagination component:

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
    pagination
    :pageSize="10"
  />
</template>
```

**Features:**
- Right-aligned pagination footer
- Page size selector (10, 25, 50, 100)
- Total records display
- Page navigation

#### Manual Pagination

Use external pagination component for more control:

```vue
<template>
  <TuTable :columns="columns" :data="paginatedData" />
  
  <TuPagination 
    v-model="currentPage" 
    :length="totalPages"
    @update:modelValue="handlePageChange"
  />
</template>

<script setup lang="ts">
const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return data.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => 
  Math.ceil(data.value.length / itemsPerPage)
);
</script>
```

---

### Row Selection

#### Single Selection

```vue
<template>
  <TuTable 
    v-model="selectedRow"
    :columns="columns"
    :data="data"
    @rowClick="handleRowClick"
  />
</template>

<script setup lang="ts">
const selectedRow = ref(null);

function handleRowClick(row: unknown) {
  console.log("Selected row:", row);
}
</script>
```

#### Multi-Selection

```vue
<template>
  <TuTable 
    v-model="selectedRows"
    :columns="columns"
    :data="data"
    multiSelect
  />
  
  <div>Selected: {{ selectedRows.length }} rows</div>
</template>

<script setup lang="ts">
const selectedRows = ref<unknown[]>([]);
</script>
```

**Features:**
- Checkbox column automatically added
- Select all checkbox in header
- Indeterminate state for partial selection

---

### Expandable Rows

Enable row expansion with custom content:

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
    row-expand
    :expanded-rows="expandedRows"
    @update:expanded-rows="expandedRows = $event"
    @row-expand="handleRowExpand"
  >
    <template #expandedRow="{ row, expandedData, rowIndex }">
      <div class="expanded-content">
        <h4>Additional Details</h4>
        <p>Full Name: {{ expandedData.fullName }}</p>
        <p>Address: {{ expandedData.address }}</p>
        <p>Phone: {{ expandedData.phone }}</p>
      </div>
    </template>
  </TuTable>
</template>

<script setup lang="ts">
const expandedRows = ref<unknown[]>([]);

const data = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    expandedData: {
      fullName: "John Michael Doe",
      address: "123 Main St, NY",
      phone: "(555) 123-4567"
    }
  }
]);

function handleRowExpand({ row, expanded }) {
  console.log(`Row ${row.id} ${expanded ? 'expanded' : 'collapsed'}`);
}
</script>
```

**Features:**
- Arrow icon in leftmost column
- Smooth expand/collapse animation
- Access to both main row data and expandedData
- Can contain any custom content (forms, nested tables, etc.)

---

### Column Management

#### Column Chooser

Allow users to show/hide columns:

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
    column-selector
    persistent-id="my-table"
    @columnVisibilityChange="handleVisibilityChange"
  />
</template>

<script setup lang="ts">
function handleVisibilityChange({ columns }) {
  console.log("Column visibility changed:", columns);
}
</script>
```

#### Drag & Drop Column Reordering

Enable column reordering:

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
    draggable-columns
    persistent-id="my-table"
    @columnReorder="handleReorder"
  />
</template>

<script setup lang="ts">
function handleReorder({ columns, fromIndex, toIndex }) {
  console.log(`Column moved from ${fromIndex} to ${toIndex}`);
  // Update your columns array
  columnDefinitions.value = columns;
}
</script>
```

#### Persistent State

Use `persistent-id` to save column order and visibility to localStorage:

```vue
<TuTable 
  :columns="columns"
  :data="data"
  draggable-columns
  column-selector
  persistent-id="users-table"
/>
```

**Features:**
- Automatically saves to localStorage
- Restores state on component mount
- Unique per `persistent-id`

---

### Custom Cell Rendering

#### Template Slots

Use named slots for custom cell content:

```vue
<template>
  <TuTable :columns="columns" :data="data">
    <template #actions="{ rowData, rowIndex }">
      <tu-button @click="editRow(rowData)" size="sm">Edit</tu-button>
      <tu-button @click="deleteRow(rowData)" size="sm" danger>Delete</tu-button>
    </template>
  </TuTable>
</template>

<script setup lang="ts">
const columns = ref<TuHeaderDefn[]>([
  { field: "name", caption: "Name" },
  { field: "email", caption: "Email" },
  { 
    field: "actions", 
    caption: "Actions",
    isTemplate: true  // Mark as template column
  }
]);
</script>
```

#### Component Registry

Render components by string name (useful for server-defined tables):

```vue
<template>
  <TuTable :columns="columns" :data="data" />
</template>

<script setup lang="ts">
const columns = ref<TuHeaderDefn[]>([
  { field: "name", caption: "Name" },
  {
    field: "status",
    caption: "Status",
    isTemplate: true,
    component: "StatusBadge",  // Component name from registry
    componentProps: { 
      type: "filled", 
      size: "sm" 
    }
  }
]);
</script>
```

**Component Registry** (located in `componentRegistry.ts`):
- Pre-registered components: `StatusBadge`, `StatusTag`, `ToggleSwitch`, `ActionMenu`
- Register custom components using `registerTableComponent(name, component)`

#### Value Formatters

Transform cell values before display:

```typescript
{
  field: "price",
  caption: "Price",
  valueFormatter: (value) => `$${Number(value).toFixed(2)}`
}

{
  field: "date",
  caption: "Created",
  valueFormatter: (value) => new Date(value).toLocaleDateString()
}

{
  field: "status",
  caption: "Status",
  valueFormatter: (value) => {
    const statusMap = {
      active: "✓ Active",
      inactive: "✗ Inactive"
    };
    return statusMap[value] || value;
  }
}
```

---

### External Data Mode

Enable server-side processing for large datasets:

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="tableData"
    external-data
    pagination
    :pageSize="10"
    search-controls
    @queryChange="handleQueryChange"
  />
</template>

<script setup lang="ts">
const tableData = ref([]);
const totalCount = ref(0);

async function handleQueryChange(query) {
  const { filters, sorts, pagination } = query;
  
  console.log("Query changed:", {
    filters,      // [{ field, value, type }]
    sorts,        // [{ field, direction }]
    pagination    // { page, pageSize }
  });
  
  // Make API call
  const response = await fetch('/api/data', {
    method: 'POST',
    body: JSON.stringify({
      filters,
      sorts,
      page: pagination.page,
      pageSize: pagination.pageSize
    })
  });
  
  const result = await response.json();
  tableData.value = result.data;
  totalCount.value = result.total;
}
</script>
```

**Features:**
- Emits `queryChange` event instead of processing data locally
- Filters only trigger on **Enter** key (prevents excessive API calls)
- Sorting triggers immediately
- Pagination triggers on page or page size change
- UI updates optimistically for better UX

**Query Structure:**
```typescript
{
  filters: [
    { field: "name", value: "John", type: "like" },
    { field: "status", value: "active", type: "equals" }
  ],
  sorts: [
    { field: "createdAt", direction: "desc" }
  ],
  pagination: {
    page: 1,
    pageSize: 10
  }
}
```

---

### Height & Scrolling

#### Fixed Height

Create a scrollable table with fixed height:

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
    height="400px"
    striped
  />
</template>
```

#### Maximum Height

Set a maximum height with automatic scrolling:

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
    max-height="600px"
  />
</template>
```

#### Viewport Height

Use viewport units for responsive layouts:

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
    height="80vh"
  />
</template>
```

#### Full-Page Layout

Create a flex layout with table filling remaining space:

```vue
<template>
  <div class="app-container">
    <header class="header">Application Header</header>
    
    <div class="table-container">
      <TuTable 
        :columns="columns"
        :data="data"
        height="100%"
      />
    </div>
    
    <footer class="footer">Footer Content</footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.table-container {
  flex: 1;
  overflow: hidden;
}

.header, .footer {
  flex-shrink: 0;
}
</style>
```

**Features:**
- Sticky header when scrolling
- Fixed column widths prevent layout shift
- Custom scrollbar styling
- Works with pagination

---

## Styling Options

### Striped Rows

```vue
<TuTable :columns="columns" :data="data" striped />
```

Applies alternating background colors to rows.

### Bordered Table

```vue
<TuTable :columns="columns" :data="data" bordered />
```

Adds borders around the entire table with rounded corners.

### Compact Mode

```vue
<TuTable :columns="columns" :data="data" compact />
```

Reduces cell padding for more compact layout.

### Fixed Width

```vue
<TuTable :columns="columns" :data="data" fixed-width />
```

Enables fixed table layout with text truncation and ellipsis.

### Size Variants

```vue
<TuTable :columns="columns" :data="data" size="sm" />
<TuTable :columns="columns" :data="data" size="lg" />
```

### Custom Styling

```vue
<template>
  <TuTable 
    :columns="columns"
    :data="data"
    class="custom-table"
  />
</template>

<style>
.custom-table {
  /* Custom styles */
}

.custom-table :deep(.tu-table__th) {
  background-color: #f0f0f0;
  font-weight: 600;
}

.custom-table :deep(.tu-table__td) {
  padding: 12px;
}
</style>
```

---

## Advanced Examples

### Complete Feature Showcase

```vue
<template>
  <TuTable 
    v-model="selectedRows"
    :columns="columns"
    :data="data"
    :loading="loading"
    
    multiSelect
    row-expand
    :expanded-rows="expandedRows"
    @update:expanded-rows="expandedRows = $event"
    
    column-selector
    draggable-columns
    search-controls
    persistent-id="advanced-table"
    
    pagination
    :pageSize="25"
    
    striped
    bordered
    height="600px"
    
    @rowClick="handleRowClick"
    @rowExpand="handleRowExpand"
    @columnReorder="handleColumnReorder"
  >
    <!-- Custom cell template -->
    <template #actions="{ rowData }">
      <tu-button @click="edit(rowData)" size="sm">Edit</tu-button>
    </template>
    
    <!-- Expanded row template -->
    <template #expandedRow="{ row, expandedData }">
      <div class="details">
        <h4>Details for {{ row.name }}</h4>
        <pre>{{ JSON.stringify(expandedData, null, 2) }}</pre>
      </div>
    </template>
  </TuTable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TuTable } from "@/components/tuTable";
import type { TuHeaderDefn } from "@/components/tuTable/tuTableStore.refactored";

const loading = ref(false);
const selectedRows = ref<unknown[]>([]);
const expandedRows = ref<unknown[]>([]);

const columns = ref<TuHeaderDefn[]>([
  { field: "id", caption: "ID", width: "60px", sortable: true },
  { field: "name", caption: "Name", sortable: true, searchable: true },
  { field: "email", caption: "Email", sortable: true, searchable: true },
  { 
    field: "status", 
    caption: "Status",
    sortable: true,
    isTemplate: true,
    component: "StatusBadge"
  },
  { 
    field: "salary", 
    caption: "Salary",
    sortable: true,
    valueFormatter: (value) => `$${Number(value).toLocaleString()}`
  },
  { field: "actions", caption: "Actions", isTemplate: true }
]);

const data = ref([
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com",
    status: "active",
    salary: 75000,
    expandedData: { 
      address: "123 Main St",
      phone: "(555) 123-4567"
    }
  },
  // ... more data
]);

function handleRowClick(row: unknown) {
  console.log("Row clicked:", row);
}

function handleRowExpand({ row, expanded }) {
  console.log(`Row ${expanded ? 'expanded' : 'collapsed'}`, row);
}

function handleColumnReorder({ columns, fromIndex, toIndex }) {
  // Update column order
  columnDefinitions.value = columns;
}

function edit(row: unknown) {
  console.log("Edit row:", row);
}
</script>
```

### Server-Side Data Table

```vue
<template>
  <div>
    <TuTable 
      :columns="columns"
      :data="tableData"
      external-data
      pagination
      :pageSize="pageSize"
      search-controls
      column-selector
      striped
      bordered
      @queryChange="fetchData"
    />
    
    <div class="table-info">
      Showing {{ tableData.length }} of {{ totalRecords }} records
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TuTable } from "@/components/tuTable";

const tableData = ref([]);
const totalRecords = ref(0);
const pageSize = ref(25);
const loading = ref(false);

const columns = ref([
  { field: "id", caption: "ID", sortable: true },
  { field: "name", caption: "Name", sortable: true, searchable: true },
  { field: "email", caption: "Email", sortable: true, searchable: true },
  { field: "department", caption: "Department", sortable: true, searchable: true }
]);

async function fetchData(query) {
  loading.value = true;
  
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });
    
    const result = await response.json();
    tableData.value = result.data;
    totalRecords.value = result.total;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    loading.value = false;
  }
}
</script>
```

### Dynamic Columns from Server

```vue
<template>
  <TuTable 
    :columns="dynamicColumns"
    :data="dynamicData"
    column-selector
    striped
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const dynamicColumns = ref([]);
const dynamicData = ref([]);

onMounted(async () => {
  // Fetch column definitions from server
  const columnsResponse = await fetch('/api/table-config');
  const columnsData = await columnsResponse.json();
  
  // Server returns column definitions with component names as strings
  dynamicColumns.value = columnsData.columns.map(col => ({
    field: col.field,
    caption: col.caption,
    sortable: col.sortable,
    searchable: col.searchable,
    isTemplate: col.isTemplate,
    component: col.component,  // String like "StatusBadge"
    componentProps: col.componentProps
  }));
  
  // Fetch data
  const dataResponse = await fetch('/api/table-data');
  dynamicData.value = await dataResponse.json();
});
</script>
```

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported
- Requires Vue 3.x

## Performance Considerations

- **Large Datasets**: Use `externalData` mode for datasets with 1000+ rows
- **Fixed Width**: Enable `fixedWidth` prop for better performance with many columns
- **Pagination**: Always use pagination for large datasets
- **Virtual Scrolling**: Not currently supported (consider external data mode instead)

## Accessibility

- Semantic HTML table structure
- Keyboard navigation support (arrow keys for expansion)
- ARIA attributes for sorting and selection
- Screen reader friendly

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type { 
  TuHeaderDefn, 
  TuTableRow, 
  TuFilterDefn,
  TuSortDirection 
} from "@/components/tuTable/tuTableStore.refactored";
```

---

## Contributing

To extend or customize the table component:

1. **Component Registry**: Add custom components to `componentRegistry.ts`
2. **Store Logic**: Modify table logic in `tuTableStore.refactored.ts`
3. **Styling**: Override SCSS variables in your theme

## License

[Your license information]

---

## Related Components

- **TuPagination**: Standalone pagination component
- **TuPopper**: Used for column chooser dropdown
- **TuCheckbox**: Used for row selection
- **TuIcon**: Used for icons throughout the table
- **TuLoading**: Loading state indicator

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.
