import type { article } from '../../../app';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const result = await fetch('../v1/article/read', {
		method: 'POST',
		body: JSON.stringify({ aid: params.slug }),
		headers: { 'Content-Type': 'application/json' }
	});

	const data = await result.json();

	return {
		article: data as article,
		slug: params.slug
	};
}) satisfies PageLoad;
