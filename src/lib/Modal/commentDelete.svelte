<script lang="ts">
	import commentAjax from '$lib/Store/ajax/commentAjax';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import type { comment } from '../../app';
	export let isOpen: boolean;
	export let cmt: comment;

	const modalClose = () => {
		isOpen = false;
	};

	const modalCloseByEscape = (e: KeyboardEvent) => {
		if (e.code === 'Escape') isOpen = false;
	};

	onMount(() => {
		window.addEventListener('keydown', (e) => modalCloseByEscape(e));
		return () => {
			window.removeEventListener('keydown', (e) => modalCloseByEscape(e));
		};
	});

	const commentDelete = () => {
		commentAjax.deleteComment({ pw, aid: cmt.aid, rid: cmt.rid });
		pw=''
		modalClose()
	};
	$: pw = '';
</script>

<section
	class="modal z-[1000] w-full h-full absolute top-0 left-0 flex justify-center items-center bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30"
	style={`display: ${isOpen ? 'flex' : 'none'}`}
>
	<div class="overflow-hidden w-[30%] min-w-[350px] bg-gray-800 shadow-lg">
		<div class="px-4 py-3 flex items-center justify-between">
			<h3 class="text-base font-semibold leading-6 text-gray-100">{$_('delete_title')}</h3>
			<button on:click={modalClose}>
				<Icon icon="material-symbols:close" class="text-xl cursor-pointer" />
			</button>
		</div>
		<div class="border-t border-opacity-10 border-gray-200">
			<dl>
				<div class="px-4 py-5 sm:grid">
					<input type="password" class="input w-full border-0 text-center" bind:value={pw} placeholder={$_('pw')} />
				</div>

				<div class="px-3 pb-2 flex justify-end">
					<button class="btn btn-sm opacity-50 hover:opacity-100 transition-opacity" on:click={commentDelete}
						>{$_('comment_delete')}</button
					>
				</div>
			</dl>
		</div>
	</div>
</section>
