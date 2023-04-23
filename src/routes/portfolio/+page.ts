import type { article } from '../../app';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const result = await fetch(`https://hyns.dev/v1/article/list`, {
		method: 'POST',
		body: JSON.stringify({ menu: 'PORTFOLIO', page: 0, size: 10 }),
		headers: { 'Content-Type': 'application/json' }
	});

	const data = await result.json();

	return {
		articles: data.articles as article[],
		total: JSON.parse(JSON.stringify(data.total))
	};
}) satisfies PageLoad;
