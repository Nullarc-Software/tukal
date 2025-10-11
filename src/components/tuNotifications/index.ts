// ============================================================
// Imports
// ============================================================
import { App, createApp } from "vue";
import tuComponent from "./tuNotifications.vue";

// ============================================================
// Component Installation
// ============================================================
/**
 * Install the notification component globally
 * @param vue - Vue application instance
 */
tuComponent.install = (vue: App): void => {
	vue.component(tuComponent.name || "TuNotifications", tuComponent);
};

// Auto-install for browser environments
if (typeof window !== "undefined" && (window as unknown as { Vue?: App }).Vue)
	tuComponent.install((window as unknown as { Vue: App }).Vue);

// ============================================================
// Constructor Reference
// ============================================================
const notificationConstructor = tuComponent;

// ============================================================
// Types
// ============================================================
/**
 * Position options for notifications
 */
export type NotificationPosition = 
	| "bottom-left" 
	| "bottom-right" 
	| "bottom-center" 
	| "top-left" 
	| "top-right" 
	| "top-center";

/**
 * Configuration attributes for notification instances
 * @example
 * const notification = new TuNotification({
 *   title: "Success",
 *   text: "Operation completed",
 *   color: "success",
 *   duration: 3000
 * });
 */
export interface TuNotificationAttributes {
	/**
	 * Position of the notification on screen
	 * @default "bottom-right"
	 */
	position?: NotificationPosition;
	
	/**
	 * Whether the notification is visible
	 * @default true
	 */
	isVisible?: boolean;
	
	/**
	 * Custom content component to render
	 */
	content?: {
		component: unknown;
		props?: Record<string, unknown>;
	};
	
	/**
	 * Title text of the notification
	 */
	title: string;
	
	/**
	 * Body text of the notification
	 */
	text?: string;
	
	/**
	 * Color theme for the notification
	 * @default "primary"
	 */
	color?: string;
	
	/**
	 * Border style configuration
	 */
	border?: string;
	
	/**
	 * Icon to display in the notification
	 */
	icon?: string;
	
	/**
	 * Callback function when close button is clicked
	 */
	onClickClose?: () => void;
	
	/**
	 * Callback function when notification is clicked
	 */
	onClick?: () => void;
	
	/**
	 * Whether to show close button
	 * @default true
	 */
	buttonClose?: boolean;
	
	/**
	 * Flat style without shadow
	 * @default false
	 */
	flat?: boolean;
	
	/**
	 * Callback function when notification is destroyed
	 */
	onDestroy?: () => void;
	
	/**
	 * Whether notification stays permanently (doesn't auto-close)
	 * @default false
	 */
	sticky?: boolean;
	
	/**
	 * Square corners instead of rounded
	 * @default false
	 */
	square?: boolean;
	
	/**
	 * Width of the notification
	 */
	width?: string;
	
	/**
	 * Show loading state
	 * @default false
	 */
	loading?: boolean;
	
	/**
	 * Auto-increment progress bar
	 * @default false
	 */
	progressAuto?: boolean;
	
	/**
	 * Initial progress value (0-100)
	 */
	progress?: number;
	
	/**
	 * Duration before auto-close in milliseconds
	 * @default 5000
	 */
	duration?: number;
	
	/**
	 * Remove padding from notification
	 */
	notPadding?: Record<string, unknown>;
	
	/**
	 * Close notification when clicked anywhere
	 * @default false
	 */
	clickClose?: boolean;
	
	/**
	 * Additional CSS classes for the notification
	 */
	classNotification?: string;
}

// ============================================================
// Notification Manager Class
// ============================================================
/**
 * Manages notification instances and provides methods to create and control notifications
 * @example
 * // Create a new notification
 * const notification = new TuNotification({
 *   title: "Success",
 *   text: "Operation completed successfully",
 *   color: "success"
 * });
 * 
 * // Close a specific notification
 * notification.close();
 * 
 * // Close all notifications
 * TuNotification.closeAll();
 */
export class TuNotification {
	// ============================================================
	// Static Properties
	// ============================================================
	/**
	 * Counter for generating unique notification IDs
	 */
	private static notifId = 0;
	
	/**
	 * Registry of all active notification instances
	 */
	private static instanceList: Record<number, App> = {};

	// ============================================================
	// Instance Properties
	// ============================================================
	/**
	 * Client-provided close callback
	 */
	private clientClose: (() => void) | null = null;
	
	/**
	 * Vue app instance for this notification
	 */
	private instance: App | null = null;
	
	/**
	 * Unique ID for this notification instance
	 */
	private currentId = 0;

	// ============================================================
	// Static Methods
	// ============================================================
	/**
	 * Close all active notifications
	 * @example
	 * TuNotification.closeAll();
	 */
	public static closeAll(): void {
		const instanceIds = Object.keys(TuNotification.instanceList);
		
		for (const id of instanceIds) {
			try {
				const numId = Number(id);
				if (TuNotification.instanceList[numId]) {
					TuNotification.instanceList[numId].unmount();
					delete TuNotification.instanceList[numId];
				}
			}
			catch (error) {
				console.error(`Failed to close notification ${id}:`, error);
			}
		}
		
		TuNotification.instanceList = {};
	}

	// ============================================================
	// Instance Methods
	// ============================================================
	/**
	 * Close this notification instance
	 * @example
	 * notification.close();
	 */
	public close(): void {
		if (TuNotification.instanceList[this.currentId]) {
			TuNotification.instanceList[this.currentId].unmount();
			delete TuNotification.instanceList[this.currentId];
		}
	}

	/**
	 * Internal close handler that triggers client callback
	 */
	private closeNotification(): void {
		if (TuNotification.instanceList[this.currentId]) {
			TuNotification.instanceList[this.currentId].unmount();
			delete TuNotification.instanceList[this.currentId];
		}
		
		if (this.clientClose) this.clientClose();
	}

	// ============================================================
	// Constructor
	// ============================================================
	/**
	 * Create a new notification instance
	 * @param paramsAttr - Configuration attributes for the notification
	 * @example
	 * const notification = new TuNotification({
	 *   title: "Success",
	 *   text: "Your changes have been saved",
	 *   color: "success",
	 *   icon: "check",
	 *   duration: 3000
	 * });
	 */
	constructor(paramsAttr: TuNotificationAttributes) {
		// Create a mutable copy of the parameters
		const params: Record<string, unknown> = { ...paramsAttr };
		
		// Assign unique ID
		params.notifId = ++TuNotification.notifId;
		this.currentId = TuNotification.notifId;
		
		// Enable click-to-close
		params.clickClose = true;
		
		// Store client close callback and replace with internal handler
		if (paramsAttr.onClickClose)
			this.clientClose = paramsAttr.onClickClose;
		
		params.onClickClose = this.closeNotification.bind(this);

		// Handle auto-progress mode
		if (params.progress === "auto" && params.duration !== "none") {
			params.progressAuto = true;
			delete params.progress;
		}

		// Get or create parent container
		const position = (params.position as string) || "bottom-right";
		const parentSelector = `.tu-notification-parent--${position}`;
		let parent = document.querySelector<HTMLElement>(parentSelector);
		
		if (!parent) {
			parent = document.createElement("div");
			parent.className = "tu-notification-parent";
			parent.classList.add(`tu-notification-parent--${position}`);
			document.body.appendChild(parent);
		}

		// Create and mount the notification component
		this.instance = createApp(notificationConstructor, params);
		const element = document.createElement("div");
		const html = this.instance.mount(element).$el as HTMLElement;

		parent.appendChild(html);

		// Register instance
		if (!TuNotification.instanceList)
			TuNotification.instanceList = {};
		
		TuNotification.instanceList[TuNotification.notifId] = this.instance;
	}
}

