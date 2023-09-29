"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssGenerator = void 0;
var util_1 = require("../util");
var CssGenerator = /** @class */ (function () {
    function CssGenerator(beautify) {
        if (beautify === void 0) { beautify = true; }
        this.beautify = beautify;
    }
    CssGenerator.prototype.generate = function (styleSheet) {
        var stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
        var generatedCss = '';
        for (var _i = 0, stylesheets_1 = stylesheets; _i < stylesheets_1.length; _i++) {
            var sheet = stylesheets_1[_i];
            for (var key in sheet) {
                generatedCss += this._generateBlock(key, sheet[key]);
            }
        }
        return generatedCss;
    };
    CssGenerator.prototype._generateBlock = function (selector, style) {
        var inside = '';
        for (var key in style) {
            if (style[key])
                inside += this._generateStyle(key, style[key]);
        }
        return "".concat((0, util_1.camelToDash)(selector), " { ").concat(inside, " }");
    };
    CssGenerator.prototype._generateStyle = function (name, value) {
        return "".concat((0, util_1.camelToDash)(name), ": ").concat(value, ";");
    };
    return CssGenerator;
}());
exports.CssGenerator = CssGenerator;
