<script lang="ts">
	import type { PageData } from './$types';
	import CommentInput from '$lib/Article/commentInput.svelte';
	import Description from '$lib/Article/description.svelte';
	import Tags from '$lib/Article/tags.svelte';
	import Title from '$lib/Article/title.svelte';
	import Comment from '$lib/Card/comment.svelte';
	export let data: PageData;
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import 'dayjs/locale/ko';
	import { onDestroy, onMount } from 'svelte';
	import articleAjax from '$lib/Store/ajax/articleAjax';
	import type { comment } from '../../../app';
	import commentAjax from '$lib/Store/ajax/commentAjax';
	import commentStore from '$lib/Store/commentStore';
	import { _ } from 'svelte-i18n';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	let comments: comment[] = [];
	let totalPage: number;
	let pg: number;
	let sg: number;
	let referrer: string;
	const { commentList, page, size, commentTotal } = commentStore;
	commentList.subscribe((val) => (comments = [...val]));
	commentTotal.subscribe((val) => (totalPage = val));
	size.subscribe((val) => (sg = val));
	page.subscribe((val) => (pg = val));

	const getMoreComment = async () => {
		console.log('called');
		console.log(pg, totalPage);
		console.log();

		if (pg >= totalPage) {
			return;
		}
		await commentAjax.loadMoreCommentList(sg, pg, data.slug);
		page.update((val) => (val += 1));
	};

	let observeObj: HTMLDivElement;
	onMount(() => {
		typeof document.referrer !== undefined ? (referrer = document.referrer) : 'NOT CHEKCED';
		articleAjax.visit(data.slug as unknown as number, referrer);
		commentStore.commentList.update((val) => (val = data.comments));
		commentStore.page.update((val) => (val = 1));
		page.update((val) => (val += 1));
		commentStore.total.update((val) => (val = data.total));
		const obr = new IntersectionObserver((ele) => {
			if (ele[0].isIntersecting) getMoreComment();
		});
		obr.observe(observeObj);
	});

	onDestroy(() => {
		articleAjax.reset();
		commentAjax.reset();
	});
</script>

<svelte:head>
	<title>{`HS :: ${data.article.title}`}</title>
	<meta name="description" content={`${data.article.context.replace(/<[^>]+>/g, '')}`} />
	<meta name="keywords" content={`${data.article.tags.join(', ')}`} />
	<meta property="og:type" content="blog" />
	<meta property="og:url" content="https://hyns.dev" />
	<meta property="og:title" content={`HS :: ${data.article.title}`} />
	<meta property="og:image" content={'/' + data.article.thumbnail} />
	<meta property="og:description" content={`${data.article.context.replace(/<[^>]+>/g, '')}`} />
	<meta property="og:site_name" content="Hyunseok" />
	<meta property="og:locale" content="ko_KR" />
</svelte:head>

<section class="container mx-auto m-5 py-3 max-w-5xl px-2">
	<Title
		titleProps={{
			date: `${dayjs(data.article.createdDate).format('YYYY-MM-DD HH:mm:ss')}`,
			title: `${data.article.title}`,
			type: `blog`,
			subType: data.article.menu,
			views: data.article.visitCnt
		}}
	/>
	<Description article={data.article} />
	<Tags tags={data.article.tags} />
	<CommentInput aid={data.slug} />

	{#if comments}
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	{:else}
		{#each data.comments as comment}
			<Comment {comment} />
		{/each}
	{/if}

	<div class="w-full h-25" bind:this={observeObj}>{pg >= totalPage ? $_('load_not_exist') : $_('loading')}</div>
</section>
