import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'ko';

register('ko', () => import('./locale/ko'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale
});
