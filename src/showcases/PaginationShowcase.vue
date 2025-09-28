<template>
	<div class="showcase-component">
		<div class="showcase-header">
			<h3>Pagination:</h3>
			<div class="theme-controls">
				<span style="margin-right: 10px; font-size: 14px;">Theme:</span>
				<tu-switch v-model="isDarkMode" @change="toggleTheme">
					{{ isDarkMode ? '🌙 Dark' : '☀️ Light' }}
				</tu-switch>
			</div>
		</div>
		<hr />

		<!-- Theme Demonstration -->
		<div style="margin: 20px 0;">
			<h4>Theme Demonstration:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
				<!-- Light Theme Demo -->
				<div style="border: 2px solid #e6e9ea; border-radius: 12px; padding: 20px;">
					<h6 style="margin: 0 0 15px 0; text-align: center;">☀️ Light Theme</h6>
					<div class="theme-demo-light">
						<TuPagination 
							v-model="themeDemoPage" 
							:total="200" 
							:per-page="10"
							show-total
							show-jumper
							show-size-changer
							:page-size-options="[5, 10, 20]"
						/>
						<div style="margin-top: 15px;">
							<TuPagination 
								v-model="themeDemoPage2" 
								:total="150" 
								:per-page="15"
								simple
							/>
						</div>
						<div style="margin-top: 15px;">
							<TuPagination 
								v-model="themeDemoPage3" 
								:total="100" 
								:per-page="10"
								size="sm"
								color="success"
							/>
						</div>
					</div>
				</div>

				<!-- Dark Theme Demo -->
				<div style="border: 2px solid #333437; border-radius: 12px; padding: 20px; background: #1e1f22; color: #ffffff;">
					<h6 style="margin: 0 0 15px 0; text-align: center; color: #ffffff;">🌙 Dark Theme</h6>
					<div class="theme-demo-dark tu-dark-theme">
						<TuPagination 
							v-model="themeDemoPage" 
							:total="200" 
							:per-page="10"
							show-total
							show-jumper
							show-size-changer
							:page-size-options="[5, 10, 20]"
						/>
						<div style="margin-top: 15px;">
							<TuPagination 
								v-model="themeDemoPage2" 
								:total="150" 
								:per-page="15"
								simple
							/>
						</div>
						<div style="margin-top: 15px;">
							<TuPagination 
								v-model="themeDemoPage3" 
								:total="100" 
								:per-page="10"
								size="sm"
								color="success"
							/>
						</div>
					</div>
				</div>
			</div>
			<p style="font-size: 14px; color: #666; text-align: center; margin: 0;">
				💡 The demo above shows both themes side by side. Use the theme toggle to switch the entire showcase.
			</p>
		</div>
		
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

		<!-- Dark Theme Showcase -->
		<div v-if="isDarkMode" style="margin: 20px 0;">
			<h4>🌙 Dark Theme Variations:</h4>
			<div style="background: var(--tu-component-background, #1e1f22); padding: 20px; border-radius: 12px; border: 1px solid var(--tu-gray-3, #333);">
				
				<!-- Standard Pagination in Dark -->
				<div style="margin: 15px 0;">
					<h6 style="color: var(--tu-text); margin-bottom: 10px;">Standard Pagination</h6>
					<TuPagination 
						v-model="basicCurrentPage" 
						:total="200" 
						:per-page="10"
					/>
				</div>

				<!-- Different Colors in Dark -->
				<div style="margin: 15px 0;">
					<h6 style="color: var(--tu-text); margin-bottom: 10px;">Color Variations</h6>
					<div style="display: flex; flex-direction: column; gap: 15px;">
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">Primary (Default)</span>
							<TuPagination v-model="sizeCurrentPage" :total="100" :per-page="10" />
						</div>
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">Success</span>
							<TuPagination v-model="sizeCurrentPage" :total="100" :per-page="10" color="success" />
						</div>
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">Warning</span>
							<TuPagination v-model="sizeCurrentPage" :total="100" :per-page="10" color="warn" />
						</div>
					</div>
				</div>

				<!-- Shape Variations in Dark -->
				<div style="margin: 15px 0;">
					<h6 style="color: var(--tu-text); margin-bottom: 10px;">Shape Variations</h6>
					<div style="display: flex; flex-direction: column; gap: 15px;">
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">Circle</span>
							<TuPagination v-model="sizeCurrentPage" :total="80" :per-page="10" circle />
						</div>
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">Square</span>
							<TuPagination v-model="sizeCurrentPage" :total="80" :per-page="10" square />
						</div>
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">No Margin</span>
							<TuPagination v-model="sizeCurrentPage" :total="80" :per-page="10" not-margin />
						</div>
					</div>
				</div>

				<!-- Advanced Features in Dark -->
				<div style="margin: 15px 0;">
					<h6 style="color: var(--tu-text); margin-bottom: 10px;">Advanced Features</h6>
					<div style="display: flex; flex-direction: column; gap: 15px;">
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">With Progress Bar</span>
							<TuPagination v-model="sizeCurrentPage" :total="120" :per-page="10" progress />
						</div>
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">Simple Mode</span>
							<TuPagination v-model="simpleCurrentPage" :total="100" :per-page="15" simple />
						</div>
						<div>
							<span style="color: var(--tu-text); font-size: 12px; margin-bottom: 5px; display: block;">Full Featured</span>
							<TuPagination 
								v-model="jumpCurrentPage" 
								:total="500" 
								:per-page="25"
								show-total
								show-jumper
								show-size-changer
								:page-size-options="[10, 25, 50]"
							/>
						</div>
					</div>
				</div>
				
				<p style="font-size: 12px; color: var(--tu-text, #ccc); margin: 10px 0 0 0; opacity: 0.8;">
					✨ All pagination variants automatically adapt to dark theme with enhanced contrast and shadows.
				</p>
			</div>
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
								<TuIcon>search</TuIcon>
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
						<div style="background: #e9ecef; height: 120px; border-radius: 4px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; color: #6c757d; font-size: 14px;">
							📷 Product Image
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
						Page {{ postCurrentPage }} of {{ Math.ceil(apiPosts.length / postPageSize) }}
					</div>
					
					<TuPagination 
						v-model="postCurrentPage" 
						:total="apiPosts.length" 
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
						v-for="activity in visibleActivities" 
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
						v-if="visibleActivities.length < 8"
						@click="loadMoreActivities"
						color="primary"
						:loading="loadingMore"
					>
						Load More ({{ 8 - visibleActivities.length }} remaining)
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
						<TuLoading size="sm" />
						<span style="margin-left: 10px;">Loading more items...</span>
					</div>
				</div>
				
				<p style="margin-top: 10px; font-size: 14px; color: #666;">
					Loaded {{ infiniteScrollItems.length }} items. Scroll down for more.
				</p>
			</div>
		</div>

		<!-- Photo Gallery with API Data -->
		<div style="margin: 20px 0;">
			<h4>Photo Gallery (API Data):</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>Photos from JSONPlaceholder API</h5>
				
				<div v-if="loading" style="text-align: center; padding: 40px;">
					<div style="color: #666;">Loading photos from API...</div>
				</div>
				
				<div v-else style="margin: 20px 0;">
					<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; margin-bottom: 20px;">
						<div 
							v-for="photo in paginatedPhotos" 
							:key="photo.id"
							style="background: white; border-radius: 8px; overflow: hidden; border: 1px solid #ddd;"
						>
							<img 
								:src="photo.thumbnail" 
								:alt="photo.title"
								style="width: 100%; height: 120px; object-fit: cover;"
							/>
							<div style="padding: 8px;">
								<div style="font-size: 11px; color: #666; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
									{{ photo.title }}
								</div>
							</div>
						</div>
					</div>
					
					<div style="display: flex; justify-content: center;">
						<TuPagination 
							v-model="photoCurrentPage" 
							:total="apiPhotos.length" 
							:per-page="photoPageSize"
							show-total
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Current State -->
		<div style="margin: 20px 0;">
			<h4>Current State:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Theme Mode:</strong> {{ isDarkMode ? '🌙 Dark Theme' : '☀️ Light Theme' }}</p>
				<p><strong>Basic Page:</strong> {{ basicCurrentPage }} / {{ Math.ceil(basicTotalItems / basicPerPage) }}</p>
				<p><strong>Jump Page:</strong> {{ jumpCurrentPage }}</p>
				<p><strong>Table Page:</strong> {{ tableCurrentPage }} ({{ tablePageSize }} per page)</p>
				<p><strong>Product Page:</strong> {{ productCurrentPage }} ({{ productPageSize }} per page)</p>
				<p><strong>Post Page:</strong> {{ postCurrentPage }} ({{ postPageSize }} per page)</p>
				<p><strong>Search Query:</strong> "{{ searchQuery || 'None' }}"</p>
				<p><strong>Selected Role Filter:</strong> {{ filterRole || 'All' }}</p>
				<p><strong>Product Category:</strong> {{ productCategory || 'All' }}</p>
				<p><strong>Infinite Scroll Items:</strong> {{ infiniteScrollItems.length }}</p>
				<p><strong>Theme Demo Pages:</strong> {{ themeDemoPage }}, {{ themeDemoPage2 }}, {{ themeDemoPage3 }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { tuButton as TuButton } from "../components/tuButton";
import TuPagination from "../components/tuPagination";
import { tuChip as TuChip } from "../components/tuChip";
import { tuTable as TuTable } from "../components/tuTable";
import TuInput from "../components/tuInput";
import TuSelect from "../components/tuSelect/tuSelect.vue";
import TuIcon from "../components/tuIcon";
import { tuLoading as TuLoading } from "../components/tuLoading";
import TuSwitch from "../components/tuSwitch";

// Types
interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	status?: string;
	joined?: string;
}

interface Post {
	id: number;
	title: string;
	body?: string;
	excerpt?: string;
	author: string;
	status: string;
	date: string;
	readTime: number;
}

interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	rating?: string;
	reviews?: number;
	inStock?: boolean;
}

interface Photo {
	id: number;
	title: string;
	url: string;
	thumbnail: string;
}

// API Response types
interface ApiUser {
	id: number;
	name: string;
	email: string;
	phone: string;
	website: string;
	company: {
		name: string;
	};
}

interface ApiPost {
	id: number;
	title: string;
	body: string;
}

interface ApiPhoto {
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
	albumId: number;
}

// API Data
const apiUsers = ref<User[]>([]);
const apiPosts = ref<Post[]>([]);
const apiProducts = ref<Product[]>([]);
const apiPhotos = ref<Photo[]>([]);

const loading = ref(true);

// Theme control
const isDarkMode = ref(false);
const themeDemoPage = ref(1);
const themeDemoPage2 = ref(1);
const themeDemoPage3 = ref(1);

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

// Photo pagination
const photoCurrentPage = ref(1);
const photoPageSize = ref(12);

// Load more
const loadingMore = ref(false);
const loadMoreCount = ref(5);

// Infinite scroll
const loadingInfinite = ref(false);
const infiniteScrollItems = ref<Array<{id: number; title: string; content: string}>>([]);
const scrollContainer = ref();

// Fetch data from APIs
const fetchApiData = async () => {
	try {
		loading.value = true;
		
		// Fetch users from JSONPlaceholder
		const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
		const users = await usersResponse.json();
		apiUsers.value = users.map((user: ApiUser) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			role: ["Admin", "Editor", "User"][Math.floor(Math.random() * 3)],
			status: Math.random() > 0.3 ? "Active" : "Inactive",
			joined: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0],
			phone: user.phone,
			website: user.website,
			company: user.company.name
		}));

		// Fetch posts
		const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
		const posts = await postsResponse.json();
		apiPosts.value = posts.slice(0, 20).map((post: ApiPost) => ({
			id: post.id,
			title: post.title,
			excerpt: post.body.substring(0, 120) + "...",
			author: apiUsers.value[Math.floor(Math.random() * apiUsers.value.length)]?.name || "Unknown Author",
			date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0],
			readTime: Math.floor(Math.random() * 15) + 3,
			status: Math.random() > 0.2 ? "published" : "draft",
			category: ["Technology", "Design", "Business", "Programming", "Tutorial"][Math.floor(Math.random() * 5)]
		}));

		// Create sample products with more variety
		const productNames = [
			"Wireless Headphones", "Smart Watch", "Laptop Stand", "Coffee Mug", "Phone Case",
			"Bluetooth Speaker", "Desk Lamp", "Water Bottle", "Notebook", "Pen Set",
			"Yoga Mat", "Plant Pot", "Gaming Mouse", "Keyboard", "Monitor Stand",
			"USB Cable", "Power Bank", "Tablet Case", "Webcam", "Microphone"
		];
		
		apiProducts.value = productNames.map((name, index) => ({
			id: index + 1,
			name: name,
			description: `High-quality ${name.toLowerCase()} for everyday use`,
			price: Math.floor(Math.random() * 200) + 10,
			category: ["Electronics", "Home", "Office", "Sports", "Gaming"][Math.floor(Math.random() * 5)],
			rating: (Math.random() * 2 + 3).toFixed(1),
			reviews: Math.floor(Math.random() * 500) + 10,
			inStock: Math.random() > 0.1
		}));

		// Fetch photos for visual examples
		const photosResponse = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=50");
		const photos = await photosResponse.json();
		apiPhotos.value = photos.map((photo: ApiPhoto) => ({
			id: photo.id,
			title: photo.title,
			thumbnail: photo.thumbnailUrl,
			url: photo.url,
			albumId: photo.albumId
		}));

		loading.value = false;
	}
	catch (error) {
		console.error("Error fetching API data:", error);
		loading.value = false;
		// Fallback to original static data if API fails
		initializeFallbackData();
	}
};

const initializeFallbackData = () => {
	// Fallback static data in case API fails
	apiUsers.value = [
		{ id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joined: "2023-01-15" },
		{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", joined: "2023-02-20" },
		{ id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Inactive", joined: "2023-03-10" },
		{ id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Editor", status: "Active", joined: "2023-04-05" },
		{ id: 5, name: "Alex Chen", email: "alex@example.com", role: "User", status: "Active", joined: "2023-05-12" }
	];
};

// Table columns
const userColumns = ref([
	{ field: "name", caption: "Name" },
	{ field: "email", caption: "Email" },
	{ field: "role", caption: "Role" },
	{ field: "status", caption: "Status" },
	{ field: "joined", caption: "Joined" }
]);

const roleFilterOptions = ref([
	{ label: "All Roles", value: "" },
	{ label: "Admin", value: "Admin" },
	{ label: "Editor", value: "Editor" },
	{ label: "User", value: "User" }
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
	{ label: "Sports", value: "Sports" },
	{ label: "Gaming", value: "Gaming" }
]);

// Computed properties using API data
const filteredUsers = computed(() => {
	let filtered = apiUsers.value;
	
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		filtered = filtered.filter(user => 
			user.name.toLowerCase().includes(query) ||
			user.email.toLowerCase().includes(query)
		);
	}
	
	if (filterRole.value) 
		filtered = filtered.filter(user => user.role === filterRole.value);
	
	return filtered;
});

const paginatedUsers = computed(() => {
	const start = (tableCurrentPage.value - 1) * tablePageSize.value;
	const end = start + tablePageSize.value;
	return filteredUsers.value.slice(start, end);
});

const filteredProducts = computed(() => {
	let filtered = apiProducts.value;
	
	if (productCategory.value) 
		filtered = filtered.filter(product => product.category === productCategory.value);
	
	// Sort products
	if (productSort.value === "name") 
		filtered.sort((a, b) => a.name.localeCompare(b.name));
	else if (productSort.value === "price-asc") 
		filtered.sort((a, b) => a.price - b.price);
	else if (productSort.value === "price-desc") 
		filtered.sort((a, b) => b.price - a.price);
	else if (productSort.value === "category") 
		filtered.sort((a, b) => a.category.localeCompare(b.category));
	
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
	return apiPosts.value.slice(start, end);
});

const paginatedPhotos = computed(() => {
	const start = (photoCurrentPage.value - 1) * photoPageSize.value;
	const end = start + photoPageSize.value;
	return apiPhotos.value.slice(start, end);
});

const visibleActivities = computed(() => {
	// Generate activities from API data
	const activities = apiUsers.value.slice(0, 8).map((user, index) => ({
		id: index + 1,
		user: user.name,
		action: ["updated", "created", "deleted", "commented on", "assigned"][Math.floor(Math.random() * 5)],
		target: ["Project Alpha", "New Task", "Bug Report", "Feature Request"][Math.floor(Math.random() * 4)],
		timestamp: Date.now() - (index * 300000)
	}));
	
	return activities.slice(0, loadMoreCount.value);
});

// Initialize data on component mount
onMounted(() => {
	fetchApiData();
	initializeInfiniteScroll();
});

// Methods
const toggleTheme = () => {
	if (isDarkMode.value)
		document.body.classList.add("tu-dark-theme");
	else
		document.body.classList.remove("tu-dark-theme");
};

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
		Sports: "info",
		Gaming: "danger"
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
	
	if (target.scrollTop + target.clientHeight >= target.scrollHeight - threshold) 
		loadMoreInfiniteItems();
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

// Initialize data on component mount
onMounted(() => {
	fetchApiData();
	initializeInfiniteScroll();
});
</script>

<style scoped>
.showcase-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.theme-controls {
	display: flex;
	align-items: center;
	gap: 8px;
}

.theme-demo-light {
	background: #ffffff;
	padding: 15px;
	border-radius: 8px;
	border: 1px solid #e6e9ea;
}

.theme-demo-dark {
	background: #1e1f22;
	padding: 15px;
	border-radius: 8px;
	border: 1px solid #333437;
	
	/* Override CSS custom properties for dark theme demo */
	--tu-background: #151916;
	--tu-component-background: #1e1f22;
	--tu-text: #ffffff;
	--tu-gray-1: #333437;
	--tu-gray-2: #1e1f22;
	--tu-gray-3: #0f1013;
	--tu-gray-4: #0a0b0e;
	--tu-background-rgb: 21, 25, 22;
	--tu-component-background-rgb: 30, 31, 34;
	--tu-text-rgb: 255, 255, 255;
	--tu-gray-1-rgb: 51, 52, 55;
	--tu-gray-2-rgb: 30, 31, 34;
	--tu-gray-3-rgb: 15, 16, 19;
	--tu-gray-4-rgb: 10, 11, 14;
}

/* Dark theme support for entire showcase */
.tu-dark-theme .showcase-component {
	background: var(--tu-background);
	color: var(--tu-text);
}

.tu-dark-theme .theme-demo-light {
	opacity: 0.8;
}

/* Dark theme styling for current state section */
.tu-dark-theme .showcase-component div[style*="background: #f5f5f5"] {
	background: var(--tu-gray-1) !important;
	color: var(--tu-text);
	border: 1px solid var(--tu-gray-3);
}

@media (max-width: 768px) {
	.showcase-header {
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}
	
	.theme-controls {
		align-self: flex-end;
	}
}
</style>
