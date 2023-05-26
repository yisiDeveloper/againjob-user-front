import { cookieExpireDay } from '@env'
import Cookies from 'universal-cookie'


const cookies = new Cookies();

/********************************************************************************************************

	Set Cookie

 *********************************************************************************************************/
export const setCookie = (name: string, value: any): void => {

	let expireDate = new Date();
	// 분 단위 세팅
	// expireDate.setMinutes(expireDate.getMinutes() + exDay);
	// 일 단위 세팅
	expireDate.setDate(expireDate.getDate() + cookieExpireDay);
	cookies.set(name, value, { path: '/', expires: expireDate, secure: true });
}

/********************************************************************************************************

	Remove Cookie

 *********************************************************************************************************/
export const removeCookie = (name: string): void => {
	cookies.remove(name);
}



/********************************************************************************************************

	Get Cookie

 *********************************************************************************************************/
export const getCookie = (name: string): any => {
	return cookies.get(name);
}

// const [cookie, setCookie, removeCookie] = useCookies([]);
// setCookie(name, value, {path: '/', expires: expireDate});