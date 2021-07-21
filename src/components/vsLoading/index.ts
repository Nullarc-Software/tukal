import { App, createApp, nextTick, reactive, Ref, ref } from 'vue';
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
    params: Ref<LoadingParams>;
    isVisible: boolean = false;

    public changeText(val: string) {
        if (val) {
            this.params.value.text = val
        }
    }

    public changeProgress(val: number) {
        if (val) {
            this.params.value.progress = val
        }
    }

    public changePercent(val: string) {
        if (val) {
            this.params.value.percent = val
        }
    }

    public close() {
        this.params.value.opacity = '0';
        setTimeout(() => {
            this.instance?.unmount();            
        }, 50)
    }

    constructor(paramsAttr: LoadingParams) {

        this.params = ref(paramsAttr);
        let target : any = null;
        if (typeof paramsAttr.target === 'string') {
            target = document.querySelector(this.params.value.target)
        } else if (paramsAttr.target) {
            target = this.params.value.target.$el || this.params.value.target
        } else {
            target = document.body
        }

        this.instance = createApp(loadingConstructor, this.params.value as any);
        let element = document.createElement("div");
        let html = this.instance.mount(element).$el;

        target.appendChild(html);      

    }

}

export default loading;