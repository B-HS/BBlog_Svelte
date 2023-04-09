import axios from 'axios';
import articleStore from '../articleStore';
import globalStore from '../globalStore';

const loadArticleList = async (size: number, page: number, menu: string) => {
	globalStore.isLoading.update((val) => (val = true));
	const { data, statusText } = await axios.post('/v1/article/list', { menu: menu, page: page, size: size });
	const { articles, total } = data;

	if (statusText === 'OK') {
		articleStore.articles.update((val) => (val = [...val, ...articles]));
		articleStore.total.update((val) => (val = total));
        globalStore.isLoading.update((val) => (val = false));
	}
};

export default { loadArticleList };
