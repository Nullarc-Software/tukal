<template>
	<div class="showcase-component">
		<h3>Tabs:</h3>
		<hr />
		
		<!-- Basic Tabs -->
		<div style="margin: 20px 0;">
			<h4>Basic Tabs:</h4>
			<TuTabs v-model="basicTab">
				<tu-tab label="Tab 1" value="tab1">
					<div style="padding: 20px;">
						<h5>Content for Tab 1</h5>
						<p>This is the content of the first tab. You can put any content here including text, images, forms, and other components.</p>
					</div>
				</tu-tab>
				<tu-tab label="Tab 2" value="tab2">
					<div style="padding: 20px;">
						<h5>Content for Tab 2</h5>
						<p>This is the second tab with different content. Tabs are useful for organizing related information.</p>
						<TuButton size="sm">Sample Button</TuButton>
					</div>
				</tu-tab>
				<tu-tab label="Tab 3" value="tab3">
					<div style="padding: 20px;">
						<h5>Content for Tab 3</h5>
						<TuInput placeholder="Sample input in tab" style="margin-bottom: 10px;" />
						<TuSelect placeholder="Sample select" :select-items="[{label: 'Option 1', value: '1'}, {label: 'Option 2', value: '2'}]" />
					</div>
				</tu-tab>
			</TuTabs>
			<p>Active tab: {{ basicTab }}</p>
		</div>

		<!-- Different Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<TuTabs v-model="colorTab" color="success">
				<tu-tab label="Success" value="success">
					<div style="padding: 20px;">
						<p>This tab uses the success color theme.</p>
					</div>
				</tu-tab>
				<tu-tab label="Primary" value="primary">
					<div style="padding: 20px;">
						<p>This tab content is in the primary theme.</p>
					</div>
				</tu-tab>
				<tu-tab label="Danger" value="danger">
					<div style="padding: 20px;">
						<p>This tab uses the danger color theme.</p>
					</div>
				</tu-tab>
			</TuTabs>
		</div>

		<!-- With Icons -->
		<div style="margin: 20px 0;">
			<h4>With Icons:</h4>
			<TuTabs v-model="iconTab">
				<tu-tab label="Dashboard" value="dashboard">
					<template #icon>
						<tu-icon>dashboard</tu-icon>
					</template>
					<div style="padding: 20px;">
						<h5>📊 Dashboard</h5>
						<p>Overview of your account and statistics.</p>
						<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px;">
							<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
								<h6>Users</h6>
								<div style="font-size: 24px; font-weight: bold; color: #007bff;">1,234</div>
							</div>
							<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
								<h6>Revenue</h6>
								<div style="font-size: 24px; font-weight: bold; color: #28a745;">$45,678</div>
							</div>
							<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
								<h6>Orders</h6>
								<div style="font-size: 24px; font-weight: bold; color: #ffc107;">567</div>
							</div>
						</div>
					</div>
				</tu-tab>
				<tu-tab label="Users" value="users">
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
					<div style="padding: 20px;">
						<h5>👥 Users</h5>
						<p>Manage your users and their permissions.</p>
						<div v-for="user in sampleUsers" :key="user.id" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
							<div style="display: flex; align-items: center; gap: 10px;">
								<TuAvatar :text="user.name.charAt(0)" size="30" />
								<div>
									<div style="font-weight: bold;">{{ user.name }}</div>
									<div style="font-size: 12px; color: #666;">{{ user.email }}</div>
								</div>
							</div>
							<TuChip :color="user.active ? 'success' : 'danger'" size="sm">
								{{ user.active ? 'Active' : 'Inactive' }}
							</TuChip>
						</div>
					</div>
				</tu-tab>
				<tu-tab label="Settings" value="settings">
					<template #icon>
						<tu-icon>settings</tu-icon>
					</template>
					<div style="padding: 20px;">
						<h5>⚙️ Settings</h5>
						<p>Configure your application settings.</p>
						<div style="margin-top: 15px;">
							<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
								<span>Email Notifications</span>
								<TuSwitch v-model="tabSettings.emailNotifications" />
							</div>
							<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
								<span>Dark Mode</span>
								<TuSwitch v-model="tabSettings.darkMode" />
							</div>
							<div style="margin: 15px 0;">
								<TuInput v-model="tabSettings.companyName" label="Company Name" />
							</div>
							<div style="margin: 15px 0;">
								<TuSelect v-model="tabSettings.timezone" label="Timezone" :select-items="timezones" />
							</div>
						</div>
					</div>
				</tu-tab>
			</TuTabs>
		</div>

		<!-- Vertical Tabs -->
		<div style="margin: 20px 0;">
			<h4>Vertical Tabs:</h4>
			<TuTabs v-model="verticalTab" vertical>
				<tu-tab label="Profile" value="profile">
					<div style="padding: 20px;">
						<h5>Profile Information</h5>
						<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
							<TuInput label="First Name" value="John" />
							<TuInput label="Last Name" value="Doe" />
							<TuInput label="Email" value="john.doe@example.com" />
							<TuInput label="Phone" value="+1 234 567 8900" />
						</div>
					</div>
				</tu-tab>
				<tu-tab label="Security" value="security">
					<div style="padding: 20px;">
						<h5>Security Settings</h5>
						<div style="margin: 15px 0;">
							<TuInput type="password" label="Current Password" />
						</div>
						<div style="margin: 15px 0;">
							<TuInput type="password" label="New Password" />
						</div>
						<div style="margin: 15px 0;">
							<TuInput type="password" label="Confirm Password" />
						</div>
						<TuButton color="primary">Update Password</TuButton>
					</div>
				</tu-tab>
				<tu-tab label="Billing" value="billing">
					<div style="padding: 20px;">
						<h5>Billing Information</h5>
						<p>Manage your subscription and payment methods.</p>
						<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
							<h6>Current Plan: Professional</h6>
							<p>$29/month - Billed monthly</p>
							<TuButton size="sm">Change Plan</TuButton>
						</div>
					</div>
				</tu-tab>
			</TuTabs>
		</div>

		<!-- Disabled Tabs -->
		<div style="margin: 20px 0;">
			<h4>Disabled Tabs:</h4>
			<TuTabs v-model="disabledTab">
				<tu-tab label="Available" value="available">
					<div style="padding: 20px;">
						<p>This tab is available and can be accessed.</p>
					</div>
				</tu-tab>
				<tu-tab label="Disabled" value="disabled" disabled>
					<div style="padding: 20px;">
						<p>This tab is disabled.</p>
					</div>
				</tu-tab>
				<tu-tab label="Another Available" value="another">
					<div style="padding: 20px;">
						<p>This tab is also available.</p>
					</div>
				</tu-tab>
			</TuTabs>
		</div>

		<!-- Dynamic Tabs -->
		<div style="margin: 20px 0;">
			<h4>Dynamic Tabs:</h4>
			<div style="margin-bottom: 10px;">
				<TuButton @click="addTab" size="sm">Add Tab</TuButton>
				<TuButton @click="removeTab" size="sm" style="margin-left: 10px;">Remove Last Tab</TuButton>
			</div>
			<TuTabs v-model="dynamicTab">
				<tu-tab v-for="tab in dynamicTabs" :key="tab.id" :label="tab.label" :value="tab.value">
					<div style="padding: 20px;">
						<h5>{{ tab.label }}</h5>
						<p>{{ tab.content }}</p>
						<TuButton @click="removeSpecificTab(tab.id)" color="danger" size="sm">Remove This Tab</TuButton>
					</div>
				</tu-tab>
			</TuTabs>
			<p v-if="dynamicTabs.length === 0" style="text-align: center; color: #666; padding: 40px;">
				No tabs available. Click "Add Tab" to create one.
			</p>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic Tab:</strong> {{ basicTab }}</p>
				<p><strong>Color Tab:</strong> {{ colorTab }}</p>
				<p><strong>Icon Tab:</strong> {{ iconTab }}</p>
				<p><strong>Vertical Tab:</strong> {{ verticalTab }}</p>
				<p><strong>Disabled Tab:</strong> {{ disabledTab }}</p>
				<p><strong>Dynamic Tab:</strong> {{ dynamicTab }}</p>
				<p><strong>Dynamic Tabs Count:</strong> {{ dynamicTabs.length }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { tuButton as TuButton } from "../components/tuButton";
import { tuTabs as TuTabs } from "../components/tuTabs";
import { tuChip as TuChip } from "../components/tuChip";
import TuInput from "../components/tuInput";
import TuAvatar from "../components/tuAvatar";
import TuSwitch from "../components/tuSwitch";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Tab values
const basicTab = ref("tab1");
const colorTab = ref("success");
const iconTab = ref("dashboard");
const verticalTab = ref("profile");
const disabledTab = ref("available");
const dynamicTab = ref("dynamic1");

// Sample data
const sampleUsers = ref([
	{ id: 1, name: "John Doe", email: "john@example.com", active: true },
	{ id: 2, name: "Jane Smith", email: "jane@example.com", active: true },
	{ id: 3, name: "Bob Johnson", email: "bob@example.com", active: false },
	{ id: 4, name: "Alice Brown", email: "alice@example.com", active: true }
]);

const tabSettings = ref({
	emailNotifications: true,
	darkMode: false,
	companyName: "My Company",
	timezone: "UTC"
});

const timezones = ref([
	{ label: "UTC", value: "UTC" },
	{ label: "EST (UTC-5)", value: "EST" },
	{ label: "PST (UTC-8)", value: "PST" },
	{ label: "CET (UTC+1)", value: "CET" },
	{ label: "JST (UTC+9)", value: "JST" }
]);

// Dynamic tabs
const dynamicTabs = ref([
	{ id: 1, label: "Dynamic Tab 1", value: "dynamic1", content: "This is the content of the first dynamic tab." },
	{ id: 2, label: "Dynamic Tab 2", value: "dynamic2", content: "This is the content of the second dynamic tab." }
]);

let nextTabId = 3;

// Methods
const addTab = () => {
	const newTab = {
		id: nextTabId,
		label: `Dynamic Tab ${nextTabId}`,
		value: `dynamic${nextTabId}`,
		content: `This is the content of dynamic tab ${nextTabId}. It was created dynamically.`
	};
	
	dynamicTabs.value.push(newTab);
	dynamicTab.value = newTab.value;
	nextTabId++;
};

const removeTab = () => {
	if (dynamicTabs.value.length > 0) {
		const removedTab = dynamicTabs.value.pop();
		
		// If the active tab was removed, switch to the last available tab
		if (dynamicTab.value === removedTab?.value) {
			if (dynamicTabs.value.length > 0) {
				dynamicTab.value = dynamicTabs.value[dynamicTabs.value.length - 1].value;
			} else {
				dynamicTab.value = "";
			}
		}
	}
};

const removeSpecificTab = (tabId: number) => {
	const index = dynamicTabs.value.findIndex(tab => tab.id === tabId);
	if (index > -1) {
		const removedTab = dynamicTabs.value[index];
		dynamicTabs.value.splice(index, 1);
		
		// If the active tab was removed, switch to the first available tab
		if (dynamicTab.value === removedTab.value) {
			if (dynamicTabs.value.length > 0) {
				dynamicTab.value = dynamicTabs.value[0].value;
			} else {
				dynamicTab.value = "";
			}
		}
	}
};
</script>
