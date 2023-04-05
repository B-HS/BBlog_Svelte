import { writable } from 'svelte/store';
import type { articleState, articleTitleProps } from '../../app';

export const article = {
	article: writable<articleState & articleTitleProps & { tags: string[] }>({
		date: '',
		desc: '',
		title: '',
		tags: [],
		num: 0
	})
};
