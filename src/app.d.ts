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


export interface article {
	aid: number;
	title: string;
	context: string;
	createdDate: Date | string;
	hide: boolean;
	menu: string;
	thumbnail: string;
	tags:string[]
}