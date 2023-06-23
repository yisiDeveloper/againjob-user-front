import React, {useCallback, useEffect} from 'react'
import {checkRequiredKeyValue} from '@handler'
import {pageURL_ERROR_NotiForCS} from '@env'
import {useForm, useNavigation} from '@hook'
import CsTitles from './CsTitles'
import {ListSearch} from "@components"


interface FAQPropType {
}

function Faq({}: FAQPropType) {

	/****************************************************** common basic definition ***************************************************/
	const {navigate, goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
		// 모든 입력값의 초기값을 만든다.
	const initialValues = {
			searchOption: 'subject',
			searchKeyword: ''
		}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		searchKeyword: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		setErrorMessage,
		changeHandler
	} = useForm({
		initialValues,
		initialErrors
	})

	/****************************************************** Handling ***************************************************/
	const getFagContent = useCallback((e: React.SyntheticEvent) => {
		// e.preventDefault()
	},[])


	return (
		<main>
			<CsTitles currentMenu={'faq'} />
			<ListSearch
				options={[{id:'subject', title:'제목'},{id: 'content', title:'내용'}]}
				values={values}
				errors={errors}
				inputHandler={(e) => inputHandler(e, 2, 'text', '검색어는 ')}
				changeHandler={changeHandler}
				errorMessage={messages.searchKeyword}
				submitHandler={getFagContent}
				setErrorMessage={setErrorMessage}
			/>
			<section className={'container'}>
			</section>
		</main>
	)
}

export default React.memo(Faq)