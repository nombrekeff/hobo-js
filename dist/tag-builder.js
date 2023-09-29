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
    /** Sets and validates the tag name */
    setTagName(name) {
        this.tagName = this.sanitizeTagName(name);
        this.validateTagName(this.tagName);
        this._meta = Object.assign(Object.assign({}, this._meta), this.getMetaForTag(this.tagName));
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
    get a() {
        return this;
    }
    /** Set the parent of the tag. If a parent is set, this tag will be added as a child when built */
    p(parent) {
        this._parent = parent;
        return this;
    }
    /**
     * Set the id of the tag
     * Can't be empty
     */
    id(newId) {
        this.attr.id = newId;
        return this;
    }
    /** replaces the children of this tag with the provided string */
    text(content) {
        this.children = [content];
        return this;
    }
    /**
     * Adds tags as children if the tag can have children.
     * For example, if tag is `img` there's no need to add the childre as they will not be generated.
     */
    append(...tags) {
        if (this._meta.selfClosing) {
            return this;
        }
        this.children.push(...tags.map((c) => (c instanceof TagBuilder ? c.b() : c)));
        return this;
    }
    /** Set the children of this tag. Replaces any current children */
    setChildren(children) {
        this.children = children;
        return this;
    }
    /** Store metadata inside tag. Internal method, you won't need this */
    store(o) {
        this._meta.storage = o;
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
        fn(this);
        return this;
    }
    /**
     * mc = modify classname
     * If the argument is a function
     *
     * Shortcut for modifying the classnames of a tag. Similar to the `.m` method
     * but it passes the className instead of the complete tag.
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
        return this.m((t) => arg0(t.className));
    }
    /**
     * ac = add classname
     * Adds classNames to this Tag, and retuns this Tag
     */
    ac(...classNames) {
        this.className.add(...classNames);
        return this;
    }
    /** Add attribute */
    aa(key, value) {
        this.attr.set(key, value);
        return this;
    }
    /** Add multiple atributes at once */
    am(attributes) {
        this.attr.additionalAttributes = Object.assign(Object.assign({}, this.attr.additionalAttributes), attributes);
        return this;
    }
    /** Add style */
    as(key, value) {
        this.attr.style.set(key, value);
        return this;
    }
    /** Set style as object*/
    ss(styles) {
        this.attr.style.styles = Object.assign(Object.assign({}, this.attr.style.styles), styles);
        return this;
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
        return tagName.replace(/[^\w\d]/, '');
    }
}
exports.TagBuilder = TagBuilder;
function tagBuilder(tagName, ...children) {
    return new TagBuilder(tagName, ...children);
}
const tagNames = tag_names_1.allKnownTags;
const fns = {
    tag: tagBuilder,
};
for (let tname of tagNames) {
    fns[tname] = tagBuilder(tname);
}
exports.builders = fns;
//# sourceMappingURL=tag-builder.js.map