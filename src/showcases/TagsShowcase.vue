<template>
	<div class="showcase-component">
		<h3>Tags:</h3>
		<hr />
		
		<!-- Basic Tags -->
		<div style="margin: 20px 0;">
			<h4>Basic Tags:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuTag>Default Tag</TuTag>
				<TuTag>Product</TuTag>
				<TuTag>Category</TuTag>
				<TuTag>Important</TuTag>
				<TuTag>Technology</TuTag>
			</div>
		</div>

		<!-- Different Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
				<TuTag color="primary">Primary</TuTag>
				<TuTag color="success">Success</TuTag>
				<TuTag color="danger">Danger</TuTag>
				<TuTag color="warning">Warning</TuTag>
				<TuTag color="info">Info</TuTag>
				<TuTag color="dark">Dark</TuTag>
			</div>
		</div>

		<!-- Different Sizes -->
		<div style="margin: 20px 0;">
			<h4>Different Sizes:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center;">
				<TuTag size="xs">Extra Small</TuTag>
				<TuTag size="sm">Small</TuTag>
				<TuTag size="md">Medium</TuTag>
				<TuTag size="lg">Large</TuTag>
				<TuTag size="xl">Extra Large</TuTag>
			</div>
		</div>

		<!-- Closable Tags -->
		<div style="margin: 20px 0;">
			<h4>Closable Tags:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuTag v-for="tag in closableTags" :key="tag.id" :color="tag.color" closable @close="removeTag(tag.id)">
					{{ tag.text }}
				</TuTag>
			</div>
			<div style="margin-top: 15px;">
				<TuButton @click="resetClosableTags" size="sm">Reset Tags</TuButton>
			</div>
		</div>

		<!-- Rounded Tags -->
		<div style="margin: 20px 0;">
			<h4>Rounded Tags:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuTag rounded>Rounded Default</TuTag>
				<TuTag color="primary" rounded>Rounded Primary</TuTag>
				<TuTag color="success" rounded>Rounded Success</TuTag>
				<TuTag color="warning" rounded>Rounded Warning</TuTag>
				<TuTag color="danger" rounded>Rounded Danger</TuTag>
			</div>
		</div>

		<!-- Tags with Icons -->
		<div style="margin: 20px 0;">
			<h4>Tags with Icons:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuTag color="info">
					<tu-icon style="margin-right: 5px;">info</tu-icon>
					Information
				</TuTag>
				<TuTag color="success">
					<tu-icon style="margin-right: 5px;">check</tu-icon>
					Completed
				</TuTag>
				<TuTag color="warning">
					<tu-icon style="margin-right: 5px;">warning</tu-icon>
					Warning
				</TuTag>
				<TuTag color="danger">
					<tu-icon style="margin-right: 5px;">close</tu-icon>
					Error
				</TuTag>
			</div>
		</div>

		<!-- Interactive Tags -->
		<div style="margin: 20px 0;">
			<h4>Interactive Tags:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
				<TuTag v-for="tag in interactiveTags" :key="tag.id" :color="tag.selected ? 'primary' : 'default'" 
						@click="toggleTag(tag.id)" style="cursor: pointer;">
					{{ tag.text }}
					<tu-icon v-if="tag.selected" style="margin-left: 5px;">check</tu-icon>
				</TuTag>
			</div>
			<p style="font-size: 14px; color: #666;">
				Selected: {{ interactiveTags.filter(t => t.selected).map(t => t.text).join(', ') || 'None' }}
			</p>
		</div>

		<!-- Status Tags -->
		<div style="margin: 20px 0;">
			<h4>Status Tags:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 15px;">
				<div style="display: flex; align-items: center; gap: 8px;">
					<span>User Status:</span>
					<TuTag :color="userStatus.color" size="sm">{{ userStatus.text }}</TuTag>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<span>Order Status:</span>
					<TuTag :color="orderStatus.color" size="sm">{{ orderStatus.text }}</TuTag>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<span>Payment Status:</span>
					<TuTag :color="paymentStatus.color" size="sm">{{ paymentStatus.text }}</TuTag>
				</div>
			</div>
			<div style="margin-top: 15px;">
				<TuButton @click="randomizeStatuses" size="sm">Randomize Statuses</TuButton>
			</div>
		</div>

		<!-- Product Tags Example -->
		<div style="margin: 20px 0;">
			<h4>Product Tags Example:</h4>
			<div v-for="product in products" :key="product.id" style="border: 1px solid #eee; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
				<div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
					<h5 style="margin: 0;">{{ product.name }}</h5>
					<TuTag :color="product.featured ? 'warning' : 'default'" size="sm">
						{{ product.featured ? 'Featured' : 'Regular' }}
					</TuTag>
				</div>
				<p style="margin: 10px 0; color: #666;">{{ product.description }}</p>
				<div style="display: flex; flex-wrap: wrap; gap: 8px;">
					<TuTag v-for="category in product.categories" :key="category" size="sm" color="info">
						{{ category }}
					</TuTag>
					<TuTag v-for="tech in product.technologies" :key="tech" size="sm" color="success">
						{{ tech }}
					</TuTag>
				</div>
			</div>
		</div>

		<!-- Custom Styled Tags -->
		<div style="margin: 20px 0;">
			<h4>Custom Styled Tags:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuTag style="background: linear-gradient(45deg, #ff6b6b, #feca57); color: white; font-weight: bold;">
					Gradient Tag
				</TuTag>
				<TuTag style="background: #000; color: #fff; border: 2px solid #fff;">
					Dark Border
				</TuTag>
				<TuTag style="background: rgba(0, 123, 255, 0.1); color: #007bff; border: 1px dashed #007bff;">
					Dashed Border
				</TuTag>
				<TuTag style="background: #f8f9fa; color: #495057; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
					Shadow Tag
				</TuTag>
			</div>
		</div>

		<!-- Dynamic Tag Input -->
		<div style="margin: 20px 0;">
			<h4>Dynamic Tag Input:</h4>
			<div style="margin-bottom: 15px;">
				<div style="display: flex; gap: 10px; margin-bottom: 10px;">
					<TuInput v-model="newTagText" placeholder="Enter tag text" @keyup.enter="addNewTag" />
					<TuSelect v-model="newTagColor" :select-items="colorOptions" style="min-width: 120px;" />
					<TuButton @click="addNewTag" :disabled="!newTagText.trim()">Add Tag</TuButton>
				</div>
			</div>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuTag v-for="tag in dynamicTags" :key="tag.id" :color="tag.color" closable @close="removeDynamicTag(tag.id)">
					{{ tag.text }}
				</TuTag>
			</div>
			<p v-if="dynamicTags.length === 0" style="color: #666; font-style: italic;">
				No dynamic tags yet. Add some above!
			</p>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Closable Tags Count:</strong> {{ closableTags.length }}</p>
				<p><strong>Selected Interactive Tags:</strong> {{ interactiveTags.filter(t => t.selected).length }}</p>
				<p><strong>Dynamic Tags Count:</strong> {{ dynamicTags.length }}</p>
				<p><strong>User Status:</strong> {{ userStatus.text }}</p>
				<p><strong>Order Status:</strong> {{ orderStatus.text }}</p>
				<p><strong>Payment Status:</strong> {{ paymentStatus.text }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { tuButton as TuButton } from "../components/tuButton";
import { tuTag as TuTag } from "../components/tuTag";
import TuInput from "../components/tuInput";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Closable tags
const closableTags = ref([
	{ id: 1, text: "JavaScript", color: "warning" },
	{ id: 2, text: "TypeScript", color: "info" },
	{ id: 3, text: "Vue.js", color: "success" },
	{ id: 4, text: "React", color: "primary" },
	{ id: 5, text: "Angular", color: "danger" }
]);

const originalClosableTags = [
	{ id: 1, text: "JavaScript", color: "warning" },
	{ id: 2, text: "TypeScript", color: "info" },
	{ id: 3, text: "Vue.js", color: "success" },
	{ id: 4, text: "React", color: "primary" },
	{ id: 5, text: "Angular", color: "danger" }
];

// Interactive tags
const interactiveTags = ref([
	{ id: 1, text: "Frontend", selected: false },
	{ id: 2, text: "Backend", selected: false },
	{ id: 3, text: "Database", selected: false },
	{ id: 4, text: "Mobile", selected: false },
	{ id: 5, text: "DevOps", selected: false }
]);

// Status examples
const userStatus = ref({ text: "Active", color: "success" });
const orderStatus = ref({ text: "Processing", color: "warning" });
const paymentStatus = ref({ text: "Paid", color: "success" });

const statusOptions = {
	user: [
		{ text: "Active", color: "success" },
		{ text: "Inactive", color: "danger" },
		{ text: "Pending", color: "warning" },
		{ text: "Suspended", color: "danger" }
	],
	order: [
		{ text: "Processing", color: "warning" },
		{ text: "Shipped", color: "info" },
		{ text: "Delivered", color: "success" },
		{ text: "Cancelled", color: "danger" }
	],
	payment: [
		{ text: "Paid", color: "success" },
		{ text: "Pending", color: "warning" },
		{ text: "Failed", color: "danger" },
		{ text: "Refunded", color: "info" }
	]
};

// Products example
const products = ref([
	{
		id: 1,
		name: "Vue Dashboard Pro",
		description: "Professional admin dashboard built with Vue.js 3",
		featured: true,
		categories: ["Dashboard", "Admin"],
		technologies: ["Vue.js", "TypeScript", "Vite"]
	},
	{
		id: 2,
		name: "React E-commerce Kit",
		description: "Complete e-commerce solution with React and Node.js",
		featured: false,
		categories: ["E-commerce", "Template"],
		technologies: ["React", "Node.js", "MongoDB"]
	},
	{
		id: 3,
		name: "Mobile App Starter",
		description: "Cross-platform mobile app template",
		featured: true,
		categories: ["Mobile", "Starter"],
		technologies: ["React Native", "Expo", "Firebase"]
	}
]);

// Dynamic tags
const dynamicTags = ref([]);
const newTagText = ref("");
const newTagColor = ref("primary");
let nextTagId = 1;

const colorOptions = ref([
	{ label: "Primary", value: "primary" },
	{ label: "Success", value: "success" },
	{ label: "Danger", value: "danger" },
	{ label: "Warning", value: "warning" },
	{ label: "Info", value: "info" },
	{ label: "Dark", value: "dark" }
]);

// Methods
const removeTag = (tagId: number) => {
	const index = closableTags.value.findIndex(tag => tag.id === tagId);
	if (index > -1) {
		closableTags.value.splice(index, 1);
	}
};

const resetClosableTags = () => {
	closableTags.value = [...originalClosableTags];
};

const toggleTag = (tagId: number) => {
	const tag = interactiveTags.value.find(t => t.id === tagId);
	if (tag) {
		tag.selected = !tag.selected;
	}
};

const randomizeStatuses = () => {
	const userOptions = statusOptions.user;
	const orderOptions = statusOptions.order;
	const paymentOptions = statusOptions.payment;
	
	userStatus.value = userOptions[Math.floor(Math.random() * userOptions.length)];
	orderStatus.value = orderOptions[Math.floor(Math.random() * orderOptions.length)];
	paymentStatus.value = paymentOptions[Math.floor(Math.random() * paymentOptions.length)];
};

const addNewTag = () => {
	if (newTagText.value.trim()) {
		const newTag = {
			id: nextTagId++,
			text: newTagText.value.trim(),
			color: newTagColor.value
		};
		
		dynamicTags.value.push(newTag);
		newTagText.value = "";
	}
};

const removeDynamicTag = (tagId: number) => {
	const index = dynamicTags.value.findIndex(tag => tag.id === tagId);
	if (index > -1) {
		dynamicTags.value.splice(index, 1);
	}
};
</script>
