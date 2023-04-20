import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const result = await fetch(`/v1/article/list`, {
		method: 'POST',
		body: JSON.stringify({ aid: -1, menu: 'INTRO' }),
		headers: { 'Content-Type': 'application/json', mode: 'no-cors', credentials: 'include' }
	});

	let data = await result.json();
	if(data.article.aid<1){
		data.article = {
			aid: 0,
			title: "",
			context: "준비 중",
			createdDate: new Date(),
			hide: false,
			menu: "INTRO",
			thumbnail: "",
			tags: [],
			visitCnt: 0,
			github: "string",
			publish: "string",
		}
	}
	return {
		article: data.article,
		pureDesc: data.article.context.replace(/<[^>]+>/g, "").replace(/&nbsp;/g,'')
	};
}) satisfies PageLoad;
