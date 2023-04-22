<script lang="ts">
	import routeStore from '$lib/Store/routerGuard/routeStore';
	import type { article } from '../../app';
	import Delete from './delete.svelte';
	import Modify from './modify.svelte';
	export let article: article;
	let showModify = false;
	let showDelete = false;
	let auth = 'user';
	routeStore.authentication.subscribe((val) => (auth = val));
</script>

<section class="description mx-2 px-2 w-full">
	{@html article.context}
	{#if auth === 'admin'}
		<section class="adminfunc w-full flex justify-end items-center">
			<button class="btn btn-sm border-slate-600" on:click={() => (showDelete = true)}>delete</button>
			<span>|</span>
			<button class="btn btn-sm border-slate-600" on:click={() => (showModify = true)}>modify</button>
		</section>
	{/if}

	<Modify bind:showModal={showModify} {article} />
	<Delete bind:showModal={showDelete} {article} />
</section>
