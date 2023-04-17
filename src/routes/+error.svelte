<script lang="ts">
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	let tInfo = 'unknownError';
	$: errorMsg = $_(tInfo);
	$page.status.toString()[0] === '4'
		? (tInfo = 'pageError')
		: $page.status.toString()[0] === '5'
		? (tInfo = 'serverError')
		: (tInfo = 'unknownError');
	const goBack = () => window.history.back();
</script>

<section class="error-page w-full h-[90%] flex items-center justify-center flex-col gap-5">
	<img
		class="unknown w-[50%] max-w-[500px] min-w-[350px]"
		src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYWnhg%2Fbtr9rgVjbom%2FE4BgkmjwqMdKwzo6JiFAL1%2Fimg.png"
		alt=""
	/>
	<span>{errorMsg}</span>
	<button class="gobackbtn btn btn-sm" on:click={goBack}>{$_('goback')}</button>
</section>

<style lang="sass" scoped>
    .unknown
        mix-blend-mode: multiply
        filter: contrast(1.1)
    .gobackbtn
        border: 1px solid #888
</style>
