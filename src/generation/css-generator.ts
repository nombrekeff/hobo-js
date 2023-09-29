// import cssbeautify from 'cssbeautify';
import { StyleMap } from '../custom-types/types';
import { camelToDash } from '../util';

export class CssGenerator {
  beautify: boolean;

  constructor(beautify: boolean = true) {
    this.beautify = beautify;
  }

  generate(styleSheet: { [key: string]: StyleMap } | { [key: string]: StyleMap }[]) {
    let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
    let generatedCss = '';

    for (const sheet of stylesheets) {
      for (const key in sheet) {
        generatedCss += this._generateBlock(key, sheet[key]);
      }
    }
    return generatedCss;
  }

  private _generateBlock(selector: string, style: StyleMap) {
    let inside = '';
    for (const key in style) {
      if (style[key]) inside += this._generateStyle(key, style[key] as string);
    }

    return `${camelToDash(selector)} { ${inside} }`;
  }

  private _generateStyle(name: string, value: string) {
    return `${camelToDash(name)}: ${value};`;
  }
}
