import { NestedStyleMap, StyleMap } from '../custom-types/types';
export declare class CssGenerator {
    generateCss(styleSheet: {
        [key: string]: NestedStyleMap;
    } | {
        [key: string]: NestedStyleMap;
    }[]): string;
    generateBlock(selector: string, style: NestedStyleMap): string;
    generateBlockContent(selector: string, style: NestedStyleMap): string[];
    generateInline(style: StyleMap): string;
    generateStyle(name: string, value: string): string;
}
