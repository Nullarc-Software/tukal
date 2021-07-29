/**
 * The Popper component.
 */
declare const Placement: readonly ["auto", "auto-start", "auto-end", "top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-start", "right-end", "left", "left-start", "left-end"];
export declare type PlacementType = typeof Placement[number];
declare const _default: import("vue").DefineComponent<{
    /**
     * Preferred [placement](https://popper.js.org/docs/v2/constructors/#options)
     */
    placement: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Customize the [offset](https://popper.js.org/docs/v2/modifiers/offset/) of the popper
     */
    offsetX: {
        type: StringConstructor;
        default: string;
    };
    offsetY: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Show the popper on hover
     */
    hover: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * Add an arrow to the popper
     */
    arrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Stop arrow from reaching the edge of the Popper
     */
    arrowPadding: {
        type: StringConstructor;
        default: string;
    };
    cursorPointer: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    hideFn: any;
    isOpen: any;
    popperNode: any;
    triggerNode: any;
    toggle: any;
    hide: any;
    listeners: import("vue").ComputedRef<{
        focus: () => void;
        blur: () => void;
        mouseover: any;
        mouseleave: any;
    } | {
        focus: () => void;
        blur: () => void;
        click: any;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("show:popper" | "hide:popper")[], "show:popper" | "hide:popper", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    hover: boolean;
    arrow: boolean;
    placement: string;
    offsetX: string;
    offsetY: string;
    timeout: number;
    arrowPadding: string;
    cursorPointer: boolean;
} & {}>, {
    hover: boolean;
    arrow: boolean;
    placement: string;
    offsetX: string;
    offsetY: string;
    timeout: number;
    arrowPadding: string;
    cursorPointer: boolean;
}>;
export default _default;
