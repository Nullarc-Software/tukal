<template>
	<div class="showcase-component">
		<h3>Switch:</h3>
		<hr />
		
		<!-- Basic Switch -->
		<div style="margin: 20px 0;">
			<h4>Basic Switch:</h4>
			<div style="display: flex; gap: 20px; align-items: center;">
				<TuSwitch v-model="basicSwitch" />
				<span>Switch is {{ basicSwitch ? 'ON' : 'OFF' }}</span>
			</div>
		</div>

		<!-- Different Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
				<div>
					<TuSwitch v-model="colorSwitch1" color="primary" />
					<p>Primary</p>
				</div>
				<div>
					<TuSwitch v-model="colorSwitch2" color="success" />
					<p>Success</p>
				</div>
				<div>
					<TuSwitch v-model="colorSwitch3" color="danger" />
					<p>Danger</p>
				</div>
				<div>
					<TuSwitch v-model="colorSwitch4" color="warn" />
					<p>Warning</p>
				</div>
				<div>
					<TuSwitch v-model="colorSwitch5" color="dark" />
					<p>Dark</p>
				</div>
			</div>
		</div>

		<!-- With Text -->
		<div style="margin: 20px 0;">
			<h4>With Text:</h4>
			<div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
				<TuSwitch v-model="textSwitch1" text="Enabled" />
				<TuSwitch v-model="textSwitch2" text="Active" color="success" />
				<TuSwitch v-model="textSwitch3" text="Visible" color="primary" />
			</div>
		</div>

		<!-- Different Sizes -->
		<div style="margin: 20px 0;">
			<h4>Different Sizes:</h4>
			<div style="display: flex; gap: 20px; align-items: center;">
				<div>
					<TuSwitch v-model="sizeSwitch1" size="small" />
					<p>Small</p>
				</div>
				<div>
					<TuSwitch v-model="sizeSwitch2" />
					<p>Default</p>
				</div>
				<div>
					<TuSwitch v-model="sizeSwitch3" size="large" />
					<p>Large</p>
				</div>
			</div>
		</div>

		<!-- Disabled -->
		<div style="margin: 20px 0;">
			<h4>Disabled:</h4>
			<div style="display: flex; gap: 20px; align-items: center;">
				<TuSwitch v-model="disabledSwitch1" disabled />
				<span>Disabled OFF</span>
				<TuSwitch v-model="disabledSwitch2" disabled />
				<span>Disabled ON</span>
			</div>
		</div>

		<!-- Loading -->
		<div style="margin: 20px 0;">
			<h4>Loading:</h4>
			<div style="display: flex; gap: 20px; align-items: center;">
				<TuSwitch v-model="loadingSwitch" loading />
				<span>Loading state</span>
			</div>
		</div>

		<!-- Settings Panel Example -->
		<div style="margin: 20px 0;">
			<h4>Settings Panel Example:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>User Preferences</h5>
				<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
					<span>Email Notifications</span>
					<TuSwitch v-model="settings.emailNotifications" color="primary" />
				</div>
				<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
					<span>Push Notifications</span>
					<TuSwitch v-model="settings.pushNotifications" color="primary" />
				</div>
				<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
					<span>Dark Mode</span>
					<TuSwitch v-model="settings.darkMode" color="dark" />
				</div>
				<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
					<span>Auto-save</span>
					<TuSwitch v-model="settings.autoSave" color="success" />
				</div>
				<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
					<span>Marketing Emails</span>
					<TuSwitch v-model="settings.marketingEmails" color="warn" />
				</div>
			</div>
		</div>

		<!-- Form Integration -->
		<div style="margin: 20px 0;">
			<h4>Form Integration:</h4>
			<div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
				<h5>Account Settings</h5>
				<div style="margin: 15px 0;">
					<label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
						<span>Two-Factor Authentication</span>
						<TuSwitch v-model="accountSettings.twoFactor" color="success" @change="onTwoFactorChange" />
					</label>
					<p v-if="accountSettings.twoFactor" style="font-size: 12px; color: #666; margin-top: 5px;">
						Enhanced security is enabled
					</p>
				</div>
				<div style="margin: 15px 0;">
					<label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
						<span>Public Profile</span>
						<TuSwitch v-model="accountSettings.publicProfile" color="primary" />
					</label>
				</div>
				<div style="margin: 15px 0;">
					<label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
						<span>Allow Messages from Strangers</span>
						<TuSwitch v-model="accountSettings.allowMessages" color="warn" />
					</label>
				</div>
				<div style="margin: 15px 0;">
					<label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
						<span>Show Online Status</span>
						<TuSwitch v-model="accountSettings.showOnlineStatus" color="success" />
					</label>
				</div>
			</div>
		</div>

		<!-- Toggle Groups -->
		<div style="margin: 20px 0;">
			<h4>Toggle Groups:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
				<div>
					<h5>Features</h5>
					<div v-for="feature in features" :key="feature.id" style="margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
						<span>{{ feature.name }}</span>
						<TuSwitch v-model="feature.enabled" :color="feature.color" @change="onFeatureToggle(feature)" />
					</div>
				</div>
				<div>
					<h5>Permissions</h5>
					<div v-for="permission in permissions" :key="permission.id" style="margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
						<span>{{ permission.name }}</span>
						<TuSwitch v-model="permission.granted" color="primary" />
					</div>
				</div>
			</div>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic:</strong> {{ basicSwitch }}</p>
				<p><strong>Settings:</strong> {{ JSON.stringify(settings, null, 2) }}</p>
				<p><strong>Account:</strong> {{ JSON.stringify(accountSettings, null, 2) }}</p>
				<p><strong>Enabled Features:</strong> {{ features.filter(f => f.enabled).map(f => f.name).join(', ') || 'None' }}</p>
				<p><strong>Granted Permissions:</strong> {{ permissions.filter(p => p.granted).map(p => p.name).join(', ') || 'None' }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import TuSwitch from "../components/tuSwitch";
// Basic switches
const basicSwitch = ref(false);

// Color switches
const colorSwitch1 = ref(true);
const colorSwitch2 = ref(false);
const colorSwitch3 = ref(true);
const colorSwitch4 = ref(false);
const colorSwitch5 = ref(true);

// Text switches
const textSwitch1 = ref(false);
const textSwitch2 = ref(true);
const textSwitch3 = ref(false);

// Size switches
const sizeSwitch1 = ref(false);
const sizeSwitch2 = ref(true);
const sizeSwitch3 = ref(false);

// Disabled switches
const disabledSwitch1 = ref(false);
const disabledSwitch2 = ref(true);

// Loading switch
const loadingSwitch = ref(false);

// Settings
const settings = ref({
	emailNotifications: true,
	pushNotifications: false,
	darkMode: false,
	autoSave: true,
	marketingEmails: false
});

// Account settings
const accountSettings = ref({
	twoFactor: false,
	publicProfile: true,
	allowMessages: false,
	showOnlineStatus: true
});

// Features
const features = ref([
	{ id: 1, name: "Advanced Analytics", enabled: true, color: "primary" },
	{ id: 2, name: "Real-time Sync", enabled: false, color: "success" },
	{ id: 3, name: "AI Assistant", enabled: true, color: "warn" },
	{ id: 4, name: "Beta Features", enabled: false, color: "danger" }
]);

// Permissions
const permissions = ref([
	{ id: 1, name: "Read Access", granted: true },
	{ id: 2, name: "Write Access", granted: true },
	{ id: 3, name: "Delete Access", granted: false },
	{ id: 4, name: "Admin Access", granted: false },
	{ id: 5, name: "Export Data", granted: true }
]);

// Methods
const onTwoFactorChange = (value: boolean) => {
	if (value) {
		alert("Two-factor authentication enabled. Please check your email for setup instructions.");
	} else {
		alert("Two-factor authentication disabled. Your account is less secure.");
	}
};

const onFeatureToggle = (feature: any) => {
	console.log(`Feature ${feature.name} is now ${feature.enabled ? 'enabled' : 'disabled'}`);
};
</script>
