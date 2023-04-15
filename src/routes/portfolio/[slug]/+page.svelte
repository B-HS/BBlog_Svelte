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
	import articleAjax from '$lib/Store/ajax/articleAjax';
	import commentAjax from '$lib/Store/ajax/commentAjax';
	import { _ } from 'svelte-i18n';
	dayjs.extend(utc);
	dayjs.extend(timezone);

	onMount(async () => {
		await fetch('../v1/visit/read', {
			method: 'POST',
			body: JSON.stringify({ aid: data.slug, visitUrl: document.referrer ? document.referrer : 'LINK NOT CHECKED' }),
			headers: { 'Content-Type': 'application/json' }
		});
	});

	onDestroy(() => {
		articleAjax.reset();
		commentAjax.reset();
	});
</script>

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
	<Description desc={data.article.context} />
	<Tags tags={data.article.tags} type="blog" />
</section>
