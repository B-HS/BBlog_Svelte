<script lang="ts">
	import articleStore from '$lib/Store/article/articleStore';
	import commentStore from '$lib/Store/comment/commentStore';
	import { tst } from '$lib/Variables/toastStyleConfig';
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import type { comment } from '../../app';
	import globalStore from '$lib/Store/globalStore';
	export let aid: string | number;
	$: uploaded = false;
	let commentParams: comment = {
		commentDesc: '',
		nickname: '',
		pw: '',
		commentGroup: 0,
		commentSort: 0,
		commentImg:
			'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYWnhg%2Fbtr9rgVjbom%2FE4BgkmjwqMdKwzo6JiFAL1%2Fimg.png',
		aid: aid as number
	};

	const imgUploader = (e: Event) => {
		const target = e.target as HTMLInputElement;
		let formData = new FormData();
		if (target.files) {
			globalStore.isLoading.update((val) => (val = true));
			formData.append('upload', target.files[0]);
			articleStore
				.uploadImage(formData)
				.then((res) => {
					if (res.statusText === 'OK') {
						tst('success', $_('image_upload_success'));
					}
					return res.text();
				})
				.finally(() => globalStore.isLoading.update((val) => (val = false)))
				.then((res) => {
					commentParams.commentImg = `/v1/image/` + res;
					uploaded = true;
				});
		}
	};

	const validator = () => {
		if (!commentParams.commentDesc || commentParams.commentDesc.trim().length === 0) {
			tst('warning', $_('comment_no_desc'));
			globalStore.isLoading.update((val) => (val = false));
			return false;
		}

		if (!commentParams.nickname || commentParams.nickname.trim().length === 0) {
			tst('warning', $_('comment_no_nickname'));
			globalStore.isLoading.update((val) => (val = false));
			return false;
		}
		if (!commentParams.pw || commentParams.pw.trim().length === 0) {
			tst('warning', $_('comment_no_pw'));
			globalStore.isLoading.update((val) => (val = false));
			return false;
		}
		return true;
	};

	const writeComment = () => {
		globalStore.isLoading.update((val) => (val = true));
		if (validator()) {
			commentStore
				.writeComment(commentParams)
				.then(async (res) => {
					if (res.statusText === 'OK') {
						tst('success', $_('comment_registered'));
						commentStore
							.loadCommentList(((await res.text()) as unknown as number) + 10, 0, commentParams.aid as unknown as string)
							.then(async (res) => {
								if (res.statusText === 'OK') {
									res.json().then((cmt) => {
										commentStore.commentList.update((val) => (val = [...cmt.comments]));
										commentStore.commentTotal.update((val) => (val = cmt.total));
										commentParams = {
											commentDesc: '',
											nickname: '',
											pw: '',
											commentGroup: 0,
											commentSort: 0,
											commentImg:
												'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYWnhg%2Fbtr9rgVjbom%2FE4BgkmjwqMdKwzo6JiFAL1%2Fimg.png',
											aid: aid as number
										};
									});
								}
							});
					}
				})
				.finally(() => globalStore.isLoading.update((val) => (val = false)));
		}
	};
</script>

<form class="reply_add flex gap-1 border-gray-600 border-t mt-5 mb-1 px-2 pt-5">
	<input class="input w-[20%] border-0" placeholder={$_('nickname')} type="text" bind:value={commentParams.nickname} />
	<input class="input w-[20%] border-0" placeholder={$_('pw')} type="password" bind:value={commentParams.pw} autocomplete="off" />
	<label for="icon" class="flex gap-1 items-center btn btn-sm cursor-pointer">
		<Icon icon="ic:outline-cloud-upload" class="text-xl" />
		{uploaded ? $_('upload_finished') : $_('upload_profile_img')}
	</label>
	<input id="icon" class="w-0" type="file" on:change={(e) => imgUploader(e)} />
</form>
<section class="reply_add flex border-gray-600 px-2">
	<textarea class="textarea border-0 resize-none" rows="2" placeholder={$_('context')} bind:value={commentParams.commentDesc} />
</section>
<section class="reply_btn flex w-full justify-end px-2 pt-2">
	<button class="opacity-50 hover:opacity-100 transition-opacity border px-3 py-1" on:click={writeComment}>{$_('submit')}</button>
</section>

<style lang="sass">
    #icon
        background-color: transparent
</style>
