declare const _default: import("vue").DefineComponent<{
    value: {};
    reduce: {
        default: boolean;
        type: BooleanConstructor;
    };
    hoverExpand: {
        default: boolean;
        type: BooleanConstructor;
    };
    open: {
        default: boolean;
        type: BooleanConstructor;
    };
    notLineActive: {
        default: boolean;
        type: BooleanConstructor;
    };
    square: {
        default: boolean;
        type: BooleanConstructor;
    };
    textWhite: {
        default: boolean;
        type: BooleanConstructor;
    };
    notShadow: {
        default: boolean;
        type: BooleanConstructor;
    };
    relative: {
        default: boolean;
        type: BooleanConstructor;
    };
    absolute: {
        default: boolean;
        type: BooleanConstructor;
    };
    right: {
        default: boolean;
        type: BooleanConstructor;
    };
    background: {
        default: string;
        type: StringConstructor;
    };
    expanded: {
        default: boolean;
        type: BooleanConstructor;
    };
    fixedExpandWidth: {
        default: any;
        type: NumberConstructor;
    };
}, {
    staticWidth: import("vue").Ref<number>;
    forceExpand: import("vue").Ref<boolean>;
    reduceInternal: import("vue").Ref<boolean>;
    handleClickItem: (id: string) => void;
    clickCloseSidebar: (evt: any) => void;
    listeners: import("vue").ComputedRef<{
        mouseenter: () => void;
        mouseleave: () => void;
    }>;
    sidebar: import("vue").Ref<HTMLDivElement>;
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
}>, ("update:value" | "update:open" | "update:expanded")[], "update:value" | "update:open" | "update:expanded", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    reduce: boolean;
    textWhite: boolean;
    square: boolean;
    open: boolean;
    background: string;
    hoverExpand: boolean;
    notLineActive: boolean;
    notShadow: boolean;
    relative: boolean;
    absolute: boolean;
    right: boolean;
    expanded: boolean;
} & {
    value?: unknown;
    fixedExpandWidth?: number;
}>, {
    reduce: boolean;
    textWhite: boolean;
    square: boolean;
    open: boolean;
    background: string;
    hoverExpand: boolean;
    notLineActive: boolean;
    notShadow: boolean;
    relative: boolean;
    absolute: boolean;
    right: boolean;
    expanded: boolean;
    fixedExpandWidth: number;
}>;
export default _default;
