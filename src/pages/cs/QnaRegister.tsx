import React, {useCallback, useRef} from 'react'
import {useForm, useNavigation} from '@hook'
import CsTitles from './CsTitles'
import {Alert, FileUpload, InputTitleType, QuillEditorUser} from '@components'
import {commMessage, pageURL_CS_QnaList, placeholderMessage, qnaFileMaxLength, qnaFileTypes, qnaMaxFileSize} from '@env'
import {findKeyWithRequired} from '@handler'


function QnaRegister() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// editor용 ref
	const editorRef = useRef<any>()

	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		qnaTitle: '',
		uploadFile: [],
		content: ''
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		qnaTitle: '',
		uploadFile: '',
		content: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		setErrorMessage,
		editorHandler,
		registerFile,
		deleteFile
	} = useForm({
		initialValues,
		initialErrors
	})

	/****************************************************** Handling ************************************** *************/

	// submit
	const submitHandler = useCallback((e: React.SyntheticEvent<HTMLSpanElement>) => {
		e.preventDefault()

		// 전체를 검사하자
		let result = findKeyWithRequired(values, errors,['uploadFile'])
		if(result===true) {
			alert('검사를 완료하여 등록합니다.')
			goToURL(e, pageURL_CS_QnaList, propState, true)
		} else {
			// 돌려받은 element에 에러를 만든다.
			setErrorMessage(e, result, commMessage('INVALID_INPUT_PARAM').message)
		}
	}, [values,errors])

	return (
		<main>
			<CsTitles currentMenu={'qna'} pageDetail={'qnaRegister'} submitHandler={submitHandler} />
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
				<FileUpload
					elName={'uploadFile'}
					infoMsgCode={'QNA_FILE_INFO'}
					registFileFunc={(e) => registerFile(e, qnaMaxFileSize, qnaFileTypes, qnaFileMaxLength)}
					deleteFileFunc={deleteFile}
					alertTitle={messages.uploadFile}
					alertDP={errors.uploadFile}
					fileValue={values.uploadFile}
				/>
			</section>
			<div className={'emptyDivHeight'} />
			<section className={'editorContainer'}>
				<QuillEditorUser
					value={values.content}
					onChange={() => editorHandler(editorRef, 5, '', 'content','문의하실 내용은')}
					style={{height: '500px'}}
					placeholder={placeholderMessage('QNA_REGISTER')}
					quillRef={editorRef}
				/>
				<div className={'emptyDivHeight'} />
				<Alert
					title={messages.content}
					alertdisplay={errors.content}
				/>
			</section>

		</main>
	)
}


export default React.memo(QnaRegister)