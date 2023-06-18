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
export { default as comValidate } from './comValidate'
export {
	getParams,
	blockEnterKey,
	goToURL,
	makeTheValue,
	findValueInObject,
	createFormData,
	popupClose,
	checkRequiredKeyValue,
	findKeyInObjectByValue
} from './common'