import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {
	commMessage,
	pageURL_Resume_List,
	placeholderMessage, portfolioFileTypes,
	portfolioMaxFileSize, portfolioMaxLength
} from '@env'
import {useForm, useNavigation} from '@hook'
import {
	AddressSearch, Alert,
	ButtonGeneral,
	CustomCheckBox, Dropdown, FileUpload,
	InfoAlert,
	InputTitleType,
	InputWithAlert,
	PageTitle, Popup, QuillEditorUser
} from '@components'
import {popupClose} from '@handler'


function ResumeRegister() {

	/****************************************************** common basic definition ***************************************************/
	const {navigate, goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		resumeTitle: '',
		userName: '이시',
		userEmail: 'yisi@yisistory.com',
		mobileNumber: '010-1234-1234',
		agreeRequestContactInfo: '',
		basicAddress: '',
		detailAddress: '',
		tag: [],
		schoolGubun: '',
		schoolName: '',
		majorName: '',
		graduateYear: '',
		schoolInMethod1: '',
		schoolInMethod2: '',
		career: [],
		portFolio: [],
		profile: ''
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		resumeTitle: '',
		userName: '',
		userEmail: '',
		mobileNumber: '',
		agreeRequestContactInfo: '',
		basicAddress: '',
		detailAddress: '',
		tag: '',
		schoolGubun: '',
		schoolName: '',
		majorName: '',
		graduateYear: '',
		career: '',
		portFolio: '',
		profile: ''
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
		setValueHandler,
		changeHandler,
		registerFile,
		deleteFile
	} = useForm({
		initialValues,
		initialErrors
	})

	// 주소 검색 창 관리
	const [addressDP, setAddressDP] = useState(false)
	// 에디터 용
	const editorRef = useRef<any>()
	// 경력 2, 3 용
	const careerRef = useRef<any>([])
	// 졸업년도 옵션 세팅
	const [graduateYearOptions, setGraudateYearOptions] = useState<object[]>([])
	// alert용 팝업
	const [popDp, setPopDp] = useState<boolean>(false)
	const [popMsg, setPopMsg] = useState<object>({})

	/****************************************************** Handling ***************************************************/
	// 우편번호 검색
	const searchAddress = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault()

		setAddressDP(true)
		// inputHandler(e, 10, 'text','회사 주소는' )
	},[values,errors])

	// 경력 추가 handling
	const addCareer = useCallback((e: React.SyntheticEvent, type: string) => {
		e.preventDefault()

		let ref1_dp = careerRef.current[0].style.display
		let ref2_dp = careerRef.current[1].style.display

		// 경력을 추가하려는 거라면
		if(type==='add') {
			// 만약 0이 none이라면
			if(ref1_dp === 'none') {
				careerRef.current[0].style.display = 'block'
			} else if(ref1_dp === 'block' && ref2_dp === 'none') {
				careerRef.current[1].style.display = 'block'
			} else if(ref1_dp === 'block' && ref2_dp === 'block') {
				// 더이상 추가할 수 없다는 메시지를 띄우자
				setPopMsg(commMessage('NEVER_ADD'))
				setPopDp(true)
			}
		} else {

		}



	},[values, errors])


	// 태그 핸들링
	const tagHandling = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		let {name, value} = e.target
		console.log(name)
		console.log(value)
	},[values,errors])

	// submit
	const submitHandler = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault()
	
	}, [])


	useLayoutEffect(() => {
		// console.log('values', values)
		// console.log('errors', errors)
		let tmpYear:object[] = []
		for(let i = 1960; i < 2020; i++) {
			tmpYear!.push({id: i, title: i})
		}
		setGraudateYearOptions(tmpYear)
	},[values, errors])


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
						title={'이력서 저장'}
						buttontype={'page'}
						colortype={''}
					/></span>
				</div>
			</section>
			<InputTitleType
				placeholder={placeholderMessage('RESUME_TITLE')}
				name={'resumeTitle'}
				max={50}
				type={'text'}
				onchange={(e) => inputHandler(e, 5, 'text', '이력서 제목은 ')}
				message={messages.resumeTitle}
			/>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop containerFlex'}>
				<div style={{width: '15%'}}>
					<div className={'inputTitle'}>이름</div>
					<div className={'contentFixedText'}>이시</div>
				</div>
				<div style={{width: '35%'}}>
					<div className={'inputTitle'}>이메일</div>
					<div className={'contentFixedText'}>yisi@yisistory.com</div>
				</div>
				<div style={{width: '25%'}}>
					<div className={'inputTitle'}>휴대전화번호</div>
					<div className={'contentFixedText'}>010-1234-1234</div>
				</div>
				<div style={{width: '25%'}}>
					<CustomCheckBox
						title={'연락처 공개 요청을 받겠습니다.'}
						name={'agreeRequestContactInfo'}
						defaultFlag={true}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div style={{textAlign:'right', width:'100%', height: '3rem', paddingTop:'0.5rem'}}><InfoAlert messageCode={'RESUME_CONTACT'} /></div>
				<div className={'emptyDivHeight'}></div>
				<div style={{width:'45%'}}>
					<InputWithAlert
						title={'주소'}
						titleDP={true}
						placeholder={placeholderMessage('BASIC_ADDRESS_INPUT')}
						name={'basicAddress'}
						max={100}
						type={'text'}
						value={values.basicAddress}
						disabled={true}
					/>
				</div>
				<div className={'addressClasses'} onClick={searchAddress} />
				<div className={'rightElement'}>
					<InputWithAlert
						title={''}
						titleDP={true}
						placeholder={placeholderMessage('DETAIL_ADDRESS_INPUT')}
						name={'detailAddress'}
						max={100}
						type={'text'}
						onchange={(e) =>inputHandler(e, 5, 'text','주소는' )}
						value={values.detailAddress}
					/>
				</div>
				<div style={{width:'45%'}}>
					<Alert
						title={messages.basicAddress}
						alertdisplay={errors.basicAddress}
					/>
				</div>
				<div className={'rightElement'} style={{marginLeft: '5rem'}}>
					<Alert
						title={messages.detailAddress}
						alertdisplay={errors.detailAddress}
					/>
				</div>
				<div className={'emptyDivHeight'}></div>
				<div style={{width: '18%'}}>
					<InputWithAlert
						title={'태그'}
						titleDP={true}
						placeholder={placeholderMessage('RESUME_TAG')}
						name={'tag'}
						max={10}
						type={'text'}
						onchange={tagHandling}
					/>
				</div>

				<div style={{width: '2.5%'}} />
				<div style={{width: '18%'}}>
					<InputWithAlert
						title={''}
						titleDP={true}
						placeholder={placeholderMessage('RESUME_TAG')}
						name={'tag'}
						max={10}
						type={'text'}
						onchange={tagHandling}
					/>
				</div>
				<div style={{width: '2.5%'}} />
				<div style={{width: '18%'}}>
					<InputWithAlert
						title={''}
						titleDP={true}
						placeholder={placeholderMessage('RESUME_TAG')}
						name={'tag'}
						max={10}
						type={'text'}
						onchange={tagHandling}
					/>
				</div>
				<div style={{width: '2.5%'}} />
				<div style={{width: '18%'}}>
					<InputWithAlert
						title={''}
						titleDP={true}
						placeholder={placeholderMessage('RESUME_TAG')}
						name={'tag'}
						max={10}
						type={'text'}
						onchange={tagHandling}
					/>
				</div>
				<div style={{width: '2.5%'}} />
				<div style={{width: '18%'}}>
					<InputWithAlert
						title={''}
						titleDP={true}
						placeholder={placeholderMessage('RESUME_TAG')}
						name={'tag'}
						max={10}
						type={'text'}
						onchange={tagHandling}
					/>
				</div>
				<div style={{width:'100%', height: '3rem', paddingTop:'0.5rem'}}><InfoAlert messageCode={'RESUME_TAG'} /></div>
				<Alert
					title={messages.tag}
					alertdisplay={errors.tag}
				/>
			</section>
			<div className={'emptyDivHeight'}></div>
			{/***************************************** 학력 ********************************************/}
			<section className={'container containerTop containerFlex'}>
				<div style={{width:'100%'}}><InfoAlert messageCode={'RESUME_SCHOOL_INFO'} /></div>
				<div className={'emptyDivHeight'}></div>
				<div style={{width: '25%'}}>
					<Dropdown
						title={'학교구분'}
						Options={[{id: '1',title: '고등학교'},{id: '2', title: '대학교(2,3년)'}, {id: '3', title: '대학교(4년)'}, {id: '4', title: '대학원'}]}
						name={'stopCareerReason'}
						changeFunc={changeHandler}
						defaultValue={'고등학교'}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '45%'}}>
					<InputWithAlert
						title={'학교명'}
						titleDP={true}
						placeholder={placeholderMessage('SCHOOLNAME_INPUT')}
						name={'schoolName'}
						max={30}
						type={'text'}
						onchange={(e) =>inputHandler(e, 5, 'text','학교명은' )}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '20%'}}>
					<CustomCheckBox
						title={'편입'}
						name={'schoolInMethod1'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div style={{width: '30%'}} />
				<div style={{width: '45%'}}>
					<Alert
						title={messages.schoolName}
						alertdisplay={errors.schoolName}
					/>
				</div>
				<div style={{width: '25%'}} />
				<div className={'emptyDivHeight'}></div>
				<div style={{width: '45%'}}>
					<InputWithAlert
						title={'전공명'}
						titleDP={true}
						placeholder={placeholderMessage('MAJOR_INPUT')}
						name={'majorName'}
						max={30}
						type={'text'}
						onchange={(e) =>inputHandler(e, 5, 'text','전공명은 ' )}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '25%'}}>
					<Dropdown
						title={'졸업년도'}
						Options={graduateYearOptions}
						name={'graduateYear'}
						changeFunc={changeHandler}
						defaultValue={'1960'}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '20%'}}>
					<CustomCheckBox
						title={'대입검정고시'}
						name={'schoolInMethod2'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div style={{width: '45%'}}>
					<Alert
						title={messages.majorName}
						alertdisplay={errors.majorName}
					/>
				</div>
				<div style={{width: '55%'}} />
			</section>
			<div className={'emptyDivHeight'}></div>
			{/***************************************** 경력 ********************************************/}
			<section className={'container containerTop containerFlex'}>
				<div style={{ width:'100%'}}><InfoAlert messageCode={'RESUME_CAREER'} /></div>
				<div className={'emptyDivHeight'}></div>
				{/***************************************** 경력 1 ********************************************/}
				<div style={{border:'1px solid red', width: '100%'}}>

				</div>
				<div className={'emptyDivHeight'}></div>
				{/***************************************** 경력 2********************************************/}
				<div style={{border:'1px solid red', width: '100%', display:'none'}} ref={(e) => {careerRef.current[0] = e}}>
					경력 2
				</div>
				<div className={'emptyDivHeight'}></div>
				{/***************************************** 경력 3********************************************/}
				<div style={{border:'1px solid red', width: '100%', display: 'none'}} ref={(e) => {careerRef.current[1] = e}}>
					경력3
				</div>
				<div className={'emptyDivHeight'}></div>
				<div style={{width: '100%', textAlign:'center'}}>
					<span style={{cursor:'pointer'}} onClick={(e) => addCareer(e, 'add')}><ButtonGeneral
						title={'경력 추가하기'}
						buttontype={'full'}
					/></span>
				</div>
			</section>
			<div className={'emptyDivHeight'}></div>
			{/***************************************** 포트폴리오 ********************************************/}
			<section className={'container containerTop'}>
				<FileUpload
					elName={'portFolio'}
					infoMsgCode={'PORTFOLIO_ADDINFO'}
					registFileFunc={(e) => registerFile(e, portfolioMaxFileSize, portfolioFileTypes, portfolioMaxLength)}
					deleteFileFunc={deleteFile}
					alertTitle={messages.portFolio}
					alertDP={errors.portFolio}
					fileValue={values.portFolio}
				/>
			</section>
			<div className={'emptyDivHeight'}></div>
			<section className={'editorContainer'}>
				<QuillEditorUser
					value={values.profile}
					onChange={() => editorHandler(editorRef, 10, '', 'content','자기 소개는')}
					style={{height: '300px'}}
					placeholder={placeholderMessage('RESUME_PROFILE')}
					quillRef={editorRef}
				/>
				<div className={'emptyDivHeight'} />
				<Alert
					title={messages.profile}
					alertdisplay={errors.profile}
				/>
			</section>
			{addressDP && <AddressSearch okFunc={setValueHandler} valueName={'basicAddress'} bgFunc={(e: React.SyntheticEvent) => popupClose(e, setAddressDP)} />}
			{popDp && <Popup
				popMsg={popMsg}
				okFunc={(e: React.SyntheticEvent) => popupClose(e, setPopDp)}
				bgFunc={(e: React.SyntheticEvent) => popupClose(e, setPopDp)}
			/>}
		</main>
	)
}

export default React.memo(ResumeRegister)