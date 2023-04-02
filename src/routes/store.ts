import { writable } from 'svelte/store';
import type { articleState } from '../app';

export const article = {
	article: writable<articleState>({
		date: '',
		desc: '',
		title: '',
        tags: [],
	})
};
