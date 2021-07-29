declare const _default: import("@vue/runtime-core").DefineComponent<{
    items: {
        type: ArrayConstructor;
        readOnly: boolean;
    };
    separator: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
}, {
    textStyle: import("@vue/reactivity").ComputedRef<any>;
    textClass: import("@vue/reactivity").ComputedRef<{}>;
    hasSlot: import("@vue/reactivity").ComputedRef<boolean>;
    mutableItems: import("@vue/reactivity").ComputedRef<unknown[]>;
}, unknown, {}, {}, import("@vue/runtime-core").ComponentOptionsMixin, import("@vue/runtime-core").ComponentOptionsMixin, Record<string, any>, string, import("@vue/runtime-core").VNodeProps & import("@vue/runtime-core").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    color: string;
    separator: string;
    align: string;
} & {
    items?: unknown[];
}>, {
    color: string;
    separator: string;
    align: string;
}>;
export default _default;
