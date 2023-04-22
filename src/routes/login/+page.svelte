<script lang="ts">
	import userAjax from '$lib/Store/user/userAjax';
	import { adminCheck } from '$lib/Store/routerGuard/routerGuard';
	import { tst } from '$lib/Variables/toastStyleConfig';
	import { _ } from 'svelte-i18n';

	const validator = () => {
		if (!id || id.trim().length === 0) {
			tst('warning', $_('no_id'));
			return false;
		}
		if (!pw || pw.trim().length === 0) {
			tst('warning', $_('no_ㅔㅈ'));
			return false;
		}
		return true;
	};

	const login = () => {
		if (validator()) {
			userAjax.login({ adminId: id, password: pw }).then(async (res) => {
				if (!res) {
					tst('fail', $_('login_fail'));
					return;
				}

				const result = await adminCheck(true, true);

				if (!result) {
					tst('fail', $_('login_fail'));
					return;
				}
				tst('success', $_('login_success'));
				history.back();
			});
		}
	};

	$: id = '';
	$: pw = '';
</script>

<section class="w-full flex justify-center items-center h-full bg-opacity-10">
	<section class="login_section w-[17.5%] min-h-[30%] shadow-2xl p-3 flex flex-col items-center rounded-sm min-w-[300px]">
		<h3 class="opacity-80 my-5">{$_('login_title')}</h3>
		<section class="input_area flex flex-col gap-3">
			<form class="input_area_id">
				<label for="id"> {$_('id')} </label>
				<input bind:value={id} id="id" type="text" class="input border-0" />
			</form>
			<form class="input_area_pw">
				<label for="pw"> {$_('pw')} </label>
				<input bind:value={pw} id="pw" type="password" class="input border-0" autocomplete="off" />
			</form>
			<section class="input_area_btn flex justify-end">
				<button
					class="btn btn-sm border border-slate-500 border-opacity-5 hover:border-opacity-100 transition-all"
					on:click={login}>{$_('login_btn')}</button
				>
			</section>
		</section>
	</section>
</section>
