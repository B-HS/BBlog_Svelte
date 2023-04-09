<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/Card/card.svelte';
	import articleStore from '$lib/Store/articleStore';
	import blogMenus from '$lib/Variables/blogMenus';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import type { article as articleProps } from '../../app';
	import { onMount } from 'svelte';
	import articleAjax from '$lib/Store/ajax/articleAjax';
	const { articles, currentTab, total, page, size } = articleStore;
	export let data: PageData;
	let articleList: articleProps[];
	let tab: number;
	let totalPage: number;
	let pg: number;
	let sg: number;
	let currentMenu: string;

	articles.subscribe((val) => (articleList = val));
	currentTab.subscribe((val) => {
		tab = val;
		switch (val) {
			case 0:
				currentMenu = 'ALL';
				break;

			case 1:
				currentMenu = 'DEV';
				break;
			case 2:
				currentMenu = 'ETC';
				break;
		}
	});
	total.subscribe((val) => (totalPage = val));
	page.subscribe((val) => (pg = val));
	size.subscribe((val) => (sg = val));

	const getMoreArticle = () => {
		if (pg >= totalPage) {
			return;
		}
		page.update((val) => (val += 1));
		articleAjax.loadArticleList(sg, pg, currentMenu);
	};

	let observeObj: HTMLDivElement;
	onMount(() => {
		articles.update((val) => (val = data.articles));
		total.update((val) => (val = data.total));

		const obr = new IntersectionObserver((ele) => {
			if (ele[0].isIntersecting) getMoreArticle();
		});
		obr.observe(observeObj);
	});
</script>

<div class="container mx-auto p-10 space-y-4">
	<TabGroup>
		{#each blogMenus as menus, idx}
			<Tab bind:group={tab} name={menus.value} value={idx}>{$_(menus.value)}</Tab>
		{/each}
		<svelte:fragment slot="panel">
			{#if tab === 0}
				<section class="card_area flex flex-col gap-3">
					{#if articleList.length == 0}
						{#each data.articles as po}
							<Card cardInfo={po} type={'blog'} />
						{/each}
					{:else}
						{#each articleList as po}
							<Card cardInfo={po} type={'blog'} />
						{/each}
					{/if}
				</section>
			{:else if tab === 1}
				<span>tab 2</span>
			{:else if tab === 2}
				<span>tab 3</span>
			{:else if tab === 3}
				<span>tab 4</span>
			{/if}
		</svelte:fragment>
	</TabGroup>
	<div class="w-full h-10" bind:this={observeObj}>{pg >= totalPage?"더보기가 존재하지 않습니다":"로드 중"}</div>
</div>
