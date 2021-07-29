declare const _default: import("vue").DefineComponent<{
    accordion: {
        default: boolean;
        type: BooleanConstructor;
    };
    type: {
        default: string;
        type: StringConstructor;
    };
    openHover: {
        default: boolean;
        type: BooleanConstructor;
    };
}, {
    emitChange: () => void;
    closeAllItems: (el: any, maxHeight: any) => void;
    collapse: import("vue").Ref<HTMLDivElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: string;
    accordion: boolean;
    openHover: boolean;
} & {}>, {
    type: string;
    accordion: boolean;
    openHover: boolean;
}>;
export default _default;
