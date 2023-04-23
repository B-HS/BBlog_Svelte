<script lang="ts">
	import PortfolioTitle from './../../../lib/Article/portfolioTitle.svelte';
	import ExternalLink from './../../../lib/Article/externalLink.svelte';
	import type { PageData } from './$types';
	import Description from '$lib/Article/description.svelte';
	import Tags from '$lib/Article/tags.svelte';

	export let data: PageData;
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ko';
	import { onDestroy, onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import articleStore from '$lib/Store/article/articleStore';
	import commentStore from '$lib/Store/comment/commentStore';
	dayjs.extend(utc);
	dayjs.extend(timezone);

	onDestroy(() => {
		articleStore.reset();
		commentStore.commentReset();
	});
</script>

<svelte:head>
	<title>{`HS :: ${data.article.title}`}</title>
	<meta name="description" content={`${data.article.context.replace(/<[^>]+>/g, '')}`} />
	<meta name="keywords" content={`${data.article.tags.join(', ')}`} />
	<meta property="og:type" content="blog" />
	<meta property="og:url" content="" />
	<meta property="og:title" content={`HS :: ${data.article.title}`} />
	<meta property="og:image" content={'/' + data.article.thumbnail} />
	<meta property="og:description" content={`${data.article.context.replace(/<[^>]+>/g, '')}`} />
	<meta property="og:site_name" content="Hyunseok" />
	<meta property="og:locale" content="ko_KR" />
</svelte:head>

<section class="container mx-auto m-5 py-3 max-w-5xl px-2">
	<PortfolioTitle
		titleProps={{
			date: `${dayjs(data.article.startDate).format('YYYY-MM-DD')}`,
			endDate: `${dayjs(data.article.endDate).format('YYYY-MM-DD')}`,
			title: `${data.article.title}`,
			type: `portfolio`,
			subType: data.article.menu
		}}
	/>
	<ExternalLink
		props={[
			{ url: data.article.github, type: 'github' },
			{ url: data.article.publish, type: 'publish' }
		]}
	/>
	<Description  article={data.article} />
	<Tags tags={data.article.tags} />
</section>
