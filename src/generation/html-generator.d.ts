import { Tag } from '../tag';
import { HoboContext } from '../types/types';
export declare class HtmlGenerator {
    private cssGenerator;
    beautifyCss: boolean;
    generateHtml(rootTag: Tag, context?: HoboContext): string;
    private _generateTag;
    private _createTag;
    private _generateAttributeString;
    private _generateInlineStyle;
    private _generateScriptContent;
    private _attr;
    private _style;
}
