import React, {useCallback, useEffect} from 'react'
import {checkRequiredKeyValue} from '@handler'
import {pageURL_ERROR_NotiForCS} from '@env'
import {useForm, useNavigation} from '@hook'


interface QnaDetailPropType {
}

function QnaDetail({}: QnaDetailPropType) {

	/****************************************************** common basic definition ***************************************************/
	const {navigate, goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
		// 모든 입력값의 초기값을 만든다.
	const initialValues = {
			loginType: 'email',
			coEmail: ''
		}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		coEmail: '',
		coBusinessNo: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		checkBoxHandler,
		setErrorMessage
	} = useForm({
		initialValues,
		initialErrors
	})

	/****************************************************** Handling ***************************************************/

		// submit
	const submitHandler = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault()

	}, [])


	// 한번 만 실행되도록 하기 위함
	useEffect(() => {
		checkRequiredKeyValue(propState, 'name', true, navigate, 'NOT_NORMAL_CONNECT')
		if (!propState.name) {
			navigate(pageURL_ERROR_NotiForCS, {replace: true, state: {errorCode: 'NOT_NORMAL_CONNECT'}})
		}
	}, [])

	return (
		<main>
			<section>
			</section>
		</main>
	)
}

export default React.memo(QnaDetail)