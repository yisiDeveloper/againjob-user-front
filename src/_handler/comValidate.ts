import {commMessage, memberMessage} from '@env'

/***************************************************************************
	name: element 이름
	value: element에 입력된 값
	min: 최소 글자
	max: 최대 글자
	type: 어떤 종류의 입력 값인지
		- email: 이메일 타입
		- password: 비밀번호
		- number: 숫자만 허용
		- korean: 한글만 허용
		- english: 영어만 허용
 		- name: 각종 이름 (한글, 영문만 허용)
		- all: 모두 허용
 	return: isChecked: true | false
 			alertMessage: message를 string형태로 리턴
 **************************************************************************/
export default function comValidate(name: string, value: any, min: number, type:string) {

	type resultType = {
		isChecked: boolean,
		alertMessage: string
	}

	let result: resultType = {isChecked: true, alertMessage: ''}
	value = dataTrim(value)

	// 최소 길이 체크
	if(!minLengthCheck(value, min)) {
		result = {isChecked: false, alertMessage: commMessage('CHAR_SIZE_CONSTRAINT', name, min).message}
	} else {
		// 이메일 형식 체크
		if(type==='email') {
			result = emailCheck(value, min)
		}

		if(type==='number') {
			if(!onlyNum(value)) {
				result = {isChecked: false, alertMessage: commMessage('ONLY_NUMBER', name).message}
			}
		}

		// 비밀번호 체크
		if(type==='password') {
			result = pwdCheck(value, name, min)
		}

		// 각종 이름 체크, 영문, 한글만 가능
		if(type==='name') {
			// 숫자가 있는지 체크
			if(checkNum(value)) {
				result = {isChecked: false, alertMessage: commMessage('NEVER_NUMBER', name).message}
			}
		}

		// 단순 텍스트, 특수문자 불가
		if(type==='textNoSpecialChar') {
			if(noSpecialChar(value)) {
				result = {isChecked: false, alertMessage: commMessage('NEVER_SPECIAL_CHAR', name).message}
			}
		}
	}

	return result
}



/*
이메일 체크
*/
function emailCheck(value: string, minLength: number) {
	let isChecked = false;
	let alertMessage;

	value = dataTrim(value);
	// 이메일 체크 정규식
	let spPattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	if(value.match(spPattern) === null) {
		alertMessage = commMessage('EMAIL_ADDRESS_INVALID').message
	} else if (!minLengthCheck(value, minLength)) {
		alertMessage = commMessage('CHAR_SIZE_CONSTRAINT','이메일', minLength).message
	} else if (checkKor(value)) {
		alertMessage = commMessage('NEVER_KOREAN').message
	} else {
		isChecked = true
		alertMessage = ''
	}

	return { isChecked, alertMessage, value }
}

/*
일반적인 input box
*/
// export function inputCheck(value: any, minLength: number, inputName: string) {
// 	let isChecked = false;
// 	let alertMessage = '';
// 	// value = dataTrim(value);
//
// 	if(!minLengthCheck(value, minLength)) {
// 		alertMessage = inputName + '는(은) 최소 ' + minLength + '자 이어야 합니다.';
// 	} else {
// 		isChecked = true;
// 	}
//
// 	return { isChecked, alertMessage }
// }

/*
&lt;script&gt;
/</ <-- 정규식 표현, g는 모든 문자열 치환, i는 대소문자 구분하지 않음
홀 따움표: &apos;
*/
// export function changeCharacter(value) {
// 	let tmpValue = value;
// 	tmpValue.replace(/</gi, '&lt;');
// 	tmpValue.replace(/>/gi, '&gt;');

// 	return tmpValue;
// }

// export function changeToTag(value) {
// 	let tmpValue = value;
// 	tmpValue.replaceAll(/&lt;/gi, '<');
// 	tmpValue.replaceAll(//gi, '>');

// 	return tmpValue;
// }

/*
	날짜를 YYYY-MM-DD 형식으로 돌려주기
*/
function changeDate(value: string): string {

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

/*
비밀번호 체크
*/
function pwdCheck(value: string, name: string, minLength: number) {
	let isChecked = checkPasswordPattern(value, minLength, 20);
	let alertMessage = '';
	value = dataTrim(value);

	if(!isChecked) {
		alertMessage = memberMessage('INVALID_PASSWORD', name).message;
	} else if (value.indexOf(' ') > 0) {
		alertMessage = commMessage('INVALID_SPACE', name).message
	}

	return { isChecked, alertMessage, value }
}

/*
공통
*/

// 최소 입력길이 체크
function minLengthCheck(value: any, minLength: number): boolean {
	return dataTrim(value).length >= minLength
}

// 데이터 양쪽 공백제거
function dataTrim(value: any): any {
	return value.trim()
}

// 숫자에 콤마찍기
function addComma(value: number): string {
	return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}


// 한글 체크
function checkKor(str: string): boolean {
	const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
	return regExp.test(str);
}

// 비밀번호 패턴 체크 (8자 이상, 문자, 숫자, 특수문자 포함여부 체크)
function checkPasswordPattern(str: string, min: number, max: number): boolean {
	var pattern1 = /[0-9]/;				// 숫자
	var pattern2 = /[a-zA-Z]/;			// 문자
	var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자

	if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < min || str.length > max) {
		return false;
	} else {
		return true;
	}
}



// 숫자가 있는지 체크
function checkNum(str: any): boolean{
    //  숫자가 있는지 체크
	const regExp = /[0-9]/g
    return regExp.test(dataTrim(str));
}

// 숫자만 체크
function onlyNum(str: any): boolean{
	const regExp = /^[0-9]+$/;
	return regExp.test(dataTrim(str));
}

// 영문(영어) 체크
function checkEng(str: string): boolean{
    const regExp = /[a-zA-Z]/g; // 영어
    return regExp.test(str);
}

// // 영문+숫자만 입력 체크
// function checkEngNum(str: string): boolean{
//     const regExp = /[a-zA-Z0-9]/g;
//     if(regExp.test(str)){
//         return true;
//     }else{
//         return false;
//     }
// }

// 모든 특수문자 체크
function noSpecialChar(str: string): boolean {
	let special_pattern = /[`~!@#$%^&*|,.\{\}\[\]\(\)\\\'\";:\/?]/gi;
	return special_pattern.test(str);
}

// // 일부 허용 특수문자 체크
// // 수정필요
// function customSpecialChar(str: string, spPattern: string): boolean {
// 	let special_pattern = spPattern
// 	if(special_pattern.test(str)) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }