declare const _default: {
    darken(color: string, percent: number): string;
    getColor(colorx: string, alphax?: number, defaultx?: boolean): string;
    RandomColor(): string;
    rColor(colorx: string, opacity?: number): string;
    contrastColor(elementx: string): boolean;
    setCssVariable(propertyName: string, value: any): void;
    hexToRgb(hex: string): {
        r: number;
        g: number;
        b: number;
    };
    getVariable(styles: any, propertyName: string): string;
    changeColor(colorInicial: string): any;
    isColorDark(props: any): any;
    isColor(colorx: string): boolean;
    isColorDefault(props: any): boolean;
};
export default _default;
