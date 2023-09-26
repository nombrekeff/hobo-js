import { doc, p, div, img, tag } from '../src/hobo';

const myPage = doc();
tag("data");
div().id("test").ca("container")
  .div()
  .p(['Hello ', p(['world']).ca("bold", "red")]);
console.log(JSON.stringify(myPage, null, 2));
console.log(img());