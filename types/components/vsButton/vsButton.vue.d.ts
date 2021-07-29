declare const _default: import("vue").DefineComponent<{
    ripple: {
        type: StringConstructor;
        default: string;
    };
    activeDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    flat: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    gradient: {
        type: BooleanConstructor;
        default: boolean;
    };
    relief: {
        type: BooleanConstructor;
        default: boolean;
    };
    transparent: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    floating: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: BooleanConstructor;
        default: boolean;
    };
    circle: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: any;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    upload: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    animationType: {
        type: StringConstructor;
        default: string;
    };
    animateInactive: {
        type: BooleanConstructor;
        default: boolean;
    };
    to: {
        type: StringConstructor;
        default: any;
    };
    href: {
        type: StringConstructor;
        default: any;
    };
    blank: {
        type: BooleanConstructor;
        default: boolean;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: any;
    };
    height: {
        type: StringConstructor;
        default: any;
    };
}, {
    clickButton: (event: any) => void;
    listeners: import("vue").ComputedRef<{
        click: (event: any) => void;
        mousedown: (event: any) => void;
    }>;
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
}>, ("routeErr" | "mouseover" | "mouseout" | "blur" | "click")[], "routeErr" | "mouseover" | "mouseout" | "blur" | "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    flat: boolean;
    block: boolean;
    loading: boolean;
    border: boolean;
    shadow: boolean;
    transparent: boolean;
    square: boolean;
    inline: boolean;
    icon: boolean;
    ripple: string;
    activeDisabled: boolean;
    gradient: boolean;
    relief: boolean;
    floating: boolean;
    circle: boolean;
    upload: boolean;
    animationType: string;
    animateInactive: boolean;
    blank: boolean;
} & {
    size?: string;
    to?: string;
    href?: string;
    width?: string;
    height?: string;
}>, {
    flat: boolean;
    block: boolean;
    loading: boolean;
    border: boolean;
    shadow: boolean;
    transparent: boolean;
    square: boolean;
    inline: boolean;
    icon: boolean;
    size: string;
    ripple: string;
    activeDisabled: boolean;
    gradient: boolean;
    relief: boolean;
    floating: boolean;
    circle: boolean;
    upload: boolean;
    animationType: string;
    animateInactive: boolean;
    to: string;
    href: string;
    blank: boolean;
    width: string;
    height: string;
}>;
export default _default;
