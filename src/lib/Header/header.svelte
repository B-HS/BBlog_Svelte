<script lang="ts">
	import { navigating, page } from '$app/stores';
	import routeStore from '$lib/Store/routerGuard/routeStore';
	import Icon from '@iconify/svelte';
	import { AppBar, LightSwitch, RadioGroup, RadioItem, drawerStore, modeCurrent, setModeCurrent } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { _, init } from 'svelte-i18n';
	import icons from '../Variables/icons';
	import menus from '../Variables/menus';
	const checkAuth = () => {
		routeStore.tokenChecker().then(async (res) => {
			res.text().then((res) => {
				if (res==="true") {
					routeStore.authentication.update((val) => (val = 'admin'));
				} else {
					routeStore.authentication.update((val) => (val = 'user'));
				}
			});
		});
	};
	let auth = 'user';
	routeStore.authentication.subscribe((val) => (auth = val));
	const drawerOpen = () =>
		drawerStore.open({
			width: 'w-1/2'
		});
	$: lang = 0;
	$: innerWidth = 0;
	$: lang === 0 ? init({ fallbackLocale: 'ko' }) : init({ fallbackLocale: 'jp' });
	$: if ($navigating) {
		checkAuth();
	}
	onMount(() => {
		checkAuth();
		setModeCurrent($modeCurrent);
	});
</script>

<svelte:window bind:innerWidth />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<AppBar class="h-[70px] shadow-md">
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
				{#if ele.rule === auth}
					<a class="btn btn-lg p-0" href={ele.href}>
						<Icon icon={ele.value} />
					</a>
				{/if}
			{/each}
		</section>
	</svelte:fragment>
</AppBar>
