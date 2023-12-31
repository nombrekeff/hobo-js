import { AttrSet } from './attributes';
import { TagBuilder } from './tag-builder';
/**
 * Represents an html tag
 */
export class Tag {
    get className() {
        return this.attr.className;
    }
    get tagId() {
        return this.attr.id;
    }
    constructor(tagName, children, attr, meta) {
        this.children = [];
        this.attr = new AttrSet();
        this._meta = {
            selfClosing: false,
            storesChildren: false,
            storage: false,
        };
        this.tagName = tagName;
        this.children = children;
        this.attr = attr;
        this._meta = meta;
    }
    /** Append children  */
    append(child) {
        if (child instanceof TagBuilder)
            child = child.b();
        this.children.push(child);
    }
    /** Find a child by tag name  */
    findByTagName(targetTagName) {
        return this.findOneBy((t) => t.tagName == targetTagName);
    }
    /** Find a child by custom test  */
    findOneBy(test) {
        const stack = [];
        stack.push(this);
        while (stack.length > 0) {
            let tag = stack.pop();
            if (test(tag)) {
                return tag;
            }
            else if (tag.children && tag.children.length) {
                for (let ii = 0; ii < tag.children.length; ii += 1) {
                    if (this.children[ii] instanceof Tag) {
                        stack.push(tag.children[ii]);
                    }
                }
            }
        }
        return null;
    }
}
//# sourceMappingURL=tag.js.map