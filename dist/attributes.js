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
    set(key, value) {
        this.additionalAttributes[key] = value;
        return this;
    }
    remove(key) {
        this.additionalAttributes[key];
        return this;
    }
    has(key) {
        return this.additionalAttributes[key] != null;
    }
}
exports.AttrSet = AttrSet;
//# sourceMappingURL=attributes.js.map