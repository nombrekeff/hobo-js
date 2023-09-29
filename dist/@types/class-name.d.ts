export declare class ClassName {
    classNames: string[];
    constructor(classNames?: string[]);
    raw(): string;
    add(...classNames: string[]): ClassName;
    remove(...classNames: string[]): ClassName;
    has(str: string): boolean;
}
