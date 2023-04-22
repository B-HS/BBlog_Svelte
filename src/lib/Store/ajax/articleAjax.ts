import { tst } from '$lib/Variables/toastStyleConfig';
import axios, { AxiosError } from 'axios';
import { dictionary } from 'svelte-i18n';
import { Cookies } from 'typescript-cookie';
import type { article } from '../../../app';
import articleStore from '../articleStore';
import commentStore from '../commentStore';
import globalStore from '../globalStore';
// 타입이 애매해서 any로 돌림, 어차피 값은 lang의 ts파일 목록
let dic: any;
dictionary.subscribe((val) => (dic = val));
axios.interceptors.response.use(
	(res) => {
		globalStore.isLoading.update((val) => (val = false));
		return res;
	},
	(error: AxiosError) => {
		tst('fail', `${error.response?.status} ${dic.ko.request_fail}`);
		globalStore.isLoading.update((val) => (val = false));
	}
);

const visit = async (aid: number, referrer: string) => {
	globalStore.isLoading.update((val) => (val = true));
	await axios.post('/v1/visit/read', { aid: aid, visitUrl: referrer });
};

const uploadImage = async (file: FormData) => {
	globalStore.isLoading.update((val) => (val = true));
	const data = await axios.post(`/v1/image/upload`, file).then((res) => {
		if (res.statusText === 'OK') {
			tst('success', dic.ko.image_upload_success);
			return res.data;
		}
	});
	return data;
};

const writeArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	await axios
		.post(`/v1/article/write`, article, {
			headers: { token: 'Bearer ' + Cookies.get('token') }
		})
		.then((res) => {
			if (res.statusText === 'OK') {
				window.location.href = `${article.menu === 'PORTFOLIO' ? '/portfolio/' : '/blog/'}${res.data}`;
			}
		});
};

const deleteArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	await axios
		.post(`/v1/article/delete`, article, {
			headers: { token: 'Bearer ' + Cookies.get('token') }
		})
		.then((res) => {
			if (res.statusText === 'OK') {
				window.location.href = `${article.menu === 'PORTFOLIO' ? '/portfolio' : '/blog'}`;
			}
		});
};

const modifyArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	await axios
		.post(`/v1/article/modify`, article, {
			headers: { token: 'Bearer ' + Cookies.get('token') }
		})
		.then((res) => {
			if (res.statusText === 'OK') {
				window.location.reload();
			}
		});
};

const loadArticleList = async (size: number, page: number, menu: string) => {
	globalStore.isLoading.update((val) => (val = true));
	await axios.post(`/v1/article/list`, { menu: menu, page: page, size: size }).then((res) => {
		if (res.statusText === 'OK') {
			reset();
			articleStore.articles.update((val) => (val = [...val, ...res.data.articles]));
			articleStore.total.update((val) => (val = res.data.total));
		}
	});
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

export default { uploadImage, loadArticleList, reset, writeArticle, modifyArticle, deleteArticle, visit };
