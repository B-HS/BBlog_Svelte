<script lang="ts">
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import Icon from '@iconify/svelte';
	import { Drawer } from '@skeletonlabs/skeleton';
	import icons from '../Variables/icons';
	import { _ } from 'svelte-i18n';
</script>

<Drawer>
	<section class="flex justify-center items-center flex-col gap-5 p-7 z-[99999]">
		<h2 class="p-0">{$_('menu')}</h2>
		<Navigation />
		<section class="flex gap-2 items-baseline text-lg">
			{#each icons as ele}
				<a href={ele.href}>
					<Icon icon={ele.value} />
				</a>
			{/each}
		</section>
	</section>
</Drawer>
