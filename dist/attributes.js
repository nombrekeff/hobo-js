import { ClassName } from './class-name';
import { StyleSet } from './style';
/**
 * Represents a tag's attribute set.
 */
export class AttrSet {
    constructor() {
        this.className = new ClassName();
        this.style = new StyleSet();
        this.additionalAttributes = {};
    }
    copy() {
        const newSet = new AttrSet();
        newSet.className = this.className.copy();
        newSet.id = this.id;
        newSet.style = this.style.copy();
        newSet.additionalAttributes = Object.assign({}, this.additionalAttributes);
        return newSet;
    }
    /** Set single attribute */
    set(key, value) {
        this.additionalAttributes[key] = value;
        return this;
    }
    /** Remove attributes */
    remove(...attrs) {
        for (const cn of attrs) {
            delete this.additionalAttributes[cn];
        }
        return this;
    }
    /** Check if an attribute is set */
    has(key) {
        return key in this.additionalAttributes;
    }
}
//# sourceMappingURL=attributes.js.map