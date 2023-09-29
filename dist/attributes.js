"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttrSet = void 0;
const class_name_1 = require("./class-name");
const style_1 = require("./style");
/**
 * Represents a tag's attribute set.
 */
class AttrSet {
    constructor() {
        this.className = new class_name_1.ClassName();
        this.style = new style_1.StyleSet();
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
exports.AttrSet = AttrSet;
//# sourceMappingURL=attributes.js.map