import axios from 'axios';
import articleStore from '../articleStore';
import globalStore from '../globalStore';
import type { comment } from '../../../app';

const uploadImage = async (file: FormData) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post('/v1/image/upload', file);
	if (statusText === 'OK') {
		globalStore.isLoading.update((val) => (val = false));
		return data;
	}
};

const loadArticleList = async (size: number, page: number, menu: string) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post('/v1/article/list', { menu: menu, page: page, size: size });
	const { articles, total } = data;

	if (statusText === 'OK') {
		articleStore.articles.update((val) => (val = [...val, ...articles]));
		articleStore.total.update((val) => (val = total));
		globalStore.isLoading.update((val) => (val = false));
	}
};

const loadCommentList = async (size: number, page: number, aid: string) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post('/v1/comment/list', { aid: aid, page: page, size: size });
	const { comments, total } = data;

	if (statusText === 'OK') {
		articleStore.commentList.update((val) => (val = [...comments]));
		articleStore.commentTotal.update((val) => (val = total));
		globalStore.isLoading.update((val) => (val = false));
	}
};

const writeComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post('/v1/comment/write', { ...params });
	if (statusText === 'OK') {
		loadCommentList(data + 10, 0, params.aid as unknown as string);
		globalStore.isLoading.update((val) => (val = false));
	}
};

const reset = () => {
	globalStore.isLoading.update((val) => (val = true));
	articleStore.article.update(
		(val) =>
			(val = { aid: 0, context: '', createdDate: '', hide: false, menu: '', thumbnail: '', title: '', tags: [], visitCnt: 0 })
	);
	articleStore.commentList.update(val=>val=[])
	articleStore.articles.update(val=>val=[])
	articleStore.page.update(val=>val=0)
	articleStore.size.update(val=>val=5)
	globalStore.isLoading.update((val) => (val = false));
	
};

export default { uploadImage, loadArticleList, loadCommentList, writeComment, reset };
