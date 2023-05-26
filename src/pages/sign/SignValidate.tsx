import React from 'react'


interface SignValidateType {
	name: string,
	value: any,
	min: string|number,
	char: number|string
}

/*
name: 입력란의 이름 (e.g.: email, id, password.... )
value: 입력된 값
min: 최소 길이
type: 0: 모두 다, 1: 한글만, 2: 영어만, 3: 숫자만
 */
function SignValidate({name, value, min, char}: SignValidateType) {

	return (
		<>
		</>
	)
}

export default React.memo(SignValidate)