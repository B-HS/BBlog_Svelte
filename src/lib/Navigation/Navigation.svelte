<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import menus from '../Variables/menus';
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		{#each menus as menu}
			<li>
				<a class="btn btn-sm" href={menu.href} on:click={drawerClose}>{$_(menu.value)}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="sass">
	.list-nav
		a
			&:focus
				background: none !important
				color: inherit !important
</style>
