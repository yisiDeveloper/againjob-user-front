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

export interface resumeType {
	id: number,
	title: string,
	open: boolean,
	registerDate: string,
	modifyDate: string,
	requestCallOpen: number
}

export interface applyType {
	id: number,
	title: string,
	subContent: string,
	applyDate: string,
	open: string
}

export interface involveType {
	id: number,
	title: string,
	estimatePeriod: string,
	address: string,
	reviewDeadline: string,
	estimateAmount: string,
	proposalTitle: string,
	proposalSubContent: string,
	proposalDate: string,
	proposalAmount: string
}

