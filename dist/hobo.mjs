/**
 * Represents a tag's class list.
 */
class ClassName {
    constructor(classNames = []) {
        this.classNames = [];
        this.classNames = classNames;
    }
    copy() {
        const newClassName = new ClassName();
        newClassName.classNames = [...this.classNames];
        return newClassName;
    }
    /**
     * Returns a string of all the class names separated by spaces.
     */
    raw() {
        return this.classNames.join(' ');
    }
    /** Add one or more class names */
    add(...classNames) {
        for (const cn of classNames) {
            if (!this.has(cn)) {
                this.classNames.push(cn);
            }
        }
        return this;
    }
    /** Remove one or more class names */
    remove(...classNames) {
        for (const cn of classNames) {
            if (!this.has(cn))
                return this;
            const index = this.classNames.indexOf(cn);
            this.classNames.splice(index, 1);
        }
        return this;
    }
    /** Check if a class name is present. */
    has(str) {
        return this.classNames.includes(str);
    }
}

/**
 * Represents a set of styles
 */
class StyleSet {
    constructor() {
        this.styles = {};
    }
    copy() {
        const newStyles = new StyleSet();
        newStyles.styles = Object.assign({}, this.styles);
        return newStyles;
    }
    /** Set a single style */
    set(key, value) {
        this.styles[key] = value;
        return this;
    }
    /** Remove styles */
    remove(...styles) {
        for (const sn of styles) {
            delete this.styles[sn];
        }
        return this;
    }
    /** Check if a style is set */
    has(key) {
        return key in this.styles;
    }
}

/**
 * Represents a tag's attribute set.
 */
class AttrSet {
    constructor() {
        this.className = new ClassName();
        this.style = new StyleSet();
        this.additionalAttributes = {};
    }
    copy() {
        const newSet = new AttrSet();
        newSet.className = this.className.copy();
        newSet.id = this.id;
        newSet.style = this.style.copy();
        newSet.additionalAttributes = Object.assign({}, this.additionalAttributes);
        return newSet;
    }
    /** Set single attribute */
    set(key, value) {
        this.additionalAttributes[key] = value;
        return this;
    }
    /** Remove attributes */
    remove(...attrs) {
        for (const cn of attrs) {
            delete this.additionalAttributes[cn];
        }
        return this;
    }
    /** Check if an attribute is set */
    has(key) {
        return key in this.additionalAttributes;
    }
}

/**
 * @export
 * List of all known self-closing HTML tags
 */
const selfClosingTags = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
];
/** List of all known HTML tags */
const allKnownTags = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
    'a',
    'abbr',
    'acronym',
    'address',
    'article',
    'aside',
    'audio',
    'b',
    'basefont',
    'bdi',
    'bdo',
    'big',
    'blockquote',
    'body',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'html',
    'i',
    'iframe',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'svg',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'u',
    'ul',
    'var',
    'video',
];
const storableTags = ['style', 'script'];

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
const builders$1 = fns;

/**
 * Represents an html tag
 */
class Tag {
    get className() {
        return this.attr.className;
    }
    get tagId() {
        return this.attr.id;
    }
    constructor(tagName, children, attr, meta) {
        this.children = [];
        this.attr = new AttrSet();
        this._meta = {
            selfClosing: false,
            storesChildren: false,
            storage: false,
        };
        this.tagName = tagName;
        this.children = children;
        this.attr = attr;
        this._meta = meta;
    }
    /** Append children  */
    append(child) {
        if (child instanceof TagBuilder)
            child = child.b();
        this.children.push(child);
    }
    /** Find a child by tag name  */
    findByTagName(targetTagName) {
        return this.findOneBy((t) => t.tagName == targetTagName);
    }
    /** Find a child by custom test  */
    findOneBy(test) {
        const stack = [];
        stack.push(this);
        while (stack.length > 0) {
            let tag = stack.pop();
            if (test(tag)) {
                return tag;
            }
            else if (tag.children && tag.children.length) {
                for (let ii = 0; ii < tag.children.length; ii += 1) {
                    if (this.children[ii] instanceof Tag) {
                        stack.push(tag.children[ii]);
                    }
                }
            }
        }
        return null;
    }
}

/** Receives a function, and returns just the body of the function as a string */
function justFnBody(fn) {
    let fnStr = fn.toString();
    fnStr = fnStr.replace(/^(.*{)/, '');
    fnStr = fnStr.replace(/}$/, '');
    fnStr = fnStr.replace(/^\(.*\)\s?=>\s?{/, '');
    return fnStr.trim();
}
const camelToDash = (str) => str.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
function isObject(obj) {
    return typeof obj === 'object' && !(obj instanceof Array);
}

class CssGenerator {
    generateCss(styleSheet) {
        let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
        let generatedCss = '';
        for (const sheet of stylesheets) {
            for (const key in sheet) {
                generatedCss += this.generateBlock(key, sheet[key]);
            }
        }
        return generatedCss;
    }
    generateBlock(selector, style) {
        let blocks = this.generateBlockContent(selector, style);
        return blocks.join('');
    }
    generateBlockContent(selector, style) {
        let inside = '';
        let blocks = [];
        for (const key in style) {
            if (isObject(style[key])) {
                blocks.push(this.generateBlockContent(selector + key, style[key]));
            }
            else if (style[key]) {
                inside += this.generateStyle(key, style[key]);
            }
        }
        blocks.unshift(`${selector}{${inside}}`);
        return blocks;
    }
    generateInline(style) {
        let inside = '';
        for (const key in style) {
            if (style[key]) {
                inside += this.generateStyle(key, style[key]);
            }
        }
        return inside;
    }
    generateStyle(name, value) {
        return `${camelToDash(name)}:${value};`;
    }
}

class HtmlGenerator {
    constructor() {
        this.cssGenerator = new CssGenerator();
        this.beautifyCss = true;
    }
    /** Generate html from the tag provided */
    generateHtml(rootTag) {
        let generatedHtml = this._generateTag(rootTag);
        return generatedHtml;
    }
    _generateTag(tag) {
        if (tag.tagName == 'style') {
            return this._createTag(tag, this.cssGenerator.generateCss(tag._meta.storage));
        }
        if (tag.tagName == 'script') {
            return this._createTag(tag, this._generateScriptContent(tag._meta.storage));
        }
        let inside = '';
        for (const child of tag.children) {
            let effectiveChild = child;
            if (child instanceof TagBuilder) {
                effectiveChild = child.b();
            }
            if (effectiveChild instanceof Tag) {
                inside += this._generateTag(effectiveChild);
            }
            else {
                inside += child;
            }
        }
        return this._createTag(tag, inside);
    }
    _createTag(tag, inside) {
        const attributesString = this._generateAttributeString(tag);
        let openTag = [tag.tagName, attributesString].filter((n) => n).join(' ');
        if (tag._meta.selfClosing) {
            return `<${openTag}/>`;
        }
        return `<${openTag}>${inside}</${tag.tagName}>`;
    }
    _generateAttributeString(tag) {
        let attributesString = '';
        if (tag.attr.id) {
            attributesString += this._attr('id', tag.attr.id);
        }
        attributesString += this._attr('class', tag.attr.className.raw());
        attributesString += this._generateInlineStyle(tag);
        for (const key in tag.attr.additionalAttributes) {
            attributesString += this._attr(key, tag.attr.additionalAttributes[key]);
        }
        return attributesString;
    }
    _generateInlineStyle(tag) {
        let styleContent = this.cssGenerator.generateInline(tag.attr.style.styles);
        return this._attr('style', styleContent);
    }
    _generateScriptContent(storage) {
        let scriptContent = '';
        if (storage instanceof Function) {
            scriptContent += justFnBody(storage);
        }
        else if (storage instanceof Array) {
            for (const fn of storage) {
                scriptContent += this._generateScriptContent(fn);
            }
        }
        return scriptContent;
    }
    _attr(name, value) {
        if (!value)
            return '';
        return `${name}="${value}"`;
    }
}

var AttachMode;
(function (AttachMode) {
    AttachMode[AttachMode["none"] = 0] = "none";
    AttachMode[AttachMode["body"] = 1] = "body";
    AttachMode[AttachMode["html"] = 2] = "html";
    AttachMode[AttachMode["head"] = 3] = "head";
})(AttachMode || (AttachMode = {}));

let _context = {
    attachedTag: null,
    attachedTagStack: [],
    globalStuff: [],
};
/**
 * Creates an HTML document, with a head and body tags.
 * You can pass in the AttachMode to attach to different tags.
 */
function doc(pageTitle = 'New Hobo Document', mode = AttachMode.body) {
    const dhead = builders.head
        .aa('lang', 'en')
        .build(builders.meta.addAttr('charset', 'UTF-8'), builders.meta.setAttr({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }), builders.title(pageTitle));
    const dbody = builders.body.build();
    const doc = builders.html.build(dhead, dbody);
    switch (mode) {
        case AttachMode.html:
            attach(doc);
            break;
        case AttachMode.head:
            attach(doc.findByTagName('head')); // We know there is a head tag
            break;
        case AttachMode.body:
            attach(doc.findByTagName('body')); // We know there is a body tag
            break;
        case AttachMode.none:
            break;
    }
    return { doc, head: dhead, body: dbody };
}
/**
 * Attach a given tag to the current context.
 * When you attach a tag, this tag will be the "root" for any tag created without a parent.
 *
 * * If there is not attached tag, it will be attached
 * * If there is already a tag attached, it will store the previous tag
 *   and will set the new tag as the root. After finishing using the tag as the root, you can call `@detach`
 *   and return to the previous root tag.
 *
 * This is used to remove clutter and reduntancies when creating hobo docs.
 * Like this:
 *
 * @example
 * Simple example with only 1 attach
 * ```ts
 * const parent = doc();
 * attach(parent);
 *
 * div();
 * p();
 * ```
 * The `div` and `p` tags will be automatically added as child of `parentDiv`
 *
 * @example
 * Example attaching and detaching
 * ```ts
 * const parent = doc();
 * attach(parent);
 *
 * div();
 * p();
 * let d1 = div();
 * attach(d1);
 * // All the p tags will be added to `d1`
 * p();
 * p();
 * p();
 * // remember to call detach when you want to go back to the previous root tag
 * detach();
 * ```
 *
 * @param {Tag} tag
 */
function attach(tag) {
    if (_context.attachedTag) {
        _context.attachedTagStack.push(_context.attachedTag);
    }
    _context.attachedTag = tag;
}
/**
 * Detached the currently attached tag, and pops back to the previously attached tag.
 * If there are no stored tags, it will clear the attached tag.
 * You will need to handle the consecuent created tags.
 */
function detach() {
    if (_context.attachedTagStack.length > 0) {
        _context.attachedTag = _context.attachedTagStack.pop();
    }
    else {
        _context.attachedTag = null;
    }
}
function makeAttachable(builder) {
    const attachFn = () => {
        if (_context.attachedTag) {
            return builder.p(_context.attachedTag);
        }
        return builder;
    };
    Object.defineProperty(builder, 'a', {
        get: attachFn,
    });
    Object.defineProperty(builder, 'attach', {
        get: attachFn,
    });
    return builder;
}
const exportedTagBuilders = {};
for (let key in builders$1) {
    exportedTagBuilders[key] = makeAttachable(builders$1[key]);
}
const _generator = new HtmlGenerator();
/** Converts's the Tag tree into a html string */
function generate(root) {
    return _generator.generateHtml(root);
}
/**
 * TagBuilders for each known tag. From `div` to `acronym`
 */
const builders = exportedTagBuilders;

export { Tag, TagBuilder, _context, attach, builders, detach, doc, generate };
