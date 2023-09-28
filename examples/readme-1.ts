import path from 'path';
import { doc, div, p, script, generate, style } from '../src/hobo';
import * as fs from 'fs';

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
    .a("Click me").aa('href', 'http://example.com')
    .button("I'm also a child").id("button-id");


// The code inside the function will be inserted into a script tag
script.a(() => {
    const btn = document.querySelector('#button-id');
});

fs.writeFileSync(path.join(__dirname,'readme-1.html'), generate(myPage.doc));