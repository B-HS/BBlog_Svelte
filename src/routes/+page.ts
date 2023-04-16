import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const result = await fetch(`/v1/article/list`, {
		method: 'POST',
		body: JSON.stringify({ aid: -1, menu: 'INTRO' }),
		headers: { 'Content-Type': 'application/json', mode: 'no-cors', credentials: 'include' }
	});

	const data = await result.json();

	return {
		article: data.article
	};
}) satisfies PageLoad;
