import { tst } from '$lib/Variables/toastStyleConfig';
import axios, { AxiosError } from 'axios';
import type { comment } from '../../../app';
import commentStore from '../commentStore';
import globalStore from '../globalStore';
import { dictionary } from 'svelte-i18n';
// 타입이 애매해서 any로 돌림, 어차피 값은 lang의 ts파일 목록
let dic :any
dictionary.subscribe(val=>dic=val)

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

const loadCommentList = async (size: number, page: number, aid: string) => {
	console.log(size, page, aid);
	
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post(`/v1/comment/list`, { aid: aid, page: page, size: size });
	console.log(data);
	
	const { comments, total } = data;

	if (statusText === 'OK') {
		commentStore.commentList.update((val) => (val = [...comments]));
		commentStore.commentTotal.update((val) => (val = total));
	}
};

const loadMoreCommentList = async (size: number, page: number, aid: string) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post(`/v1/comment/list`, { aid: aid, page: page, size: size });
	const { comments, total } = data;

	if (statusText === 'OK') {
		commentStore.commentList.update((val) => (val = [...val, ...comments]));
		commentStore.commentTotal.update((val) => (val = total));
	}
};

const writeComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post(`/v1/comment/write`, { ...params });
	if (statusText === 'OK') {
		tst('success', dic.ko.comment_registered);
		loadCommentList(data + 10, 0, params.aid as unknown as string);
	}
};

const deleteComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	const { statusText } = await axios
		.post(`/v1/comment/delete`, { ...params })
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
	if (statusText === 'OK') {
		tst('success', dic.ko.comment_removed);
		loadCommentList(params.rid! + 10, 0, params.aid as unknown as string);
	}
};

const modifyComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post(`/v1/comment/modify`, { ...params });
	if (statusText === 'OK') {
		loadCommentList(data + 5, 0, params.aid as unknown as string);
		tst('success', dic.ko.comment_edited);
	}
};

const reset = () => {
	globalStore.isLoading.update((val) => (val = true));
	commentStore.commentList.update((val) => (val = []));
	commentStore.page.update((val) => (val = 0));
	commentStore.size.update((val) => (val = 5));
	commentStore.commentTotal.update((val) => (val = 0));
	globalStore.isLoading.update((val) => (val = false));
};

export default { loadCommentList, writeComment, deleteComment, reset, modifyComment, loadMoreCommentList };
