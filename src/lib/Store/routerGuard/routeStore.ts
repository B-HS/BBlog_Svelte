import { writable } from 'svelte/store';
import urlParams from './urlParams';
import { Cookies } from 'typescript-cookie';


const urls = writable<string[] | string>(urlParams.admin);
const authentication = writable<string>('user');

const tokenChecker = () => {
	const token = typeof Cookies.get('token')!==undefined ? Cookies.get("token")?.toString():"no token"
	return fetch('/v1/article/check', {
		method: 'POST',
		body: JSON.stringify({ aid: 0 }),
		headers: { token: "Bearer "+token! , 'Content-Type': 'application/json' }
	});
};

export default { urls, authentication, tokenChecker };
