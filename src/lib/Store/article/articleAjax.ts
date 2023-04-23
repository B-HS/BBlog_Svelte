import { tst } from '$lib/Variables/toastStyleConfig';
import { dictionary } from 'svelte-i18n';
import { Cookies } from 'typescript-cookie';
import type { article } from '../../../app';
import articleStore from './articleStore';
import commentStore from '../comment/commentStore';
import globalStore from '../globalStore';
// 타입이 애매해서 any로 돌림, 어차피 값은 lang의 ts파일 목록
let dic: any;
dictionary.subscribe((val) => (dic = val));


const uploadImage = async (file: FormData) => {
	globalStore.isLoading.update((val) => (val = true));
	const data = fetch('/v1/image/upload', {
		method: 'POST',
		body: file
	})
		.then((res) => {
			if (res.statusText === 'OK') {
				tst('success', dic.ko.image_upload_success);
			}
			return res.text();
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
	return data;
};

const writeArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/article/write', {
		method: 'POST',
		body: JSON.stringify(article),
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') }
	})
		.then(async (res) => {
			window.location.href = `${article.menu === 'PORTFOLIO' ? '/portfolio/' : '/blog/'}${await res.text()}`;
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const deleteArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/article/delete', {
		method: 'POST',
		body: JSON.stringify(article),
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') }
	})
		.then(async () => {
			window.location.href = `${article.menu === 'PORTFOLIO' ? '/portfolio' : '/blog'}`;
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const modifyArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/article/modify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') },
		body: JSON.stringify(article)
	})
		.then((res) => {
			if (res.statusText === 'OK') {
				window.location.reload();
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const loadArticleList = async (size: number, page: number, menu: string) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/article/list', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ menu: menu, page: page, size: size })
	})
		.then(async (res) => {
			if (res.statusText === 'OK') {
				const data = await res.json();
				articleStore.articles.update((val) => (val = [...val, ...data.articles]));
				articleStore.total.update((val) => (val = data.total));
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const reset = () => {
	globalStore.isLoading.update((val) => (val = true));
	articleStore.article.update(
		(val) =>
			(val = { aid: 0, context: '', createdDate: '', hide: false, menu: '', thumbnail: '', title: '', tags: [], visitCnt: 0 })
	);
	commentStore.commentList.update((val) => (val = []));
	articleStore.articles.update((val) => (val = []));
	articleStore.page.update((val) => (val = 0));
	articleStore.size.update((val) => (val = 5));
	globalStore.isLoading.update((val) => (val = false));
};

export default { uploadImage, loadArticleList, reset, writeArticle, modifyArticle, deleteArticle };
