export interface VuesaxOptions {
    colors?: VuesaxColors;
}
export interface VuesaxColors {
    [item: string]: any;
    primary: string;
    success: string;
    danger: string;
    warn: string;
    dark: string;
}
export declare const defineVuesaxOptions: (options: VuesaxOptions) => void;
