<script lang="ts">
	export let tags: string[];
	export let type: string;
</script>

<section class="tags reply_add flex border-gray-600 border-t my-4 px-2 pt-5">
	<section class="flex z-[999]">
		{#each tags as tag}
			<a
				on:click={(e) => e.stopPropagation()}
				class="btn px-3 pb-1 pt-2 text-sm font-semibold mr-2 border border-gray-500 border-opacity-30 hover:border-opacity-80 hover:-translate-y-0.5"
				href={`${type}`}># {tag}</a
			>
		{/each}
	</section>
</section>
