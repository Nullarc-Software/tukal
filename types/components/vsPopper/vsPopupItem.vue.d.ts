import { Ref } from "vue";
declare const _default: import("vue").DefineComponent<{
    to: {};
    onClickClose: {
        default: boolean;
        type: BooleanConstructor;
    };
    disabled: {
        default: boolean;
        type: BooleanConstructor;
    };
    divider: {
        default: boolean;
        type: BooleanConstructor;
    };
}, {
    clickClose: () => void;
    hoverx: Ref<boolean>;
    vsDropDownItem: Ref<boolean>;
    color: Ref<string>;
    giveColor: (opacity?: number) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    disabled: boolean;
    onClickClose: boolean;
    divider: boolean;
} & {
    to?: unknown;
}>, {
    disabled: boolean;
    onClickClose: boolean;
    divider: boolean;
}>;
export default _default;
