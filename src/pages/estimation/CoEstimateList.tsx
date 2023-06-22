import React, {useCallback, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {PageTitle, TabMenu} from '@components'
import {useForm} from '@hook'


interface CoEstimateListPropType {
	bgFunc: (e: React.MouseEvent) => void
}

function CoEstimateList({
	bgFunc
}: CoEstimateListPropType) {

	/****************************************************** common basic definition ***************************************************/
	const navigate = useNavigate()
	const location = useLocation()
	const propState = {...location.state}

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
		// checkRequiredKeyValue(propState, 'name', true, navigate, 'NOT_NORMAL_CONNECT')
		// if (!propState.name) {
		// 	navigate(pageURL_ERROR_NotiForCS, {replace: true, state: {errorCode: 'NOT_NORMAL_CONNECT'}})
		// }
	}, [])

	return (
		<>
			<section className={'contentPopupWrap'} style={{width: '50rem'}}>
				<div className={'contentPopupHead'}>
					<div className={'contentPopupTitle'}><PageTitle title={'주식회사 이시'} /></div>
					<div onClick={bgFunc} className={'contentPopupClose'}></div>
				</div>
				<article className={'contentPopupContent'}>
					<div className={'tabMenuArea'}>
						<div className={'tabMenu'}><TabMenu title={'일거리평가'} focuson={true} /></div>
						<div className={'tabMenu'}><TabMenu title={'채용평가'} focuson={false} /></div>
					</div>
					<div className={'emptyDivHeight'} />

				</article>
			</section>
			<div className={'comBG'} onClick={bgFunc} />
		</>
	)
}

export default React.memo(CoEstimateList)