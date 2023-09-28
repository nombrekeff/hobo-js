import path from 'path';
import { p, div, style, generate, script, save, doc, attach, detach } from '../src/hobo';

const root = doc();

const pp = p.a('Im text').id('pppp').aa('title', 'a paragraph');
div().p().ca('hey');

// Styles
// Inline (get list of all styles and properties, mostly. and autocomplete)
div.a().sa('background', 'red');
div.a().ss({ background: 'red' });

div.a().on('click', () => {
  console.log('Hey');
});

const grid = div.a().ca('grid');
attach(grid);
for (let i = 0; i < 5; i++) {
  div.a(i.toString());
}
detach();

// Simplify adding multiple items, instead of loop
// multi(div, 4, (t, i) => t.text = i);
// div[4]((i) => i);

// Inside a style tag
// (get list of all styles and properties, mostly. and autocomplete)
style.a({
  '#ppp': {
    background: 'blue',
    'align-content': 'center',
  },
});

// Add scripts
// Somehow make it so the script inside is directly inserted into the generated html
script.a(() => {
  let el = document.querySelector('#pppp') as HTMLElement;
  el.style.color;
  // OR
  // const element = pp.sc.select();
});

// save(generate(root.doc), path.join(__dirname, 'test.html'));
export default root.doc;