import { App, createApp } from 'vue';
import tuComponent from './tuNotifications.vue'

tuComponent.install = (vue: any) => {
  vue.component(tuComponent.name, tuComponent)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  tuComponent.install((<any>window).Vue)
}

const notificationConstructor = tuComponent;

interface NotificationAttributes {	
	position?:  "bottom-left"| "bottom-right" | "bottom-center" | "top-left" | "top-right" | "top-center",
	isVisible?:  Boolean,
	content?:  Object,
	title:  String,
	text?:  String,
	color?:  String,
	border?:  String,
	icon?:  String,
	onClickClose?:  Function,
	onClick?:  Function,
	buttonClose?:  Boolean,
	flat?:  Boolean,
	onDestroy?:  Function,
	sticky?:  Boolean,
	square?:  Boolean,
	width?:  String,
	loading?:  Boolean,
	progressAuto?:  Boolean,
	progress?:  Number,
	duration?:  Number,
	notPadding?:  Object,
	clickClose?:  Boolean,
	classNotification?:  String
}

class notification{

	static notifId = 0;
	static instanceList: any;
	clientClose : Function | null = null;
	instance : App | null = null;
	currentId : number = 0;

	public static closeAll(params) {
		for(let id of notification.instanceList.keys){
			try {
				notification.instanceList[id].unmount();	
			} catch (error) {
				
			}
		}

		this.instanceList = [];
	};
	
	close(){
		notification.instanceList[this.currentId].unmount();
	}

	private closeNotification(){
		notification.instanceList[this.currentId].unmount();
		if(this.clientClose)
			this.clientClose();
	}

	constructor(paramsAttr: NotificationAttributes){

		let params = Object.create({});
		params = Object.assign(params, paramsAttr);
		params.notifId = ++notification.notifId;
		this.currentId = notification.notifId;
		params.clickClose = true;
		if(params.onClickClose)
			this.clientClose = params.onClickClose;
		params.onClickClose = this.closeNotification.bind(this);

		if (params.progress == 'auto' && params.duration !== 'none') {
			params.progressAuto = true;
			delete params.progress;
		}


		const parent: HTMLElement =
		document.querySelector(`.tu-notification-parent--${params.position || 'bottom-right'}`) || document.createElement('div');
		
		if (!document.querySelector(`.tu-notification-parent--${params.position || 'bottom-right'}`)) {
			parent.className = 'tu-notification-parent'
			parent.classList.add(`tu-notification-parent--${params.position || 'bottom-right'}`)
		}
		this.instance = createApp(notificationConstructor, params);
		let element  = document.createElement("div");
		let html = this.instance.mount(element).$el;

		parent.appendChild(html);
		document.body.appendChild(parent);

		if(!!notification.instanceList == false)
			notification.instanceList = Object.create(null);
		notification.instanceList[notification.notifId] = this.instance;

	}
};

export { notification, NotificationAttributes};
