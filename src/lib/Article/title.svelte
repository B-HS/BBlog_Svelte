<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import type { articleTitleProps } from '../../app';
	export let titleProps: articleTitleProps;
</script>

<section class="title flex flex-col items-baseline justify-between border-gray-600 border-b my-5 px-2 tracking-wider">
	<h5 class="title_category opacity-30 flex items-center gap-1 uppercase">
		<Icon icon="mdi:menu" class="-translate-y-0.5" />{$_(`${titleProps.type}`)}<span class="text-sm">: {titleProps.subType}</span>
	</h5>
	<section class="title_main flex items-baseline justify-between w-full">
		<h2>{titleProps.title}</h2>
		<section class="title_etc text-sm flex gap-2 px-2 opacity-70">
			<span>{titleProps.date}</span>
			<span class="text-gray-600"> | </span>
			<span>{titleProps.views} {$_('views')}</span>
		</section>
	</section>
</section>
