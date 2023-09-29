import { ClassName } from './class-name';
import { StyleSet } from './style';
export declare class AttrSet {
    className: ClassName;
    id?: string;
    style: StyleSet;
    additionalAttributes: {
        [key: string]: string;
    };
    set(key: string, value: string): this;
    remove(key: string): this;
    has(key: string): boolean;
}
