<template>
	<div class="showcase-component">
		<h3>Collapse:</h3>
		<hr />
		
		<!-- Basic Collapse -->
		<div style="margin: 20px 0;">
			<h4>Basic Collapse:</h4>
			<TuCollapse>
				<TuCollapseItem title="What is Vue.js?" value="vue">
					Vue.js is a progressive JavaScript framework for building user interfaces. It's designed to be incrementally adoptable, meaning you can use as much or as little of Vue as you need.
				</TuCollapseItem>
				<TuCollapseItem title="What makes Vue special?" value="special">
					Vue combines the best of React and Angular while being easier to learn. It offers reactive data binding, component-based architecture, and excellent performance.
				</TuCollapseItem>
				<TuCollapseItem title="How do I get started?" value="start">
					You can start with Vue by including it via CDN, using Vue CLI, or Vite. The official documentation provides excellent tutorials and guides.
				</TuCollapseItem>
			</TuCollapse>
		</div>

		<!-- Accordion Mode -->
		<div style="margin: 20px 0;">
			<h4>Accordion Mode (Only one open at a time):</h4>
			<TuCollapse v-model="accordionValue" accordion>
				<TuCollapseItem title="Project Setup" value="setup">
					<div style="padding: 10px;">
						<h5>Prerequisites:</h5>
						<ul>
							<li>Node.js 16.0 or higher</li>
							<li>npm or yarn package manager</li>
							<li>Git for version control</li>
						</ul>
						<h5>Installation:</h5>
						<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">npm create vue@latest my-project</pre>
					</div>
				</TuCollapseItem>
				<TuCollapseItem title="Configuration" value="config">
					<div style="padding: 10px;">
						<h5>Environment Variables:</h5>
						<p>Create a <code>.env</code> file in your project root:</p>
						<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My Vue App</pre>
					</div>
				</TuCollapseItem>
				<TuCollapseItem title="Deployment" value="deploy">
					<div style="padding: 10px;">
						<h5>Build for Production:</h5>
						<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">npm run build</pre>
						<p>This creates a <code>dist</code> folder with optimized files ready for deployment.</p>
					</div>
				</TuCollapseItem>
			</TuCollapse>
			<p style="margin-top: 10px; font-size: 12px; color: #666;">
				Current accordion value: {{ accordionValue }}
			</p>
		</div>

		<!-- With Icons -->
		<div style="margin: 20px 0;">
			<h4>With Icons:</h4>
			<TuCollapse>
				<TuCollapseItem title="User Management" value="users">
					<template #icon>
						<tu-icon>people</tu-icon>
					</template>
					<div style="padding: 15px;">
						<h5>👥 User Administration</h5>
						<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px;">
							<div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
								<h6>Total Users</h6>
								<div style="font-size: 24px; font-weight: bold; color: #007bff;">1,234</div>
							</div>
							<div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
								<h6>Active Today</h6>
								<div style="font-size: 24px; font-weight: bold; color: #28a745;">89</div>
							</div>
							<div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
								<h6>New This Week</h6>
								<div style="font-size: 24px; font-weight: bold; color: #ffc107;">12</div>
							</div>
						</div>
					</div>
				</TuCollapseItem>
				<TuCollapseItem title="System Settings" value="settings">
					<template #icon>
						<tu-icon>settings</tu-icon>
					</template>
					<div style="padding: 15px;">
						<h5>⚙️ System Configuration</h5>
						<div style="margin-top: 15px;">
							<div style="margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
								<span>Maintenance Mode</span>
								<TuSwitch v-model="systemSettings.maintenanceMode" />
							</div>
							<div style="margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
								<span>Debug Logging</span>
								<TuSwitch v-model="systemSettings.debugLogging" />
							</div>
							<div style="margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
								<span>Auto Backup</span>
								<TuSwitch v-model="systemSettings.autoBackup" />
							</div>
						</div>
					</div>
				</TuCollapseItem>
				<TuCollapseItem title="Analytics" value="analytics">
					<template #icon>
						<tu-icon>analytics</tu-icon>
					</template>
					<div style="padding: 15px;">
						<h5>📊 Performance Metrics</h5>
						<div style="margin-top: 15px;">
							<TuUsageBar :value="75" label="CPU Usage" color="primary" />
							<TuUsageBar :value="60" label="Memory Usage" color="success" style="margin-top: 10px;" />
							<TuUsageBar :value="90" label="Disk Usage" color="warning" style="margin-top: 10px;" />
						</div>
					</div>
				</TuCollapseItem>
			</TuCollapse>
		</div>

		<!-- FAQ Section -->
		<div style="margin: 20px 0;">
			<h4>FAQ Section:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>Frequently Asked Questions</h5>
				<TuCollapse>
					<TuCollapseItem v-for="faq in faqs" :key="faq.id" :title="faq.question" :value="faq.id.toString()">
						<div style="padding: 15px; line-height: 1.6;">
							{{ faq.answer }}
							<div v-if="faq.helpful !== undefined" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
								<span style="font-size: 14px; color: #666;">Was this helpful?</span>
								<div style="margin-top: 8px;">
									<TuButton @click="markHelpful(faq.id, true)" size="xs" :color="faq.helpful === true ? 'success' : 'primary'">
										👍 Yes
									</TuButton>
									<TuButton @click="markHelpful(faq.id, false)" size="xs" :color="faq.helpful === false ? 'danger' : 'primary'" style="margin-left: 8px;">
										👎 No
									</TuButton>
								</div>
							</div>
						</div>
					</TuCollapseItem>
				</TuCollapse>
			</div>
		</div>

		<!-- Interactive Form Sections -->
		<div style="margin: 20px 0;">
			<h4>Form Sections:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
				<h5>User Registration Form</h5>
				<TuCollapse v-model="formSections">
					<TuCollapseItem title="Personal Information" value="personal">
						<div style="padding: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
							<TuInput v-model="userForm.firstName" label="First Name" />
							<TuInput v-model="userForm.lastName" label="Last Name" />
							<TuInput v-model="userForm.email" label="Email" type="email" />
							<TuInput v-model="userForm.phone" label="Phone Number" />
						</div>
					</TuCollapseItem>
					<TuCollapseItem title="Account Details" value="account">
						<div style="padding: 15px;">
							<TuInput v-model="userForm.username" label="Username" style="margin-bottom: 15px;" />
							<TuInput v-model="userForm.password" label="Password" type="password" style="margin-bottom: 15px;" />
							<TuInput v-model="userForm.confirmPassword" label="Confirm Password" type="password" style="margin-bottom: 15px;" />
							<TuSelect v-model="userForm.role" label="Role" :select-items="roleOptions" />
						</div>
					</TuCollapseItem>
					<TuCollapseItem title="Preferences" value="preferences">
						<div style="padding: 15px;">
							<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
								<span>Email Notifications</span>
								<TuSwitch v-model="userForm.emailNotifications" />
							</div>
							<div style="margin: 15px 0; display: flex; justify-content: space-between; align-items: center;">
								<span>SMS Notifications</span>
								<TuSwitch v-model="userForm.smsNotifications" />
							</div>
							<TuSelect v-model="userForm.language" label="Preferred Language" :select-items="languageOptions" />
							<TuSelect v-model="userForm.timezone" label="Timezone" :select-items="timezoneOptions" style="margin-top: 15px;" />
						</div>
					</TuCollapseItem>
				</TuCollapse>
				<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6;">
					<TuButton @click="submitForm" color="primary">Submit Registration</TuButton>
					<TuButton @click="resetForm" style="margin-left: 10px;">Reset Form</TuButton>
				</div>
			</div>
		</div>

		<!-- Dynamic Collapse -->
		<div style="margin: 20px 0;">
			<h4>Dynamic Collapse:</h4>
			<div style="margin-bottom: 15px;">
				<TuInput v-model="newSectionTitle" placeholder="Section title" style="margin-right: 10px;" />
				<TuButton @click="addSection" :disabled="!newSectionTitle.trim()">Add Section</TuButton>
			</div>
			<TuCollapse>
				<TuCollapseItem v-for="section in dynamicSections" :key="section.id" :title="section.title" :value="section.id.toString()">
					<div style="padding: 15px;">
						<p>{{ section.content }}</p>
						<div style="margin-top: 10px;">
							<TuButton @click="editSection(section)" size="sm">Edit</TuButton>
							<TuButton @click="removeSection(section.id)" size="sm" color="danger" style="margin-left: 10px;">Remove</TuButton>
						</div>
					</div>
				</TuCollapseItem>
			</TuCollapse>
			<p v-if="dynamicSections.length === 0" style="text-align: center; color: #666; padding: 40px;">
				No sections yet. Add some above!
			</p>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Accordion Value:</strong> {{ accordionValue }}</p>
				<p><strong>Form Sections Open:</strong> {{ formSections.join(', ') || 'None' }}</p>
				<p><strong>System Settings:</strong></p>
				<ul style="margin-left: 20px;">
					<li>Maintenance Mode: {{ systemSettings.maintenanceMode }}</li>
					<li>Debug Logging: {{ systemSettings.debugLogging }}</li>
					<li>Auto Backup: {{ systemSettings.autoBackup }}</li>
				</ul>
				<p><strong>Dynamic Sections:</strong> {{ dynamicSections.length }}</p>
				<p><strong>FAQ Helpful Responses:</strong> {{ faqs.filter(f => f.helpful === true).length }} positive, {{ faqs.filter(f => f.helpful === false).length }} negative</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { TuUsageBar } from "../components/tuUsageBar";
import { TuButton } from "../components/tuButton";
import { TuCollapse } from "../components/tuCollapse";
import { TuCollapseItem } from "../components/tuCollapse";

import { TuInput } from "../components/tuInput";
import { TuSwitch } from "../components/tuSwitch";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Accordion model
const accordionValue = ref("setup");

// Form sections
const formSections = ref(["personal"]);

// System settings
const systemSettings = ref({
	maintenanceMode: false,
	debugLogging: true,
	autoBackup: true
});

// User form
const userForm = ref({
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	username: "",
	password: "",
	confirmPassword: "",
	role: "",
	emailNotifications: true,
	smsNotifications: false,
	language: "en",
	timezone: "UTC"
});

// Form options
const roleOptions = ref([
	{ label: "Administrator", value: "admin" },
	{ label: "Editor", value: "editor" },
	{ label: "Viewer", value: "viewer" },
	{ label: "Guest", value: "guest" }
]);

const languageOptions = ref([
	{ label: "English", value: "en" },
	{ label: "Spanish", value: "es" },
	{ label: "French", value: "fr" },
	{ label: "German", value: "de" },
	{ label: "Chinese", value: "zh" }
]);

const timezoneOptions = ref([
	{ label: "UTC", value: "UTC" },
	{ label: "EST (UTC-5)", value: "EST" },
	{ label: "PST (UTC-8)", value: "PST" },
	{ label: "CET (UTC+1)", value: "CET" },
	{ label: "JST (UTC+9)", value: "JST" }
]);

// FAQ data
const faqs = ref([
	{
		id: 1,
		question: "How do I reset my password?",
		answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
		helpful: undefined
	},
	{
		id: 2,
		question: "Can I change my username?",
		answer: "Yes, you can change your username in your account settings. Go to Profile > Account Settings > Username. Note that this action can only be performed once every 30 days.",
		helpful: undefined
	},
	{
		id: 3,
		question: "How do I delete my account?",
		answer: "To delete your account, go to Settings > Account > Delete Account. This action is permanent and cannot be undone. All your data will be permanently removed.",
		helpful: undefined
	},
	{
		id: 4,
		question: "Is my data secure?",
		answer: "Yes, we use industry-standard encryption and security measures to protect your data. All data is encrypted in transit and at rest, and we regularly conduct security audits.",
		helpful: undefined
	}
]);

// Dynamic sections
const dynamicSections = ref([
	{
		id: 1,
		title: "Welcome Section",
		content: "This is a dynamically created section. You can add, edit, or remove sections as needed."
	},
	{
		id: 2,
		title: "Getting Started",
		content: "Here's some helpful information to get you started with the application."
	}
]);

const newSectionTitle = ref("");
let nextSectionId = 3;

// Methods
const markHelpful = (faqId: number, helpful: boolean) => {
	const faq = faqs.value.find(f => f.id === faqId);
	if (faq) {
		faq.helpful = helpful;
	}
};

const submitForm = () => {
	console.log("Form submitted:", userForm.value);
	alert("Registration form submitted successfully!");
};

const resetForm = () => {
	userForm.value = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		username: "",
		password: "",
		confirmPassword: "",
		role: "",
		emailNotifications: true,
		smsNotifications: false,
		language: "en",
		timezone: "UTC"
	};
	formSections.value = ["personal"];
};

const addSection = () => {
	if (newSectionTitle.value.trim()) {
		const newSection = {
			id: nextSectionId++,
			title: newSectionTitle.value.trim(),
			content: `This is the content for "${newSectionTitle.value.trim()}". You can edit this content or add more details as needed.`
		};
		
		dynamicSections.value.push(newSection);
		newSectionTitle.value = "";
	}
};

const editSection = (section: any) => {
	const newTitle = prompt("Edit section title:", section.title);
	if (newTitle !== null && newTitle.trim()) {
		section.title = newTitle.trim();
	}
	
	const newContent = prompt("Edit section content:", section.content);
	if (newContent !== null && newContent.trim()) {
		section.content = newContent.trim();
	}
};

const removeSection = (sectionId: number) => {
	const index = dynamicSections.value.findIndex(s => s.id === sectionId);
	if (index > -1) {
		dynamicSections.value.splice(index, 1);
	}
};
</script>
