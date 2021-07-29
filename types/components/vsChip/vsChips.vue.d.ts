declare const _default: import("@vue/runtime-core").DefineComponent<{
    value: {};
    vsColor: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    items: {
        type: ArrayConstructor;
    };
    iconPack: {
        type: StringConstructor;
        default: string;
    };
    removeIcon: {
        type: StringConstructor;
        default: string;
    };
}, unknown, {
    newChip: string;
    chip1: boolean;
}, {}, {
    addItem(): void;
    removeTotalItems(): void;
}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    iconPack: string;
    placeholder: string;
    vsColor: string;
    removeIcon: string;
} & {
    value?: unknown;
    items?: unknown[];
}>, {
    iconPack: string;
    placeholder: string;
    vsColor: string;
    removeIcon: string;
}>;
export default _default;
