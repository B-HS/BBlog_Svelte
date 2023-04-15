import type { Page } from '@sveltejs/kit';
import routeStore from './routeStore';
import { getCookie } from 'typescript-cookie';
import { tokenChecker } from './tokenChecker';

export const routerGuard = async (path: Page) => {
	const store = routeStore;
	let urlParams: string | string[] = '';
	let isAuthenticated: string;
	store.authentication.subscribe((val) => (isAuthenticated = val));
	store.urls.subscribe((val) => (urlParams = val));

	const adminCheck = async () => {
		const cookie = getCookie('token');

		if (typeof cookie === 'undefined') {
			store.authentication.update((val) => (val = 'user'));
		} else {
			const { statusText } = await tokenChecker('Bearer' + cookie);
			statusText === 'OK'
				? store.authentication.update((val) => (val = 'admin'))
				: store.authentication.update((val) => (val = 'user'));
		}
		if (isAuthenticated === 'user') {
			window.location.href = '/error';
		}
	};

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

		if (status > 0) adminCheck();
		return;
	}

	if (urlParams === path.route.id) adminCheck();
};
