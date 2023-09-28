## Hobo

Welcome to Hobo. A little utility to generate html inside your js/ts code. Meant as a side-project, but after writing it I thought it might be useful to some people in some scenarios.

### Demo
Let me show you a little sample (_I explain everything in detail below_)
```ts
import { doc, div, p } from 'hobo-js';

// Create a document. It will create the html, head and body tags. A title will also be added to the head.
// NOTE that doc, automatically attaches the body (read more on attaching below)
const myPage = doc();

// This will create a style tag with the given css definitions inside
myPage.head.style({
    '.wrapper': {
        background: 'black',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
    }
});

// Creates a `div` with class wrapper, and 3 children (p, b, button).
// `.a` indicates hobo to attach the `div` to the currently attached tag
// you can attach manually to any tag, but by calling `doc`, the `body` will be attached
div.a().ca("wrapper")
    .p("I'm a child of div.wrapper")
    .b("And so am I")
    .button("I'm also a child").id("button-id");


// The code inside the function will be inserted into a script tag
script.a(() => {
    const btn = document.querySelector('#button-id');
});

// Generate and print the html
console.log(generate(myPage.doc));
```

The above snippet would output the following html:
```html
<html>
  <head>
    <title>New Hobo Document</title>
    <style>
      .wrapper {
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div id="button-id" class="wrapper">
      <p>I'm a child of div.wrapper</p>
      <b>And so am I</b>
      <button>I'm also a child</button>
    </div>
    <script>
      const btn = document.querySelector('#button-id');
    </script>
  </body>
</html>
```

#### Demo exlanation