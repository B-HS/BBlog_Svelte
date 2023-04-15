import axios from 'axios';
import { Cookies } from 'typescript-cookie';
// import globalStore from '../globalStore';

const getToken = () => (Cookies.get('token') ? Cookies.get('token')!.toString() : (window.location.href = '/error'));

axios.defaults.headers.common['token'] = getToken();
// globalStore.isLoading.update((val) => (val = true));
