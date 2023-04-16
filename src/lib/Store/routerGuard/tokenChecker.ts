import axios from 'axios';
export const tokenChecker = (token: string) => axios.post('/v1/article/check', {}, { headers: { token: token } });
