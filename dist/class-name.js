"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassName = void 0;
class ClassName {
    constructor(classNames = []) {
        this.classNames = [];
        this.classNames = classNames;
    }
    raw() {
        return this.classNames.join(' ');
    }
    add(...classNames) {
        for (const cn of classNames) {
            if (!this.has(cn)) {
                this.classNames.push(cn);
            }
        }
        return this;
    }
    remove(...classNames) {
        for (const cn of classNames) {
            if (!this.has(cn))
                return this;
            const index = this.classNames.indexOf(cn);
            this.classNames.splice(index, 1);
        }
        return this;
    }
    has(str) {
        return this.classNames.includes(str);
    }
}
exports.ClassName = ClassName;
//# sourceMappingURL=class-name.js.map