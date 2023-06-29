/*********************************** Message *******************************/
export {
	authMessage,
	commMessage,
	fileMessage,
	memberMessage,
	errorMessage,
	infoMessage
} from './msgDefine'

/*********************************** API URL *******************************/
export {
	apiBaseUrl,
	postManageLoginUrl,
	postFileDownloadUrl,
	getTokenRefreshUrl
} from './apiURL'


/*********************************** Page URL *******************************/
export {
	pageURL_Member_PE_DetailInfo,
	pageURL_Member_CO_DetailInfo,
	pageURL_Sign_Login,
	pageURL_Sign_ChoiceClassify,
	pageURL_Sign_ChoiceChannel,
	pageURL_Sign_PE_AgreePolicy,
	pageURL_Sign_CO_AgreePolicy,
	pageURL_Sign_PE_Info,
	pageURL_Sign_CO_Info,
	pageURL_Sign_Complete,
	pageURL_ERROR_NotiForCS,
	pageURL_Sign_PE_FindID,
	pageURL_Sign_CO_FindID,
	pageURL_Sign_PE_FindPwd,
	pageURL_Sign_CO_FindPwd,
	pageURL_Member_WithdrawComplete,
	pageURL_Member_WithdrawPolicy,
	pageURL_Sign_ChangeTempPwd,
	pageURL_Policy_Service,
	pageURL_Policy_Privacy,
	pageURL_CS_NoticeList,
	pageURL_CS_NoticeDetail,
	pageURL_CS_Faq,
	pageURL_CS_FaqDetail,
	pageURL_CS_QnaList,
	pageURL_CS_QnaDetail,
	pageURL_CS_QnaRegister
} from './pageURL'

export {
	tokenExpireDay, cookieExpireDay, acTokenName, rfTokenName, authName,
	maxFileSize, fileTypes,
	noticeListOnePageSize, noticeListPageBlockSize, faqListOnePageSize, faqListPageBlockSize, qnaListPageBlockSize, qnaListOnePageSize, qnaMaxFileSize, qnaFileTypes, qnaFileMaxLength
} from './common'

/*********************************** type *******************************/
export type {
	noticeType, faqType, qnaType
} from './type'
