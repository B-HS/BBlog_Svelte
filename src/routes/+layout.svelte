<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import './styles.sass';
	import { AppShell, AppBar, LightSwitch, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import Icon from '@iconify/svelte';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import BDrawer from '$lib/Drawer.svelte';
	import menus from '$lib/Navigation/menus';
	import icons from '$lib/Navigation/icons';

	const drawerOpen = () =>
		drawerStore.open({
			width: 'w-1/2'
		});
	$: lang = 0
	$: classesSidebarLeft = $page.url.pathname === '/' ? 'w-0' : 'w-0 lg:w-64';
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<BDrawer />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<AppShell slotSidebarLeft="bg-surface-500/5 {classesSidebarLeft}">
	<svelte:fragment slot="header">
		<AppBar class="h-[3.75rem]">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong
						class="text-xl uppercase cursor-pointer"
						on:click={() => (window.location.href = '/')}>{$_('page_title')}</strong
					>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<RadioGroup active="variant-filled-primary"  border=0 rounded=false padding="px-1" spacing="space-x-0" background=0  hover="hover:variant-soft-primary">
					<RadioItem bind:group={lang} name="justify" value={0}>KR</RadioItem>
					<RadioItem bind:group={lang} name="justify" value={1}>JP</RadioItem>
				</RadioGroup>
				<LightSwitch rounded="none" ring="none"/>
				{#if innerWidth > 1023}
					<section class="menus">
						{#each menus as menu}
							<a class="btn btn-sm" href={menu.href}>{$_(menu.value)}</a>
						{/each}
					</section>
				{/if}
				{#each icons as ele}
					<a href={ele.href}>
						<Icon icon={ele.value} />
					</a>
				{/each}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
</AppShell>
