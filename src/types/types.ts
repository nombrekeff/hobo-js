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
export type ValidTagChild<T extends string = any> = string | Tag | StateProxy<T>;

export type TagMeta = {
  storage: any;
  selfClosing: boolean;
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

export type HoboRt = {
  createState(state: State): StateProxy<{}>;
  q(selector: string): HoboTag;
  fromStr(tag: string): HoboTag;
  // fromTemplate(id: string): HoboTag;
};

export type HtmlEventType = 'click' | (string & {});
