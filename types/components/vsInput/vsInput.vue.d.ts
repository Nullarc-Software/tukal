declare const _default: import("@vue/runtime-core").DefineComponent<{
    modelValue: {
        default: string;
    };
    labelPlaceholder: {
        default: string;
    };
    label: {
        default: string;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    iconAfter: {
        type: BooleanConstructor;
        default: boolean;
    };
    visiblePassword: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: any;
    };
    state: {
        type: StringConstructor;
        default: any;
    };
    progress: {
        type: NumberConstructor;
        default: number;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    transparent: {
        type: BooleanConstructor;
        default: boolean;
    };
    textWhite: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    id: {
        type: StringConstructor;
        default: any;
    };
    placeholder: {
        type: StringConstructor;
        default: any;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    enter: (el: any, done: any) => void;
    beforeEnter: (el: any) => void;
    leave: (el: any, done: any) => void;
    onInput: (evt: any) => void;
    iconClick: (evt: any) => void;
    hasColor: import("@vue/reactivity").ComputedRef<string | boolean>;
    getId: import("@vue/reactivity").ComputedRef<string>;
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
    componentColor: import("@vue/reactivity").Ref<string>;
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
}>, ("update:modelValue" | "click-icon")[], "update:modelValue" | "click-icon", import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    modelValue: string;
    labelPlaceholder: string;
    label: string;
    block: boolean;
    iconAfter: boolean;
    visiblePassword: boolean;
    loading: boolean;
    progress: number;
    border: boolean;
    shadow: boolean;
    transparent: boolean;
    textWhite: boolean;
    square: boolean;
    inline: boolean;
} & {
    color?: string;
    state?: string;
    id?: string;
    placeholder?: string;
}>, {
    color: string;
    modelValue: string;
    labelPlaceholder: string;
    label: string;
    block: boolean;
    iconAfter: boolean;
    visiblePassword: boolean;
    loading: boolean;
    state: string;
    progress: number;
    border: boolean;
    shadow: boolean;
    transparent: boolean;
    textWhite: boolean;
    square: boolean;
    id: string;
    placeholder: string;
    inline: boolean;
}>;
export default _default;
