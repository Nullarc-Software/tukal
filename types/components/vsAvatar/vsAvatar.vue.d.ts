import { Ref } from "vue";
declare const _default: import("vue").DefineComponent<{
    badgePosition: {
        default: any;
    };
    pointer: {
        default: boolean;
        type: BooleanConstructor;
    };
    circle: {
        default: boolean;
        type: BooleanConstructor;
    };
    square: {
        default: boolean;
        type: BooleanConstructor;
    };
    history: {
        default: boolean;
        type: BooleanConstructor;
    };
    loading: {
        default: boolean;
        type: BooleanConstructor;
    };
    historyGradient: {
        default: boolean;
        type: BooleanConstructor;
    };
    writing: {
        default: boolean;
        type: BooleanConstructor;
    };
    badge: {
        default: boolean;
        type: BooleanConstructor;
    };
    badgeColor: {
        default: string;
        type: StringConstructor;
    };
    size: {
        default: string;
        type: StringConstructor;
    };
    text: {
        default: string;
        type: StringConstructor;
    };
}, {
    textLength: Ref<number>;
    countPlus: Ref<number>;
    index: Ref<number>;
    additionalClasses: Ref<any[]>;
    avatarContent: Ref<HTMLDivElement>;
    avatarsLength: Ref<Number>;
    parentMax: Ref<Number>;
    isHidden: import("vue").ComputedRef<boolean>;
    isLatest: import("vue").ComputedRef<boolean>;
    getText: import("vue").ComputedRef<string>;
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
    componentColor: Ref<string>;
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
}>, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    loading: boolean;
    square: boolean;
    size: string;
    pointer: boolean;
    circle: boolean;
    history: boolean;
    historyGradient: boolean;
    writing: boolean;
    badge: boolean;
    badgeColor: string;
    text: string;
} & {
    badgePosition?: any;
}>, {
    loading: boolean;
    square: boolean;
    size: string;
    pointer: boolean;
    circle: boolean;
    badgePosition: any;
    history: boolean;
    historyGradient: boolean;
    writing: boolean;
    badge: boolean;
    badgeColor: string;
    text: string;
}>;
export default _default;
