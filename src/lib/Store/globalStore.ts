import { writable } from 'svelte/store';

const isLoading = writable<boolean>(false);

export default { isLoading };
