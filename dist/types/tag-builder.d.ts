import { AttrSet } from './attributes';
import { ClassName } from './class-name';
import { Tag } from './tag';
import { CssProperty } from './custom-types/css-properties';
import { PickPropertyValues } from './custom-types/css-property-values';
import { TagName, ValidTagName } from './custom-types/tag-names';
import { StyleMap, TagMeta, ValidTagChild } from './custom-types/types';
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
     * Build the tag with additional children
     */
    b(...children: ValidTagChild[]): Tag;
    __call__(...children: ValidTagChild[]): Tag;
    /** Attach to the currently attached tag in the global hobo context */
    get a(): TagBuilder;
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
     * mc = modify classname
     * If the argument is a function
     *
     * Shortcut for modifying the classnames of a tag. Similar to the `.m` method
     * but it passes the className instead of the complete tag.
     *
     * Retuns a new TagBuilder
     *
     * @example
     * ```ts
     * div(
     *    p("Child1").mc(c => c.add("child-1")),
     *    p("Child1").mc(c => c.add("child-2"))
     * )
     * ```
     */
    mc(arg0: (c: ClassName) => void): TagBuilder;
    /**
     * ac = add classname
     * Adds classNames to this TagBuilder, and returns a new TagBuilder
     */
    ac(...classNames: string[]): TagBuilder;
    /**
     * rc = remove classname
     * Removes classNames from this TagBuilder, and returns a new TagBuilder
     */
    rc(...classNames: string[]): TagBuilder;
    /** Adds attribute, and returns a new TagBuilder */
    aa(key: string, value: string): TagBuilder;
    /** Adds multiple atributes at once, and returns a new TagBuilder*/
    am(attributes: {
        [key: string]: string;
    }): TagBuilder;
    /**
     * ra = remove attribute
     * Removes attribute from this TagBuilder, and returns a new TagBuilder
     */
    ra(...attr: string[]): TagBuilder;
    /** Adds style, and returns a new TagBuilder*/
    as<T extends CssProperty>(key: T, value: PickPropertyValues<T>): TagBuilder;
    /** Adds style from object, and returns a new TagBuilder */
    ss(styles: StyleMap): TagBuilder;
    /**
     * rs = remove styles
     * Removes styles from this TagBuilder, and returns a new TagBuilder
     */
    rs(...styleNames: string[]): TagBuilder;
    private getMetaForTag;
    private isSelfClosingTag;
    private isStorableTag;
    private validateTagName;
    private sanitizeTagName;
}
type BuilderFunctions = {
    [key in ValidTagName]: ((...children: ValidTagChild[]) => Tag) & TagBuilder;
} & {
    /**
     * Create a new TagBuilder with specified tagName
     * @example
     * ```ts
     * tag('uknown-tag');
     * ```
     */
    tag: (tagName: TagName, ...children: ValidTagChild[]) => TagBuilder;
};
export declare const builders: Partial<BuilderFunctions>;
export {};
