import { dictionary } from 'svelte-i18n';
import globalStore from '../globalStore';
// 타입이 애매해서 any로 돌림, 어차피 값은 lang의 ts파일 목록
let dic: any;
dictionary.subscribe((val) => (dic = val));

const login = async (params: { adminId: string; password: string }) => {
	globalStore.isLoading.update((val) => (val = true));
	const data = fetch('/v1/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(params)
	}).then((res) => {
		return res.text();
	});
	globalStore.isLoading.update((val) => (val = false));
	return data;
};

export default { login };
