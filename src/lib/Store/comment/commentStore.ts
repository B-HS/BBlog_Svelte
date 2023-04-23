import { writable } from 'svelte/store';
import type { comment } from '../../../app';
import globalStore from '../globalStore';
const page = writable<number>(0);
const size = writable<number>(10);
const total = writable<number>(Number.MAX_SAFE_INTEGER);
const commentTotal = writable<number>(Number.MAX_SAFE_INTEGER);
const commentList = writable<comment[]>([]);

const loadCommentList = async (size: number, page: number, aid: string) => {
	return fetch('/v1/comment/list', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ aid: aid, page: page, size: size })
	});
};

const loadMoreCommentList = async (size: number, page: number, aid: string) => {
	return fetch('/v1/comment/list', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ aid: aid, page: page, size: size })
	});
};

const writeComment = async (params: comment) => {
	return fetch('/v1/comment/write', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...params })
	});
};

const deleteComment = async (params: comment) => {
	return fetch('/v1/comment/delete', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...params })
	});
};

const modifyComment = async (params: comment) => {
	return fetch('/v1/comment/modify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...params })
	});
};

const commentReset = () => {
	globalStore.isLoading.update((val) => (val = true));
	commentList.update((val) => (val = []));
	page.update((val) => (val = 0));
	size.update((val) => (val = 5));
	commentTotal.update((val) => (val = 0));
	globalStore.isLoading.update((val) => (val = false));
};

export default {
	page,
	size,
	total,
	commentList,
	commentTotal,
	loadCommentList,
	writeComment,
	deleteComment,
	commentReset,
	modifyComment,
	loadMoreCommentList
};
