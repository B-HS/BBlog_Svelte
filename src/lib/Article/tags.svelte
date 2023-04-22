<script lang="ts">
	export let tags: string[];
</script>

<section class="tags reply_add flex border-gray-600 border-t my-4 px-2 pt-5">
	<section class="flex z-[999]">
		{#each tags as tag}
			<button
				class="cursor-default transition-all px-3 py-1 text-sm font-semibold mr-2 border border-gray-500 border-opacity-30 hover:border-opacity-80"
				># {tag}</button
			>
		{/each}
	</section>
</section>
