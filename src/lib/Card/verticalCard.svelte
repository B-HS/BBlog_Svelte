<script lang="ts">
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import type { article } from '../../app';

	export let cardInfo: article;
	export let type: string;

	const tags = cardInfo.tags as string[];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card overflow-hidden shadow-lg cursor-pointer transition-transform hover:-translate-y-1"
	on:click={() => goto(`${type}/${cardInfo.aid}`)}
>
	<img
		class="w-full"
		src={`${cardInfo.thumbnail?"https://hyns.dev"+cardInfo.thumbnail:"https://mi.gumyo.net/files/47df371c-ec7f-4579-ac93-ca32fd25d54b"}`}
		alt={`${cardInfo.title}'s first image`}
		srcset=""
	/>
	<div class="px-6 py-4">
		<div class="font-bold text-4xl mb-2">{cardInfo.title}</div>
		<section class="tags flex flex-wrap gap-y-2">
			{#each tags as tag}
				<span class="chip variant-filled px-3 py-1 text-sm font-semibold">{tag}</span>
			{/each}
		</section>
	</div>
	<div class="px-6 pb-5 flex gap-2 w-full justify-end">
		{#if cardInfo.github}
			<a
				on:click={(e) => e.stopPropagation()}
				href={cardInfo.github}
				class="border border-gray-500 border-opacity-30 hover:border-opacity-80 hover:-translate-y-0.5 btn p-2"
			>
				<span class="translate-y-0.5">{$_('github')}</span>
			</a>
		{/if}
		{#if cardInfo.publish}
			<a
				on:click={(e) => e.stopPropagation()}
				href={cardInfo.publish}
				class="border border-gray-500 border-opacity-30 hover:border-opacity-80 hover:-translate-y-0.5 btn p-2"
			>
				<span class="translate-y-0.5">{$_('publish')}</span>
			</a>
		{/if}
		{#if cardInfo.context}
			<a
				on:click={(e) => e.stopPropagation()}
				href={`${type}/${cardInfo.aid}`}
				class="border border-gray-500 border-opacity-30 hover:border-opacity-80 hover:-translate-y-0.5 btn p-2"
			>
				<span class="translate-y-0.5">{$_('detail')}</span>
			</a>
		{/if}
	</div>
</div>
