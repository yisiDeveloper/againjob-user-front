import React, {useCallback, useEffect} from 'react'
import {useForm, useNavigation} from '@hook'
import CsTitles from './CsTitles'


interface NoticeDetailPropType {
}

function NoticeDetail({}: NoticeDetailPropType) {

	/****************************************************** common basic definition ***************************************************/
	const {navigate, goToURL, propState} = useNavigation()
	console.log(propState)

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

	}, [])

	return (
		<main>
			<CsTitles currentMenu={'notice'} />
			<section className={'container'}>
			</section>
		</main>
	)
}

export default React.memo(NoticeDetail)