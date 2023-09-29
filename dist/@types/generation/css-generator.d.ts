import { StyleMap } from '../types/types';
export declare class CssGenerator {
    beautify: boolean;
    constructor(beautify?: boolean);
    generate(styleSheet: {
        [key: string]: StyleMap;
    } | {
        [key: string]: StyleMap;
    }[]): string;
    private _generateBlock;
    private _generateStyle;
}
