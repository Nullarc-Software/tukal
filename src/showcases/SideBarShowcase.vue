<template>
	<div class="showcase-component">
		<h3>Sidebar:</h3>
		<hr />
		
		<!-- Basic Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Basic Sidebar:</h4>
			<div style="position: relative; height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
				<tu-side-bar 
					v-model="basicSidebarVisible" 
					:width="250"
					position="left"
					overlay
				>
					<div style="padding: 20px;">
						<h5>Navigation Menu</h5>
						<ul style="list-style: none; padding: 0; margin: 15px 0;">
							<li style="margin: 10px 0;"><a href="#" style="text-decoration: none; color: #007bff;">Dashboard</a></li>
							<li style="margin: 10px 0;"><a href="#" style="text-decoration: none; color: #007bff;">Projects</a></li>
							<li style="margin: 10px 0;"><a href="#" style="text-decoration: none; color: #007bff;">Tasks</a></li>
							<li style="margin: 10px 0;"><a href="#" style="text-decoration: none; color: #007bff;">Settings</a></li>
							<li style="margin: 10px 0;"><a href="#" style="text-decoration: none; color: #007bff;">Profile</a></li>
						</ul>
					</div>
				</tu-side-bar>
				
				<div style="padding: 20px; background: #f8f9fa; height: 100%; display: flex; align-items: center; justify-content: center;">
					<TuButton @click="basicSidebarVisible = true" color="primary">Open Basic Sidebar</TuButton>
				</div>
			</div>
		</div>

		<!-- Right Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Right Sidebar:</h4>
			<div style="position: relative; height: 300px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
				<tu-side-bar 
					v-model="rightSidebarVisible" 
					:width="300"
					position="right"
					overlay
				>
					<div style="padding: 20px;">
						<h5>Settings Panel</h5>
						<div style="margin: 15px 0;">
							<TuCheckbox v-model="settings.notifications" label="Enable Notifications" />
						</div>
						<div style="margin: 15px 0;">
							<TuCheckbox v-model="settings.darkMode" label="Dark Mode" />
						</div>
						<div style="margin: 15px 0;">
							<TuCheckbox v-model="settings.autoSave" label="Auto Save" />
						</div>
						<div style="margin: 15px 0;">
							<TuSelect v-model="settings.language" label="Language" :select-items="languageOptions" />
						</div>
						<div style="margin: 20px 0;">
							<TuButton @click="saveSettings" color="success" style="width: 100%;">Save Settings</TuButton>
						</div>
					</div>
				</tu-side-bar>
				
				<div style="padding: 20px; background: #f8f9fa; height: 100%; display: flex; align-items: center; justify-content: center;">
					<TuButton @click="rightSidebarVisible = true" color="success">Open Right Sidebar</TuButton>
				</div>
			</div>
		</div>

		<!-- Persistent Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Persistent Sidebar (No Overlay):</h4>
			<div style="position: relative; height: 400px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; display: flex;">
				<tu-side-bar 
					v-model="persistentSidebarVisible" 
					:width="220"
					position="left"
					:overlay="false"
					persistent
				>
					<div style="padding: 15px; height: 100%; background: #2c3e50; color: white;">
						<h6 style="color: white; margin-bottom: 20px;">Admin Panel</h6>
						
						<div class="sidebar-menu">
							<div 
								v-for="item in adminMenuItems" 
								:key="item.id"
								@click="selectMenuItem(item.id)"
								:class="{ active: activeMenuItem === item.id }"
								class="menu-item"
								style="padding: 12px; margin: 5px 0; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px;"
							>
								<tu-icon :name="item.icon" size="16" />
								<span>{{ item.label }}</span>
							</div>
						</div>
						
						<div style="position: absolute; bottom: 15px; left: 15px; right: 15px;">
							<div style="border-top: 1px solid #34495e; padding-top: 15px;">
								<div style="display: flex; align-items: center; gap: 10px;">
									<TuAvatar size="sm" />
									<div>
										<div style="font-size: 14px; font-weight: 500;">Admin User</div>
										<div style="font-size: 12px; color: #bdc3c7;">administrator</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</tu-side-bar>
				
				<div style="flex: 1; padding: 20px; background: #f8f9fa; overflow-y: auto;">
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
						<h5>{{ getActiveMenuLabel() }}</h5>
						<TuButton @click="togglePersistentSidebar" size="sm" color="info">
							{{ persistentSidebarVisible ? 'Hide' : 'Show' }} Sidebar
						</TuButton>
					</div>
					
					<div v-if="activeMenuItem === 'dashboard'">
						<p>Dashboard content goes here...</p>
						<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
							<div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
								<h6>Total Users</h6>
								<div style="font-size: 24px; font-weight: bold; color: #007bff;">1,234</div>
							</div>
							<div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
								<h6>Revenue</h6>
								<div style="font-size: 24px; font-weight: bold; color: #28a745;">$56,789</div>
							</div>
							<div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
								<h6>Orders</h6>
								<div style="font-size: 24px; font-weight: bold; color: #ffc107;">456</div>
							</div>
						</div>
					</div>
					
					<div v-else-if="activeMenuItem === 'users'">
						<p>User management interface would be here...</p>
						<TuTable :table-data="sampleUsers" />
					</div>
					
					<div v-else-if="activeMenuItem === 'analytics'">
						<p>Analytics and reports would be displayed here...</p>
						<div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
							<h6>Performance Metrics</h6>
							<p>Charts and graphs would go here...</p>
						</div>
					</div>
					
					<div v-else>
						<p>Content for {{ getActiveMenuLabel() }} section...</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Mobile-Style Sidebar:</h4>
			<div style="position: relative; height: 350px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; max-width: 400px; margin: 0 auto;">
				<tu-side-bar 
					v-model="mobileSidebarVisible" 
					:width="280"
					position="left"
					overlay
					mobile
				>
					<div style="padding: 0; height: 100%; background: white;">
						<!-- Header -->
						<div style="padding: 20px; background: #6c757d; color: white; display: flex; justify-content: space-between; align-items: center;">
							<h6 style="color: white; margin: 0;">Menu</h6>
							<TuButton @click="mobileSidebarVisible = false" size="sm" color="light">×</TuButton>
						</div>
						
						<!-- Profile Section -->
						<div style="padding: 20px; text-align: center; border-bottom: 1px solid #eee;">
							<TuAvatar size="lg" style="margin-bottom: 10px;" />
							<div style="font-weight: 500;">John Doe</div>
							<div style="font-size: 14px; color: #666;">john.doe@example.com</div>
						</div>
						
						<!-- Menu Items -->
						<div style="padding: 10px 0;">
							<div 
								v-for="item in mobileMenuItems" 
								:key="item.id"
								@click="selectMobileMenuItem(item.id)"
								class="mobile-menu-item"
								style="padding: 15px 20px; display: flex; align-items: center; gap: 15px; cursor: pointer; border-bottom: 1px solid #f8f9fa;"
							>
								<tu-icon :name="item.icon" size="18" />
								<span style="flex: 1;">{{ item.label }}</span>
								<span v-if="item.badge" style="background: #dc3545; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">{{ item.badge }}</span>
								<tu-icon name="arrow-right" size="14" color="#999" />
							</div>
						</div>
						
						<!-- Footer -->
						<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; border-top: 1px solid #eee; background: #f8f9fa;">
							<TuButton @click="logout" color="danger" outline style="width: 100%;">Logout</TuButton>
						</div>
					</div>
				</tu-side-bar>
				
				<!-- Mobile App Content -->
				<div style="height: 100%; background: #f8f9fa; position: relative;">
					<!-- Header Bar -->
					<div style="background: white; padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
						<TuButton @click="mobileSidebarVisible = true" size="sm" color="secondary">☰ Menu</TuButton>
						<h6 style="margin: 0;">Mobile App</h6>
						<TuButton size="sm" color="secondary">🔍</TuButton>
					</div>
					
					<!-- Content -->
					<div style="padding: 20px; text-align: center;">
						<h6>Selected: {{ selectedMobileItem || 'None' }}</h6>
						<p style="color: #666; margin: 15px 0;">This simulates a mobile app interface with a sliding sidebar menu.</p>
						<TuButton @click="mobileSidebarVisible = true" color="primary">Open Menu</TuButton>
					</div>
				</div>
			</div>
		</div>

		<!-- Chat Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Chat Sidebar:</h4>
			<div style="position: relative; height: 400px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
				<tu-side-bar 
					v-model="chatSidebarVisible" 
					:width="350"
					position="right"
					overlay
				>
					<div style="height: 100%; display: flex; flex-direction: column; background: white;">
						<!-- Chat Header -->
						<div style="padding: 15px 20px; background: #007bff; color: white; display: flex; justify-content: space-between; align-items: center;">
							<div>
								<h6 style="color: white; margin: 0;">Team Chat</h6>
								<div style="font-size: 12px; opacity: 0.9;">{{ onlineUsers.length }} members online</div>
							</div>
							<TuButton @click="chatSidebarVisible = false" size="sm" color="light">×</TuButton>
						</div>
						
						<!-- Online Users -->
						<div style="padding: 15px; border-bottom: 1px solid #eee;">
							<h6 style="font-size: 14px; margin-bottom: 10px;">Online Now</h6>
							<div style="display: flex; gap: 8px; flex-wrap: wrap;">
								<div 
									v-for="user in onlineUsers" 
									:key="user.id"
									style="display: flex; align-items: center; gap: 6px; background: #f8f9fa; padding: 4px 8px; border-radius: 12px; font-size: 12px;"
								>
									<div style="width: 8px; height: 8px; background: #28a745; border-radius: 50%;"></div>
									{{ user.name }}
								</div>
							</div>
						</div>
						
						<!-- Chat Messages -->
						<div style="flex: 1; padding: 15px; overflow-y: auto; max-height: 250px;">
							<div 
								v-for="message in chatMessages" 
								:key="message.id"
								style="margin-bottom: 15px;"
							>
								<div style="display: flex; align-items: flex-start; gap: 10px;">
									<TuAvatar :src="message.avatar" size="sm" />
									<div style="flex: 1;">
										<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
											<span style="font-weight: 500; font-size: 14px;">{{ message.author }}</span>
											<span style="font-size: 12px; color: #666;">{{ formatTime(message.time) }}</span>
										</div>
										<div style="background: #f8f9fa; padding: 8px 12px; border-radius: 12px; font-size: 14px;">
											{{ message.content }}
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<!-- Chat Input -->
						<div style="padding: 15px; border-top: 1px solid #eee;">
							<div style="display: flex; gap: 10px;">
								<TuInput 
									v-model="newMessage" 
									placeholder="Type a message..." 
									@keypress.enter="sendMessage"
									style="flex: 1;"
								/>
								<TuButton @click="sendMessage" color="primary" :disabled="!newMessage.trim()">Send</TuButton>
							</div>
						</div>
					</div>
				</tu-side-bar>
				
				<div style="padding: 20px; background: #f8f9fa; height: 100%; display: flex; align-items: center; justify-content: center;">
					<div style="text-align: center;">
						<h6>Main Content Area</h6>
						<p style="color: #666; margin: 15px 0;">Click the button below to open the team chat sidebar.</p>
						<TuButton @click="chatSidebarVisible = true" color="info">Open Team Chat</TuButton>
					</div>
				</div>
			</div>
		</div>

		<!-- Shopping Cart Sidebar -->
		<div style="margin: 20px 0;">
			<h4>Shopping Cart Sidebar:</h4>
			<div style="position: relative; height: 450px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
				<tu-side-bar 
					v-model="cartSidebarVisible" 
					:width="380"
					position="right"
					overlay
				>
					<div style="height: 100%; display: flex; flex-direction: column; background: white;">
						<!-- Cart Header -->
						<div style="padding: 20px; background: #f8f9fa; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
							<div>
								<h5 style="margin: 0;">Shopping Cart</h5>
								<div style="font-size: 14px; color: #666;">{{ cartItems.length }} items</div>
							</div>
							<TuButton @click="cartSidebarVisible = false" size="sm" color="secondary">×</TuButton>
						</div>
						
						<!-- Cart Items -->
						<div style="flex: 1; padding: 0; overflow-y: auto;">
							<div 
								v-for="item in cartItems" 
								:key="item.id"
								style="padding: 15px 20px; border-bottom: 1px solid #f0f0f0; display: flex; gap: 15px;"
							>
								<img :src="item.image" :alt="item.name" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
								<div style="flex: 1;">
									<h6 style="margin: 0 0 5px 0; font-size: 14px;">{{ item.name }}</h6>
									<div style="font-size: 12px; color: #666; margin-bottom: 8px;">{{ item.description }}</div>
									<div style="display: flex; justify-content: space-between; align-items: center;">
										<div style="display: flex; align-items: center; gap: 8px;">
											<TuButton @click="decrementQuantity(item.id)" size="xs" color="secondary">-</TuButton>
											<span style="font-size: 14px; min-width: 20px; text-align: center;">{{ item.quantity }}</span>
											<TuButton @click="incrementQuantity(item.id)" size="xs" color="secondary">+</TuButton>
										</div>
										<div style="font-weight: 500; color: #007bff;">${{ (item.price * item.quantity).toFixed(2) }}</div>
									</div>
								</div>
								<TuButton @click="removeFromCart(item.id)" size="xs" color="danger">×</TuButton>
							</div>
							
							<div v-if="cartItems.length === 0" style="padding: 40px 20px; text-align: center; color: #666;">
								<h6>Your cart is empty</h6>
								<p style="font-size: 14px;">Add some items to get started!</p>
							</div>
						</div>
						
						<!-- Cart Summary -->
						<div v-if="cartItems.length > 0" style="padding: 20px; border-top: 1px solid #eee; background: #f8f9fa;">
							<div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
								<span>Subtotal:</span>
								<span>${{ cartSubtotal.toFixed(2) }}</span>
							</div>
							<div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
								<span>Shipping:</span>
								<span>${{ shipping.toFixed(2) }}</span>
							</div>
							<div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-weight: bold; font-size: 16px; padding-top: 10px; border-top: 1px solid #ddd;">
								<span>Total:</span>
								<span>${{ cartTotal.toFixed(2) }}</span>
							</div>
							<TuButton @click="checkout" color="success" style="width: 100%; margin-bottom: 10px;">Checkout</TuButton>
							<TuButton @click="clearCart" color="danger" outline style="width: 100%;">Clear Cart</TuButton>
						</div>
					</div>
				</tu-side-bar>
				
				<!-- Store Content -->
				<div style="padding: 20px; background: #f8f9fa; height: 100%; overflow-y: auto;">
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
						<h5>Online Store</h5>
						<TuButton @click="cartSidebarVisible = true" color="primary">
							🛒 Cart ({{ cartItems.length }})
						</TuButton>
					</div>
					
					<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
						<div 
							v-for="product in storeProducts" 
							:key="product.id"
							style="background: white; border-radius: 8px; padding: 15px; text-align: center;"
						>
							<img :src="product.image" :alt="product.name" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px; margin-bottom: 10px;" />
							<h6 style="margin: 10px 0 5px 0;">{{ product.name }}</h6>
							<div style="font-size: 18px; font-weight: bold; color: #007bff; margin: 10px 0;">${{ product.price.toFixed(2) }}</div>
							<TuButton @click="addToCart(product)" size="sm" color="primary" style="width: 100%;">Add to Cart</TuButton>
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
// Sidebar visibility states
const basicSidebarVisible = ref(false);
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
	
	if (existingItem) {
		existingItem.quantity++;
	} else {
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
	if (index > -1) {
		cartItems.value.splice(index, 1);
	}
};

const incrementQuantity = (itemId: number) => {
	const item = cartItems.value.find(item => item.id === itemId);
	if (item) {
		item.quantity++;
	}
};

const decrementQuantity = (itemId: number) => {
	const item = cartItems.value.find(item => item.id === itemId);
	if (item && item.quantity > 1) {
		item.quantity--;
	}
};

const clearCart = () => {
	if (confirm("Clear all items from cart?")) {
		cartItems.value = [];
	}
};

const checkout = () => {
	console.log("Proceeding to checkout with items:", cartItems.value);
	alert(`Checkout initiated! Total: $${cartTotal.value.toFixed(2)}`);
	cartSidebarVisible.value = false;
};
</script>

<style scoped>
.menu-item:hover {
	background-color: #34495e !important;
}

.menu-item.active {
	background-color: #3498db !important;
}

.mobile-menu-item:hover {
	background-color: #f8f9fa;
}

.sidebar-menu {
	margin-bottom: 40px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
	.tu-side-bar {
		width: 100% !important;
	}
}
</style>
