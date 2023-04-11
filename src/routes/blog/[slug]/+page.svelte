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
	import articleStore from '$lib/Store/articleStore';
	import type { comment } from '../../../app';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	let comments: comment[] = [];
	articleStore.commentList.subscribe((val) => (comments = [...val]));

	onMount(async () => {
		await fetch('../v1/visit/read', {
			method: 'POST',
			body: JSON.stringify({ aid: data.slug, visitUrl: document.referrer ? document.referrer : 'LINK NOT CHECKED' }),
			headers: { 'Content-Type': 'application/json' }
		});
		articleAjax.loadCommentList(5, 0, data.slug);
	});

	onDestroy(()=>{
		articleAjax.reset()
	})
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
</section>
