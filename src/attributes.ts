import { ClassName } from './class-name';
import { StyleSet } from './style';

export class AttrSet {
  className: ClassName = new ClassName();
  id?: string;
  style: StyleSet = new StyleSet();

  additionalAttributes: { [key: string]: string } = {};

  /** Set single attribute */
  set(key: string, value: string) {
    this.additionalAttributes[key] = value;
    return this;
  }

  /** Remove single attribute */
  remove(key: string) {
    this.additionalAttributes[key];
    return this;
  }

  /** Check if an attribute is set */
  has(key: string) {
    return key in this.additionalAttributes;
  }
}
