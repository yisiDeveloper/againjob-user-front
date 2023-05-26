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
 * 	Enter 못하게 박자~~
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
export function goToURL (e: React.SyntheticEvent, URL: string, navigate: any, state: string|null = ''){
	e.preventDefault()
	navigate(URL, {replace: true, state: state})
}

/**************************************************************************************
 *
 * 	form의 모든 값이 체크 완료된 것인지 확인하기 위해 모든 값에 초기 false를 세팅한다.
 *
 **************************************************************************************/
export function makeTheConfirmValue (initialValues: object) {
	let confirmForm = Object.keys(initialValues)
	let formConfirm={}
	confirmForm.map((key) => {
		formConfirm = {...formConfirm, [key]: false}
	})

	return formConfirm
}

/**************************************************************************************
 *
 * 	오브젝트에서 특정 값이 있는지 찾기
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