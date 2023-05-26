export interface alertControlType {
	dp: boolean,
	msg: string
}

export interface FileInfoType {
	dcSeq: number,
	dfFilename: string,
	dfSaveFilename: string,
	dfSavePath: string,
	dfSeq: number
}

export interface RequestFileInfoType {
	rfSeq: number,
	rfFilename: string,
	rfSaveFilename: string,
	rfSavePath: string,
	rqSeq: number
}

export interface RequestCommentType {
	rcSeq: number,
	rqSeq: number,
	rcRegisterSeq: number,
	rcRegisterId: string,
	rcRegisterName: string,
	rcType: number,
	rcContents: string,
	rcRegDateYmd: string
}