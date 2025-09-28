<template>
	<div id="app">
		<!-- Navigation Menu -->
		<nav class="showcase-nav">
			<h2>Tukal Component Showcase</h2>
			<div class="nav-grid">
				<button
					v-for="component in showcaseComponents"
					:key="component.key"
					@click="loadComponent(component.key)"
					:class="{ active: activeComponent === component.key }"
					class="nav-button"
				>
					{{ component.name }}
				</button>
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
			{ key: "timeline", name: "Timeline" }
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

		return {
			activeComponent,
			loadedComponent,
			isLoading,
			showcaseComponents,
			loadComponent,
			getComponentName,
			retryLoad
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
	padding: 20px;
	z-index: 100;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

	h2 {
		margin: 0 0 20px 0;
		text-align: center;
		color: getColor("text");
	}

	.nav-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 10px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.nav-button {
		background: getColor("primary");
		color: white;
		border: none;
		padding: 12px 16px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 14px;
		font-weight: 500;

		&:hover {
			background: getColor("primary");
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		}

		&.active {
			background: getColor("success");
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
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
