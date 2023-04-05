<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import type { articleState, articleTitleProps } from '../../app';
	export let cardInfo: articleState & articleTitleProps & { tags: string[] };
	export let type: string;
	const tags = cardInfo.tags as string[];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card flex w-full shadow-lg cursor-pointer transition-transform hover:-translate-y-1"
	on:click={() => goto(`${type}/${cardInfo.num}`)}
>
	<div class="card-img">
		<img
			src="https://paulryan.com.au/wp-content/uploads/2015/01/high-resolution-wallpapers-25.jpg"
			alt={`${cardInfo.title}'s first image`}
			srcset=""
		/>
	</div>
	<div class="relative flex flex-col w-full px-7 py-3 gap-2 justify-between">
		<div class="flex flex-col items-baseline justify-between h-[10%]">
			<section class="category flex gap-1 items-baseline">
				<Icon icon={'ic:round-menu'} class="translate-y-[0.15rem]" />
				<h6 class="opacity-50 tracking-wider uppercase">{type}</h6>
			</section>
		</div>

		<section class="category-title flex flex-col gap-1 h-[20%]">
			<h2 class="font-extrabold">{cardInfo.title}</h2>
			<section class="categoty-title_date flex text-xs opacity-50 tracking-wider gap-1">
				<Icon icon="material-symbols:calendar-month" />
				<span> {cardInfo.date} </span>
			</section>
		</section>
		<h3 class="h-[50%] py-2 opacity-50 hover:opacity-100 transition-opacity">{cardInfo.desc}</h3>
		<section class="flex z-[999]">
			{#each tags as tag}
				<a
					class="btn px-3 pb-1 pt-2 text-sm font-semibold mr-2 mb-2 border border-gray-500 border-opacity-30 hover:border-opacity-80 hover:-translate-y-0.5"
					href={`${type}`}># {tag}</a
				>
			{/each}
		</section>
	</div>
</div>

<style scoped lang="sass">
    @media (max-width: 767px)
        .card
            flex-direction: column
            .card-img 
                max-width: 100%
    
    .card-img 
        max-width: 250px
        img
            height: 100%
            width: 100%
            object-fit: cover
</style>
