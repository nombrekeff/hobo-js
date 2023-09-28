import path from 'path';
import { attach, detach, div, doc, generate, h4, input, p, save, script, style, tag } from '../../src/hobo';

const root = doc();
attach(root.head);
tag.a('link').am({ rel: 'stylesheet', href: './normalize.css' });
style.a({
  body: {
    background: 'whitesmoke',
    margin: '0',
    padding: '0',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'font-family': 'Arial, Helvetica, sans-serif',
  },
  '.list-container': {
    width: '600px',
    height: '560px',
    'background-color': '#99506b',
    'border-radius': '8px',
    color: 'white',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    padding: '0 50px',
  },
  '.list-container h4': {
    'font-size': '1.5rem',
  },
  '#list': {
    height: '100%',
    width: '100%',
    background: 'red',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
  },
});
detach();

div.a(h4('Hobo Todo List'), div(p('No more todos!').id('empty')).id('list')).ca('list-container');

script.a(() => {});

const generated = generate(root.doc);
save(generated, path.join(__dirname, 'todo.hobo.html'));
