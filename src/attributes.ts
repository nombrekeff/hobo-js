import { ClassName } from './class-name';
import { StyleSet } from './style';

export class AttrSet {
  className: ClassName = new ClassName();
  id?: string;
  style: StyleSet = new StyleSet();
  additionalAttributes: { [key: string]: string } = {};

  set(key: string, value: string) {
    this.additionalAttributes[key] = value;
    return this;
  }

  remove(key: string) {
    this.additionalAttributes[key];
    return this;
  }

  has(key: string) {
    return this.additionalAttributes[key] != null;
  }
}
