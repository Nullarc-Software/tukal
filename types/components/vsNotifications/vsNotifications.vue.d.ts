declare const _default: import("vue").DefineComponent<{
    notifId: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
    isVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: ObjectConstructor;
        default: any;
    };
    title: {
        type: StringConstructor;
        default: any;
    };
    text: {
        type: StringConstructor;
        default: any;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    border: {
        type: StringConstructor;
        default: any;
    };
    icon: {
        type: StringConstructor;
        default: any;
    };
    onClickClose: {
        type: FunctionConstructor;
        default: any;
    };
    onClick: {
        type: FunctionConstructor;
        default: any;
    };
    buttonClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    flat: {
        type: BooleanConstructor;
        default: boolean;
    };
    onDestroy: {
        type: FunctionConstructor;
        default: any;
    };
    sticky: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: any;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    progressAuto: {
        type: BooleanConstructor;
        default: boolean;
    };
    progress: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    notPadding: {
        type: ObjectConstructor;
        default: any;
    };
    clickClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    classNotification: {
        type: StringConstructor;
        default: any;
    };
}, {
    internalProgress: import("vue").Ref<number>;
    intervalProgress: import("vue").Ref<number>;
    notif: import("vue").Ref<HTMLDivElement>;
    close: typeof close;
    handleClickClose: () => void;
    beforeEnter: (el: any) => void;
    enter: (el: any, done: any) => void;
    leave: (el: any, done: any) => void;
    getProgress: import("vue").ComputedRef<number>;
    clickNoti: () => void;
    isColor: () => boolean;
    transitionClass: import("vue").Ref<({
        [x: number]: string;
        toString: () => string;
        charAt: (pos: number) => string;
        charCodeAt: (index: number) => number;
        concat: (...strings: string[]) => string;
        indexOf: (searchString: string, position?: number) => number;
        lastIndexOf: (searchString: string, position?: number) => number;
        localeCompare: {
            (that: string): number;
            (that: string, locales?: string | string[], options?: Intl.CollatorOptions): number;
        };
        match: {
            (regexp: string | RegExp): RegExpMatchArray;
            (matcher: {
                [Symbol.match](string: string): RegExpMatchArray;
            }): RegExpMatchArray;
        };
        replace: {
            (searchValue: string | RegExp, replaceValue: string): string;
            (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
            (searchValue: {
                [Symbol.replace](string: string, replaceValue: string): string;
            }, replaceValue: string): string;
            (searchValue: {
                [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
            }, replacer: (substring: string, ...args: any[]) => string): string;
        };
        search: {
            (regexp: string | RegExp): number;
            (searcher: {
                [Symbol.search](string: string): number;
            }): number;
        };
        slice: (start?: number, end?: number) => string;
        split: {
            (separator: string | RegExp, limit?: number): string[];
            (splitter: {
                [Symbol.split](string: string, limit?: number): string[];
            }, limit?: number): string[];
        };
        substring: (start: number, end?: number) => string;
        toLowerCase: () => string;
        toLocaleLowerCase: (locales?: string | string[]) => string;
        toUpperCase: () => string;
        toLocaleUpperCase: (locales?: string | string[]) => string;
        trim: () => string;
        readonly length: number;
        substr: (from: number, length?: number) => string;
        valueOf: () => string;
        codePointAt: (pos: number) => number;
        includes: (searchString: string, position?: number) => boolean;
        endsWith: (searchString: string, endPosition?: number) => boolean;
        normalize: {
            (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
            (form?: string): string;
        };
        repeat: (count: number) => string;
        startsWith: (searchString: string, position?: number) => boolean;
        anchor: (name: string) => string;
        big: () => string;
        blink: () => string;
        bold: () => string;
        fixed: () => string;
        fontcolor: (color: string) => string;
        fontsize: {
            (size: number): string;
            (size: string): string;
        };
        italics: () => string;
        link: (url: string) => string;
        small: () => string;
        strike: () => string;
        sub: () => string;
        sup: () => string;
        padStart: (maxLength: number, fillString?: string) => string;
        padEnd: (maxLength: number, fillString?: string) => string;
        trimEnd: () => string;
        trimStart: () => string;
        trimLeft: () => string;
        trimRight: () => string;
        matchAll: (regexp: RegExp) => IterableIterator<RegExpMatchArray>;
        replaceAll: {
            (searchValue: string | RegExp, replaceValue: string): string;
            (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
        };
    } & {
        [Symbol.iterator]: () => IterableIterator<string>;
    })[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").DefineComponent<{
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
}>, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    color: string;
    flat: boolean;
    loading: boolean;
    progress: number;
    square: boolean;
    sticky: boolean;
    isVisible: boolean;
    duration: number;
    notifId: number;
    position: string;
    buttonClose: boolean;
    progressAuto: boolean;
    clickClose: boolean;
} & {
    border?: string;
    icon?: string;
    width?: string;
    text?: string;
    notPadding?: Record<string, any>;
    content?: Record<string, any>;
    title?: string;
    onClickClose?: Function;
    onClick?: Function;
    onDestroy?: Function;
    classNotification?: string;
}>, {
    color: string;
    flat: boolean;
    loading: boolean;
    progress: number;
    border: string;
    square: boolean;
    icon: string;
    width: string;
    text: string;
    sticky: boolean;
    notPadding: Record<string, any>;
    content: Record<string, any>;
    isVisible: boolean;
    title: string;
    duration: number;
    notifId: number;
    position: string;
    onClickClose: Function;
    onClick: Function;
    buttonClose: boolean;
    onDestroy: Function;
    progressAuto: boolean;
    clickClose: boolean;
    classNotification: string;
}>;
export default _default;
