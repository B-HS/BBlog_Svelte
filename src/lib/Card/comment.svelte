<script lang="ts">
	import CommentDelete from '$lib/Modal/commentDelete.svelte';
	import CommentEdit from '$lib/Modal/commentEdit.svelte';
	import CommentReply from '$lib/Modal/commentReply.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	import 'dayjs/locale/ko';
	import timezone from 'dayjs/plugin/timezone';
	import utc from 'dayjs/plugin/utc';
	import type { comment } from '../../app';
	import { _ } from 'svelte-i18n';
	export let comment: comment;
	dayjs.extend(utc);
	dayjs.extend(timezone);
	$: isReplyOpen = false;
	$: isEditOpen = false;
	$: isDeleteOpen = false;
</script>

<section class="comment border-gray-600 my-5 px-2 py-5">
	<section class="comment_main flex">
		<section class="comment_icon w-28 flex align-top justify-center px-3 pb-6 pt-0">
			<Avatar src={comment.commentImg} width="w-32" />
		</section>
		<section class="comment_main w-full flex flex-col gap-3">
			<section class="comment_user flex gap-2 items-baseline">
				<span class="font-bold text-xl border-b">{comment.nickname}</span>
				<span class="text-xs opacity-70">{`${dayjs(comment.uploadedDated).format('YYYY-MM-DD HH:mm:ss')}`}</span>
			</section>
			<section class="comment_description border-b border-gray-600 pb-3">
				{comment.commentDesc}
			</section>
			<section class="comment_btns flex gap-3 justify-start w-full text-sm">
				<button class="opacity-70 hover:opacity-100 transition-opacity" on:click={() => (isReplyOpen = true)}>{$_('comment_reply')}</button>
				<span class="text-gray-600"> | </span>
				<button class="opacity-70 hover:opacity-100 transition-opacity" on:click={() => (isEditOpen = true)}>{$_('comment_edit')}</button>
				<span class="text-gray-600"> | </span>
				<button class="opacity-70 hover:opacity-100 transition-opacity" on:click={() => (isDeleteOpen = true)}>{$_('comment_delete')}</button>
			</section>
		</section>
	</section>
</section>
<CommentReply bind:isOpen={isReplyOpen} />
<CommentEdit bind:isOpen={isEditOpen} />
<CommentDelete bind:isOpen={isDeleteOpen} />
