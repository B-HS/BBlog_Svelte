import { tst } from '$lib/Variables/toastStyleConfig';
import { dictionary } from 'svelte-i18n';
import { writable } from 'svelte/store';
import type { comment } from '../../../app';
import globalStore from '../globalStore';
const page = writable<number>(0);
const size = writable<number>(10);
const total = writable<number>(Number.MAX_SAFE_INTEGER);
const commentTotal = writable<number>(Number.MAX_SAFE_INTEGER);
const commentList = writable<comment[]>([]);

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
				console.log('==============코멘트 로드');
				res.json().then((cmt) => {
					commentList.update((val) => (val = [...cmt.comments]));
					commentTotal.update((val) => (val = cmt.total));
				});
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
				console.log('==============코멘트 더 로드');
				res.json().then((cmt) => {
					commentList.update((val) => (val = [...val, ...cmt.comments]));
					commentTotal.update((val) => (val = cmt.total));
				});
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
				console.log('==============코멘트 작성');
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
				console.log('==============코멘트 삭제');
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
				console.log('==============코멘트 수정');
			}
		})
		.finally(() => globalStore.isLoading.update((val) => (val = false)));
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
