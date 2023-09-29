import path from 'path';
import * as fs from 'fs';
import { builders, generate } from '../src/hobo';

const { div, style } = builders;

const root = div;

root.append(
  style(
    {
      body: {
        backgroundColor: 'red',
      },
    },
    {
      '.some-class': {
        color: 'blue',
      },
    },
  ),
);

fs.writeFileSync(path.join(__dirname, 'generated/tag-styles.html'), generate(root.b()));
