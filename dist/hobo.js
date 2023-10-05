export { Tag } from './tag';
import { HtmlGenerator } from './generation/html-generator';
import { AttachMode } from './custom-types/types';
import { builders as tagBuilders } from './tag-builder';
export { TagBuilder } from './tag-builder';
export let _context = {
    attachedTag: null,
    attachedTagStack: [],
    globalStuff: [],
};
/**
 * Creates an HTML document, with a head and body tags.
 * You can pass in the AttachMode to attach to different tags.
 */
export function doc(pageTitle = 'New Hobo Document', mode = AttachMode.body) {
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
export function attach(tag) {
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
export function detach() {
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
for (let key in tagBuilders) {
    exportedTagBuilders[key] = makeAttachable(tagBuilders[key]);
}
const _generator = new HtmlGenerator();
/** Converts's the Tag tree into a html string */
export function generate(root) {
    return _generator.generateHtml(root);
}
/**
 * TagBuilders for each known tag. From `div` to `acronym`
 */
export const builders = exportedTagBuilders;
//# sourceMappingURL=hobo.js.map