import { ClassName } from './class-name';
import { Style } from './style';
import { Tag } from './tag';

export enum AttachMode {
  none,
  body,
  html,
  head,
}
export type ValidTagChild = string | Tag;

export type AttrSet = {
  className: ClassName;
  id?: string;
  style: Style;
};

export type TagMeta = {
  selfClosing: boolean;
};

export type FindBy = (tag: Tag) => boolean;

export type HoboContext = {
  attachedTag: Tag | undefined | null;
  attachedTagStack: Tag[];
};
