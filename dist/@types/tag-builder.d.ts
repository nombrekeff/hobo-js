import { AttrSet } from './attributes';
import { ClassName } from './class-name';
import { Tag } from './tag';
import { CssProperty } from './types/css-properties';
import { PickPropertyValues } from './types/css-property-values';
import { TagName, ValidTagName } from './types/tag-names';
import { HtmlEventType, StyleMap, TagMeta, ValidTagChild } from './types/types';
declare class ExFunc extends Function {
    private __self__;
    constructor();
    __call__(...children: ValidTagChild[]): void;
}
export declare class TagBuilder extends ExFunc {
    tagName: TagName;
    children: ValidTagChild[];
    get className(): ClassName;
    get tagId(): string;
    /**
     * Do not modify directly, use helper methods in the tag instead.
     */
    attr: AttrSet;
    private _parent;
    _meta: TagMeta;
    constructor(tagName: TagName, ...children: ValidTagChild[]);
    setTagName(name: string): void;
    __call__(...children: ValidTagChild[]): Tag;
    /** Attach to the currently attached tag in the global hobo context */
    get a(): this;
    p(parent: Tag): this;
    private getMetaForTag;
    private isSelfClosingTag;
    private isStorableTag;
    private validateTagName;
    private sanitizeTagName;
    /**
     * Set the id of the tag
     * Can't be empty
     */
    id<T extends string>(newId: T extends '' ? never : T): this;
    /** replaces the children of this tag with the provided string */
    text(content: string): this;
    append(...tags: ValidTagChild[]): this;
    setChildren(children: ValidTagChild[]): this;
    store(o: any): void;
    /**
     * cm = modify
     * calls `fn` with the tag, and returns the tag
     *
     * usefull to change a tag while maintaing chaning
     *
     * @example
     * ```ts
     * div().m(t => t.className.add("Container"))
     *    .div("I'm a child!"),
     * ```
     * @example
     * ```ts
     * div([
     *    p("Child1").m(t => t.className.add("child-1")),
     *    p("Child1").m(t => t.className.add("child-2"))
     * ])
     * ```
     */
    m(fn: (tag: TagBuilder) => void): this;
    /**
     * cm = classname modify
     * If the argument is a function
     *
     * Shortcut for modifying the classnames of a tag. Similar to the `.m` method
     * but it passes the className instead of the complete tag.
     *
     * @example
     * ```ts
     * div([
     *    p("Child1").c(c => c.add("child-1")),
     *    p("Child1").c(c => c.add("child-2"))
     * ])
     * ```
     */
    cm(arg0: (c: ClassName) => void): this;
    /**
     * ca = classname add
     * Adds classNames to this Tag, and retuns this Tag
     */
    ca(...classNames: string[]): this;
    /** Add attribute */
    aa(key: string, value: string): this;
    /** Add multiple atributes at once */
    am(attributes: {
        [key: string]: string;
    }): this;
    /** Add style */
    sa<T extends CssProperty>(key: T, value: PickPropertyValues<T>): this;
    /** Set style as object*/
    ss(styles: StyleMap): this;
    on(event: HtmlEventType, fn: () => void): this;
}
type BuilderFunctions = {
    [key in ValidTagName]: ((...children: ValidTagChild[]) => Tag) & TagBuilder;
} & {
    tag: (tagName: TagName, ...children: ValidTagChild[]) => TagBuilder;
};
export declare const builders: Partial<BuilderFunctions>;
export {};
