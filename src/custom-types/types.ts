import { Tag } from '../tag';
import { TagBuilder } from '../tag-builder';
import { CssProperty } from './css-properties';
import { PickPropertyValues } from './css-property-values';

export type StyleMap = { [key in CssProperty]?: PickPropertyValues<key> };
export type NestedStyleMap = {
  [key in CssProperty]?: PickPropertyValues<key> | StyleMap;
};
export type StyleSet = { [key: string]: NestedStyleMap };

export enum AttachMode {
  none,
  body,
  html,
  head,
}
export type ValidTagChild = string | Tag | { [key: string]: StyleMap } | TagBuilder | ((_: string) => void);

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
