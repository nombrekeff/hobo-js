import cssbeautify from 'cssbeautify';
import { StyleMap } from '../types/types';

export class CssGenerator {
  beautify: boolean;

  constructor(beautify: boolean = true) {
    this.beautify = beautify;
  }

  generate(styleSheet: { [key: string]: StyleMap }) {
    let generatedCss = '';
    for (const key in styleSheet) {
      generatedCss += this._generateBlock(key, styleSheet[key]);
    }
    return this.beautify ? cssbeautify(generatedCss) : generatedCss;
  }

  private _generateBlock(selector: string, style: StyleMap) {
    let inside = '';
    for (const key in style) {
      if (style[key]) inside += this._generateStyle(key, style[key] as string);
    }

    return `${selector} { ${inside} }`;
  }

  private _generateStyle(name: string, value: string) {
    return `${name}: ${value};`;
  }
}
