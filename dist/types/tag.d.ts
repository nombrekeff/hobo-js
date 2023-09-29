import { TagName } from './custom-types/tag-names';
import { AttrSet } from './attributes';
import { FindBy, TagMeta, ValidTagChild } from './custom-types/types';
/**
 * Represents an html tag
 */
export declare class Tag {
    tagName: TagName;
    children: ValidTagChild[];
    attr: AttrSet;
    _meta: TagMeta;
    get className(): import("./class-name").ClassName;
    get tagId(): string;
    constructor(tagName: TagName, children: ValidTagChild[], attr: AttrSet, meta: TagMeta);
    /** Append children  */
    append(child: ValidTagChild): void;
    /** Find a child by tag name  */
    findByTagName(targetTagName: TagName): Tag | null;
    /** Find a child by custom test  */
    findOneBy(test: FindBy): Tag | null;
}
