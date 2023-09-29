import { StyleMap } from '../custom-types/types';
export declare class CssGenerator {
    beautify: boolean;
    constructor(beautify?: boolean);
    generateCss(styleSheet: {
        [key: string]: StyleMap;
    } | {
        [key: string]: StyleMap;
    }[]): string;
    generateBlock(selector: string, style: StyleMap): string;
    generateBlockContent(style: StyleMap): string;
    generateStyle(name: string, value: string): string;
}
