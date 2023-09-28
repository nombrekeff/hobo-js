declare module "class-name" {
    export class ClassName {
        classNames: string[];
        constructor(classNames?: string[]);
        raw(): string;
        add(...classNames: string[]): ClassName;
        remove(...classNames: string[]): ClassName;
        has(str: string): boolean;
    }
}
declare module "types/css-properties" {
    export type CssProperty = 'color' | 'border' | 'margin' | 'font-style' | 'transform' | 'background-color' | 'align-content' | 'align-items' | 'align-self' | 'all' | 'animation' | 'animation-delay' | 'animation-direction' | 'animation-duration' | 'animation-fill-mode' | 'animation-iteration-count' | 'animation-name' | 'animation-play-state' | 'animation-timing-function' | 'backface-visibility' | 'background' | 'background-attachment' | 'background-blend-mode' | 'background-clip' | 'background-color' | 'background-image' | 'background-origin' | 'background-position' | 'background-repeat' | 'background-size' | 'border' | 'border-bottom' | 'border-bottom-color' | 'border-bottom-left-radius' | 'border-bottom-right-radius' | 'border-bottom-style' | 'border-bottom-width' | 'border-collapse' | 'border-color' | 'border-image' | 'border-image-outset' | 'border-image-repeat' | 'border-image-slice' | 'border-image-source' | 'border-image-width' | 'border-left' | 'border-left-color' | 'border-left-style' | 'border-left-width' | 'border-radius' | 'border-right' | 'border-right-color' | 'border-right-style' | 'border-right-width' | 'border-spacing' | 'border-style' | 'border-top' | 'border-top-color' | 'border-top-left-radius' | 'border-top-right-radius' | 'border-top-style' | 'border-top-width' | 'border-width' | 'bottom' | 'box-shadow' | 'box-sizing' | 'caption-side' | 'caret-color' | '@charset' | 'clear' | 'clip' | 'clip-path' | 'color' | 'column-count' | 'column-fill' | 'column-gap' | 'column-rule' | 'column-rule-color' | 'column-rule-style' | 'column-rule-width' | 'column-span' | 'column-width' | 'columns' | 'content' | 'counter-increment' | 'counter-reset' | 'cursor' | 'direction' | 'display' | 'empty-cells' | 'filter' | 'flex' | 'flex-basis' | 'flex-direction' | 'flex-flow' | 'flex-grow' | 'flex-shrink' | 'flex-wrap' | 'float' | 'font' | '@font-face' | 'font-family' | 'font-kerning' | 'font-size' | 'font-size-adjust' | 'font-stretch' | 'font-style' | 'font-variant' | 'font-weight' | 'grid' | 'grid-area' | 'grid-auto-columns' | 'grid-auto-flow' | 'grid-auto-rows' | 'grid-column' | 'grid-column-end' | 'grid-column-gap' | 'grid-column-start' | 'grid-gap' | 'grid-row' | 'grid-row-end' | 'grid-row-gap' | 'grid-row-start' | 'grid-template' | 'grid-template-areas' | 'grid-template-columns' | 'grid-template-rows' | 'height' | 'hyphens' | '@import' | 'justify-content' | '@keyframes' | 'left' | 'letter-spacing' | 'line-height' | 'list-style' | 'list-style-image' | 'list-style-position' | 'list-style-type' | 'margin' | 'margin-bottom' | 'margin-left' | 'margin-right' | 'margin-top' | 'max-height' | 'max-width' | '@media' | 'min-height' | 'min-width' | 'object-fit' | 'object-position' | 'opacity' | 'order' | 'outline' | 'outline-color' | 'outline-offset' | 'outline-style' | 'outline-width' | 'overflow' | 'overflow-x' | 'overflow-y' | 'padding' | 'padding-bottom' | 'padding-left' | 'padding-right' | 'padding-top' | 'page-break-after' | 'page-break-before' | 'page-break-inside' | 'perspective' | 'perspective-origin' | 'pointer-events' | 'position' | 'quotes' | 'right' | 'scroll-behavior' | 'table-layout' | 'text-align' | 'text-align-last' | 'text-decoration' | 'text-decoration-color' | 'text-decoration-line' | 'text-decoration-style' | 'text-indent' | 'text-justify' | 'text-overflow' | 'text-shadow' | 'text-transform' | 'top' | 'transform' | 'transform-origin' | 'transform-style' | 'transition' | 'transition-delay' | 'transition-duration' | 'transition-property' | 'transition-timing-function' | 'user-select' | 'vertical-align' | 'visibility' | 'white-space' | 'width' | 'word-break' | 'word-spacing' | 'word-wrap' | 'writing-mode' | 'z-index' | (string & {});
}
declare module "types/colors" {
    export type NamedColor = 'black' | 'silver' | 'gray' | 'white' | 'maroon' | 'red' | 'purple' | 'fuchsia' | 'green' | 'lime' | 'olive' | 'yellow' | 'navy' | 'blue' | 'teal' | 'aqua' | 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure' | 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue' | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' | 'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' | 'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategray' | 'darkslategrey' | 'darkturquoise' | 'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia' | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray' | 'green' | 'greenyellow' | 'grey' | 'honeydew' | 'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' | 'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' | 'limegreen' | 'linen' | 'magenta' | 'maroon' | 'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin' | 'navajowhite' | 'navy' | 'oldlace' | 'olive' | 'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple' | 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue' | 'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'silver' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'teal' | 'thistle' | 'tomato' | 'turquoise' | 'violet' | 'wheat' | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen';
}
declare module "types/css-property-values" {
    import { NamedColor } from "types/colors";
    export type PickPropertyValues<T> = T extends 'color' ? ColorOptions : T extends 'align-content' ? AlignContent : T extends 'align-items' ? AlignItems : T extends 'background' ? ColorOptions : T extends 'background-color' ? ColorOptions : T extends 'z-index' ? Number : T extends 'top' ? Number : T extends 'bottom' ? Number : T extends 'left' ? Number : T extends 'right' ? Number : string & {};
    export type ColorOptions = NamedColor | (string & {});
    export type AlignContent = 'flex-wrap' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'initial' | 'inherit' | 'align-items';
    export type AlignItems = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit' | 'align-content';
}
declare module "style" {
    import { CssProperty } from "types/css-properties";
    import { PickPropertyValues } from "types/css-property-values";
    export class StyleSet {
        styles: {
            [key in CssProperty]?: PickPropertyValues<key>;
        };
        set<T extends CssProperty>(key: T, value: PickPropertyValues<T>): this;
        remove(key: string): this;
        has(key: string): boolean;
    }
}
declare module "attributes" {
    import { ClassName } from "class-name";
    import { StyleSet } from "style";
    export class AttrSet {
        className: ClassName;
        id?: string;
        style: StyleSet;
        additionalAttributes: {
            [key: string]: string;
        };
        set(key: string, value: string): this;
        remove(key: string): this;
        has(key: string): boolean;
    }
}
declare module "tag-names" {
    export const selfClosingTags: string[];
    export const closingTags: string[];
    export const allKnownTags: string[];
    export type TagName = ValidTagName | (string & {});
    export type ValidTagName = 'a' | 'abbr' | 'acronym' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'basefont' | 'bdi' | 'bdo' | 'big' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'center' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'param' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'selfClosingTagName' | 'small' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'svg' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'track' | 'tr' | 'u' | 'ul' | 'var' | 'video' | 'wbr';
}
declare module "types/types" {
    import { Tag } from "tag";
    import { CssProperty } from "types/css-properties";
    import { PickPropertyValues } from "types/css-property-values";
    export type StyleMap = {
        [key in CssProperty]?: PickPropertyValues<key>;
    };
    export enum AttachMode {
        none = 0,
        body = 1,
        html = 2,
        head = 3
    }
    export type ValidTagChild<T extends string = any> = string | Tag | StateProxy<T>;
    export type TagMeta = {
        storage: any;
        selfClosing: boolean;
    };
    export type FindBy = (tag: Tag) => boolean;
    export type State = {} & {};
    export type StateProxy<T extends State> = T & {
        state: boolean;
    };
    export type GlobalStuff = Function | string;
    export type HoboContext = {
        attachedTag: Tag | undefined | null;
        attachedTagStack: Tag[];
        globalStuff: GlobalStuff[];
    };
    export type HtmlEventType = 'click' | (string & {});
}
declare module "util" {
    export function replaceDoubleQuotes(str: string): string;
    /** Receives a function, and returns just the body of the function as a string */
    export function justFnBody(fn: Function): string;
    export function generateId(): string;
}
declare module "tag" {
    import { ClassName } from "class-name";
    import { TagName } from "tag-names";
    import { AttrSet } from "attributes";
    import { CssProperty } from "types/css-properties";
    import { PickPropertyValues } from "types/css-property-values";
    import { FindBy, HtmlEventType, StyleMap, TagMeta, ValidTagChild } from "types/types";
    /**
     * Can throw if the tag name is not valid.
     */
    export class Tag {
        tagName: TagName;
        children: ValidTagChild[];
        /**
         * Do not modify directly, use helper methods in the tag instead.
         */
        attr: AttrSet;
        _meta: TagMeta;
        get className(): ClassName;
        get tagId(): string;
        constructor(tagName: TagName, children?: ValidTagChild[]);
        /**
         * Set the id of the tag
         * Can't be empty
         */
        id<T extends string>(newId: T extends '' ? never : T): Tag;
        /** replaces the children of this tag, and replaces with the provided string */
        inside(content: string): this;
        div(...children: ValidTagChild[]): Tag;
        p(...children: ValidTagChild[]): Tag;
        b(...children: ValidTagChild[]): Tag;
        i(...children: ValidTagChild[]): Tag;
        h1(...children: ValidTagChild[]): Tag;
        h2(...children: ValidTagChild[]): Tag;
        h3(...children: ValidTagChild[]): Tag;
        h4(...children: ValidTagChild[]): Tag;
        h5(...children: ValidTagChild[]): Tag;
        h6(...children: ValidTagChild[]): Tag;
        span(...children: ValidTagChild[]): Tag;
        img(...children: ValidTagChild[]): Tag;
        style(styles: {
            [key: string]: StyleMap;
        }): this;
        script(fn: () => {}): this;
        tag(tagName: TagName, ...children: ValidTagChild[]): Tag;
        append(...tags: ValidTagChild[]): this;
        setChildren(children: ValidTagChild[]): this;
        /**
         * cm = modify
         * calls `fn` with the tag, and returns the tag
         *
         * usefull to change a tag while maintaing chaning
         *
         * @example
         * ```ts
         * div().m(t => t.className.add("Container"))
         *    .div("I'm a child!"),
         * ```
         * @example
         * ```ts
         * div([
         *    p("Child1").m(t => t.className.add("child-1")),
         *    p("Child1").m(t => t.className.add("child-2"))
         * ])
         * ```
         */
        m(fn: (tag: Tag) => void): this;
        /**
         * cm = classname modify
         * If the argument is a function
         *
         * Shortcut for modifying the classnames of a tag. Similar to the `.m` method
         * but it passes the className instead of the complete tag.
         *
         * @example
         * ```ts
         * div([
         *    p("Child1").c(c => c.add("child-1")),
         *    p("Child1").c(c => c.add("child-2"))
         * ])
         * ```
         */
        cm(arg0: (c: ClassName) => void): this;
        /**
         * ca = classname add
         * Adds classNames to this Tag, and retuns this Tag
         */
        ca(...classNames: string[]): this;
        /** Add attribute */
        aa(key: string, value: string): this;
        /** Add multiple atributes at once */
        am(attributes: {
            [key: string]: string;
        }): this;
        /** Add style */
        sa<T extends CssProperty>(key: T, value: PickPropertyValues<T>): this;
        /** Set style as object*/
        ss(styles: StyleMap): this;
        on(event: HtmlEventType, fn: () => void): this;
        findByTagName(targetTagName: TagName): Tag;
        findOneBy(test: FindBy): Tag | null;
    }
    export function tag(tagName: TagName, ...children: ValidTagChild[]): Tag;
    export function html(...children: ValidTagChild[]): Tag;
    export function head(...children: ValidTagChild[]): Tag;
    export function body(...children: ValidTagChild[]): Tag;
    export function div(...children: ValidTagChild[]): Tag;
    export function section(...children: ValidTagChild[]): Tag;
    export function button(...children: ValidTagChild[]): Tag;
    export function input(...children: ValidTagChild[]): Tag;
    export function p(...children: ValidTagChild[]): Tag;
    export function b(...children: ValidTagChild[]): Tag;
    export function i(...children: ValidTagChild[]): Tag;
    export function bold(...children: ValidTagChild[]): Tag;
    export function h1(...children: ValidTagChild[]): Tag;
    export function h2(...children: ValidTagChild[]): Tag;
    export function h3(...children: ValidTagChild[]): Tag;
    export function h4(...children: ValidTagChild[]): Tag;
    export function h5(...children: ValidTagChild[]): Tag;
    export function h6(...children: ValidTagChild[]): Tag;
    export function span(...children: ValidTagChild[]): Tag;
    export function img(...children: ValidTagChild[]): Tag;
    export function hr(...children: ValidTagChild[]): Tag;
    export function title(...children: ValidTagChild[]): Tag;
    export function meta(...children: ValidTagChild[]): Tag;
    export function style(styles: {
        [key: string]: StyleMap;
    }): Tag;
    export function script(arg0: (() => void) | string): Tag;
    export function byTag(tagName: TagName): FindBy;
    export function byClass(className: string): FindBy;
    export function byId(id: string): FindBy;
}
declare module "generation/css-generator" {
    import { StyleMap } from "types/types";
    export class CssGenerator {
        beautify: boolean;
        constructor(beautify?: boolean);
        generate(styleSheet: {
            [key: string]: StyleMap;
        }): string;
        private _generateBlock;
        private _generateStyle;
    }
}
declare module "generation/consts" {
    export const HOBO_RT_PATH = "../../src/rt/dist/hobo-rt.js";
}
declare module "generation/html-generator" {
    import { Tag } from "tag";
    import { HoboContext } from "types/types";
    export class HtmlGenerator {
        private cssGenerator;
        beautifyCss: boolean;
        generateHtml(rootTag: Tag, context?: HoboContext): string;
        private _handleGlobals;
        private _generateTag;
        private _createTag;
        private _generateAttributeString;
        private _generateInlineStyle;
        private _attr;
        private _style;
    }
}
declare module "state" {
    import { State, StateProxy } from "types/types";
    export function createState<T extends State>(state: T, name?: string): StateProxy<T>;
}
declare module "hobo" {
    import { Tag, body as hbody, head as hhead, div as hdiv, span as hspan, p as hp, img as himg, section as hsection, hr as hhr, tag as htag, style as hstyle, script as hscript, title as htitle, meta as hmeta, input as hinput, button as hbutton, h1 as hh1, h2 as hh2, h3 as hh3, h4 as hh4, h5 as hh5, h6 as hh6 } from "tag";
    import { AttachMode, State, StateProxy } from "types/types";
    export { byClass, byTag, byId } from "tag";
    /** Creates a HTML document, with a head and body tags */
    export function doc(pageTitle?: string, mode?: AttachMode): {
        doc: Tag;
        head: Tag;
        body: Tag;
    };
    /**
     * Attach a given tag to the current context.
     * When you attach a tag, this tag will be the "root" for any tag created without a parent.
     *
     * * If there is not attached tag, it will be attached
     * * If there is already a tag attached, it will store the previous tag
     *   and will set the new tag as the root. After finishing using the tag as the root, you can call `@detach`
     *   and return to the previous root tag.
     *
     * This is used to remove clutter and reduntancies when creating hobo docs.
     * Like this:
     *
     * @example
     * Simple example with only 1 attach
     * ```ts
     * const parent = doc();
     * attach(parent);
     *
     * div();
     * p();
     * ```
     * The `div` and `p` tags will be automatically added as child of `parentDiv`
     *
     * @example
     * Example attaching and detaching
     * ```ts
     * const parent = doc();
     * attach(parent);
     *
     * div();
     * p();
     * let d1 = div();
     * attach(d1);
     * // All the p tags will be added to `d1`
     * p();
     * p();
     * p();
     * // remember to call detach when you want to go back to the previous root tag
     * detach();
     * ```
     */
    export function attach(tag: Tag): void;
    /**
     * Detached the currently attached tag, and pops back to the previously attached tag.
     * If there are no stored tags, it will clear the attached tag.
     * You will need to handle the consecuent created tags.
     */
    export function detach(): void;
    export function state<T extends State>(state: T, name?: string): StateProxy<T>;
    export const tag: typeof htag & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof htag;
    };
    export const body: typeof hbody & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hbody;
    };
    export const head: typeof hhead & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hhead;
    };
    export const div: typeof hdiv & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hdiv;
    };
    export const section: typeof hsection & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hsection;
    };
    export const p: typeof hp & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hp;
    };
    export const span: typeof hspan & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hspan;
    };
    export const button: typeof hbutton & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hbutton;
    };
    export const input: typeof hinput & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hinput;
    };
    export const hr: typeof hhr & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hhr;
    };
    export const h1: typeof hh1 & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hh1;
    };
    export const h2: typeof hh2 & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hh2;
    };
    export const h3: typeof hh3 & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hh3;
    };
    export const h4: typeof hh4 & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hh4;
    };
    export const h5: typeof hh5 & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hh5;
    };
    export const h6: typeof hh6 & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hh6;
    };
    export const title: typeof htitle & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof htitle;
    };
    export const img: typeof himg & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof himg;
    };
    export const script: typeof hscript & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hscript;
    };
    export const style: typeof hstyle & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hstyle;
    };
    export const meta: typeof hmeta & {
        /** `.a` attaches to the currently attached node tag */
        a: typeof hmeta;
    };
    export function generate(root: Tag): string;
    export function render(tag: Tag, selector: string): void;
}
