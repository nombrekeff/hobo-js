import { AttrSet } from './attributes';
import { ClassName } from './class-name';
import { Tag } from './tag';
import { CssProperty } from './types/css-properties';
import { PickPropertyValues } from './types/css-property-values';
import { TagName, ValidTagName, allKnownTags, selfClosingTags, storableTags } from './types/tag-names';
import { FindBy, HtmlEventType, StyleMap, TagMeta, ValidTagChild } from './types/types';
import { replaceDoubleQuotes, justFnBody } from './util';

class ExFunc extends Function {
  private __self__: any;

  constructor() {
    super('...args', 'return this.__self__.__call__(...args)');
    var self = this.bind(this);
    this.__self__ = self;
    return self;
  }

  __call__(...children: ValidTagChild[]) {}
}

export class TagBuilder extends ExFunc {
  tagName: TagName;
  children: ValidTagChild[] = [];

  get className() {
    return this.attr.className;
  }
  get tagId() {
    return this.attr.id;
  }

  /**
   * Do not modify directly, use helper methods in the tag instead.
   */
  attr: AttrSet = new AttrSet();

  private _parent: Tag;

  _meta: TagMeta = {
    selfClosing: false,
    storesChildren: false,
    storage: false,
  };

  constructor(tagName: TagName, ...children: ValidTagChild[]) {
    super();
    this.setTagName(tagName);
    this.children.push(...children);
  }

  setTagName(name: string) {
    this.tagName = this.sanitizeTagName(name);
    this.validateTagName(this.tagName);
    this._meta = {
      ...this._meta,
      ...this.getMetaForTag(this.tagName),
    };
  }

  b(...children: ValidTagChild[]) {
    return this.__call__(...children);
  }

  __call__(...children: ValidTagChild[]) {
    let tagChildren = [...children, ...this.children];
    
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
  get a() {
    return this;
  }

  p(parent: Tag) {
    this._parent = parent;
    return this;
  }

  // Utilities
  private getMetaForTag(tagName: TagName): TagMeta {
    return {
      selfClosing: this.isSelfClosingTag(tagName),
      storesChildren: this.isStorableTag(tagName),
      storage: null,
    };
  }

  private isSelfClosingTag(tagName: string) {
    return selfClosingTags.includes(tagName);
  }
  private isStorableTag(tagName: string) {
    return storableTags.includes(tagName);
  }
  private validateTagName(tagName: TagName) {
    if (!/[a-zA-Z_][a-z-A-Z0-9_]*/.test(tagName)) {
      throw new Error(`Invalid tag name "${tagName}"`);
    }
  }

  private sanitizeTagName(tagName: TagName) {
    return tagName.replace(/[^\w\d]/, '');
  }

  /**
   * Set the id of the tag
   * Can't be empty
   */
  id<T extends string>(newId: T extends '' ? never : T) {
    this.attr.id = newId;
    return this;
  }

  /** replaces the children of this tag with the provided string */
  text(content: string) {
    this.children = [content];
    return this;
  }

  append(...tags: ValidTagChild[]) {
    if (this._meta.selfClosing) {
      return;
    }

    this.children.push(...tags);
    return this;
  }

  setChildren(children: ValidTagChild[]) {
    this.children = children;
    return this;
  }

  store(o: any) {
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
  m(fn: (tag: TagBuilder) => void) {
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
  ac(...classNames: string[]) {
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
  as<T extends CssProperty>(key: T, value: PickPropertyValues<T>) {
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
}

function tagBuilder(tagName: TagName, ...children: ValidTagChild[]): TagBuilder {
  return new TagBuilder(tagName, ...children);
}
const tagNames = allKnownTags;

type BuilderFunctions = {
  [key in ValidTagName]: ((...children: ValidTagChild[]) => Tag) & TagBuilder;
} & {
  tag: (tagName: TagName, ...children: ValidTagChild[]) => TagBuilder;
};

const fns: Partial<BuilderFunctions> = {
  tag: tagBuilder,
};

for (let tname of tagNames) {
  fns[tname] = tagBuilder(tname);
}

export const builders = fns;
