<script lang="ts">
	import { goto } from '$app/navigation';
	import type { articleState } from '../../app';

	export let cardInfo: articleState;
	export let type: string;

	const tags = cardInfo.tags as string[];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="overflow-hidden shadow-lg py-5 cursor-pointer transition-transform hover:-translate-y-1" on:click={() => goto(`${type}/${cardInfo.num}`)}>
	<img
		class="w-full"
		src="https://paulryan.com.au/wp-content/uploads/2015/01/high-resolution-wallpapers-25.jpg"
		alt={`${cardInfo.title}'s first image`}
		srcset=""
	/>
	<div class="px-6 py-4">
		<div class="font-bold text-xl mb-2">Mountain</div>
		<p class=" text-base">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et
			perferendis eaque, exercitationem praesentium nihil.
		</p>
	</div>
	<div class="px-6 pt-4 pb-2 flex gap-2">
		{#each tags as tag}
			<span class="chip variant-filled px-3 py-1 text-sm font-semibold"
				>{tag}</span
			>
		{/each}
	</div>
</div>
