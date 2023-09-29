import { AttrSet } from '../../src/attributes';
import { Tag } from '../../src/tag';
import { builders } from '../../src/tag-builder';

describe('TagBuilder', () => {
  it('creates correctly', async () => {
    const tag = new Tag('custom-tag', [], new AttrSet(), {
      selfClosing: false,
      storesChildren: false,
      storage: false,
    });
    expect(tag).toBeDefined();
    expect(tag.tagName).toEqual('custom-tag');
    expect(tag.children).toEqual([]);
  });

  it('.className returns className', async () => {
    const attrSet = new AttrSet();
    const tag = new Tag('custom-tag', [], attrSet, {
      selfClosing: false,
      storesChildren: false,
      storage: false,
    });
    expect(tag.className).toEqual(attrSet.className);
  });

  it('.append adds children', async () => {
    const tag1 = new Tag('custom-tag', [], new AttrSet(), {
      selfClosing: false,
      storesChildren: false,
      storage: false,
    });
    const tag2 = new Tag('custom-tag2', [], new AttrSet(), {
      selfClosing: false,
      storesChildren: false,
      storage: false,
    });

    tag1.append(tag2);

    expect(tag1.children).toEqual([tag2]);
  });

  it('.append works with TagBuilder', async () => {
    const tag1 = new Tag('custom-tag', [], new AttrSet(), {
      selfClosing: false,
      storesChildren: false,
      storage: false,
    });
    const d = builders.div.ac('aa');
    
    tag1.append(d);

    expect(tag1.children[0]).toBeInstanceOf(Tag);
  });

  it('.findByTagName works', async () => {
    const tag1 = new Tag('custom-tag', [], new AttrSet(), {
      selfClosing: false,
      storesChildren: false,
      storage: false,
    });
    const d = builders.div.ac('aa');
    tag1.append(d);
    
    const found = tag1.findByTagName('div');
    expect(found).toEqual(d.b());
  });

  it('.findByTagName returns null if not find', async () => {
    const tag1 = new Tag('custom-tag', [], new AttrSet(), {
        selfClosing: false,
        storesChildren: false,
        storage: false,
      });
      const found = tag1.findByTagName('div');
      expect(found).toEqual(null);
  });
});
