<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import menus from './menus';
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		{#each menus as menu}
			<li>
				<a class="btn btn-sm" href={menu.href} on:click={drawerClose}>{menu.value}</a>
			</li>
		{/each}
	</ul>
</nav>
