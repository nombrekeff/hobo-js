import { State, StateProxy } from './types/types';
export declare function createState<T extends State>(state: T, name?: string): StateProxy<T>;
