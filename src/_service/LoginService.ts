import {authFlagName, postManageLoginUrl} from '@env'
import { formSubmit } from './RestService'
import { getSessionItem, removeAllSessionItem } from '@handler'


/********************************************************************************************************

	Login

 *********************************************************************************************************/
export async function GoSignIn(formData: object, isChecked: boolean = false) {
	// token
	let acToken;
	// console.log('login start');
	// const dispatch = useDispatch();
	try {
		await formSubmit(postManageLoginUrl, formData, 'General')
			.then(res => {
				let data = res.data;

				if(data.success) {
					acToken = data.response.lgAccessToken;
					// 로그인 상태 유지
					if(isChecked) {
						// setCookie(keepLoginName, "Y", tokenExpireDay);
					}
					return {success: true, acToken: acToken}
				} else {
					return {success: false, errorCode: data.errorCode}
				}
			});
	} catch(e: any) {
		return {success: false, errorCode: e.code};
	}
}


/********************************************************************************************************

	Storage와 Cookie를 활용하여 로그인 되어있는 사용자인지 체크한다.

 *********************************************************************************************************/
export function checkSignIn(): boolean {
	let result = getSessionItem(authFlagName);
	if(result) {
		return true;
	} else {
		removeAllSessionItem();
		return false;
	}
}

/********************************************************************************************************

	Logout

 *********************************************************************************************************/
export function goSignOut() {
	// console.log('start logout aa')
	if(removeAllSessionItem()) {
		return true
	} else {
		return false;
	}
}