"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssGenerator = void 0;
const util_1 = require("../util");
class CssGenerator {
    constructor(beautify = true) {
        this.beautify = beautify;
    }
    generate(styleSheet) {
        let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
        let generatedCss = '';
        for (const sheet of stylesheets) {
            for (const key in sheet) {
                generatedCss += this._generateBlock(key, sheet[key]);
            }
        }
        return generatedCss;
    }
    _generateBlock(selector, style) {
        let inside = '';
        for (const key in style) {
            if (style[key])
                inside += this._generateStyle(key, style[key]);
        }
        return `${(0, util_1.camelToDash)(selector)} { ${inside} }`;
    }
    _generateStyle(name, value) {
        return `${(0, util_1.camelToDash)(name)}: ${value};`;
    }
}
exports.CssGenerator = CssGenerator;
//# sourceMappingURL=css-generator.js.map