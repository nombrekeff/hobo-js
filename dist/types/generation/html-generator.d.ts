import { Tag } from '../tag';
export declare class HtmlGenerator {
    private cssGenerator;
    beautifyCss: boolean;
    /** Generate html from the tag provided */
    generateHtml(rootTag: Tag): string;
    private _generateTag;
    private _createTag;
    private _generateAttributeString;
    private _generateInlineStyle;
    private _generateScriptContent;
    private _attr;
    private _style;
}
