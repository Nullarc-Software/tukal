<template>
	<div class="showcase-component">
		<h3>Navbar:</h3>
		<hr />
		
		<!-- Basic Navbar -->
		<div style="margin: 20px 0;">
			<h4>Basic Navbar:</h4>
			<TuNavbar>
				<template #brand>
					<TuNavbar-brand href="#" style="font-weight: bold; font-size: 18px;">
						MyApp
					</tu-navbar-brand>
				</template>
				
				<template #nav>
					<TuNavbar-nav>
						<TuNavbar-item href="#" active>Home</tu-navbar-item>
						<TuNavbar-item href="#">About</tu-navbar-item>
						<TuNavbar-item href="#">Services</tu-navbar-item>
						<TuNavbar-item href="#">Contact</tu-navbar-item>
					</tu-navbar-nav>
				</template>
			</TuNavbar>
		</div>

		<!-- With Logo and Actions -->
		<div style="margin: 20px 0;">
			<h4>With Logo and Actions:</h4>
			<TuNavbar color="primary">
				<template #brand>
					<TuNavbar-brand href="#" style="display: flex; align-items: center; gap: 10px;">
						<img src="/logo.svg" alt="Logo" style="width: 32px; height: 32px;" />
						<span style="font-weight: bold; color: white;">TechCorp</span>
					</tu-navbar-brand>
				</template>
				
				<template #nav>
					<TuNavbar-nav>
						<TuNavbar-item href="#" style="color: white;">Dashboard</tu-navbar-item>
						<TuNavbar-item href="#" style="color: white;">Projects</tu-navbar-item>
						<TuNavbar-item href="#" style="color: white;">Team</tu-navbar-item>
						<TuNavbar-dropdown style="color: white;">
							<template #trigger>
								<span>Reports</span>
							</template>
							<TuNavbar-dropdown-item href="#">Analytics</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Sales</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Performance</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-divider />
							<TuNavbar-dropdown-item href="#">Export Data</tu-navbar-dropdown-item>
						</tu-navbar-dropdown>
					</tu-navbar-nav>
				</template>
				
				<template #actions>
					<div style="display: flex; align-items: center; gap: 15px;">
						<TuButton size="sm" color="light">
							<tu-icon>notifications</tu-icon>
						</TuButton>
						<TuButton size="sm" color="light">
							<tu-icon>search</tu-icon>
						</TuButton>
						<TuAvatar src="/user-avatar.jpg" size="sm" />
					</div>
				</template>
			</TuNavbar>
		</div>

		<!-- Dark Theme -->
		<div style="margin: 20px 0;">
			<h4>Dark Theme:</h4>
			<TuNavbar theme="dark" style="background: #212529;">
				<template #brand>
					<TuNavbar-brand href="#" style="color: white; font-weight: bold;">
						DarkApp
					</tu-navbar-brand>
				</template>
				
				<template #nav>
					<TuNavbar-nav>
						<TuNavbar-item href="#" style="color: #fff;" active>Home</tu-navbar-item>
						<TuNavbar-item href="#" style="color: #adb5bd;">Products</tu-navbar-item>
						<TuNavbar-item href="#" style="color: #adb5bd;">Solutions</tu-navbar-item>
						<TuNavbar-item href="#" style="color: #adb5bd;">Pricing</tu-navbar-item>
						<TuNavbar-item href="#" style="color: #adb5bd;">Support</tu-navbar-item>
					</tu-navbar-nav>
				</template>
				
				<template #actions>
					<div style="display: flex; align-items: center; gap: 10px;">
						<TuButton size="sm" outline color="light">Login</TuButton>
						<TuButton size="sm" color="primary">Sign Up</TuButton>
					</div>
				</template>
			</TuNavbar>
		</div>

		<!-- E-commerce Navbar -->
		<div style="margin: 20px 0;">
			<h4>E-commerce Navbar:</h4>
			<TuNavbar style="background: #fff; border-bottom: 1px solid #dee2e6; padding: 10px 0;">
				<template #brand>
					<TuNavbar-brand href="#" style="display: flex; align-items: center; gap: 8px;">
						<tu-icon style="color: #e74c3c; font-size: 24px;">shopping_cart</tu-icon>
						<span style="font-weight: bold; color: #2c3e50;">ShopMart</span>
					</tu-navbar-brand>
				</template>
				
				<template #nav>
					<div style="flex: 1; max-width: 500px; margin: 0 20px;">
						<TuInput 
							placeholder="Search products..."
							style="width: 100%;"
						>
							<template #append>
								<TuButton color="primary" size="sm">
									<tu-icon>search</tu-icon>
								</TuButton>
							</template>
						</TuInput>
					</div>
				</template>
				
				<template #actions>
					<div style="display: flex; align-items: center; gap: 20px;">
						<div style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
							<tu-icon>favorite</tu-icon>
							<span style="font-size: 14px;">Wishlist</span>
							<TuChip size="xs" color="danger">{{ wishlistCount }}</TuChip>
						</div>
						
						<div style="display: flex; align-items: center; gap: 5px; cursor: pointer;" @click="toggleCart">
							<tu-icon>shopping_cart</tu-icon>
							<span style="font-size: 14px;">Cart</span>
							<TuChip size="xs" color="primary">{{ cartItems.length }}</TuChip>
						</div>
						
						<TuNavbar-dropdown>
							<template #trigger>
								<div style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
									<TuAvatar size="sm" />
									<span style="font-size: 14px;">John Doe</span>
									<tu-icon>arrow_drop_down</tu-icon>
								</div>
							</template>
							<TuNavbar-dropdown-item href="#">My Account</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Order History</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Addresses</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-divider />
							<TuNavbar-dropdown-item href="#">Settings</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Logout</tu-navbar-dropdown-item>
						</tu-navbar-dropdown>
					</div>
				</template>
			</TuNavbar>
		</div>

		<!-- Admin Dashboard Navbar -->
		<div style="margin: 20px 0;">
			<h4>Admin Dashboard:</h4>
			<TuNavbar style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
				<template #brand>
					<TuNavbar-brand href="#" style="color: white; font-weight: bold;">
						<tu-icon style="margin-right: 8px;">dashboard</tu-icon>
						Admin Panel
					</tu-navbar-brand>
				</template>
				
				<template #nav>
					<TuNavbar-nav>
						<TuNavbar-dropdown>
							<template #trigger>
								<span style="color: white; display: flex; align-items: center; gap: 5px;">
									<tu-icon>people</tu-icon>
									Users
									<tu-icon>arrow_drop_down</tu-icon>
								</span>
							</template>
							<TuNavbar-dropdown-item href="#">All Users</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Add User</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">User Roles</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Permissions</tu-navbar-dropdown-item>
						</tu-navbar-dropdown>
						
						<TuNavbar-dropdown>
							<template #trigger>
								<span style="color: white; display: flex; align-items: center; gap: 5px;">
									<tu-icon>inventory</tu-icon>
									Content
									<tu-icon>arrow_drop_down</tu-icon>
								</span>
							</template>
							<TuNavbar-dropdown-item href="#">Posts</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Pages</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Media</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Categories</tu-navbar-dropdown-item>
						</tu-navbar-dropdown>
						
						<TuNavbar-item href="#" style="color: white;">
							<tu-icon style="margin-right: 5px;">analytics</tu-icon>
							Analytics
						</tu-navbar-item>
						
						<TuNavbar-item href="#" style="color: white;">
							<tu-icon style="margin-right: 5px;">settings</tu-icon>
							Settings
						</tu-navbar-item>
					</tu-navbar-nav>
				</template>
				
				<template #actions>
					<div style="display: flex; align-items: center; gap: 15px;">
						<div style="position: relative;">
							<TuButton size="sm" color="transparent" style="color: white;">
								<tu-icon>notifications</tu-icon>
							</TuButton>
							<div style="position: absolute; top: 0; right: 0; background: #e74c3c; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; display: flex; align-items: center; justify-content: center;">
								{{ notifications.length }}
							</div>
						</div>
						
						<TuNavbar-dropdown>
							<template #trigger>
								<div style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
									<TuAvatar size="sm" />
									<span style="color: white; font-size: 14px;">Admin User</span>
									<tu-icon style="color: white;">arrow_drop_down</tu-icon>
								</div>
							</template>
							<TuNavbar-dropdown-item href="#">Profile</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Account Settings</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-divider />
							<TuNavbar-dropdown-item href="#">Activity Log</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">System Info</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-divider />
							<TuNavbar-dropdown-item href="#" style="color: #e74c3c;">Logout</tu-navbar-dropdown-item>
						</tu-navbar-dropdown>
					</div>
				</template>
			</TuNavbar>
		</div>

		<!-- Mobile Responsive Navbar -->
		<div style="margin: 20px 0;">
			<h4>Mobile Responsive:</h4>
			<TuNavbar :collapsed="isCollapsed" @toggle="toggleMobile">
				<template #brand>
					<TuNavbar-brand href="#" style="font-weight: bold;">
						ResponsiveApp
					</tu-navbar-brand>
				</template>
				
				<template #toggle>
					<TuButton 
						@click="toggleMobile" 
						size="sm"
						style="display: flex; flex-direction: column; gap: 2px; padding: 8px;"
					>
						<div style="width: 18px; height: 2px; background: currentColor; transition: 0.3s;"></div>
						<div style="width: 18px; height: 2px; background: currentColor; transition: 0.3s;"></div>
						<div style="width: 18px; height: 2px; background: currentColor; transition: 0.3s;"></div>
					</TuButton>
				</template>
				
				<template #nav>
					<TuNavbar-collapse :show="!isCollapsed">
						<TuNavbar-nav>
							<TuNavbar-item href="#" active>Home</tu-navbar-item>
							<TuNavbar-item href="#">About</tu-navbar-item>
							<TuNavbar-item href="#">Services</tu-navbar-item>
							<TuNavbar-item href="#">Portfolio</tu-navbar-item>
							<TuNavbar-item href="#">Contact</tu-navbar-item>
						</tu-navbar-nav>
						
						<div style="margin-top: 10px; display: flex; gap: 10px;">
							<TuButton size="sm" outline>Login</TuButton>
							<TuButton size="sm" color="primary">Register</TuButton>
						</div>
					</tu-navbar-collapse>
				</template>
			</TuNavbar>
			
			<p style="margin-top: 10px; font-size: 12px; color: #666;">
				Mobile state: {{ isCollapsed ? 'Collapsed' : 'Expanded' }}
			</p>
		</div>

		<!-- Multi-level Navigation -->
		<div style="margin: 20px 0;">
			<h4>Multi-level Navigation:</h4>
			<TuNavbar style="background: #34495e; color: white;">
				<template #brand>
					<TuNavbar-brand href="#" style="color: white; font-weight: bold;">
						Enterprise
					</tu-navbar-brand>
				</template>
				
				<template #nav>
					<TuNavbar-nav>
						<TuNavbar-dropdown>
							<template #trigger>
								<span style="color: white;">Products</span>
							</template>
							<TuNavbar-dropdown-item href="#">Software Solutions</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Cloud Services</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">AI & Machine Learning</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-divider />
							<TuNavbar-dropdown-item href="#">All Products</tu-navbar-dropdown-item>
						</tu-navbar-dropdown>
						
						<TuNavbar-dropdown>
							<template #trigger>
								<span style="color: white;">Solutions</span>
							</template>
							<TuNavbar-dropdown-item href="#">Enterprise</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Small Business</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Startup</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-divider />
							<TuNavbar-dropdown-item href="#">Custom Solutions</tu-navbar-dropdown-item>
						</tu-navbar-dropdown>
						
						<TuNavbar-dropdown>
							<template #trigger>
								<span style="color: white;">Resources</span>
							</template>
							<TuNavbar-dropdown-item href="#">Documentation</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">API Reference</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Tutorials</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-item href="#">Community</tu-navbar-dropdown-item>
							<TuNavbar-dropdown-divider />
							<TuNavbar-dropdown-item href="#">Support Center</tu-navbar-dropdown-item>
						</tu-navbar-dropdown>
						
						<TuNavbar-item href="#" style="color: white;">Pricing</tu-navbar-item>
					</tu-navbar-nav>
				</template>
				
				<template #actions>
					<div style="display: flex; align-items: center; gap: 10px;">
						<TuInput 
							placeholder="Search..." 
							size="sm" 
							style="width: 200px;"
						>
							<template #prepend>
								<tu-icon>search</tu-icon>
							</template>
						</TuInput>
						<TuButton size="sm" outline color="light">Contact Sales</TuButton>
					</div>
				</template>
			</TuNavbar>
		</div>

		<!-- Customizable Navbar Demo -->
		<div style="margin: 20px 0;">
			<h4>Customizable Demo:</h4>
			<div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
				<h6>Customize Navbar:</h6>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px;">
					<TuSelect v-model="navbarConfig.theme" label="Theme" :select-items="themeOptions" />
					<TuSelect v-model="navbarConfig.size" label="Size" :select-items="sizeOptions" />
					<TuColorPicker v-model="navbarConfig.backgroundColor" label="Background Color" />
					<TuColorPicker v-model="navbarConfig.textColor" label="Text Color" />
				</div>
				
				<div style="margin-top: 15px;">
					<label style="display: flex; align-items: center; gap: 10px;">
						<input type="checkbox" v-model="navbarConfig.fixed" />
						<span>Fixed Position</span>
					</label>
					<label style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
						<input type="checkbox" v-model="navbarConfig.shadow" />
						<span>Drop Shadow</span>
					</label>
				</div>
			</div>
			
			<TuNavbar 
				:style="computedNavbarStyle"
				:class="{ 'fixed-navbar': navbarConfig.fixed, 'shadow-navbar': navbarConfig.shadow }"
			>
				<template #brand>
					<TuNavbar-brand href="#" :style="{ color: navbarConfig.textColor, fontWeight: 'bold' }">
						CustomNav
					</tu-navbar-brand>
				</template>
				
				<template #nav>
					<TuNavbar-nav>
						<TuNavbar-item href="#" :style="{ color: navbarConfig.textColor }" active>Home</tu-navbar-item>
						<TuNavbar-item href="#" :style="{ color: navbarConfig.textColor }">Features</tu-navbar-item>
						<TuNavbar-item href="#" :style="{ color: navbarConfig.textColor }">About</tu-navbar-item>
					</tu-navbar-nav>
				</template>
				
				<template #actions>
					<TuButton size="sm" :style="{ borderColor: navbarConfig.textColor, color: navbarConfig.textColor }" outline>
						Get Started
					</TuButton>
				</template>
			</TuNavbar>
		</div>

		<!-- Current Configuration -->
		<div style="margin: 20px 0;">
			<h4>Current Configuration:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Mobile Collapsed:</strong> {{ isCollapsed }}</p>
				<p><strong>Cart Items:</strong> {{ cartItems.length }}</p>
				<p><strong>Wishlist Count:</strong> {{ wishlistCount }}</p>
				<p><strong>Notifications:</strong> {{ notifications.length }}</p>
				<p><strong>Navbar Theme:</strong> {{ navbarConfig.theme }}</p>
				<p><strong>Background Color:</strong> {{ navbarConfig.backgroundColor }}</p>
				<p><strong>Text Color:</strong> {{ navbarConfig.textColor }}</p>
				<p><strong>Fixed Position:</strong> {{ navbarConfig.fixed }}</p>
				<p><strong>Shadow:</strong> {{ navbarConfig.shadow }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { tuColorPicker as TuColorPicker } from "../components/tuColorPicker";
import { tuNavbar as TuNavbar } from "../components/tuNavbar";
import { tuButton as TuButton } from "../components/tuButton";
import { tuChip as TuChip } from "../components/tuChip";
import TuInput from "../components/tuInput";
import TuAvatar from "../components/tuAvatar";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Mobile responsive state
const isCollapsed = ref(true);

// E-commerce data
const cartItems = ref([
	{ id: 1, name: "Product 1", price: 29.99 },
	{ id: 2, name: "Product 2", price: 49.99 },
	{ id: 3, name: "Product 3", price: 19.99 }
]);

const wishlistCount = ref(5);

// Admin notifications
const notifications = ref([
	{ id: 1, message: "New user registered", type: "info" },
	{ id: 2, message: "Server maintenance scheduled", type: "warning" },
	{ id: 3, message: "Payment failed", type: "error" }
]);

// Customizable navbar configuration
const navbarConfig = ref({
	theme: "light",
	size: "md",
	backgroundColor: "#ffffff",
	textColor: "#333333",
	fixed: false,
	shadow: true
});

// Configuration options
const themeOptions = ref([
	{ label: "Light", value: "light" },
	{ label: "Dark", value: "dark" },
	{ label: "Primary", value: "primary" },
	{ label: "Custom", value: "custom" }
]);

const sizeOptions = ref([
	{ label: "Small", value: "sm" },
	{ label: "Medium", value: "md" },
	{ label: "Large", value: "lg" }
]);

// Computed styles
const computedNavbarStyle = computed(() => {
	const baseStyle = {
		backgroundColor: navbarConfig.value.backgroundColor,
		color: navbarConfig.value.textColor
	};
	
	if (navbarConfig.value.size === "sm") {
		baseStyle.padding = "8px 0";
	} else if (navbarConfig.value.size === "lg") {
		baseStyle.padding = "20px 0";
	} else {
		baseStyle.padding = "15px 0";
	}
	
	return baseStyle;
});

// Methods
const toggleMobile = () => {
	isCollapsed.value = !isCollapsed.value;
};

const toggleCart = () => {
	console.log("Cart toggled");
	alert("Cart sidebar would open here");
};
</script>

<style scoped>
.fixed-navbar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
}

.shadow-navbar {
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-dropdown {
	position: relative;
}

.navbar-dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	background: white;
	border: 1px solid #dee2e6;
	border-radius: 4px;
	box-shadow: 0 4px 6px rgba(0,0,0,0.1);
	min-width: 160px;
	z-index: 1000;
}

.navbar-dropdown-item {
	display: block;
	padding: 8px 16px;
	color: #333;
	text-decoration: none;
	border-bottom: 1px solid #f8f9fa;
}

.navbar-dropdown-item:hover {
	background: #f8f9fa;
}

.navbar-dropdown-divider {
	height: 1px;
	background: #dee2e6;
	margin: 4px 0;
}

.navbar-collapse {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

@media (max-width: 768px) {
	.navbar-collapse {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: white;
		border: 1px solid #dee2e6;
		border-top: none;
		padding: 15px;
		box-shadow: 0 4px 6px rgba(0,0,0,0.1);
	}
}
</style>
