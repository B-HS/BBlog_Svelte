import { tst } from '$lib/Variables/toastStyleConfig';
import { dictionary } from 'svelte-i18n';
import type { comment } from '../../../app';
import commentStore from './commentStore';
import globalStore from '../globalStore';
// 타입이 애매해서 any로 돌림, 어차피 값은 lang의 ts파일 목록
let dic: any;
dictionary.subscribe((val) => (dic = val));

const loadCommentList = async (size: number, page: number, aid: string) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/comment/list', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ aid: aid, page: page, size: size })
	})
		.then(async (res) => {
			if (res.statusText === 'OK') {
				const data = await res.json();
				commentStore.commentList.update((val) => (val = [...data.comments]));
				commentStore.commentTotal.update((val) => (val = data.total));
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const loadMoreCommentList = async (size: number, page: number, aid: string) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/comment/list', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ aid: aid, page: page, size: size })
	})
		.then(async (res) => {
			if (res.statusText === 'OK') {
				const data = await res.json();
				commentStore.commentList.update((val) => (val = [...val, ...data.comments]));
				commentStore.commentTotal.update((val) => (val = data.total));
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const writeComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/comment/write', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...params })
	})
		.then(async (res) => {
			if (res.statusText === 'OK') {
				tst('success', dic.ko.comment_registered);
				loadCommentList(((await res.text()) as unknown as number) + 10, 0, params.aid as unknown as string);
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const deleteComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/comment/delete', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...params })
	})
		.then((res) => {
			if (res.statusText === 'OK') {
				tst('success', dic.ko.comment_removed);
				loadCommentList(params.rid! + 10, 0, params.aid as unknown as string);
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const modifyComment = async (params: comment) => {
	globalStore.isLoading.update((val) => (val = true));
	fetch('/v1/comment/modify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...params })
	})
		.then(async (res) => {
			if (res.statusText === 'OK') {
				loadCommentList(((await res.text()) as unknown as number) + 5, 0, params.aid as unknown as string);
				tst('success', dic.ko.comment_edited);
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
};

const commentReset = () => {
	globalStore.isLoading.update((val) => (val = true));
	commentStore.commentList.update((val) => (val = []));
	commentStore.page.update((val) => (val = 0));
	commentStore.size.update((val) => (val = 5));
	commentStore.commentTotal.update((val) => (val = 0));
	globalStore.isLoading.update((val) => (val = false));
};

export default { loadCommentList, writeComment, deleteComment, commentReset, modifyComment, loadMoreCommentList };
