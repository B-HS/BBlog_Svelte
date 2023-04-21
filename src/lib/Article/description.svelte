<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import Modify from './modify.svelte';

	export let desc: string;

	let showModal = false;
</script>

<section class="description mx-2 px-2">
	{@html desc}
	<button class="btn btn-sm border border-slate-600" on:click={() => (showModal = true)}>modal</button>
	<Modify bind:showModal />
</section>
