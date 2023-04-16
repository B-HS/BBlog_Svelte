<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { externalLinkProps } from '../../app';
	export let props: externalLinkProps[];
</script>

<section class="tags reply_add flex border-gray-600 border-b my-4 px-2 pb-5">
	<section class="flex z-[999]">
		{#each props as prs}
			<a
				class="uppercase btn px-3 pb-1 pt-2 text-sm font-semibold mr-2 border border-gray-500 border-opacity-30 hover:border-opacity-80 hover:-translate-y-0.5"
				href={`${prs.url}`}>{prs.type === 'github' ? $_('move_to_github') : $_('move_to_publish')}</a
			>
		{/each}
	</section>
</section>
