import { App, createApp, nextTick, reactive } from 'vue';
import vsComponent from './vsLoading.vue'

vsComponent.install = (vue: any) => {
    vue.component(vsComponent.name, vsComponent)
}

if (typeof window !== 'undefined' && (<any>window).Vue) {
    vsComponent.install((<any>window).Vue)
}

export interface LoadingParams {
    type?: string
    text?: string
    hidden?: boolean,
    color?: string,
    background?: string
    opacity?: string
    percent?: string
    progress?: number
    target?: any
    scale?: string
}

const loadingConstructor = vsComponent;

class loading {

    instance: App | null = null;
    params: LoadingParams;
    isVisible: boolean = false;

    public changeText(val: string) {
        if (val) {
            this.params.text = val
        }
    }

    public changeProgress(val: number) {
        if (val) {
            this.params.progress = val
        }
    }

    public changePercent(val: string) {
        if (val) {
            this.params.percent = val
        }
    }

    public close() {
        this.isVisible = false
        document.body.style.overflowY = 'auto'
        setTimeout(() => {
            this.instance?.unmount();            
        }, 250)
    }

    constructor(paramsAttr: LoadingParams) {

        this.params = reactive(paramsAttr);

        if (typeof paramsAttr.target === 'string') {
            this.params.target = document.querySelector(this.params.target)
        } else if (paramsAttr.target) {
            this.params.target = this.params.target.$el || this.params.target
        } else {
            this.params.target = document.body
        }

        this.instance = createApp(loadingConstructor, this.params as any);
        let element = document.createElement("div");
        let html = this.instance.mount(element).$el;

        this.params.target.appendChild(html);      

    }

}

export default loading;