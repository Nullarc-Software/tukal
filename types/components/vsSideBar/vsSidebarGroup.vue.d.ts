declare const _default: import("vue").DefineComponent<{
    open: {
        default: boolean;
        type: BooleanConstructor;
    };
}, {
    handleClickItem: (id: string) => void;
    leave: (el: any, done: any) => void;
    enter: (el: any, done: any) => void;
    beforeEnter: (el: any) => void;
    parentValue: any;
    group: import("vue").Ref<boolean>;
    openState: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    open: boolean;
} & {}>, {
    open: boolean;
}>;
export default _default;
