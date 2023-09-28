/** This stuff will run inside the browser */

function createState(state: any): any {
  const stateHandler = {
    get(target: any, prop: any, receiver: any) {
      console.log('prop: ', prop, target[prop]);
      if (['valueOf', 'toString', ''].includes(prop)) {
      }
      return target[prop];
    },
  };

  // Kinda wonky, might check out later!
  const proxy = new Proxy(state, stateHandler);
  proxy['_state'] = true;
  return proxy;
}

function q(selector: string) {
  const element = document.querySelector(selector) as HTMLElement;
  if (element != undefined) return new HoboTag(element);
}

class HoboTag {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  clicked(callback: (tag: HoboTag, evt: MouseEvent) => void) {
    this.element.addEventListener('click', (evt) => {
      callback(this, evt);
    });
  }

  text(text: string) {
    this.element.textContent = text;
  }

  add(tag: HoboTag) {
    this.element.appendChild(tag.element);
  }
}

function createElementFromHTML(htmlString: string) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild as HTMLElement;
}

function fromStr(tag: string) {
  return new HoboTag(createElementFromHTML(tag));
}

const rt = {
  createState,
  q,
  HoboTag,
  createElementFromHTML,
  fromStr,
};
