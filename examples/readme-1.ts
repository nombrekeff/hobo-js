import path from 'path';
import * as fs from 'fs';
import { builders, doc, generate } from '../src/hobo';

const { div, p, span, b, script, button, style, a, hr } = builders;

// Create a document. It will create the html, head and body tags. A title will also be added to the head.
// NOTE that doc, automatically attaches the body (read more on attaching below)
const myPage = doc('My Page Title');

// This will create a style tag with the given css definitions inside
myPage.head.append(
  style({
    '.wrapper': {
      background: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

// Creates a `div` with class wrapper, and 3 children (p, b, button).
// `.a` indicates hobo to attach the `div` to the currently attached tag
// you can attach manually to any tag, but by calling `doc`, the `body` will be attached
div.a.ac('wrapper').b(
  p("I'm a child of div.wrapper"),
  b.as('color', 'aliceblue')('And so am I'),
  hr,
  a.aa('href', 'http://example.com').b('Click me'),
  button.id('button-id').b("I'm also a child"),
);

// The code inside the function will be inserted into a script tag
script.a(() => {
  const btn = document.querySelector('#button-id');
});

fs.writeFileSync(path.join(__dirname, 'readme-1.html'), generate(myPage.doc));
