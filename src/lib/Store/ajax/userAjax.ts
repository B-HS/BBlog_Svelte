import axios from 'axios';
import globalStore from '../globalStore';

const login = async (params: { adminId: string; password: string }) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data } = await axios.post('/v1/login', params);
	globalStore.isLoading.update((val) => (val = false));
	return data;
};

export default { login };
