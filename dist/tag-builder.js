"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builders = exports.TagBuilder = void 0;
const attributes_1 = require("./attributes");
const tag_1 = require("./tag");
const tag_names_1 = require("./custom-types/tag-names");
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
class TagBuilder extends ExFunc {
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
        this.attr = new attributes_1.AttrSet();
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
     * Build the tag with additional children
     */
    b(...children) {
        return this.__call__(...children);
    }
    __call__(...children) {
        let tagChildren = [...this.children, ...children];
        if (this._meta.storesChildren) {
            this._meta.storage = children;
            tagChildren = [];
        }
        const built = new tag_1.Tag(this.tagName, tagChildren, this.attr, this._meta);
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
        const copy = this.copy();
        fn(copy);
        return copy;
    }
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
    mc(arg0) {
        const copy = this.copy();
        return copy.m((t) => arg0(t.className));
    }
    /**
     * ac = add classname
     * Adds classNames to this TagBuilder, and returns a new TagBuilder
     */
    ac(...classNames) {
        const copy = this.copy();
        copy.className.add(...classNames);
        return copy;
    }
    /**
     * rc = remove classname
     * Removes classNames from this TagBuilder, and returns a new TagBuilder
     */
    rc(...classNames) {
        const copy = this.copy();
        copy.className.remove(...classNames);
        return copy;
    }
    /** Adds attribute, and returns a new TagBuilder */
    aa(key, value) {
        const copy = this.copy();
        copy.attr.set(key, value);
        return copy;
    }
    /** Adds multiple atributes at once, and returns a new TagBuilder*/
    am(attributes) {
        const copy = this.copy();
        copy.attr.additionalAttributes = Object.assign(Object.assign({}, copy.attr.additionalAttributes), attributes);
        return copy;
    }
    /**
     * ra = remove attribute
     * Removes attribute from this TagBuilder, and returns a new TagBuilder
     */
    ra(...attr) {
        const copy = this.copy();
        copy.attr.remove(...attr);
        return copy;
    }
    /** Adds style, and returns a new TagBuilder*/
    as(key, value) {
        const copy = this.copy();
        copy.attr.style.set(key, value);
        return copy;
    }
    /** Adds style from object, and returns a new TagBuilder */
    ss(styles) {
        const copy = this.copy();
        copy.attr.style.styles = Object.assign(Object.assign({}, copy.attr.style.styles), styles);
        return copy;
    }
    /**
     * rs = remove styles
     * Removes styles from this TagBuilder, and returns a new TagBuilder
     */
    rs(...styleNames) {
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
        return tag_names_1.selfClosingTags.includes(tagName);
    }
    isStorableTag(tagName) {
        return tag_names_1.storableTags.includes(tagName);
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
exports.TagBuilder = TagBuilder;
function tagBuilder(tagName, ...children) {
    return new TagBuilder(tagName, ...children);
}
const tagNames = tag_names_1.allKnownTags;
let fns = {
    tag: tagBuilder,
};
for (let tname of tagNames) {
    fns[tname] = tagBuilder(tname);
    // Object.defineProperty(fns, tname, {
    //   enumerable: true,
    //   get(): TagBuilder {
    //     console.log('get');
    //     return tagBuilder(tname);
    //   },
    // });
}
exports.builders = fns;
//# sourceMappingURL=tag-builder.js.map