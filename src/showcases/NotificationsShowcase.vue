<template>
	<div class="showcase-component">
		<h3>Notifications:</h3>
		<hr />
		
		<!-- Basic Notifications -->
		<div style="margin: 20px 0;">
			<h4>Basic Notifications:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showBasicNotification('success')" color="success">Success</TuButton>
				<TuButton @click="showBasicNotification('info')" color="primary">Info</TuButton>
				<TuButton @click="showBasicNotification('warning')" color="warning">Warning</TuButton>
				<TuButton @click="showBasicNotification('error')" color="danger">Error</TuButton>
				<TuButton @click="showBasicNotification('default')">Default</TuButton>
			</div>
		</div>

		<!-- Notification with Actions -->
		<div style="margin: 20px 0;">
			<h4>With Actions:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showActionNotification" color="primary">With Action Button</TuButton>
				<TuButton @click="showUndoNotification" color="warning">With Undo</TuButton>
				<TuButton @click="showMultiActionNotification" color="info">Multiple Actions</TuButton>
			</div>
		</div>

		<!-- Persistent Notifications -->
		<div style="margin: 20px 0;">
			<h4>Persistent Notifications:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showPersistentNotification" color="danger">Persistent Error</TuButton>
				<TuButton @click="showStickyNotification" color="warning">Sticky Warning</TuButton>
				<TuButton @click="showProgressNotification" color="primary">With Progress</TuButton>
				<TuButton @click="clearAllNotifications" color="secondary">Clear All</TuButton>
			</div>
		</div>

		<!-- Rich Content Notifications -->
		<div style="margin: 20px 0;">
			<h4>Rich Content:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showRichNotification" color="primary">Rich Content</TuButton>
				<TuButton @click="showFormNotification" color="success">With Form</TuButton>
				<TuButton @click="showImageNotification" color="info">With Image</TuButton>
				<TuButton @click="showListNotification" color="warning">With List</TuButton>
			</div>
		</div>

		<!-- Position Variants -->
		<div style="margin: 20px 0;">
			<h4>Position Variants:</h4>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
				<TuButton @click="showPositionedNotification('top-right')" size="sm">Top Right</TuButton>
				<TuButton @click="showPositionedNotification('top-left')" size="sm">Top Left</TuButton>
				<TuButton @click="showPositionedNotification('top-center')" size="sm">Top Center</TuButton>
				<TuButton @click="showPositionedNotification('bottom-right')" size="sm">Bottom Right</TuButton>
				<TuButton @click="showPositionedNotification('bottom-left')" size="sm">Bottom Left</TuButton>
				<TuButton @click="showPositionedNotification('bottom-center')" size="sm">Bottom Center</TuButton>
			</div>
		</div>

		<!-- System Notifications -->
		<div style="margin: 20px 0;">
			<h4>System Notifications:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>Application Events</h5>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 15px;">
					<TuButton @click="simulateUserLogin" color="success" size="sm">User Login</TuButton>
					<TuButton @click="simulateFileUpload" color="primary" size="sm">File Upload</TuButton>
					<TuButton @click="simulateSystemError" color="danger" size="sm">System Error</TuButton>
					<TuButton @click="simulateMaintenanceMode" color="warning" size="sm">Maintenance</TuButton>
					<TuButton @click="simulateNewMessage" color="info" size="sm">New Message</TuButton>
					<TuButton @click="simulatePaymentSuccess" color="success" size="sm">Payment Success</TuButton>
				</div>
			</div>
		</div>

		<!-- Notification Center -->
		<div style="margin: 20px 0;">
			<h4>Notification Center:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: white;">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
					<h5>Recent Notifications</h5>
					<div style="display: flex; gap: 10px;">
						<TuButton @click="markAllAsRead" size="sm" :disabled="unreadCount === 0">
							Mark All Read ({{ unreadCount }})
						</TuButton>
						<TuButton @click="clearNotificationHistory" size="sm" color="danger">
							Clear History
						</TuButton>
					</div>
				</div>
				
				<div v-if="notificationHistory.length === 0" style="text-align: center; color: #666; padding: 40px;">
					<tu-icon style="font-size: 48px; margin-bottom: 10px;">notifications_none</tu-icon>
					<p>No notifications yet</p>
				</div>
				
				<div v-else>
					<div 
						v-for="notification in notificationHistory" 
						:key="notification.id"
						style="border-bottom: 1px solid #f0f0f0; padding: 12px 0; display: flex; align-items: flex-start; gap: 12px;"
						:class="{ 'unread-notification': !notification.read }"
					>
						<div class="notification-icon" :class="`icon-${notification.type}`">
							<tu-icon>{{ getNotificationIcon(notification.type) }}</tu-icon>
						</div>
						
						<div style="flex: 1;">
							<div style="display: flex; justify-content: space-between; align-items: flex-start;">
								<div>
									<h6 style="margin: 0 0 4px 0; font-weight: 600;">{{ notification.title }}</h6>
									<p style="margin: 0; color: #666; font-size: 14px;">{{ notification.message }}</p>
								</div>
								<div style="display: flex; flex-direction: column; align-items: flex-end; gap: 5px;">
									<span style="font-size: 12px; color: #999;">{{ formatTimestamp(notification.timestamp) }}</span>
									<TuButton 
										v-if="!notification.read"
										@click="markAsRead(notification.id)"
										size="xs"
									>
										Mark Read
									</TuButton>
								</div>
							</div>
							
							<div v-if="notification.actions && notification.actions.length > 0" style="margin-top: 8px;">
								<TuButton 
									v-for="action in notification.actions"
									:key="action.label"
									@click="executeNotificationAction(action)"
									size="xs"
									:color="action.color || 'primary'"
									style="margin-right: 8px;"
								>
									{{ action.label }}
								</TuButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Notification Settings -->
		<div style="margin: 20px 0;">
			<h4>Notification Settings:</h4>
			<div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #f8f9fa;">
				<h5>Preferences</h5>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 15px;">
					<div>
						<h6>Position</h6>
						<TuSelect v-model="notificationSettings.position" :select-items="positionOptions" />
					</div>
					
					<div>
						<h6>Duration (seconds)</h6>
						<TuInput v-model="notificationSettings.duration" type="number" min="1" max="30" />
					</div>
					
					<div>
						<h6>Max Visible</h6>
						<TuInput v-model="notificationSettings.maxVisible" type="number" min="1" max="10" />
					</div>
				</div>
				
				<div style="margin-top: 20px;">
					<h6>Notification Types</h6>
					<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px;">
						<label style="display: flex; align-items: center; gap: 10px;">
							<input type="checkbox" v-model="notificationSettings.enableSuccess" />
							<span>Success Messages</span>
						</label>
						<label style="display: flex; align-items: center; gap: 10px;">
							<input type="checkbox" v-model="notificationSettings.enableInfo" />
							<span>Info Messages</span>
						</label>
						<label style="display: flex; align-items: center; gap: 10px;">
							<input type="checkbox" v-model="notificationSettings.enableWarning" />
							<span>Warning Messages</span>
						</label>
						<label style="display: flex; align-items: center; gap: 10px;">
							<input type="checkbox" v-model="notificationSettings.enableError" />
							<span>Error Messages</span>
						</label>
						<label style="display: flex; align-items: center; gap: 10px;">
							<input type="checkbox" v-model="notificationSettings.enableSound" />
							<span>Sound Effects</span>
						</label>
						<label style="display: flex; align-items: center; gap: 10px;">
							<input type="checkbox" v-model="notificationSettings.enableAnimation" />
							<span>Animations</span>
						</label>
					</div>
				</div>
				
				<div style="margin-top: 20px;">
					<TuButton @click="saveNotificationSettings" color="primary">Save Settings</TuButton>
					<TuButton @click="resetNotificationSettings" style="margin-left: 10px;">Reset to Default</TuButton>
					<TuButton @click="testNotificationSettings" color="success" style="margin-left: 10px;">Test Settings</TuButton>
				</div>
			</div>
		</div>

		<!-- Current Statistics -->
		<div style="margin: 20px 0;">
			<h4>Statistics:</h4>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
				<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
					<div style="font-size: 24px; font-weight: bold; color: #007bff;">{{ notificationHistory.length }}</div>
					<div style="font-size: 14px; color: #666;">Total Notifications</div>
				</div>
				
				<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
					<div style="font-size: 24px; font-weight: bold; color: #28a745;">{{ readCount }}</div>
					<div style="font-size: 14px; color: #666;">Read</div>
				</div>
				
				<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
					<div style="font-size: 24px; font-weight: bold; color: #ffc107;">{{ unreadCount }}</div>
					<div style="font-size: 14px; color: #666;">Unread</div>
				</div>
				
				<div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; text-align: center;">
					<div style="font-size: 24px; font-weight: bold; color: #17a2b8;">{{ notificationsToday }}</div>
					<div style="font-size: 14px; color: #666;">Today</div>
				</div>
			</div>
		</div>

		<!-- Current Settings -->
		<div style="margin: 20px 0;">
			<h4>Current Settings:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Position:</strong> {{ notificationSettings.position }}</p>
				<p><strong>Duration:</strong> {{ notificationSettings.duration }} seconds</p>
				<p><strong>Max Visible:</strong> {{ notificationSettings.maxVisible }}</p>
				<p><strong>Success Enabled:</strong> {{ notificationSettings.enableSuccess }}</p>
				<p><strong>Sound Enabled:</strong> {{ notificationSettings.enableSound }}</p>
				<p><strong>Animation Enabled:</strong> {{ notificationSettings.enableAnimation }}</p>
				<p><strong>Unread Count:</strong> {{ unreadCount }}</p>
				<p><strong>Last Notification:</strong> {{ lastNotificationTime || 'None' }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { tuButton as TuButton } from "../components/tuButton";
import TuInput from "../components/tuInput";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Notification history
const notificationHistory = ref([
	{
		id: 1,
		type: "success",
		title: "Welcome!",
		message: "Your account has been successfully created.",
		timestamp: Date.now() - 3600000,
		read: false,
		actions: [
			{ label: "View Profile", action: "viewProfile", color: "primary" }
		]
	},
	{
		id: 2,
		type: "info",
		title: "System Update",
		message: "A new version is available. Update now?",
		timestamp: Date.now() - 7200000,
		read: true,
		actions: [
			{ label: "Update", action: "update", color: "primary" },
			{ label: "Later", action: "later", color: "secondary" }
		]
	}
]);

// Notification settings
const notificationSettings = ref({
	position: "top-right",
	duration: 5,
	maxVisible: 5,
	enableSuccess: true,
	enableInfo: true,
	enableWarning: true,
	enableError: true,
	enableSound: false,
	enableAnimation: true
});

// Position options
const positionOptions = ref([
	{ label: "Top Right", value: "top-right" },
	{ label: "Top Left", value: "top-left" },
	{ label: "Top Center", value: "top-center" },
	{ label: "Bottom Right", value: "bottom-right" },
	{ label: "Bottom Left", value: "bottom-left" },
	{ label: "Bottom Center", value: "bottom-center" }
]);

// State
const lastNotificationTime = ref("");
let notificationIdCounter = 100;

// Computed properties
const unreadCount = computed(() => {
	return notificationHistory.value.filter(n => !n.read).length;
});

const readCount = computed(() => {
	return notificationHistory.value.filter(n => n.read).length;
});

const notificationsToday = computed(() => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return notificationHistory.value.filter(n => new Date(n.timestamp) >= today).length;
});

// Methods
const showBasicNotification = (type: string) => {
	if (!notificationSettings.value[`enable${type.charAt(0).toUpperCase() + type.slice(1)}`]) {
		alert(`${type} notifications are disabled in settings`);
		return;
	}
	
	const messages = {
		success: "Operation completed successfully!",
		info: "Here's some useful information for you.",
		warning: "Please review this important warning.",
		error: "An error occurred. Please try again.",
		default: "This is a default notification message."
	};
	
	const notification = {
		id: ++notificationIdCounter,
		type,
		title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
		message: messages[type as keyof typeof messages],
		timestamp: Date.now(),
		read: false
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showActionNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "info",
		title: "File Upload Complete",
		message: "Your document has been uploaded successfully.",
		timestamp: Date.now(),
		read: false,
		actions: [
			{ label: "View File", action: "viewFile", color: "primary" },
			{ label: "Share", action: "shareFile", color: "success" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showUndoNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "warning",
		title: "Item Deleted",
		message: "The item has been moved to trash.",
		timestamp: Date.now(),
		read: false,
		actions: [
			{ label: "Undo", action: "undo", color: "warning" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showMultiActionNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "info",
		title: "New Comment",
		message: "Someone commented on your post.",
		timestamp: Date.now(),
		read: false,
		actions: [
			{ label: "Reply", action: "reply", color: "primary" },
			{ label: "View", action: "view", color: "info" },
			{ label: "Dismiss", action: "dismiss", color: "secondary" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showPersistentNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "error",
		title: "Connection Lost",
		message: "Unable to connect to server. Check your internet connection.",
		timestamp: Date.now(),
		read: false,
		persistent: true,
		actions: [
			{ label: "Retry", action: "retry", color: "danger" },
			{ label: "Go Offline", action: "offline", color: "secondary" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showStickyNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "warning",
		title: "Maintenance Mode",
		message: "System will be under maintenance in 10 minutes.",
		timestamp: Date.now(),
		read: false,
		sticky: true
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showProgressNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "info",
		title: "Processing...",
		message: "Your request is being processed.",
		timestamp: Date.now(),
		read: false,
		progress: 0
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
	
	// Simulate progress
	let progress = 0;
	const interval = setInterval(() => {
		progress += 20;
		notification.progress = progress;
		
		if (progress >= 100) {
			clearInterval(interval);
			notification.title = "Complete!";
			notification.message = "Your request has been processed successfully.";
			notification.type = "success";
		}
	}, 1000);
};

const showRichNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "info",
		title: "System Update Available",
		message: "Version 2.1.0 includes new features and bug fixes.",
		timestamp: Date.now(),
		read: false,
		richContent: {
			features: ["New dashboard layout", "Improved performance", "Bug fixes"],
			version: "2.1.0",
			size: "45.2 MB"
		},
		actions: [
			{ label: "Download", action: "download", color: "primary" },
			{ label: "Release Notes", action: "notes", color: "info" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showFormNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "warning",
		title: "Quick Feedback",
		message: "How was your experience with our new feature?",
		timestamp: Date.now(),
		read: false,
		actions: [
			{ label: "Rate 5 Stars", action: "rate5", color: "success" },
			{ label: "Rate 4 Stars", action: "rate4", color: "primary" },
			{ label: "Rate 3 Stars", action: "rate3", color: "warning" },
			{ label: "Later", action: "later", color: "secondary" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showImageNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "info",
		title: "New Profile Picture",
		message: "John Doe updated their profile picture.",
		timestamp: Date.now(),
		read: false,
		image: "/api/avatars/john-doe.jpg",
		actions: [
			{ label: "View Profile", action: "viewProfile", color: "primary" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showListNotification = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "info",
		title: "Daily Summary",
		message: "Here's what happened today:",
		timestamp: Date.now(),
		read: false,
		list: [
			"5 new users registered",
			"12 orders processed",
			"3 support tickets resolved",
			"1 system update deployed"
		],
		actions: [
			{ label: "View Dashboard", action: "dashboard", color: "primary" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const showPositionedNotification = (position: string) => {
	const notification = {
		id: ++notificationIdCounter,
		type: "info",
		title: `${position} Notification`,
		message: `This notification appears at ${position}`,
		timestamp: Date.now(),
		read: false,
		position
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const simulateUserLogin = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "success",
		title: "User Login",
		message: "User 'john.doe@example.com' logged in successfully.",
		timestamp: Date.now(),
		read: false
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const simulateFileUpload = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "success",
		title: "File Upload Complete",
		message: "document.pdf (2.5 MB) uploaded successfully.",
		timestamp: Date.now(),
		read: false,
		actions: [
			{ label: "View File", action: "viewFile", color: "primary" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const simulateSystemError = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "error",
		title: "System Error",
		message: "Database connection failed. Error code: 500",
		timestamp: Date.now(),
		read: false,
		actions: [
			{ label: "Retry", action: "retry", color: "danger" },
			{ label: "Contact Support", action: "support", color: "warning" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const simulateMaintenanceMode = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "warning",
		title: "Scheduled Maintenance",
		message: "System maintenance scheduled for tonight at 2:00 AM EST.",
		timestamp: Date.now(),
		read: false
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const simulateNewMessage = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "info",
		title: "New Message",
		message: "You have a new message from Sarah Wilson.",
		timestamp: Date.now(),
		read: false,
		actions: [
			{ label: "Reply", action: "reply", color: "primary" },
			{ label: "Mark as Read", action: "markRead", color: "secondary" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const simulatePaymentSuccess = () => {
	const notification = {
		id: ++notificationIdCounter,
		type: "success",
		title: "Payment Successful",
		message: "Payment of $49.99 processed successfully.",
		timestamp: Date.now(),
		read: false,
		actions: [
			{ label: "View Receipt", action: "receipt", color: "primary" }
		]
	};
	
	addNotificationToHistory(notification);
	showNotificationToast(notification);
};

const clearAllNotifications = () => {
	if (confirm("Clear all active notifications?")) {
		// This would clear the UI notifications, not the history
		alert("All active notifications cleared");
	}
};

const addNotificationToHistory = (notification: any) => {
	notificationHistory.value.unshift(notification);
	lastNotificationTime.value = new Date().toLocaleTimeString();
};

const showNotificationToast = (notification: any) => {
	// This would trigger the actual notification component
	console.log("Showing notification:", notification);
	alert(`Notification: ${notification.title}\n${notification.message}`);
};

const markAsRead = (notificationId: number) => {
	const notification = notificationHistory.value.find(n => n.id === notificationId);
	if (notification) {
		notification.read = true;
	}
};

const markAllAsRead = () => {
	notificationHistory.value.forEach(n => n.read = true);
};

const clearNotificationHistory = () => {
	if (confirm("Clear all notification history? This cannot be undone.")) {
		notificationHistory.value = [];
		lastNotificationTime.value = "";
	}
};

const executeNotificationAction = (action: any) => {
	console.log("Executing action:", action);
	alert(`Action executed: ${action.label}`);
};

const getNotificationIcon = (type: string): string => {
	const icons = {
		success: "check_circle",
		info: "info",
		warning: "warning",
		error: "error",
		default: "notifications"
	};
	return icons[type as keyof typeof icons] || "notifications";
};

const formatTimestamp = (timestamp: number): string => {
	const now = new Date();
	const notificationDate = new Date(timestamp);
	const diffInMinutes = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60));
	
	if (diffInMinutes < 1) return "Just now";
	if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
	if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
	return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

const saveNotificationSettings = () => {
	// Save settings to localStorage or API
	localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings.value));
	showBasicNotification("success");
};

const resetNotificationSettings = () => {
	notificationSettings.value = {
		position: "top-right",
		duration: 5,
		maxVisible: 5,
		enableSuccess: true,
		enableInfo: true,
		enableWarning: true,
		enableError: true,
		enableSound: false,
		enableAnimation: true
	};
};

const testNotificationSettings = () => {
	showBasicNotification("info");
};
</script>

<style scoped>
.unread-notification {
	background: #f8f9fa;
	border-left: 3px solid #007bff;
}

.notification-icon {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 16px;
}

.icon-success { background: #28a745; }
.icon-info { background: #17a2b8; }
.icon-warning { background: #ffc107; color: #333; }
.icon-error { background: #dc3545; }
.icon-default { background: #6c757d; }
</style>
