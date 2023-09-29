// import cssbeautify from 'cssbeautify';
import { StyleMap } from '../custom-types/types';
import { camelToDash } from '../util';

export class CssGenerator {
  beautify: boolean;

  constructor(beautify: boolean = true) {
    this.beautify = beautify;
  }

  generateCss(styleSheet: { [key: string]: StyleMap } | { [key: string]: StyleMap }[]) {
    let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
    let generatedCss = '';

    for (const sheet of stylesheets) {
      for (const key in sheet) {
        generatedCss += this.generateBlock(key, sheet[key]);
      }
    }
    return generatedCss;
  }

  generateBlock(selector: string, style: StyleMap) {
    let inside = this.generateBlockContent(style);
    return `${camelToDash(selector)} {${inside}}`;
  }

  generateBlockContent(style: StyleMap) {
    let inside = '';
    
    for (const key in style) {
      if (style[key]) inside += this.generateStyle(key, style[key] as string);
    }

    return inside;
  }


  generateStyle(name: string, value: string) {
    return `${camelToDash(name)}:${value};`;
  }
}
