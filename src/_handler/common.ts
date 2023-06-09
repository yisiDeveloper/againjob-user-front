import React from 'react'
import {pageURL_ERROR_NotiForCS} from '@env'

/**************************************************************************************
 * 	Parameter로 넘어온 값 받자
 *
 **************************************************************************************/
export function getParams (getName: string) {
	let params = new URLSearchParams(window.location.search);
	return params.get(getName);
}

/**************************************************************************************
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
 * 	exceptEL은 만약 해당 Object에서 검사하지 않아야 할 것이 있다면 건너뛰게 하기 위함
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
 * 	필수 항목에 대한 빈값 체크
 * 	elName은 array형태로 체크하지 않아도 되는 값의 key를 받는다.
 *
 * 	체크 시 elName에 없다면(필수 값이라면) error가 true인지를 찾고
 * 	elName에 있다면 빈값이 아닌 경우에만 error가 True인것을 찾는다.
 *
 **************************************************************************************/
export function findKeyWithRequired (values: object, errors: object|any, elName: string[]) {
	// 먼저 값만 저장하고
	let tmpKeys = Object.keys(values)
	let tmpValues = Object.values(values)
	// 해당 값이 있는지 찾자

	let result:string|boolean = true

	for(let i=0; i<tmpKeys.length; i++) {
		// 먼저 옵션값인지를 확인한다.
		if(findValueInObject(elName, tmpKeys[i])){
			// 옵션값이고 error가 true라면
			if(tmpValues[i].length > 0 && errors[tmpKeys[i]]) {
				result = tmpKeys[i]
				break;
			}
		} else {
			// 필수값이란 의미이므로 error에서 true인지를 확인한다.
			if(errors[tmpKeys[i]]) {
				result = tmpKeys[i]
				break;
			}
		}
	}

	return result
}


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

export function popupOpen (e: any, setPopDP: React.Dispatch<React.SetStateAction<boolean>>): void {
	e.preventDefault()
	setPopDP(true)
}



/**************************************************************************************
 *
 * 	오브젝트에 특정 키가 특정 값을 기지고 있는지 확인하여 없다면 에러 페이지로 보낸다.
 *
 **************************************************************************************/
export function checkRequiredKeyValue (state: object, key:string, value:any, navigate: any, errorCode:string) {

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
	// console.log('state', tmpState)
	// 아예 값이 없거나 해당 값이 다르면 error페이지로
	return !result ? navigate(pageURL_ERROR_NotiForCS, {replace: true, state: tmpState}) : result
}


/**************************************************************************************
 *
 *	Pagination의 페이지를 계산해주는 공식
 *
 **************************************************************************************/
export function calcPaginationData (currentPage: number, pageSize:number, pageBlockSize: number, totalCounts: number) {

	// 전체 페이지를 계산
	let totalPages = Math.ceil(totalCounts/pageSize)

	// 페이지 블록을 계산한다. 나머지가 있는 경우 무조건 올림을 해서 페이지 블록을 만든다.
	let totalPageBlock = Math.ceil(totalPages/pageBlockSize)
	let currentPageBlock = Math.ceil(currentPage/pageBlockSize)
	// 현재 페이지블록의 시작과 끝을 만든다.
	let startPage = currentPageBlock * pageBlockSize - pageBlockSize + 1
	let lastPage = currentPageBlock * pageBlockSize

	// 만약 마지막 페이지가 전체 마지막 페이지보다 크다면 마지막 페이지를 최종 페이지로 계산
	if(lastPage > totalPages) {
		lastPage = totalPages
	}

	return {
		totalPages,				// 전체 페이지 수
		totalPageBlock,		// 페이지 블록 개수
		currentPageBlock,	// 현재 페이지 블록 위치
		startPage,				// 현재 페이지 블록의 시작 페이지 번호
		lastPage					// 현재 페이지 블록의 끝 페이지 번호
	}
}

/**************************************************************************************
 *
 *	현재 페이지의 블록을 만든다.
 *
 **************************************************************************************/
export function makePageBlock (currentPage:number, startpage: number, lastpage: number) {

	let currentPageFlag:boolean
	let tmp:object[] = []

	for(let i=startpage; i <= lastpage; i++) {
		currentPageFlag = (i === currentPage)
		tmp = [...tmp, {page: i, pageFlag: currentPageFlag}]
	}

	return tmp
}


/**************************************************************************************
 *
 *	날짜를 YYYY-MM-DD 형식으로 돌려주기
 *
 **************************************************************************************/
export function changeDate(value: string): string {

	// console.log('original date', value);
	let tmpDate = new Date(value);

	let year = tmpDate.getFullYear().toString();
	let month = (tmpDate.getMonth() + 1).toString();
	let day = tmpDate.getDate().toString();

	// console.log(year, month, day);

	month = (month.length === 1) ? '0' + month : month;
	day = (day.length === 1) ? '0' + day : day;

	return (year + '-' +  month + '-' + day);
}