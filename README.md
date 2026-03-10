# Tukal Vue

A comprehensive, modern Vue 3 component library built with TypeScript and the Composition API. Tukal provides a rich set of customizable UI components designed for building beautiful and responsive web applications.

[![Version](https://img.shields.io/npm/v/tukal-vue.svg)](https://www.npmjs.com/package/tukal-vue)
[![License](https://img.shields.io/npm/l/tukal-vue.svg)](https://github.com/Nullarc-Inc/tukal/blob/main/LICENSE)

## ✨ Features

- 🎨 **60+ Components** - Comprehensive set of UI components
- 🔷 **TypeScript Support** - Full TypeScript definitions
- ⚡ **Vue 3 & Composition API** - Built with modern Vue 3 features
- 🎯 **Tree Shakeable** - Import only what you need
- 🎭 **Customizable** - Extensive theming and styling options
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - ARIA compliant components
- 🧪 **Well Tested** - Unit tests with Vitest

## 📦 Installation

```bash
npm install tukal-vue
```

Or with yarn:

```bash
yarn add tukal-vue
```

Or with pnpm:

```bash
pnpm add tukal-vue
```

## 🚀 Quick Start

### 1. Import Styles

Import the CSS in your main entry file (e.g., `main.ts`):

```typescript
import 'tukal-vue/css'
```

### 2. Register Components

You can use components in two ways:

#### Option A: Global Registration (with Plugin)

```typescript
import { createApp } from 'vue'
import { TukalPlugin } from 'tukal-vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

// Install Tukal plugin with optional configuration
app.use(TukalPlugin, {
  router,  // Optional: for components with routing
  iconPackGlobal: 'material-icons'  // Optional: default icon pack
})

app.mount('#app')
```

#### Option B: Import Individual Components

```vue
<script setup lang="ts">
import { TuButton, TuInput, TuCard } from 'tukal-vue'
</script>

<template>
  <TuCard>
    <TuInput v-model="name" placeholder="Enter your name" />
    <TuButton color="primary" @click="submit">Submit</TuButton>
  </TuCard>
</template>
```

## 📚 Component Categories

### Form Components
- **TuButton** - Versatile button with multiple variants
- **TuInput** - Text input with validation
- **TuTextArea** - Multi-line text input
- **TuSelect** - Dropdown select with options
- **TuCheckbox** - Checkbox input
- **TuRadio** - Radio button input
- **TuSwitch** - Toggle switch
- **TuColorPicker** - Color selection
- **TuUpload** - File upload
- **TuRichTextEditor** - WYSIWYG editor

### Layout Components
- **TuRow** / **TuCol** - Grid system
- **TuCard** - Content container
- **TuDivider** - Visual separator
- **TuCollapse** - Collapsible content

### Navigation Components
- **TuNavbar** - Top navigation bar
- **TuSidebar** - Side navigation menu
- **TuBreadcrumb** - Breadcrumb navigation
- **TuTabs** - Tabbed interface
- **TuPagination** - Page navigation

### Display Components
- **TuAvatar** - User avatar
- **TuIcon** - Icon display
- **TuChip** / **TuTag** - Labels and tags
- **TuAlert** - Alert messages
- **TuProgress** - Progress indicators
- **TuUsageBar** - Usage visualization
- **TuTimeline** - Timeline display

### Data Components
- **TuTable** - Data table with sorting and filtering
- **TuTreeView** - Hierarchical tree structure
- **TuKanban** - Kanban board
- **TuCalendar** - Date picker and calendar
- **TuCalendarHeatMap** - Activity heatmap

### Interactive Components
- **TuDialog** - Modal dialogs
- **TuPopper** - Tooltips and popovers
- **TuNotification** - Toast notifications
- **TuCron** - Cron expression builder

## 💡 Usage Examples

### Basic Button

```vue
<template>
  <TuButton color="primary" @click="handleClick">
    Click Me
  </TuButton>
</template>

<script setup lang="ts">
import { TuButton } from 'tukal-vue'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

### Form Input

```vue
<template>
  <TuInput 
    v-model="email"
    type="email"
    label="Email Address"
    placeholder="Enter your email"
    :required="true"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TuInput } from 'tukal-vue'

const email = ref('')
</script>
```

### Data Table

```vue
<template>
  <TuTable :data="users" :columns="columns">
    <template #cell-name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>
  </TuTable>
</template>

<script setup lang="ts">
import { TuTable } from 'tukal-vue'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true }
]
</script>
```

### Navigation with Router

```vue
<template>
  <TuSidebar>
    <TuSidebarItem to="/dashboard" icon>
      <template #icon>
        <TuIcon>dashboard</TuIcon>
      </template>
      Dashboard
    </TuSidebarItem>
    
    <TuSidebarItem to="/users" icon>
      <template #icon>
        <TuIcon>people</TuIcon>
      </template>
      Users
    </TuSidebarItem>
  </TuSidebar>
</template>

<script setup lang="ts">
import { TuSidebar, TuSidebarItem, TuIcon } from 'tukal-vue'
</script>
```

## 🎨 Theming & Customization

Tukal components support extensive theming through CSS variables and props.

### Color Props

Most components accept a `color` prop:

```vue
<TuButton color="primary">Primary</TuButton>
<TuButton color="success">Success</TuButton>
<TuButton color="danger">Danger</TuButton>
<TuButton color="warn">Warning</TuButton>
<TuButton color="dark">Dark</TuButton>
```

### Variant Props

Many components support different visual variants:

```vue
<TuButton variant="solid">Solid</TuButton>
<TuButton variant="outline">Outline</TuButton>
<TuButton variant="flat">Flat</TuButton>
<TuButton variant="gradient">Gradient</TuButton>
```

### Custom Colors

You can use the utility functions to work with colors:

```vue
<script setup lang="ts">
import { getColor, useTukal } from 'tukal-vue'

const { getColor } = useTukal()
const primaryColor = getColor('primary')
</script>
```

## 🔧 Composables

Tukal provides composables for accessing shared functionality in `<script setup>`:

### useTukal()

Access router, icon pack, and utility functions:

```vue
<script setup lang="ts">
import { useTukal } from 'tukal-vue'

const { router, iconPackGlobal, getColor, getColorAsRgb } = useTukal()

const navigateHome = () => {
  router?.push('/home')
}
</script>
```

### useTukalColor()

Handle color-related props and computations:

```vue
<script setup lang="ts">
import { useTukalColor } from 'tukal-vue'

const props = defineProps<{
  color?: string
  colorSecondary?: string
}>()

const {
  isColorDark,
  isColor,
  getColorSecondary
} = useTukalColor(props)
</script>
```

## 📖 TypeScript Support

Tukal is written in TypeScript and provides full type definitions:

```typescript
import type { 
  TuButtonProps,
  TuInputProps,
  TuTableColumn,
  TuKanbanItem 
} from 'tukal-vue'

const columns: TuTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true }
]
```

## 🧪 Testing

Components can be easily tested with Vue Test Utils:

```typescript
import { mount } from '@vue/test-utils'
import { TuButton } from 'tukal-vue'

test('button click', async () => {
  const wrapper = mount(TuButton, {
    props: { color: 'primary' },
    slots: { default: 'Click me' }
  })
  
  await wrapper.trigger('click')
  expect(wrapper.emitted()).toHaveProperty('click')
})
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm run test

# Type check
npm run dev:types
```

## 📄 License

[License information here]

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## 📞 Support

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/Nullarc-Inc/tukal/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Nullarc-Inc/tukal/discussions)

## 🙏 Acknowledgments

Built with ❤️ by [Nullarc Inc](https://github.com/Nullarc-Inc)

---

Made with Vue 3, TypeScript, and Vite
