"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttrSet = void 0;
const class_name_1 = require("./class-name");
const style_1 = require("./style");
class AttrSet {
    constructor() {
        this.className = new class_name_1.ClassName();
        this.style = new style_1.StyleSet();
        this.additionalAttributes = {};
    }
    /** Set single attribute */
    set(key, value) {
        this.additionalAttributes[key] = value;
        return this;
    }
    /** Remove single attribute */
    remove(key) {
        this.additionalAttributes[key];
        return this;
    }
    /** Check if an attribute is set */
    has(key) {
        return key in this.additionalAttributes;
    }
}
exports.AttrSet = AttrSet;
//# sourceMappingURL=attributes.js.map