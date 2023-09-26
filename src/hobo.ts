import { AttachMode, HoboContext, ValidTagChild } from './types';
import { Tag, body, head, tag as htag, html } from './tag';
import { TagName } from './tag-names';
export * from './tag';

let _context: HoboContext = {
  attachedTag: null,
  attachedTagStack: [],
};

/** Creates a Tag of name `tagName` with some optional children */
export function tag(tagName: TagName, children: ValidTagChild[] = []) {
  const newTag = htag(tagName, children);

  if (_context.attachedTag) {
    _context.attachedTag.children.push(newTag);
  }

  return newTag;
}

/** Creates a HTML document, with a head and body tags */
export function doc(mode: AttachMode = AttachMode.body): Tag {
  const doc = html([head(), body()]);

  switch (mode) {
    case AttachMode.html:
      attach(doc);
      break;
    case AttachMode.head:
      attach(doc.findByTagName('head') as Tag); // We know there is a head tag
      break;
    case AttachMode.none:
      break;
    default:
    case AttachMode.body:
      attach(doc.findByTagName('body') as Tag); // We know there is a body tag
      break;
  }

  return doc;
}

/**
 * Attach a given tag to the current context.
 * When you attach a tag, this tag will be the "root" for any tag created without a parent.
 *
 * * If there is not attached tag, it will be attached
 * * If there is already a tag attached, it will store the previous tag
 *   and will set the new tag as the root. After finishing using the tag as the root, you can call `@detach`
 *   and return to the previous root node.
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
 * // remember to call detach when you want to go back to the previous root node
 * detach();
 * ```
 */
export function attach(tag: Tag) {
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
  } else {
    _context.attachedTag = null;
  }
}
