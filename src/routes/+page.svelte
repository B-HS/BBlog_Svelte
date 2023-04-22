<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { article } from '../app';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ko';
	export let data: PageData;
	import Icon from '@iconify/svelte';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	onMount(async () => {
		await fetch('/v1/visit/read', {
			method: 'POST',
			body: JSON.stringify({ aid: data.article.aid, visitUrl: document.referrer ? document.referrer : 'LINK NOT CHECKED' }),
			headers: { 'Content-Type': 'application/json' }
		});
	});
	const { context, createdDate, menu, title, visitCnt, github }: article = data.article;
</script>

<svelte:head>
	<title>HS :: Intro</title>
	<meta name="description" content={`${data.pureDesc}`} />
	<meta name="keywords" content="Developer homepage, Intropage, Resume" />
	<meta property="og:type" content="blog" />
	<meta property="og:url" content="https://hyns.dev" />
	<meta property="og:title" content="HS :: Intro" />
	<meta property="og:image" content="/favicon.ico" />
	<meta property="og:description" content={`${data.pureDesc}`} />
	<meta property="og:site_name" content="Hyunseok" />
	<meta property="og:locale" content="ko_KR" />
</svelte:head>

<section>
	<section class="intro container mx-auto m-5 p-2 max-w-5xl border border-opacity-20 border-slate-500 flex flex-col gap-2 shadow-md">
		<section class="intro_date flex gap-1 opacity-70 hover:opacity-100 transition-opacity">
			<Icon icon="material-symbols:date-range-outline-rounded" class="translate-y-[0.225rem]" />
			{dayjs(data.article.createdDate).format('YYYY MM DD')} - Hyunseok Byun
		</section>
		<section class="main-context text-sm">
			{@html context}
		</section>
	</section>
</section>