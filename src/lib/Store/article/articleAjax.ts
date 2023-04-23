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
	const data = fetch('https://hyns.dev/v1/image/upload', {
		method: 'POST',
		body: file
	})
		.then((res) => {
			if (res.statusText === 'OK') {
				console.log("업로드됨");
				tst('success', dic.ko.image_upload_success);
			}
			console.log("==============이미지 업로드");
			console.log(res);
			return res.text();
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
	return data;
};

const writeArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('https://hyns.dev/v1/article/write', {
		method: 'POST',
		body: JSON.stringify(article),
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') }
	})
		.then(async (res) => {
			console.log("==============글쓰기");
			window.location.href = `${article.menu === 'PORTFOLIO' ? '/portfolio/' : '/blog/'}${await res.text()}`;
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const deleteArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('https://hyns.dev/v1/article/delete', {
		method: 'POST',
		body: JSON.stringify(article),
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') }
	})
		.then(async () => {
			console.log("==============글삭제");
			window.location.href = `${article.menu === 'PORTFOLIO' ? '/portfolio' : '/blog'}`;
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const modifyArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('https://hyns.dev/v1/article/modify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', token: 'Bearer ' + Cookies.get('token') },
		body: JSON.stringify(article)
	})
		.then((res) => {
			if (res.statusText === 'OK') {
				console.log("==============글수정");
				window.location.reload();
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const loadArticleList = async (size: number, page: number, menu: string) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('https://hyns.dev/v1/article/list', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ menu: menu, page: page, size: size })
	})
		.then(async (res) => {
			if (res.statusText === 'OK') {
				console.log("==============글로딩");
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
