<template>
	<div class="showcase-component">
		<h3>Notifications:</h3>
		<hr />
		
		<!-- All TuNotificationAttributes Features Demo -->
		<div style="margin: 20px 0; padding: 20px; background: #fff3cd; border-radius: 8px;">
			<h4>🎯 Complete TuNotificationAttributes Features Demo</h4>
			<p style="margin: 5px 0;">Comprehensive demonstration of all notification properties and capabilities</p>
		</div>

		<!-- Colors & Styles -->
		<div style="margin: 20px 0;">
			<h4>🎨 Colors & Visual Styles:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showStyleVariant('success', false, false)" color="success">Success</TuButton>
				<TuButton @click="showStyleVariant('primary', false, false)" color="primary">Primary</TuButton>
				<TuButton @click="showStyleVariant('warn', false, false)" color="warn">Warning</TuButton>
				<TuButton @click="showStyleVariant('danger', false, false)" color="danger">Danger</TuButton>
				<TuButton @click="showStyleVariant('success', true, false)" color="success" flat>Flat Style</TuButton>
				<TuButton @click="showStyleVariant('primary', false, true)" color="primary">With Border</TuButton>
				<TuButton @click="showSquareNotification()" color="primary">Square Corners</TuButton>
				<TuButton @click="showCustomClassNotification()">Custom CSS</TuButton>
			</div>
		</div>

		<!-- Positions (Grid Layout) -->
		<div style="margin: 20px 0;">
			<h4>📍 Positions (Click to see animations):</h4>
			<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 600px;">
				<TuButton @click="showPositionedNotification('top-left')" size="sm">↖ Top Left</TuButton>
				<TuButton @click="showPositionedNotification('top-center')" size="sm">↑ Top Center</TuButton>
				<TuButton @click="showPositionedNotification('top-right')" size="sm">↗ Top Right</TuButton>
				<TuButton @click="showPositionedNotification('bottom-left')" size="sm">↙ Bottom Left</TuButton>
				<TuButton @click="showPositionedNotification('bottom-center')" size="sm">↓ Bottom Center</TuButton>
				<TuButton @click="showPositionedNotification('bottom-right')" size="sm">↘ Bottom Right</TuButton>
			</div>
		</div>

		<!-- Icons & Content -->
		<div style="margin: 20px 0;">
			<h4>🎭 Icons & Content:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showIconNotification('check_circle')" color="success">✓ With Icon</TuButton>
				<TuButton @click="showNoIconNotification()">Without Icon</TuButton>
				<TuButton @click="showCustomContentNotification()" color="primary">Custom Component</TuButton>
			</div>
		</div>

		<!-- Sizes & Dimensions -->
		<div style="margin: 20px 0;">
			<h4>📏 Sizes & Dimensions:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showWidthNotification('default')" color="primary">Default Width</TuButton>
				<TuButton @click="showWidthNotification('auto')" color="primary">Auto Width</TuButton>
				<TuButton @click="showWidthNotification('100%')" color="primary">Full Width</TuButton>
			</div>
		</div>

		<!-- Duration & Behavior -->
		<div style="margin: 20px 0;">
			<h4>⏱️ Duration & Behavior:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showDurationNotification(1000)" color="primary">Quick (1s)</TuButton>
				<TuButton @click="showDurationNotification(5000)" color="primary">Normal (5s)</TuButton>
				<TuButton @click="showDurationNotification(10000)" color="primary">Long (10s)</TuButton>
				<TuButton @click="showStickyNotification()" color="warn">Sticky (Manual Close)</TuButton>
				<TuButton @click="showButtonCloseNotification(false)" color="danger">No Close Button</TuButton>
			</div>
		</div>

		<!-- Progress & Loading -->
		<div style="margin: 20px 0;">
			<h4>📊 Progress & Loading States:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showProgressAutoNotification()" color="success">Auto Progress</TuButton>
				<TuButton @click="showProgressNotification()" color="primary">Manual Progress</TuButton>
				<TuButton @click="showLoadingWithTextNotification()" color="primary">Loading → Complete</TuButton>
				<TuButton @click="showLoadingNotification()" color="primary">Loading Only</TuButton>
			</div>
		</div>

		<!-- Callbacks & Events -->
		<div style="margin: 20px 0;">
			<h4>🔔 Callbacks & Events:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showClickableNotification()" color="primary">onClick Event</TuButton>
				<TuButton @click="showOnCloseCallbackNotification()" color="success">onClickClose Event</TuButton>
				<TuButton @click="showOnDestroyNotification()" color="danger">onDestroy Event</TuButton>
			</div>
		</div>

		<!-- Combined Features Demo -->
		<div style="margin: 20px 0;">
			<h4>🎪 Special Demos:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showCombinedFeaturesNotification()" color="success" size="lg">� All Features Combined</TuButton>
				<TuButton @click="showAllPositionsDemo()" color="primary">Show All Positions</TuButton>
				<TuButton @click="clearAllNotifications" color="dark">Clear All</TuButton>
			</div>
		</div>

		<hr style="margin: 40px 0; border: 2px solid #007bff;" />
		
		<!-- Additional Real-World Examples -->
		<div style="margin: 20px 0;">
			<h4>With Actions:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showActionNotification" color="primary">With Action Button</TuButton>
				<TuButton @click="showUndoNotification" color="warn">With Undo</TuButton>
				<TuButton @click="showMultiActionNotification" color="primary">Multiple Actions</TuButton>
			</div>
		</div>

		<!-- Persistent Notifications -->
		<div style="margin: 20px 0;">
			<h4>Persistent Notifications:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showPersistentNotification" color="danger">Persistent Error</TuButton>
				<TuButton @click="showStickyNotification" color="warn">Sticky Warning</TuButton>
				<TuButton @click="showProgressNotification" color="primary">With Progress</TuButton>
				<TuButton @click="clearAllNotifications" color="dark">Clear All</TuButton>
			</div>
		</div>

		<!-- Rich Content Notifications -->
		<div style="margin: 20px 0;">
			<h4>Rich Content:</h4>
			<div style="display: flex; flex-wrap: wrap; gap: 10px;">
				<TuButton @click="showRichNotification" color="primary">Rich Content</TuButton>
				<TuButton @click="showFormNotification" color="success">With Form</TuButton>
				<TuButton @click="showImageNotification" color="primary">With Image</TuButton>
				<TuButton @click="showListNotification" color="warn">With List</TuButton>
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
					<TuButton @click="simulateMaintenanceMode" color="warn" size="sm">Maintenance</TuButton>
					<TuButton @click="simulateNewMessage" color="primary" size="sm">New Message</TuButton>
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
									color="primary"
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
// ============================================================
// Imports
// ============================================================
import { ref, computed } from "vue";
import { tuButton as TuButton } from "../components/tuButton";
import TuInput from "../components/tuInput";
import TuSelect from "../components/tuSelect/tuSelect.vue";
import { TuNotification, type TuNotificationAttributes, type NotificationPosition } from "../components/tuNotifications";

// ============================================================
// Types
// ============================================================
interface NotificationHistoryItem {
	id: number;
	type: string;
	title: string;
	message: string;
	timestamp: number;
	read: boolean;
	actions?: Array<{ label: string; action: string; color: string }>;
	persistent?: boolean;
	sticky?: boolean;
	progress?: number;
	richContent?: Record<string, unknown>;
	image?: string;
	list?: string[];
	position?: string;
}

// ============================================================
// State
// ============================================================
// Notification history
const notificationHistory = ref<NotificationHistoryItem[]>([
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

// ============================================================
// Methods - New Feature Demonstrations
// ============================================================

/**
 * Combined style variant demonstration (color, flat, border)
 */
const showStyleVariant = (color: string, flat: boolean, border: boolean) => {
	const styleType = flat ? "Flat" : border ? "Bordered" : "Standard";
	new TuNotification({
		title: `${styleType} ${color.charAt(0).toUpperCase() + color.slice(1)}`,
		text: `${styleType} style notification with ${color} color`,
		color,
		flat,
		border: border ? color : undefined,
		icon: flat ? "layers" : border ? "border_color" : "star",
		duration: 4000
	});
};

/**
 * Show all 6 positions at once
 */
const showAllPositionsDemo = () => {
	const positions: NotificationPosition[] = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];
	const icons = ["↖", "↑", "↗", "↙", "↓", "↘"];
	
	positions.forEach((position, index) => {
		setTimeout(() => {
			new TuNotification({
				title: `${icons[index]} ${position.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`,
				text: "Notice the circular animation from corner!",
				color: "primary",
				position,
				duration: 5000,
				icon: "place"
			});
		}, index * 300);
	});
};

/**
 * Demonstrate icon property
 */
const showIconNotification = (icon: string) => {
	new TuNotification({
		title: "Icon Notification",
		text: `This notification uses the "${icon}" icon`,
		color: "primary",
		icon,
		duration: 4000
	});
};

/**
 * Demonstrate notification without icon
 */
const showNoIconNotification = () => {
	new TuNotification({
		title: "No Icon",
		text: "This notification has no icon",
		color: "primary",
		duration: 4000
	});
};

/**
 * Demonstrate square property (no rounded corners)
 */
const showSquareNotification = () => {
	new TuNotification({
		title: "Square Corners",
		text: "This notification has square corners instead of rounded",
		color: "primary",
		square: true,
		icon: "crop_square",
		duration: 4000
	});
};

/**
 * Demonstrate width property
 */
const showWidthNotification = (width: string) => {
	new TuNotification({
		title: "Width Variant",
		text: `This notification has width set to "${width}"`,
		color: "primary",
		width,
		icon: "width",
		duration: 4000
	});
};

/**
 * Demonstrate buttonClose property
 */
const showButtonCloseNotification = (hasCloseButton: boolean) => {
	new TuNotification({
		title: hasCloseButton ? "With Close Button" : "No Close Button",
		text: hasCloseButton 
			? "Click the X button to close" 
			: "This notification cannot be manually closed (wait 5s)",
		color: hasCloseButton ? "primary" : "danger",
		buttonClose: hasCloseButton,
		icon: hasCloseButton ? "close" : "block",
		duration: 5000
	});
};

/**
 * Demonstrate duration property
 */
const showDurationNotification = (duration: number) => {
	new TuNotification({
		title: "Duration Demo",
		text: `This notification will stay for ${duration / 1000} second(s)`,
		color: "primary",
		icon: "schedule",
		duration
	});
};

/**
 * Demonstrate progressAuto property
 */
const showProgressAutoNotification = () => {
	new TuNotification({
		title: "Auto Progress",
		text: "Watch the progress bar fill automatically",
		color: "success",
		icon: "autorenew",
		progressAuto: true,
		duration: 5000
	});
};

/**
 * Demonstrate loading property
 */
const showLoadingNotification = () => {
	new TuNotification({
		title: "Loading",
		text: "Loading state notification",
		color: "primary",
		loading: true,
		sticky: true,
		buttonClose: true
	});
};

/**
 * Demonstrate loading with completion
 */
const showLoadingWithTextNotification = () => {
	const notif = new TuNotification({
		title: "Processing...",
		text: "Please wait while we process your request",
		color: "primary",
		loading: true,
		sticky: true,
		buttonClose: false
	});
	
	// Simulate loading completion after 3 seconds
	setTimeout(() => {
		notif.close();
		new TuNotification({
			title: "Complete!",
			text: "Your request has been processed successfully",
			color: "success",
			icon: "check_circle",
			duration: 3000
		});
	}, 3000);
};

/**
 * Demonstrate onClick callback
 */
const showClickableNotification = () => {
	new TuNotification({
		title: "Clickable Notification",
		text: "Click anywhere on this notification to trigger an action",
		color: "primary",
		icon: "touch_app",
		duration: 8000,
		onClick: () => {
			alert("Notification clicked! onClick callback triggered.");
		}
	});
};

/**
 * Demonstrate onClickClose callback
 */
const showOnCloseCallbackNotification = () => {
	new TuNotification({
		title: "Close Callback Demo",
		text: "Click the X button to see the close callback in action",
		color: "success",
		icon: "close",
		duration: 10000,
		onClickClose: () => {
			console.log("Close button clicked! onClickClose callback triggered.");
			alert("Close callback executed!");
		}
	});
};

/**
 * Demonstrate onDestroy callback
 */
const showOnDestroyNotification = () => {
	new TuNotification({
		title: "Destroy Callback Demo",
		text: "This notification logs when it's destroyed (after 3 seconds)",
		color: "danger",
		icon: "delete_forever",
		duration: 3000,
		onDestroy: () => {
			console.log("Notification destroyed! onDestroy callback triggered.");
			alert("Notification was destroyed!");
		}
	});
};

/**
 * Demonstrate classNotification property (custom CSS)
 */
const showCustomClassNotification = () => {
	new TuNotification({
		title: "Custom Styled",
		text: "This notification has custom CSS classes applied",
		color: "primary",
		icon: "brush",
		classNotification: "custom-notification-style",
		duration: 5000
	});
};

/**
 * Demonstrate content property (custom component)
 */
const showCustomContentNotification = () => {
	new TuNotification({
		title: "Custom Component",
		text: "This notification contains a custom Vue component",
		color: "primary",
		icon: "widgets",
		duration: 8000,
		content: {
			component: {
				template: `
					<div style="margin-top: 10px; padding: 10px; background: rgba(0,0,0,0.05); border-radius: 8px;">
						<p style="margin: 0; font-weight: bold;">Custom Content Component</p>
						<p style="margin: 5px 0 0 0; font-size: 12px;">This is a custom Vue component rendered inside the notification!</p>
						<button style="margin-top: 8px; padding: 5px 10px; border: none; background: #007bff; color: white; border-radius: 4px; cursor: pointer;">
							Custom Action
						</button>
					</div>
				`
			}
		}
	});
};

/**
 * Demonstrate all features combined
 */
const showCombinedFeaturesNotification = () => {
	new TuNotification({
		title: "🎉 All Features Combined!",
		text: "This notification showcases multiple TuNotificationAttributes properties working together",
		color: "success",
		icon: "stars",
		border: "success",
		square: false,
		flat: false,
		sticky: false,
		buttonClose: true,
		width: "auto",
		progressAuto: true,
		duration: 10000,
		position: "top-center",
		onClick: () => {
			console.log("Combined features notification clicked!");
		},
		onClickClose: () => {
			console.log("Combined features notification closed!");
		}
	});
};

// ============================================================
// Methods - Original
// ============================================================
const showBasicNotification = (type: string) => {
	// Check if notification type is enabled
	const settingKey = `enable${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof notificationSettings.value;
	if (settingKey in notificationSettings.value && !notificationSettings.value[settingKey]) {
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
		TuNotification.closeAll();
		console.log("All active notifications cleared");
	}
};

// ============================================================
// Helper Functions
// ============================================================
/**
 * Add notification to history for tracking
 */
const addNotificationToHistory = (notification: NotificationHistoryItem) => {
	notificationHistory.value.unshift(notification);
	lastNotificationTime.value = new Date().toLocaleTimeString();
};

/**
 * Show notification toast using TuNotification class
 */
const showNotificationToast = (notification: NotificationHistoryItem) => {
	// Map notification type to color
	const colorMap: Record<string, string> = {
		success: "success",
		info: "primary",
		warning: "warn",
		error: "danger",
		default: "primary"
	};
	
	// Create notification attributes
	const notificationAttrs: TuNotificationAttributes = {
		title: notification.title as string,
		text: notification.message as string,
		color: colorMap[notification.type as string] || "primary",
		position: (notification.position as NotificationPosition) || (notificationSettings.value.position as NotificationPosition),
		duration: notificationSettings.value.duration * 1000,
		flat: false,
		sticky: notification.sticky as boolean || false,
		progressAuto: notification.progress !== undefined,
		icon: getNotificationIcon(notification.type as string),
		
		onClickClose: () => {
			console.log("Notification closed:", notification.id);
		},
		
		onClick: () => {
			console.log("Notification clicked:", notification.id);
			markAsRead(notification.id as number);
		}
	};
	
	// Create and show notification
	new TuNotification(notificationAttrs);
};

const markAsRead = (notificationId: number) => {
	const notification = notificationHistory.value.find(n => n.id === notificationId);
	if (notification) notification.read = true;
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

const executeNotificationAction = (action: { label: string; action: string; color: string }) => {
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

<style>
/* Global styles for custom notification class */
.custom-notification-style {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
	color: white !important;
	font-weight: bold;
	border: 3px solid #ffffff !important;
	box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4) !important;
}

.custom-notification-style * {
	color: white !important;
}
</style>
