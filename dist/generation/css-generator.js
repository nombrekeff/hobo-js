import { camelToDash } from '../util';
export class CssGenerator {
    constructor(beautify = true) {
        this.beautify = beautify;
    }
    generateCss(styleSheet) {
        let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
        let generatedCss = '';
        for (const sheet of stylesheets) {
            for (const key in sheet) {
                generatedCss += this.generateBlock(key, sheet[key]);
            }
        }
        return generatedCss;
    }
    generateBlock(selector, style) {
        let inside = this.generateBlockContent(style);
        return `${camelToDash(selector)} {${inside}}`;
    }
    generateBlockContent(style) {
        let inside = '';
        for (const key in style) {
            if (style[key])
                inside += this.generateStyle(key, style[key]);
        }
        return inside;
    }
    generateStyle(name, value) {
        return `${camelToDash(name)}:${value};`;
    }
}
//# sourceMappingURL=css-generator.js.map