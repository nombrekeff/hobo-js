import { AttrSet } from './attributes';
import { ClassName } from './class-name';
import { Tag } from './tag';
import { CssProperty } from './custom-types/css-properties';
import { PickPropertyValues } from './custom-types/css-property-values';
import { TagName, ValidTagName } from './custom-types/tag-names';
import { StyleMap, StyleSet, TagMeta, ValidTagChild } from './custom-types/types';
declare class ExFunc extends Function {
    private __self__;
    constructor();
    __call__(...children: ValidTagChild[]): void;
}
/**
 * TagBuilder class, used to build tags of course.
 */
export declare class TagBuilder extends ExFunc {
    tagName: TagName;
    children: ValidTagChild[];
    /** Get the tag className */
    get className(): ClassName;
    /** Get the tag id */
    get tagId(): string;
    /**
     * Do not modify directly, use helper methods in the tag instead.
     */
    attr: AttrSet;
    _parent: Tag;
    _meta: TagMeta;
    constructor(tagName: TagName, ...children: ValidTagChild[]);
    copy(): TagBuilder;
    /** Sets and validates the tag name */
    setTagName(name: string): this;
    /**
     * Shorthand for `.build` method
     * Build the tag with additional children
     */
    b(...children: ValidTagChild[]): Tag;
    /**
     * Build the tag with additional children
     */
    build(...children: ValidTagChild[]): Tag;
    __call__(...children: ValidTagChild[]): Tag;
    /** Attach to the currently attached tag in the global hobo context */
    get a(): TagBuilder;
    /** Same as .a - Attach to the currently attached tag in the global hobo context */
    get attach(): TagBuilder;
    /** Set the parent of the tag. If a parent is set, this tag will be added as a child when built */
    p(parent: Tag): TagBuilder;
    /**
     * Set the id of the tag
     * Can't be empty
     */
    id<T extends string>(newId: T extends '' ? never : T): TagBuilder;
    /** replaces the children of this tag with the provided string */
    text(content: string): TagBuilder;
    /**
     * Adds tags as children if the tag can have children.
     * For example, if tag is `img` there's no need to add the childre as they will not be generated.
     */
    append(...tags: ValidTagChild[]): TagBuilder;
    /** Set the children of this tag. Replaces any current children */
    setChildren(children: ValidTagChild[]): TagBuilder;
    /** Store metadata inside tag. Internal method, you won't need this */
    store(o: any): TagBuilder;
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
    m(fn: (tag: TagBuilder) => void): TagBuilder;
    /**
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
     *    p("Child1").mod(t => t.className.add("child-1")),
     *    p("Child1").mod(t => t.className.add("child-2"))
     * ])
     * ```
     */
    mod(fn: (tag: TagBuilder) => void): TagBuilder;
    /**
     * Shortcut for method .modClass
     *
     * Modifies the classnames of a tag. Similar to the `.mod` or `.m` methods
     * but it passes the className instead of the complete tag.
     *
     * Retuns a new TagBuilder
     */
    mc(arg0: (c: ClassName) => void): TagBuilder;
    /**
     * Modifies the classnames of a tag. Similar to the `.mod` or `.m` methods
     * but it passes the className instead of the complete tag.
     *
     * Retuns a new TagBuilder
     *
     * @example
     * ```ts
     * div(
     *    p("Child1").modClass(c => c.add("child-1")),
     *    p("Child1").modClass(c => c.add("child-2"))
     * )
     * ```
     */
    modClass(arg0: (c: ClassName) => void): TagBuilder;
    /**
     * Shorthand for .addClass method.
     * Adds classNames to this TagBuilder, and returns a new TagBuilder
     */
    ac(...classNames: string[]): TagBuilder;
    /**
     * Adds classNames to this TagBuilder, and returns a new TagBuilder
     */
    addClass(...classNames: string[]): TagBuilder;
    /**
     * Shorthand for .rmClass method.
     * Removes classNames from this TagBuilder, and returns a new TagBuilder
     */
    rc(...classNames: string[]): TagBuilder;
    /**
     * Removes classNames from this TagBuilder, and returns a new TagBuilder
     */
    rmClass(...classNames: string[]): TagBuilder;
    /**
     * Shorthand for .addAttr method.
     * Adds attribute, and returns a new TagBuilder
     */
    aa(key: string, value: string): TagBuilder;
    /** Add one attribute, and return a new TagBuilder */
    addAttr(key: string, value: string): TagBuilder;
    /**
     * Shorthand for .setAttr method.
     * Sets multiple atributes at once, and returns a new TagBuilder
     */
    sa(attributes: {
        [key: string]: string;
    }): TagBuilder;
    /** Sets multiple atributes at once, and returns a new TagBuilder */
    setAttr(attributes: {
        [key: string]: string;
    }): TagBuilder;
    /**
     * Shorthand for .removeAttr method.
     * Removes attribute from this TagBuilder, and returns a new TagBuilder
     */
    ra(...attr: string[]): TagBuilder;
    /**
     * Removes attribute from this TagBuilder, and returns a new TagBuilder
     */
    rmAttr(...attr: string[]): TagBuilder;
    /**
     * Shorthand for .addStyle method
     * Adds a single style, and returns a new TagBuilder
     */
    as<T extends CssProperty>(key: T, value: PickPropertyValues<T>): TagBuilder;
    /**
     * Adds a single style, and returns a new TagBuilder
     */
    addStyle<T extends CssProperty>(key: T, value: PickPropertyValues<T>): TagBuilder;
    /**
     * Shorthand for .setStyles method.
     * Adds style from object, and returns a new TagBuilder
     */
    ss(styles: StyleMap): TagBuilder;
    /** Adds style from object, and returns a new TagBuilder */
    setStyles(styles: StyleMap): TagBuilder;
    /**
     * Shorthand for .removeStyles method.
     * Removes styles from this TagBuilder, and returns a new TagBuilder
     */
    rs(...styleNames: string[]): TagBuilder;
    /**
     * Removes styles from this TagBuilder, and returns a new TagBuilder
     */
    rmStyle(...styleNames: string[]): TagBuilder;
    private getMetaForTag;
    private isSelfClosingTag;
    private isStorableTag;
    private validateTagName;
    private sanitizeTagName;
}
export type PickArgType<T> = T extends 'style' ? StyleSet[] : ValidTagChild[];
type BuilderFunctions = {
    [key in ValidTagName]: ((...children: PickArgType<key>) => Tag) & TagBuilder;
} & {
    /**
     * Create a new TagBuilder with specified tagName
     * @example
     * ```ts
     * tag('uknown-tag');
     * ```
     */
    tag: (tagName: TagName, ...children: PickArgType<typeof tagName>) => TagBuilder;
};
export declare const builders: Partial<BuilderFunctions>;
export {};
