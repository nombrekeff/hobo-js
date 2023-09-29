"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleSet = void 0;
class StyleSet {
    constructor() {
        this.styles = {};
    }
    /** Set a single style */
    set(key, value) {
        this.styles[key] = value;
        return this;
    }
    /** Remove a single style */
    remove(key) {
        this.styles[key];
        return this;
    }
    /** Check if a style is set */
    has(key) {
        return key in this.styles;
    }
}
exports.StyleSet = StyleSet;
//# sourceMappingURL=style.js.map