<script lang="ts">
	import Icon from '@iconify/svelte';
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
	class="modal z-[1000] w-full h-full absolute top-0 left-0 flex justify-center items-center bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30"
	style={`display: ${isOpen ? 'flex' : 'none'}`}
>
	<div class="overflow-hidden w-[30%] bg-gray-600  shadow sm:rounded-sm">
		<div class="px-4 py-3 flex items-center justify-between">
			<h3 class="text-base font-semibold leading-6 text-gray-100">Delete Comment</h3>
			<Icon icon="material-symbols:close" class="text-xl" />
		</div>
		<div class="border-t border-gray-500">
			<dl>
				<div class="bg-gray-800 px-4 py-5 sm:grid ">
					<input type="text" class="input w-full border-0 text-center" placeholder="Enter password">
				</div>
				
				<div class="bg-gray-800 px-3 py-2 flex justify-end border-t  border-gray-500">
					<button class="btn btn-sm opacity-50 hover:opacity-100 transition-opacity">Delete</button>
					
				</div>
			</dl>
		</div>
	</div>
</section>
