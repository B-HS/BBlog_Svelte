import axios from 'axios';
import articleStore from '../articleStore';
import globalStore from '../globalStore';
import type { comment } from '../../../app';
import commentStore from '../commentStore';

const loadCommentList = async (size: number, page: number, aid: string) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post('/v1/comment/list', { aid: aid, page: page, size: size });
	const { comments, total } = data;

	if (statusText === 'OK') {
		commentStore.commentList.update((val) => (val = [...comments]));
		commentStore.commentTotal.update((val) => (val = total));
		globalStore.isLoading.update((val) => (val = false));
	}
};

const loadMoreCommentList = async (size: number, page: number, aid: string) => {
	console.log(size, page, aid);
	
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post('/v1/comment/list', { aid: aid, page: page, size: size });
	const { comments, total } = data;

	if (statusText === 'OK') {
		commentStore.commentList.update((val) => (val = [...val, ...comments]));
		commentStore.commentTotal.update((val) => (val = total));
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

const deleteComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	const { statusText } = await axios.post('/v1/comment/delete', { ...params });
	if (statusText === 'OK') {
		loadCommentList(params.rid! + 10, 0, params.aid as unknown as string);
		globalStore.isLoading.update((val) => (val = false));
	}
};

const modifyComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post('/v1/comment/modify', { ...params });
	if (statusText === 'OK') {
		loadCommentList(data + 5, 0, params.aid as unknown as string);
		globalStore.isLoading.update((val) => (val = false));
	}
};

const reset = () => {
	globalStore.isLoading.update((val) => (val = true));
	commentStore.commentList.update((val) => (val = []));
	commentStore.page.update(val=> val=0)
	commentStore.size.update(val=> val=5)
	commentStore.commentTotal.update(val=>val=0)
	globalStore.isLoading.update((val) => (val = false));
};

export default { loadCommentList, writeComment, deleteComment, reset, modifyComment, loadMoreCommentList };
