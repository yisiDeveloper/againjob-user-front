/********************************************************************************************************

	File Service Initialization

 *********************************************************************************************************/
export const maxFileSize = 2	// each file
export const fileTypes = ['JPG', 'JPEG', 'PNG', 'GIF', 'XLS', 'XLSX', 'DOC', 'DOCX', 'PPT', 'PPTX', 'ZIP', 'PDF','TXT']


/********************************************************************************************************

	Gookie, Token Naming for Auth

 *********************************************************************************************************/
export const tokenExpireDay = 7
export const cookieExpireDay = 7
export const acTokenName = 'AGAINJOB_ACTOKEN'
export const rfTokenName = 'AGAINJOB_RFTOKEN'
// 로그인 여부
export const authFlagName = 'AGAINJOB_ISAUTHENTICATED'
// 회원아이디
export const memberIdName = 'AGAINJOB_MEMBERID'
// 회원번호
export const memberNumberName = 'AGAINJOB_MEMBERNUMBER'
// 회원 타입: 1: 개인, 0: 기업
export const memberTypeName = 'AGAINJOB_MEMBERTYPE'
// 개인회원 타입
export const memberTypePersonal = '1'
// 기업회원 타입
export const memberTypeCorp = '0'

/********************************************************************************************************

	CS

 *********************************************************************************************************/
export const noticeListOnePageSize: number = 10
export const noticeListPageBlockSize: number = 5
export const faqListOnePageSize: number = 5
export const faqListPageBlockSize: number = 5
export const qnaListOnePageSize: number = 5
export const qnaListPageBlockSize: number = 5
export const qnaMaxFileSize = 2	// each file
export const qnaFileTypes = ['JPG', 'JPEG', 'PNG', 'GIF', 'XLS', 'XLSX', 'DOC', 'DOCX', 'PPT', 'PPTX', 'ZIP', 'PDF','TXT']
export const qnaFileMaxLength = 3