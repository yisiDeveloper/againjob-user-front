interface checkedType {
	isChecked: boolean,
	alertMessage: string,
	value: any
}


/*
이메일 체크
*/
export function emailCheck(value: string, minLength: number): checkedType {
	let isChecked = false;
	let alertMessage;

	value = dataTrim(value);
	// 이메일 체크 정규식
	let spPattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	if(value.match(spPattern) === null) {
		alertMessage = '이메일 형식이 올바르지 않습니다.';
	} else if (!minLengthCheck(value, minLength)) {
		alertMessage = '이메일은 최소 5자 이상이어야 합니다.';
	} else if (checkKor(value)) {
		alertMessage = '이메일은 영문만 입력 가능합니다.';
	} else {
		isChecked = true;
		alertMessage = '';
	}

	return { isChecked, alertMessage, value }
}

/*
일반적인 input box
*/
export function inputCheck(value: any, minLength: number, inputName: string): checkedType {
	let isChecked = false;
	let alertMessage = '';
	// value = dataTrim(value);

	if(!minLengthCheck(value, minLength)) {
		alertMessage = inputName + '는(은) 최소 ' + minLength + '자 이어야 합니다.';
	} else {
		isChecked = true;
	}

	return { isChecked, alertMessage, value }
}

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

/*
비밀번호 체크
*/
export function pwdCheck(value: string, minLength: number, maxLength: number): checkedType {
	let isChecked = checkPasswordPattern(value);
	let alertMessage = '';
	value = dataTrim(value);

	if(!isChecked) {
		alertMessage = '비밀번호는 최소 ' + minLength + '자 이상, 최대 ' + maxLength + '자 이하의 문자, 숫자, 특수문자로 구성해야 합니다.';
	} else if (value.indexOf(' ') > 0) {
		alertMessage = '비밀번호에 공백을 포함할 수 없습니다.';
	}

	return { isChecked, alertMessage, value }
}

/*
공통
*/

// 최소 입력길이 체크
function minLengthCheck(value: any, minLength: number): boolean {
	if(value.length < minLength) {
		return false;
	}
	return true;
}

// 데이터 양쪽 공백제거
function dataTrim(value: any): any {
	return value.trim();
}

// 숫자에 콤마찍기
export function addComma(value: number): string {
	return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}


// 한글 체크
function checkKor(str: string): boolean {
	const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
	if(regExp.test(str)){
		return true;
	}else{
		return false;
	}
}

// 비밀번호 패턴 체크 (8자 이상, 문자, 숫자, 특수문자 포함여부 체크)
function checkPasswordPattern(str: string): boolean {
	var pattern1 = /[0-9]/;				// 숫자
	var pattern2 = /[a-zA-Z]/;			// 문자
	var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자

	if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < 8 || str.length > 20) {
		return false;
	} else {
		return true;
	}
}



// // 숫자 체크
// function checkNum(str: number): boolean{
//     const regExp = /[0-9]/g;
//     if(regExp.test(str)){
//         return true;
//     }else{
//         return false;
//     }
// }

// // 영문(영어) 체크
// function checkEng(str: string): boolean{
//     const regExp = /[a-zA-Z]/g; // 영어
//     if(regExp.test(str)){
//         return true;
//     }else{
//         return false;
//     }
// }

// // 영문+숫자만 입력 체크
// function checkEngNum(str: string): boolean{
//     const regExp = /[a-zA-Z0-9]/g;
//     if(regExp.test(str)){
//         return true;
//     }else{
//         return false;
//     }
// }

// // 모든 특수문자 체크
// function noSpecialChar(str: string): boolean {
// 	let special_pattern = /[`~!@#$%^&*|,.\{\}\[\]\(\)\\\'\";:\/?]/gi;
// 	if(special_pattern.test(str)){
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

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