<script lang="ts">
	import { page } from '$app/stores';
	import BDrawer from '$lib/Navigation/Drawer.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '../app.postcss';
	import Header from '../lib/Header/header.svelte';
	import './styles.sass';
	$: classesSidebarLeft = $page.url.pathname === '/' ? 'w-0' : 'w-0 lg:w-64';
</script>

<BDrawer />
<AppShell class="min-w-[400px]"  slotSidebarLeft="bg-surface-500/5 {classesSidebarLeft}">
	<Header />
	<slot />
</AppShell>
