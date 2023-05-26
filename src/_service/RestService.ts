import axios, { AxiosRequestConfig } from 'axios';
import {acTokenName, apiBaseUrl, getTokenRefreshUrl} from '@env'
import { getSessionItem, removeAllSessionItem, setSessionItem } from '@handler';

// CORS 해결, http-only Cookie
// // axios.defaults.withCredentials = true;
// axios.defaults.baseURL =
// 	process.env.NODE_ENV === 'production' ? 'https://againjob.co.kr' : 'http://localhost:3090';

axios.defaults.withCredentials = true;
// axios config
const axiosConfig: AxiosRequestConfig = {
	baseURL: apiBaseUrl
}
// axios object
const axiosObject = axios.create(axiosConfig);
// 취소 요청을 위함
const CancelToken  = axios.CancelToken;
// 취소 토큰 생성
const source = CancelToken.source();
// API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
// axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;



/********************************************************************************************************

	Axios가 요청을 보내기 전 Interceptor해서 필요한 부분을 설정

 *********************************************************************************************************/
axiosObject.interceptors.request.use(
	function(config: any) {
		let acToken = getSessionItem(acTokenName);
		// console.log('intercepter request actoken', acToken);
		config.headers["Authorization"] = 'Bearer ' + acToken;
		return config;
	}
)

/********************************************************************************************************

	Axios가 응답을 받았을때 Front에 응답을 주기 전 Interceptor해서 필요한 작업을 수행

 *********************************************************************************************************/
axiosObject.interceptors.response.use(
	function(response) {
		return response;
	},
	async function(error) {
		console.log('intercepter response error', error);
		if(!error.response.data.success && error.response.data.errorCode === 'TOKEN_EXPIRE') {
			try {
				console.log('재발행 시작')
				const originalRequest = error.config;
				let body = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				}
				console.log('body defineded');
				console.log('base url', axiosConfig.baseURL);
				await axios(axiosConfig.baseURL + getTokenRefreshUrl, body)
					.then((res) => {
						console.log('token refresh Result', res)
						if(res.data.success) {
							if(res.data.response.isTokenFlag === 0) {
								let data = res.data.response;

								setSessionItem(acTokenName, data.mgAccessToken);
								// setSessionItem(adminUserID, data.mgId);
								// setSessionItem(adminUserName, data.mgName);
								console.log('저장 완료');
								originalRequest.headers["Authorization"] = 'Bearer ' + data.mgAccessToken;
								return axios.request(originalRequest);
							} else {
								return Promise.reject(res);
							}
						} else {
							return Promise.reject(res);
						}
					}).catch((e) => {
						// alert('재 로그인이 필요합니다. Type1:' + e.data.response.isTokenFlag);
						// removeAllSessionItem();
						// window.location.href='/';
						return Promise.reject(e);
					})
			} catch(e) {
				alert('재 로그인이 필요합니다. Type2:')
				removeAllSessionItem();
				// source.cancel();	// 실제로 취소가 잘 되는지는 모르겠다..
				window.location.href='/';
				return Promise.reject(e);
			}
		} else if(error.response.data.errorCode ==='TOKEN_FAIL'){
			// 토큰이 만료된 경우
			alert('재 로그인이 필요합니다. Type3:' + error.response.data.errorCode);
			removeAllSessionItem();
			window.location.href='/';
			return false;
		} else if(error.code === 'ERR_CANCELED') {
			// canceld error
			console.log('err canceled')
			alert('재 로그인이 필요합니다. Type4:' + error.name);
			removeAllSessionItem();
			window.location.href='/';
			return false;
		}
	}
)

/********************************************************************************************************

	Post 방식의 등록/수정/삭제 또는 조회

 *********************************************************************************************************/
export const formSubmit = async (url: string, formData: object, contentType: string): Promise<any> => {

	let coType: string = contentType==='file' ? 'multipart/form-data' : 'application/x-www-form-urlencoded';
	let body: object = {
		method: 'POST',
		data: formData,
		headers: {
			'Content-Type': coType,
		},
		cancelToken: source.token
	}

	let res;
	try {
		res = await axiosObject(url, body)
		return Promise.resolve(res);
	} catch (e) {
		return Promise.reject(e);
	}
}

/********************************************************************************************************

	get 방식의 데이터 조회

 *********************************************************************************************************/
export const getData = async (url: string): Promise<any> => {

	let body = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		cancelToken: source.token
	}

	try {
		let res = await axiosObject(url, body)
		return Promise.resolve(res);
	} catch(e) {
		return Promise.reject(e);
	}
}


/********************************************************************************************************

	파일의 Blob 데이터를 가져오기

 *********************************************************************************************************/
export const getFileData = async (url: string, formData: object): Promise<any> => {

	let body: object = {
		method: 'POST',
		responseType: 'blob',
		data: formData,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	}

	try {
		const res = await axiosObject(url, body)
		return Promise.resolve(res);
	} catch (e) {
		return Promise.reject(e);
	}
}