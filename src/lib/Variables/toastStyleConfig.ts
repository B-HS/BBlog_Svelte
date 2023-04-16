import { toastStore } from '@skeletonlabs/skeleton';

const style = {
	warning: 'bg-yellow-500 dark:text-black',
	success: 'bg-green-500 dark:text-black p-0 m-0',
	fail: 'bg-rose-500 dark:text-black',
	class: 'h-[3.5vh]',
	time: 1500
};

const tst = (type: 'warning' | 'success' | 'fail', message: string, auto: boolean = true) => {
	toastStore.trigger({
		message: message,
		background: style[type],
		timeout: style.time,
		classes: style.class,
		autohide: auto
	});
};
export { tst };
