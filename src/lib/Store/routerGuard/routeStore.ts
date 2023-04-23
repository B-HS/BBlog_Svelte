import type { Page } from '@sveltejs/kit';
import { writable } from 'svelte/store';
import { getCookie } from 'typescript-cookie';
import urlParams from './urlParams';

const { admin } = urlParams;
const urls = writable<string[] | string>(admin);
const authentication = writable<string>('user');

const tokenChecker = (token: string) => {
	return fetch('/v1/article/check', {
		method: 'POST',
		body: JSON.stringify({ aid: 0 }),
		headers: { token: token, 'Content-Type': 'application/json' }
	});
};

let isAuthenticated: string;

const routerGuard = async (path: Page, isNormal?: boolean) => {
	let urlParams: string | string[] = '';
	authentication.subscribe((val) => (isAuthenticated = val));
	urls.subscribe((val) => (urlParams = val));

	if (Array.isArray(urlParams)) {
		const status = urlParams
			.map((val) => {
				if (val == path.route.id) {
					return 1 as number;
				}
				return 0 as number;
			})
			.reduce(function add(sum, currValue) {
				return sum + currValue;
			}, 0);

		if (status > 0) isNormal ? adminCheck(false, true) : adminCheck();
		isNormal ? adminCheck(false, true) : urlParams === path.route.id ? adminCheck : '';
		return;
	}
};

const adminCheck = async (isLogin?: boolean, isNormal?: boolean) => {
	if (document) {
		const cookie = getCookie('token');

		if (typeof cookie === 'undefined') {
			authentication.update((val) => (val = 'user'));
			if (isLogin) {
				return false;
			}
			if (isNormal) {
				authentication.update((val) => (val = 'user'));
				return;
			}
			window.location.href = '/error';
		} else {
			tokenChecker('Bearer ' + cookie).then((res) => {
				console.log(res.statusText);

				res.statusText === 'OK'
					? authentication.update((val) => (val = 'admin'))
					: authentication.update((val) => (val = 'user'));
			});
			return;
		}
		if (isAuthenticated === 'user') {
			if (isLogin) {
				return false;
			}
			window.location.href = '/error';
		}
		if (isLogin) {
			return true;
		}
	}
};

export default { urls, authentication, tokenChecker, routerGuard, adminCheck };
