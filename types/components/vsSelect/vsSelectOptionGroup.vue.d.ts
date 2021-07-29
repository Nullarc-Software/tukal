import { Ref } from "vue";
declare const _default: {
    name: string;
    inheritAttrs: boolean;
    extends: import("vue").DefineComponent<{
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
        componentColor: Ref<string>;
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
    }>;
    props: {
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        value: {
            default: any;
        };
        text: {
            default: any;
        };
    };
    setup(props: any, context: any): {
        optionGroup: Ref<boolean>;
        textFilter: Ref<String>;
        hiddenOptionGroup: Ref<boolean>;
        clickOption: (value: any, label: any) => void;
        labels: import("vue").ComputedRef<string>;
    };
};
export default _default;
