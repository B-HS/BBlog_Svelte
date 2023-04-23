<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/Card/card.svelte';
	import articleStore from '$lib/Store/article/articleStore';
	import blogMenus from '$lib/Variables/blogMenus';
	import { Tab, TabGroup, filter } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import type { article as articleProps } from '../../app';
	import { onDestroy, onMount } from 'svelte';
	import globalStore from '$lib/Store/globalStore';
	
	export let data: PageData;
	let articleList: articleProps[];
	let tab: number;
	let totalPage: number;
	let pg: number;
	let sg: number;
	let currentMenu: string;

	articleStore.articles.subscribe((val) => (articleList = val));
	articleStore.currentTab.subscribe((val) => {
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
	articleStore.total.subscribe((val) => (totalPage = val));
	articleStore.page.subscribe((val) => (pg = val));
	articleStore.size.subscribe((val) => (sg = val));

	const getMoreArticle = () => {
		if (pg >= totalPage) {
			globalStore.isLoading.update((val) => (val = false));
			return;
		}
		articleStore.page.update((val) => (val += 1));
		articleStore
			.loadArticleList(sg, pg, currentMenu)
			.then(async (res) => {
				if (res.statusText === 'OK') {
					const data = await res.json();
					articleStore.articles.update((val) => (val = [...val, ...data.articles]));
					articleStore.total.update((val) => (val = data.total));
				}
			})
			.finally(() => globalStore.isLoading.update((val) => (val = false)));
	};

	let observeObj: HTMLDivElement;

	const menuChange = async (menu: number) => {
		articleStore.page.update((val) => (val = 0));
		articleStore.reset();
		articleStore.currentTab.update((val) => (val = menu));
		globalStore.isLoading.update((val) => (val = true));
		articleStore
			.loadArticleList(sg, pg, currentMenu)
			.then(async (res) => {
				if (res.statusText === 'OK') {
					const data = await res.json();
					articleStore.articles.update((val) => (val = [...val, ...data.articles]));
					articleStore.total.update((val) => (val = data.total));
				}
			})
			.finally(() => globalStore.isLoading.update((val) => (val = false)));
			articleStore.page.update((val) => (val += 1));
	};

	onMount(() => {
		articleStore.articles.update((val) => (val = data.articles));
		articleStore.total.update((val) => (val = data.total));
		articleStore.page.update((val) => (val += 1));
		const obr = new IntersectionObserver((ele) => {
			if (ele[0].isIntersecting) {
				getMoreArticle()
			}
		});
		obr.observe(observeObj);
	});
	onDestroy(() => {
		articleStore.reset();
	});
</script>

<svelte:head>
	<title>{`HS :: Articles`}</title>
	<meta
		name="description"
		content={`${data.articles
			.map((val) => val.context)
			.join(' ')
			.replace(/<[^>]+>/g, '')}`}
	/>
	<meta name="keywords" content={`${data.articles.length > 0 ? data.articles[0].tags.join(', ') : []}`} />
	<meta property="og:type" content="blog" />
	<meta property="og:url" content="" />
	<meta property="og:title" content={`HS :: Articles`} />
	<meta property="og:image" content={'/favicon.ico'} />
	<meta
		property="og:description"
		content={`${data.articles
			.map((val) => val.context)
			.join(' ')
			.replace(/<[^>]+>/g, '')}`}
	/>
	<meta property="og:site_name" content="Hyunseok" />
	<meta property="og:locale" content="ko_KR" />
</svelte:head>

<div class="container mx-auto p-10 space-y-4">
	<TabGroup>
		{#each blogMenus as menus, idx}
			<Tab bind:group={tab} name={menus.value} value={idx} on:click={() => menuChange(idx)}>{$_(menus.value)}</Tab>
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
				<section class="card_area flex flex-col gap-3">
					{#each articleList as po}
						<Card cardInfo={po} type={'blog'} />
					{/each}
				</section>
			{:else if tab === 2}
				<section class="card_area flex flex-col gap-3">
					{#each articleList as po}
						<Card cardInfo={po} type={'blog'} />
					{/each}
				</section>
			{/if}
		</svelte:fragment>
	</TabGroup>
	<div class="w-full h-10" bind:this={observeObj}>{pg >= totalPage ? $_('load_not_exist') : $_('loading')}</div>
</div>
