import React, {useCallback, useEffect, useState} from 'react'
import {useForm, useNavigation} from '@hook'
import {Alert, ButtonGeneral, Dropdown, InfoAlert, InputWithAlert, PageTitle} from '@components'

function PeDetailInfo() {

	/****************************************************** common basic definition ***************************************************/
	const {navigate, goToURL, propState} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		userEmail: '',
		userName: '',
		mobileNumber1: '',
		mobileNumber2: '',
		mobileCertNumber: '',			//인증번호
		newPassword: '',
		newPasswordConfirm: '',
		stopCareerPeriod: '',			// 경력단절기간
		stopCareerReason: '',			// 경력단절사유
		ableTimeForWork: '',			// 근무가능 시간
		ableStartTimeForCall: '',		// 연락가능 시작시간
		ableStopTimeForCall: '',		// 연락가능 종료시간
		wantJobState: [],				// 원하는 근무형태
		agreeNewsletter: '',			// 뉴스레터 수신 동의 여부
		agreeMarketing: ''				// 마케팅정보 수신 동의 여부
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		userEmail: '',
		userName: '',
		mobileNumber1: '',
		mobileNumber2: '',
		mobileCertNumber: '',			//인증번호
		newPassword: '',
		newPasswordConfirm: '',
		stopCareerPeriod: '',			// 경력단절기간
		stopCareerReason: '',			// 경력단절사유
		ableTimeForWork: '',			// 근무가능 시간
		ableStartTimeForCall: '',		// 연락가능 시작시간
		ableStopTimeForCall: '',		// 연락가능 종료시간
		wantJobState: '',				// 원하는 근무형태
		agreeNewsletter: '',			// 뉴스레터 수신 동의 여부
		agreeMarketing: ''				// 마케팅정보 수신 동의 여부
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

	// 비활성화 해야하는 버튼을 관리한다.
	const [sendCertBtn, setSendCertBtn] = useState('disabled')
	const [checkCertBtn, setCheckCertBtn] = useState('disabled')

	// 휴대전화번호 인증번호 발송 버튼의 text를 관리한다.
	const [sendMobileCertNoBtnText, setSendMobileCertNoBtnText] = useState('인증번호발송')
	// 인증했는지의 여부
	const [mobileCertNoConfirmComplete, setMobileCertNoConfirmComplete] = useState(false)
	// 인증하지 않고 서브및 하는 경우를 대비한 별도 메시지
	const [mobileCertNoConfirmMessage, setMobileCertNoConfirmMessage] = useState('')
	// 인증확인 메시지 디스플레이
	const [mobileCertNoConfirmDP, setMobileCertNoConfirmDP] = useState(false)
	// 휴대전화번호 필드 disabled
	const [mobileInputDisabled, setMobileInputDisabled] = useState(false)

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
			<PageTitle title={'내 정보'} />
			<section className={'container containerTop'}>
				<InputWithAlert
					title={'이메일'}
					titleDP={true}
					placeholder={'이메일 주소를 입력해주세요.'}
					name={'userEmail'}
					max={100}
					type={'text'}
					onchange={(e) =>inputHandler(e, 10, 'email','이메일 주소는' )}
					message={errors.userEmail}
					value={values.userEmail}
				/>
				<InputWithAlert
					title={'이름'}
					titleDP={true}
					placeholder={'이름을 입력해주세요.'}
					name={'userName'}
					max={10}
					type={'text'}
					onchange={(e) =>inputHandler(e, 2, 'name','이름은' )}
					message={errors.userEmail}
					value={values.userEmail}
				/>
				<div style={{width:'9rem'}}>
					<Dropdown
						title={'휴대전화번호'}
						Options={[{id: '010',title: '010'},{id: '011', title: '011'}, {id: '017', title: '017'}]}
						name={'mobileNumber1'}
						changeFunc={changeHandler}
						defaultValue={'010'}
					/>
				</div>
				<div className={'hyphen'}>-</div>
				<div style={{width: '15rem'}}>
					<InputWithAlert
						title={''}
						titleDP={true}
						placeholder={'12341234'}
						name={'mobileNumber2'}
						max={8}
						type={'text'}
						onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 7, 'number','휴대전화번호는')}
						disabled={mobileInputDisabled}
					/>
				</div>
				<div>
					<ButtonGeneral
						title={sendMobileCertNoBtnText}
						buttontype={''}
						colortype={sendCertBtn}
					/>
				</div>
				<Alert
					title={messages?.mobileNumber2}
					alertdisplay={errors?.mobileNumber2}
				/>
				<div style={{width: '65%', display:'inline-block'}}>
					<InputWithAlert
						title={'인증번호'}
						titleDP={true}
						placeholder={'인증번호를 입력하세요'}
						name={'certNumber'}
						max={10}
						type={'text'}
						onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 5, 'number','인증번호는')}
						value={values?.certNumber}
					/>
				</div>
				<div >
					<ButtonGeneral
						title={'인증번호확인'}
						buttontype={''}
						colortype={checkCertBtn}
					/>
				</div>
			</section>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop'}>
				<InfoAlert	messageCode={'MYINFO_PASSWORD'} />
				<div className={'emptyDivHeight'} />
				<InputWithAlert
					title={'비밀번호'}
					titleDP={true}
					placeholder={'비밀번호를 입력해주세요.'}
					name={'password'}
					max={20}
					type={'password'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 8, 'password', '비밀번호는')}
					value={values?.password}
					message={messages.password}
				/>
				<InputWithAlert
					title={'비밀번호확인'}
					titleDP={true}
					placeholder={'비밀번호를 한번 더 입력해주세요.'}
					name={'passwordConfirm'}
					max={20}
					type={'password'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 8, 'password', '비밀번호 확인은')}
					value={values?.passwordConfirm}
					message={messages.passwordConfirm}
				/>
			</section>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop'}>
				<InfoAlert messageCode={'MYINFO_ADDINFO'} />
				<div className={'emptyDivHeight'} />
				<Dropdown
					title={'경력단절기간'}
					Options={[{id: '1',title: '1년 미만'},{id: '2', title: '1년 이상 ~ 3년 미만'}, {id: '3', title: '3년 이상 ~ 5년 미만'},{id: '4', title: '5년 이상 ~ 10년 미만'},{id: '5', title: '10년 이상'}]}
					name={'stopCareerPeriod'}
					changeFunc={changeHandler}
					defaultValue={'1년 미만'}
				/>
				<Dropdown
					title={'경력단절사유'}
					Options={[{id: '1',title: '육아'},{id: '2', title: '은퇴'}, {id: '3', title: '개인사정'}]}
					name={'stopCareerReason'}
					changeFunc={changeHandler}
					defaultValue={'육아'}
				/>
				<div className={'emptyDivHeight'} />
				<div className={'emptyDivHeight'} />
				<div style={{textAlign:'center'}} onClick={submitHandler}>
					<ButtonGeneral
						title={'수정하기'}
						buttontype={'full'}
						colortype={''}
					/>
				</div>
			</section>
		</main>
	)
}

export default React.memo(PeDetailInfo)