export interface articleState {
	num: number | string;
	desc: string;
	tags?: string[];
}

export interface articleTitleProps {
	title: string;
	date: string;
	type?: string;
	subType?: string;
	views?: number;
}

export interface articleCommentProps {
	replyNum: number;
	nickname: string;
	iconUrl: string;
	password?: string;
	date: string;
	commentDesc: string;
	commentGroup: number;
	commentSort: number;
	hide: boolean;
}

export interface article {
	aid: number;
	title: string;
	context: string;
	createdDate: Date | string;
	hide: boolean;
	menu: string;
	thumbnail: string;
	tags: string[];
	visitCnt: number;
}

export interface comment {
	rid?: number;
	commentDesc?: string;
	nickname?: string;
	pw?: string;
	commentGroup?: number;
	commentSort?: number;
	commentImg?: string;
	uploadedDated?: Date | string;
	aid?: number;
	size?: number;
	page?: number;
}

export type FileEventTarget = EventTarget & { files: FileList };
