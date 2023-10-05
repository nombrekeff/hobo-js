/**
 * Represents a set of styles
 */
export class StyleSet {
    constructor() {
        this.styles = {};
    }
    copy() {
        const newStyles = new StyleSet();
        newStyles.styles = Object.assign({}, this.styles);
        return newStyles;
    }
    /** Set a single style */
    set(key, value) {
        this.styles[key] = value;
        return this;
    }
    /** Remove styles */
    remove(...styles) {
        for (const sn of styles) {
            delete this.styles[sn];
        }
        return this;
    }
    /** Check if a style is set */
    has(key) {
        return key in this.styles;
    }
}
//# sourceMappingURL=style.js.map