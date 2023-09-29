import { CssProperty } from './custom-types/css-properties';
import { PickPropertyValues } from './custom-types/css-property-values';
export declare class StyleSet {
    styles: {
        [key in CssProperty]?: PickPropertyValues<key>;
    };
    /** Set a single style */
    set<T extends CssProperty>(key: T, value: PickPropertyValues<T>): StyleSet;
    /** Remove a single style */
    remove(key: string): StyleSet;
    /** Check if a style is set */
    has(key: string): boolean;
}
