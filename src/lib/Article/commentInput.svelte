<script lang="ts">
	import articleAjax from '$lib/Store/ajax/articleAjax';
	import commentAjax from '$lib/Store/ajax/commentAjax';
	import { tst } from '$lib/Variables/toastStyleConfig';
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import type { comment } from '../../app';
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
			formData.append('upload', target.files[0]);
			articleAjax.uploadImage(formData).then((res) => {
				commentParams.commentImg = `/v1/image/` + res;
				uploaded = true;
			});
		}
	};

	const validator = () => {
		if (!commentParams.commentDesc || commentParams.commentDesc.trim().length === 0) {
			tst('warning', $_('comment_no_desc'));
			return false;
		}

		if (!commentParams.nickname || commentParams.nickname.trim().length === 0) {
			tst('warning', $_('comment_no_nickname'));
			return false;
		}
		if (!commentParams.pw || commentParams.pw.trim().length === 0) {
			tst('warning', $_('comment_no_pw'));
			return false;
		}
		return true;
	};

	const writeComment = async () => {
		if (validator()) await commentAjax.writeComment(commentParams);
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
	};
</script>

<section class="reply_add flex gap-1 border-gray-600 border-t mt-5 mb-1 px-2 pt-5">
	<input class="input w-[20%] border-0" placeholder={$_('nickname')} type="text" bind:value={commentParams.nickname} />
	<input class="input w-[20%] border-0" placeholder={$_('pw')} type="password" bind:value={commentParams.pw} />
	<label for="icon" class="flex gap-1 items-center btn btn-sm cursor-pointer">
		<Icon icon="ic:outline-cloud-upload" class="text-xl" />
		{uploaded ? $_('upload_finished') : $_('upload_profile_img')}
	</label>
	<input id="icon" class="w-0" type="file" on:change={(e) => imgUploader(e)} />
</section>
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
