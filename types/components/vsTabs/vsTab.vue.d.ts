import { Ref } from "vue";
declare const _default: import("vue").DefineComponent<{
    label: {
        default: string;
        type: StringConstructor;
    };
    icon: {
        default: string;
        type: StringConstructor;
    };
    tag: {
        default: string;
        type: StringConstructor;
    };
    iconPack: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    noTransitions: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    noTransitions: Ref<Boolean>;
    vertical: Ref<boolean>;
    active: Ref<boolean>;
    id: any;
    invert: Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    icon: string;
    label: string;
    iconPack: string;
    disabled: boolean;
    tag: string;
    noTransitions: boolean;
} & {}>, {
    icon: string;
    label: string;
    iconPack: string;
    disabled: boolean;
    tag: string;
    noTransitions: boolean;
}>;
export default _default;
