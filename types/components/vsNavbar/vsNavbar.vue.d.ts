declare const _default: import("vue").DefineComponent<{
    fixed: {
        default: boolean;
        type: BooleanConstructor;
    };
    sticky: {
        default: boolean;
        type: BooleanConstructor;
    };
    leftAligned: {
        default: boolean;
        type: BooleanConstructor;
    };
    open: {
        default: boolean;
        type: BooleanConstructor;
    };
    shadow: {
        default: boolean;
        type: BooleanConstructor;
    };
    shadowScroll: {
        default: boolean;
        type: BooleanConstructor;
    };
    hideScroll: {
        default: boolean;
        type: BooleanConstructor;
    };
    textWhite: {
        default: boolean;
        type: BooleanConstructor;
    };
    square: {
        default: boolean;
        type: BooleanConstructor;
    };
    paddingScroll: {
        default: boolean;
        type: BooleanConstructor;
    };
    notLine: {
        default: boolean;
        type: BooleanConstructor;
    };
    leftCollapsed: {
        default: boolean;
        type: BooleanConstructor;
    };
    centerCollapsed: {
        default: boolean;
        type: BooleanConstructor;
    };
    rightCollapsed: {
        default: boolean;
        type: BooleanConstructor;
    };
    targetScroll: {
        type: StringConstructor;
        default: any;
    };
}, {
    leftLine: import("vue").Ref<number>;
    widthLine: import("vue").Ref<number>;
    scrollTop: import("vue").Ref<number>;
    collapsedWidth: import("vue").Ref<number>;
    hidden: import("vue").Ref<boolean>;
    shadowActive: import("vue").Ref<boolean>;
    paddingScrollActive: import("vue").Ref<boolean>;
    lineNotTransition: import("vue").Ref<boolean>;
    collapsedForced: import("vue").Ref<boolean>;
    setModel: (id: string, handleFunc: Function) => void;
    setLeftLine: (left: any, transition?: boolean) => void;
    setWidthLine: (width: any) => void;
    navbarContent: import("vue").Ref<HTMLDivElement>;
    left: import("vue").Ref<HTMLDivElement>;
    right: import("vue").Ref<HTMLDivElement>;
    center: import("vue").Ref<HTMLDivElement>;
    zIndex: number;
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
}>, ("update:value" | "collapsed")[], "update:value" | "collapsed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    shadow: boolean;
    textWhite: boolean;
    square: boolean;
    fixed: boolean;
    sticky: boolean;
    leftAligned: boolean;
    open: boolean;
    shadowScroll: boolean;
    hideScroll: boolean;
    paddingScroll: boolean;
    notLine: boolean;
    leftCollapsed: boolean;
    centerCollapsed: boolean;
    rightCollapsed: boolean;
} & {
    targetScroll?: string;
}>, {
    shadow: boolean;
    textWhite: boolean;
    square: boolean;
    fixed: boolean;
    sticky: boolean;
    leftAligned: boolean;
    open: boolean;
    shadowScroll: boolean;
    hideScroll: boolean;
    paddingScroll: boolean;
    notLine: boolean;
    leftCollapsed: boolean;
    centerCollapsed: boolean;
    rightCollapsed: boolean;
    targetScroll: string;
}>;
export default _default;
