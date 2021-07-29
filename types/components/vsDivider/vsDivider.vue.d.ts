declare const _default: import("vue").DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        default: any;
        type: StringConstructor;
    };
    borderStyle: {
        default: string;
        type: StringConstructor;
    };
    borderHeight: {
        default: string;
        type: StringConstructor;
    };
    position: {
        default: string;
        type: StringConstructor;
    };
    iconPack: {
        default: string;
        type: StringConstructor;
    };
}, {
    getWidthAfter: import("vue").ComputedRef<string>;
    backgroundColor: import("vue").ComputedRef<string>;
    textAndBackgroundClass: import("vue").ComputedRef<{}>;
    textColor: import("vue").ComputedRef<string>;
    borderClass: import("vue").ComputedRef<{}>;
    beforeStyle: import("vue").ComputedRef<{
        width: import("vue").ComputedRef<string>;
        "border-top-width": string;
        "border-top-style": string;
    }>;
    getWidthBefore: import("vue").ComputedRef<string>;
    afterStyle: import("vue").ComputedRef<{
        width: import("vue").ComputedRef<string>;
        "border-top-width": string;
        "border-top-style": string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color: string;
    background: string;
    iconPack: string;
    position: string;
    borderStyle: string;
    borderHeight: string;
} & {
    icon?: string;
}>, {
    color: string;
    background: string;
    icon: string;
    iconPack: string;
    position: string;
    borderStyle: string;
    borderHeight: string;
}>;
export default _default;
