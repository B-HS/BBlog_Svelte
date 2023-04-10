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
	import { onMount } from 'svelte';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	onMount(async () => {
		await fetch('../v1/visit/read', {
			method: 'POST',
			body: JSON.stringify({ aid: data.slug, visitUrl: document.referrer ? document.referrer : 'LINK NOT CHECKED' }),
			headers: { 'Content-Type': 'application/json' }
		});
	});
</script>

<section class="container mx-auto m-5 py-3 max-w-5xl px-2">
	<Title
		titleProps={{
			date: `${dayjs(data.article.createdDate).format('YYYY-MM-DD HH:mm:ss')}`,
			title: `${data.article.title}`,
			views: data.article.visitCnt
		}}
	/>
	<Description desc={data.article.context} />
	<Tags tags={data.article.tags} type="blog" />
	<CommentInput />

	<Comment
		comment={{
			replyNum: 1,
			date: '2023.01.01',
			hide: false,
			iconUrl: 'basic.png',
			nickname: 'test',
			commentDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
			commentGroup: 0,
			commentSort: 0
		}}
	/>
</section>
