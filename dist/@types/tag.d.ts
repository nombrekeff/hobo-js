import { TagName } from './types/tag-names';
import { AttrSet } from './attributes';
import { FindBy, TagMeta, ValidTagChild } from './types/types';
/**
 * Can throw if the tag name is not valid.
 */
export declare class Tag {
    tagName: TagName;
    children: ValidTagChild[];
    attr: AttrSet;
    _meta: TagMeta;
    get className(): import("./class-name").ClassName;
    get tagId(): string;
    constructor(tagName: TagName, children: ValidTagChild[], attr: AttrSet, meta: TagMeta);
    append(child: ValidTagChild): void;
    findByTagName(targetTagName: TagName): Tag;
    findOneBy(test: FindBy): Tag | null;
}
