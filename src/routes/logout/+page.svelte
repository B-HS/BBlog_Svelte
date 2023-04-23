<script lang="ts">
	import routeStore from '$lib/Store/routerGuard/routeStore';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { Cookies } from 'typescript-cookie';
	onMount(() => {
		Cookies.remove('token');
		routeStore.authentication.update((val) => (val = 'user'));
		const interval = setTimeout(() => history.back(), 1500);
		return () => clearInterval(interval);
	});
</script>

<section class="logout-page w-full h-[90%] flex items-center justify-center flex-col gap-5">
	<img
		class="seyana w-[50%] max-w-[500px] min-w-[350px]"
		src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYWnhg%2Fbtr9rgVjbom%2FE4BgkmjwqMdKwzo6JiFAL1%2Fimg.png"
		alt=""
	/>
	<span class="gobackbtn btn btn-sm">{$_('logout_done')}</span>
	<span class="gobackbtn btn btn-sm">{$_('go_back_soon')}</span>
</section>

<style lang="sass" scoped>
    .seyana
        mix-blend-mode: multiply
        filter: contrast(1.1)
</style>
