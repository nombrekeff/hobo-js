"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassName = void 0;
/**
 * Represents a tag's class list.
 */
class ClassName {
    constructor(classNames = []) {
        this.classNames = [];
        this.classNames = classNames;
    }
    copy() {
        const newClassName = new ClassName();
        newClassName.classNames = [...this.classNames];
        return newClassName;
    }
    /**
     * Returns a string of all the class names separated by spaces.
     */
    raw() {
        return this.classNames.join(' ');
    }
    /** Add one or more class names */
    add(...classNames) {
        for (const cn of classNames) {
            if (!this.has(cn)) {
                this.classNames.push(cn);
            }
        }
        return this;
    }
    /** Remove one or more class names */
    remove(...classNames) {
        for (const cn of classNames) {
            if (!this.has(cn))
                return this;
            const index = this.classNames.indexOf(cn);
            this.classNames.splice(index, 1);
        }
        return this;
    }
    /** Check if a class name is present. */
    has(str) {
        return this.classNames.includes(str);
    }
}
exports.ClassName = ClassName;
//# sourceMappingURL=class-name.js.map