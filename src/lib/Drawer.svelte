<script lang="ts">
	import { Drawer } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import icons from '$lib/Navigation/icons';
</script>

<Drawer>
	<section class="flex justify-center items-center flex-col p-7">
		<h2 class="p-0">Menu</h2>
		<section class="flex gap-2 items-baseline text-lg">
			{#each icons as ele}
				<a href={ele.href}>
					<Icon icon={ele.value} />
				</a>
			{/each}
		</section>
	</section>
	<Navigation/>
</Drawer>
