import { ClassName } from './class-name';
import { StyleSet } from './style';

export class AttrSet {
  className: ClassName = new ClassName();
  id?: string;
  style: StyleSet = new StyleSet();

  additionalAttributes: { [key: string]: string } = {};

  copy() {
    const newSet = new AttrSet();
    newSet.className = this.className.copy();
    newSet.id = this.id;
    newSet.style = this.style.copy();
    newSet.additionalAttributes = { ...this.additionalAttributes };
    return newSet;
  }

  /** Set single attribute */
  set(key: string, value: string): AttrSet {
    this.additionalAttributes[key] = value;
    return this;
  }

  /** Remove single attribute */
  remove(key: string): AttrSet {
    this.additionalAttributes[key];
    return this;
  }

  /** Check if an attribute is set */
  has(key: string): boolean {
    return key in this.additionalAttributes;
  }
}
