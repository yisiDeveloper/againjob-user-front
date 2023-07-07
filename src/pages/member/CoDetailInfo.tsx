import React, {useCallback, useLayoutEffect, useRef, useState} from 'react'
import {useForm, useNavigation} from '@hook'
import {
	Alert,
	ButtonGeneral,
	CustomCheckBox,
	Dropdown,
	InfoAlert,
	InputWithAlert,
	PageTitle,
	AddressSearch,
	FileUpload
} from '@components'
import {
	ciFileMaxLength,
	ciFileTypes, ciMaxFileSize,
	commMessage,
	memberMessage,
	pageURL_Member_WithdrawPolicy,
	placeholderMessage
} from '@env'
import {findKeyWithRequired, popupClose} from '@handler'
import './member.css'

function CoDetailInfo() {

	/****************************************************** common basic definition ***************************************************/
	const {goToURL} = useNavigation()

	/****************************************************** contents initialization or definition ***************************************************/
	// 모든 입력값의 초기값을 만든다.
	const initialValues = {
			coEmail: 'yisi@yisistory.com',
			coBusinessNo: '2035567463',
			mobileNumber1: '010',
			mobileNumber2: '',
			certNumber: '',
			coName: '이시 주식회사',
			coCI: [],
			password: '',
			passwordConfirm: '',
			basicAddress: '',
			detailAddress: '',
			agreeNewsletter: false,
			agreeMarketing: false
		}
	// 실제 체크해야하는 에러 필드를 정의한다.
	const initialErrors = {
		coEmail: '',
		coBusinessNo: '',
		mobileNumber1: '010',
		mobileNumber2: '',
		certNumber: '',
		coName: '',
		coCI: '',
		password: '',
		passwordConfirm: '',
		basicAddress: '',
		detailAddress: ''
	}

	// 모든 값들과 에러를 정의한다.
	const {
		values,
		errors,
		messages,
		inputHandler,
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

	// 비활성화 해야하는 버튼을 관리한다.
	const [sendCertBtn, setSendCertBtn] = useState('disabled')
	const [checkCertBtn, setCheckCertBtn] = useState('disabled')
	// 주소 검색 창 관리
	const [addressDP, setAddressDP] = useState(false)

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

	// 우편번호 검색
	const searchAddress = useCallback((e: React.SyntheticEvent) => {
		e.preventDefault()

		setAddressDP(true)
		// inputHandler(e, 10, 'text','회사 주소는' )
	},[values,errors])


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
		// console.log('values', values)
		// console.log('errors', errors)

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
			<PageTitle title={'기업정보'} />
			<section className={'container containerTop containerFlex'}>
				<div style={{width: '35%'}}>
					<InputWithAlert
						title={'이메일'}
						titleDP={true}
						placeholder={placeholderMessage('EMAIL_INPUT')}
						name={'coEmail'}
						max={100}
						type={'text'}
						onchange={(e) =>inputHandler(e, 10, 'email','이메일 주소는' )}
						message={messages.coEmail}
						value={values.coEmail}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '28%'}}>
					<InputWithAlert
						title={'회사명'}
						titleDP={true}
						placeholder={placeholderMessage('NAME_INPUT')}
						name={'coName'}
						max={10}
						type={'text'}
						onchange={(e) =>inputHandler(e, 2, 'name','이름은' )}
						message={messages.coName}
						value={values.coName}
					/>
				</div>
				<div style={{width: '5%'}} />
				<div style={{width: '27%'}}>
					<InputWithAlert
						title={'사업자등록번호'}
						titleDP={true}
						placeholder={placeholderMessage('BUSINESS_NUMBER_INPUT')}
						name={'coBusinessNo'}
						max={10}
						type={'text'}
						onchange={(e) =>inputHandler(e, 10, 'name','사업자등록번호' )}
						message={messages.coBusinessNo}
						value={values.coBusinessNo}
						disabled={true}
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
			<section className={'container containerTop'}>
				<InfoAlert	messageCode={'CODETAIL_CI'} />
				<div className={'emptyDivHeight'}></div>
				<FileUpload
					elName={'coCI'}
					infoMsgCode={'CODETAIL_CI_INFO'}
					registFileFunc={(e) => registerFile(e, ciMaxFileSize, ciFileTypes, ciFileMaxLength)}
					deleteFileFunc={deleteFile}
					alertTitle={messages.coCI}
					alertDP={errors.coCI}
					fileValue={values.coCI}
				/>
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
				<InfoAlert messageCode={'COINFO_ADDINFO'} />
				<div className={'emptyDivHeight'} />
				<div style={{width:'45%'}}>
					<InputWithAlert
						title={'주소'}
						titleDP={true}
						placeholder={placeholderMessage('BASIC_ADDRESS_INPUT')}
						name={'basicAddress'}
						max={100}
						type={'text'}
						message={messages.basicAddress}
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
						onchange={(e) =>inputHandler(e, 10, 'text','회사 주소는' )}
						message={messages.detailAddress}
						value={values.detailAddress}
					/>
				</div>
				<div className={'emptyDivHeight'} />
				<div className={'emptyDivHeight'} />
				<div className={'leftElement'}>
					<CustomCheckBox
						title={'뉴스레터 수신에 동의합니다.'}
						name={'agreeNewsletter'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
					<div style={{height:'1rem'}} />
					<CustomCheckBox
						title={'마케팅 정보 수신에 동의합니다.'}
						name={'agreeMarketing'}
						defaultFlag={false}
						titleType={'register'}
						onChangeHandler={checkBoxHandler}
					/>
				</div>
				<div className={'rightElement'} style={{textAlign:'right'}}>
					<span className={'memberWithdraw'} onClick={(e) => goToURL(e, pageURL_Member_WithdrawPolicy, '', true)}>회원탈퇴</span>
				</div>
				<div className={'emptyDivHeight'} />
				<div className={'emptyDivHeight'} />
				<div style={{textAlign:'center',width: '100%'}}>
					<span onClick={submitHandler}>
					<ButtonGeneral
						title={'수정하기'}
						buttontype={'full'}
						colortype={''}
					/></span>
				</div>
				<div className={'emptyDivHeight'} />
			</section>
			{addressDP && <AddressSearch okFunc={setValueHandler} valueName={'basicAddress'} bgFunc={(e: React.SyntheticEvent) => popupClose(e, setAddressDP)} />}
		</main>
	)
}

export default React.memo(CoDetailInfo)