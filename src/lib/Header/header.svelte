<script lang="ts">
	import { page } from '$app/stores';
	import { routerGuard } from '$lib/Store/routerGuard/routerGuard';
	import routeStore from '$lib/Store/routerGuard/routeStore';
	import Icon from '@iconify/svelte';
	import { AppBar, drawerStore, LightSwitch, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { _, init } from 'svelte-i18n';
	import icons from '../Variables/icons';
	import menus from '../Variables/menus';
	import { tst } from '$lib/Variables/toastStyleConfig';
	let auth = 'user';
	routeStore.authentication.subscribe((val) => (auth = val));
	const drawerOpen = () =>
		drawerStore.open({
			width: 'w-1/2'
		});
	$: lang = 0;
	$: innerWidth = 0;
	$: lang === 0 ? init({ fallbackLocale: 'ko' }) : init({ fallbackLocale: 'jp' });
	$: typeof document !== 'undefined' ? routerGuard($page, true) : '';
</script>

<svelte:window bind:innerWidth />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<AppBar class="h-[64px] shadow-md">
	<svelte:fragment slot="lead">
		<div class="flex items-center h-full">
			<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
				<span>
					<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
						<rect width="100" height="20" />
						<rect y="30" width="100" height="20" />
						<rect y="60" width="100" height="20" />
					</svg>
				</span>
			</button>
			<a class="btn btn-sm text-xl uppercase" href="/">{$_('page_title')}</a>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<RadioGroup
			class="py-[0.1875rem] transition-all"
			border="0"
			active="variant-filled-primary"
			rounded="false"
			padding="px-1"
			spacing="space-y-0"
			hover="hover:variant-soft-primary"
		>
			<RadioItem class="text-xs transition-all" bind:group={lang} name="justify" value={0}>KO</RadioItem>
			<RadioItem class="text-xs transition-all" bind:group={lang} name="justify" value={1}>JP</RadioItem>
		</RadioGroup>
		<LightSwitch rounded="none" />
		{#if innerWidth > 1023}
			<section class="menus">
				{#each menus as menu}
					<a class="btn btn-sm" href={menu.href}>{$_(menu.value)}</a>
				{/each}
			</section>
		{/if}
		<section class="icons flex gap-3">
			{#each icons as ele}
				<a class="btn btn-lg p-0" href={ele.href}>
					{#if ele.rule === auth}
						<Icon icon={ele.value} />
					{/if}
				</a>
			{/each}
		</section>
	</svelte:fragment>
</AppBar>
