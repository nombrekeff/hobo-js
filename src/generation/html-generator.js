"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlGenerator = void 0;
var tag_1 = require("../tag");
var css_generator_1 = require("./css-generator");
var util_1 = require("../util");
var HtmlGenerator = /** @class */ (function () {
    function HtmlGenerator() {
        this.cssGenerator = new css_generator_1.CssGenerator();
        this.beautifyCss = true;
    }
    HtmlGenerator.prototype.generateHtml = function (rootTag, context) {
        var generatedHtml = this._generateTag(rootTag);
        return generatedHtml;
    };
    HtmlGenerator.prototype._generateTag = function (tag) {
        if (tag.tagName == 'style') {
            return this._createTag(tag, this.cssGenerator.generate(tag._meta.storage));
        }
        if (tag.tagName == 'script') {
            return this._createTag(tag, this._generateScriptContent(tag._meta.storage));
        }
        var inside = '';
        for (var _i = 0, _a = tag.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (typeof child === 'string') {
                inside += child;
            }
            else if (child instanceof tag_1.Tag) {
                inside += this._generateTag(child) + '\n';
            }
            else {
                throw new Error('Not handled' + child);
            }
        }
        return this._createTag(tag, inside);
    };
    HtmlGenerator.prototype._createTag = function (tag, inside) {
        var attributesString = this._generateAttributeString(tag);
        var openTag = [tag.tagName, attributesString].filter(function (n) { return n; }).join(' ');
        if (tag._meta.selfClosing) {
            return "<".concat(openTag, "/>");
        }
        return "<".concat(openTag, ">").concat(inside, "</").concat(tag.tagName, ">");
    };
    HtmlGenerator.prototype._generateAttributeString = function (tag) {
        var attributesString = '';
        if (tag.attr.id) {
            attributesString += this._attr('id', tag.attr.id);
        }
        attributesString += this._attr('class', tag.attr.className.raw());
        attributesString += this._generateInlineStyle(tag);
        for (var key in tag.attr.additionalAttributes) {
            attributesString += this._attr(key, tag.attr.additionalAttributes[key]);
        }
        return attributesString;
    };
    HtmlGenerator.prototype._generateInlineStyle = function (tag) {
        var styleContent = '';
        for (var key in tag.attr.style.styles) {
            styleContent += this._style(key, tag.attr.style.styles[key]);
        }
        return this._attr('style', styleContent);
    };
    HtmlGenerator.prototype._generateScriptContent = function (storage) {
        var scriptContent = '';
        if (storage instanceof Function) {
            scriptContent += (0, util_1.justFnBody)(storage);
        }
        else if (storage instanceof Array) {
            for (var _i = 0, storage_1 = storage; _i < storage_1.length; _i++) {
                var fn = storage_1[_i];
                scriptContent += this._generateScriptContent(fn);
            }
        }
        return scriptContent;
    };
    HtmlGenerator.prototype._attr = function (name, value) {
        if (!value)
            return '';
        return "".concat(name, "=\"").concat(value, "\"");
    };
    HtmlGenerator.prototype._style = function (name, value) {
        if (!value)
            return '';
        return "".concat(name, ": ").concat(value, ";");
    };
    return HtmlGenerator;
}());
exports.HtmlGenerator = HtmlGenerator;
