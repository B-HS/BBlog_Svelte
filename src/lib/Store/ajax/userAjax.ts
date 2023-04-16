import axios, { AxiosError } from 'axios';
import globalStore from '../globalStore';
import { tst } from '$lib/Variables/toastStyleConfig';

axios.interceptors.response.use(
	(res) => {
		globalStore.isLoading.update((val) => (val = false));
		return res;
	},
	(error: AxiosError) => {
		tst('fail', `${error.response?.status} - 요청에 실패하였습니다`);
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
