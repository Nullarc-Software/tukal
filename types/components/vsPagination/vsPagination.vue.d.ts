declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    infinite: {
        default: boolean;
        type: BooleanConstructor;
    };
    flat: {
        default: boolean;
        type: BooleanConstructor;
    };
    progress: {
        default: boolean;
        type: BooleanConstructor;
    };
    notMargin: {
        default: boolean;
        type: BooleanConstructor;
    };
    buttonsDotted: {
        default: boolean;
        type: BooleanConstructor;
    };
    notArrows: {
        default: boolean;
        type: BooleanConstructor;
    };
    onlyArrows: {
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
    disabled: {
        default: boolean;
        type: BooleanConstructor;
    };
    disabledItems: {
        default: any[];
        type: ArrayConstructor;
    };
    loadingItems: {
        default: any[];
        type: ArrayConstructor;
    };
    length: {
        default: number;
        type: NumberConstructor;
    };
    max: {
        default: number;
        type: NumberConstructor;
    };
    dottedNumber: {
        default: number;
        type: NumberConstructor;
    };
}, {
    leftActive: import("vue").Ref<number>;
    activeClassMove: import("vue").Ref<boolean>;
    val: import("vue").Ref<number>;
    prevClicked: () => void;
    nextClicked: () => void;
    getPages: import("vue").ComputedRef<any[]>;
    pagination: import("vue").Ref<HTMLDivElement>;
    getProgress: import("vue").ComputedRef<number>;
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
}>, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    length: number;
    flat: boolean;
    modelValue: number;
    progress: boolean;
    square: boolean;
    circle: boolean;
    disabled: boolean;
    infinite: boolean;
    notMargin: boolean;
    buttonsDotted: boolean;
    notArrows: boolean;
    onlyArrows: boolean;
    disabledItems: unknown[];
    loadingItems: unknown[];
    max: number;
    dottedNumber: number;
} & {}>, {
    length: number;
    flat: boolean;
    modelValue: number;
    progress: boolean;
    square: boolean;
    circle: boolean;
    disabled: boolean;
    infinite: boolean;
    notMargin: boolean;
    buttonsDotted: boolean;
    notArrows: boolean;
    onlyArrows: boolean;
    disabledItems: unknown[];
    loadingItems: unknown[];
    max: number;
    dottedNumber: number;
}>;
export default _default;
