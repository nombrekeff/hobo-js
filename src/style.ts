import { CssProperty } from './types/css-properties';
import { PickPropertyValues } from './types/css-property-values';

export class StyleSet {
  styles: { [key in CssProperty]?: PickPropertyValues<key> } = {};

  set<T extends CssProperty>(key: T, value: PickPropertyValues<T>) {
    this.styles[key] = value as any;
    return this;
  }

  remove(key: string) {
    this.styles[key];
    return this;
  }

  has(key: string) {
    return this.styles[key as any] != null;
  }
}

let s = new StyleSet();
s.styles.color = '';
s.styles['align-content'] = 'center';
