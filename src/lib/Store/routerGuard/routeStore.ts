import { writable } from 'svelte/store';
import urlParams from './urlParams';
const { admin } = urlParams;
const urls = writable<string[] | string>(admin);
const authentication = writable<string>('user');

export default { urls, authentication };
