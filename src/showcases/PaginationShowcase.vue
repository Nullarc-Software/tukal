<template>
	<div class="showcase-component">
		<h3>Pagination:</h3>
		<hr />
		
		<!-- Basic Pagination -->
		<div style="margin: 20px 0;">
			<h4>Basic Pagination:</h4>
			<TuPagination 
				v-model="basicCurrentPage" 
				:total="basicTotalItems" 
				:per-page="basicPerPage"
			/>
			<p style="margin-top: 10px; font-size: 14px;">
				Current page: {{ basicCurrentPage }} of {{ Math.ceil(basicTotalItems / basicPerPage) }}
			</p>
		</div>

		<!-- Different Sizes -->
		<div style="margin: 20px 0;">
			<h4>Different Sizes:</h4>
			<div style="display: flex; flex-direction: column; gap: 20px;">
				<div>
					<h6>Small</h6>
					<TuPagination 
						v-model="sizeCurrentPage" 
						:total="150" 
						:per-page="10"
						size="sm"
					/>
				</div>
				<div>
					<h6>Medium (Default)</h6>
					<TuPagination 
						v-model="sizeCurrentPage" 
						:total="150" 
						:per-page="10"
					/>
				</div>
				<div>
					<h6>Large</h6>
					<TuPagination 
						v-model="sizeCurrentPage" 
						:total="150" 
						:per-page="10"
						size="lg"
					/>
				</div>
			</div>
		</div>

		<!-- With Jump to Page -->
		<div style="margin: 20px 0;">
			<h4>With Jump to Page:</h4>
			<TuPagination 
				v-model="jumpCurrentPage" 
				:total="1000" 
				:per-page="20"
				show-jumper
				show-total
			/>
			<p style="margin-top: 10px; font-size: 14px;">
				Showing {{ (jumpCurrentPage - 1) * 20 + 1 }} to {{ Math.min(jumpCurrentPage * 20, 1000) }} of 1000 items
			</p>
		</div>

		<!-- With Page Size Selector -->
		<div style="margin: 20px 0;">
			<h4>With Page Size Selector:</h4>
			<TuPagination 
				v-model="sizeCurrentPage" 
				:total="500" 
				:per-page="selectedPageSize"
				show-size-changer
				:page-size-options="pageSizeOptions"
				@page-size-change="onPageSizeChange"
			/>
			<p style="margin-top: 10px; font-size: 14px;">
				Items per page: {{ selectedPageSize }}
			</p>
		</div>

		<!-- Simple Pagination -->
		<div style="margin: 20px 0;">
			<h4>Simple Pagination:</h4>
			<TuPagination 
				v-model="simpleCurrentPage" 
				:total="300" 
				:per-page="15"
				simple
			/>
		</div>

		<!-- Data Table with Pagination -->
		<div style="margin: 20px 0;">
			<h4>Data Table with Pagination:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
					<h5>User Management</h5>
					<div style="display: flex; gap: 10px; align-items: center;">
						<TuInput 
							v-model="searchQuery" 
							placeholder="Search users..."
							size="sm"
						>
							<template #prepend>
								<tu-icon>search</tu-icon>
							</template>
						</TuInput>
						<TuSelect 
							v-model="filterRole" 
							:select-items="roleFilterOptions" 
							size="sm"
							placeholder="Filter by role"
						/>
					</div>
				</div>
				
				<TuTable 
					:data="paginatedUsers" 
					:columns="userColumns"
					style="margin-bottom: 20px;"
				/>
				
				<div style="display: flex; justify-content: space-between; align-items: center;">
					<div style="font-size: 14px; color: #666;">
						Showing {{ (tableCurrentPage - 1) * tablePageSize + 1 }} to {{ Math.min(tableCurrentPage * tablePageSize, filteredUsers.length) }} of {{ filteredUsers.length }} users
					</div>
					
					<TuPagination 
						v-model="tableCurrentPage" 
						:total="filteredUsers.length" 
						:per-page="tablePageSize"
						show-size-changer
						:page-size-options="[5, 10, 20, 50]"
						@page-size-change="onTablePageSizeChange"
					/>
				</div>
			</div>
		</div>

		<!-- Product Catalog -->
		<div style="margin: 20px 0;">
			<h4>Product Catalog:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
					<h5>Products</h5>
					<div style="display: flex; gap: 10px;">
						<TuSelect v-model="productSort" :select-items="sortOptions" size="sm" />
						<TuSelect v-model="productCategory" :select-items="categoryOptions" size="sm" />
					</div>
				</div>
				
				<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin-bottom: 20px;">
					<div 
						v-for="product in paginatedProducts" 
						:key="product.id"
						style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #ddd;"
					>
						<div style="background: #e9ecef; height: 120px; border-radius: 4px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; color: #6c757d;">
							<tu-icon style="font-size: 32px;">image</tu-icon>
						</div>
						<h6 style="margin: 0 0 8px 0;">{{ product.name }}</h6>
						<p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">{{ product.description }}</p>
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<span style="font-weight: bold; color: #28a745;">${{ product.price }}</span>
							<TuChip size="xs" :color="getCategoryColor(product.category)">{{ product.category }}</TuChip>
						</div>
						<TuButton style="width: 100%; margin-top: 10px;" size="sm" color="primary">
							Add to Cart
						</TuButton>
					</div>
				</div>
				
				<div style="display: flex; justify-content: center;">
					<TuPagination 
						v-model="productCurrentPage" 
						:total="filteredProducts.length" 
						:per-page="productPageSize"
						show-total
					/>
				</div>
			</div>
		</div>

		<!-- Blog Posts -->
		<div style="margin: 20px 0;">
			<h4>Blog Posts:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>Latest Articles</h5>
				
				<div style="margin: 20px 0;">
					<div 
						v-for="post in paginatedPosts" 
						:key="post.id"
						style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 15px; border: 1px solid #ddd;"
					>
						<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
							<h6 style="margin: 0; flex: 1;">{{ post.title }}</h6>
							<TuChip size="xs" :color="getPostStatusColor(post.status)">{{ post.status }}</TuChip>
						</div>
						
						<p style="margin: 10px 0; color: #666; line-height: 1.5;">{{ post.excerpt }}</p>
						
						<div style="display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #999;">
							<div style="display: flex; align-items: center; gap: 15px;">
								<span>By {{ post.author }}</span>
								<span>{{ formatDate(post.date) }}</span>
								<span>{{ post.readTime }} min read</span>
							</div>
							<div style="display: flex; gap: 10px;">
								<TuButton size="xs">Read More</TuButton>
								<TuButton size="xs" color="primary">Edit</TuButton>
							</div>
						</div>
					</div>
				</div>
				
				<div style="display: flex; justify-content: space-between; align-items: center;">
					<div style="font-size: 14px; color: #666;">
						Page {{ postCurrentPage }} of {{ Math.ceil(blogPosts.length / postPageSize) }}
					</div>
					
					<TuPagination 
						v-model="postCurrentPage" 
						:total="blogPosts.length" 
						:per-page="postPageSize"
						simple
					/>
				</div>
			</div>
		</div>

		<!-- Load More Pattern -->
		<div style="margin: 20px 0;">
			<h4>Load More Pattern:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>Recent Activities</h5>
				
				<div style="margin: 20px 0;">
					<div 
						v-for="(activity, index) in visibleActivities" 
						:key="activity.id"
						style="background: white; border-radius: 4px; padding: 15px; margin-bottom: 10px; border-left: 4px solid #007bff;"
					>
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<div>
								<strong>{{ activity.user }}</strong> {{ activity.action }}
								<span style="color: #666; margin-left: 8px;">{{ activity.target }}</span>
							</div>
							<span style="font-size: 12px; color: #999;">{{ formatTime(activity.timestamp) }}</span>
						</div>
					</div>
				</div>
				
				<div style="text-align: center;">
					<TuButton 
						v-if="visibleActivities.length < activities.length"
						@click="loadMoreActivities"
						color="primary"
						:loading="loadingMore"
					>
						Load More ({{ activities.length - visibleActivities.length }} remaining)
					</TuButton>
					<p v-else style="color: #666; margin: 0;">
						All activities loaded
					</p>
				</div>
			</div>
		</div>

		<!-- Infinite Scroll Simulation -->
		<div style="margin: 20px 0;">
			<h4>Infinite Scroll Simulation:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>Feed</h5>
				<div 
					style="height: 300px; overflow-y: auto; border: 1px solid #ddd; border-radius: 4px; padding: 10px; background: white;"
					@scroll="handleScroll"
					ref="scrollContainer"
				>
					<div 
						v-for="item in infiniteScrollItems" 
						:key="item.id"
						style="padding: 10px; border-bottom: 1px solid #f0f0f0; margin-bottom: 8px;"
					>
						<div style="font-weight: 500;">{{ item.title }}</div>
						<div style="font-size: 14px; color: #666; margin-top: 4px;">{{ item.content }}</div>
					</div>
					
					<div v-if="loadingInfinite" style="text-align: center; padding: 20px; color: #666;">
						<tu-loading size="sm" />
						<span style="margin-left: 10px;">Loading more items...</span>
					</div>
				</div>
				
				<p style="margin-top: 10px; font-size: 14px; color: #666;">
					Loaded {{ infiniteScrollItems.length }} items. Scroll down for more.
				</p>
			</div>
		</div>

		<!-- Current State -->
		<div style="margin: 20px 0;">
			<h4>Current State:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic Page:</strong> {{ basicCurrentPage }} / {{ Math.ceil(basicTotalItems / basicPerPage) }}</p>
				<p><strong>Jump Page:</strong> {{ jumpCurrentPage }}</p>
				<p><strong>Table Page:</strong> {{ tableCurrentPage }} ({{ tablePageSize }} per page)</p>
				<p><strong>Product Page:</strong> {{ productCurrentPage }} ({{ productPageSize }} per page)</p>
				<p><strong>Post Page:</strong> {{ postCurrentPage }} ({{ postPageSize }} per page)</p>
				<p><strong>Search Query:</strong> "{{ searchQuery || 'None' }}"</p>
				<p><strong>Selected Role Filter:</strong> {{ filterRole || 'All' }}</p>
				<p><strong>Product Category:</strong> {{ productCategory || 'All' }}</p>
				<p><strong>Infinite Scroll Items:</strong> {{ infiniteScrollItems.length }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { tuButton as TuButton } from "../components/tuButton";
import TuPagination from "../components/tuPagination";
import { tuChip as TuChip } from "../components/tuChip";
import { tuTable as TuTable } from "../components/tuTable";
import TuInput from "../components/tuInput";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Basic pagination
const basicCurrentPage = ref(1);
const basicTotalItems = ref(100);
const basicPerPage = ref(10);

// Size example
const sizeCurrentPage = ref(1);

// Jump to page
const jumpCurrentPage = ref(1);

// Page size
const selectedPageSize = ref(10);
const pageSizeOptions = ref([10, 20, 50, 100]);

// Simple pagination
const simpleCurrentPage = ref(1);

// Table pagination
const tableCurrentPage = ref(1);
const tablePageSize = ref(10);
const searchQuery = ref("");
const filterRole = ref("");

// Product pagination
const productCurrentPage = ref(1);
const productPageSize = ref(6);
const productSort = ref("name");
const productCategory = ref("");

// Blog pagination
const postCurrentPage = ref(1);
const postPageSize = ref(3);

// Load more
const loadingMore = ref(false);
const loadMoreCount = ref(5);

// Infinite scroll
const loadingInfinite = ref(false);
const infiniteScrollItems = ref([]);
const scrollContainer = ref();

// Sample data
const allUsers = ref([
	{ id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joined: "2023-01-15" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", joined: "2023-02-20" },
	{ id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Inactive", joined: "2023-03-10" },
	{ id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Editor", status: "Active", joined: "2023-04-05" },
	{ id: 5, name: "Alex Chen", email: "alex@example.com", role: "User", status: "Active", joined: "2023-05-12" },
	{ id: 6, name: "Emily Davis", email: "emily@example.com", role: "Admin", status: "Active", joined: "2023-06-18" },
	{ id: 7, name: "Robert Brown", email: "robert@example.com", role: "User", status: "Inactive", joined: "2023-07-22" },
	{ id: 8, name: "Lisa Anderson", email: "lisa@example.com", role: "Editor", status: "Active", joined: "2023-08-30" },
	{ id: 9, name: "David Miller", email: "david@example.com", role: "User", status: "Active", joined: "2023-09-14" },
	{ id: 10, name: "Jennifer Garcia", email: "jennifer@example.com", role: "Admin", status: "Active", joined: "2023-10-08" }
]);

const userColumns = ref([
	{ key: "name", label: "Name" },
	{ key: "email", label: "Email" },
	{ key: "role", label: "Role" },
	{ key: "status", label: "Status" },
	{ key: "joined", label: "Joined" }
]);

const roleFilterOptions = ref([
	{ label: "All Roles", value: "" },
	{ label: "Admin", value: "Admin" },
	{ label: "Editor", value: "Editor" },
	{ label: "User", value: "User" }
]);

const allProducts = ref([
	{ id: 1, name: "Wireless Headphones", description: "High-quality wireless headphones", price: 99.99, category: "Electronics" },
	{ id: 2, name: "Smart Watch", description: "Fitness tracking smartwatch", price: 199.99, category: "Electronics" },
	{ id: 3, name: "Coffee Mug", description: "Ceramic coffee mug", price: 12.99, category: "Home" },
	{ id: 4, name: "Laptop Stand", description: "Adjustable laptop stand", price: 45.99, category: "Office" },
	{ id: 5, name: "Desk Lamp", description: "LED desk lamp with dimmer", price: 34.99, category: "Office" },
	{ id: 6, name: "Phone Case", description: "Protective phone case", price: 19.99, category: "Electronics" },
	{ id: 7, name: "Water Bottle", description: "Stainless steel water bottle", price: 24.99, category: "Sports" },
	{ id: 8, name: "Notebook", description: "Spiral-bound notebook", price: 8.99, category: "Office" },
	{ id: 9, name: "Bluetooth Speaker", description: "Portable bluetooth speaker", price: 79.99, category: "Electronics" },
	{ id: 10, name: "Plant Pot", description: "Ceramic plant pot", price: 16.99, category: "Home" },
	{ id: 11, name: "Yoga Mat", description: "Non-slip yoga mat", price: 29.99, category: "Sports" },
	{ id: 12, name: "Pen Set", description: "Set of 5 gel pens", price: 14.99, category: "Office" }
]);

const sortOptions = ref([
	{ label: "Name A-Z", value: "name" },
	{ label: "Price Low-High", value: "price-asc" },
	{ label: "Price High-Low", value: "price-desc" },
	{ label: "Category", value: "category" }
]);

const categoryOptions = ref([
	{ label: "All Categories", value: "" },
	{ label: "Electronics", value: "Electronics" },
	{ label: "Home", value: "Home" },
	{ label: "Office", value: "Office" },
	{ label: "Sports", value: "Sports" }
]);

const blogPosts = ref([
	{
		id: 1,
		title: "Getting Started with Vue.js 3",
		excerpt: "Learn the basics of Vue.js 3 and the Composition API in this comprehensive guide.",
		author: "John Developer",
		date: "2024-01-15",
		readTime: 8,
		status: "published"
	},
	{
		id: 2,
		title: "Advanced TypeScript Patterns",
		excerpt: "Explore advanced TypeScript patterns for better code organization and type safety.",
		author: "Jane Coder",
		date: "2024-01-12",
		readTime: 12,
		status: "published"
	},
	{
		id: 3,
		title: "Building Scalable APIs",
		excerpt: "Best practices for designing and building scalable REST APIs with Node.js.",
		author: "Mike Backend",
		date: "2024-01-10",
		readTime: 15,
		status: "draft"
	},
	{
		id: 4,
		title: "CSS Grid Layout Guide",
		excerpt: "Master CSS Grid Layout with practical examples and real-world use cases.",
		author: "Sarah Designer",
		date: "2024-01-08",
		readTime: 10,
		status: "published"
	},
	{
		id: 5,
		title: "JavaScript Performance Tips",
		excerpt: "Optimize your JavaScript code for better performance and user experience.",
		author: "Alex Optimizer",
		date: "2024-01-05",
		readTime: 7,
		status: "published"
	}
]);

const activities = ref([
	{ id: 1, user: "John Doe", action: "updated", target: "Project Alpha", timestamp: Date.now() - 300000 },
	{ id: 2, user: "Jane Smith", action: "created", target: "New Task", timestamp: Date.now() - 600000 },
	{ id: 3, user: "Mike Johnson", action: "deleted", target: "Old File", timestamp: Date.now() - 900000 },
	{ id: 4, user: "Sarah Wilson", action: "commented on", target: "Issue #123", timestamp: Date.now() - 1200000 },
	{ id: 5, user: "Alex Chen", action: "assigned", target: "Bug Fix", timestamp: Date.now() - 1500000 },
	{ id: 6, user: "Emily Davis", action: "reviewed", target: "Pull Request", timestamp: Date.now() - 1800000 },
	{ id: 7, user: "Robert Brown", action: "deployed", target: "Version 2.1", timestamp: Date.now() - 2100000 },
	{ id: 8, user: "Lisa Anderson", action: "merged", target: "Feature Branch", timestamp: Date.now() - 2400000 }
]);

// Computed properties
const filteredUsers = computed(() => {
	let filtered = allUsers.value;
	
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		filtered = filtered.filter(user => 
			user.name.toLowerCase().includes(query) ||
			user.email.toLowerCase().includes(query)
		);
	}
	
	if (filterRole.value) {
		filtered = filtered.filter(user => user.role === filterRole.value);
	}
	
	return filtered;
});

const paginatedUsers = computed(() => {
	const start = (tableCurrentPage.value - 1) * tablePageSize.value;
	const end = start + tablePageSize.value;
	return filteredUsers.value.slice(start, end);
});

const filteredProducts = computed(() => {
	let filtered = allProducts.value;
	
	if (productCategory.value) {
		filtered = filtered.filter(product => product.category === productCategory.value);
	}
	
	// Sort products
	if (productSort.value === "name") {
		filtered.sort((a, b) => a.name.localeCompare(b.name));
	} else if (productSort.value === "price-asc") {
		filtered.sort((a, b) => a.price - b.price);
	} else if (productSort.value === "price-desc") {
		filtered.sort((a, b) => b.price - a.price);
	} else if (productSort.value === "category") {
		filtered.sort((a, b) => a.category.localeCompare(b.category));
	}
	
	return filtered;
});

const paginatedProducts = computed(() => {
	const start = (productCurrentPage.value - 1) * productPageSize.value;
	const end = start + productPageSize.value;
	return filteredProducts.value.slice(start, end);
});

const paginatedPosts = computed(() => {
	const start = (postCurrentPage.value - 1) * postPageSize.value;
	const end = start + postPageSize.value;
	return blogPosts.value.slice(start, end);
});

const visibleActivities = computed(() => {
	return activities.value.slice(0, loadMoreCount.value);
});

// Initialize infinite scroll
const initializeInfiniteScroll = () => {
	for (let i = 1; i <= 10; i++) {
		infiniteScrollItems.value.push({
			id: i,
			title: `Feed Item ${i}`,
			content: `This is the content for feed item ${i}. It contains some interesting information.`
		});
	}
};

// Methods
const onPageSizeChange = (newSize: number) => {
	selectedPageSize.value = newSize;
};

const onTablePageSizeChange = (newSize: number) => {
	tablePageSize.value = newSize;
	tableCurrentPage.value = 1; // Reset to first page
};

const getCategoryColor = (category: string): string => {
	const colors = {
		Electronics: "primary",
		Home: "success",
		Office: "warning",
		Sports: "info"
	};
	return colors[category as keyof typeof colors] || "default";
};

const getPostStatusColor = (status: string): string => {
	return status === "published" ? "success" : "warning";
};

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString();
};

const formatTime = (timestamp: number): string => {
	const now = new Date();
	const time = new Date(timestamp);
	const diffMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
	
	if (diffMinutes < 1) return "Just now";
	if (diffMinutes < 60) return `${diffMinutes}m ago`;
	if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
	return `${Math.floor(diffMinutes / 1440)}d ago`;
};

const loadMoreActivities = () => {
	loadingMore.value = true;
	
	setTimeout(() => {
		loadMoreCount.value += 3;
		loadingMore.value = false;
	}, 1000);
};

const handleScroll = (event: Event) => {
	const target = event.target as HTMLElement;
	const threshold = 50;
	
	if (target.scrollTop + target.clientHeight >= target.scrollHeight - threshold) {
		loadMoreInfiniteItems();
	}
};

const loadMoreInfiniteItems = () => {
	if (loadingInfinite.value) return;
	
	loadingInfinite.value = true;
	
	setTimeout(() => {
		const currentLength = infiniteScrollItems.value.length;
		for (let i = 1; i <= 5; i++) {
			infiniteScrollItems.value.push({
				id: currentLength + i,
				title: `Feed Item ${currentLength + i}`,
				content: `This is the content for feed item ${currentLength + i}. It contains some interesting information.`
			});
		}
		loadingInfinite.value = false;
	}, 1000);
};

// Initialize
initializeInfiniteScroll();
</script>
