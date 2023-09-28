export function replaceDoubleQuotes(str: string): string {
  return str.replace(/"/g, "'");
}

/** Receives a function, and returns just the body of the function as a string */
export function justFnBody(fn: Function) {
  let fnStr = fn.toString();
  fnStr = fnStr.replace(/^(.*{)/, '');
  fnStr = fnStr.replace(/}$/, '');
  fnStr = fnStr.replace(/^\(.*\)\s?=>\s?{/, '');
  return fnStr.trim();
}

function s4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function generateId() {
  return `_hb${s4() + s4()}`;
}
