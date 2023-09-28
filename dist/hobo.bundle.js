define("class-name", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassName = void 0;
    class ClassName {
        constructor(classNames = []) {
            this.classNames = [];
            this.classNames = classNames;
        }
        raw() {
            return this.classNames.join(' ');
        }
        add(...classNames) {
            for (const cn of classNames) {
                if (!this.has(cn)) {
                    this.classNames.push(cn);
                }
            }
            return this;
        }
        remove(...classNames) {
            for (const cn of classNames) {
                if (!this.has(cn))
                    return this;
                const index = this.classNames.indexOf(cn);
                this.classNames.splice(index, 1);
            }
            return this;
        }
        has(str) {
            return this.classNames.includes(str);
        }
    }
    exports.ClassName = ClassName;
});
define("types/css-properties", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/colors", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/css-property-values", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("style", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StyleSet = void 0;
    class StyleSet {
        constructor() {
            this.styles = {};
        }
        set(key, value) {
            this.styles[key] = value;
            return this;
        }
        remove(key) {
            this.styles[key];
            return this;
        }
        has(key) {
            return this.styles[key] != null;
        }
    }
    exports.StyleSet = StyleSet;
    let s = new StyleSet();
    s.styles.color = '';
    s.styles['align-content'] = 'center';
});
define("attributes", ["require", "exports", "class-name", "style"], function (require, exports, class_name_1, style_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AttrSet = void 0;
    class AttrSet {
        constructor() {
            this.className = new class_name_1.ClassName();
            this.style = new style_1.StyleSet();
            this.additionalAttributes = {};
        }
        set(key, value) {
            this.additionalAttributes[key] = value;
            return this;
        }
        remove(key) {
            this.additionalAttributes[key];
            return this;
        }
        has(key) {
            return this.additionalAttributes[key] != null;
        }
    }
    exports.AttrSet = AttrSet;
});
define("tag-names", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.allKnownTags = exports.closingTags = exports.selfClosingTags = void 0;
    exports.selfClosingTags = [
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
    exports.closingTags = [
        'a',
        'abbr',
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
    exports.allKnownTags = [
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
});
define("types/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AttachMode = void 0;
    var AttachMode;
    (function (AttachMode) {
        AttachMode[AttachMode["none"] = 0] = "none";
        AttachMode[AttachMode["body"] = 1] = "body";
        AttachMode[AttachMode["html"] = 2] = "html";
        AttachMode[AttachMode["head"] = 3] = "head";
    })(AttachMode || (exports.AttachMode = AttachMode = {}));
});
define("util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateId = exports.justFnBody = exports.replaceDoubleQuotes = void 0;
    function replaceDoubleQuotes(str) {
        return str.replace(/"/g, "'");
    }
    exports.replaceDoubleQuotes = replaceDoubleQuotes;
    /** Receives a function, and returns just the body of the function as a string */
    function justFnBody(fn) {
        let fnStr = fn.toString();
        fnStr = fnStr.replace(/^(.*{)/, '');
        fnStr = fnStr.replace(/}$/, '');
        fnStr = fnStr.replace(/^\(.*\)\s?=>\s?{/, '');
        return fnStr.trim();
    }
    exports.justFnBody = justFnBody;
    function s4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function generateId() {
        return `_hb${s4() + s4()}`;
    }
    exports.generateId = generateId;
});
define("tag", ["require", "exports", "tag-names", "attributes", "util"], function (require, exports, tag_names_1, attributes_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.byId = exports.byClass = exports.byTag = exports.script = exports.style = exports.meta = exports.title = exports.hr = exports.img = exports.span = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.bold = exports.i = exports.b = exports.p = exports.input = exports.button = exports.section = exports.div = exports.body = exports.head = exports.html = exports.tag = exports.Tag = void 0;
    /**
     * Can throw if the tag name is not valid.
     */
    class Tag {
        get className() {
            return this.attr.className;
        }
        get tagId() {
            return this.attr.id;
        }
        constructor(tagName, children = []) {
            this.children = [];
            // parent: Tag | undefined;
            /**
             * Do not modify directly, use helper methods in the tag instead.
             */
            this.attr = new attributes_1.AttrSet();
            this._meta = {
                selfClosing: false,
                storage: false,
            };
            this.tagName = sanitizeTagName(tagName);
            validateTagName(this.tagName);
            this.children.push(...children.map((t) => {
                // if (t instanceof Tag) t.parent = this;
                return t;
            }));
            this._meta = getMetaForTag(tagName);
        }
        /**
         * Set the id of the tag
         * Can't be empty
         */
        id(newId) {
            this.attr.id = newId;
            return this;
        }
        /** replaces the children of this tag, and replaces with the provided string */
        inside(content) {
            this.children = [content];
            return this;
        }
        div(...children) {
            return this.tag('div', ...children);
        }
        p(...children) {
            return this.tag('p', ...children);
        }
        b(...children) {
            return this.tag('b', ...children);
        }
        i(...children) {
            return this.tag('i', ...children);
        }
        h1(...children) {
            return this.tag('h1', ...children);
        }
        h2(...children) {
            return this.tag('h2', ...children);
        }
        h3(...children) {
            return this.tag('h3', ...children);
        }
        h4(...children) {
            return this.tag('h4', ...children);
        }
        h5(...children) {
            return this.tag('h5', ...children);
        }
        h6(...children) {
            return this.tag('h6', ...children);
        }
        span(...children) {
            return this.tag('span', ...children);
        }
        img(...children) {
            return this.tag('img', ...children);
        }
        style(styles) {
            const newTag = this.tag('style');
            newTag._meta.storage = styles;
            return this;
        }
        script(fn) {
            const newTag = tag('script');
            newTag._meta.storage = fn.toString();
            return this;
        }
        tag(tagName, ...children) {
            const newTag = tag(tagName, ...children);
            console.log(this.tagName + ' > ' + tagName, this._meta);
            if (this._meta.selfClosing) {
                console.log('A child was attempted to be added to a self closing tag. This is not allowed!');
                console.log('Child tag will not be added');
            }
            else {
                this.children.push(newTag);
            }
            return this;
        }
        append(...tags) {
            this.children.push(...tags);
            return this;
        }
        setChildren(children) {
            this.children = children;
            return this;
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
        cm(arg0) {
            return this.m((t) => arg0(t.className));
        }
        /**
         * ca = classname add
         * Adds classNames to this Tag, and retuns this Tag
         */
        ca(...classNames) {
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
        sa(key, value) {
            this.attr.style.set(key, value);
            return this;
        }
        /** Set style as object*/
        ss(styles) {
            this.attr.style.styles = Object.assign(Object.assign({}, this.attr.style.styles), styles);
            return this;
        }
        on(event, fn) {
            this.attr.set(`on${event}`, (0, util_1.replaceDoubleQuotes)((0, util_1.justFnBody)(fn)));
            return this;
        }
        findByTagName(targetTagName) {
            return this.findOneBy(byTag(targetTagName));
        }
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
    exports.Tag = Tag;
    // Tag functions
    function tag(tagName, ...children) {
        return new Tag(tagName, children);
    }
    exports.tag = tag;
    function html(...children) {
        return tag('html', ...children);
    }
    exports.html = html;
    function head(...children) {
        return tag('head', ...children);
    }
    exports.head = head;
    function body(...children) {
        return tag('body', ...children);
    }
    exports.body = body;
    function div(...children) {
        return tag('div', ...children);
    }
    exports.div = div;
    function section(...children) {
        return tag('section', ...children);
    }
    exports.section = section;
    function button(...children) {
        return tag('button', ...children);
    }
    exports.button = button;
    function input(...children) {
        return tag('input', ...children);
    }
    exports.input = input;
    function p(...children) {
        return tag('p', ...children);
    }
    exports.p = p;
    function b(...children) {
        return tag('b', ...children);
    }
    exports.b = b;
    function i(...children) {
        return tag('i', ...children);
    }
    exports.i = i;
    function bold(...children) {
        return tag('bold', ...children);
    }
    exports.bold = bold;
    function h1(...children) {
        return tag('h1', ...children);
    }
    exports.h1 = h1;
    function h2(...children) {
        return tag('h2', ...children);
    }
    exports.h2 = h2;
    function h3(...children) {
        return tag('h3', ...children);
    }
    exports.h3 = h3;
    function h4(...children) {
        return tag('h4', ...children);
    }
    exports.h4 = h4;
    function h5(...children) {
        return tag('h5', ...children);
    }
    exports.h5 = h5;
    function h6(...children) {
        return tag('h6', ...children);
    }
    exports.h6 = h6;
    function span(...children) {
        return tag('span', ...children);
    }
    exports.span = span;
    function img(...children) {
        return tag('img', ...children);
    }
    exports.img = img;
    function hr(...children) {
        return tag('hr', ...children);
    }
    exports.hr = hr;
    function title(...children) {
        return tag('title', ...children);
    }
    exports.title = title;
    function meta(...children) {
        return tag('meta', ...children);
    }
    exports.meta = meta;
    function style(styles) {
        const newTag = tag('style');
        newTag._meta.storage = styles;
        return newTag;
    }
    exports.style = style;
    function script(arg0) {
        const newTag = tag('script');
        if (typeof arg0 === 'function')
            newTag._meta.storage = (0, util_1.justFnBody)(arg0);
        else
            newTag._meta.storage = arg0;
        return newTag;
    }
    exports.script = script;
    // FindBy functions
    function byTag(tagName) {
        return (t) => t.tagName === tagName;
    }
    exports.byTag = byTag;
    function byClass(className) {
        return (t) => t.className.has(className);
    }
    exports.byClass = byClass;
    function byId(id) {
        return (t) => t.tagId === id;
    }
    exports.byId = byId;
    // Utilities
    function getMetaForTag(tagName) {
        return {
            selfClosing: isSelfClosingTag(tagName),
            storage: null,
        };
    }
    function isSelfClosingTag(tagName) {
        return tag_names_1.selfClosingTags.includes(tagName);
    }
    function validateTagName(tagName) {
        if (!/[a-zA-Z_][a-z-A-Z0-9_]*/.test(tagName)) {
            throw new Error(`Invalid tag name "${tagName}"`);
        }
    }
    function sanitizeTagName(tagName) {
        return tagName.replace(/[^\w\d]/, '');
    }
});
define("generation/css-generator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CssGenerator = void 0;
    class CssGenerator {
        constructor(beautify = true) {
            this.beautify = beautify;
        }
        generate(styleSheet) {
            let generatedCss = '';
            for (const key in styleSheet) {
                generatedCss += this._generateBlock(key, styleSheet[key]);
            }
            return generatedCss;
        }
        _generateBlock(selector, style) {
            let inside = '';
            for (const key in style) {
                if (style[key])
                    inside += this._generateStyle(key, style[key]);
            }
            return `${selector} { ${inside} }`;
        }
        _generateStyle(name, value) {
            return `${name}: ${value};`;
        }
    }
    exports.CssGenerator = CssGenerator;
});
define("generation/consts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HOBO_RT_PATH = void 0;
    exports.HOBO_RT_PATH = '../../src/rt/dist/hobo-rt.js';
});
define("generation/html-generator", ["require", "exports", "tag", "generation/css-generator", "tag", "util", "generation/consts"], function (require, exports, tag_1, css_generator_1, tag_2, util_2, consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HtmlGenerator = void 0;
    class HtmlGenerator {
        constructor() {
            this.cssGenerator = new css_generator_1.CssGenerator();
            this.beautifyCss = true;
        }
        generateHtml(rootTag, context) {
            if (context)
                this._handleGlobals(context, rootTag);
            let generatedHtml = this._generateTag(rootTag);
            return generatedHtml; //pretty(generatedHtml);
        }
        _handleGlobals(context, rootTag) {
            const body = rootTag.findByTagName('body');
            const head = rootTag.findByTagName('head');
            if (context.globalStuff.length > 0) {
                let hoboRtSrc = '';
                for (let g of context.globalStuff) {
                    console.log('g', g);
                    if (typeof g == 'string')
                        hoboRtSrc += g;
                    else if (typeof g == 'function')
                        hoboRtSrc += (0, util_2.justFnBody)(g);
                }
                const globalScript = (0, tag_2.script)(hoboRtSrc).id('_hbGlobalScript');
                if (body) {
                    body.children.push(globalScript);
                }
                else {
                    rootTag.children.push(globalScript);
                }
            }
            const hoboRtScript = (0, tag_2.script)('').am({ src: consts_1.HOBO_RT_PATH });
            if (head) {
                head.children.push(hoboRtScript);
            }
            else if (body) {
                body.children.unshift(hoboRtScript);
            }
            else {
                rootTag.children.unshift(hoboRtScript);
            }
        }
        _generateTag(tag) {
            if (tag.tagName == 'style') {
                return this._createTag(tag, this.cssGenerator.generate(tag._meta.storage));
            }
            if (tag.tagName == 'script') {
                console.log('script', tag._meta.storage);
                return this._createTag(tag, tag._meta.storage);
            }
            let inside = '';
            for (const child of tag.children) {
                if (typeof child === 'string') {
                    inside += child;
                }
                else if (child instanceof tag_1.Tag) {
                    inside += this._generateTag(child) + '\n';
                }
                else {
                    throw new Error('Not handled' + child);
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
            let styleContent = '';
            for (const key in tag.attr.style.styles) {
                styleContent += this._style(key, tag.attr.style.styles[key]);
            }
            return this._attr('style', styleContent);
        }
        _attr(name, value) {
            if (!value)
                return '';
            return `${name}="${value}"`;
        }
        _style(name, value) {
            if (!value)
                return '';
            return `${name}: ${value};`;
        }
    }
    exports.HtmlGenerator = HtmlGenerator;
});
define("state", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createState = void 0;
    function createState(state, name) {
        const stateHandler = {
            get(target, prop, receiver) {
                console.log('prop: ', prop, target[prop]);
                if (['valueOf', 'toString', ''].includes(prop)) {
                }
                return target[prop];
            },
        };
        // Kinda wonky, might check out later!
        const proxy = new Proxy(state, stateHandler);
        proxy['state'] = true;
        return proxy;
    }
    exports.createState = createState;
});
define("hobo", ["require", "exports", "tag", "generation/html-generator", "types/types", "state", "tag"], function (require, exports, tag_3, html_generator_1, types_1, state_1, tag_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.render = exports.generate = exports.meta = exports.style = exports.script = exports.img = exports.title = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.hr = exports.input = exports.button = exports.span = exports.p = exports.section = exports.div = exports.head = exports.body = exports.tag = exports.state = exports.detach = exports.attach = exports.doc = exports.byId = exports.byTag = exports.byClass = void 0;
    Object.defineProperty(exports, "byClass", { enumerable: true, get: function () { return tag_4.byClass; } });
    Object.defineProperty(exports, "byTag", { enumerable: true, get: function () { return tag_4.byTag; } });
    Object.defineProperty(exports, "byId", { enumerable: true, get: function () { return tag_4.byId; } });
    let _context = {
        attachedTag: null,
        attachedTagStack: [],
        globalStuff: [],
    };
    /** Creates a HTML document, with a head and body tags */
    function doc(pageTitle = 'New Hobo Document', mode = types_1.AttachMode.body) {
        const dhead = (0, exports.head)((0, exports.title)(pageTitle));
        const dbody = (0, exports.body)();
        const doc = (0, tag_3.html)(dhead, dbody);
        switch (mode) {
            case types_1.AttachMode.html:
                attach(doc);
                break;
            case types_1.AttachMode.head:
                attach(doc.findByTagName('head')); // We know there is a head tag
                break;
            case types_1.AttachMode.none:
                break;
            default:
            case types_1.AttachMode.body:
                attach(doc.findByTagName('body')); // We know there is a body tag
                break;
        }
        return { doc, head: dhead, body: dbody };
    }
    exports.doc = doc;
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
     */
    function attach(tag) {
        if (_context.attachedTag) {
            _context.attachedTagStack.push(_context.attachedTag);
        }
        _context.attachedTag = tag;
    }
    exports.attach = attach;
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
    exports.detach = detach;
    // State
    function state(state, name) {
        const newState = (0, state_1.createState)(state, name);
        _context.globalStuff.push(`hobo.rt.createState(${Object.assign({}, state)})`);
        return newState;
    }
    exports.state = state;
    function attachable(fn) {
        const attach = ((...args) => {
            const tag = fn(...args);
            if (_context.attachedTag) {
                _context.attachedTag.children.push(tag);
            }
            else {
                throw new Error('There is no attached tag.');
            }
            return tag;
        });
        const regular = (...args) => fn(...args);
        regular.a = attach;
        return regular;
    }
    // Make all attachable tags attachable
    exports.tag = attachable(tag_3.tag);
    exports.body = attachable(tag_3.body);
    exports.head = attachable(tag_3.head);
    exports.div = attachable(tag_3.div);
    exports.section = attachable(tag_3.section);
    exports.p = attachable(tag_3.p);
    exports.span = attachable(tag_3.span);
    exports.button = attachable(tag_3.button);
    exports.input = attachable(tag_3.input);
    exports.hr = attachable(tag_3.hr);
    exports.h1 = attachable(tag_3.h1);
    exports.h2 = attachable(tag_3.h2);
    exports.h3 = attachable(tag_3.h3);
    exports.h4 = attachable(tag_3.h4);
    exports.h5 = attachable(tag_3.h5);
    exports.h6 = attachable(tag_3.h6);
    exports.title = attachable(tag_3.title);
    exports.img = attachable(tag_3.img);
    exports.script = attachable(tag_3.script);
    exports.style = attachable(tag_3.style);
    exports.meta = attachable(tag_3.meta);
    // Generation
    const _generator = new html_generator_1.HtmlGenerator();
    function generate(root) {
        return _generator.generateHtml(root, _context);
    }
    exports.generate = generate;
    function diff(obj1, obj2) {
        const result = {};
        if (Object.is(obj1, obj2)) {
            return undefined;
        }
        if (!obj2 || typeof obj2 !== 'object') {
            return obj2;
        }
        Object.keys(obj1 || {})
            .concat(Object.keys(obj2 || {}))
            .forEach((key) => {
            if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
                result[key] = obj2[key];
            }
            if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
                const value = diff(obj1[key], obj2[key]);
                if (value !== undefined) {
                    result[key] = value;
                }
            }
        });
        return result;
    }
    const renderContext = {};
    function render(tag, selector) {
        const parent = document.querySelector(selector);
        // if (renderContext[selector]) {
        //   // Previously rendered!
        //   const tagDiff = diff(tag, { ...renderContext[selector] });
        //   console.log(tag, renderContext[selector]);
        //   console.log(tagDiff);
        // }
        const generated = _generator.generateHtml(tag, _context);
        if (!parent) {
            throw new Error("Can't find item with selector " + selector);
        }
        parent.innerHTML = generated;
        renderContext[selector] = structuredClone(tag);
        console.log(renderContext[selector]);
    }
    exports.render = render;
});
//# sourceMappingURL=hobo.bundle.js.map