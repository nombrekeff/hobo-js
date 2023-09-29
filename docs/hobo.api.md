## Members

<dl>
<dt><a href="#builders">builders</a></dt>
<dd><p>TagBuilders for each known tag. From <code>div</code> to <code>acronym</code></p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#doc">doc()</a></dt>
<dd><p>Creates an HTML document, with a head and body tags.
You can pass in the AttachMode to attach to different tags.</p>
</dd>
<dt><a href="#attach">attach()</a></dt>
<dd><p>Attach a given tag to the current context.
When you attach a tag, this tag will be the &quot;root&quot; for any tag created without a parent.</p>
<ul>
<li>If there is not attached tag, it will be attached</li>
<li>If there is already a tag attached, it will store the previous tag
and will set the new tag as the root. After finishing using the tag as the root, you can call <code>@detach</code>
and return to the previous root tag.</li>
</ul>
<p>This is used to remove clutter and reduntancies when creating hobo docs.
Like this:</p>
</dd>
<dt><a href="#detach">detach()</a></dt>
<dd><p>Detached the currently attached tag, and pops back to the previously attached tag.
If there are no stored tags, it will clear the attached tag.
You will need to handle the consecuent created tags.</p>
</dd>
<dt><a href="#generate">generate()</a></dt>
<dd><p>Converts&#39;s the Tag tree into a html string</p>
</dd>
</dl>

<a name="builders"></a>

## builders
TagBuilders for each known tag. From `div` to `acronym`

**Kind**: global variable  
<a name="doc"></a>

## doc()
Creates an HTML document, with a head and body tags.
You can pass in the AttachMode to attach to different tags.

**Kind**: global function  
<a name="attach"></a>

## attach()
Attach a given tag to the current context.
When you attach a tag, this tag will be the "root" for any tag created without a parent.

* If there is not attached tag, it will be attached
* If there is already a tag attached, it will store the previous tag
  and will set the new tag as the root. After finishing using the tag as the root, you can call `@detach`
  and return to the previous root tag.

This is used to remove clutter and reduntancies when creating hobo docs.
Like this:

**Kind**: global function  
**Example**  
Simple example with only 1 attach
```ts
const parent = doc();
attach(parent);

div();
p();
```
The `div` and `p` tags will be automatically added as child of `parentDiv`
**Example**  
Example attaching and detaching
```ts
const parent = doc();
attach(parent);

div();
p();
let d1 = div();
attach(d1);
// All the p tags will be added to `d1`
p();
p();
p();
// remember to call detach when you want to go back to the previous root tag
detach();
```
<a name="detach"></a>

## detach()
Detached the currently attached tag, and pops back to the previously attached tag.
If there are no stored tags, it will clear the attached tag.
You will need to handle the consecuent created tags.

**Kind**: global function  
<a name="generate"></a>

## generate()
Converts's the Tag tree into a html string

**Kind**: global function  
