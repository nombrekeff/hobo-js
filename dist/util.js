/** Receives a function, and returns just the body of the function as a string */
export function justFnBody(fn) {
    let fnStr = fn.toString();
    fnStr = fnStr.replace(/^(.*{)/, '');
    fnStr = fnStr.replace(/}$/, '');
    fnStr = fnStr.replace(/^\(.*\)\s?=>\s?{/, '');
    return fnStr.trim();
}
export const replaceDoubleQuotes = (str) => str.replace(/"/g, "'");
export const generateId = () => `_hb${s4() + s4()}`;
export const camelToDash = (str) => str.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
export const dashToCamel = (str) => str.replace(/(\-[a-z])/g, (val) => val.toUpperCase().replace('-', ''));
const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//# sourceMappingURL=util.js.map