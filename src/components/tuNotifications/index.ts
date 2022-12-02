import { App, createApp } from "vue";
import tuComponent from "./tuNotifications.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);

const notificationConstructor = tuComponent;

interface TuNotificationAttributes {
	position?: "bottom-left"| "bottom-right" | "bottom-center" | "top-left" | "top-right" | "top-center",
	isVisible?: boolean,
	content?: Object,
	title: string,
	text?: string,
	color?: string,
	border?: string,
	icon?: string,
	onClickClose?: Function,
	onClick?: Function,
	buttonClose?: boolean,
	flat?: boolean,
	onDestroy?: Function,
	sticky?: boolean,
	square?: boolean,
	width?: string,
	loading?: boolean,
	progressAuto?: boolean,
	progress?: number,
	duration?: number,
	notPadding?: Object,
	clickClose?: boolean,
	classNotification?: string
}

class TuNotification {
	static notifId = 0;
	static instanceList: any;
	clientClose : Function | null = null;
	instance : App | null = null;
	currentId  = 0;

	public static closeAll (params) {
		for (const id of TuNotification.instanceList.keys) {
			try {
				TuNotification.instanceList[id].unmount();
			}
			catch (error) {

			}
		}

		this.instanceList = [];
	}

	close () {
		TuNotification.instanceList[this.currentId].unmount();
	}

	private closeNotification () {
		TuNotification.instanceList[this.currentId].unmount();
		if (this.clientClose) this.clientClose();
	}

	constructor (paramsAttr: TuNotificationAttributes) {
		let params = Object.create({});
		params = Object.assign(params, paramsAttr);
		params.notifId = ++TuNotification.notifId;
		this.currentId = TuNotification.notifId;
		params.clickClose = true;
		if (params.onClickClose) this.clientClose = params.onClickClose;
		params.onClickClose = this.closeNotification.bind(this);

		if (params.progress === "auto" && params.duration !== "none") {
			params.progressAuto = true;
			delete params.progress;
		}

		const parent: HTMLElement =
		document.querySelector(`.tu-notification-parent--${params.position || "bottom-right"}`) || document.createElement("div");

		if (!document.querySelector(`.tu-notification-parent--${params.position || "bottom-right"}`)) {
			parent.className = "tu-notification-parent";
			parent.classList.add(`tu-notification-parent--${params.position || "bottom-right"}`);
		}
		this.instance = createApp(notificationConstructor, params);
		const element = document.createElement("div");
		const html = this.instance.mount(element).$el;

		parent.appendChild(html);
		document.body.appendChild(parent);

		if (!!TuNotification.instanceList === false) TuNotification.instanceList = Object.create(null);
		TuNotification.instanceList[TuNotification.notifId] = this.instance;
	}
}

export { TuNotification };	export type { TuNotificationAttributes };

