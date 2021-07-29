import { VNode } from "vue";
export interface ChildData {
    label: string;
    icon: string;
    iconPack: string;
    tag: string;
    id: number;
    attrs: Object;
    disabled: boolean;
    vnode: VNode | undefined;
    setActive: Function;
    setInvert: Function;
    setVertical: Function;
}
export declare class TabId {
    tabId: number;
    resetId(): void;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        default: number;
        type: (StringConstructor | NumberConstructor)[];
    };
    color: {
        default: string;
        type: StringConstructor;
    };
    tagColor: {
        default: string;
        type: StringConstructor;
    };
    alignment: {
        default: string;
        type: StringConstructor;
    };
    position: {
        default: string;
        type: StringConstructor;
    };
    noTransitions: {
        type: BooleanConstructor;
        default: boolean;
    };
    headerSize: {
        type: NumberConstructor;
        default: number;
    };
    tabStyle: {
        type: StringConstructor;
        default: string;
    };
}, {
    ul: import("vue").Ref<HTMLUListElement>;
    styleTab: (childId: any) => {
        color: string;
    };
    stylex: import("vue").ComputedRef<{
        top: string;
        left: string;
        width: string;
        height: string;
        background: string;
        boxShadow: string;
        transform: string;
    } | {
        top?: undefined;
        left?: undefined;
        width?: undefined;
        height?: undefined;
        background?: undefined;
        boxShadow?: undefined;
        transform?: undefined;
    }>;
    styleAlignIcon: (icon: any) => {
        display: string;
        "align-items": string;
        "font-size": string;
        cursor: string;
    } | {
        "font-size": string;
        cursor: string;
        display?: undefined;
        "align-items"?: undefined;
    };
    clickTag: (child: any) => void;
    activeChild: (index: any, initialAnimation?: any) => void;
    parseIndex: (index: any) => number;
    tabIdInstance: import("vue").Ref<{
        tabId: number;
        resetId: () => void;
    }>;
    topx: import("vue").Ref<string>;
    heightx: import("vue").Ref<number>;
    hover: import("vue").Ref<boolean>;
    children: import("vue").Ref<{
        label: string;
        icon: string;
        iconPack: string;
        tag: string;
        id: number;
        attrs: {
            constructor: Function;
            toString: () => string;
            toLocaleString: () => string;
            valueOf: () => Object;
            hasOwnProperty: (v: PropertyKey) => boolean;
            isPrototypeOf: (v: Object) => boolean;
            propertyIsEnumerable: (v: PropertyKey) => boolean;
        };
        disabled: boolean;
        vnode: VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        setActive: Function;
        setInvert: Function;
        setVertical: Function;
    }[]>;
    childActive: import("vue").Ref<number>;
    leftx: import("vue").Ref<number>;
    widthx: import("vue").Ref<number>;
    these: import("vue").Ref<boolean>;
    vertical: import("vue").Ref<boolean>;
    active: import("vue").Ref<boolean>;
    id: import("vue").Ref<unknown>;
    invert: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color: string;
    modelValue: string | number;
    tagColor: string;
    alignment: string;
    position: string;
    noTransitions: boolean;
    headerSize: number;
    tabStyle: string;
} & {}>, {
    color: string;
    modelValue: string | number;
    tagColor: string;
    alignment: string;
    position: string;
    noTransitions: boolean;
    headerSize: number;
    tabStyle: string;
}>;
export default _default;
