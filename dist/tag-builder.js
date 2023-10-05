import { AttrSet } from './attributes';
import { Tag } from './tag';
import { allKnownTags, selfClosingTags, storableTags } from './custom-types/tag-names';
class ExFunc extends Function {
    constructor() {
        super('...args', 'return this.__self__.__call__(...args)');
        var self = this.bind(this);
        this.__self__ = self;
        return self;
    }
    /* istanbul ignore next */
    __call__(...children) { }
}
/**
 * TagBuilder class, used to build tags of course.
 */
export class TagBuilder extends ExFunc {
    /** Get the tag className */
    get className() {
        return this.attr.className;
    }
    /** Get the tag id */
    get tagId() {
        return this.attr.id;
    }
    constructor(tagName, ...children) {
        super();
        this.children = [];
        /**
         * Do not modify directly, use helper methods in the tag instead.
         */
        this.attr = new AttrSet();
        this._meta = {
            selfClosing: false,
            storesChildren: false,
            storage: false,
        };
        this.setTagName(tagName);
        this.children.push(...children);
    }
    copy() {
        const newBuilder = new TagBuilder(this.tagName, ...this.children);
        newBuilder.attr = this.attr.copy();
        newBuilder._parent = this._parent;
        newBuilder._meta = Object.assign(Object.assign({}, this._meta), newBuilder._meta);
        return newBuilder;
    }
    /** Sets and validates the tag name */
    setTagName(name) {
        this.tagName = this.sanitizeTagName(name);
        this.validateTagName(this.tagName);
        this._meta = Object.assign(Object.assign({}, this._meta), this.getMetaForTag(this.tagName));
        return this;
    }
    /**
     * Shorthand for `.build` method
     * Build the tag with additional children
     */
    b(...children) {
        return this.build(...children);
    }
    /**
     * Build the tag with additional children
     */
    build(...children) {
        return this.__call__(...children);
    }
    __call__(...children) {
        let tagChildren = [...this.children, ...children];
        if (this._meta.storesChildren) {
            this._meta.storage = children;
            tagChildren = [];
        }
        const built = new Tag(this.tagName, tagChildren, this.attr, this._meta);
        if (this._parent) {
            this._parent.children.push(built);
        }
        return built;
    }
    /** Attach to the currently attached tag in the global hobo context */
    /* istanbul ignore next */
    get a() {
        return this.copy();
    }
    /** Same as .a - Attach to the currently attached tag in the global hobo context */
    /* istanbul ignore next */
    get attach() {
        return this.copy();
    }
    /** Set the parent of the tag. If a parent is set, this tag will be added as a child when built */
    p(parent) {
        const copy = this.copy();
        copy._parent = parent;
        return copy;
    }
    /**
     * Set the id of the tag
     * Can't be empty
     */
    id(newId) {
        const copy = this.copy();
        copy.attr.id = newId;
        return copy;
    }
    /** replaces the children of this tag with the provided string */
    text(content) {
        const copy = this.copy();
        copy.children = [content];
        return copy;
    }
    /**
     * Adds tags as children if the tag can have children.
     * For example, if tag is `img` there's no need to add the childre as they will not be generated.
     */
    append(...tags) {
        if (this._meta.selfClosing) {
            return this;
        }
        const copy = this.copy();
        copy.children.push(...tags.map((c) => (c instanceof TagBuilder ? c.b() : c)));
        return copy;
    }
    /** Set the children of this tag. Replaces any current children */
    setChildren(children) {
        const copy = this.copy();
        copy.children = children;
        return copy;
    }
    /** Store metadata inside tag. Internal method, you won't need this */
    store(o) {
        const copy = this.copy();
        copy._meta.storage = o;
        return copy;
    }
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
    m(fn) {
        return this.mod(fn);
    }
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
    mod(fn) {
        const copy = this.copy();
        fn(copy);
        return copy;
    }
    /**
     * Shortcut for method .modClass
     *
     * Modifies the classnames of a tag. Similar to the `.mod` or `.m` methods
     * but it passes the className instead of the complete tag.
     *
     * Retuns a new TagBuilder
     */
    mc(arg0) {
        return this.modClass(arg0);
    }
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
    modClass(arg0) {
        const copy = this.copy();
        return copy.m((t) => arg0(t.className));
    }
    /**
     * Shorthand for .addClass method.
     * Adds classNames to this TagBuilder, and returns a new TagBuilder
     */
    ac(...classNames) {
        return this.addClass(...classNames);
    }
    /**
     * Adds classNames to this TagBuilder, and returns a new TagBuilder
     */
    addClass(...classNames) {
        const copy = this.copy();
        copy.className.add(...classNames);
        return copy;
    }
    /**
     * Shorthand for .rmClass method.
     * Removes classNames from this TagBuilder, and returns a new TagBuilder
     */
    rc(...classNames) {
        return this.rmClass(...classNames);
    }
    /**
     * Removes classNames from this TagBuilder, and returns a new TagBuilder
     */
    rmClass(...classNames) {
        const copy = this.copy();
        copy.className.remove(...classNames);
        return copy;
    }
    /**
     * Shorthand for .addAttr method.
     * Adds attribute, and returns a new TagBuilder
     */
    aa(key, value) {
        return this.addAttr(key, value);
    }
    /** Add one attribute, and return a new TagBuilder */
    addAttr(key, value) {
        const copy = this.copy();
        copy.attr.set(key, value);
        return copy;
    }
    /**
     * Shorthand for .setAttr method.
     * Sets multiple atributes at once, and returns a new TagBuilder
     */
    sa(attributes) {
        return this.setAttr(attributes);
    }
    /** Sets multiple atributes at once, and returns a new TagBuilder */
    setAttr(attributes) {
        const copy = this.copy();
        copy.attr.additionalAttributes = Object.assign(Object.assign({}, copy.attr.additionalAttributes), attributes);
        return copy;
    }
    /**
     * Shorthand for .removeAttr method.
     * Removes attribute from this TagBuilder, and returns a new TagBuilder
     */
    ra(...attr) {
        return this.rmAttr(...attr);
    }
    /**
     * Removes attribute from this TagBuilder, and returns a new TagBuilder
     */
    rmAttr(...attr) {
        const copy = this.copy();
        copy.attr.remove(...attr);
        return copy;
    }
    /**
     * Shorthand for .addStyle method
     * Adds a single style, and returns a new TagBuilder
     */
    as(key, value) {
        return this.addStyle(key, value);
    }
    /**
     * Adds a single style, and returns a new TagBuilder
     */
    addStyle(key, value) {
        const copy = this.copy();
        copy.attr.style.set(key, value);
        return copy;
    }
    /**
     * Shorthand for .setStyles method.
     * Adds style from object, and returns a new TagBuilder
     */
    ss(styles) {
        return this.setStyles(styles);
    }
    /** Adds style from object, and returns a new TagBuilder */
    setStyles(styles) {
        const copy = this.copy();
        copy.attr.style.styles = Object.assign(Object.assign({}, copy.attr.style.styles), styles);
        return copy;
    }
    /**
     * Shorthand for .removeStyles method.
     * Removes styles from this TagBuilder, and returns a new TagBuilder
     */
    rs(...styleNames) {
        return this.rmStyle(...styleNames);
    }
    /**
     * Removes styles from this TagBuilder, and returns a new TagBuilder
     */
    rmStyle(...styleNames) {
        const copy = this.copy();
        copy.attr.style.remove(...styleNames);
        return copy;
    }
    // Utilities
    getMetaForTag(tagName) {
        return {
            selfClosing: this.isSelfClosingTag(tagName),
            storesChildren: this.isStorableTag(tagName),
            storage: null,
        };
    }
    isSelfClosingTag(tagName) {
        return selfClosingTags.includes(tagName);
    }
    isStorableTag(tagName) {
        return storableTags.includes(tagName);
    }
    validateTagName(tagName) {
        if (!/[a-zA-Z_][a-z-A-Z0-9_]*/.test(tagName)) {
            throw new Error(`Invalid tag name "${tagName}"`);
        }
    }
    sanitizeTagName(tagName) {
        return tagName.replace(/[^\w\d-_]/, '');
    }
}
function tagBuilder(tagName, ...children) {
    return new TagBuilder(tagName, ...children);
}
const tagNames = allKnownTags;
let fns = {
    tag: tagBuilder,
};
for (let tname of tagNames) {
    fns[tname] = tagBuilder(tname);
}
export const builders = fns;
//# sourceMappingURL=tag-builder.js.map