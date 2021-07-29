declare const _default: import("vue").DefineComponent<{
    active: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: any;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    margin: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    icon: {
        type: StringConstructor;
        default: any;
    };
    closeIcon: {
        type: StringConstructor;
        default: string;
    };
    iconPack: {
        type: StringConstructor;
        default: string;
    };
}, {
    alert: import("vue").Ref<HTMLDivElement>;
    styleAlert: import("vue").ComputedRef<{
        background: string;
        boxShadow: string;
        color: string;
    }>;
    styleTitle: import("vue").ComputedRef<{
        boxShadow: string;
    }>;
    beforeEnter: (el: any) => void;
    enter: (el: any, done: any) => void;
    leave: (el: any, done: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color: string;
    active: string | boolean;
    iconPack: string;
    closable: boolean;
    margin: string | boolean;
    closeIcon: string;
} & {
    icon?: string;
    title?: string;
}>, {
    color: string;
    icon: string;
    active: string | boolean;
    title: string;
    iconPack: string;
    closable: boolean;
    margin: string | boolean;
    closeIcon: string;
}>;
export default _default;
