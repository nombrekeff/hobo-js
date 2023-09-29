"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashToCamel = exports.camelToDash = exports.generateId = exports.replaceDoubleQuotes = exports.justFnBody = void 0;
/** Receives a function, and returns just the body of the function as a string */
function justFnBody(fn) {
    let fnStr = fn.toString();
    fnStr = fnStr.replace(/^(.*{)/, '');
    fnStr = fnStr.replace(/}$/, '');
    fnStr = fnStr.replace(/^\(.*\)\s?=>\s?{/, '');
    return fnStr.trim();
}
exports.justFnBody = justFnBody;
const replaceDoubleQuotes = (str) => str.replace(/"/g, "'");
exports.replaceDoubleQuotes = replaceDoubleQuotes;
const generateId = () => `_hb${s4() + s4()}`;
exports.generateId = generateId;
const camelToDash = (str) => str.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
exports.camelToDash = camelToDash;
const dashToCamel = (str) => str.replace(/(\-[a-z])/g, (val) => val.toUpperCase().replace('-', ''));
exports.dashToCamel = dashToCamel;
const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//# sourceMappingURL=util.js.map