import { dictionary } from 'svelte-i18n';
import { writable } from 'svelte/store';
import { Cookies } from 'typescript-cookie';
import type { article, article as articleProps } from '../../../app';
import globalStore from '../globalStore';

const article = writable<articleProps>({
	aid: 0,
	context: '',
	createdDate: '',
	hide: false,
	menu: '',
	thumbnail: '',
	title: '',
	tags: [],
	visitCnt: 0
});
const articles = writable<articleProps[]>([]);
const currentTab = writable<number>(0);
const page = writable<number>(0);
const size = writable<number>(5);
const total = writable<number>(Number.MAX_SAFE_INTEGER);

const uploadImage = async (file: FormData) => {
	return fetch('/v1/image/upload', {
		method: 'POST',
		body: file
	});
};

const writeArticle = async (article: article) => {
	return fetch('/v1/article/write', {
		method: 'POST',
		body: JSON.stringify(article),
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') }
	});
};

const deleteArticle = async (article: article) => {
	return fetch('/v1/article/delete', {
		method: 'POST',
		body: JSON.stringify(article),
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') }
	});
};

const modifyArticle = async (article: article) => {
	return fetch('/v1/article/modify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') },
		body: JSON.stringify(article)
	});
};

const loadArticleList = async (size: number, page: number, menu: string) => {
	return fetch('/v1/article/list', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ menu: menu, page: page, size: size })
	});
};

const reset = () => {
	globalStore.isLoading.update((val) => (val = true));
	article.update(
		(val) =>
			(val = { aid: 0, context: '', createdDate: '', hide: false, menu: '', thumbnail: '', title: '', tags: [], visitCnt: 0 })
	);
	articles.update((val) => (val = []));
	page.update((val) => (val = 0));
	size.update((val) => (val = 5));
	globalStore.isLoading.update((val) => (val = false));
};

export default {
	article,
	articles,
	currentTab,
	page,
	size,
	total,
	uploadImage,
	loadArticleList,
	reset,
	writeArticle,
	modifyArticle,
	deleteArticle
};
