import type { Page } from '@sveltejs/kit';
import { getCookie } from 'typescript-cookie';
import routeStore from './routeStore';
import { tokenChecker } from './tokenChecker';

const store = routeStore;
let isAuthenticated: string;

export const routerGuard = async (path: Page, isNormal?: boolean) => {
	let urlParams: string | string[] = '';
	store.authentication.subscribe((val) => (isAuthenticated = val));
	store.urls.subscribe((val) => (urlParams = val));

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
		return;
	}

	if (urlParams === path.route.id) isNormal ? adminCheck(false, true) : adminCheck();
};

export const adminCheck = async (isLogin?: boolean, isNormal?: boolean) => {
	if (document) {
		const cookie = getCookie('token');
		
		if (typeof cookie === 'undefined') {
			store.authentication.update((val) => (val = 'user'));
			if (isLogin) {
				return false;
			}
			if (isNormal) {
				store.authentication.update((val) => (val = 'user'));
				return;
			}
			window.location.href = '/error';
		} else {
			const { statusText } = await tokenChecker('Bearer ' + cookie);
			statusText === 'OK'
				? store.authentication.update((val) => (val = 'admin'))
				: store.authentication.update((val) => (val = 'user'));
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
