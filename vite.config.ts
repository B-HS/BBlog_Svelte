import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
const TARGET = 'http://127.0.0.1:10500';
export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true,
		proxy: {
			'/v1': {
				target: TARGET,
				changeOrigin: true
			}
		}
	}
});
