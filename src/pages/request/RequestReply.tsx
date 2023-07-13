import React, {useCallback, useLayoutEffect, useRef} from 'react'
import {useForm, useNavigation} from '@hook'
import {popup_CLoseButton} from '@assets'
import {Alert, ButtonGeneral, ButtonRound, QuillEditorLight} from '@components'
import './request.css'
import {placeholderMessage} from '@env'


interface RequestReplyPropType {
	targetId: number,
	bgFunc: (e: React.MouseEvent) => void,
}

function RequestReply({
	targetId,
	bgFunc
}: RequestReplyPropType) {

	/****************************************************** common basic definition ***************************************************/
	const {navigate, goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	const editorRef = useRef<React.MutableRefObject<any>>()
	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		reply: ''
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		reply: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		editorHandler,
		setErrorMessage,
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
	useLayoutEffect(() => {

	}, [])

	return (
		<>
			<section className={'contentPopupWrap'}>
				<div className={'popTitleArea'}>
					<div className={'popTitle'}>
						답변하기
						<div className={'emptyDivWidth'} />
						<ButtonRound
							title={'채용'}
							buttontype={'small'}
						/>
					</div>
					<p className={'popClose'} onClick={bgFunc}>
						<img src={popup_CLoseButton} alt='close '/>
					</p>
				</div>
				<div className={'emptyDivHeight'} />
				<div className={'requestTitle contentBottomLine'}>
					저희 회사 회계 팀장님으로 입사를 요청드립니다.
				</div>
			 	<div className={'requestContent'}>
					 저희 회사는 업계 30년차, 정직원 수 100명에 이르는 강소기업 입니다.
					<br /><br />
					 최근 회사가 지속적으로 확장됨에 따라 경험이 많고 전문적인 지식을 가지고 계신 전문 회계팀장님을 모시고 있습니다.<br />
					 저희 채용공고를 확인하시고 지원 요청 드립니다.
				</div>
				{(false) ?
					<>
						<div className={'replyContent'}>죄송합니다. 다음에 지원하도록 하겠습니다.</div>
					</>
				:
					<>
						<div className={'contentBottomLine'}/>
						<QuillEditorLight
							value={values.reply}
							onChange={() => editorHandler(editorRef, 5, '', 'reply','자기 소개는', 100)}
							style={{height: '200px',marginTop: '1rem'}}
							placeholder={placeholderMessage('REQUEST_REPLY')}
							quillRef={editorRef}
						/>
						<div className={'emptyDivHeight'} />
						<div style={{height: '1.5rem'}} />
						<Alert
							title={messages.reply}
							alertdisplay={errors.reply}
						/>
						<div className={'emptyDivHeight'} />
						<div style={{textAlign: 'center'}}>
							<ButtonGeneral title={'답변하기'} buttontype={'middle'} />
						</div>
					</>
				}
			</section>
			<div className={'comBG'} onClick={bgFunc} />
		</>
	)
}

export default React.memo(RequestReply)