import { Router } from "vue-router";
declare class ComponentConstants {
    static router: Router;
    static iconPackGlobal: string;
}
declare const _default: import("vue").DefineComponent<{
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
    approuter: Router;
}, {}, {
    isColorDark(): any;
    isColor(): boolean;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    primary: boolean;
    success: boolean;
    danger: boolean;
    dark: boolean;
    warn: boolean;
    active: boolean;
    colorSecondary: string;
} & {
    color?: string;
    textColor?: string;
}>, {
    color: string;
    primary: boolean;
    success: boolean;
    danger: boolean;
    dark: boolean;
    warn: boolean;
    active: boolean;
    colorSecondary: string;
    textColor: string;
}>;
export default _default;
export { ComponentConstants };
