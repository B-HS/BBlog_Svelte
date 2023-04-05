<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<section class="reply_add flex gap-1 border-gray-600 border-t mt-5 mb-1 px-2 pt-5">
	<input class="input w-[20%] border-0" placeholder="닉네임" type="text" />
	<input class="input w-[20%] border-0" placeholder="비밀번호" type="text" />
	<label for="icon" class="flex gap-1 items-center btn btn-sm cursor-pointer">
		<Icon icon="ic:outline-cloud-upload" class="text-xl -translate-y-0.5" />
		프로필 사진 업로드
	</label>
	<input id="icon" class="w-0" type="file" />
</section>
<section class="reply_add flex border-gray-600 px-2">
	<textarea class="textarea border-0" rows="2" placeholder="내용" />
</section>

<style lang="sass">
    #icon
        background-color: transparent
</style>
