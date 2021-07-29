declare const _default: import("@vue/runtime-core").DefineComponent<{
    item: {
        type: BooleanConstructor;
    };
    value: {
        default: any;
        type: ArrayConstructor;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    text: {
        type: StringConstructor;
        default: any;
    };
    closable: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: any;
    };
    icon: {
        type: StringConstructor;
        default: any;
    };
    iconPack: {
        type: StringConstructor;
        default: string;
    };
    closeIcon: {
        type: StringConstructor;
        default: string;
    };
    transparent: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    styleChip: import("@vue/reactivity").ComputedRef<{
        background: string;
        color: string;
    }>;
    closeChip: () => void;
    remove: () => void;
}, unknown, {}, {}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    active: boolean;
    iconPack: string;
    transparent: boolean;
    closable: string | boolean;
    closeIcon: string;
    item: boolean;
} & {
    value?: unknown[];
    text?: string;
    color?: string;
    icon?: string;
}>, {
    value: unknown[];
    text: string;
    color: string;
    icon: string;
    active: boolean;
    iconPack: string;
    transparent: boolean;
    closable: string | boolean;
    closeIcon: string;
    item: boolean;
}>;
export default _default;
