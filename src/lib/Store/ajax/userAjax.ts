import axios, { AxiosError } from 'axios';
import globalStore from '../globalStore';
import { tst } from '$lib/Variables/toastStyleConfig';
import { dictionary } from 'svelte-i18n';
// 타입이 애매해서 any로 돌림, 어차피 값은 lang의 ts파일 목록
let dic :any
dictionary.subscribe(val=>dic=val)
axios.interceptors.response.use(
	(res) => {
		globalStore.isLoading.update((val) => (val = false));
		return res;
	},
	(error: AxiosError) => {
		tst('fail', `${error.response?.status} ${dic.ko.request_fail}`);
		globalStore.isLoading.update((val) => (val = false));
	}
);

const login = async (params: { adminId: string; password: string }) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data } = await axios.post(`/v1/login`, params);
	globalStore.isLoading.update((val) => (val = false));
	return data;
};

export default { login };
