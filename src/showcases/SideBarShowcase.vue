<template>
	<div class="showcase-component">
		<h3>Sidebar:</h3>
		<hr />

		<!-- Basic Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Basic Sidebar with Burger Menu:</h4>
			<div style="position: relative">
				<TuButton @click="mobileSidebarVisible = true" size="sm" color="dark">☰ Menu</TuButton>
				<h6 style="margin: 0;">Mobile App</h6>
				<TuButton size="sm" color="dark">🔍</TuButton>
				<br /><br />
				<div
					style="height: 600px; border: 1px solid red; border-radius: 8px; overflow: hidden; position: relative; display: flex; flex-direction: column;">
					<div style="display: flex; justify-content: center; flex-shrink: 0; padding: 10px; border-bottom: 1px solid #ccc; flex-shrink: 0;">Active Tab: <strong>{{ basicSidebarValue
							}}</strong> </div>
					<div style="display: flex; flex: 1; overflow: hidden; position: relative;">
						<TuSidebar v-model="basicSidebarValue" :open="basicSidebarVisible" absolute reduce theme="dark">
							<template #logo>
								<TuIcon>
									store
								</TuIcon>
							</template>
							<template #header>
								<div style="font-weight: bold; font-size: 1.2rem; padding: 10px 0;">Store</div>
							</template>
							<TuSidebarItem id="dashboard" @click="selectMenuItem('dashboard')" href="/#/dashboard">
								<template #icon>🏠 </template>
								Dashboard (href)
							</TuSidebarItem>
							<TuSidebarItem id="projects" @click="selectMenuItem('projects')" to="/projects">
								<template #icon>📁</template>
								Projects (to)
							</TuSidebarItem>
							<TuSidebarItem id="external" href="https://google.com" target="_blank">
								<template #icon>🌐</template>
								External Link
							</TuSidebarItem>
							<TuSidebarItem id="settings" @click="selectMenuItem('settings')" to="{ path: '/settings' }">
								<template #icon>⚙️</template>
								Settings (to object)
							</TuSidebarItem>
							<TuSidebarItem id="profile" @click="selectMenuItem('profile')">
								<template #icon>👤</template>
								Profile (click only)
							</TuSidebarItem>
						</TuSidebar>

						<div
							style="padding: 20px; background-color: grey; flex: 1; display: flex; align-items: center; justify-content: center; overflow: auto;">
							<TuButton @click="basicSidebarVisible = true" color="primary">Open Basic Sidebar</TuButton>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!-- Basic Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Relative Sidebar:</h4>
			<div style="position: relative">
				<br /><br />
				<div>{{ basicSidebarValue }} </div>
				<div
					style="height: 600px; border: 1px solid red; border-radius: 8px; overflow: hidden; position: relative; display: flex; width:100% ">
					<TuSidebar v-model="basicSidebarValue" :open="relativeSidebarVisible" reduce>
						<template #logo>
							<TuIcon>
								store
							</TuIcon>
						</template>
						<template #header>
							<div style="font-weight: bold; font-size: 1.2rem; padding: 10px 0;">Store</div>
						</template>
						<TuSidebarItem id="dashboard" @click="selectMenuItem('dashboard')" href="/#/dashboard">
							<template #icon>🏠</template>
							Dashboard (href)
						</TuSidebarItem>
						<TuSidebarItem id="projects" @click="selectMenuItem('projects')" to="/projects">
							<template #icon>📁</template>
							Projects (to)
						</TuSidebarItem>
						<TuSidebarItem id="tasks" @click="selectMenuItem('tasks')" to="{ name: 'tasks' }">
							<template #icon>✓</template>
							Tasks (to name)
						</TuSidebarItem>
						<TuSidebarItem id="docs" href="https://vuejs.org" target="_blank">
							<template #icon>📚</template>
							Vue Docs (external)
						</TuSidebarItem>
						<TuSidebarItem id="profile" @click="selectMenuItem('profile')">
							<template #icon>👤</template>
							Profile (click only)
						</TuSidebarItem>
					</TuSidebar>

					<div
						style="padding: 20px; background-color: grey; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; width: 100%;">
						<TuButton @click="relativeSidebarVisible = !relativeSidebarVisible" color="primary">Open
							Relative
							Sidebar</TuButton>
						<div>Content area for relative sidebar demo</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Basic Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Sidebar Right:</h4>
			<div style="position: relative">
				<TuButton @click="mobileSidebarVisible = true" size="sm" color="dark">☰ Menu</TuButton>
				<h6 style="margin: 0;">Mobile App</h6>
				<TuButton size="sm" color="dark">🔍</TuButton>
				<br /><br />
				<div
					style="height: 600px; border: 1px solid red; border-radius: 8px; overflow: hidden; position: relative; display: flex; flex-direction: column;">
					<div style="display: flex; justify-content: center; flex-shrink: 0; padding: 10px; border-bottom: 1px solid #ccc; flex-shrink: 0;">Active Tab: <strong>{{ basicSidebarValue
							}}</strong> </div>
					<div style="display: flex; flex: 1; overflow: hidden; position: relative;">
						<TuSidebar v-model="basicSidebarValue" :open="basicSidebarVisible" absolute reduce right theme="dark">
							<template #logo>
								<TuIcon>
									store
								</TuIcon>
							</template>
							<template #header>
								<div style="font-weight: bold; font-size: 1.2rem; padding: 10px 0;">Store</div>
							</template>
							<TuSidebarItem id="dashboard" @click="selectMenuItem('dashboard')" href="/#/dashboard">
								<template #icon>🏠</template>
								Dashboard (href)
							</TuSidebarItem>
							<TuSidebarItem id="projects" @click="selectMenuItem('projects')" to="/projects">
								<template #icon>📁</template>
								Projects (to)
							</TuSidebarItem>
							<TuSidebarItem id="github" href="https://github.com" target="_blank">
								<template #icon>🐙</template>
								GitHub (external)
							</TuSidebarItem>
							<TuSidebarItem id="settings" @click="selectMenuItem('settings')" to="{ path: '/settings' }">
								<template #icon>⚙️</template>
								Settings (to object)
							</TuSidebarItem>
							<TuSidebarItem id="profile" @click="selectMenuItem('profile')">
								<template #icon>👤</template>
								Profile (click only)
							</TuSidebarItem>
						</TuSidebar>

						<div
							style="padding: 20px; background-color: grey; flex: 1; display: flex; align-items: center; justify-content: center; overflow: auto;">
							<TuButton @click="basicSidebarVisible = true" color="primary">Open Basic Sidebar</TuButton>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!-- Sidebar with Groups -->
		<div style="margin: 20px 0;">
			<h4>Sidebar with Groups (Collapsible Sections):</h4>
			<div style="position: relative">
				<br />
				<div
					style="height: 700px; border: 1px solid #333; border-radius: 8px; overflow: hidden; position: relative; display: flex; width: 100%;">
					<TuSidebar v-model="groupedSidebarValue" :open="groupedSidebarVisible" reduce theme="light" >
						<template #logo>
							<TuIcon>business</TuIcon>
						</template>
						<template #header>
							<div style="font-weight: bold; font-size: 1.2rem; padding: 10px 0;">Admin Panel</div>
						</template>

						<!-- Core Navigation -->
						<TuSidebarItem id="dashboard" @click="selectMenuItem('dashboard')" href="/#/dashboard">
							<template #icon>🏠</template>
							Dashboard
						</TuSidebarItem>

						<!-- User Management Group -->
						<TuSidebarGroup :open="userManagementOpen">
							<template #header>
								<TuSidebarItem arrow @click="userManagementOpen = !userManagementOpen">
									<template #icon>👥</template>
									User Management
								</TuSidebarItem>
							</template>
							<TuSidebarItem id="users-list" @click="selectMenuItem('users-list')" to="/admin/users">
								<template #icon>📋</template>
								All Users
							</TuSidebarItem>
							<TuSidebarItem id="user-roles" @click="selectMenuItem('user-roles')" to="{ name: 'user-roles' }">
								<template #icon>🔐</template>
								User Roles
							</TuSidebarItem>
							<TuSidebarItem id="permissions" @click="selectMenuItem('permissions')" href="/#/admin/permissions">
								<template #icon>⚡</template>
								Permissions
							</TuSidebarItem>
						</TuSidebarGroup>

						<!-- Content Management Group -->
						<TuSidebarGroup :open="contentManagementOpen">
							<template #header>
								<TuSidebarItem arrow @click="contentManagementOpen = !contentManagementOpen">
									<template #icon>📝</template>
									Content Management
								</TuSidebarItem>
							</template>
							<TuSidebarItem id="posts" @click="selectMenuItem('posts')">
								<template #icon>📄</template>
								Posts
							</TuSidebarItem>
							<TuSidebarItem id="categories" @click="selectMenuItem('categories')">
								<template #icon>🏷️</template>
								Categories
							</TuSidebarItem>
							<TuSidebarItem id="media" @click="selectMenuItem('media')">
								<template #icon>🎨</template>
								Media Library
							</TuSidebarItem>
							<TuSidebarItem id="comments" @click="selectMenuItem('comments')">
								<template #icon>💬</template>
								Comments
							</TuSidebarItem>
						</TuSidebarGroup>

						<!-- Analytics Group -->
						<TuSidebarGroup :open="analyticsOpen">
							<template #header>
								<TuSidebarItem arrow @click="analyticsOpen = !analyticsOpen">
									<template #icon>📊</template>
									Analytics
								</TuSidebarItem>
							</template>
							<TuSidebarItem id="reports" @click="selectMenuItem('reports')">
								
								Reports
							</TuSidebarItem>
							<TuSidebarItem id="traffic" @click="selectMenuItem('traffic')">
								
								Traffic Analysis
							</TuSidebarItem>
							<TuSidebarItem id="conversions" @click="selectMenuItem('conversions')">
								<template #icon>🎯</template>
								Conversions
							</TuSidebarItem>
						</TuSidebarGroup>

						<!-- System Group -->
						<TuSidebarGroup :open="systemOpen">
							<template #header>
								<TuSidebarItem arrow @click="systemOpen = !systemOpen">
									<template #icon>⚙️</template>
									System
								</TuSidebarItem>
							</template>
							<TuSidebarItem id="settings" @click="selectMenuItem('settings')" to="/admin/settings">
								<template #icon>🔧</template>
								Settings
							</TuSidebarItem>
							<TuSidebarItem id="logs" @click="selectMenuItem('logs')" href="/#/admin/logs">
								<template #icon>📋</template>
								System Logs
							</TuSidebarItem>
							<TuSidebarItem id="backup" @click="selectMenuItem('backup')" to="{ path: '/admin/backup', query: { type: 'full' } }">
								<template #icon>💾</template>
								Backup
							</TuSidebarItem>
						</TuSidebarGroup>

						<!-- Single items at bottom -->
						<TuSidebarItem id="help" @click="selectMenuItem('help')">
							<template #icon>❓</template>
							Help & Support
						</TuSidebarItem>
						<TuSidebarItem id="logout" @click="logout()">
							<template #icon>🚪</template>
							Logout
						</TuSidebarItem>
					</TuSidebar>

					<div
						style="padding: 20px; background-color: #f8f9fa; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; width: 100%;">
						<div style="text-align: center;">
							<h3>Selected: {{ getActiveMenuLabel() }}</h3>
							<p>Active Menu Item: <code>{{ activeMenuItem }}</code></p>
							<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px;">
								<TuButton @click="groupedSidebarVisible = !groupedSidebarVisible" color="primary" size="sm">
									Toggle Sidebar
								</TuButton>
								<TuButton @click="toggleAllGroups" color="warn" size="sm">
									{{ allGroupsOpen ? 'Collapse' : 'Expand' }} All Groups
								</TuButton>
								<TuButton @click="userManagementOpen = !userManagementOpen" color="success" size="sm">
									Toggle Users Group
								</TuButton>
								<TuButton @click="contentManagementOpen = !contentManagementOpen" color="success" size="sm">
									Toggle Content Group  
								</TuButton>
							</div>
						</div>
						<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
							<h5>Group States:</h5>
							<p><strong>User Management:</strong> {{ userManagementOpen ? 'Open' : 'Closed' }}</p>
							<p><strong>Content Management:</strong> {{ contentManagementOpen ? 'Open' : 'Closed' }}</p>
							<p><strong>Analytics:</strong> {{ analyticsOpen ? 'Open' : 'Closed' }}</p>
							<p><strong>System:</strong> {{ systemOpen ? 'Open' : 'Closed' }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Navigation Types Demo -->
		<div style="margin: 20px 0;">
			<h4>Navigation Types Demo (href vs to):</h4>
			<div style="position: relative">
				<br />
				<div
					style="height: 500px; border: 1px solid #333; border-radius: 8px; overflow: hidden; position: relative; display: flex; width: 100%;">
					<TuSidebar v-model="navigationDemoValue" :open="navigationDemoVisible" reduce theme="light">
						<template #logo>
							<TuIcon>navigation</TuIcon>
						</template>
						<template #header>
							<div style="font-weight: bold; font-size: 1.2rem; padding: 10px 0;">Navigation Demo</div>
						</template>

						<!-- Different navigation examples -->
						<TuSidebarItem id="href-internal" @click="selectMenuItem('href-internal')" href="/#/dashboard" tooltip="Uses href for internal hash routing">
							<template #icon>🔗</template>
							href (internal)
						</TuSidebarItem>

						<TuSidebarItem id="href-external" href="https://vuejs.org" target="_blank" tooltip="Opens external link in new tab">
							<template #icon>🌐</template>
							href (external)
						</TuSidebarItem>

						<TuSidebarItem id="to-string" @click="selectMenuItem('to-string')" to="/projects" tooltip="Uses router.push with string path">
							<template #icon>📁</template>
							to (string path)
						</TuSidebarItem>

						<TuSidebarItem id="to-object-path" @click="selectMenuItem('to-object-path')" :to="{ path: '/settings' }" tooltip="Uses router.push with object path">
							<template #icon>⚙️</template>
							to (object path)
						</TuSidebarItem>

						<TuSidebarItem id="to-object-name" @click="selectMenuItem('to-object-name')" :to="{ name: 'user-profile' }" tooltip="Uses router.push with named route">
							<template #icon>👤</template>
							to (named route)
						</TuSidebarItem>

						<TuSidebarItem id="to-with-params" @click="selectMenuItem('to-with-params')" :to="{ path: '/user/123', query: { tab: 'settings' } }" tooltip="Uses router.push with params and query">
							<template #icon>🎯</template>
							to (with params)
						</TuSidebarItem>

						<TuSidebarItem id="click-only" @click="selectMenuItem('click-only')" tooltip="Only handles click event, no navigation">
							<template #icon>👆</template>
							Click only
						</TuSidebarItem>

						<TuSidebarItem id="same-tab" href="/docs/api" tooltip="Opens in same tab (default target)">
							<template #icon>📄</template>
							Same tab link
						</TuSidebarItem>

						<TuSidebarItem id="new-tab" href="https://github.com/vue/vue-router" target="_blank" tooltip="Opens in new tab">
							<template #icon>🆕</template>
							New tab link
						</TuSidebarItem>
					</TuSidebar>

					<div
						style="padding: 20px; background-color: #f8f9fa; height: 100%; display: flex; align-items: flex-start; justify-content: center; flex-direction: column; gap: 20px; width: 100%;">
						<div style="text-align: left; width: 100%;">
							<h3>Navigation Types Explanation</h3>
							<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">
								<h5>📖 Usage Guide:</h5>
								<ul style="text-align: left; margin: 0;">
									<li><strong>href:</strong> Traditional HTML links. Use for external links or when you want browser navigation behavior</li>
									<li><strong>to (string):</strong> Vue Router navigation with string path. Cleaner for simple routes</li>
									<li><strong>to (object):</strong> Vue Router navigation with route object. Supports params, query, hash, etc.</li>
									<li><strong>@click only:</strong> Custom behavior without navigation. Good for modals, actions, etc.</li>
									<li><strong>target="_blank":</strong> Opens links in new tab (only works with href)</li>
								</ul>
							</div>
							
							<div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border: 1px solid #2196f3; margin-top: 15px;">
								<h5 style="color: #1565c0; margin: 0 0 10px 0;">💡 Current Selection:</h5>
								<p style="margin: 0;"><strong>Selected Item:</strong> {{ navigationDemoValue || 'None' }}</p>
							</div>
							
							<div style="display: flex; gap: 10px; margin-top: 15px;">
								<TuButton @click="navigationDemoVisible = !navigationDemoVisible" color="primary" size="sm">
									Toggle Sidebar
								</TuButton>
								<TuButton @click="testRouterNavigation" color="success" size="sm">
									Test Router Navigation
								</TuButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Current State -->
		<div style="margin: 20px 0;">
			<h4>Current State:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic Sidebar Visible:</strong> {{ basicSidebarVisible }}</p>
				<p><strong>Right Sidebar Visible:</strong> {{ rightSidebarVisible }}</p>
				<p><strong>Persistent Sidebar Visible:</strong> {{ persistentSidebarVisible }}</p>
				<p><strong>Mobile Sidebar Visible:</strong> {{ mobileSidebarVisible }}</p>
				<p><strong>Chat Sidebar Visible:</strong> {{ chatSidebarVisible }}</p>
				<p><strong>Cart Sidebar Visible:</strong> {{ cartSidebarVisible }}</p>
				<p><strong>Grouped Sidebar Visible:</strong> {{ groupedSidebarVisible }}</p>
				<p><strong>Navigation Demo Visible:</strong> {{ navigationDemoVisible }}</p>
				<p><strong>Active Menu Item:</strong> {{ activeMenuItem }}</p>
				<p><strong>Navigation Demo Value:</strong> {{ navigationDemoValue }}</p>
				<p><strong>Selected Mobile Item:</strong> {{ selectedMobileItem }}</p>
				<p><strong>Cart Items:</strong> {{ cartItems.length }}</p>
				<p><strong>Cart Total:</strong> ${{ cartTotal.toFixed(2) }}</p>
				<p><strong>Settings:</strong> {{ JSON.stringify(settings) }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { TuButton } from "../components/tuButton";
import { TuTable } from "../components/tuTable";
import { TuInput } from "../components/tuInput";
import { TuCheckbox } from "../components/tuCheckBox";
import { TuAvatar } from "../components/tuAvatar";
import { TuSelect } from "../components/tuSelect";
import { TuSidebar, TuSidebarItem, TuSidebarGroup } from "../components/tuSideBar";
import { TuIcon } from "../components/tuIcon";
// Sidebar visibility states
const basicSidebarVisible = ref(false);
const relativeSidebarVisible = ref(false);
const rightSidebarVisible = ref(false);
const persistentSidebarVisible = ref(true);
const mobileSidebarVisible = ref(false);
const chatSidebarVisible = ref(false);
const cartSidebarVisible = ref(false);
const groupedSidebarVisible = ref(true);
const navigationDemoVisible = ref(true);

// Group states for TuSidebarGroup demo
const userManagementOpen = ref(true);
const contentManagementOpen = ref(false);
const analyticsOpen = ref(false);
const systemOpen = ref(false);

// Settings
const settings = ref({
	notifications: true,
	darkMode: false,
	autoSave: true,
	language: "en"
});

const languageOptions = ref([
	{ label: "English", value: "en" },
	{ label: "Spanish", value: "es" },
	{ label: "French", value: "fr" },
	{ label: "German", value: "de" }
]);

// Admin menu
const activeMenuItem = ref("dashboard");
const adminMenuItems = ref([
	{ id: "dashboard", label: "Dashboard", icon: "dashboard" },
	{ id: "users", label: "Users", icon: "users" },
	{ id: "products", label: "Products", icon: "box" },
	{ id: "orders", label: "Orders", icon: "shopping-cart" },
	{ id: "analytics", label: "Analytics", icon: "chart-bar" },
	{ id: "settings", label: "Settings", icon: "cog" }
]);

// Mobile menu
const selectedMobileItem = ref("");
const mobileMenuItems = ref([
	{ id: "home", label: "Home", icon: "home" },
	{ id: "messages", label: "Messages", icon: "message", badge: "3" },
	{ id: "notifications", label: "Notifications", icon: "bell", badge: "12" },
	{ id: "profile", label: "Profile", icon: "user" },
	{ id: "favorites", label: "Favorites", icon: "heart" },
	{ id: "settings", label: "Settings", icon: "cog" },
	{ id: "help", label: "Help & Support", icon: "help" }
]);

// Chat data
const newMessage = ref("");
const onlineUsers = ref([
	{ id: 1, name: "Alice" },
	{ id: 2, name: "Bob" },
	{ id: 3, name: "Charlie" },
	{ id: 4, name: "Diana" }
]);

const chatMessages = ref([
	{
		id: 1,
		author: "Alice Johnson",
		avatar: "/avatars/alice.jpg",
		time: new Date(Date.now() - 300000),
		content: "Hey everyone! How's the project coming along?"
	},
	{
		id: 2,
		author: "Bob Smith",
		avatar: "/avatars/bob.jpg",
		time: new Date(Date.now() - 180000),
		content: "Making good progress on the frontend. Should be done by tomorrow."
	},
	{
		id: 3,
		author: "Charlie Brown",
		avatar: "/avatars/charlie.jpg",
		time: new Date(Date.now() - 120000),
		content: "Great! I'll have the API endpoints ready by then too."
	}
]);

// Shopping cart data
const cartItems = ref([
	{
		id: 1,
		name: "Wireless Headphones",
		description: "Premium noise-canceling headphones",
		price: 199.99,
		quantity: 1,
		image: "/products/headphones.jpg"
	},
	{
		id: 2,
		name: "Smart Watch",
		description: "Fitness tracking and notifications",
		price: 299.99,
		quantity: 2,
		image: "/products/smartwatch.jpg"
	}
]);

const storeProducts = ref([
	{
		id: 3,
		name: "Bluetooth Speaker",
		price: 79.99,
		image: "/products/speaker.jpg"
	},
	{
		id: 4,
		name: "Phone Case",
		price: 24.99,
		image: "/products/case.jpg"
	},
	{
		id: 5,
		name: "Laptop Stand",
		price: 49.99,
		image: "/products/stand.jpg"
	},
	{
		id: 6,
		name: "USB Cable",
		price: 12.99,
		image: "/products/cable.jpg"
	}
]);

const shipping = ref(9.99);

const basicSidebarValue = ref();
const groupedSidebarValue = ref();
const navigationDemoValue = ref();

// Sample data
const sampleUsers = ref([
	{ id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
	{ id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Editor" }
]);

// Computed properties
const cartSubtotal = computed(() => {
	return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const cartTotal = computed(() => {
	return cartSubtotal.value + (cartItems.value.length > 0 ? shipping.value : 0);
});

const allGroupsOpen = computed(() => {
	return userManagementOpen.value && contentManagementOpen.value && analyticsOpen.value && systemOpen.value;
});

// Methods
const saveSettings = () => {
	console.log("Saving settings:", settings.value);
	alert("Settings saved successfully!");
};

const selectMenuItem = (itemId: string) => {
	activeMenuItem.value = itemId;
	console.log("Selected menu item:", itemId);
};

const getActiveMenuLabel = (): string => {
	const item = adminMenuItems.value.find(item => item.id === activeMenuItem.value);
	return item ? item.label : "Dashboard";
};

const togglePersistentSidebar = () => {
	persistentSidebarVisible.value = !persistentSidebarVisible.value;
};

const toggleAllGroups = () => {
	const shouldOpen = !allGroupsOpen.value;
	userManagementOpen.value = shouldOpen;
	contentManagementOpen.value = shouldOpen;
	analyticsOpen.value = shouldOpen;
	systemOpen.value = shouldOpen;
};

const selectMobileMenuItem = (itemId: string) => {
	selectedMobileItem.value = itemId;
	mobileSidebarVisible.value = false;
	console.log("Selected mobile menu item:", itemId);
};

const logout = () => {
	if (confirm("Are you sure you want to logout?")) {
		console.log("User logged out");
		alert("Logged out successfully!");
		mobileSidebarVisible.value = false;
	}
};

const formatTime = (date: Date): string => {
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const sendMessage = () => {
	if (!newMessage.value.trim()) return;

	const message = {
		id: Date.now(),
		author: "You",
		avatar: "/avatars/current.jpg",
		time: new Date(),
		content: newMessage.value
	};

	chatMessages.value.push(message);
	newMessage.value = "";

	// Scroll to bottom would be implemented here
	console.log("Message sent:", message);
};

const addToCart = (product: any) => {
	const existingItem = cartItems.value.find(item => item.id === product.id);

	if (existingItem)
		existingItem.quantity++;
	else {
		cartItems.value.push({
			...product,
			quantity: 1,
			description: "High-quality product"
		});
	}

	console.log("Added to cart:", product);
	alert(`${product.name} added to cart!`);
};

const removeFromCart = (itemId: number) => {
	const index = cartItems.value.findIndex(item => item.id === itemId);
	if (index > -1)
		cartItems.value.splice(index, 1);

};

const incrementQuantity = (itemId: number) => {
	const item = cartItems.value.find(item => item.id === itemId);
	if (item)
		item.quantity++;

};

const decrementQuantity = (itemId: number) => {
	const item = cartItems.value.find(item => item.id === itemId);
	if (item && item.quantity > 1)
		item.quantity--;

};

const clearCart = () => {
	if (confirm("Clear all items from cart?"))
		cartItems.value = [];

};

const checkout = () => {
	console.log("Proceeding to checkout with items:", cartItems.value);
	alert(`Checkout initiated! Total: $${cartTotal.value.toFixed(2)}`);
	cartSidebarVisible.value = false;
};

const testRouterNavigation = () => {
	console.log("Testing router navigation with different patterns:");
	console.log("Current selected item:", navigationDemoValue.value);
	alert("Check console for navigation examples!");
};
</script>
