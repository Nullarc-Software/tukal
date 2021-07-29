import { Ref } from 'vue';
declare const _default: import("vue").DefineComponent<{
    open: {
        default: boolean;
        type: BooleanConstructor;
    };
    disabled: {
        default: boolean;
        type: BooleanConstructor;
    };
    notArrow: {
        default: boolean;
        type: BooleanConstructor;
    };
    iconArrow: {
        default: string;
        type: StringConstructor;
    };
    iconPack: {
        default: string;
        type: StringConstructor;
    };
    sst: {
        default: boolean;
        type: BooleanConstructor;
    };
}, {
    mouseover: () => void;
    mouseout: () => void;
    initMaxHeight: () => void;
    maxHeight: Ref<string>;
    accordion: boolean;
    openHover: boolean;
    styleContent: import("vue").ComputedRef<{
        maxHeight: string;
    }>;
    dataReady: Ref<boolean>;
    changeHeight: () => void;
    toggleContent: () => void;
    content: Ref<HTMLDivElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    notArrow: boolean;
    iconPack: string;
    disabled: boolean;
    open: boolean;
    iconArrow: string;
    sst: boolean;
} & {}>, {
    notArrow: boolean;
    iconPack: string;
    disabled: boolean;
    open: boolean;
    iconArrow: string;
    sst: boolean;
}>;
export default _default;
