import React, {useCallback, useEffect, useRef, useState} from 'react'
import './sign.css'
import {useLocation, useNavigate} from 'react-router-dom'
import {
	Alert,
	ButtonGeneral,
	CustomCheckBox,
	CustomRadio,
	RegistLoginTitle,
	Dropdown,
	InputWithAlert
} from '@components'
import {checkRequiredKeyValue, findKeyInObjectByValue, findValueInObject, goToURL, useForm} from '@handler'
import {commMessage, memberMessage, pageURL_Sign_Complete} from '@env'

function PeInfo() {

	/****************************************************** common basic definition ***************************************************/
	const navigate = useNavigate()
	const location = useLocation()
	const propState = {...location.state}

	/****************************************************** contents initialization or definition ***************************************************/
	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
		loginType: 'email',
		userEmail: '',
		mobileNumber1: '010',
		mobileNumber2: '',
		certNumber: '',
		userName: '',
		password: '',
		passwordConfirm: '',
		agreeNewsletter: false,
		agreeMarketing: false
	}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		userEmail: '',
		mobileNumber2:'',
		certNumber: '',
		userName: '',
		password: '',
		passwordConfirm: ''
	}

	// radio REF
	const emailTypeRef = useRef<React.MutableRefObject<any>>()
	const mobileTypeRef = useRef<React.MutableRefObject<any>>()

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

		// console.log('errors', errors)
		// console.log('values', values)
		// console.log('mobileCertNoConfirmComplete',mobileCertNoConfirmComplete)
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

		// 최종 확인
		if(!findValueInObject(errors, true)) {
			alert('모든 확인이 완료되어 회원가입을 처리합니다.')
			goToURL(e, pageURL_Sign_Complete, navigate, {replace:true, name: values.userName})
		} else {
			// 에러가 난 필드를 찾아 해당 필드에 에러 메시지를 뿌린다.
			let findedKey = findKeyInObjectByValue(errors, true)
			// console.log(findedKey)
			if(findedKey) {
				setErrorMessage(e, findedKey, commMessage('INVALID_INPUT_PARAM').message)
			}
		}
	},[errors, messages, mobileCertNoConfirmComplete])


	useEffect(() => {

		// 휴대전화번호를 바꿀 경우를 대비하여 인증완료 false로 바꾼다.
		if(errors.mobileNumber2) {
			btnRef.current[0].className = 'btnDisabledArea'
			setSendCertBtn('disabled')
		} else if (!errors.mobileNumber2) {
			btnRef.current[0].className = 'btnArea'
			setSendCertBtn('')
		}
		if(errors.certNumber) {
			btnRef.current[1].className = 'btnDisabledArea'
			setCheckCertBtn('disabled')
		} else if(!errors.certNumber) {
			btnRef.current[1].className = 'btnArea'
			setCheckCertBtn('')
		}

	},[errors, values])

	// 한번 만 실행되도록 하기 위함
	useEffect(() => {
		// 값을 확인하여 없는 경우 에러를 발생시킨다.
		checkRequiredKeyValue(propState, 'all', true, navigate,'NOT_NORMAL_CONNECT')
	},[])

	return(
		<>
		<div className={'signContainer'}>
			<section className={'infoArea'}>
				<div className={'signTitleArea'}>
					<RegistLoginTitle title={'회원가입'} />
				</div>
				<CustomRadio
					title={'로그인 방식'}
					titleDP={true}
					optionName={['이메일을 아이디로 사용하여 로그인하겠습니다.','휴대전화번호를 아이디로 사용하여 로그인하겠습니다.']}
					name={'loginType'}
					titleType={'signForm'}
					onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 0, '')}
					defaultFlag={[true, false]}
					tagRef={[emailTypeRef, mobileTypeRef]}
					value={['email','mobile']}
				/>
				<div style={{height: '3rem'}} />
				<InputWithAlert
					title={'이메일'}
					titleDP={true}
					placeholder={'이메일 주소를 입력해주세요.'}
					name={'userEmail'}
					max={100}
					type={'text'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 10, 'email')}
					value={values?.userEmail}
					message={messages.userEmail}
				/>
				<div className={'emptyDivHeight'} />
				<div className={'mobileArea'}>
					<div style={{width:'9rem'}}>
						<Dropdown
							title={'휴대전화번호'}
							Options={[{id: '010',title: '010'},{id: '011', title: '011'}, {id: '017', title: '017'}]}
							name={'mobileNumber1'}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 3, 'number')}
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
					<div
						className={'btnDisabledArea'} onClick={sendCertNumber}
						ref={(el) => btnRef.current[0] = el}
					>
						<ButtonGeneral
							title={sendMobileCertNoBtnText}
							buttontype={''}
							colortype={sendCertBtn}
						/>
					</div>
				</div>
				<Alert
					title={messages?.mobileNumber2}
					alertdisplay={errors?.mobileNumber2}
				/>

				<div className={'emptyDivHeight'} />
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
				<div className={'btnDisabledArea'} onClick={checkCertNumber}
					 ref={(el) => btnRef.current[1] = el}
					 style={{verticalAlign:'top'}}
				>
					<ButtonGeneral
						title={'인증번호확인'}
						buttontype={''}
						colortype={checkCertBtn}
					/>
				</div>
				<Alert
					title={messages.certNumber}
					alertdisplay={errors?.certNumber}
				/>
				<Alert
					title={mobileCertNoConfirmMessage}
					alertdisplay={mobileCertNoConfirmDP}
				/>
				<div className={'emptyDivHeight'} />
				<InputWithAlert
					title={'이름'}
					titleDP={true}
					placeholder={'이름을 입력해주세요.'}
					name={'userName'}
					max={10}
					type={'text'}
					onchange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandler(e, 2, 'name','이름은')}
					value={values?.userName}
					message={messages.userName}
				/>
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
				<div className={'emptyDivHeight'} />
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
				<div className={'emptyDivHeight'} />
				<CustomCheckBox
					title={'뉴스레터 수신에 동의합니다.'}
					name={'agreeNewsletter'}
					defaultFlag={false}
					titleType={'register'}
					onChangeHandler={checkBoxHandler}
				/>
				<div style={{height: '1rem'}} />
				<CustomCheckBox
					title={'마케팅 정보 수신에 동의합니다.'}
					name={'agreeMarketing'}
					defaultFlag={false}
					titleType={'register'}
					onChangeHandler={checkBoxHandler}
				/>

				<div className={'emptyDivHeight'} />
				<div className={'emptyDivHeight'} />
				<div style={{textAlign:'center'}} onClick={submitHandler}>
					<ButtonGeneral
						title={'가입하기'}
						buttontype={'full'}
						colortype={''}
					/>
				</div>
				<div style={{height: '5rem'}} />
			</section>
		</div>
		</>
	)
}

export default React.memo(PeInfo)