<template>
	<div id="app">
		<!-- Navigation Menu -->
		<nav class="showcase-nav">
			<div class="nav-header">
				<h2>Tukal Component Showcase</h2>
				<button 
					@click="toggleNav" 
					class="nav-toggle"
					:class="{ expanded: isNavExpanded }"
				>
					<span class="toggle-icon">{{ isNavExpanded ? '−' : '+' }}</span>
					{{ isNavExpanded ? 'Collapse' : 'Expand' }} Menu
				</button>
			</div>
			
			<!-- Active Component Display -->
			<div v-if="activeComponent && !isNavExpanded" class="active-component-display">
				<span class="active-label">Active:</span>
				<span class="active-component-name">{{ getComponentName(activeComponent) }}</span>
			</div>
			
			<!-- Collapsible Navigation List -->
			<div class="nav-container" :class="{ collapsed: !isNavExpanded }">
				<ul class="nav-list">
					<li
						v-for="component in showcaseComponents"
						:key="component.key"
					>
						<a
							@click="loadComponent(component.key)"
							:class="{ active: activeComponent === component.key }"
							class="nav-link"
							href="#"
							@click.prevent
						>
							{{ component.name }}
						</a>
					</li>
				</ul>
			</div>
		</nav>

		<!-- Dynamic Component Area -->
		<main class="showcase-content">
			<div v-if="!activeComponent" class="welcome-message">
				<h3>Welcome to Tukal Component Library</h3>
				<p>Click on any component above to see its showcase</p>
			</div>
			
			<div v-else-if="isLoading" class="loading-message">
				<tu-loading active />
				<p>Loading {{ getComponentName(activeComponent) }}...</p>
			</div>

			<component 
				v-else-if="loadedComponent" 
				:is="loadedComponent" 
				:key="activeComponent"
			/>
			
			<div v-else class="error-message">
				<p>Failed to load component</p>
				<tu-button @click="retryLoad">Retry</tu-button>
			</div>
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from "vue";
import * as components from "./components";

export default defineComponent({
	name: "App",
	components: {
		...components
	},
	setup() {
		const activeComponent = ref<string | null>(null);
		const loadedComponent = ref<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
		const isLoading = ref(false);
		const isNavExpanded = ref(true);

		const showcaseComponents = [
			{ key: "buttons", name: "Buttons" },
			{ key: "button-groups", name: "Button Groups" },
			{ key: "alerts", name: "Alerts" },
			{ key: "cards", name: "Cards" },
			{ key: "checkboxes", name: "CheckBoxes" },
			{ key: "collapse", name: "Collapse" },
			{ key: "dialog", name: "Dialog" },
			{ key: "input", name: "Input" },
			{ key: "radio", name: "Radio" },
			{ key: "select", name: "Select" },
			{ key: "dropdown", name: "Dropdown" },
			{ key: "sidebar", name: "Sidebar" },
			{ key: "switch", name: "Switch" },
			{ key: "navbar", name: "Navbar" },
			{ key: "pagination", name: "Pagination" },
			{ key: "tabs", name: "Tabs" },
			{ key: "progress", name: "Progress" },
			{ key: "textarea", name: "Text Area" },
			{ key: "colorpicker", name: "Color Picker" },
			{ key: "rich-text-editor", name: "Rich Text Editor" },
			{ key: "table", name: "Table" },
			{ key: "calendar", name: "Calendar" },
			{ key: "tags", name: "Tags" },
			{ key: "treeview", name: "Tree View" },
			{ key: "history", name: "History" },
			{ key: "cron", name: "Cron" },
			{ key: "calendar-heatmap", name: "Calendar Heatmap" },
			{ key: "kanban", name: "Kanban" },
			{ key: "usage-bar", name: "Usage Bar" },
			{ key: "timeline", name: "Timeline" },
			{ key: "notifications", name: "Notifications" },
			{ key: "chip", name: "Chip" }
		];

		const getComponentName = (key: string) => {
			const component = showcaseComponents.find(c => c.key === key);
			return component ? component.name : key;
		};

		const loadComponent = async (componentKey: string) => {
			if (activeComponent.value === componentKey) return;
			
			activeComponent.value = componentKey;
			isLoading.value = true;
			loadedComponent.value = null;

			try {
				// Dynamic import with lazy loading
				let component;
				switch (componentKey) {
				case "buttons":
					component = defineAsyncComponent(() => import("./showcases/ButtonsShowcase.vue"));
					break;
				case "button-groups":
					component = defineAsyncComponent(() => import("./showcases/ButtonGroupsShowcase.vue"));
					break;
				case "alerts":
					component = defineAsyncComponent(() => import("./showcases/AlertsShowcase.vue"));
					break;
				case "cards":
					component = defineAsyncComponent(() => import("./showcases/CardsShowcase.vue"));
					break;
				case "checkboxes":
					component = defineAsyncComponent(() => import("./showcases/CheckBoxesShowcase.vue"));
					break;
				case "collapse":
					component = defineAsyncComponent(() => import("./showcases/CollapseShowcase.vue"));
					break;
				case "dialog":
					component = defineAsyncComponent(() => import("./showcases/DialogShowcase.vue"));
					break;
				case "input":
					component = defineAsyncComponent(() => import("./showcases/InputShowcase.vue"));
					break;
				case "radio":
					component = defineAsyncComponent(() => import("./showcases/RadioShowcase.vue"));
					break;
				case "select":
					component = defineAsyncComponent(() => import("./showcases/SelectShowcase.vue"));
					break;
				case "sidebar":
					component = defineAsyncComponent(() => import("./showcases/SideBarShowcase.vue"));
					break;
				case "switch":
					component = defineAsyncComponent(() => import("./showcases/SwitchShowcase.vue"));
					break;
				case "navbar":
					component = defineAsyncComponent(() => import("./showcases/NavbarShowcase.vue"));
					break;
				case "pagination":
					component = defineAsyncComponent(() => import("./showcases/PaginationShowcase.vue"));
					break;
				case "tabs":
					component = defineAsyncComponent(() => import("./showcases/TabsShowcase.vue"));
					break;
				case "progress":
					component = defineAsyncComponent(() => import("./showcases/ProgressShowcase.vue"));
					break;
				case "textarea":
					component = defineAsyncComponent(() => import("./showcases/TextAreaShowcase.vue"));
					break;
				case "colorpicker":
					component = defineAsyncComponent(() => import("./showcases/ColorPickerShowcase.vue"));
					break;
				case "rich-text-editor":
					component = defineAsyncComponent(() => import("./showcases/RichTextEditorShowcase.vue"));
					break;
				case "table":
					component = defineAsyncComponent(() => import("./showcases/TableShowcase.vue"));
					break;
				case "calendar":
					component = defineAsyncComponent(() => import("./showcases/CalendarShowcase.vue"));
					break;
				case "tags":
					component = defineAsyncComponent(() => import("./showcases/TagsShowcase.vue"));
					break;
				case "calendar-heatmap":
					component = defineAsyncComponent(() => import("./showcases/CalendarHeatMapShowcase.vue"));
					break;
				case "kanban":
					component = defineAsyncComponent(() => import("./showcases/KanbanShowcase.vue"));
					break;
				case "usage-bar":
					component = defineAsyncComponent(() => import("./showcases/UsageBarShowcase.vue"));
					break;
				case "timeline":
					component = defineAsyncComponent(() => import("./showcases/TimelineShowcase.vue"));
					break;
				case "notifications":
					component = defineAsyncComponent(() => import("./showcases/NotificationsShowcase.vue"));
					break;
				case "chip":
					component = defineAsyncComponent(() => import("./showcases/ChipShowcase.vue"));
					break;
				default:
					// For components not yet extracted, show a placeholder
					component = defineAsyncComponent(() => 
						Promise.resolve({
							template: `<div class="showcase-component">
								<h3>${getComponentName(componentKey)} Showcase</h3>
								<hr />
								<p>This showcase is coming soon! Component "${componentKey}" will be extracted from the main App.vue file.</p>
							</div>`
						})
					);
				}

				// Simulate loading delay to show the loading state
				await new Promise(resolve => setTimeout(resolve, 500));
				
				loadedComponent.value = component;
			} catch (error) {
				console.error(`Failed to load component ${componentKey}:`, error);
				loadedComponent.value = null;
			} finally {
				isLoading.value = false;
			}
		};

		const retryLoad = () => {
			if (activeComponent.value) {
				loadComponent(activeComponent.value);
			}
		};

		const toggleNav = () => {
			isNavExpanded.value = !isNavExpanded.value;
		};

		return {
			activeComponent,
			loadedComponent,
			isLoading,
			isNavExpanded,
			showcaseComponents,
			loadComponent,
			getComponentName,
			retryLoad,
			toggleNav
		};
	}
});
</script>

<style lang="scss">
@import "./style/sass/_functions";

#app {
	min-height: 100vh;
	background-color: getColor(background);
	color: getColor("text");
}

.showcase-nav {
	position: sticky;
	top: 0;
	background-color: getColor(background);
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding: 12px 20px;
	z-index: 100;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

	.nav-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
		margin-bottom: 12px;

		h2 {
			margin: 0;
			color: getColor("text");
			font-size: 1.25rem;
		}
	}

	.nav-toggle {
		background: getColor("primary");
		color: white;
		border: none;
		padding: 6px 12px;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 13px;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 6px;

		&:hover {
			filter: brightness(0.9);
			transform: translateY(-1px);
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 3px getColorAlpha("primary", 0.25);
		}

		.toggle-icon {
			font-size: 14px;
			font-weight: bold;
		}
	}

	.active-component-display {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-bottom: 10px;
		padding: 8px 16px;
		background-color: transparent;
		border-radius: 0;
		border-bottom: 2px solid getColor("primary");
		max-width: 1200px;
		margin: 0 auto 10px auto;

		.active-label {
			font-weight: 500;
			color: getColor("text");
			font-size: 13px;
		}

		.active-component-name {
			color: getColor("primary");
			font-weight: 600;
			background-color: transparent;
			padding: 0;
			border-radius: 0;
			font-size: 13px;
		}
	}

	.nav-container {
		max-height: 500px;
		overflow: hidden;
		transition: max-height 0.3s ease, opacity 0.3s ease;
		opacity: 1;

		&.collapsed {
			max-height: 0;
			opacity: 0;
		}
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 12px;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}

	.nav-link {
		color: getColor("primary");
		text-decoration: none;
		padding: 6px 8px;
		border-radius: 0;
		transition: all 0.3s ease;
		font-size: 13px;
		font-weight: 500;
		border: none;
		border-bottom: 2px solid transparent;
		background-color: transparent;
		cursor: pointer;
		position: relative;

		&:hover {
			color: getColor("primary");
			border-bottom-color: getColor("primary");
			text-decoration: none;
		}

		&.active {
			color: getColor("primary");
			border-bottom-color: getColor("primary");
			font-weight: 600;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 2px getColorAlpha("primary", 0.25);
			border-radius: 2px;
		}
	}
}

.showcase-content {
	padding: 40px 20px;
	max-width: 1200px;
	margin: 0 auto;
	min-height: calc(100vh - 200px);
}

.welcome-message,
.loading-message,
.error-message {
	text-align: center;
	padding: 60px 20px;

	h3 {
		margin-bottom: 16px;
		color: getColor("text");
	}

	p {
		color: rgba(getColor("text"), 0.7);
		font-size: 16px;
	}
}

.loading-message {
	position: relative;
}

.error-message {
	color: getColor("danger");
}

.showcase-component {
	margin-bottom: 15px;
	margin-left: 30px;
	margin-top: 30px;
	color: getColor("text") !important;
}

.text-color {
	color: getColor("text");
}

.tu-select-content {
	margin: 20px;
}

body {
	background-color: getColor(background);
	margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
