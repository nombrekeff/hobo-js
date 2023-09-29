"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.detach = exports.attach = exports.doc = void 0;
const html_generator_1 = require("./generation/html-generator");
const types_1 = require("./types/types");
const tag_builder_1 = require("./tag-builder");
let _context = {
    attachedTag: null,
    attachedTagStack: [],
    globalStuff: [],
};
/** Creates a HTML document, with a head and body tags */
function doc(pageTitle = 'New Hobo Document', mode = types_1.AttachMode.body) {
    const dhead = tag_builder_1.builders.head(tag_builder_1.builders.title(pageTitle));
    const dbody = tag_builder_1.builders.body();
    const doc = tag_builder_1.builders.html(dhead, dbody);
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
function makeAttachable(builder) {
    Object.defineProperty(builder, 'a', {
        get: () => {
            if (_context.attachedTag) {
                builder.p(_context.attachedTag);
            }
            return builder;
        },
    });
    return builder;
}
const exportedTagBuilders = {};
for (let key in tag_builder_1.builders) {
    exportedTagBuilders[key] = makeAttachable(tag_builder_1.builders[key]);
}
const _generator = new html_generator_1.HtmlGenerator();
function generate(root) {
    return _generator.generateHtml(root, _context);
}
exports.generate = generate;
exports.default = exportedTagBuilders;
//# sourceMappingURL=hobo.js.map