import React, {useCallback, useEffect} from 'react'
import {checkRequiredKeyValue} from '@handler'
import {pageURL_ERROR_NotiForCS, pageURL_Resume_List} from '@env'
import {useForm, useNavigation} from '@hook'
import {ButtonGeneral, PageTitle} from '@components'


interface ResumeDetailPropType {
}

function ResumeDetail({}: ResumeDetailPropType) {

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
		editorHandler,
		checkBoxHandler,
		setErrorMessage,
		changeHandler,
		registerFile,
		deleteFile
	} = useForm({
		initialValues,
		initialErrors
	})

	/****************************************************** Handling ***************************************************/

		// submit
	const submitHandler = useCallback((e: React.SyntheticEvent) => {
			e.preventDefault()

		}, [])


	return (
		<main>
			<section className={'memberTitleArea'}>
				<PageTitle title={'이력서 관리'} />
				<div className={'memberTitleButton'}>
					<span style={{cursor:'pointer'}} onClick={(e) => goToURL(e, pageURL_Resume_List)}>
					<ButtonGeneral
						title={'목록'}
						buttontype={'page'}
						colortype={'pageList'}
					/></span>
					<div className={'emptyDivWidth'} />
					<span style={{cursor:'pointer'}}>
					<ButtonGeneral
						title={'삭제'}
						buttontype={'page'}
						colortype={''}
					/></span>
					<div className={'emptyDivWidth'} />
					<span style={{cursor:'pointer'}}>
					<ButtonGeneral
						title={'이력서 저장'}
						buttontype={'page'}
						colortype={''}
					/></span>
				</div>
			</section>
			<section className={'container containerTop'}>
			</section>
		</main>
	)
}

export default React.memo(ResumeDetail)