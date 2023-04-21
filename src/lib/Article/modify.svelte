<script lang="ts">
	import type { article } from "../../app";

	export let showModal: boolean;
    export let article : article;
	let dialog: HTMLDialogElement;

    

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close={() => (showModal = false)} on:click|self={() => dialog.close()} class="w-[50%] h-[90%] min-w-[385px] py-5">
	<div on:click|stopPropagation class="flex flex-col gap-2 justify-start h-full">
		<section class="m-header border-b py-2 px-1 h-[5%]"> 글 수정 </section>
		<section class="m-body flex flex-col gap-2 h-[80%] relative mb-[30px]">
            <input type="text" class="input border-none h-[2.75rem]">
            <section class="m-body_context h-full">
                <textarea class="textarea border-none min-h-[385px] h-full rounded-none resize-none"></textarea>
            </section>
            <section class="absolute -bottom-[29px] right-[0.1px] flex">
                <button class="btn btn-sm p-1 border-b rounded-none">TEXT</button>
                <button class="btn btn-sm p-1 border-b rounded-none">HTML</button>
            </section>
        </section>
		<section class="m-footer w-full flex justify-end h-[5%]">
            {article?article:""}
            <button class="btn btn-sm border border-slate-500 border-opacity-30 hover:border-opacity-100" on:click={() => dialog.close()}>Close</button>
        </section>
	</div>
</dialog>

<style lang="sass">
	dialog[open] 
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
	
	@keyframes zoom 
		from 
			transform: scale(0.95)
		
		to 
			transform: scale(1)
		
	dialog[open]::backdrop 
		animation: fade 0.2s ease-out
	
	@keyframes fade 
		from 
			opacity: 0
		
		to 
			opacity: 1
		

</style>
