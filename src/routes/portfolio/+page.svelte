<script lang="ts">
	import type { PageData } from './$types';
	import VerticalCard from '../../lib/Card/verticalCard.svelte';
	import articleAjax from '$lib/Store/ajax/articleAjax';
	import { onDestroy } from 'svelte';
	import { _ } from 'svelte-i18n';
	export let data: PageData;

	onDestroy(() => {
		articleAjax.reset();
	});
</script>

<div class="container mx-auto p-10 space-y-4 max-w-[1024px]">
	<section class="card_area gap-5 grid grid-cols-fluid">
		{#each data.articles as po}
			<VerticalCard cardInfo={po} type={'portfolio'} />
		{/each}
		
		{#if data.articles.length===0}
			<span>{$_("portfolio_invalid")}</span>
		{/if}
	</section>
</div>
