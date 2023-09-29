import { CssProperty } from './custom-types/css-properties';
import { PickPropertyValues } from './custom-types/css-property-values';

/**
 * Represents a set of styles 
 */
export class StyleSet {
  styles: { [key in CssProperty]?: PickPropertyValues<key> } = {};

  copy() {
    const newStyles = new StyleSet();
    newStyles.styles = { ...this.styles };
    return newStyles;
  }

  /** Set a single style */
  set<T extends CssProperty>(key: T, value: PickPropertyValues<T>): StyleSet {
    this.styles[key] = value as any;
    return this;
  }

  /** Remove styles */
  remove(...styles: string[]): StyleSet {
    for (const sn of styles) {
      delete this.styles[sn];
    }
    return this;
  }

  /** Check if a style is set */
  has(key: string): boolean {
    return key in this.styles;
  }
}
