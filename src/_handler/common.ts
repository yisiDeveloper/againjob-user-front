import React from 'react'
import {pageURL_ERROR_NotiForCS} from '@env'

/**************************************************************************************
 *
 * 	Parameter로 넘어온 값 받자
 *
 **************************************************************************************/
export function getParams (getName: string) {
	let params = new URLSearchParams(window.location.search);
	return params.get(getName);
}

/**************************************************************************************
 *
 * 	Enter 못하게 막자~~
 *
 **************************************************************************************/
export function blockEnterKey (): void {
	document.addEventListener('keydown', function(event) {
		// if(event.keyCode === 13) {
		if(event.key === 'Enter') {
			event.preventDefault();
		}
	})
}

/**************************************************************************************
 *
 * 	특정 링크로 보낸다~~~
 *
 **************************************************************************************/
export function goToURL (e: React.SyntheticEvent, URL: string, navigate: any, state: string|object|null = ''){
	e.preventDefault()
	navigate(URL, {replace: true, state: state})
}

/**************************************************************************************
 *
 * 	특정 object에 일괄적으로 한개의 값을 세팅한다.
 *
 **************************************************************************************/
export function makeTheValue (initialValues: any, value: any) {
	let confirmForm = Object.keys(initialValues)
	confirmForm.map((key) => {
		initialValues = {...initialValues, [key]: value}
	})
	return initialValues
}

/**************************************************************************************
 *
 * 	오브젝트 또는 Array에서 특정 값이 있는지 찾기
 * 	찾는 값이 있으면 true, 없으면 false를 반환
 *
 **************************************************************************************/
export function findValueInObject (target: object, value: any) {
	// 먼저 값만 저장하고
	let tmpValues = Object.values(target)
	// 해당 값이 있는지 찾자
	let result = tmpValues.find((data) => data === value)
	return !(result === undefined || result === 'undefined');
}

/**************************************************************************************
 *
 * 	오브젝트에서 특정 값을 가지고 있는 key를 찾기
 * 	찾는 값이 있으면 그 값을 가진것의 keys를, 없으면 false를 반환
 *
 **************************************************************************************/
export function findKeyInObjectByValue (target: object, value: any) {
	// 먼저 값만 저장하고
	let tmpValues = Object.values(target)
	let tmpKeys = Object.keys(target)
	let result = '' // 받는 쪽에서 발생하는 type에러를 방지하고자

	for(let i=0; i < tmpKeys.length; i++) {
		if(tmpValues[i] === value) {
			result = tmpKeys[i]
			break;
		}
	}
	return result
}

/**************************************************************************************
 *
 * 	오브젝트에서 특정 키가 특정 값을 가지고 있는지 확인
 * 	찾는 값이 있으면 키와 값을 오브젝트 형태로, 없으면 false를 반환
 *
 **************************************************************************************/
// export function findKeyValueInObject (target: object, value: any) {
// 	// 먼저 값만 저장하고
// 	let tmpKeys = Object.keys(target)
// 	let tmpValues = Object.values(target)
// 	// 해당 값이 있는지 찾자
// 	let result = tmpValues.find((data) => data === value)
// 	return !(result === undefined || result === 'undefined');
// }


/**************************************************************************************
 *
 * 	Object 형태의 Data를 받아 Form을 만들어 반환한다.
 *
 **************************************************************************************/
export function createFormData(obj: object) {

	let formData = new FormData()

	// 이름과 값을 가져온다.
	let tmpKeys = Object.keys(obj)
	let tmpValues = Object.values(obj)

	// 길이만큼 data 생성
	for(let i=0; i < tmpKeys.length ; i++) {
		formData.append(tmpKeys[i], tmpValues[i].toString())
	}

	return formData
}


/**************************************************************************************
 *
 * 	alert popup 관련
 *
 **************************************************************************************/
export function popupClose (e: any, setPopDP: React.Dispatch<React.SetStateAction<boolean>>): void {
	e.preventDefault()
	setPopDP(false)
}



/**************************************************************************************
 *
 * 	오브젝트에 특정 키가 특정 값을 기지고 있는지 확인하여 없다면 에러 페이지로 보낸다.
 *
 **************************************************************************************/
export function checkRequiredKeyValue (state: object, key:string, value:any, navigate: any, errorCode:string): void {

	// 이름과 값을 가져온다.
	let tmpKeys = Object.keys(state)
	let tmpValues = Object.values(state)
	let tmpState = {errorCode: errorCode}
	let result = false

	// 값이 하나도 없는 경우
	if(tmpKeys.length > 0) {
		for (let i = 0; i < tmpKeys.length; i++) {
			if(tmpKeys[i].toString() === key.toString() && tmpValues[i] === value) {
				result = true
				break;
			}
		}
	}
	// console.log('result', result)
	// 아예 값이 없거나 해당 값이 다르면 error페이지로
	!result && navigate(pageURL_ERROR_NotiForCS, {replace: true, tmpState})
}