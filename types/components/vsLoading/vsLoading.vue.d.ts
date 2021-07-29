declare const _default: import("vue").DefineComponent<{
    text: {
        type: StringConstructor;
        default: any;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: any;
    };
    background: {
        type: StringConstructor;
        default: any;
    };
    opacity: {
        type: StringConstructor;
        default: any;
    };
    percent: {
        type: StringConstructor;
        default: any;
    };
    progress: {
        type: NumberConstructor;
        default: any;
    };
    scale: {
        type: StringConstructor;
        default: any;
    };
    target: {};
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: string;
    isVisible: boolean;
} & {
    color?: string;
    progress?: number;
    text?: string;
    target?: unknown;
    background?: string;
    opacity?: string;
    percent?: string;
    scale?: string;
}>, {
    color: string;
    progress: number;
    text: string;
    background: string;
    type: string;
    opacity: string;
    percent: string;
    scale: string;
    isVisible: boolean;
}>;
export default _default;
