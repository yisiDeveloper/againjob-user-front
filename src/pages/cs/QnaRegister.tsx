import React, {useCallback, useEffect, useRef} from 'react'
import {useForm, useNavigation} from '@hook'
import CsTitles from './CsTitles'
import {Alert, ButtonGeneral, ButtonRound, InfoAlert, InputTitleType} from '@components'
import {qnaFileMaxLength, qnaFileTypes, qnaMaxFileSize} from '@env'

function QnaRegister() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
			qnaTitle: '',
			uploadFile: [],
			content: ''
		}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		qnaTitle: '',
		content: '',
		uploadFile: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		setErrorMessage,
		registerFile
	} = useForm({
		initialValues,
		initialErrors
	})

	/****************************************************** Handling ***************************************************/

	// submit
	const submitHandler = useCallback(() => {

	}, [])


	const fileRef = useRef<any>();
	const fileHandler = ((e: React.SyntheticEvent) => {
		e.preventDefault()

		if(fileRef) {
			fileRef.current.click();
		}

	})

	useEffect(() => {
		console.log('values',values)
	},[values])


	return (
		<main>
			<CsTitles currentMenu={'qna'} pageDetail={'qnaRegister'} />
			<InputTitleType
				placeholder={'제목을 입력해주세요'}
				name={'qnaTitle'}
				max={100}
				type={'text'}
				onchange={(e) => inputHandler(e, 3, 'text', '제목은 ')}
				message={messages.qnaTitle}
			/>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop'}>
				<div style={{display: 'flex'}}>
					<span onClick={fileHandler}><ButtonGeneral
						title={'파일첨부'}
						buttontype={'file'}
						colortype={'file'}
					/></span>
					<div className={'emptyDivWidth'} />
					<InfoAlert messageCode={'FILE_INFO'} />
					<input type={'file'} name={'uploadFile'} onChange={(e) => registerFile(e, qnaMaxFileSize, qnaFileTypes, qnaFileMaxLength)} ref={fileRef} style={{display:'none'}} />
				</div>
				<Alert
					title={messages.uploadFile}
					alertdisplay={errors.uploadFile}
				/>
				<div className={'emptyDivHeight'} />
				<div>
					{
						values.uploadFile.map((data:any ,idx: any) => {
							return (
								<span key={idx}>
									<span onClick={() => alert(idx)}>
										<ButtonRound
											title={data.name}
											buttontype={'file'}
										/>
									</span>
									<div className={'emptyDivWidth'} />
								</span>
							)
						})
					}
				</div>
			</section>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop'}>

			</section>
		</main>
	)
}

export default React.memo(QnaRegister)