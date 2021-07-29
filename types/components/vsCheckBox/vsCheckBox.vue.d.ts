declare const _default: import("vue").DefineComponent<{
    value: {
        type: (StringConstructor | BooleanConstructor | ArrayConstructor)[];
        default: string;
    };
    val: {
        default: string;
    };
    notValue: {
        default: string;
    };
    indeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    lineThrough: {
        type: BooleanConstructor;
        default: boolean;
    };
    checked: {
        type: BooleanConstructor;
        default: boolean;
    };
    checkedForce: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelBefore: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    listeners: import("vue").ComputedRef<{
        input: (evt: any) => void;
        blur: (evt: EventTarget) => void;
    }>;
    isChecked: import("vue").ComputedRef<boolean>;
    uid: number;
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
}>, ("blur" | "change" | "update:value" | "mousedown")[], "blur" | "change" | "update:value" | "mousedown", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    value: string | boolean | unknown[];
    loading: boolean;
    val: string;
    notValue: string;
    indeterminate: boolean;
    lineThrough: boolean;
    checked: boolean;
    checkedForce: boolean;
    labelBefore: boolean;
} & {}>, {
    value: string | boolean | unknown[];
    loading: boolean;
    val: string;
    notValue: string;
    indeterminate: boolean;
    lineThrough: boolean;
    checked: boolean;
    checkedForce: boolean;
    labelBefore: boolean;
}>;
export default _default;
