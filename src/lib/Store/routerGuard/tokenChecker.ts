export const tokenChecker = (token: string) => {
	return fetch('https://hyns.dev/v1/article/check', {
		method: 'POST',
		body: JSON.stringify({ aid: 0 }),
		headers: { token: token, 'Content-Type': 'application/json' }
	});
};
