import { CssProperty } from './custom-types/css-properties';
import { PickPropertyValues } from './custom-types/css-property-values';

export class StyleSet {
  styles: { [key in CssProperty]?: PickPropertyValues<key> } = {};

  /** Set a single style */
  set<T extends CssProperty>(key: T, value: PickPropertyValues<T>): StyleSet {
    this.styles[key] = value as any;
    return this;
  }

  /** Remove a single style */
  remove(key: string): StyleSet {
    this.styles[key];
    return this;
  }

  /** Check if a style is set */
  has(key: string): boolean {
    return key in this.styles;
  }
}
