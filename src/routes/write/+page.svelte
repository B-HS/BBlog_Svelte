<script lang="ts">
	import articleAjax from '$lib/Store/ajax/articleAjax';
	import { adminCheck } from '$lib/Store/routerGuard/routerGuard';
	import { tst } from '$lib/Variables/toastStyleConfig';
	import Icon from '@iconify/svelte';
	import { Editor } from '@tiptap/core';
	import { Highlight } from '@tiptap/extension-highlight';
	import Image from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';
	import Placeholder from '@tiptap/extension-placeholder';
	import TextAlign from '@tiptap/extension-text-align';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	import WriteTags from './../../lib/Article/writeTags.svelte';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { _ } from 'svelte-i18n';
	import { ko } from 'date-fns/locale';
	
	const menuList = ['INTRO', 'DEV', 'ETC', 'PORTFOLIO'];
	const hideList = [true, false];
	let title: string = ""
	let github:string = "";
	let publish:string = "";
	let startDate = new Date();
	let endDate = new Date();
	let editor: Editor;
	let ele: Element;
	let context = '';
	let hashInput = '';
	let hashList: string[] = [];
	let imgBox: HTMLInputElement;
	let currentMenu = menuList[1];
	let currentHide = hideList[1];
	let thumbnail:string = "basic.png"
	let locale = localeFromDateFnsLocale(ko);

	onMount(() => {
		adminCheck()
		editor = new Editor({
			element: ele,
			extensions: [
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3]
					}
				}),
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				Image.configure({
					inline: true
				}),
				Highlight.configure({ multicolor: true }),
				Link.configure({
					autolink: true,
					openOnClick: true,
					linkOnPaste: true
				}),
				Placeholder.configure({
					placeholder: '내용'
				})
			],
			onTransaction: () => {
				editor = editor;
			},
			editorProps: {
				attributes: {
					class: 'outline-none'
				}
			},
			content: context ? context : ''
		});
	});
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	const imgUpload = (e: Event) => {
		const target = e.target as HTMLInputElement;
		let formData = new FormData();
		if (target.files) {
			formData.append('upload', target.files[0]);
			articleAjax.uploadImage(formData).then((res) => {
				thumbnail = `/v1/image/` + res
				editor
					.chain()
					.focus()
					.setImage({ src: `/v1/image/` + res, alt: 'bblog img' })
					.run();
			});
		}
	};

	const alignment = (which: string) => {
		editor.chain().focus().setTextAlign(which).run();
	};
	const bold = () => {
		editor.chain().focus().toggleBold().run();
	};
	const strike = () => {
		editor.chain().focus().toggleStrike().run();
	};
	const bullet = () => {
		editor.chain().focus().toggleBulletList().run();
	};
	const codeblock = () => {
		editor.chain().focus().toggleCodeBlock().run();
	};
	const clearAll = () => {
		editor.chain().focus().clearNodes().run();
		editor.chain().focus().unsetAllMarks().run();
		editor.chain().focus().unsetTextAlign().run();
	};
	const redo = () => {
		editor.chain().focus().redo().run();
	};
	const undo = () => {
		editor.chain().focus().undo().run();
	};

	const highlight = () => {
		editor?.chain().focus().toggleHighlight().run();
	};

	const heading = (i: number) => {
		switch (i) {
			case 0:
				editor.chain().focus().toggleHeading({ level: 1 }).run();
				return;
			case 1:
				editor.chain().focus().toggleHeading({ level: 2 }).run();
				return;
			case 2:
				editor.chain().focus().toggleHeading({ level: 3 }).run();
				return;
			case 3:
				editor.chain().focus().toggleHeading({ level: 4 }).run();
				return;
			default:
				break;
		}
	};

	const setHashtag = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			if (hashInput.trim().length == 0) {
				hashInput = '';
				return;
			}
			if (hashInput.length > 35) {
				tst('warning', '30자 이하로만 입력 가능합니다');
				hashInput = '';
				return;
			}

			if (hashList.includes(hashInput)) {
				tst('warning', '등록된 태그입니다');
				hashInput = '';
				return;
			}
			const tag = hashInput
				.split('')
				.filter((v: string) => v != ',')
				.join('');
			hashList = [...hashList, tag];
			hashInput = '';
		}
	};

	const deleteHashTag = (val: string) => {
		hashList = [...hashList].filter((v) => v != val);
	};

	const write = ()=>{
		articleAjax.writeArticle({
			title: title,
			context: context,
			hide: currentHide,
			menu: currentMenu,
			thumbnail: thumbnail,
			tags: hashList,
			github: github,
			publish: publish,
			startDate: startDate,
			endDate: endDate,
		})
	}
</script>

<section>
	<section class=" container mx-auto m-5 max-w-5xl flex flex-col shadow-lg">
		<section class="etc input border-0 rounded-none border-b dark:border-slate-500 p-1 flex justify-between uppercase">
			<RadioGroup border="0" background="0">
				{#each menuList as menu}
					<RadioItem bind:group={currentMenu} class="transition-all" name="justify" value={menu}>{$_(menu)}</RadioItem>
				{/each}
			</RadioGroup>
			<RadioGroup border="0" background="0">
				{#each hideList as hide}
					<RadioItem bind:group={currentHide} class="transition-all" name="justify" value={hide}>{$_(hide.toString())}</RadioItem>
				{/each}
			</RadioGroup>
		</section>
		<section class="title">
			<input bind:value={title} type="text" class="input border-0 text-2xl p-3 px-5" placeholder="타이틀" />
		</section>
		<section class="btn_part flex justify-between text-2xl p-2 px-5 border-b border-slate-100 dark:bg-slate-500 bg-slate-300">
			<button on:click={undo} class="cursor-pointer">
				<Icon icon="ic:baseline-undo" />
			</button>
			<button on:click={redo} class="cursor-pointer">
				<Icon icon="ic:baseline-redo" />
			</button>
			<button on:click={() => heading(1)} class="cursor-pointer">
				<Icon icon="bx:heading" />
			</button>
			<button on:click={bold} class="cursor-pointer">
				<Icon icon="material-symbols:format-bold" />
			</button>
			<button on:click={strike} class="cursor-pointer">
				<Icon icon="ic:outline-format-strikethrough" />
			</button>
			<button on:click={() => alignment('left')} class="cursor-pointer">
				<Icon icon="material-symbols:format-align-left" />
			</button>
			<button on:click={() => alignment('center')} class="cursor-pointer">
				<Icon icon="material-symbols:format-align-justify" />
			</button>
			<button on:click={() => alignment('right')} class="cursor-pointer">
				<Icon icon="material-symbols:format-align-right" />
			</button>
			<button on:click={codeblock} class="cursor-pointer">
				<Icon icon="ic:round-code" />
			</button>
			<button on:click={clearAll} class="cursor-pointer">
				<Icon icon="carbon:clean" />
			</button>
			<button on:click={highlight} class="cursor-pointer">
				<Icon icon="ooui:highlight" />
			</button>
			<button on:click={() => imgBox.click()} class="cursor-pointer">
				<Icon icon="material-symbols:image-outline-sharp" />
				<input class="hidden" type="file" bind:this={imgBox} on:change={imgUpload} />
			</button>
		</section>
		<section class="context w-full h-full bg-white">
			<div bind:this={ele} class="text-black p-3 min-h-[325px] border-0" />
		</section>
		<section class="tag w-full h-full">
			<div class="p-3 bg-slate-300 dark:bg-slate-500 flex flex-wrap gap-3 items-center">
				<Icon icon="mdi:tag" />
				<WriteTags tags={hashList} tagDelete={deleteHashTag} />
				<section class="taginput flex items-center translate-y-[0.1rem]">
					<label for="tagInput" class="-translate-y-[1px]"><Icon icon="mdi:pencil" /></label>
					<input
						id="tagInput"
						type="text"
						placeholder="태그를 입력해주세요"
						bind:value={hashInput}
						class="h-7 bg-transparent outline-none border-0 focus:ring-transparent shadow-none px-1"
						on:keypress={(e) => setHashtag(e)}
					/>
				</section>
			</div>
		</section>
		<section
			class="date flex items-center p-3 gap-2 w-full"
			style={`${currentMenu === 'PORTFOLIO' ? 'min-height: fit-content;' : 'min-height: 0; display:none;'}`}
		>
			<span class="text-slate-500">|</span>
			<section class="start_date flex">
				<span>시작일 :</span>
				<DateInput closeOnSelection={true} format={'yyyy-MM-dd'} {locale} bind:value={startDate} />
			</section>
			<span class="text-slate-500">|</span>
			<section class="end_date flex">
				<span>종료일 :</span>
				<DateInput closeOnSelection={true} format={'yyyy-MM-dd'} {locale} bind:value={endDate} />
			</section>
			<span class="text-slate-500">|</span>
			<section class="end_date flex gap-1">
				<label for="github">깃허브 :</label>
				<input bind:value={github} id="github" type="text"  placeholder="주소" class="h-6 bg-transparent border-none focus:ring-0 shadow-none p-0">
			</section>
			<section class="end_date flex gap-1">
				<label for="github">배포사이트 :</label>
				<input bind:value={publish} id="github" type="text"  placeholder="주소" class="h-6 bg-transparent border-none focus:ring-0 shadow-none p-0">
			</section>
		</section>
		<button class="btn dark:bg-slate-800" on:click={write}>등록</button>
	</section>
</section>

<style scoped lang="sass">
	.date :global(.date-time-field input)
		border: none !important
		background: none !important
		border-radius: none !important
		animation: none !important
		transition: none !important
		padding: 0
		text-align: center
		box-sizing: border-box
		width: 100px
		&:active, &:focus
			border: none !important
			background: none !important
			border-radius: none !important
			animation: none !important
			transition: none !important
			box-shadow: none !important
			
			

</style>
