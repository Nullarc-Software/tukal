import { App } from 'vue';
interface NotificationAttributes {
    position?: "bottom-left" | "bottom-right" | "bottom-center" | "top-left" | "top-right" | "top-center";
    isVisible?: Boolean;
    content?: Object;
    title: String;
    text?: String;
    color?: String;
    border?: String;
    icon?: String;
    onClickClose?: Function;
    onClick?: Function;
    buttonClose?: Boolean;
    flat?: Boolean;
    onDestroy?: Function;
    sticky?: Boolean;
    square?: Boolean;
    width?: String;
    loading?: Boolean;
    progressAuto?: Boolean;
    progress?: Number;
    duration?: Number;
    notPadding?: Object;
    clickClose?: Boolean;
    classNotification?: String;
}
declare class notification {
    static notifId: number;
    static instanceList: any;
    clientClose: Function | null;
    instance: App | null;
    currentId: number;
    static closeAll(params: any): void;
    close(): void;
    private closeNotification;
    constructor(paramsAttr: NotificationAttributes);
}
export { notification, NotificationAttributes };
