import { CssProperty } from './custom-types/css-properties';
import { PickPropertyValues } from './custom-types/css-property-values';
/**
 * Represents a set of styles
 */
export declare class StyleSet {
    styles: {
        [key in CssProperty]?: PickPropertyValues<key>;
    };
    copy(): StyleSet;
    /** Set a single style */
    set<T extends CssProperty>(key: T, value: PickPropertyValues<T>): StyleSet;
    /** Remove styles */
    remove(...styles: string[]): StyleSet;
    /** Check if a style is set */
    has(key: string): boolean;
}
