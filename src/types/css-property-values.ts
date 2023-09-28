import { NamedColor } from './colors';

// Create script to collect all the values, wherever posible.
// Scrap https://dofactory.com/css/properties#list or other site, and get all single word options

export type PickPropertyValues<T> = T extends 'color'
  ? ColorOptions
  : T extends 'align-content'
  ? AlignContent
  : T extends 'align-items'
  ? AlignItems
  : T extends 'background'
  ? ColorOptions
  : T extends 'background-color'
  ? ColorOptions
  : T extends 'z-index'
  ? Number
  : T extends 'top'
  ? Number
  : T extends 'bottom'
  ? Number
  : T extends 'left'
  ? Number
  : T extends 'right'
  ? Number
  : string & {};

export type ColorOptions = NamedColor | (string & {});
export type AlignContent =
  | 'flex-wrap'
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'initial'
  | 'inherit'
  | 'align-items';
export type AlignItems =
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'initial'
  | 'inherit'
  | 'align-content';
