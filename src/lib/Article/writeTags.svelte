<script lang="ts">
	export let tags: string[];
	export let tagDelete: Function;
</script>

<section class="tags flex border-gray-600">
	<section class="flex z-[999] flex-wrap">
		{#each tags as tag}
			<button
				on:click={(e) => {
					e.stopPropagation();
					tagDelete(tag);
				}}
				class="pt-1 px-3 text-sm transition-all"># {tag}</button
			>
		{/each}
	</section>
</section>
