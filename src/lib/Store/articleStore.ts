import { writable } from 'svelte/store';
import type { article as articleProps } from '../../app';

const article = writable<articleProps>({
	aid: 0,
	context: '',
	createdDate: '',
	hide: false,
	menu: '',
	thumbnail: '',
	title: '',
	tags: [],
	visitCnt:0
});
const articles = writable<articleProps[]>([]);
const currentTab = writable<number>(0);
const page = writable<number>(0);
const size = writable<number>(5);
const total = writable<number>(Number.MAX_SAFE_INTEGER);


export default { article, articles, currentTab, page, size, total };
