import { TagName } from './custom-types/tag-names';
import { AttrSet } from './attributes';
import { FindBy, TagMeta, ValidTagChild } from './custom-types/types';
import { TagBuilder } from './tag-builder';

export class Tag {
  tagName: TagName;

  children: ValidTagChild[] = [];

  attr: AttrSet = new AttrSet();

  _meta: TagMeta = {
    selfClosing: false,
    storesChildren: false,
    storage: false,
  };

  get className() {
    return this.attr.className;
  }
  get tagId() {
    return this.attr.id;
  }

  constructor(tagName: TagName, children: ValidTagChild[] = [], attr: AttrSet, meta: TagMeta) {
    this.tagName = tagName;
    this.children = children;
    this.attr = attr;
    this._meta = meta;
  }

  /** Append children  */
  append(child: ValidTagChild) {
    if (child instanceof TagBuilder) child = child.b();
    this.children.push(child);
  }

  /** Find a child by tag name  */
  findByTagName(targetTagName: TagName): Tag | null {
    return this.findOneBy((t) => t.tagName == targetTagName);
  }

  /** Find a child by custom test  */
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
