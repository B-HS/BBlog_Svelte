<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { article } from '../../app';
	export let cardInfo: article;
	export let type: string;
	const tags = cardInfo.tags as string[];
</script>

<a class="card w-full flex hover:-translate-y-0.5 transition-transform shadow-md min-h-[240px]" href={`/${type}/${cardInfo.aid}`}>
	<div class="card_img flex border border-gray-600 border-opacity-50 object-cover">
		<img
			src={`${cardInfo.thumbnail?"https://hyns.dev/v1/image/"+cardInfo.thumbnail:"https://mi.gumyo.net/files/47df371c-ec7f-4579-ac93-ca32fd25d54b"}`}
			width="240px"
			height="240px"
			alt="seyana"
			srcset=""
		/>
	</div>
	<div class="flex flex-col justify-between card_main w-full border border-gray-600 border-opacity-50 border-l-0 p-3">
		<section class="card_main_header flex flex-col">
			<span class="opacity-50 uppercase flex gap-1"> <Icon icon="mdi:menu" class="translate-y-0.5" />{type}</span>
			<span class="text-3xl">{cardInfo.title}</span>
		</section>
		<span class="opacity-70">{@html cardInfo.context}</span>
		<section class="tags flex flex-wrap gap-y-2">
			{#each tags as tag}
				<a
					class="btn px-3 py-1 text-sm font-semibold mr-2 border border-gray-500 border-opacity-30 hover:border-opacity-80 hover:-translate-y-0.5"
					href={`/${type}/${cardInfo.aid}`}># {tag}</a
				>
			{/each}
		</section>
	</div>
</a>

<style lang="sass" scoped>
@media (max-width: 767px)
	.card
		flex-direction: column
		.card_img 
			max-width: 100%
			justify-content: center
			border: none !important
		.card_main
			border-right: none
			border-bottom: none

</style>
