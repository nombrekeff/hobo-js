// import * as fs from 'fs';
import { Tag } from './tag';
import { HtmlGenerator } from './generation/html-generator';
import { AttachMode, HoboContext, State, StateProxy, ValidTagChild } from './types/types';
import { builders, TagBuilder } from './tag-builder';
import { TagName, ValidTagName } from './types/tag-names';

let _context: HoboContext = {
  attachedTag: null,
  attachedTagStack: [],
  globalStuff: [],
};

/** Creates a HTML document, with a head and body tags */
export function doc(pageTitle: string = 'New Hobo Document', mode: AttachMode = AttachMode.body) {
  const dhead = builders.head(builders.title(pageTitle));
  const dbody = builders.body();
  const doc = builders.html(dhead, dbody);

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

function makeAttachable(builder: TagBuilder): TagBuilder & { a: TagBuilder } {
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

type BuilderFunctions = {
  [key in ValidTagName]: ((...children: ValidTagChild[]) => Tag) & TagBuilder & { a: TagBuilder };
} & {
  tag: (tagName: TagName, ...children: ValidTagChild[]) => TagBuilder;
};

const exportedTagBuilders: Partial<BuilderFunctions> = {};

for (let key in builders) {
  exportedTagBuilders[key] = makeAttachable(builders[key]);
}

const _generator = new HtmlGenerator();

export function generate(root: Tag) {
  return _generator.generateHtml(root, _context);
}

export default exportedTagBuilders;
