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
							<TuSidebarItem id="dashboard" @click="selectMenuItem('dashboard')">
								<template #icon>🏠</template>
								Dashboard aaaaaaaaaaaa
							</TuSidebarItem>
							<TuSidebarItem id="projects" @click="selectMenuItem('projects')">
								<template #icon>📁</template>
								Projects
							</TuSidebarItem>
							<TuSidebarItem id="tasks" @click="selectMenuItem('tasks')">
								<template #icon>✓</template>
								Tasks
							</TuSidebarItem>
							<TuSidebarItem id="settings" @click="selectMenuItem('settings')">
								<template #icon>⚙️</template>
								Settings
							</TuSidebarItem>
							<TuSidebarItem id="profile" @click="selectMenuItem('profile')">
								<template #icon>👤</template>
								Profile
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
						<TuSidebarItem id="dashboard" @click="selectMenuItem('dashboard')">
							<template #icon>🏠</template>
							Dashboard
						</TuSidebarItem>
						<TuSidebarItem id="projects" @click="selectMenuItem('projects')">
							<template #icon>📁</template>
							Projects
						</TuSidebarItem>
						<TuSidebarItem id="tasks" @click="selectMenuItem('tasks')">
							<template #icon>✓</template>
							Tasks
						</TuSidebarItem>
						<TuSidebarItem id="settings" @click="selectMenuItem('settings')">
							<template #icon>⚙️</template>
							Settings
						</TuSidebarItem>
						<TuSidebarItem id="profile" @click="selectMenuItem('profile')">
							<template #icon>👤</template>
							Profile
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
							<TuSidebarItem id="dashboard" @click="selectMenuItem('dashboard')">
								<template #icon>🏠</template>
								Dashboard aaaaaaaaaaaa
							</TuSidebarItem>
							<TuSidebarItem id="projects" @click="selectMenuItem('projects')">
								<template #icon>📁</template>
								Projects
							</TuSidebarItem>
							<TuSidebarItem id="tasks" @click="selectMenuItem('tasks')">
								<template #icon>✓</template>
								Tasks
							</TuSidebarItem>
							<TuSidebarItem id="settings" @click="selectMenuItem('settings')">
								<template #icon>⚙️</template>
								Settings
							</TuSidebarItem>
							<TuSidebarItem id="profile" @click="selectMenuItem('profile')">
								<template #icon>👤</template>
								Profile
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
				<p><strong>Active Menu Item:</strong> {{ activeMenuItem }}</p>
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

import { tuButton as TuButton } from "../components/tuButton";
import { tuTable as TuTable } from "../components/tuTable";
import TuInput from "../components/tuInput";
import TuCheckbox from "../components/tuCheckBox";
import TuAvatar from "../components/tuAvatar";
import TuSelect from "../components/tuSelect/tuSelect.vue";
import { tuSidebar as TuSidebar, tuSidebarItem as TuSidebarItem } from "../components/tuSideBar";
import tuIcon from "../components/tuIcon";
import TuIcon from "@/components/tuIcon/tuIcon.vue";
// Sidebar visibility states
const basicSidebarVisible = ref(false);
const relativeSidebarVisible = ref(false);
const rightSidebarVisible = ref(false);
const persistentSidebarVisible = ref(true);
const mobileSidebarVisible = ref(false);
const chatSidebarVisible = ref(false);
const cartSidebarVisible = ref(false);

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
</script>
