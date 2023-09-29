"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleSet = void 0;
class StyleSet {
    constructor() {
        this.styles = {};
    }
    set(key, value) {
        this.styles[key] = value;
        return this;
    }
    remove(key) {
        this.styles[key];
        return this;
    }
    has(key) {
        return this.styles[key] != null;
    }
}
exports.StyleSet = StyleSet;
let s = new StyleSet();
s.styles.color = '';
s.styles['align-content'] = 'center';
//# sourceMappingURL=style.js.map