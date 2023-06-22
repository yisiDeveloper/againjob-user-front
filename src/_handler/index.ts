// import { changeDate, pwdCheck, inputCheck, emailCheck } from './checkData';

export { registFile, deleteFile, downloadFiles } from './fileHandler'
export { setCookie, getCookie, removeCookie } from './cookieHandler'
export {
	getSessionItem,
	getAllSessionItem,
	setSessionItem,
	removeSessionItem,
	removeAllSessionItem,
	getLocalItem,
	getAllLocalItem,
	setLocalItem,
	removeLocalItem,
	removeAllLocalItem
} from './storageHandler'

export { default as comValidate } from './comValidate'
export {
	getParams,
	blockEnterKey,
	makeTheValue,
	findValueInObject,
	createFormData,
	popupClose,
	checkRequiredKeyValue,
	findKeyInObjectByValue,
	calcPaginationData,
	makePageBlock
} from './common'