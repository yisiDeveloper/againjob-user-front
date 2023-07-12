import React, {MutableRefObject, useCallback, useState} from 'react'
import {comValidate, findValueInObject, makeTheValue} from '@handler'
import {fileMessage} from '@env'


interface useFormPropType {
	initialValues: object,
	initialErrors: object
}

/***********************************************************************************************************************
 *
 *		각종 입력/선택 값들을 검증하고 모두 정상 입력됐는지 확인한다.
 *
 *		initialValues: 초기 값
 *		validate: 해당 값을 체크하는 validation function
 *
 **********************************************************************************************************************/
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
			// console.log('input value', e)
		let {name, value} = e.target
		value = value.trim()
		// 해당 옵션에 따라 검사한다.
		// 만약 해당 값이 비어있는 값이라면
		if(value.length === 0) {
			setErrors({...errors, [name]: true})
			setMessage({...messages,[name]: ''})
		} else {
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

	},[values,errors,messages])

	// 페이지 내 별도 처리를 위해 에러 메시지가 필요한 경우
	const setErrorMessage = useCallback((e: React.SyntheticEvent, errorName: string, errorMessage:string): void => {
		e.preventDefault()
		setErrors({...errors, [errorName]: true})
		setMessage({...messages, [errorName]: errorMessage })
	},[errors, messages])


	// 페이지 내 별도 값 처리를 위해 에러 메시지가 필요한 경우
	const setValueHandler = useCallback((valueName: string, value: any, errorValue:boolean): void => {
		setValues({...values, [valueName]: value})
		setErrors({...errors, [valueName]: errorValue})
	},[errors, values])



	/*************************************************************************************************
	 * Editor를 위한 별도 handling
	 * **********************************************************************************************/
	const editorHandler = useCallback((ref: MutableRefObject<any>, min: number, type: string, name: string, elName: string, ) => {

		let htmlValue = ref.current.value
		let tmpValue = ref.current.getEditor().getText()

		let result = comValidate(elName, tmpValue, min, type)
		// console.log('result', result)
		if(!result.isChecked) {
			setErrors({...errors, [name]: true})
			setMessage({...messages,[name]: result.alertMessage})
		} else {
			setErrors({...errors, [name]: false})
			setValues({...values, [name]: htmlValue})
		}

	},[values, errors])

	/*************************************************************************************************
	 * Checkbox는 boolean 형태로 넣어주고 별도 처리가 필요할 수 있어서 분리
	 * **********************************************************************************************/
	const checkBoxHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault()

		let {name, checked} =
			e.target
		setValues({...values, [name]: checked})
	}, [values])

	/*************************************************************************************************
	 * Drop down의 값을 제어한다.
	 * **********************************************************************************************/
	const changeHandler = useCallback((e: React.SyntheticEvent, name: string, value: any): void => {
		e.preventDefault()

		setValues({...values, [name]: value})
		setErrors({...errors, [name]: false})
	},[values,errors])


	/*************************************************************************************************
	 * 파일 등록/삭제
	 * **********************************************************************************************/
	const registerFile = useCallback((e: React.ChangeEvent<HTMLInputElement>, maxSize: number, fileTypes:{}, fileMaxLength: number) => {
		e.preventDefault()

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

			// console.log('등록할 files',beforeFiles)
		}


	},[values, errors])


	// 파일 삭제
	// 실제 삭제가 아닌 현 페이지에서 등록한 파일을 저장하기 전 삭제
	// idx: 몇번째 파일인지? , name: 파일이 들어있는 값의 이름
	const deleteFile = useCallback((e: React.SyntheticEvent, idx: number, name: string, fileRef: React.MutableRefObject<any>|null) => {
		e.preventDefault()

		let tmpFiles: File[] = []
		for(let i=0; i<values[name].length; i++) {
			if(idx !== i) {
				tmpFiles = [...tmpFiles, values[name][i]]
			}
		}
		setValues({...values, [name]:tmpFiles})

		// input을 초기화 한다.
		if(fileRef) {
			fileRef.current.value=''
		}

	},[values, errors])

	/****************************************************** return ***************************************************/
	return {
		values,
		errors,
		messages,
		inputHandler,
		editorHandler,
		checkBoxHandler,
		setErrorMessage,
		setValueHandler,
		changeHandler,
		registerFile,
		deleteFile
	}
}

export default useForm