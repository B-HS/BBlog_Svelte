<script>
	import VerticalCard from '../../lib/Card/verticalCard.svelte';
	import { post } from '../../temp/post';
	$: tabSet = 0;
</script>

<div class="container mx-auto p-10 space-y-4">
	{#if tabSet === 0}
		<section class="card_area gap-5 grid grid-cols-fluid">
			{#each post as po}
				<!-- 나중에 store에서 불러오게끔 -->
				<VerticalCard
					cardInfo={{
						title: po.title,
						desc: po.desc,
						date: po.date,
						tags: po.tags,
						num: po.num
					}}
					type={'portfolio'}
				/>
			{/each}
		</section>
	{:else if tabSet === 1}
		(tab panel 2 contents)
	{:else if tabSet === 2}
		(tab panel 3 contents)
	{/if}
</div>
