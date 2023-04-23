<script lang="ts">
	import { page } from '$app/stores';
	import { tst } from '$lib/Variables/toastStyleConfig';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import type { comment } from '../../app';
	import commentStore from '$lib/Store/comment/commentStore';
	export let isOpen: boolean;
	export let cmt: comment;
	let dialog: HTMLDialogElement;
	$: if (dialog && isOpen) dialog.showModal();

	const validator = () => {
		if (!pw || pw.trim().length === 0) {
			tst('warning', $_('comment_no_pw'));
			return false;
		}
		if (!commentDesc || commentDesc.trim().length === 0) {
			tst('warning', $_('comment_no_desc'));
			return false;
		}
		if (!nickname || nickname.trim().length === 0) {
			tst('warning', $_('comment_no_nickname'));
			return false;
		}
		return true;
	};

	const commentReply = async () => {
		if (validator()) {
			await commentStore.writeComment({
				aid: cmt.aid,
				commentDesc,
				nickname,
				pw,
				commentGroup: cmt.commentGroup,
				commentSort: 1,
				commentImg:
					'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYWnhg%2Fbtr9rgVjbom%2FE4BgkmjwqMdKwzo6JiFAL1%2Fimg.png'
			});
		}

		dialog.close();
	};
	$: nickname = '';
	$: pw = '';
	$: commentDesc = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (isOpen = false)}
	on:click|self={() => dialog.close()}
	class="card w-[20%] min-w-[350px] h-fit shadow-xl"
>
	<div on:click|stopPropagation class="flex flex-col gap-2 justify-between h-full w-full dark:text-white">
		<div class="px-4 py-3 flex items-center justify-between">
			<h3 class="text-base font-semibold leading-6 dark:text-gray-100">{$_('reply_title')}</h3>
			<button on:click={() => dialog.close()}>
				<Icon icon="material-symbols:close" class="text-xl cursor-pointer" />
			</button>
		</div>
		<div class="border-t border-opacity-10 border-gray-200">
			<dl>
				<form class="px-4 py-5 flex flex-col gap-2">
					<input type="text" class="input w-full border-0 text-center" bind:value={nickname} placeholder={$_('nickname')} />
					<input type="password" class="input w-full border-0 text-center" bind:value={pw} placeholder={$_('pw')} autocomplete="off" />
					<textarea class="input w-full border-0 text-center" bind:value={commentDesc} placeholder={$_('context')} />
				</form>
				<div class="px-3 pb-2 flex justify-end">
					<button class="btn btn-sm opacity-50 hover:opacity-100 transition-opacity" on:click={commentReply}
						>{$_('submit')}</button
					>
				</div>
			</dl>
		</div>
	</div>
</dialog>
