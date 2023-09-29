import { allKnownTags, closingTags, selfClosingTags } from '../../src/custom-types/tag-names';
import { builders } from '../../src/hobo';
import { Tag } from '../../src/tag';
import { builders as tagBuilders, TagBuilder } from '../../src/tag-builder';
const { tag } = builders;

describe('TagBuilder', () => {
  it('creates correctly', async () => {
    const builder = tag('custom-tag');
    expect(builder).toBeDefined();
    expect(builder.tagName).toEqual('custom-tag');
  });

  it('all tags exist as builders', async () => {
    for (let tagName of allKnownTags) {
      expect(tagName in builders).toBeTruthy();
    }
  });

  it('selfClosing tags set correct metadata', async () => {
    for (let tagName of selfClosingTags) {
      const builder = builders[tagName] as TagBuilder;
      expect(builder._meta.selfClosing).toEqual(true);
    }
  });

  it('nonSelfClosing tags set correct metadata', async () => {
    for (let tagName of closingTags) {
      const builder = builders[tagName] as TagBuilder;
      expect(builder._meta.selfClosing).toEqual(false);
    }
  });

  it('.className returns className', async () => {
    const someTag = builders.div;
    expect(someTag.className).toBe(someTag.attr.className);
  });

  it('.tagId returns id', async () => {
    const someTag = builders.div.id('aaa');
    expect(someTag.attr.id).toEqual('aaa');
    expect(someTag.tagId).toEqual('aaa');
  });

  it('.b builds tag', async () => {
    const someTag = builders.div.id('aaa');
    const built = someTag.b();

    expect(built.tagName).toEqual('div');
    expect(built.tagId).toEqual('aaa');
    expect(built).toBeInstanceOf(Tag);
  });

  it('.a returns builder', async () => {
    const someTag = tagBuilders.div.a;
    expect(someTag).toBeInstanceOf(TagBuilder);
  });

  it('.p sets parent', async () => {
    const papa = builders.div();
    const someTag = builders.div.p(papa);

    expect(someTag._parent).toEqual(papa);
  });

  it('.text replaces children with given text', async () => {
    const papa = builders.div.text('Some text');
    expect(papa.b().children).toEqual(['Some text']);
  });

  it('.append adds children', async () => {
    const child = builders.div();
    const papa = builders.div.append(child);

    expect(papa.children).toEqual([child]);
  });

  it('.append does not add children for selfClosingTags', async () => {
    const child = builders.div();
    const papa = builders.img.append(child);

    expect(papa.children).toEqual([]);
  });


  it('.append works with TagBuilder', async () => {

    const papa = builders.div.append(builders.div);

    expect(papa.children).toEqual([builders.div()]);
  });

  it('.setChildren does not add children for selfClosingTags', async () => {
    const el = builders.div.append('Initial child');
    const child = builders.a();
    const papa = el.setChildren([builders.a()]);

    expect(papa.children).toEqual([builders.a()]);
  });

  it('.store stores', async () => {
    const el = builders.div.store('some data');
    expect(el._meta.storage).toEqual('some data');
  });

  it('.m works', async () => {
    const el = builders.div.m((b) => b.attr.className.add('one'));
    expect(el.b().attr.className.classNames).toContain('one');
  });

  it('.mc works', async () => {
    const el = builders.div.mc((c) => c.add('one'));
    expect(el.b().attr.className.classNames).toContain('one');
  });

  it('.ac works', async () => {
    const el = builders.div.ac('one');
    expect(el.b().attr.className.classNames).toContain('one');
  });

  it('.rc works', async () => {
    const el = builders.div.ac('one').rc('one');
    expect(el.b().attr.className.classNames).not.toContain('one');
  });

  it('.aa works', async () => {
    const el = builders.div.aa('one', 'two').b();
    expect('one' in el.attr.additionalAttributes).toEqual(true);
    expect(el.attr.additionalAttributes['one']).toEqual('two');
  });

  it('.am works', async () => {
    const el = builders.div.am({ one: 'two' }).b();
    expect('one' in el.attr.additionalAttributes).toEqual(true);
    expect(el.attr.additionalAttributes['one']).toEqual('two');
  });

  it('.ra works', async () => {
    const el = builders.div.aa('one', 'two');
    el.ra('one');
    expect(el.b().attr.additionalAttributes).not.toContain('one');
  });

  it('.as works', async () => {
    const el = builders.div.as('color', 'red').b();
    expect('color' in el.attr.style.styles).toEqual(true);
    expect(el.attr.style.styles['color']).toEqual('red');
  });

  it('.ss works', async () => {
    const el = builders.div.ss({ color: 'red' }).b();
    expect('color' in el.attr.style.styles).toEqual(true);
    expect(el.attr.style.styles['color']).toEqual('red');
  });

  it('.rs works', async () => {
    const el = builders.div.ss({ color: 'red' }).rs('color').b();
    expect('color' in el.attr.style.styles).toEqual(false);
  });

  it('Error for invalid tag!', async () => {
    expect(() => {
      builders.tag('123&');
    }).toThrow();
  });
});
