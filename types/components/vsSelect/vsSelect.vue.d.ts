declare const _default: import("vue").DefineComponent<{
    modelValue: {};
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropdown: {
        type: BooleanConstructor;
        default: boolean;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    filter: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    labelPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapseChips: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    state: {
        type: StringConstructor;
        default: any;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectItems: {
        type: ArrayConstructor;
        default: any[];
    };
}, {
    chipsHovered: import("vue").Ref<boolean>;
    renderSelect: import("vue").Ref<boolean>;
    activeOptions: import("vue").Ref<boolean>;
    valueLabel: any;
    hoverOption: import("vue").Ref<number>;
    uids: import("vue").Ref<any[]>;
    childOptions: import("vue").Ref<any[]>;
    targetSelect: import("vue").Ref<boolean>;
    targetSelectInput: import("vue").Ref<boolean>;
    targetClose: import("vue").Ref<boolean>;
    activeFilter: import("vue").Ref<boolean>;
    textFilter: import("vue").Ref<String>;
    childVisibles: import("vue").Ref<number>;
    uid: string;
    getChips: import("vue").ComputedRef<any[]>;
    selectListener: import("vue").ComputedRef<{
        mouseleave: (evt: any) => void;
        mouseenter: () => void;
    }>;
    inputListener: import("vue").ComputedRef<{
        keydown: (evt: any) => void;
        focus: (evt: Event) => void;
        input: (evt: any) => void;
    }>;
    getValueLabel: import("vue").ComputedRef<any[]>;
    chipsListener: import("vue").ComputedRef<{
        keydown: (evt: any) => void;
        mouseover: (event: any) => void;
        mouseout: (event: any) => void;
        focus: (evt: Event) => void;
        blur: typeof blur;
    }>;
    chipsFilterListener: import("vue").ComputedRef<{
        focus: (evt: Event) => void;
        blur: typeof blur;
        input: (evt: any) => void;
    }>;
    notData: import("vue").ComputedRef<boolean>;
    iconClicked: () => void;
    chips: import("vue").Ref<HTMLButtonElement>;
    chipsInput: import("vue").Ref<HTMLInputElement>;
    input: import("vue").Ref<HTMLInputElement>;
    options: import("vue").Ref<HTMLDivElement>;
    select: import("vue").Ref<HTMLDivElement>;
    content: import("vue").Ref<HTMLDivElement>;
    beforeEnter: (el: any) => void;
    enter: (el: any, done: any) => void;
    leave: (el: any, done: any) => void;
    setHover: () => void;
    onClickOption: (value: any, label: any) => void;
    isValue: import("vue").ComputedRef<boolean>;
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
    filter: boolean;
    labelPlaceholder: string;
    label: string;
    block: boolean;
    loading: boolean;
    placeholder: string;
    inline: boolean;
    disabled: boolean;
    dropdown: boolean;
    multiple: boolean;
    collapseChips: boolean;
    selectItems: unknown[];
} & {
    modelValue?: unknown;
    state?: string;
}>, {
    filter: boolean;
    labelPlaceholder: string;
    label: string;
    block: boolean;
    loading: boolean;
    state: string;
    placeholder: string;
    inline: boolean;
    disabled: boolean;
    dropdown: boolean;
    multiple: boolean;
    collapseChips: boolean;
    selectItems: unknown[];
}>;
export default _default;
