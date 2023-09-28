import pretty from 'pretty';
import { Tag } from '../tag';
import { CssGenerator } from './css-generator';
import { HoboContext } from '../types/types';
import { script } from '../tag';
import { justFnBody } from '../util';
import { HOBO_RT_PATH } from './consts';

export class HtmlGenerator {
  private cssGenerator = new CssGenerator();
  public beautifyCss = true;

  generateHtml(rootTag: Tag, context?: HoboContext): string {
    if (context) this._handleGlobals(context, rootTag);

    let generatedHtml = this._generateTag(rootTag);
    return pretty(generatedHtml);
  }

  private _handleGlobals(context: HoboContext, rootTag: Tag) {
    const body = rootTag.findByTagName('body');
    const head = rootTag.findByTagName('head');
    if (context.globalStuff.length > 0) {
      let hoboRtSrc = '';

      for (let g of context.globalStuff) {
        console.log('g', g);
        if (typeof g == 'string') hoboRtSrc += g;
        else if (typeof g == 'function') hoboRtSrc += justFnBody(g);
      }

      const globalScript = script(hoboRtSrc).id('_hbGlobalScript');

      if (body) {
        body.children.push(globalScript);
      } else {
        rootTag.children.push(globalScript);
      }
    }

    const hoboRtScript = script('').am({ src: HOBO_RT_PATH });
    if (head) {
      head.children.push(hoboRtScript);
    } else if (body) {
      body.children.unshift(hoboRtScript);
    } else {
      rootTag.children.unshift(hoboRtScript);
    }
  }

  private _generateTag(tag: Tag) {
    if (tag.tagName == 'style') {
      return this._createTag(tag, this.cssGenerator.generate(tag._meta.storage));
    }

    if (tag.tagName == 'script') {
      console.log('script', tag._meta.storage);
      return this._createTag(tag, tag._meta.storage);
    }

    let inside = '';

    for (const child of tag.children) {
      if (typeof child === 'string') {
        inside += child;
      } else if (child instanceof Tag) {
        inside += this._generateTag(child) + '\n';
      } else {
        throw new Error('Not handled' + child);
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
    let styleContent = '';

    for (const key in tag.attr.style.styles) {
      styleContent += this._style(key, tag.attr.style.styles[key]);
    }

    return this._attr('style', styleContent);
  }

  private _attr(name: string, value: string) {
    if (!value) return '';
    return `${name}="${value}"`;
  }

  private _style(name: string, value: string | undefined) {
    if (!value) return '';
    return `${name}: ${value};`;
  }
}
