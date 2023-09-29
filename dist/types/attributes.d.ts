import { ClassName } from './class-name';
import { StyleSet } from './style';
export declare class AttrSet {
    className: ClassName;
    id?: string;
    style: StyleSet;
    additionalAttributes: {
        [key: string]: string;
    };
    /** Set single attribute */
    set(key: string, value: string): AttrSet;
    /** Remove single attribute */
    remove(key: string): AttrSet;
    /** Check if an attribute is set */
    has(key: string): boolean;
}
