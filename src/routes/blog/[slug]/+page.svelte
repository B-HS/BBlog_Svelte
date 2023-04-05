<script>
	import CommentInput from '$lib/Article/commentInput.svelte';
	import Description from '$lib/Article/description.svelte';
	import Tags from '$lib/Article/tags.svelte';
	import Title from '$lib/Article/title.svelte';
	import Comment from '$lib/Card/comment.svelte';
	
</script>

<section class="container mx-auto m-5 py-3 max-w-5xl px-2">
	<Title titleProps={{ date: '2023.01.01', title: 'Helloooo', views: 1000 }} />
	<Description
		desc={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ratione veniam temporibus molestias ducimus ut porro ipsa accusantium nemo recusandae! Magni vel fuga soluta ducimus odit ullam consequatur provident quod.'}
	/>
	<Tags tags={["1234", "5678"]} type="blog"/>
	<CommentInput />

	<Comment
		comment={{
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
