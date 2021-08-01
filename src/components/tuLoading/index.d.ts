import { App, Ref } from 'vue';
interface LoadingAttributes {
    type?: string;
    text?: string;
    hidden?: boolean;
    color?: string;
    background?: string;
    opacity?: string;
    percent?: string;
    progress?: number;
    target?: any;
    scale?: string;
}
declare class loading {
    instance: App | null;
    params: Ref<LoadingAttributes>;
    isVisible: boolean;
    changeText(val: string): void;
    changeProgress(val: number): void;
    changePercent(val: string): void;
    close(): void;
    constructor(paramsAttr: LoadingAttributes);
}
export { loading, LoadingAttributes };
