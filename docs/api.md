## Classes

<dl>
<dt><a href="#TagBuilder">TagBuilder</a></dt>
<dd><p>TagBuilder class, used to build tags of course.</p>
</dd>
</dl>

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
<dt><a href="#justFnBody">justFnBody()</a></dt>
<dd><p>Receives a function, and returns just the body of the function as a string</p>
</dd>
</dl>

<a name="TagBuilder"></a>

## TagBuilder
TagBuilder class, used to build tags of course.

**Kind**: global class  

* [TagBuilder](#TagBuilder)
    * [.className](#TagBuilder+className)
    * [.tagId](#TagBuilder+tagId)
    * [.attr](#TagBuilder+attr)
    * [.setTagName()](#TagBuilder+setTagName)
    * [.b()](#TagBuilder+b)
    * [.p()](#TagBuilder+p)
    * [.id()](#TagBuilder+id)
    * [.text()](#TagBuilder+text)
    * [.append()](#TagBuilder+append)
    * [.setChildren()](#TagBuilder+setChildren)
    * [.store()](#TagBuilder+store)
    * [.m()](#TagBuilder+m)
    * [.mc()](#TagBuilder+mc)
    * [.ac()](#TagBuilder+ac)
    * [.rc()](#TagBuilder+rc)
    * [.aa()](#TagBuilder+aa)
    * [.am()](#TagBuilder+am)
    * [.ra()](#TagBuilder+ra)
    * [.as()](#TagBuilder+as)
    * [.ss()](#TagBuilder+ss)
    * [.rs()](#TagBuilder+rs)

<a name="TagBuilder+className"></a>

### tagBuilder.className
Get the tag className

**Kind**: instance property of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+tagId"></a>

### tagBuilder.tagId
Get the tag id

**Kind**: instance property of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+attr"></a>

### tagBuilder.attr
Do not modify directly, use helper methods in the tag instead.

**Kind**: instance property of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+setTagName"></a>

### tagBuilder.setTagName()
Sets and validates the tag name

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+b"></a>

### tagBuilder.b()
Build the tag with additional children

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+p"></a>

### tagBuilder.p()
Set the parent of the tag. If a parent is set, this tag will be added as a child when built

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+id"></a>

### tagBuilder.id()
Set the id of the tag
Can't be empty

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+text"></a>

### tagBuilder.text()
replaces the children of this tag with the provided string

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+append"></a>

### tagBuilder.append()
Adds tags as children if the tag can have children.
For example, if tag is `img` there's no need to add the childre as they will not be generated.

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+setChildren"></a>

### tagBuilder.setChildren()
Set the children of this tag. Replaces any current children

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+store"></a>

### tagBuilder.store()
Store metadata inside tag. Internal method, you won't need this

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+m"></a>

### tagBuilder.m()
cm = modify
calls `fn` with the tag, and returns the tag

usefull to change a tag while maintaing chaning

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
**Example**  
```ts
div().m(t => t.className.add("Container"))
   .div("I'm a child!"),
```
**Example**  
```ts
div([
   p("Child1").m(t => t.className.add("child-1")),
   p("Child1").m(t => t.className.add("child-2"))
])
```
<a name="TagBuilder+mc"></a>

### tagBuilder.mc()
mc = modify classname
If the argument is a function

Shortcut for modifying the classnames of a tag. Similar to the `.m` method
but it passes the className instead of the complete tag.

Retuns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
**Example**  
```ts
div(
   p("Child1").mc(c => c.add("child-1")),
   p("Child1").mc(c => c.add("child-2"))
)
```
<a name="TagBuilder+ac"></a>

### tagBuilder.ac()
ac = add classname
Adds classNames to this TagBuilder, and returns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+rc"></a>

### tagBuilder.rc()
rc = remove classname
Removes classNames from this TagBuilder, and returns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+aa"></a>

### tagBuilder.aa()
Adds attribute, and returns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+am"></a>

### tagBuilder.am()
Adds multiple atributes at once, and returns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+ra"></a>

### tagBuilder.ra()
ra = remove attribute
Removes attribute from this TagBuilder, and returns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+as"></a>

### tagBuilder.as()
Adds style, and returns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+ss"></a>

### tagBuilder.ss()
Adds style from object, and returns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
<a name="TagBuilder+rs"></a>

### tagBuilder.rs()
rs = remove styles
Removes styles from this TagBuilder, and returns a new TagBuilder

**Kind**: instance method of [<code>TagBuilder</code>](#TagBuilder)  
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
<a name="justFnBody"></a>

## justFnBody()
Receives a function, and returns just the body of the function as a string

**Kind**: global function  
