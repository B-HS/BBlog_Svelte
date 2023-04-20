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

<svelte:head>
	<title>{`HS :: Articles`}</title>
	<meta name="description" content={`${data.articles.map(val=>val.context).join(" ").replace(/<[^>]+>/g, "")}`} />
	<meta name="keywords" content={`${data.articles[0].tags.join(', ')}`} />
	<meta property="og:type" content="blog" />
	<meta property="og:url" content="https://hyns.dev" />
	<meta property="og:title" content={`HS :: Articles`} />
	<meta property="og:image" content={"/favicon.ico"} />
	<meta property="og:description" content={`${data.articles.map(val=>val.context).join(" ").replace(/<[^>]+>/g, "")}`} />
	<meta property="og:site_name" content="Hyunseok" />
	<meta property="og:locale" content="ko_KR" />
</svelte:head>
<div class="container mx-auto p-10 space-y-4 max-w-[1024px]">
	<section class="card_area gap-5 grid grid-cols-fluid">
		{#each data.articles as po}
			<VerticalCard cardInfo={po} type={'portfolio'} />
		{/each}

		{#if data.articles.length === 0}
			<span>{$_('portfolio_invalid')}</span>
		{/if}
	</section>
</div>
