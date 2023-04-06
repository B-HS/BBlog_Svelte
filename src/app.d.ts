export interface articleState {
	num: number | string;
	desc: string;
	tags?: string[];
}

export interface articleTitleProps {
	title: string;
	date: string;
	views?: number;
}

export interface articleCommentProps {
	replyNum:number;
	nickname: string;
	iconUrl: string;
	password?: string;
	date: string;
	commentDesc: string;
	commentGroup: number;
	commentSort: number;
	hide: boolean;
}
