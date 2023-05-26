import React, {useEffect, useState} from 'react'
import {makeTheConfirmValue} from './common'

interface useFormPropType {
	initialValues: object,
	validate: Function
}

/****************************************************************************************
 *
 *		각종 입력/선택 값들을 검증하고 모두 정상 입력됐는지 확인한다.
 *
 *		initialValues: 초기 값
 *		validate: 해당 값을 체크하는 validation function
 *
 ***************************************************************************************/
function useForm({ initialValues, validate }: useFormPropType) {

	const [values, setValues] = useState(initialValues)
	// 모든 입력값 확인을 위해 기본적인 입력완료 confirm 값을 false로 만든다.
	const [errors, setErrors] = useState<object>(makeTheConfirmValue(initialValues))
	// const [isLoading, setIsLoading] = useState(false)

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		let {name, value} = e.target
		// console.log(e.target)
		// 해당 옵션에 따라 검사한다.
		setValues({ ...values, [name]: value})
		validate(values)
	}

	const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault()
		let {name, checked} = e.target
		setValues({...values, [name]: checked})
		// 체크를 했다면 true를 체크를 해제했다면 false를 넣게됨
		setErrors({...errors, [name]: checked})
	}

	useEffect(() => {
		// 모든 값이 제대로 입력됐는지 확인을 위해 최초 한번 모든 항목에 대해 false를 넣어준다.

	},[])

	return {
		values,
		errors,
		inputHandler,
		checkBoxHandler
	}
}

export default useForm