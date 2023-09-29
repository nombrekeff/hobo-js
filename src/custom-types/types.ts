import { Tag } from '../tag';
import { CssProperty } from './css-properties';
import { PickPropertyValues } from './css-property-values';

export type StyleMap = { [key in CssProperty]?: PickPropertyValues<key> };

export enum AttachMode {
  none,
  body,
  html,
  head,
}
export type ValidTagChild = string | Tag | { [key: string]: StyleMap } | Function;

export type TagMeta = {
  storage: any;
  selfClosing: boolean;
  storesChildren: boolean;
};

export type FindBy = (tag: Tag) => boolean;
export type State = {} & {};
export type StateProxy<T extends State> = T & { state: boolean };

export type GlobalStuff = Function | string;
export type HoboContext = {
  attachedTag: Tag | undefined | null;
  attachedTagStack: Tag[];
  globalStuff: GlobalStuff[];
};

export type HtmlEventType = 'click' | (string & {});