<script lang="ts">
	import userAjax from '$lib/Store/ajax/userAjax';
	import { adminCheck } from '$lib/Store/routerGuard/routerGuard';
	import { tst } from '$lib/Variables/toastStyleConfig';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	const login = () => {
		userAjax.login({ adminId: id, password: pw }).then(async (res: boolean) => {
			if (!res) {
				toastStore.trigger({ message: '로그인 실패' });
				return;
			}

			const result = await adminCheck(true, true);

			if (!result) {
				tst("fail", "로그인에 실패하였습니다")
				return;
			}
			tst("success", "로그인에 성공하였습니다")
			history.back();
		});
	};

	$: id = '';
	$: pw = '';
</script>

<section class="w-full flex justify-center items-center h-full bg-opacity-10">
	<section class="login_section w-[17.5%] min-h-[30%] shadow-2xl p-3 flex flex-col items-center rounded-sm min-w-[300px]">
		<h3 class="opacity-80 mt-5">{$_('login_title')}</h3>
		<section class="input_area flex flex-col gap-3">
			<section class="input_area_id">
				<label for="id"> ID </label>
				<input bind:value={id} id="id" type="text" class="input border-0" />
			</section>
			<section class="input_area_pw">
				<label for="pw"> PASSWORD </label>
				<input bind:value={pw} id="pw" type="password" class="input border-0" />
			</section>
			<section class="input_area_btn flex justify-end">
				<button
					class="btn btn-sm border border-slate-500 border-opacity-5 hover:border-opacity-100 transition-all"
					on:click={login}>{$_('login_btn')}</button
				>
			</section>
		</section>
	</section>
</section>
