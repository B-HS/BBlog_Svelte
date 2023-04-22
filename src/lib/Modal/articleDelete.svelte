<script lang="ts">
	import { page } from '$app/stores';
	import articleAjax from '$lib/Store/ajax/articleAjax';
	import { routerGuard } from '$lib/Store/routerGuard/routerGuard';
	import { onMount } from 'svelte';
	import type { article } from '../../app';
	export let showModal: boolean;
	export let article: article;
	let dialog: HTMLDialogElement;
	$: if (dialog && showModal) dialog.showModal();
	onMount(() => {
		routerGuard($page, true);
	});

	const articleDelete = () => {
		articleAjax.deleteArticle(article);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="card w-[20%] min-w-[350px] h-[15%] shadow-xl"
>
	<div on:click|stopPropagation class="flex flex-col gap-2 justify-between h-full w-full dark:text-white">
		<h3 class="delete-header border-b border-black dark:border-slate-500">Delete</h3>
		<section class="delete-body">isDelete?</section>
		<section class="delete-footer w-full flex justify-end gap-3">
			<button
				class="btn btn-sm border dark:text-white border-slate-500 border-opacity-30 hover:border-opacity-100"
				on:click={() => dialog.close()}>Close</button
			>
			<button
				class="btn btn-sm border dark:text-white border-slate-500 border-opacity-30 hover:border-opacity-100"
				on:click={articleDelete}>Delete</button
			>
		</section>
	</div>
</dialog>
