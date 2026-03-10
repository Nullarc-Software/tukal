<template>
	<div class="showcase-component">
		<h3>Chips:</h3>
		<hr />
		
		<!-- Basic Chips -->
		<div style="display: flex; margin: 10px; gap: 10px; flex-wrap: wrap;">
			<TuChip>Default Chip</TuChip>
			<TuChip color="primary">Primary</TuChip>
			<TuChip color="success">Success</TuChip>
			<TuChip color="danger">Danger</TuChip>
			<TuChip color="warn">Warning</TuChip>
			<TuChip color="dark">Dark</TuChip>
		</div>

		<!-- Chip with Icons -->
		<div style="display: flex; margin: 10px; gap: 10px; flex-wrap: wrap;">
			<TuChip>
				<tu-icon>person</tu-icon>
				User
			</TuChip>
			<TuChip color="success">
				<tu-icon>check</tu-icon>
				Verified
			</TuChip>
			<TuChip color="danger">
				<tu-icon>close</tu-icon>
				Error
			</TuChip>
		</div>

		<!-- Closable Chips -->
		<div style="display: flex; margin: 10px; gap: 10px; flex-wrap: wrap;">
			<TuChip v-for="tag in tags" :key="tag.id" :color="tag.color" closable @close="removeTag(tag.id)">
				{{ tag.name }}
			</TuChip>
		</div>
		<TuButton size="sm" @click="addRandomTag" style="margin: 10px 0;">Add Random Tag</TuButton>

		<!-- Different Sizes -->
		<div style="display: flex; margin: 10px; gap: 10px; align-items: center; flex-wrap: wrap;">
			<TuChip size="xs">Extra Small</TuChip>
			<TuChip size="sm">Small</TuChip>
			<TuChip>Default</TuChip>
			<TuChip size="lg">Large</TuChip>
			<TuChip size="xl">Extra Large</TuChip>
		</div>

		<!-- Flat Style -->
		<div style="display: flex; margin: 10px; gap: 10px; flex-wrap: wrap;">
			<TuChip flat>Flat Default</TuChip>
			<TuChip flat color="primary">Flat Primary</TuChip>
			<TuChip flat color="success">Flat Success</TuChip>
			<TuChip flat color="danger">Flat Danger</TuChip>
		</div>

		<!-- Interactive Chips -->
		<div style="display: flex; margin: 10px; gap: 10px; flex-wrap: wrap;">
			<TuChip 
				v-for="category in categories" 
				:key="category.name"
				:color="selectedCategory === category.name ? 'primary' : 'default'"
				@click="selectCategory(category.name)"
				clickable
			>
				{{ category.name }} ({{ category.count }})
			</TuChip>
		</div>
		<p v-if="selectedCategory">Selected: <strong>{{ selectedCategory }}</strong></p>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { TuButton } from "../components/tuButton";
import { TuChip } from "../components/tuChip";
// Closable chips
const tags = ref([
	{ id: 1, name: "JavaScript", color: "warn" },
	{ id: 2, name: "Vue.js", color: "success" },
	{ id: 3, name: "TypeScript", color: "primary" },
	{ id: 4, name: "CSS", color: "danger" }
]);

// Categories
const categories = ref([
	{ name: "All", count: 42 },
	{ name: "Frontend", count: 18 },
	{ name: "Backend", count: 12 },
	{ name: "DevOps", count: 8 },
	{ name: "Design", count: 4 }
]);

const selectedCategory = ref("");

// Methods
const removeTag = (tagId: number) => {
	const index = tags.value.findIndex(tag => tag.id === tagId);
	if (index > -1) {
		tags.value.splice(index, 1);
	}
};

const addRandomTag = () => {
	const randomTags = ["React", "Angular", "Node.js", "Python", "Docker", "AWS", "MongoDB"];
	const colors = ["primary", "success", "danger", "warn", "dark"];
	const randomTag = randomTags[Math.floor(Math.random() * randomTags.length)];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	
	tags.value.push({
		id: Date.now(),
		name: randomTag,
		color: randomColor
	});
};

const selectCategory = (categoryName: string) => {
	selectedCategory.value = selectedCategory.value === categoryName ? "" : categoryName;
};
</script>
