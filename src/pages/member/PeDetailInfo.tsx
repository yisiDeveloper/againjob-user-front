import React, {useCallback, useLayoutEffect, useRef, useState} from 'react'
import {useForm, useNavigation} from '@hook'
import {Alert, ButtonGeneral, CustomCheckBox, Dropdown, InfoAlert, InputWithAlert, PageTitle} from '@components'
import {commMessage, memberMessage, pageURL_Member_WithdrawPolicy, placeholderMessage} from '@env'
import {findKeyWithRequired} from '@handler'
import './member.css'

function PeDetailInfo() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		userEmail: 'yisi@yisistory.com',
		userName: '이시',
		mobileNumber1: '010',
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
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
		checkBoxHandler,
		setErrorMessage,
		changeHandler
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

	const btnRef = useRef<any>([])

	/****************************************************** Handling ***************************************************/
	// 인증번호 발송 버튼
	const sendCertNumber = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()

		if(!errors.mobileNumber2){
			alert('인증번호를 발송합니다.')
			setSendMobileCertNoBtnText('인증번호 재발송')
			setMobileCertNoConfirmComplete(true)
		} else {
			// 기존에 인증번호를 발송해서 확인까지 해놓고 다시 발송하는 경우를 대비
			setMobileCertNoConfirmComplete(false)
		}
	},[errors])


	// 인증번호 확인 버튼
	const checkCertNumber = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()

		if(!errors.certNumber && !errors.mobileNumber2) {
			alert('인증 확인을 진행합니다.')
			setMobileCertNoConfirmComplete(true)
			// 인증 확인 후에는 휴대전화번호 필드를 disabled 시킨다.
			setMobileInputDisabled(true)
			setMobileCertNoConfirmDP(false)
		} else {
			// 휴대전화번호 또는 인증번호에 에러가 있을 경우
			setErrorMessage(e, 'mobileNumber2', memberMessage('NEED_CHECK_MOBILE_OR_CERTNUMBER').message)
			setMobileCertNoConfirmComplete(false)
		}
	},[errors])


	// submit
	const submitHandler = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault()

		// 휴대전화번호 인증을 하지 않은 경우를 대비
		if(!mobileCertNoConfirmComplete) {
			// console.log('휴대전화 인증하란 메시지를 뿌려줍시다.')
			let msg = memberMessage('NEED_MOBILENUMBER_CERTIFY').message
			// console.log('message', msg)
			setMobileCertNoConfirmMessage(msg)
			setMobileCertNoConfirmDP(true)
			return false
		}

		// 비밀번호와 비밀번호 확인이 다른 경우를 대비
		if(values.password !== values.passwordConfirm) {
			// console.log('패스워드가 틀리니 검증하자')
			setErrorMessage(e, 'passwordConfirm',memberMessage('NOT_CONFIRM_PASSWORD').message)
			return false
		}

		// 전체를 검사하자
		let result = findKeyWithRequired(values, errors,['password','passwordConfirm'])
		if(result===true) {
			alert('검사를 완료하여 등록합니다.')
		} else {
			// 돌려받은 element에 에러를 만든다.
			setErrorMessage(e, result, commMessage('INVALID_INPUT_PARAM').message)
		}

	}, [values, errors, mobileCertNoConfirmComplete])


	// 한번 만 실행되도록 하기 위함
	useLayoutEffect(() => {
		console.log('values', values)
		console.log('errors', errors)

		// 휴대전화번호를 바꿀 경우를 대비하여 인증완료 false로 바꾼다.
		if(errors?.mobileNumber2) {
			btnRef.current[0].className = 'btnDisabledArea'
			setSendCertBtn('disabled')
		} else if (!errors.mobileNumber2) {
			btnRef.current[0].className = 'btnArea'
			setSendCertBtn('')
		}
		if(errors?.mobileCertNumber) {
			btnRef.current[1].className = 'btnDisabledArea'
			setCheckCertBtn('disabled')
		} else if(!errors.certNumber) {
			btnRef.current[1].className = 'btnArea'
			setCheckCertBtn('')
		}

	}, [values, errors])

	return (
		<main>
			<PageTitle title={'내 정보'} />
			<section className={'container containerTop containerFlex'}>
				<div className={'leftElement'}>
					<InputWithAlert
						title={'이메일'}
						titleDP={true}
						placeholder={placeholderMessage('EMAIL_INPUT')}
						name={'userEmail'}
						max={100}
						type={'text'}
						onchange={(e) =>inputHandler(e, 10, 'email','이메일 주소는' )}
						message={messages.userEmail}
						value={values.userEmail}
					/>
				</div>
				<div className={'rightElement'}>
					<InputWithAlert
						title={'이름'}
						titleDP={true}
						placeholder={placeholderMessage('NAME_INPUT')}
						name={'userName'}
						max={10}
						type={'text'}
						onchange={(e) =>inputHandler(e, 2, 'name','이름은' )}
						message={messages.userName}
						value={values.userName}
					/>
				</div>
				<div className={'emptyDivHeight'}></div>
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
				<div style={{width: '23%'}}>
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
				<div className={'btnDisabledArea'} onClick={sendCertNumber}
					 ref={(el) => btnRef.current[0] = el}>
					<ButtonGeneral
						title={sendMobileCertNoBtnText}
						buttontype={''}
						colortype={sendCertBtn}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '33%', display:'inline-block'}}>
					<InputWithAlert
						title={'인증번호'}
						titleDP={true}
						placeholder={placeholderMessage('CERT_INPUT')}
						name={'certNumber'}
						max={10}
						type={'text'}
						onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 5, 'number','인증번호는')}
						value={values?.certNumber}
					/>
				</div>
				<div className={'btnDisabledArea'} onClick={checkCertNumber}
					 ref={(el) => btnRef.current[1] = el}
					 style={{verticalAlign:'top'}}>
					<ButtonGeneral
						title={'인증번호확인'}
						buttontype={''}
						colortype={checkCertBtn}
					/>
				</div>
				<div style={{width:'52%'}}>
					<Alert
						title={messages?.mobileNumber2}
						alertdisplay={errors?.mobileNumber2}
					/>
				</div>
				<div style={{width:'48%'}}>
					<Alert
						title={messages?.certNumber}
						alertdisplay={errors?.certNumber}
					/>
					<Alert
						title={mobileCertNoConfirmMessage}
						alertdisplay={mobileCertNoConfirmDP}
					/>
				</div>
			</section>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop containerFlex'}>
				<InfoAlert	messageCode={'MYINFO_PASSWORD'} />
				<div className={'emptyDivHeight'}></div>
				<div className={'leftElement'}>
					<InputWithAlert
						title={'비밀번호'}
						titleDP={true}
						placeholder={placeholderMessage('LOGIN_PASSWORD')}
						name={'password'}
						max={20}
						type={'password'}
						onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 8, 'password', '비밀번호는')}
						value={values?.password}
						message={messages.password}
					/>
				</div>
				<div className={'rightElement'}>
					<InputWithAlert
						title={'비밀번호확인'}
						titleDP={true}
						placeholder={placeholderMessage('PASSWORD_CONFIRM')}
						name={'passwordConfirm'}
						max={20}
						type={'password'}
						onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 8, 'password', '비밀번호 확인은')}
						value={values?.passwordConfirm}
						message={messages.passwordConfirm}
					/>
				</div>
			</section>
			<div className={'emptyDivHeight'} />
			<section className={'container containerTop containerFlex'}>
				<InfoAlert messageCode={'MYINFO_ADDINFO'} />
				<div className={'emptyDivHeight'} />
				<div style={{width: '24%'}}>
					<Dropdown
						title={'경력단절기간'}
						Options={[{id: '1',title: '1년 미만'},{id: '2', title: '1년 이상 ~ 3년 미만'}, {id: '3', title: '3년 이상 ~ 5년 미만'},{id: '4', title: '5년 이상 ~ 10년 미만'},{id: '5', title: '10년 이상'}]}
						name={'stopCareerPeriod'}
						changeFunc={changeHandler}
						defaultValue={'1년 미만'}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '12%'}}>
					<Dropdown
						title={'경력단절사유'}
						Options={[{id: '1',title: '육아'},{id: '2', title: '은퇴'}, {id: '3', title: '개인사정'}]}
						name={'stopCareerReason'}
						changeFunc={changeHandler}
						defaultValue={'육아'}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '12%'}}>
					<Dropdown
						title={'가능한근무(작업)시간'}
						Options={[{id: '0',title: '시간'},{id: '1', title: '오전'}, {id: '2', title: '오후'},{id: '3', title: '2시간'}, {id: '4', title: '3시간'}, {id: '5', title: '4시간'}, {id: '6', title: '5시간'}, {id: '7', title: '6시간'}, {id: '8', title: '7시간'}, {id: '9', title: '8시간'}]}
						name={'ableTimeForWork'}
						changeFunc={changeHandler}
						defaultValue={'시간'}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '10%'}}>
					<Dropdown
						title={'연락가능시간'}
						Options={[{id: '0',title: '시간'},{id: '1', title: '06시'}, {id: '2', title: '07시'}, {id: '3', title: '08시'}, {id: '4', title: '09시'}, {id: '5', title: '10시'}, {id: '6', title: '11시'}, {id: '7', title: '12시'}, {id: '8', title: '13시'}, {id: '9', title: '14시'}, {id: '10', title: '15시'}, {id: '11', title: '16시'}, {id: '12', title: '17시'}, {id: '13', title: '18시'}, {id: '14', title: '19시'}, {id: '15', title: '20시'}, {id: '16', title: '21시'}, {id: '17', title: '22시'}]}
						name={'ableStartTimeForCall'}
						changeFunc={changeHandler}
						defaultValue={'시간'}
					/>
				</div>
				<div style={{width: '2%'}} />
				<div style={{width: '3%', paddingTop:'2.5rem'}}>
					부터
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '10%'}}>
					<Dropdown
						title={''}
						Options={[{id: '0',title: '시간'},{id: '2', title: '07시'}, {id: '3', title: '08시'}, {id: '4', title: '09시'}, {id: '5', title: '10시'}, {id: '6', title: '11시'}, {id: '7', title: '12시'}, {id: '8', title: '13시'}, {id: '9', title: '14시'}, {id: '10', title: '15시'}, {id: '11', title: '16시'}, {id: '12', title: '17시'}, {id: '13', title: '18시'}, {id: '14', title: '19시'}, {id: '15', title: '20시'}, {id: '16', title: '21시'}, {id: '17', title: '22시'}, {id: '18', title: '23시'}]}
						name={'ableStopTimeForCall'}
						changeFunc={changeHandler}
						defaultValue={'시간'}
					/>
				</div>
				<div style={{width: '2%'}} />
				<div style={{width: '3%', paddingTop:'2.5rem'}}>
					까지
				</div>
				<div className={'emptyDivHeight'} />
				<div style={{height:'2.5rem', width:'100%'}} className={'inputTitle'}>원하는 근무형태</div>
				<div style={{width: '7%'}}>
					<CustomCheckBox
						title={'정규직'}
						name={'wantJobState[0]'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '7%'}}>
					<CustomCheckBox
						title={'계약직'}
						name={'wantJobState[1]'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '8%'}}>
					<CustomCheckBox
						title={'프리랜서'}
						name={'wantJobState[2]'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div style={{width: '13%'}} />
				<div style={{width: '25%'}}>
					<CustomCheckBox
						title={'뉴스레터 수신에 동의합니다.'}
						name={'agreeNewsletter'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '25%'}}>
					<CustomCheckBox
						title={'마케팅 정보 수신에 동의합니다.'}
						name={'agreeMarketing'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div className={'emptyDivHeight'} />
				<div className={'emptyDivHeight'} />
				<div className={'memberWithdraw'}>
					<span style={{cursor: 'pointer'}} onClick={(e) => goToURL(e, pageURL_Member_WithdrawPolicy, '', true)}>회원탈퇴</span>
				</div>
				<div className={'emptyDivHeight'} />
				<div style={{textAlign:'center',width: '100%'}} onClick={submitHandler}>
					<ButtonGeneral
						title={'수정하기'}
						buttontype={'full'}
						colortype={''}
					/>
				</div>
				<div className={'emptyDivHeight'} />
			</section>
		</main>
	)
}

export default React.memo(PeDetailInfo)