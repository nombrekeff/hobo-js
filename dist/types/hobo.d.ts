import { Tag } from './tag';
import { AttachMode, ValidTagChild } from './custom-types/types';
import { TagBuilder } from './tag-builder';
import { TagName, ValidTagName } from './custom-types/tag-names';
/**
 * Creates an HTML document, with a head and body tags.
 * You can pass in the AttachMode to attach to different tags.
 */
export declare function doc(pageTitle?: string, mode?: AttachMode): {
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
export declare function attach(tag: Tag): void;
/**
 * Detached the currently attached tag, and pops back to the previously attached tag.
 * If there are no stored tags, it will clear the attached tag.
 * You will need to handle the consecuent created tags.
 */
export declare function detach(): void;
type BuilderFunctions = {
    [key in ValidTagName]: ((...children: ValidTagChild[]) => Tag) & TagBuilder & {
        a: TagBuilder;
    };
} & {
    tag: (tagName: TagName, ...children: ValidTagChild[]) => TagBuilder;
};
/** Converts's the Tag tree into a html string */
export declare function generate(root: Tag): string;
/**
 * TagBuilders for each known tag. From `div` to `acronym`
 */
export declare const builders: BuilderFunctions;
export {};