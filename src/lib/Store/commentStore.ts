import { writable } from 'svelte/store';
import type { article as articleProps, comment } from '../../app';


const page = writable<number>(0);
const size = writable<number>(10);
const total = writable<number>(Number.MAX_SAFE_INTEGER);
const commentTotal = writable<number>(Number.MAX_SAFE_INTEGER);
const commentList = writable<comment[]>([]);

export default { page, size, total, commentList, commentTotal };
