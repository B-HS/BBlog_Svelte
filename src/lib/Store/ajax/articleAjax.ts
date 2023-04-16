import { tst } from '$lib/Variables/toastStyleConfig';
import axios, { AxiosError } from 'axios';
import articleStore from '../articleStore';
import commentStore from '../commentStore';
import globalStore from '../globalStore';
import type { article } from '../../../app';
import { adminCheck } from '../routerGuard/routerGuard';
import { Cookies } from 'typescript-cookie';

axios.interceptors.response.use(
	(res) => {
		globalStore.isLoading.update((val) => (val = false));
		return res;
	},
	(error: AxiosError) => {
		tst('fail', `${error.response?.status} - 요청에 실패하였습니다`);
		globalStore.isLoading.update((val) => (val = false));
	}
);

const uploadImage = async (file: FormData) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post(`/v1/image/upload`, file);
	if (statusText === 'OK') {
		tst('success', '이미지 업로드에 성공하였습니다');
		globalStore.isLoading.update((val) => (val = false));
		return data;
	}
};

const writeArticle = async (article: article) => {
	globalStore.isLoading.update((val) => (val = true));
	
	const { data, statusText } = await axios.post(`/v1/article/write`, article, {headers:{token:"Bearer "+Cookies.get("token")}});

	if (statusText === 'OK') {
		window.location.href=`${article.menu==="PORTFOLIO"?"/portfolio/":"/blog/"}${data}`
	}
	globalStore.isLoading.update((val) => (val = false));
	
};

const loadArticleList = async (size: number, page: number, menu: string) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post(`/v1/article/list`, { menu: menu, page: page, size: size });
	const { articles, total } = data;

	if (statusText === 'OK') {
		reset()
		articleStore.articles.update((val) => (val = [...val, ...articles]));
		articleStore.total.update((val) => (val = total));
	}
	globalStore.isLoading.update((val) => (val = false));
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

export default { uploadImage, loadArticleList, reset, writeArticle };
