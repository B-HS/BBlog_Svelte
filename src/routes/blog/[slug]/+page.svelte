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
	const { commentList, page, size, commentTotal } = commentStore;
	commentList.subscribe((val) => (comments = [...val]));
	commentTotal.subscribe((val) => totalPage = val);
	size.subscribe((val) => (sg = val));
	page.subscribe((val) => (pg = val));

	const getMoreComment = () => {
		if (pg >= totalPage) {
			return;
		}
		page.update((val) => (val += 1));
		commentAjax.loadMoreCommentList(sg, pg, data.slug);
	};

	let observeObj: HTMLDivElement;
	onMount(async () => {
		await fetch('../v1/visit/read', {
			method: 'POST',
			body: JSON.stringify({ aid: data.slug, visitUrl: document.referrer ? document.referrer : 'LINK NOT CHECKED' }),
			headers: { 'Content-Type': 'application/json' }
		});
		commentAjax.loadCommentList(5, 0, data.slug);
		const obr = new IntersectionObserver((ele) => {
			if (ele[0].isIntersecting) getMoreComment();
		});
		obr.observe(observeObj);
	});

	onDestroy(() => {
		articleAjax.reset();
		commentAjax.reset()
	});
</script>

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
	<Description desc={data.article.context} />
	<Tags tags={data.article.tags} type="blog" />
	<CommentInput aid={data.slug} />

	{#each comments as comment}
		<Comment {comment} />
	{/each}
	<div class="w-full h-25" bind:this={observeObj}>{pg >= totalPage ? $_('load_not_exist') : $_('loading')}</div>
</section>
