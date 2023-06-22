import React, {useCallback, useEffect} from 'react'
import {checkRequiredKeyValue} from '@handler'
import {pageURL_ERROR_NotiForCS} from '@env'
import {useForm, useNavigation} from '@hook'
import CsTitles from './CsTitles'


interface FAQPropType {
}

function Faq({}: FAQPropType) {

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

	return (
		<main>
			<CsTitles currentMenu={'faq'} />
			<section>
			</section>
		</main>
	)
}

export default React.memo(Faq)