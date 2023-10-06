import { Tag } from '../tag';
import { CssGenerator } from './css-generator';
import { justFnBody } from '../util';
import { TagBuilder } from '../tag-builder';

export class HtmlGenerator {
  private cssGenerator = new CssGenerator();
  public beautifyCss = true;

  /** Generate html from the tag provided */
  generateHtml(rootTag: Tag): string {
    let generatedHtml = this._generateTag(rootTag);
    return generatedHtml;
  }

  private _generateTag(tag: Tag) {
    if (tag.tagName == 'style') {
      return this._createTag(tag, this.cssGenerator.generateCss(tag._meta.storage));
    }

    if (tag.tagName == 'script') {
      return this._createTag(tag, this._generateScriptContent(tag._meta.storage));
    }

    let inside = '';

    for (const child of tag.children) {
      let effectiveChild = child;

      if (child instanceof TagBuilder) {
        effectiveChild = child.b();
      }

      if (effectiveChild instanceof Tag) {
        inside += this._generateTag(effectiveChild);
      } else {
        inside += child;
      }
    }

    return this._createTag(tag, inside);
  }

  private _createTag(tag: Tag, inside: string) {
    const attributesString = this._generateAttributeString(tag);
    let openTag = [tag.tagName, attributesString].filter((n) => n).join(' ');

    if (tag._meta.selfClosing) {
      return `<${openTag}/>`;
    }

    return `<${openTag}>${inside}</${tag.tagName}>`;
  }

  private _generateAttributeString(tag: Tag) {
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

  private _generateInlineStyle(tag: Tag) {
    let styleContent = this.cssGenerator.generateInline(tag.attr.style.styles);

    return this._attr('style', styleContent);
  }

  private _generateScriptContent(storage: Function | Function[]): string {
    let scriptContent = '';

    if (storage instanceof Function) {
      scriptContent += justFnBody(storage);
    } else if (storage instanceof Array) {
      for (const fn of storage) {
        scriptContent += this._generateScriptContent(fn);
      }
    }

    return scriptContent;
  }

  private _attr(name: string, value: string) {
    if (!value) return '';
    return `${name}="${value}"`;
  }
}
