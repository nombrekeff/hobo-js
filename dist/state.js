"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createState = void 0;
function createState(state, name) {
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
    proxy['state'] = true;
    return proxy;
}
exports.createState = createState;
//# sourceMappingURL=state.js.map