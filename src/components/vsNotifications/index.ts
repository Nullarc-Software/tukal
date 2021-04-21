import { App, createApp } from 'vue';
import vsComponent from './vsNotifications.vue'

vsComponent.install = (vue: any) => {
  vue.component(vsComponent.name, vsComponent)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
  vsComponent.install((<any>window).Vue)
}

const notificationConstructor = vsComponent;

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

	closeNotification(){
		notification.instanceList[this.currentId].unmount();
		if(this.clientClose)
			this.clientClose();
	}

	constructor(params: any){
		params.notifId = ++notification.notifId;
		this.currentId = notification.notifId;
		params.clickClose = true;
		if(params.onClickClose)
			this.clientClose = params.onClickClose;
		params.onClickClose = this.closeNotification.bind(this);
		this.instance = createApp(notificationConstructor, params);
		let element  = document.createElement("div");
		let html = this.instance.mount(element).$el;
		let child = document.body.appendChild(html);

		if(!!notification.instanceList == false)
			notification.instanceList = Object.create(null);
		notification.instanceList[notification.notifId] = this.instance;
	}
};

export default notification;
