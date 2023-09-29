import { CssProperty } from './types/css-properties';
import { PickPropertyValues } from './types/css-property-values';
export declare class StyleSet {
    styles: {
        [key in CssProperty]?: PickPropertyValues<key>;
    };
    set<T extends CssProperty>(key: T, value: PickPropertyValues<T>): this;
    remove(key: string): this;
    has(key: string): boolean;
}
