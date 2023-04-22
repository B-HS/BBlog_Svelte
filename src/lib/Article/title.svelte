<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import type { articleTitleProps } from '../../app';
	export let titleProps: articleTitleProps;
</script>

<section class="title flex flex-col items-baseline justify-between border-gray-600 border-b my-5 px-2 tracking-wider">
	<span class="title_category opacity-30 flex items-center gap-1 uppercase text-md">
		<Icon icon="mdi:menu" />{$_(`${titleProps.type}`)}<span class="text-sm">: {titleProps.subType}</span>
	</span>
	<section class="title_main flex items-baseline justify-between w-full">
		<span class="text-3xl">{titleProps.title}</span>
		<section class="title_etc text-sm flex gap-2 px-2 opacity-70 py-3">
			<span>{titleProps.date}</span>
			{#if titleProps.views}
				<span class="text-gray-600"> | </span>
				<span>{titleProps.views} {$_('views')}</span>
			{/if}
		</section>
	</section>
</section>
