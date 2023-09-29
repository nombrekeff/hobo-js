import path from 'path';
import * as fs from 'fs';
import { builders, generate } from '../src/hobo';

const { div, script } = builders;

const root = div.append(
  script(() => {
    const rootDiv = document.querySelector('div');
  }),
);

fs.writeFileSync(path.join(__dirname, 'generated/tag-scripts.html'), generate(root.b()));
