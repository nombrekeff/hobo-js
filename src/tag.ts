import { ClassName } from './class-name';
import { TagName, selfClosingTags } from './types/tag-names';
import { AttrSet } from './attributes';
import { CssProperty } from './types/css-properties';
import { PickPropertyValues } from './types/css-property-values';
import { FindBy, HtmlEventType, StyleMap, TagMeta, ValidTagChild } from './types/types';
import { justFnBody, replaceDoubleQuotes } from './util';

/**
 * Can throw if the tag name is not valid.
 */
export class Tag {
  tagName: TagName;
  children: ValidTagChild[] = [];
  // parent: Tag | undefined;

  /**
   * Do not modify directly, use helper methods in the tag instead.
   */
  attr: AttrSet = new AttrSet();

  _meta: TagMeta = {
    selfClosing: false,
    storage: false,
  };

  get className() {
    return this.attr.className;
  }
  get tagId() {
    return this.attr.id;
  }

  constructor(tagName: TagName, children: ValidTagChild[] = []) {
    this.tagName = sanitizeTagName(tagName);
    validateTagName(this.tagName);
    this.children.push(
      ...children.map((t) => {
        // if (t instanceof Tag) t.parent = this;
        return t;
      }),
    );
    this._meta = getMetaForTag(tagName);
  }

  /**
   * Set the id of the tag
   * Can't be empty
   */
  id<T extends string>(newId: T extends '' ? never : T): Tag {
    this.attr.id = newId;
    return this;
  }

  /** replaces the children of this tag, and replaces with the provided string */
  inside(content: string) {
    this.children = [content];
    return this;
  }

  div(...children: ValidTagChild[]): Tag {
    return this.tag('div', ...children);
  }

  p(...children: ValidTagChild[]): Tag {
    return this.tag('p', ...children);
  }
  b(...children: ValidTagChild[]) {
    return this.tag('b', ...children);
  }
  i(...children: ValidTagChild[]) {
    return this.tag('i', ...children);
  }
  h1(...children: ValidTagChild[]) {
    return this.tag('h1', ...children);
  }
  h2(...children: ValidTagChild[]) {
    return this.tag('h2', ...children);
  }
  h3(...children: ValidTagChild[]) {
    return this.tag('h3', ...children);
  }
  h4(...children: ValidTagChild[]) {
    return this.tag('h4', ...children);
  }
  h5(...children: ValidTagChild[]) {
    return this.tag('h5', ...children);
  }
  h6(...children: ValidTagChild[]) {
    return this.tag('h6', ...children);
  }
  span(...children: ValidTagChild[]): Tag {
    return this.tag('span', ...children);
  }
  img(...children: ValidTagChild[]) {
    return this.tag('img', ...children);
  }

  style(styles: { [key: string]: StyleMap }) {
    const newTag = this.tag('style');
    newTag._meta.storage = styles;
    return this;
  }

  script(fn: () => {}) {
    const newTag = tag('script');
    newTag._meta.storage = fn.toString();
    return this;
  }

  tag(tagName: TagName, ...children: ValidTagChild[]): Tag {
    const newTag = tag(tagName, ...children);
    console.log(this.tagName + ' > ' + tagName, this._meta);
    if (this._meta.selfClosing) {
      console.log('A child was attempted to be added to a self closing tag. This is not allowed!');
      console.log('Child tag will not be added');
    } else {
      this.children.push(newTag);
    }
    return this;
  }

  append(...tags: ValidTagChild[]) {
    this.children.push(...tags);
    return this;
  }

  setChildren(children: ValidTagChild[]) {
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
  m(fn: (tag: Tag) => void) {
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
  cm(arg0: (c: ClassName) => void) {
    return this.m((t) => arg0(t.className));
  }

  /**
   * ca = classname add
   * Adds classNames to this Tag, and retuns this Tag
   */
  ca(...classNames: string[]) {
    this.className.add(...classNames);
    return this;
  }

  /** Add attribute */
  aa(key: string, value: string) {
    this.attr.set(key, value);
    return this;
  }

  /** Add multiple atributes at once */
  am(attributes: { [key: string]: string }) {
    this.attr.additionalAttributes = {
      ...this.attr.additionalAttributes,
      ...attributes,
    };
    return this;
  }

  /** Add style */
  sa<T extends CssProperty>(key: T, value: PickPropertyValues<T>) {
    this.attr.style.set(key, value);
    return this;
  }

  /** Set style as object*/
  ss(styles: StyleMap) {
    this.attr.style.styles = {
      ...this.attr.style.styles,
      ...styles,
    };
    return this;
  }

  on(event: HtmlEventType, fn: () => void) {
    this.attr.set(`on${event}`, replaceDoubleQuotes(justFnBody(fn)));
    return this;
  }

  findByTagName(targetTagName: TagName) {
    return this.findOneBy(byTag(targetTagName));
  }

  findOneBy(test: FindBy): Tag | null {
    const stack: Tag[] = [];
    stack.push(this);

    while (stack.length > 0) {
      let tag: Tag = stack.pop() as Tag;

      if (test(tag)) {
        return tag;
      } else if (tag.children && tag.children.length) {
        for (let ii = 0; ii < tag.children.length; ii += 1) {
          if (this.children[ii] instanceof Tag) {
            stack.push(tag.children[ii] as Tag);
          }
        }
      }
    }

    return null;
  }
}

// Tag functions
export function tag(tagName: TagName, ...children: ValidTagChild[]): Tag {
  return new Tag(tagName, children);
}

export function html(...children: ValidTagChild[]) {
  return tag('html', ...children);
}
export function head(...children: ValidTagChild[]) {
  return tag('head', ...children);
}
export function body(...children: ValidTagChild[]) {
  return tag('body', ...children);
}
export function div(...children: ValidTagChild[]) {
  return tag('div', ...children);
}
export function section(...children: ValidTagChild[]) {
  return tag('section', ...children);
}
export function button(...children: ValidTagChild[]) {
  return tag('button', ...children);
}
export function input(...children: ValidTagChild[]) {
  return tag('input', ...children);
}
export function p(...children: ValidTagChild[]) {
  return tag('p', ...children);
}
export function b(...children: ValidTagChild[]) {
  return tag('b', ...children);
}
export function i(...children: ValidTagChild[]) {
  return tag('i', ...children);
}
export function bold(...children: ValidTagChild[]) {
  return tag('bold', ...children);
}
export function h1(...children: ValidTagChild[]) {
  return tag('h1', ...children);
}
export function h2(...children: ValidTagChild[]) {
  return tag('h2', ...children);
}
export function h3(...children: ValidTagChild[]) {
  return tag('h3', ...children);
}
export function h4(...children: ValidTagChild[]) {
  return tag('h4', ...children);
}
export function h5(...children: ValidTagChild[]) {
  return tag('h5', ...children);
}
export function h6(...children: ValidTagChild[]) {
  return tag('h6', ...children);
}
export function span(...children: ValidTagChild[]) {
  return tag('span', ...children);
}
export function img(...children: ValidTagChild[]) {
  return tag('img', ...children);
}
export function hr(...children: ValidTagChild[]) {
  return tag('hr', ...children);
}
export function title(...children: ValidTagChild[]) {
  return tag('title', ...children);
}
export function meta(...children: ValidTagChild[]) {
  return tag('meta', ...children);
}
export function style(styles: { [key: string]: StyleMap }) {
  const newTag = tag('style');
  newTag._meta.storage = styles;
  return newTag;
}
export function script(arg0: (() => void) | string) {
  const newTag = tag('script');
  if (typeof arg0 === 'function') newTag._meta.storage = justFnBody(arg0);
  else newTag._meta.storage = arg0;
  return newTag;
}

// FindBy functions
export function byTag(tagName: TagName): FindBy {
  return (t: Tag) => t.tagName === tagName;
}
export function byClass(className: string): FindBy {
  return (t: Tag) => t.className.has(className);
}
export function byId(id: string): FindBy {
  return (t: Tag) => t.tagId === id;
}

// Utilities
function getMetaForTag(tagName: TagName): TagMeta {
  return {
    selfClosing: isSelfClosingTag(tagName),
    storage: null,
  };
}
function isSelfClosingTag(tagName: string) {
  return selfClosingTags.includes(tagName);
}

function validateTagName(tagName: TagName) {
  if (!/[a-zA-Z_][a-z-A-Z0-9_]*/.test(tagName)) {
    throw new Error(`Invalid tag name "${tagName}"`);
  }
}
function sanitizeTagName(tagName: TagName) {
  return tagName.replace(/[^\w\d]/, '');
}
