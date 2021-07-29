declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    fullScreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    notClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    preventClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    notPadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowHidden: {
        type: BooleanConstructor;
        default: boolean;
    };
    blur: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    scroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    notCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    routerClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: any;
    };
    footerClasses: {
        type: ObjectConstructor;
        default: any;
    };
}, {
    rebound: import("vue").Ref<boolean>;
    closeClick: (evt: any) => void;
    click: (evt: any) => void;
    insertDialog: () => void;
    esc: (evt: any) => void;
    addEsc: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").DefineComponent<{
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
    componentColor: import("vue").Ref<string>;
    getColor: (color: any) => any;
    getColorSecondary: FunctionConstructor;
    approuter: import("vue-router").Router;
}, {}, {
    isColorDark(): any;
    isColor(): boolean;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
}>, ("update:modelValue" | "close")[], "update:modelValue" | "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: boolean;
    loading: boolean;
    square: boolean;
    blur: boolean;
    fullScreen: boolean;
    notClose: boolean;
    preventClose: boolean;
    notPadding: boolean;
    overflowHidden: boolean;
    autoWidth: boolean;
    scroll: boolean;
    notCenter: boolean;
    routerClose: boolean;
} & {
    width?: string;
    footerClasses?: Record<string, any>;
}>, {
    modelValue: boolean;
    loading: boolean;
    square: boolean;
    blur: boolean;
    width: string;
    fullScreen: boolean;
    notClose: boolean;
    preventClose: boolean;
    notPadding: boolean;
    overflowHidden: boolean;
    autoWidth: boolean;
    scroll: boolean;
    notCenter: boolean;
    routerClose: boolean;
    footerClasses: Record<string, any>;
}>;
export default _default;
