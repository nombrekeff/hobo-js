import { attach, builders, doc, generate } from '../src/hobo';

const { div, img } = builders;

const root = div.b();
attach(root);

img.a();

console.log(root);