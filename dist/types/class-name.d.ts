/**
 * Represents a tag's class list.
 */
export declare class ClassName {
    classNames: string[];
    constructor(classNames?: string[]);
    copy(): ClassName;
    /**
     * Returns a string of all the class names separated by spaces.
     */
    raw(): string;
    /** Add one or more class names */
    add(...classNames: string[]): ClassName;
    /** Remove one or more class names */
    remove(...classNames: string[]): ClassName;
    /** Check if a class name is present. */
    has(str: string): boolean;
}
