<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import BDrawer from '$lib/Navigation/Drawer.svelte';
	import { AppShell, ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '../app.postcss';
	import Header from '../lib/Header/header.svelte';
	import './styles.sass';
	import globalStore from '$lib/Store/globalStore';

	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];
	$: classesSidebarLeft = $page.url.pathname === '/' ? 'w-0' : 'w-0 lg:w-64';
	let loading: boolean;
	globalStore.isLoading.subscribe((val) => (loading = val));


</script>

{#if loading}
	<ConicGradient
		class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[99999]"
		width="h-[50px]"
		stops={conicStops}
		spin>{$_('loading')}</ConicGradient
	>
{/if}
<BDrawer />
<AppShell class="min-w-[400px]" slotSidebarLeft="bg-surface-500/5 {classesSidebarLeft}">
	<Header />
	<slot />
</AppShell>
