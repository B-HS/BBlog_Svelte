<script>
	import Card from '$lib/Card/card.svelte';
	import blogMenus from '$lib/Variables/blogMenus';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import { portfolio } from '../../temp/portfolio';
	import { post } from '../../temp/post';

	$: tabSet = 0;
</script>

<div class="container mx-auto p-10 space-y-4">
	<TabGroup>
		{#each blogMenus as menus, idx}
			<Tab bind:group={tabSet} name={menus.value} value={idx}>{$_(menus.value)}</Tab>
		{/each}
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<section class="card_area flex flex-col gap-3">
					{#each post as po}
						<!-- 나중에 store에서 불러오게끔 -->
						<Card
							cardInfo={{
								title: po.title,
								desc: po.desc,
								date: po.date,
								tags: po.tags,
								num: po.num
							}}
							type={'blog'}
						/>
					{/each}
					{#each portfolio as fo}
						{fo.title}
						{fo.desc}
						{fo.date}
						{fo.tags}
					{/each}
				</section>
			{:else if tabSet === 1}
				<span>tab 2</span>
			{:else if tabSet === 2}
				<span>tab 3</span>
			{:else if tabSet === 3}
				<span>tab 4</span>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
