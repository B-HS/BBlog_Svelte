<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { routerGuard } from '$lib/Store/routerGuard/routerGuard';
	import { tst } from '$lib/Variables/toastStyleConfig';
	import { onMount } from 'svelte';
	import type { article } from '../../app';
	import Icon from '@iconify/svelte';
	import WriteTags from './writeTags.svelte';
	import articleAjax from '$lib/Store/ajax/articleAjax';
	export let showModal: boolean;
	export let article: article;
	let dialog: HTMLDialogElement;
	let tab: boolean = true;
	let modifiedArticle: article = article;
	let hashInput: string;
	$: if (dialog && showModal) dialog.showModal();
	onMount(() => {
		routerGuard($page, true);
	});

	const enterHandler = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			modifiedArticle.context += '</br>';
		}
	};

	const deleteHashTag = (val: string) => {
		modifiedArticle.tags = [...modifiedArticle.tags].filter((v) => v != val);
	};

	const validator = () => {
		if (!modifiedArticle.title || modifiedArticle.title.trim().length === 0) {
			tst('warning', $_('write_no_title'));
			return false;
		}
		if (!modifiedArticle.context || modifiedArticle.context.trim().length === 0) {
			tst('warning', $_('write_no_desc'));
			return false;
		}
		return true;
	};
	const modify = async () => {
		if (validator()) {
			await articleAjax.modifyArticle(modifiedArticle);
		}
	};

	const setHashtag = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			if (hashInput.trim().length == 0) {
				hashInput = '';
				return;
			}
			if (hashInput.length > 35) {
				tst('warning', $_('thirty_character'));
				hashInput = '';
				return;
			}

			if (modifiedArticle.tags.includes(hashInput)) {
				tst('warning', $_('already_registered'));
				hashInput = '';
				return;
			}
			const tag = hashInput
				.split('')
				.filter((v: string) => v != ',')
				.join('');
			modifiedArticle.tags = [...modifiedArticle.tags, tag];
			hashInput = '';
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="w-[50%] h-[90%] min-w-[385px] py-5 card shadow-xl"
>
	<div on:click|stopPropagation class="flex flex-col gap-2 min-w-[350px] justify-between h-full">
		<section class="m-header border-b border-black dark:border-slate-500 py-2 px-1 h-[7%] dark:text-white"> <span class="text-2xl">글수정</span></section>
		<section class="tags reply_add flex border-gray-600 dark:text-white">
			<section class="flex z-[999] items-center h-full">
				<WriteTags tagDelete={deleteHashTag} tags={modifiedArticle.tags} />
				<section class="taginput flex items-center translate-y-[0.1rem] mb-1">
					<label for="tagInput" class="-translate-y-[1px]"><Icon icon="mdi:pencil" class="translate-y-[0.1rem]" /></label>
					<input
						id="tagInput"
						type="text"
						placeholder={$_('enter_tag')}
						bind:value={hashInput}
						class="h-7 bg-transparent outline-none border-0 focus:ring-transparent shadow-none px-1"
						on:keypress={(e) => setHashtag(e)}
					/>
				</section>
			</section>
		</section>

		<section class="m-body flex flex-col gap-2 h-[80%] relative mb-[30px] dark:text-white">
			<input type="text" class="input border-none h-[2.75rem]" />
			<section class="m-body_context h-full">
				{#if tab}
					<textarea
						on:keypress={(e) => enterHandler(e)}
						bind:value={modifiedArticle.context}
						class="textarea border-none min-h-[385px] h-full rounded-none resize-none"
					/>
				{:else}
					{@html modifiedArticle.context}
				{/if}
			</section>
			<section class="absolute -bottom-[29px] right-[0.1px] flex">
				<button class="btn btn-sm p-1 border-b rounded-none" on:click={() => (tab = true)}>HTML</button>
				<button class="btn btn-sm p-1 border-b rounded-none" on:click={() => (tab = false)}>Preview</button>
			</section>
		</section>
		<section class="m-footer w-full flex justify-end h-[5%] gap-3">
			<button
				class="btn btn-sm border dark:text-white border-slate-500 border-opacity-30 hover:border-opacity-100"
				on:click={() => dialog.close()}>Close</button
			>
			<button
				class="btn btn-sm border dark:text-white border-slate-500 border-opacity-30 hover:border-opacity-100"
				on:click={modify}>Modify</button
			>
		</section>
	</div>
</dialog>