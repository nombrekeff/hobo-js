import { AttrSet } from '../../src/attributes';
import { StyleSet } from '../../src/style';

describe('Misc tests', () => {
    it('attr.has()', () => {
        const attr = new AttrSet();
        attr.set('one', 'two');
        expect(attr.has('one')).toEqual(true);
        expect(attr.has('two')).toEqual(false);
    });
    it('style.has()', () => {
        const style = new StyleSet();
        style.set('one', 'two');
        expect(style.has('one')).toEqual(true);
        expect(style.has('two')).toEqual(false);
    });
});