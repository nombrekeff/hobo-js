import path from 'path';
import * as fs from 'fs';
import { builders, generate } from '../src/hobo';

const { a } = builders;

// Add single style
const root = a
  .as('color', 'bisque')
  // Add class names directly
  .ss({ color: 'black', fontWeight: 'bold' });

fs.writeFileSync(path.join(__dirname, 'generated/tag-inline-styles.html'), generate(root.b()));
