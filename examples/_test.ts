import { attach, doc, generate } from '../src/hobo';
import { builders } from '../src/tag-builder';

const { div, img } = builders;

console.log(generate(img!.id('src').b()))
console.log(generate(img!.as('color', 'red').b()))
