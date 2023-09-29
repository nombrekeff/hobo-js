import path from 'path';
import * as fs from 'fs';
import { builders, doc, generate } from '../src/hobo';

const { div } = builders;

// Add class names using builder helper methods
const root = div.ac('card-wrapper').append(div.ac('card', 'centered'));

// Add class names directly
root.attr.className.add('card-wrapper');

fs.writeFileSync(path.join(__dirname, 'generated/tag-classes.html'), generate(root.b()));