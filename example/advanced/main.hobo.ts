import { div, doc } from '../../src/hobo';
import myComponent from './component.hobo';

const root = doc();

div.a('I will have a component as a child!!!', myComponent);

export default root.doc;
