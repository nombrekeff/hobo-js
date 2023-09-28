import builders, { doc } from '../src/hobo';

const { div, p, span, b } = builders;

doc();

console.log(div.a.ca('class').aa('a', 'b')('tag', b('I am bold!')));
