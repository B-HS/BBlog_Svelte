<script lang="ts">
	import { onMount } from 'svelte';
	export let isOpen: boolean;
	const modalClose = () => (isOpen = false);

	const modalCloseByEscape = (e: KeyboardEvent) => {
		if (e.code === 'Escape') isOpen = false;
	};

	onMount(() => {
		window.addEventListener('keydown', (e) => modalCloseByEscape(e));
		return () => {
			window.removeEventListener('keydown', (e) => modalCloseByEscape(e));
		};
	});
</script>

<section
	class="modal z-[1000] w-full h-full absolute top-0 left-0 flex justify-center items-center bg-black dark:bg-white bg-opacity-30 dark:bg-opacity-30"
	style={`display: ${isOpen ? 'block' : 'none'}`}
>
	<span>Delete</span>
</section>
