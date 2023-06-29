import React, {useCallback, useEffect} from 'react'
import {useForm, useNavigation} from '@hook'
import CsTitles from './CsTitles'
import {FileUpload, InputTitleType, QuillEditorAdmin, QuillEditorUser} from '@components'
import {qnaFileMaxLength, qnaFileTypes, qnaMaxFileSize} from '@env'
import ReactQuill from "react-quill"

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
		registerFile,
		deleteFile
	} = useForm({
		initialValues,
		initialErrors
	})

	/****************************************************** Handling ***************************************************/

	// submit
	const submitHandler = useCallback(() => {

	}, [])

	const editorHandler = useCallback((text: string) => {
		console.log(text);
	},[])

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
			<section className={'container containerTop'}>
				<QuillEditorUser
					value={values.content}
					onChange={editorHandler}
					// onChange={(e)=>inputHandler(e, 3, 'text', 'content')}
					style={{height: '300px'}}
				/>
			</section>
		</main>
	)
}


export default React.memo(QnaRegister)