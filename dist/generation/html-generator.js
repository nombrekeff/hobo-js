"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlGenerator = void 0;
const tag_1 = require("../tag");
const css_generator_1 = require("./css-generator");
const util_1 = require("../util");
const tag_builder_1 = require("../tag-builder");
class HtmlGenerator {
    constructor() {
        this.cssGenerator = new css_generator_1.CssGenerator();
        this.beautifyCss = true;
    }
    /** Generate html from the tag provided */
    generateHtml(rootTag) {
        let generatedHtml = this._generateTag(rootTag);
        return generatedHtml;
    }
    _generateTag(tag) {
        if (tag.tagName == 'style') {
            return this._createTag(tag, this.cssGenerator.generateCss(tag._meta.storage));
        }
        if (tag.tagName == 'script') {
            return this._createTag(tag, this._generateScriptContent(tag._meta.storage));
        }
        let inside = '';
        for (const child of tag.children) {
            let effectiveChild = child;
            if (child instanceof tag_builder_1.TagBuilder) {
                effectiveChild = child.b();
            }
            if (effectiveChild instanceof tag_1.Tag) {
                inside += this._generateTag(effectiveChild);
            }
            else {
                inside += child;
            }
        }
        return this._createTag(tag, inside);
    }
    _createTag(tag, inside) {
        const attributesString = this._generateAttributeString(tag);
        let openTag = [tag.tagName, attributesString].filter((n) => n).join(' ');
        if (tag._meta.selfClosing) {
            return `<${openTag}/>`;
        }
        return `<${openTag}>${inside}</${tag.tagName}>`;
    }
    _generateAttributeString(tag) {
        let attributesString = '';
        if (tag.attr.id) {
            attributesString += this._attr('id', tag.attr.id);
        }
        attributesString += this._attr('class', tag.attr.className.raw());
        attributesString += this._generateInlineStyle(tag);
        for (const key in tag.attr.additionalAttributes) {
            attributesString += this._attr(key, tag.attr.additionalAttributes[key]);
        }
        return attributesString;
    }
    _generateInlineStyle(tag) {
        let styleContent = this.cssGenerator.generateBlockContent(tag.attr.style.styles);
        return this._attr('style', styleContent);
    }
    _generateScriptContent(storage) {
        let scriptContent = '';
        if (storage instanceof Function) {
            scriptContent += (0, util_1.justFnBody)(storage);
        }
        else if (storage instanceof Array) {
            for (const fn of storage) {
                scriptContent += this._generateScriptContent(fn);
            }
        }
        return scriptContent;
    }
    _attr(name, value) {
        if (!value)
            return '';
        return `${name}="${value}"`;
    }
}
exports.HtmlGenerator = HtmlGenerator;
//# sourceMappingURL=html-generator.js.map