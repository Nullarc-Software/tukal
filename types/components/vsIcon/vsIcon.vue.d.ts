import { Ref } from '@vue/runtime-core';
export declare class IconPackConstants {
    static iconPackGlobal: string;
}
declare const _default: import("@vue/runtime-core").DefineComponent<{
    icon: {
        default: any;
        type: StringConstructor;
    };
    iconPack: {
        default: any;
        type: StringConstructor;
    };
    color: {
        default: any;
        type: StringConstructor;
    };
    bg: {
        default: any;
        type: StringConstructor;
    };
    size: {
        default: any;
        type: StringConstructor;
    };
    round: {
        default: boolean;
        type: BooleanConstructor;
    };
}, {
    getIconPack: import("@vue/reactivity").ComputedRef<string>;
    iconClass: import("@vue/reactivity").ComputedRef<{}>;
    iconStyle: import("@vue/reactivity").ComputedRef<{
        width: string;
        height: string;
        'font-size': string;
        color: import("@vue/reactivity").ComputedRef<string>;
        background: import("@vue/reactivity").ComputedRef<string>;
        cursor: string;
    }>;
    getBg: import("@vue/reactivity").ComputedRef<{}>;
    getColor: import("@vue/reactivity").ComputedRef<string>;
    getBgColor: import("@vue/reactivity").ComputedRef<string>;
    getBgSize: import("@vue/reactivity").ComputedRef<{}>;
}, unknown, {}, {}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").DefineComponent<{
    color: {
        type: StringConstructor;
        default: any;
    };
    danger: {
        type: BooleanConstructor;
        default: boolean;
    };
    success: {
        type: BooleanConstructor;
        default: boolean;
    };
    warn: {
        type: BooleanConstructor;
        default: boolean;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    primary: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    colorSecondary: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: any;
    };
}, unknown, {
    componentColor: Ref<string>;
    getColor: (color: any) => any;
    getColorSecondary: FunctionConstructor;
    approuter: import("vue-router").Router;
}, {}, {
    isColorDark(): any;
    isColor(): boolean;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    danger: boolean;
    success: boolean;
    warn: boolean;
    dark: boolean;
    primary: boolean;
    active: boolean;
    colorSecondary: string;
} & {
    color?: string;
    textColor?: string;
}>, {
    color: string;
    danger: boolean;
    success: boolean;
    warn: boolean;
    dark: boolean;
    primary: boolean;
    active: boolean;
    colorSecondary: string;
    textColor: string;
}>, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    round: boolean;
} & {
    color?: string;
    icon?: string;
    iconPack?: string;
    bg?: string;
    size?: string;
}>, {
    color: string;
    icon: string;
    iconPack: string;
    bg: string;
    size: string;
    round: boolean;
}>;
export default _default;
