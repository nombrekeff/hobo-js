import { State, StateProxy } from './types/types';

export function createState<T extends State>(state: T, name?: string): StateProxy<T> {
  const stateHandler = {
    get(target: any, prop: any, receiver: any) {
      console.log('prop: ', prop, target[prop]);
      if (['valueOf', 'toString', ''].includes(prop)) {
      }
      return target[prop];
    },
  };

  // Kinda wonky, might check out later!
  const proxy = new Proxy<T>(state, stateHandler) as StateProxy<T>;
  proxy['state'] = true;
  return proxy;
}
