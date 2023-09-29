import { AttachMode } from '../../src/custom-types/types';
import { _context, attach, builders, detach, doc, generate } from '../../src/hobo';
import { Tag } from '../../src/tag';

describe('TagBuilder', () => {
  it('doc works', async () => {
    const d = doc();
    expect('doc' in d).toBeTruthy();
    expect('head' in d).toBeTruthy();
    expect('body' in d).toBeTruthy();

    expect(d.doc).toBeInstanceOf(Tag);
    expect(d.head).toBeInstanceOf(Tag);
    expect(d.body).toBeInstanceOf(Tag);
  });

  it('doc(AttachMode.html) works', async () => {
    _context.attachedTag = null; // Reset
    _context.attachedTagStack = [];
    const d = doc('title', AttachMode.html);
    expect(_context.attachedTag).toBe(d.doc);
  });

  it('doc(AttachMode.head) works', async () => {
    _context.attachedTag = null; // Reset
    _context.attachedTagStack = [];
    const d = doc('title', AttachMode.head);
    expect(_context.attachedTag).toBe(d.head);
  });

  it('doc(AttachMode.body) works', async () => {
    _context.attachedTag = null; // Reset
    _context.attachedTagStack = [];
    const d = doc('title', AttachMode.body);
    expect(_context.attachedTag).toBe(d.body);
  });

  it('doc(AttachMode.none) works', async () => {
    _context.attachedTag = null; // Reset
    _context.attachedTagStack = [];
    const d = doc('title', AttachMode.none);
    expect(_context.attachedTag).toBe(null);
  });

  it('attach() works', async () => {
    _context.attachedTag = null; // Reset
    _context.attachedTagStack = [];
    const d = builders.div.b();
    attach(d);
    expect(_context.attachedTag).toEqual(d);

    const child = builders.div.a.b();

    expect(_context.attachedTag.children).toContain(child);
  });

  it('attach() works when there are other attached tags', async () => {
    _context.attachedTag = null; // Reset
    _context.attachedTagStack = [];
    const d = builders.div.b();
    attach(d);
    const d1 = builders.div();
    attach(d1);
    expect(_context.attachedTag).toEqual(d1);
    expect(_context.attachedTagStack).toEqual([d]);

    detach();
    expect(_context.attachedTag).toEqual(d);
    expect(_context.attachedTagStack).toEqual([]);
    detach();
    expect(_context.attachedTag).toEqual(null);
    expect(_context.attachedTagStack).toEqual([]);
  });

  it('generate() works', async () => {
    const d = builders.div.b();
    expect(generate(d)).toEqual('<div></div>');
  });
});
