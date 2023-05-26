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

export { default as useForm } from './useForm'
export { inputCheck } from './checkData'
export {
	getParams,
	blockEnterKey,
	goToURL,
	makeTheConfirmValue,
	findValueInObject
} from './common'