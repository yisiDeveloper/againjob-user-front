import React, {useCallback, useState} from 'react'
import {comValidate, findValueInObject, makeTheValue} from '@handler'
import {fileMessage} from '@env'


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
	const inputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>, min: number, type: string, elName ='') => {
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
	},[values,errors,messages])

	// Checkbox는 boolean 형태로 넣어주고 별도 처리가 필요할 수 있어서 분리
	const checkBoxHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault()

		let {name, checked} =
			e.target
		setValues({...values, [name]: checked})
	}, [values])

	// 페이지 내 별도 처리를 위해 에러 메시지가 필요한 경우
	const setErrorMessage = useCallback((e: React.SyntheticEvent, errorName: string, errorMessage:string): void => {
		e.preventDefault()
		setErrors({...errors, [errorName]: true})
		setMessage({...messages, [errorName]: errorMessage })
	},[errors])

	// Drop down의 값을 제어한다.
	const changeHandler = useCallback((e: React.SyntheticEvent, name: string, value: any): void => {
		e.preventDefault()

		setValues({...values, [name]: value})
		setErrors({...errors, [name]: false})
	},[values,errors])

	// 파일을 등록한다.
	// 이 object는 input file이 multiple이 아니라고 가정
	const registerFile = useCallback((e: React.ChangeEvent<HTMLInputElement>, maxSize: number, fileTypes:{}, fileMaxLength: number) => {

		let {name, files} = e.target

		if(files) {
			//  현재 등록되어 있는 파일 개수에 따라 그 다음부터 번호를 매기고자 한다.
			//  현재 등록되어 있는 파일들과 파일개수
			let fileLength = values[name].length
			let beforeFiles = values[name]

			// 먼저 파일 첨부 개수를 오버한 것은 아닌지 체크
			if(fileLength === fileMaxLength) {
				setErrorMessage(e, name, fileMessage('FILE_MAXCNT').message)
				return false
			}

			for(let i=0; i<files.length; i++) {
				// console.log(i+'번째 파일을 검사합니다.')
				// 사이즈 체크
				let tmpSize = files[i].size/1024/1024 	// MB단위로 변경
				if(tmpSize > maxSize) {
					setErrorMessage(e, name, fileMessage('FILE_MAXSIZE').message)
					return false
				}
				// 타입 체크
				let tmpType = files[i].type.split('/')
				let result = findValueInObject (fileTypes, tmpType[1].toUpperCase())
				if(!result) {
					setErrorMessage(e, name, fileMessage('FILE_TYPE').message)
					return false
				}

				// values에 넣을 파일을 세팅하자
				// 우선 일련번호를 매겨주자
				fileLength = (fileLength===0) ? fileLength : beforeFiles.length
				beforeFiles = [...beforeFiles, files[i]]
			}
			// 모두 정상 체크 됐다면
			// 기존에 등록되어 있는 파일들을 불러온다.
			setValues({...values,[name]: beforeFiles})
			setErrors({...errors, [name]: false})
		}
	},[values, errors])
	/****************************************************** return ***************************************************/
	return {
		values,
		errors,
		messages,
		inputHandler,
		checkBoxHandler,
		setErrorMessage,
		changeHandler,
		registerFile
	}
}

export default useForm