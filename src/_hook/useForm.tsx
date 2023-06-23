import React, {useState} from 'react'
import {comValidate, makeTheValue} from '@handler'


interface useFormPropType {
	initialValues: object,
	initialErrors: object
}

/****************************************************************************************
 *
 *		각종 입력/선택 값들을 검증하고 모두 정상 입력됐는지 확인한다.
 *
 *		initialValues: 초기 값
 *		validate: 해당 값을 체크하는 validation function
 *
 ***************************************************************************************/
function useForm({ initialValues, initialErrors }: useFormPropType) {

	/****************************************************** Definition ***************************************************/
	// 반환 타입에 대한 에러를 방지하고자 any로 선언
	const [values, setValues] = useState<any>(initialValues)
	// 모든 입력값 확인을 위해 기본적인 입력완료 confirm 값을 false로 만든다.
	const [errors, setErrors] = useState<any>(makeTheValue(initialErrors, true))
	// 에러가 발생할 경우 리턴할 메시지를 정의
	const [messages, setMessage] = useState<any>(makeTheValue(initialValues,''))

	/****************************************************** Handling ***************************************************/
	// input, radio를 담당
	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, min: number, type: string, elName ='') => {
		e.preventDefault()

		let {name, value} = e.target
		value = value.trim()
		// 해당 옵션에 따라 검사한다.
		let result = comValidate(elName, value, min, type)
		if(!result.isChecked) {
			setErrors({...errors, [name]: true})
			setMessage({...messages, [name]: result.alertMessage})
		} else {
			setErrors({...errors, [name]: false})
			setMessage({...messages,[name]: ''})
			setValues({ ...values, [name]: value})
		}
	}

	// Checkbox는 boolean 형태로 넣어주고 별도 처리가 필요할 수 있어서 분리
	const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault()

		let {name, checked} =
			e.target
		setValues({...values, [name]: checked})
	}

	// 페이지 내 별도 처리를 위해 에러 메시지가 필요한 경우
	const setErrorMessage = (e: React.SyntheticEvent, errorName: string, errorMessage:string): void => {
		e.preventDefault()
		setErrors({...errors, [errorName]: true})
		setMessage({...messages, [errorName]: errorMessage })
	}

	const changeHandler = (e: React.SyntheticEvent, name: string, value: any, prevValues: object): void => {
		e.preventDefault()

		console.log('changeHandler', name + ': ' + value)
		console.log('changeHandler Values', values)
		console.log('받아온 values', prevValues)
		console.log('changeHandler Errors', errors)
		setValues({...values, [name]: value})
		setErrors({...errors, [name]: false})
	}
	/****************************************************** return ***************************************************/
	return {
		values,
		errors,
		messages,
		inputHandler,
		checkBoxHandler,
		setErrorMessage,
		changeHandler
	}
}

export default useForm