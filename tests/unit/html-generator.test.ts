import { HtmlGenerator } from '../../src/generation/html-generator';
import { builders } from '../../src/hobo';

describe('HtmlGenerator', () => {
  const generator = new HtmlGenerator();

  it('generateHtml() basic tag works', async () => {
    const d1 = builders.div();
    const generated = generator.generateHtml(d1);
    expect(generated).toEqual('<div></div>');
  });

  it('generateHtml() style tag works', async () => {
    const d1 = builders.style({ '.class': { color: 'red' } });
    const generated = generator.generateHtml(d1);
    expect(generated).toEqual('<style>.class{color:red;}</style>');
  });

  it('generateHtml() script tag works', async () => {
    const d1 = builders.script(() => {
      console.log('hey');
    });
    const generated = generator.generateHtml(d1);
    expect(generated).toEqual("<script>console.log('hey');</script>");
  });

  it('generateHtml() works with nested childs', async () => {
    const d1 = builders.div(builders.span(), builders.p('Some string'));
    const generated = generator.generateHtml(d1);
    expect(generated).toEqual(`<div><span></span><p>Some string</p></div>`);
  });

  it('generateHtml() works with nested tag builders', async () => {
    const d1 = builders.div(builders.span(), builders.p);
    const generated = generator.generateHtml(d1);
    expect(generated).toEqual(`<div><span></span><p></p></div>`);
  });

  it('generateHtml() works for self closing tags', async () => {
    expect(generator.generateHtml(builders.img.b())).toEqual('<img/>');
  });

  it('generateHtml() works with attributes', async () => {
    expect(generator.generateHtml(builders.img.aa('src', 'test.com').b())).toEqual('<img src="test.com"/>');
  });

  it('generateHtml() works with class names', async () => {
    expect(generator.generateHtml(builders.img.ac('src').b())).toEqual('<img class="src"/>');
  });

  it('generateHtml() works with id', async () => {
    expect(generator.generateHtml(builders.img.id('src').b())).toEqual('<img id="src"/>');
  });

  it('generateHtml() works with inline styles', async () => {
    expect(generator.generateHtml(builders.img.as('color', 'red').b())).toEqual('<img style="color:red;"/>');
  });
});
