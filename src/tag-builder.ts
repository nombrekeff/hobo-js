import { AttrSet } from './attributes';
import { ClassName } from './class-name';
import { Tag } from './tag';
import { CssProperty } from './custom-types/css-properties';
import { PickPropertyValues } from './custom-types/css-property-values';
import { TagName, ValidTagName, allKnownTags, selfClosingTags, storableTags } from './custom-types/tag-names';
import { StyleMap, TagMeta, ValidTagChild } from './custom-types/types';

class ExFunc extends Function {
  private __self__: any;

  constructor() {
    super('...args', 'return this.__self__.__call__(...args)');
    var self = this.bind(this);
    this.__self__ = self;
    return self;
  }

  /* istanbul ignore next */
  __call__(...children: ValidTagChild[]) {}
}

/**
 * TagBuilder class, used to build tags of course.
 */
export class TagBuilder extends ExFunc {
  tagName: TagName;
  children: ValidTagChild[] = [];

  /** Get the tag className */
  get className() {
    return this.attr.className;
  }

  /** Get the tag id */
  get tagId() {
    return this.attr.id;
  }

  /**
   * Do not modify directly, use helper methods in the tag instead.
   */
  attr: AttrSet = new AttrSet();

  _parent: Tag;
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

  copy() {
    const newBuilder = new TagBuilder(this.tagName, ...this.children);
    newBuilder.attr = this.attr.copy();
    newBuilder._parent = this._parent;
    newBuilder._meta = { ...this._meta, ...newBuilder._meta };
    return newBuilder;
  }

  /** Sets and validates the tag name */
  setTagName(name: string) {
    this.tagName = this.sanitizeTagName(name);
    this.validateTagName(this.tagName);
    this._meta = {
      ...this._meta,
      ...this.getMetaForTag(this.tagName),
    };
    return this;
  }

  /**
   * Build the tag with additional children
   */
  b(...children: ValidTagChild[]): Tag {
    return this.__call__(...children);
  }

  __call__(...children: ValidTagChild[]): Tag {
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

  /** Set the parent of the tag. If a parent is set, this tag will be added as a child when built */
  p(parent: Tag) {
    const copy = this.copy();
    copy._parent = parent;
    return copy;
  }

  /**
   * Set the id of the tag
   * Can't be empty
   */
  id<T extends string>(newId: T extends '' ? never : T) {
    const copy = this.copy();
    copy.attr.id = newId;
    return copy;
  }

  /** replaces the children of this tag with the provided string */
  text(content: string) {
    const copy = this.copy();
    copy.children = [content];
    return copy;
  }

  /**
   * Adds tags as children if the tag can have children.
   * For example, if tag is `img` there's no need to add the childre as they will not be generated.
   */
  append(...tags: ValidTagChild[]) {
    if (this._meta.selfClosing) {
      return this;
    }

    const copy = this.copy();
    copy.children.push(...tags.map((c) => (c instanceof TagBuilder ? c.b() : c)));

    return copy;
  }

  /** Set the children of this tag. Replaces any current children */
  setChildren(children: ValidTagChild[]) {
    const copy = this.copy();
    copy.children = children;
    return copy;
  }

  /** Store metadata inside tag. Internal method, you won't need this */
  store(o: any) {
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
  m(fn: (tag: TagBuilder) => void) {
    const copy = this.copy();
    fn(copy);
    return copy;
  }

  /**
   * mc = modify classname
   * If the argument is a function
   *
   * Shortcut for modifying the classnames of a tag. Similar to the `.m` method
   * but it passes the className instead of the complete tag.
   *
   * Retuns a new TagBuilder
   *
   * @example
   * ```ts
   * div(
   *    p("Child1").mc(c => c.add("child-1")),
   *    p("Child1").mc(c => c.add("child-2"))
   * )
   * ```
   */
  mc(arg0: (c: ClassName) => void) {
    const copy = this.copy();
    return copy.m((t) => arg0(t.className));
  }

  /**
   * ac = add classname
   * Adds classNames to this TagBuilder, and returns a new TagBuilder
   */
  ac(...classNames: string[]) {
    const copy = this.copy();
    copy.className.add(...classNames);
    return copy;
  }

  /**
   * rc = remove classname
   * Removes classNames from this TagBuilder, and returns a new TagBuilder
   */
  rc(...classNames: string[]) {
    const copy = this.copy();
    copy.className.remove(...classNames);
    return copy;
  }

  /** Adds attribute, and returns a new TagBuilder */
  aa(key: string, value: string) {
    const copy = this.copy();
    copy.attr.set(key, value);
    return copy;
  }

  /** Adds multiple atributes at once, and returns a new TagBuilder*/
  am(attributes: { [key: string]: string }) {
    const copy = this.copy();
    copy.attr.additionalAttributes = {
      ...copy.attr.additionalAttributes,
      ...attributes,
    };
    return copy;
  }

  /**
   * ra = remove attribute
   * Removes attribute from this TagBuilder, and returns a new TagBuilder
   */
  ra(...attr: string[]) {
    const copy = this.copy();
    copy.attr.remove(...attr);
    return copy;
  }

  /** Adds style, and returns a new TagBuilder*/
  as<T extends CssProperty>(key: T, value: PickPropertyValues<T>) {
    const copy = this.copy();
    copy.attr.style.set(key, value);
    return copy;
  }

  /** Adds style from object, and returns a new TagBuilder */
  ss(styles: StyleMap) {
    const copy = this.copy();
    copy.attr.style.styles = {
      ...copy.attr.style.styles,
      ...styles,
    };
    return copy;
  }

  /**
   * rs = remove styles
   * Removes styles from this TagBuilder, and returns a new TagBuilder
   */
  rs(...styleNames: string[]) {
    const copy = this.copy();
    copy.attr.style.remove(...styleNames);
    return copy;
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
    return tagName.replace(/[^\w\d-_]/, '');
  }
}

function tagBuilder(tagName: TagName, ...children: ValidTagChild[]): TagBuilder {
  return new TagBuilder(tagName, ...children);
}
const tagNames = allKnownTags;

type BuilderFunctions = {
  [key in ValidTagName]: ((...children: ValidTagChild[]) => Tag) & TagBuilder;
} & {
  /**
   * Create a new TagBuilder with specified tagName
   * @example
   * ```ts
   * tag('uknown-tag');
   * ```
   */
  tag: (tagName: TagName, ...children: ValidTagChild[]) => TagBuilder;
};

let fns: Partial<BuilderFunctions> = {
  tag: tagBuilder,
};

for (let tname of tagNames) {
  fns[tname] = tagBuilder(tname);
  // Object.defineProperty(fns, tname, {
  //   enumerable: true,
  //   get(): TagBuilder {
  //     console.log('get');
  //     return tagBuilder(tname);
  //   },
  // });
}

export const builders = fns;
