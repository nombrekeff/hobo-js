/** This stuff will run inside the browser */
function createState(state) {
    const stateHandler = {
        get(target, prop, receiver) {
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
function q(selector) {
    const element = document.querySelector(selector);
    if (element != undefined)
        return new HoboTag(element);
}
class HoboTag {
    constructor(element) {
        this.element = element;
    }
    clicked(callback) {
        this.element.addEventListener('click', (evt) => {
            callback(this, evt);
        });
    }
    text(text) {
        this.element.textContent = text;
    }
    add(tag) {
        this.element.appendChild(tag.element);
    }
}
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}
function fromStr(tag) {
    return new HoboTag(createElementFromHTML(tag));
}
const rt = {
    createState,
    q,
    HoboTag,
    createElementFromHTML,
    fromStr,
};
//# sourceMappingURL=hobo-rt.js.map