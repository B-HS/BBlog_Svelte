<script lang="ts">
	import commentStore from '$lib/Store/comment/commentStore';
	import { tst } from '$lib/Variables/toastStyleConfig';
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import type { comment } from '../../app';
	import globalStore from '$lib/Store/globalStore';
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
		return true;
	};

	const commentModify = () => {
		globalStore.isLoading.update((val) => (val = true));
		if (validator())
			commentStore
				.modifyComment({ aid: cmt.aid, rid: cmt.rid, pw, commentDesc })
				.then(async (res) => {
					if (res.statusText === 'OK') {
						commentStore.loadCommentList(((await res.text()) as unknown as number) + 5, 0, cmt.aid as unknown as string).then(
							async (res) => {
								if (res.statusText === 'OK') {
									res.json().then((cmt) => {
										commentStore.commentList.update((val) => (val = [...cmt.comments]));
										commentStore.commentTotal.update((val) => (val = cmt.total));
									});
								}
							}
						);
						tst('success', $_("comment_edited"));
					}
				})
				.finally(() => globalStore.isLoading.update((val) => (val = false)));
		dialog.close();
		pw = '';
		commentDesc = '';
	};
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
			<h3 class="text-base font-semibold leading-6 dark:text-gray-100">{$_('edit_title')}</h3>
			<button on:click={() => dialog.close()}>
				<Icon icon="material-symbols:close" class="text-xl cursor-pointer" />
			</button>
		</div>
		<div class="border-t border-opacity-10 border-gray-200">
			<dl>
				<form class="px-4 py-5 flex flex-col gap-2">
					<input type="text" class="input w-full border-0 text-center" bind:value={commentDesc} placeholder={$_('context')} />
					<input
						type="password"
						class="input w-full border-0 text-center"
						bind:value={pw}
						placeholder={$_('pw')}
						autocomplete="off"
					/>
				</form>

				<div class="px-3 pb-2 flex justify-end">
					<button class="btn btn-sm opacity-50 hover:opacity-100 transition-opacity" on:click={commentModify}
						>{$_('comment_edit')}</button
					>
				</div>
			</dl>
		</div>
	</div>
</dialog>
