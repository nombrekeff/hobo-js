import { ClassName } from './class-name';
import { AttrSet, FindBy, TagMeta, ValidTagChild } from './types';
import { Style } from './style';
import { TagName, selfClosingTags } from './tag-names';

export class Tag {
  tagName: TagName;
  children: ValidTagChild[] = [];
  /**
   * Do not modify directly, use helper methods and functions instead.
   *
   * For example instead of changin the className here, use either `this.className` or `.m` method
   */
  attr: AttrSet = {
    className: new ClassName(),
    id: undefined,
    style: new Style(),
  };

  _meta: TagMeta = {
    selfClosing: false,
  };

  get className() {
    return this.attr.className;
  }
  get tagId() {
    return this.attr.id;
  }

  constructor(tagName: TagName, children: ValidTagChild[] = []) {
    this.tagName = tagName;
    this.children.push(...children);
  }

  /**
   * Set the id of the tag
   * Can't be empty
   */
  id<T extends string>(newId: T extends '' ? never : T): Tag {
    this.attr.id = newId;
    return this;
  }

  div(children: ValidTagChild[] = []): Tag {
    return tag('div', children) as Tag;
  }

  p(children: ValidTagChild[] = []): Tag {
    return tag('p', children) as Tag;
  }

  span(children: ValidTagChild[] = []): Tag {
    return tag('span', children) as Tag;
  }

  img(children: ValidTagChild[] = []) {
    return tag('img', children);
  }

  tag(tagName: TagName, children: ValidTagChild[] = []): Tag {
    const newTag = tag(tagName, children);
    this.children.push(newTag as any);
    return newTag;
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
   *  Adds classNames to this Tag, and retuns this Tag
   */
  ca(...classNames: string[]) {
    this.className.add(...classNames);
    return this;
  }

  findByTagName(targetTagName: TagName) {
    return this.findOneBy(byTag(targetTagName));
  }

  findOneBy(test: FindBy) {
    const stack: Tag[] = [];
    stack.push(this);

    while (stack.length > 0) {
      let node: Tag = stack.pop() as Tag;
      if (test(node)) {
        return node;
      } else if (node.children && node.children.length) {
        for (let ii = 0; ii < node.children.length; ii += 1) {
          if (this.children[ii] instanceof Tag) {
            stack.push(node.children[ii] as Tag);
          }
        }
      }
    }

    // Didn't find it. Return null.
    return null;
  }
}

// Tag functions
export function tag(tagName: TagName, children: ValidTagChild[] = []): Tag {
  let newTag = new Tag(tagName, children);
  newTag._meta = getMetaForTag(tagName);

  return newTag;
}

export function html(children: ValidTagChild[] = []) {
  return tag('html', children) as Tag;
}
export function head(children: ValidTagChild[] = []) {
  return tag('head', children) as Tag;
}
export function body(children: ValidTagChild[] = []) {
  return tag('body', children) as Tag;
}

export function div(children: ValidTagChild[] = []) {
  return tag('div', children) as Tag;
}
export function section(children: ValidTagChild[] = []) {
  return tag('section', children) as Tag;
}
export function p(children: ValidTagChild[] = []) {
  return tag('p', children) as Tag;
}
export function span(children: ValidTagChild[] = []) {
  return tag('span', children) as Tag;
}
export function img(children: ValidTagChild[] = []) {
  return tag('img', children);
}
export function hr(children: ValidTagChild[] = []) {
  return tag('hr', children);
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
  };
}
function isSelfClosingTag(tagName: string) {
  return selfClosingTags.includes(tagName);
}

// type SelfClosingTag =
//   | 'area'
//   | 'base'
//   | 'br'
//   | 'col'
//   | 'embed'
//   | 'hr'
//   | 'img'
//   | 'input'
//   | 'link'
//   | 'meta'
//   | 'param'
//   | 'source'
//   | 'track'
//   | 'wbr';
// type VoidTag = {};
// type Tag = {};

// function text<T extends string>(tag: T): T extends SelfClosingTag ? VoidTag : Tag {
//   return "" as Tag;
// };

// text('area'); // return type should be VoidTag
// text('div'); // return type should be Tag
