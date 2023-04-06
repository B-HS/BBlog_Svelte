<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { articleTitleProps } from '../../app';
	export let titleProps: articleTitleProps;
</script>

<section class="title flex flex-col items-baseline justify-between border-gray-600 border-b my-5 px-2 tracking-wider">
	<h5 class="title_category opacity-30 flex items-center gap-1 uppercase">
		<Icon icon="mdi:menu" class="-translate-y-0.5" />Blog
	</h5>
	<section class="title_main flex items-baseline justify-between w-full">
		<h2>{titleProps.title}</h2>
		<section class="title_etc text-sm flex gap-2 px-2 opacity-70">
			<span>{titleProps.date}</span>
			<span class="text-gray-600"> | </span>
			<span>{titleProps.views} views</span>
		</section>
	</section>
</section>
