// import * as fs from 'fs';
import {
  Tag,
  body as hbody,
  head as hhead,
  div as hdiv,
  span as hspan,
  p as hp,
  img as himg,
  section as hsection,
  hr as hhr,
  tag as htag,
  style as hstyle,
  script as hscript,
  title as htitle,
  meta as hmeta,
  input as hinput,
  button as hbutton,
  h1 as hh1,
  h2 as hh2,
  h3 as hh3,
  h4 as hh4,
  h5 as hh5,
  h6 as hh6,
  html,
} from './tag';
import { HtmlGenerator } from './generation/html-generator';
import { AttachMode, HoboContext, State, StateProxy } from './types/types';
import { createState } from './state';
export { byClass, byTag, byId } from './tag';

let _context: HoboContext = {
  attachedTag: null,
  attachedTagStack: [],
  globalStuff: [],
};

/** Creates a HTML document, with a head and body tags */
export function doc(pageTitle: string = 'New Hobo Document', mode: AttachMode = AttachMode.body) {
  const dhead = head(title(pageTitle));
  const dbody = body();
  const doc = html(dhead, dbody);

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

// State
export function state<T extends State>(state: T, name?: string): StateProxy<T> {
  const newState = createState(state, name);
  _context.globalStuff.push(`hobo.rt.createState(${{ ...state }})`);
  return newState;
}

function attachable<T extends (...any: any) => Tag>(
  fn: T,
): T & {
  /** `.a` attaches to the currently attached node tag */
  a: T;
} {
  const attach = ((...args: any[]) => {
    const tag = fn(...args);
    if (_context.attachedTag) {
      _context.attachedTag.children.push(tag);
    } else {
      throw new Error('There is no attached tag.');
    }
    return tag;
  }) as any;

  const regular: any = (...args: any[]) => fn(...args);
  regular.a = attach;
  return regular;
}

// Make all attachable tags attachable
export const tag = attachable(htag);
export const body = attachable(hbody);
export const head = attachable(hhead);
export const div = attachable(hdiv);
export const section = attachable(hsection);
export const p = attachable(hp);
export const span = attachable(hspan);
export const button = attachable(hbutton);
export const input = attachable(hinput);
export const hr = attachable(hhr);
export const h1 = attachable(hh1);
export const h2 = attachable(hh2);
export const h3 = attachable(hh3);
export const h4 = attachable(hh4);
export const h5 = attachable(hh5);
export const h6 = attachable(hh6);
export const title = attachable(htitle);
export const img = attachable(himg);
export const script = attachable(hscript);
export const style = attachable(hstyle);
export const meta = attachable(hmeta);

// Generation

const _generator = new HtmlGenerator();
export function generate(root: Tag) {
  return _generator.generateHtml(root, _context);
}

function diff(obj1: any, obj2: any) {
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

const renderContext: { [selector: string]: any } = {};

export function render(tag: Tag, selector: string): void {
  const parent = document.querySelector(selector) as HTMLElement;
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
  console.log(renderContext[selector])
}
