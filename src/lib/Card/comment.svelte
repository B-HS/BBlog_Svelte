<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { articleCommentProps } from '../../app';
	export let comment: articleCommentProps;
</script>

<section class="comment border-gray-600 border-t my-5 px-2 py-5">
	<section class="comment_main flex">
		<section class="comment_icon w-28 flex align-top justify-center px-3 pb-6 pt-0">
			<Avatar src="https://avatars.githubusercontent.com/u/49316060" width="w-32" />
			<!-- {comment.iconUrl} -->
		</section>
		<section class="comment_main w-full flex flex-col gap-3">
			<section class="comment_user flex gap-2 items-baseline">
				<span class="font-bold">{comment.nickname}</span>
				<span class="text-xs opacity-70">{comment.date}</span>
			</section>
			<section class="comment_description border-b border-gray-600 pb-3">
				{comment.commentDesc}
			</section>
			<section class="comment_btns flex gap-3 justify-start w-full text-sm">
				<button class="opacity-70 hover:opacity-100 transition-opacity">Reply</button>
				<span class="text-gray-600"> | </span>
				<button class="opacity-70 hover:opacity-100 transition-opacity">Delelte</button>
				<span class="text-gray-600"> | </span>
				<button class="opacity-70 hover:opacity-100 transition-opacity">Edit</button>
			</section>
		</section>
	</section>
</section>
