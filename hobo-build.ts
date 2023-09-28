import { argv } from 'process';
import * as fs from 'fs';
import path from 'path';
import { HtmlGenerator } from './src/generation/html-generator';

const args = argv.slice(2);
const hoboAppPath = args[0];
if (!hoboAppPath) throw new Error('Incorrect usage: A path is required!');

const files = fs.readdirSync(hoboAppPath);
console.log(files);

const hoboGenerator = new HtmlGenerator();

for (const file of files) {
  const fullPath = path.join(__dirname, hoboAppPath, file);
  if (fs.statSync(fullPath).isFile && fullPath.endsWith('hobo.ts')) {
    const fileExpr = require(fullPath);

    if (!fileExpr.default) {
      throw new Error('hobo files must have a default export, which should be a hobo tag.');
    }

    console.log('fileExprt', fileExpr.default);
    fs.writeFileSync(fullPath.replace('.ts', '.html'), hoboGenerator.generateHtml(fileExpr.default));
  } else {
    // Not handled
  }
}
