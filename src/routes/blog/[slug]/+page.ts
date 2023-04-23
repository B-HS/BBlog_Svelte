import type { article, comment } from '../../../app';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	fetch('/v1/visit/read', {
		method: 'POST',
		body: JSON.stringify({ aid: params.slug, visitUrl: new Date().toString() }),
		headers: { 'Content-Type': 'application/json' }
	});

	const result = await fetch('/v1/article/read', {
		method: 'POST',
		body: JSON.stringify({ aid: params.slug }),
		headers: { 'Content-Type': 'application/json' }
	});

	// const comment = await fetch('/v1/comment/list', {
	// 	method: 'POST',
	// 	body: JSON.stringify({ aid: params.slug, size: 10, page: 0 }),
	// 	headers: { 'Content-Type': 'application/json' }
	// });

	const data = await result.json();
	// const cmt = await comment.json();

	return {
		article: data as article,
		slug: params.slug,
		// comments: cmt.comments as comment[],
		// total: cmt.total
	};
}) satisfies PageLoad;
