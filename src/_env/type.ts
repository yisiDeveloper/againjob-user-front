export interface noticeType {
	id: number,
	title: string,
	content: string,
	fixed: boolean,
	files: boolean,
	registerDate: string
}

export interface faqType {
	id: number,
	title: string,
	content: string
	files: boolean
}

export interface qnaType {
	id: number,
	title: string,
	content: string
	files: boolean,
	answer: boolean
}



