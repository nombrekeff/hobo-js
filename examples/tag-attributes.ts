import path from 'path';
import * as fs from 'fs';
import { builders, generate } from '../src/hobo';

const { a } = builders;

// Add single attribute
const root = a
  .aa('href', 'https://example.com')
  // Add class names directly
  .am({ href: 'https://example.com', tooltip: 'Go to website' });

fs.writeFileSync(path.join(__dirname, 'generated/tag-attributes.html'), generate(root.b()));
